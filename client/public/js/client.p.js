var ABTest=function(window,document,undefined){!function(e,r){"use strict";"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?module.exports=r():e.phpUnserialize=r()}(this,function(){"use strict";return function(e){var r,t=0,i=[],n=0,a=function(){var r=e.indexOf(":",t),i=e.substring(t,r);return t=r+2,parseInt(i,10)},o=function(){var r=e.indexOf(";",t),i=e.substring(t,r);return t=r+1,parseInt(i,10)},u=function(){var e=o();return i[n++]=e,e},s=function(){var r=e.indexOf(";",t),a=e.substring(t,r);return t=r+1,a=parseFloat(a),i[n++]=a,a},c=function(){var r=e.indexOf(";",t),a=e.substring(t,r);return t=r+1,a="1"===a,i[n++]=a,a},f=function(){for(var r,i,n=a(),o=0,u=0;n>u;)r=e.charCodeAt(t+o++),127>=r?u++:u+=r>2047?3:2;return i=e.substring(t,t+o),t+=o+2,i},l=function(){var e=f();return i[n++]=e,e},p=function(){var r=e.charAt(t);return t+=2,r},d=function(){var e=p();switch(e){case"i":return o();case"s":return f();default:throw{name:"Parse Error",message:"Unknown key type '"+e+"' at position "+(t-2)}}},h=function(){var e,o,u,s,c,f=a(),l=[],p={},h=l,m=n++;for(i[m]=h,u=0;f>u;u++)if(e=d(),o=r(),h===l&&parseInt(e,10)===u)l.push(o);else{if(h!==p){for(s=0,c=l.length;c>s;s++)p[s]=l[s];h=p,i[m]=h}p[e]=o}return t++,h},m=function(e,r){var t,i,n;return"\0"!==e.charAt(0)?e:(n=e.indexOf("\0",1),n>0?(t=e.substring(1,n),i=e.substr(n+1),"*"===t?i:r===t?i:t+"::"+i):void 0)},g=function(){var e,o,u,s,c={},l=n++,p=f();for(i[l]=c,e=a(),s=0;e>s;s++)o=m(d(),p),u=r(),c[o]=u;return t++,c},v=function(){var e=f(),r=f();return{__PHP_Incomplete_Class_Name:e,serialized:r}},_=function(){var e=o(),r=i[e-1];return i[n++]=r,r},w=function(){var e=o();return i[e-1]},O=function(){var e=null;return i[n++]=e,e};return(r=function(){var e=p();switch(e){case"i":return u();case"d":return s();case"b":return c();case"s":return l();case"a":return h();case"O":return g();case"C":return v();case"r":return _();case"R":return w();case"N":return O();default:throw{name:"Parse Error",message:"Unknown type '"+e+"' at position "+(t-2)}}})()}});var snippetParams=null,TIME_START=Date.now(),LOG=function(e,r){r===undefined&&(r="log"),document.location.search.indexOf("debug=abtest")>0&&console[r](e)},GTMPush=function(e,r){setTimeout(function(){"undefined"==typeof dataLayer&&(dataLayer=[]),dataLayer.push({event:"abTestParticipated",experimentId:"ABTest-"+e,experimentVariation:r})},1e3)},$ajax=function(e){try{var r=e.type||"GET";x=new(this.XMLHttpRequest||ActiveXObject)("MSXML2.XMLHTTP.3.0"),x.timeout=snippetParams.library_tolerance(),x.open(r,e.url,!0),x.setRequestHeader("Content-type","application/x-www-form-urlencoded"),"json"===e.dataType&&xmlHttp.setRequestHeader("Content-type","application/json"),x.onreadystatechange=function(){x.readyState>3&&e.success&&e.success(x.responseText,x)},x.send(e.data)}catch(t){LOG(t)}},userInCampaign=function(e,r){var t=r.cookies["_ABTest_exp_"+e.campaign_id+"_inc"],i=r.cookies["_ABTest_exp_"+e.campaign_id+"_exc"],n={participate:!0,campaign_id:e.campaign_id,included:1,var_id:t,variation:""};if(t!==undefined)return n;if(Object.keys(r.cookies).length>0&&i!==undefined)return n.participate=!1,n.included=0,n;var a=Math.floor(100*Math.random()+1);if(e.traffic>=a){var o=Math.floor(99*Math.random()),u=0;for(var s in e.variations){var c=e.variations[s];if(u+=parseInt(c.traffic),u>o){n.var_id=c.id,n.variation=c.name;break}}return n}return n.participate=!1,n.included=0,n},TargetMatcher=function(userBrowserInfo){var logic={criteria:{},userBrowserInfo:{},formatOutput:function(e,r,t,i){return{matched:e,criteria:r,value:t,run:i}},match:function(e){this.setCampaignCriteria(e);var r={};r.urlCriteria=this.matchUrl(),r.deviceCriteria=this.matchDevice(),r.browserCriteria=this.matchBrowser(),r.cookieCriteria=this.matchCookie(),r.userCriteria=this.matchUser(),r.ipCriteria=this.matchIP(),r.langCriteria=this.matchLanguage(),r.script=this.matchScript();var t=1,i={};for(var n in r)if(0==r[n].run){t=0,i[n]=r[n];break}return{execute:t,reason:i}},setCampaignCriteria:function(e){this.criteria={url:JSON.parse(e.url),device:JSON.parse(e.device),browser:JSON.parse(e.browser),geographic:e.geographic,cookie:JSON.parse(e.cookie),user:JSON.parse(e.user),ip:JSON.parse(e.ip),language:JSON.parse(e.language),script:JSON.parse(e.script)}},matchUrl:function(){var e=this,r={};if(this.criteria.url.url_excludes){var t=this.criteria.url.url_excludes;if(t.forEach(function(t){return e.userBrowserInfo.urlData.url.indexOf(t)>=0?(r=e.formatOutput(!0,"url_excludes",t,0),undefined):undefined}),r.hasOwnProperty("run"))return r}if(this.criteria.url.url_contains){var i=this.criteria.url.url_contains;if(i.forEach(function(t){return e.userBrowserInfo.urlData.url.indexOf(t)>=0?(r=e.formatOutput(!0,"url_includes",t,1),undefined):undefined}),r.hasOwnProperty("run"))return r}if(this.criteria.url.url){var n=this.removeLastSlash(this.userBrowserInfo.urlData.url),a=this.criteria.url.url;if(a.forEach(function(t){var i=t.charAt(0),a=t.charAt(t.length);if("/"==i&&"/"==a){if(n.match(t))return r=e.formatOutput(!0,"url_matched",t,1),undefined}else if(e.removeLastSlash(t)==n)return r=e.formatOutput(!0,"url_matched",t,1),undefined}),r.hasOwnProperty("run"))return r}return e.formatOutput(!1,"url_check",null,0)},matchDevice:function(){var e={matched:!1,criteria:"device_check",run:0},r="true"==this.criteria.device.allow_desktop,t="true"==this.criteria.device.allow_mobile,i="true"==this.criteria.device.allow_tablet,n=this.userBrowserInfo.device;return r&&"desktop"===n?e=this.formatOutput(!0,"device_check",n,1):t&&"phone"===n?e=this.formatOutput(!0,"device_check",n,1):i&&"tablet"===n?e=this.formatOutput(!0,"device_check",n,1):e},matchBrowser:function(){var e=this.userBrowserInfo.browserName,r={};if(this.criteria.browser){var t=this.criteria.browser;for(var i in t)if(t.hasOwnProperty(i)&&"false"==t[i]&&e.indexOf(i)>=0){r=this.formatOutput(!0,"browser_check",i,0);break}if(r.hasOwnProperty("run"))return r}return this.formatOutput(!1,"browser_check",null,1)},matchGeographic:function(){},matchCookie:function(){var e=this,r=!1,t=this.userBrowserInfo.cookies,i={};if(this.criteria.cookie.exclude_cookie&&this.criteria.cookie.exclude_cookie.length>0){var n=this.criteria.cookie.exclude_cookie;if(r=!0,n.forEach(function(r){return t[r]?(i=e.formatOutput(!0,"cookie_exclude",r,0),undefined):undefined}),i.hasOwnProperty("run"))return i}if(this.criteria.cookie.include_cookie&&this.criteria.cookie.include_cookie.length>0){var a=this.criteria.cookie.include_cookie;if(r=!0,a.forEach(function(r){return t[r]?(i=e.formatOutput(!0,"cookie_include",r,1),undefined):undefined}),i.hasOwnProperty("run"))return i}return r?e.formatOutput(!1,"cookies",null,0):e.formatOutput(!1,"cookies",null,1)},matchUser:function(){var e=this,r=this.userBrowserInfo.cookies,t=!1,i={};if("true"==this.criteria.user.all_users)return e.formatOutput(!0,"user_match","all_users",1);if("true"==this.criteria.user.new_users){t=!1;for(var n in r)if(n.indexOf("_ABTest")>=0){i=e.formatOutput(!0,"user_match","new_user",0);break}if(i.hasOwnProperty("run"))return i}else if("true"==this.criteria.user.returning_users){t=!0;for(var n in r)if(n.indexOf("_ABTest")>=0){i=e.formatOutput(!0,"user_match","returning_user",1);break}if(i.hasOwnProperty("run"))return i}return t?e.formatOutput(!1,"user_match",null,0):e.formatOutput(!1,"user_match",null,1)},matchIP:function(){var e="127.0.0.1",r=e.split("."),t={},i=this;if(this.criteria.ip.exclude_ips&&this.criteria.ip.exclude_ips.length>0){var n=this.criteria.ip.exclude_ips;if(n.forEach(function(e){var n=e.split(".");n.length>0&&(t=i.formatOutput(!0,"ip_excludes",e,0),n.forEach(function(e,i){return"*"!=e&&r[i]!=e?(t={},undefined):undefined}))}),t.hasOwnProperty("run"))return t}if(this.criteria.ip.include_ips&&this.criteria.ip.include_ips.length>0){var a=this.criteria.ip.include_ips;if(a.forEach(function(e){var n=e.split(".");n.length>0&&(t=i.formatOutput(!0,"ip_includes",e,1),n.forEach(function(n,a){return"*"!=n&&r[a]!==n?(t=i.formatOutput(!1,"ip_includes",e,0),undefined):undefined}))}),t.hasOwnProperty("run"))return t}return i.formatOutput(!1,"ip",null,1)},matchLanguage:function(){var e=this.userBrowserInfo.languages.toLowerCase(),r={},t=this;if(this.criteria.language.exclude_languages&&this.criteria.language.exclude_languages.length>0){var i=this.criteria.language.exclude_languages;if(i.forEach(function(i){return i.toLowerCase()==e?(r=t.formatOutput(!0,"lang_exclude",e,0),undefined):undefined}),r.hasOwnProperty("run"))return r}if(this.criteria.language.allowed_languages&&this.criteria.language.allowed_languages.length>0){var n=this.criteria.language.allowed_languages;if(r=t.formatOutput(!1,"lang_include",e,0),n.forEach(function(i){return i.toLowerCase()==e?(r=t.formatOutput(!0,"lang_include",e,1),undefined):undefined}),r.hasOwnProperty("run"))return r}return t.formatOutput(!1,"language",null,1)},matchScript:function(){return""==this.criteria.script.js?this.formatOutput(!0,"script",null,1):eval(this.criteria.script.js)?this.formatOutput(!0,"script",null,1):this.formatOutput(!1,"script",null,0)},removeLastSlash:function(e){return"string"==typeof e&&"/"===e.substr(-1)&&(e=e.substr(0,e.length-1)),e}};return logic.userBrowserInfo=userBrowserInfo,logic};return{changes:[],preview:!1,host_name:"https://abclient.datastars.de/",documentUrl:null,executing:!1,snippetParams:null,loadjQuery:function(){LOG("Feature to be added - To load jquery","warn")},storeVariations:function(e){localStorage.setItem("_ABTest_V-"+e.participationObj.campaign_id,JSON.stringify(e))},getLocalCampaigns:function(){for(var e={},r=0;localStorage.length>r;r++){var t=localStorage.key(r);0===t.indexOf("_ABTest_V-")&&(e[t]=JSON.parse(localStorage.getItem(t)))}return e},setDocumentUrl:function(){var e=document.location.href.replace(document.location.search,"");this.documentUrl=this.removeLastSlash(e)},init:function(e,r){snippetParams=r,this.setDocumentUrl();try{"1"==this.getParameters("preview")&&""!=this.getParameters("cid")&&""!=this.getParameters("vid")?(LOG(Date.now()-TIME_START+" : Getting Preview"),this.getPreview(this.getParameters("cid"),this.getParameters("vid"))):(LOG(Date.now()-TIME_START+" : Getting Live"),this.getLive(e))}catch(t){LOG("There was an error."+(""+t),"warn")}},parseJSON:function(e){try{return JSON.parse(e)}catch(r){LOG("Error Parsing JSON","warn")}},serverRequest:function(e){var r=this;$ajax({url:r.host_name+"running?account_id="+e,success:function(e){var e=r.parseJSON(e);e?(LOG(Date.now()-TIME_START+" : OK from server"),e.browserInfo&&e.campaigns&&e.campaigns.length>0?(e.browserInfo.cookies=r.getAllCookies(),e.browserInfo.urlData.referrer=document.referrer,e.browserInfo.urlData.url=document.location.origin,TargetMatcher.prototype.userBrowserInfo=e.browserInfo,e.campaigns.forEach(function(t){LOG(Date.now()-TIME_START+" : Checking if experiment will run now or next time");var i=r.willCampaignRun(t,e.browserInfo);LOG(i),i.execute?(LOG(Date.now()-TIME_START+" : experiment passed targetting criteria"),t.variations=r.removePausedVariations(phpUnserialize(t.variations)),LOG(Date.now()-TIME_START+" : Checking participation status"),t.participationObj=userInCampaign(t,e.browserInfo),t.participationObj.participate?(LOG(Date.now()-TIME_START+" : User Participates"),r.execute(t)):(LOG(Date.now()-TIME_START+" : User is excluded"),r.setCookie("_ABTest_exp_"+t.campaign_id+"_exc",1))):r.campaignCleanUp(t)})):r.campaignCleanUp()):LOG(Date.now()-TIME_START+" : No Experiments found from server")}})},removePausedVariations:function(e){for(var r in e)"true"==e[r].paused&&delete e[r];return e},getLive:function(e){var r=this,t=r.getLocalCampaigns();r.executed=!1;var i=Object.keys(t).length;0==i?(r.serverRequest(e),LOG(Date.now()-TIME_START+" : No experiments found in LocalStorage")):LOG(Date.now()-TIME_START+" : Experiments found in LocalStorage");for(var n in t)r.execute(t[n],function(){i--,0==i&&(LOG(Date.now()-TIME_START+" : Getting latest updates from server and updating the client"),r.serverRequest(e))})},campaignCleanUp:function(e){if(e===undefined)for(var r=0;localStorage.length>r;r++){var t=localStorage.key(r);0===t.indexOf("_ABTest_V-")&&localStorage.removeItem(t)}else localStorage.removeItem("_ABTest_V-"+e.campaign_id)},willCampaignRun:function(e,r){var t=new TargetMatcher(r);return t.match(e)},removeLastSlash:function(e){return"string"==typeof e&&"/"===e.substr(-1)&&(e=e.substr(0,e.length-1)),e},getPreview:function(e,r){var t=this;t.preview=!0,$ajax({url:t.host_name+"running?preview=1&cid="+e,success:function(e){var e=t.parseJSON(e);e&&e.browserInfo&&e.campaigns&&(e.browserInfo.cookies=t.getAllCookies(),e.browserInfo.urlData.referrer=document.referrer,e.browserInfo.urlData.url=document.location.origin,e.campaigns.forEach(function(i){var n=t.willCampaignRun(i,e.browserInfo);LOG(n),n.execute&&(i.variations=phpUnserialize(i.variations),i.participationObj={participate:!0,campaign_id:i.campaign_id,included:1,var_id:r,variation:""},t.execute(i))}))}})},execute:function(e,r){function t(e,r,t){var i=r.variations[r.participationObj.var_id];return i==undefined?(t(status),undefined):(e.runJS(i.js,function(n){LOG(Date.now()-TIME_START+" : Injected Javascript"),e.runCSS(i.css),LOG(Date.now()-TIME_START+" : Injected CSS"),e.preview||(e.storeVariations(r),GTMPush(r.participationObj.campaign_id,i.id),e.setCookie("_ABTest_exp_"+r.participationObj.campaign_id+"_inc",r.participationObj.var_id)),"function"==typeof t&&(LOG(Date.now()-TIME_START+" : Executed experiment from LocalStorage"),t(n))}),undefined)}var i=this;try{i.executing?(i.storeVariations(e),"function"==typeof r&&r(!0)):(t(i,e,r),i.executing=!0)}catch(n){}},runJS:function(js,callback){eval(js),callback(status)},runCSS:function(e){var r=document.createElement("style");r.type="text/css",r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(r)},jQueryLoaded:function(e){var r=setInterval(function(){"undefined"!=typeof jQuery&&(clearInterval(r),e(!0))},5);setTimeout(function(){"undefined"==typeof jQuery&&(LOG("Jquery didnt load on time!","warn"),e(!1)),clearInterval(r)},600)},setCookie:function(e,r){var t=new Date;t=new Date(t.getTime()+864e7),document.cookie=e+"="+r+";expires="+t.toGMTString()+";path=/"},removeCookie:function(e,r,t){document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(t?"; domain="+t:"")+(r?"; path="+r:"")},getAllCookies:function(){var e={};return document.cookie.split(";").forEach(function(r){if(""==r)return{};var t=r.split("=");e[t[0].trim()]=t[1].trim()}),e},getParameters:function(e){for(var r={},t=window.location.search.substring(1),i=t.split("&"),n=0;i.length>n;n++){var a=i[n].split("=");if(r[a[0]]===undefined)r[a[0]]=decodeURIComponent(a[1]);else if("string"==typeof r[a[0]]){var o=[r[a[0]],decodeURIComponent(a[1])];r[a[0]]=o}else r[a[0]].push(decodeURIComponent(a[1]))}return r[e]===undefined?null:r[e]}}}(window,document);window.ABTest=window.$_ABTest=ABTest;