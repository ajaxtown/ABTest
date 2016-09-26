<?php
namespace src\controller;
use Silex\Application;
use Silex\Api\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class CampaignController
{
    private $campaignService;
    private $userService;
    private $app;
    private $request;

    public function __construct(Application $app)
    {
        $this->app = $app;

        $this->request = Request::createFromGlobals();
        $this->campaignService = $app['CampaignService'];
        $this->userService = $app['UserService'];

    }

    public function saveCampaign()
    {
        try {
            $data = $this->request->request->get('data');
            $data = $this->campaignService->save($data);
            return $this->app->json(['ret' => true, 'data' => $data]);
        } catch (\Exception $e) {
            return $this->app->json(['ret' => false, 'data' => 'error: ' . $e->getMessage()]);
        }
    }

    public function powerCampaign()
    {
        try {
            $data = $this->request->request->get('data');
            $affected = $this->campaignService->powerCampaign($data);
            $this->userService->insertLog(array(
                'code' => 'STATUS_CHANGE',
                'value' => $data['status'],
                'campaign_id' => $data['campaign_id']
            ));
            // check if campaign start_date action is entered. This is a one time action.
            // We dont set it more than once from here..

            $start_date = $this->campaignService->getStartDate($data['campaign_id']);
            if($start_date == null) {
                $logs = $this->userService->getLogs(array(
                    'campaign_id' => $data['campaign_id'],
                    'code' => 'STATUS_CHANGE',
                    'order_type' => 'ASC',
                    'order_by'  => 'created'
                ));
                foreach($logs as $item) {
                    if($item['value'] == 1) {
                        $item['start_date'] = date('Y-m-d');
                        $this->campaignService->setStartdate($item);
                        break;
                    }
                }
            }


            return $this->app->json(['ret' => true, 'data' => $affected]);
        } catch (\Exception $e) {
            return $this->app->json(['ret' => false, 'data' => 'error: ' . $e->getMessage()]);
        }
    }

    public function getCampaignDataByID()
    {
        try {
            $id = $this->request->request->get('id');
            $data = $this->campaignService->getCampaignDataByID($id);
            return $this->app->json(['ret' => true, 'data' => $data]);
        } catch (\Exception $e) {
            return $this->app->json(['ret' => false, 'data' => 'error: ' . $e->getMessage()]);
        }
    }

    public function getAllCampaigns()
    {
        try {
            $data = $this->campaignService->getAllCampaigns();
            return $this->app->json(['ret' => true, 'data' => $data]);
        } catch (\Exception $e) {
            return $this->app->json(['ret' => false, 'data' => 'error: ' . $e->getMessage()]);
        }
    }

}