var ABTest=function(window,document,undefined){!function(e,t){"use strict";"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.phpUnserialize=t()}(this,function(){"use strict";return function(e){var t,r=0,n=[],i=0,a=function(){var t=e.indexOf(":",r),n=e.substring(r,t);return r=t+2,parseInt(n,10)},u=function(){var t=e.indexOf(";",r),n=e.substring(r,t);return r=t+1,parseInt(n,10)},o=function(){var e=u();return n[i++]=e,e},s=function(){var t=e.indexOf(";",r),a=e.substring(r,t);return r=t+1,a=parseFloat(a),n[i++]=a,a},c=function(){var t=e.indexOf(";",r),a=e.substring(r,t);return r=t+1,a="1"===a,n[i++]=a,a},l=function(){for(var t,n,i=a(),u=0,o=0;i>o;)t=e.charCodeAt(r+u++),127>=t?o++:o+=t>2047?3:2;return n=e.substring(r,r+u),r+=u+2,n},f=function(){var e=l();return n[i++]=e,e},d=function(){var t=e.charAt(r);return r+=2,t},p=function(){var e=d();switch(e){case"i":return u();case"s":return l();default:throw{name:"Parse Error",message:"Unknown key type '"+e+"' at position "+(r-2)}}},h=function(){var e,u,o,s,c,l=a(),f=[],d={},h=f,g=i++;for(n[g]=h,o=0;l>o;o++)if(e=p(),u=t(),h===f&&parseInt(e,10)===o)f.push(u);else{if(h!==d){for(s=0,c=f.length;c>s;s++)d[s]=f[s];h=d,n[g]=h}d[e]=u}return r++,h},g=function(e,t){var r,n,i;return"\0"!==e.charAt(0)?e:(i=e.indexOf("\0",1),i>0?(r=e.substring(1,i),n=e.substr(i+1),"*"===r?n:t===r?n:r+"::"+n):void 0)},m=function(){var e,u,o,s,c={},f=i++,d=l();for(n[f]=c,e=a(),s=0;e>s;s++)u=g(p(),d),o=t(),c[u]=o;return r++,c},v=function(){var e=l(),t=l();return{__PHP_Incomplete_Class_Name:e,serialized:t}},_=function(){var e=u(),t=n[e-1];return n[i++]=t,t},w=function(){var e=u();return n[e-1]},O=function(){var e=null;return n[i++]=e,e};return(t=function(){var e=d();switch(e){case"i":return o();case"d":return s();case"b":return c();case"s":return f();case"a":return h();case"O":return m();case"C":return v();case"r":return _();case"R":return w();case"N":return O();default:throw{name:"Parse Error",message:"Unknown type '"+e+"' at position "+(r-2)}}})()}});var snippetParams=null,GTMPush=function(e,t){setTimeout(function(){"undefined"==typeof dataLayer&&(dataLayer=[]),dataLayer.push({event:"abTestParticipated",experimentId:"ABTest-"+e,experimentVariation:t})},1e3)},$ajax=function(e){try{var t=e.type||"GET";x=new(this.XMLHttpRequest||ActiveXObject)("MSXML2.XMLHTTP.3.0"),x.timeout=snippetParams.library_tolerance(),x.open(t,e.url,!0),x.setRequestHeader("Content-type","application/x-www-form-urlencoded"),"json"===e.dataType&&xmlHttp.setRequestHeader("Content-type","application/json"),x.onreadystatechange=function(){x.readyState>3&&e.success&&e.success(x.responseText,x)},x.send(e.data)}catch(r){window.console&&console.log(r)}},userInCampaign=function(e,t){var r=t.cookies["_ABTest_exp_"+e.campaign_id+"_inc"],n=t.cookies["_ABTest_exp_"+e.campaign_id+"_exc"],i={participate:!0,campaign_id:e.campaign_id,included:1,var_id:r,variation:""};if(r!==undefined)return i;if(Object.keys(t.cookies).length>0&&n!==undefined)return i.participate=!1,i.included=0,i;var a=Math.floor(100*Math.random()+1);if(e.traffic>=a){var u=Math.floor(99*Math.random()),o=0;for(var s in e.variations){var c=e.variations[s];if(o+=parseInt(c.traffic),o>u){i.var_id=c.id,i.variation=c.name;break}}return i}return i.participate=!1,i.included=0,i},TargetMatcher=function(){var userBrowserInfo=this.userBrowserInfo;return{criteria:{},userBrowserInfo:{},getOutput:function(e,t,r,n){return{matched:e,criteria:t,value:r,run:n}},match:function(e){this.userBrowserInfo=userBrowserInfo,this.setCampaignCriteria(e);var t={};t.urlCriteria=this.matchUrl(),t.deviceCriteria=this.matchDevice(),t.browserCriteria=this.matchBrowser(),t.cookieCriteria=this.matchCookie(),t.userCriteria=this.matchUser(),t.ipCriteria=this.matchIP(),t.langCriteria=this.matchLanguage(),t.script=this.matchScript();var r=1,n={};for(var i in t)if(0==t[i].run){r=0,n[i]=t[i];break}return{matches:t,execute:r,reason:n}},setCampaignCriteria:function(e){this.criteria={url:JSON.parse(e.url),device:JSON.parse(e.device),browser:JSON.parse(e.browser),geographic:e.geographic,cookie:JSON.parse(e.cookie),user:JSON.parse(e.user),ip:JSON.parse(e.ip),language:JSON.parse(e.language),script:JSON.parse(e.script)}},matchUrl:function(){var e=this,t={};if(this.criteria.url.url_excludes){var r=this.criteria.url.url_excludes;if(r.forEach(function(r){return e.userBrowserInfo.urlData.url.indexOf(r)>=0?(t=e.getOutput(!0,"url_excludes",r,0),undefined):undefined}),t.hasOwnProperty("run"))return t}if(this.criteria.url.url_contains){var n=this.criteria.url.url_contains;if(n.forEach(function(r){return e.userBrowserInfo.urlData.url.indexOf(r)>=0?(t=e.getOutput(!0,"url_includes",r,1),undefined):undefined}),t.hasOwnProperty("run"))return t}if(this.criteria.url.url){var i=this.removeLastSlash(this.userBrowserInfo.urlData.url),a=this.criteria.url.url;if(a.forEach(function(r){var n=r.charAt(0),a=r.charAt(r.length);if("/"==n&&"/"==a){if(i.match(reg_url))return t=e.getOutput(!0,"url_matched",r,1),undefined}else if(r==i)return t=e.getOutput(!0,"url_matched",r,1),undefined}),t.hasOwnProperty("run"))return t}return e.getOutput(!1,"url_check",null,0)},matchDevice:function(){var e={matched:!1,criteria:"device_check",run:0},t="true"==this.criteria.device.allow_desktop,r="true"==this.criteria.device.allow_mobile,n=this.userBrowserInfo.device;return t&&"desktop"==n?e=this.getOutput(!0,"device_check",n,1):r&&"phone"==n?e=this.getOutput(!0,"device_check",n,1):e},matchBrowser:function(){var e=this.userBrowserInfo.browserName,t={};if(this.criteria.browser){var r=this.criteria.browser;for(var n in r)if(r.hasOwnProperty(n)&&"false"==r[n]&&e.indexOf(n)>=0){t=this.getOutput(!0,"browser_check",n,0);break}if(t.hasOwnProperty("run"))return t}return this.getOutput(!1,"browser_check",null,1)},matchGeographic:function(){},matchCookie:function(){var e=this,t=!1,r=this.userBrowserInfo.cookies,n={};if(this.criteria.cookie.exclude_cookie&&this.criteria.cookie.exclude_cookie.length>0){var i=this.criteria.cookie.exclude_cookie;if(t=!0,i.forEach(function(t){return r[t]?(n=e.getOutput(!0,"cookie_exclude",t,0),undefined):undefined}),n.hasOwnProperty("run"))return n}if(this.criteria.cookie.include_cookie&&this.criteria.cookie.include_cookie.length>0){var a=this.criteria.cookie.include_cookie;if(t=!0,a.forEach(function(t){return r[t]?(n=e.getOutput(!0,"cookie_include",t,1),undefined):undefined}),n.hasOwnProperty("run"))return n}return t?e.getOutput(!1,"cookies",null,0):e.getOutput(!1,"cookies",null,1)},matchUser:function(){var e=this,t=this.userBrowserInfo.cookies,r=!1,n={};if("true"==this.criteria.user.all_users)return e.getOutput(!0,"user_match","all_users",1);if("true"==this.criteria.user.new_users){r=!1;for(var i in t)if(i.indexOf("_ABTest")>=0){n=e.getOutput(!0,"user_match","new_user",0);break}if(n.hasOwnProperty("run"))return n}else if("true"==this.criteria.user.returning_users){r=!0;for(var i in t)if(i.indexOf("_ABTest")>=0){n=e.getOutput(!0,"user_match","returning_user",1);break}if(n.hasOwnProperty("run"))return n}return r?e.getOutput(!1,"user_match",null,0):e.getOutput(!1,"user_match",null,1)},matchIP:function(){var e="127.0.0.1",t=e.split("."),r={},n=this;if(this.criteria.ip.exclude_ips&&this.criteria.ip.exclude_ips.length>0){var i=this.criteria.ip.exclude_ips;if(i.forEach(function(e){var i=e.split(".");i.length>0&&(r=n.getOutput(!0,"ip_excludes",e,0),i.forEach(function(e,n){return"*"!=e&&t[n]!=e?(r={},undefined):undefined}))}),r.hasOwnProperty("run"))return r}if(this.criteria.ip.include_ips&&this.criteria.ip.include_ips.length>0){var a=this.criteria.ip.include_ips;if(a.forEach(function(e){var i=e.split(".");i.length>0&&(r=n.getOutput(!0,"ip_includes",e,1),i.forEach(function(i,a){return"*"!=i&&t[a]!==i?(r=n.getOutput(!1,"ip_includes",e,0),undefined):undefined}))}),r.hasOwnProperty("run"))return r}return n.getOutput(!1,"ip",null,1)},matchLanguage:function(){var e=this.userBrowserInfo.languages.toLowerCase(),t={},r=this;if(this.criteria.language.exclude_languages&&this.criteria.language.exclude_languages.length>0){var n=this.criteria.language.exclude_languages;if(n.forEach(function(n){return n.toLowerCase()==e?(t=r.getOutput(!0,"lang_exclude",e,0),undefined):undefined}),t.hasOwnProperty("run"))return t}if(this.criteria.language.allowed_languages&&this.criteria.language.allowed_languages.length>0){var i=this.criteria.language.allowed_languages;if(t=r.getOutput(!1,"lang_include",e,0),i.forEach(function(n){return n.toLowerCase()==e?(t=r.getOutput(!0,"lang_include",e,1),undefined):undefined}),t.hasOwnProperty("run"))return t}return r.getOutput(!1,"language",null,1)},matchScript:function(){return""==this.criteria.script.js?this.getOutput(!0,"script",null,1):eval(this.criteria.script.js)?this.getOutput(!0,"script",null,1):this.getOutput(!1,"script",null,0)},removeLastSlash:function(e){return"string"==typeof e&&"/"===e.substr(-1)&&(e=e.substr(0,e.length-1)),e}}};return{changes:[],preview:!1,host_name:"https://abclient.datastars.de/",documentUrl:null,executed:!1,snippetParams:null,loadjQuery:function(){console.warn("Feature to be added - To load jquery")},storeVariations:function(e){localStorage.setItem("_ABTest_V-"+e.participationObj.campaign_id,JSON.stringify(e))},getLocalCampaigns:function(){for(var e={},t=0;localStorage.length>t;t++){var r=localStorage.key(t);0===r.indexOf("_ABTest_V-")&&(e[r]=JSON.parse(localStorage.getItem(r)))}return e},setDocumentUrl:function(){var e=document.location.href.replace(document.location.search,"");this.documentUrl=this.removeLastSlash(e)},init:function(e,t){snippetParams=t,this.setDocumentUrl();try{"1"==this.getParameters("preview")&&""!=this.getParameters("cid")&&""!=this.getParameters("vid")?this.getPreview(this.getParameters("cid"),this.getParameters("vid")):this.getLive(e)}catch(r){console.warning("There was an error."+(""+r))}},parseJSON:function(e){try{return JSON.parse(e)}catch(t){console.warn("Error Parsing JSON")}},serverRequest:function(e){var t=this;$ajax({url:t.host_name+"running?account_id="+e,success:function(e){var e=t.parseJSON(e);e&&(e.browserInfo&&e.campaigns&&e.campaigns.length>0?(e.browserInfo.cookies=t.getAllCookies(),e.browserInfo.urlData.referrer=document.referrer,e.browserInfo.urlData.url=document.location.origin,TargetMatcher.prototype.userBrowserInfo=e.browserInfo,e.campaigns.forEach(function(r){var n=t.willCampaignRun(r);console.log(n),n.execute?(r.variations=t.removePausedVariations(phpUnserialize(r.variations)),r.participationObj=userInCampaign(r,e.browserInfo),r.participationObj.participate?t.execute(r):t.setCookie("_ABTest_exp_"+r.campaign_id+"_exc",1)):t.campaignCleanUp(r)})):t.campaignCleanUp())}})},removePausedVariations:function(e){for(var t in e)"true"==e[t].paused&&delete e[t];return e},getLive:function(e){var t=this,r=t.getLocalCampaigns();t.executed=!1;var n=Object.keys(r).length;0==n&&t.serverRequest(e);for(var i in r)t.execute(r[i],function(){n--,0==n&&t.serverRequest(e)})},campaignCleanUp:function(e){if(e===undefined)for(var t=0;localStorage.length>t;t++){var r=localStorage.key(t);0===r.indexOf("_ABTest_V-")&&localStorage.removeItem(r)}else localStorage.removeItem("_ABTest_V-"+e.campaign_id)},willCampaignRun:function(e){var t=new TargetMatcher;return t.match(e)},removeLastSlash:function(e){return"string"==typeof e&&"/"===e.substr(-1)&&(e=e.substr(0,e.length-1)),e},getPreview:function(e,t){var r=this;r.preview=!0,$ajax({url:r.host_name+"running?preview=1&cid="+e,success:function(e){var e=r.parseJSON(e);e&&e.browserInfo&&e.campaigns&&(e.browserInfo.cookies=r.getAllCookies(),e.browserInfo.urlData.referrer=document.referrer,e.browserInfo.urlData.url=document.location.origin,TargetMatcher.prototype.userBrowserInfo=e.browserInfo,e.campaigns.forEach(function(e){var n=r.willCampaignRun(e);console.log(n),n.execute&&(e.variations=phpUnserialize(e.variations),e.participationObj={participate:!0,campaign_id:e.campaign_id,included:1,var_id:t,variation:""},r.execute(e))}))}})},execute:function(e,t){function r(e,t,r){var n=t.variations[t.participationObj.var_id];return n==undefined?(r(status),undefined):(e.runJS(n.js,function(i){e.runCSS(n.css),e.executed=!0,e.preview||(e.storeVariations(t),GTMPush(t.participationObj.campaign_id,n.id),e.setCookie("_ABTest_exp_"+t.participationObj.campaign_id+"_inc",t.participationObj.var_id)),"function"==typeof r&&r(i)}),document.getElementsByTagName("html")[0].style.display="block",undefined)}var n=this;try{this.executed?(console.log("stored latest variation"),n.storeVariations(e),"function"==typeof t&&t(!0)):(console.log("running"),r(n,e,t))}catch(i){}setTimeout(function(){document.getElementsByTagName("html")[0].style.display="block"},900),setTimeout(function(){var e=document.getElementById("_abtest_path_hides");null!==e&&e.parentElement.removeChild(e)},800)},runJS:function(js,callback){this.jQueryLoaded(function(status){status&&eval(js),callback(status)})},runCSS:function(e){var t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)},jQueryLoaded:function(e){var t=setInterval(function(){"undefined"!=typeof jQuery&&(clearInterval(t),e(!0))},5);setTimeout(function(){"undefined"==typeof jQuery&&(console.warn("Jquery didnt load on time!"),e(!1)),clearInterval(t)},600)},setCookie:function(e,t){var r=new Date;r=new Date(r.getTime()+864e7),document.cookie=e+"="+t+";expires="+r.toGMTString()+";path=/"},removeCookie:function(e,t,r){document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(r?"; domain="+r:"")+(t?"; path="+t:"")},getAllCookies:function(){var e={};return document.cookie.split(";").forEach(function(t){if(""==t)return{};var r=t.split("=");e[r[0].trim()]=r[1].trim()}),e},getParameters:function(e){for(var t={},r=window.location.search.substring(1),n=r.split("&"),i=0;n.length>i;i++){var a=n[i].split("=");if(t[a[0]]===undefined)t[a[0]]=decodeURIComponent(a[1]);else if("string"==typeof t[a[0]]){var u=[t[a[0]],decodeURIComponent(a[1])];t[a[0]]=u}else t[a[0]].push(decodeURIComponent(a[1]))}return t[e]===undefined?null:t[e]}}}(window,document);window.ABTest=window.$_ABTest=ABTest;