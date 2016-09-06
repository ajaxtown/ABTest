<?php
namespace src\controller;
use Silex\Application;
use Silex\Api\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class AnalyticsController implements ControllerProviderInterface
{
    private $analyticsService;
    private $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->analyticsService = $app['AnalyticsService'];
    }
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->before(function() use ($app) {
            if(null === $app['session']->get('user')) {
                return $app->redirect('/');
            }
        });
        $controllers->get('/authCallback', $this->authCallback());
        $controllers->get('/display/{id}', $this->display());
        $controllers->delete('/disconnect/{id}', $this->disconnect());

        return $controllers;
    }

    public function disconnect()
    {
        return function (Application $app, Request $request) {
            $campaign_id = $request->get('id');
            $this->analyticsService->removeAnalytics($campaign_id);
            $authUrl = $this->analyticsService->client->createAuthUrl();
            return $app->json(['ret' => true, 'data'=> $app['twig']->render('partials/analyticsNotConnected.html',array(
                'authUrl' => $authUrl
            ))]);
        };
    }

    public function display()
    {
        return function (Application $app, Request $request) {
            try {
                $campaign_id = $request->get('id');
                $app['session']->set('campaign_id', $campaign_id);
                $authData = $this->analyticsService->getAuthData($campaign_id);

                if(isset($authData['access_token']))
                {
                    $authData['campaign_id'] = $campaign_id;
                    $data = $this->analyticsService->getAccounts($campaign_id);
                    unset($authData['access_token']);
                    unset($authData['refresh_token']);
                    return $app['twig']->render('partials/analyticsAccount.html',array(
                        'data' => $data,
                        'jsonData' => json_encode($data),
                        'authData' => $authData
                    ));
                }
                $authUrl = $this->analyticsService->client->createAuthUrl();


                return $app['twig']->render('partials/analyticsNotConnected.html',array(
                    'authUrl' => $authUrl
                ));

            } catch (\Exception $e) {
                return $app->json(['ret' => false, 'data' => 'error: ' . $e->getMessage()]);
            }
        };
    }



    public function authCallback()
    {
        return function (Application $app, Request $request) {

            $code = $request->get('code');
            $this->analyticsService->client->authenticate($code);
            $data = array();

            $access_token = $this->analyticsService->client->getAccessToken();

            if(!isset($access_token['refresh_token']))
            {
                $access_token['refresh_token'] =  $this->analyticsService->client->getRefreshToken();
            }
            $data['access_token'] = $access_token['access_token'];
            $data['expire_at'] = time() + $access_token['expires_in'];
            $data['refresh_token'] = $access_token['refresh_token'];
            $data['campaign_id'] = $app['session']->get('campaign_id');

            $app['session']->set('access_token',$data['access_token']);

            $me = $this->analyticsService->getMe();
            $data['account_name'] = $me['familyName'];
            $this->analyticsService->manageAuthData($data);

            return $app->redirect('/dashboard/campaign/edit/' . $data['campaign_id']);

        };

    }


}