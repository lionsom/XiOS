define("biz_wap/utils/fakehash.js",["biz_common/dom/event.js"],function(t){
"use strict";
function s(t){
t=t||location.hash.substr(1);
var s,o,e,i,r=!1,c=[];
for(s=0;s<h.length;s++)o=h[s],e=o[0],i=o[1],e!==a?("string"==typeof e&&e===t||e instanceof RegExp&&e.test(t))&&(i(n),
r=!0):c.push(i);
if(!r)for(s=0;s<c.length;s++)c[s](n,t);
n=t;
}
var o=t("biz_common/dom/event.js"),h=[],a="__default_hash__",n=location.hash.substr(1);
return o.on(window,"popstate",function(t){
var o=a;
t.state&&t.state.hash&&(o=t.state.hash),s(o);
}),o.on(window,"hashchange",s),o.on(window,"load",function(){
history.state&&history.state.hash&&s(history.state.hash);
}),{
val:function(){
return history.state&&history.state.hash||location.hash.substr(1);
},
push:function(t){
history.pushState?(history.pushState({
hash:t
},document.title,location.href),s(t)):location.hash=t;
},
replace:function(t){
history.replaceState?(history.replaceState({
hash:t
},document.title,location.href),s(t)):this.push(t);
},
on:function(t,s){
"function"==typeof t&&(s=t,t=a),h.push([t,s]);
}
};
});function _typeof(t){
return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t;
}
define("common/keyboard.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js","pages/bottom_input_bar.js","common/utils.js"],function(t){
"use strict";
var e=t("biz_wap/jsapi/core.js"),n=t("biz_common/dom/event.js"),o=t("biz_wap/utils/mmversion.js"),i=t("pages/bottom_input_bar.js"),s=t("common/utils.js"),a=o.getInner(),r={
vertical:0,
horizontal:0
};
0===window.orientation||180===window.orientation?(r.vertical=s.getInnerHeight(),
r.horizontal=screen.width-(screen.height-r.vertical)):(r.horizontal=s.getInnerHeight(),
r.vertical=screen.width-(screen.height-r.horizontal+60));
var c=!1,u=!1,d=!0;
o.isIOS&&o.gtVersion("7.0.16")?(c=!0,u=!0):o.isAndroid&&(o.gtVersion("7.0.18")&&"27001634">a||a>="28000038")&&(c=!0,
u=a>="27001700");
var l={
keyboard:0,
input:0,
cmtInput:0
},f=[],p=!1,h=null,m=!1,y=null,b=null,g=null,w=!1,v=!1;
c&&(u&&(h=document.createElement("div"),h.style.cssText="width: 100%; height: 100%; position: fixed; top: 0; background-color: transparent; z-index: 99999999; display: none;",
document.body.appendChild(h),n.on(h,"touchmove",function(t){
m&&t.preventDefault();
})),s.listenStateChange({
cb:function(t){
"onDestroy"===t.state&&(h&&(h.style.display="none"),"function"==typeof b&&b(""),
"function"==typeof g&&g(""));
}
}));
var j=function(){
return c?!0:(console.log("Not support keyboard."),!1);
},C=function(t,e){
w&&(e=y.$inputWrapper.height()),f.length&&f.forEach(function(n){
"function"==typeof n&&n({
keyboard:t,
input:e,
updateKeyboard:l.keyboard!==t,
updateInput:!v&&l.input!==e,
updateCmtInput:v&&l.cmtInput!==e
});
}),l.keyboard=t,l[v?"cmtInput":"input"]=e;
};
return{
canUseKeyboard:c,
canUseCancel:u,
onlyUseH5Keyboard:d,
lastData:l,
onGetKeyboardHeight:function(t){
-1===f.indexOf(t)&&(p||(p=!0,e.on("onGetKeyboardHeight",function(t){
return C(t.height,t.inputHeight);
})),f.push(t));
},
offGetKeyboardHeight:function(t){
var e=f.indexOf(t);
e>-1&&f.splice(e,1);
},
show:function(t){
if(j()||t.forceFallback||t.forceFallbackIfUnsupport){
if(b=t.cancel,g=t.hide,d||t.forceFallback){
var n=function(){
w=!0,y||(y=new i);
var e=!1;
return y.addListener("submit",function(){
e=!0,"function"==typeof t.success&&t.success(y.getContent());
}),y.addListener("hide",function(t){
var n=y.getContent();
e||"function"==typeof b&&b(n),"function"==typeof g&&g(n,t),e=!1;
}),y.addListener("show",function(){
"function"==typeof t.show&&t.show();
}),y.addListener("input",function(){
"function"==typeof t.input&&t.input(y.getContent());
}),y.addListener("fail",function(){
"function"==typeof t.fail&&t.fail();
}),y.addListener("showEmotionPanel",function(e){
"function"==typeof t.showEmotionPanel&&t.showEmotionPanel(e);
}),y.addListener("hideEmotionPanel",function(){
"function"==typeof t.hideEmotionPanel&&t.hideEmotionPanel();
}),y.addListener("inputHeightChange",function(e){
l.input=e,"function"==typeof t.inputHeightChange&&t.inputHeightChange(e);
}),y.setContent(t.text||""),y.setLimit(t.maxLength||0),y.setPlaceholder(t.placeholder||""),
y.show(t.toggleEmotion,t.isFullscreen,t.isLandscape),{
v:void 0
};
}();
if("object"===("undefined"==typeof n?"undefined":_typeof(n)))return n.v;
}
w=!1;
var o={
text:t.text||"",
placeholder:"native"+(t.placeholder||""),
maxLength:t.maxLength||0,
showRemindWordCount:t.showRemindWordCount||0,
disableScrollAdjustment:void 0===t.disableScrollAdjustment?!0:t.disableScrollAdjustment,
customParams:{}
};
t.scrollContentY&&(o.scrollContentY=t.scrollContentY),t.mask&&h&&(h.style.display=""),
m=!!t.disableScroll,"comment"===t.type?(v=!0,o.customParams={
showType:1,
sendButtonWord:"留言",
leftWords:"写留言",
rightWords:"取消",
editBoxHeight:120
}):"reply"===t.type&&(o.customParams={
showType:0,
sendButtonWord:"回复"
}),o.customParams.switchToSmile=!!t.toggleEmotion,e.invoke("showKeyboard",o,function(e){
switch(v=!1,h&&(h.style.display="none"),e.err_msg){
case"showKeyboard:ok":
"function"==typeof t.success&&t.success(e.text);
break;

case"showKeyboard:cancel":
"function"==typeof b&&b(e.text);
}
"function"==typeof g&&g(e.text);
}),"function"==typeof t.show&&t.show();
}
},
hide:function(){
d?y&&y.hide():e.invoke("showKeyboard",{
hidden:!0
});
}
};
});function _defineProperty(e,t,n){
return t in e?Object.defineProperty(e,t,{
value:n,
enumerable:!0,
configurable:!0,
writable:!0
}):e[t]=n,e;
}
function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);
}
return e;
};
define("video/video_tail_utils.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","a/a_config.js","biz_common/utils/url/parse.js","a/a_utils.js","biz_wap/utils/mmversion.js","pages/utils.js","common/comm_report.js","biz_common/dom/event.js","biz_common/dom/class.js","common/utils.js"],function(e){
"use strict";
function t(e,t,n){
if(H){
var i={
__videoTailPlayerId__:H,
action:e,
data:t
};
"function"==typeof n&&(i.callbackId=F+Q++,G[i.callbackId]=n),window.parent.postMessage(i,document.location.protocol+"//mp.weixin.qq.com");
}else"function"!=typeof n&&(n=function(){}),z.invoke(e,t,n);
}
function n(e,t){
"function"==typeof t&&(G[e]?G[e].push(t):G[e]=[t],z.on(e,t));
}
function i(e){
"object"===_typeof(e.data)&&"string"==typeof e.data.hostEnvEvent&&G[e.data.hostEnvEvent]&&G[e.data.hostEnvEvent].forEach(function(t){
return t(e.data.res);
});
}
function o(){
return C.cpVersion("7.0.9",1,!0);
}
function a(e){
X=_extends(X,e);
}
function s(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
for(var t in e)e[t]&&(ot[t]=e[t]);
}
function r(){
return R.hasClass(it,"has_ad")?1:0;
}
function d(){
return _extends({
ReportWithTailAd:r()
},ot);
}
function c(){
t("handleMPPageAction",{
action:"closeAdWebview"
});
}
function l(e){
return o()||X.hasAd&&!e?void(e?X.hidePanelAd&&X.hidePanelAd():X.showTailPanel&&X.showTailPanel(X)):void c();
}
function u(){
return H?q:window.innerWidth===screen.width&&window.innerHeight===screen.height||window.innerWidth===screen.height&&window.innerHeight===screen.width;
}
function p(e){
var t;
return M.join(location.origin+"/mp/authreadtemplate?t=pages/video_tail",(t={
vid:window.cgiData.vid,
item_show_type:window.item_show_type,
idx:window.idx,
mid:window.mid,
sn:window.sn,
scene:window.scene,
appmsg_type:window.appmsg_type,
msg_title:window.msg_title,
ct:window.ct,
send_time:window.send_time,
abtest_cookie:window.abtest_cookie,
msg_daily_idx:window.msg_daily_idx,
user_uin:window.user_uin,
__biz:window.biz,
pos_type_list:9,
get_ad_after_video:1
},_defineProperty(t,D.HAS_AD_DATA_QUERY_KEY,e?1:0),_defineProperty(t,"enterid",window.enterid),
_defineProperty(t,"subscene",window.subscene),_defineProperty(t,"oriStatus",window.cgiData.ori_status),
_defineProperty(t,"hitBizUin",window.cgiData.hit_bizuin),_defineProperty(t,"hitVid",window.cgiData.hit_vid),
_defineProperty(t,"sessionid",window.sessionid),_defineProperty(t,"devicetype",window.devicetype),
_defineProperty(t,"playerType",B.getPlayerType()),_defineProperty(t,"hasSubscribed",X.hasSubscribed?1:0),
_defineProperty(t,"continueid",window.continueid+""),_defineProperty(t,"continueseq",1*M.getQuery("continueseq")||1),
t));
}
function _(e){
at=e;
}
function f(e,t,n){
if(!Y||n){
var i=p(at)+"&wcslplayerId="+t;
window.__second_open__?W({
url:i,
type:"GET",
f:"html",
success:function(t){
e.setAttribute("src",i),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(t),
e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,i);
}
}):e.setAttribute("src",i),U=e,Y=!0;
}
}
function m(e){
Y||z.invoke("handleMPPageAction",{
action:"createAdWebview",
adUrl:p(e)
},function(e){
return e.err_msg.indexOf("fail")>-1?void k.report115849(40):void(Y=!0);
});
}
function w(e){
a({
showTailPanel:e.showTailPanel,
hidePanelAd:e.hidePanelAd
}),n("onMPAdWebviewStateChange",function(e){
"appear"===e.state&&(e.forceNoAd&&a({
hasAd:!1
}),l(),X.hasAd&&setTimeout(function(){
X.showAd&&X.showAd();
},10));
});
}
function v(e){
function t(){
o=!0,setTimeout(function(){
return a?void(o=!1):(s+=d,(X.canCreateTailWebview||r>=i-s)&&m(),void t());
},1e3*d);
}
function n(){
z.invoke("handleMPPageAction",{
action:"getMPVideoState"
},function(n){
n.vid===e&&(s=parseInt(n.currentTime,10)>=parseInt(n.duration,10)?0:n.currentTime,
i=n.duration,"play"===n.state&&!o&&t());
});
}
var i=void 0,o=void 0,a=!1,s=0,r=10,d=.5;
z.on("onMPVideoStateChange",function(e){
"play"===e.state?(n(),a=!1):"enterFullScreen"!==e.state&&"exitFullScreen"!==e.state&&(a=!0);
}),n();
}
function y(e){
v(e),z.on("onMPAdWebviewStateChange",function(e){
"destroy"===e.state&&(Y=!1);
});
}
function b(e){
n("onReceiveMPPageData",function(t){
e&&e(t);
});
}
function g(e,n){
U&&"adWeb"===n?U.contentWindow.postMessage({
hostEnvEvent:"onReceiveMPPageData",
res:{
data:e
}
},document.location.protocol+"//mp.weixin.qq.com"):t("handleMPPageAction",{
action:"sendMPPageData",
data:e,
sendTo:n
});
}
function h(e){
var t=u(),n=void 0;
n=r()?t?184:183:t?181:180,V.report(17149,_extends({
EventType:t?46:47
},d())),e.dataset.scene=n;
}
function P(e){
Z&&(e?(et.style.display="none",tt.style.display="",!J&&(nt.style.display="")):(et.style.display="",
tt.style.display="none",nt.style.display="none"),J=e);
}
function T(){
if(Z){
var e=u();
e&&K||!e&&$||(V.report(17149,_extends({
EventType:e?70:71
},d())),e?K=!0:$=!0);
}
}
function j(){
V.report(17149,_extends({
EventType:u()?72:73
},d()));
}
function S(){
return J;
}
function I(e){
W({
url:"/mp/videochannel_profile_page?action=check_contact&biz_username="+e.userName+"&__biz="+e.biz,
dataType:"json",
success:function(t){
var n=1===t.subscribed;
e.success&&e.success(n);
}
});
}
function E(e){
function t(){
I({
userName:e.userName,
biz:e.biz,
success:function(e){
P(e),T(),e&&g("hasSubscribed","commshareWeb");
}
});
}
O.getId("js_tail_panel_account_name").innerHTML=e.nickname,O.getId("js_tail_panel_account_avatar").src=e.headImg,
e.subscribed||P(!1),e.notBindProfileEvt?!function(){
var e=it.getElementsByClassName("js_go_profile")[0];
N.tap(e,function(){
h(e);
});
}():O.go2ProfileEvent({
$container:it,
user_name:e.userName,
beforeGo2Profile:h,
tabType:2
}),Z&&(N.on(et,"tap",function(){
var t=void 0;
j(),t=u()?"186":"185",z.invoke("addContact",{
webtype:"1",
username:e.userName,
scene:t,
scenenote:e.pageUrl||""
},function(e){
e.err_msg.indexOf("ok")>-1&&(P(!0),g("hasSubscribed","commshareWeb"));
});
}),N.bindVisibilityChangeEvt(function(e){
if(e){
var n=3;
t();
for(var i=1;n>=i;i++)setTimeout(t,200*n);
}
}));
}
function A(){
N.tap(O.getId("js_tail_share_button"),function(){
V.report(17149,_extends({
EventType:u()?53:54
},d()));
});
}
function x(e){
if(!o()||!it)return void(e.fallback&&e.fallback());
e.reportData.PlayerType=1,s(e.reportData),it.style.display="",$=!1;
var t={
Vid:ot.VideoId,
BizUin:ot.BizUserName,
msgid:ot.MsgId,
itemidx:ot.Idx,
Type:1,
ClientTime:Date.now(),
Fromid:ot.Scene,
SessionId:ot.SessionIdStr,
Device:C.isIOS?1:2
};
e.isAppMsg?V.report(12710,_extends({},ot,t,{
Step:17,
ClientTime:Date.now()
})):(V.report(17149,_extends({
EventType:65
},ot)),V.report(17149,_extends({
EventType:67
},ot)),V.report(17149,_extends({
EventType:69
},ot)),(!e.subscribed&&!L||!J&&L)&&T()),L||(E(e),A(),N.tap(O.getId("js_replay"),function(){
return it.style.display="none",e.replay&&e.replay(),e.isAppMsg?V.report(12710,_extends({},ot,t,{
Step:18,
ClientTime:Date.now()
})):V.report(17149,_extends({
EventType:52
},ot)),!1;
},!0),L=!0);
}
var W=e("biz_wap/utils/ajax.js"),z=e("biz_wap/jsapi/core.js"),D=e("a/a_config.js"),M=e("biz_common/utils/url/parse.js"),k=e("a/a_utils.js"),C=e("biz_wap/utils/mmversion.js"),O=e("pages/utils.js"),V=e("common/comm_report.js"),N=e("biz_common/dom/event.js"),R=e("biz_common/dom/class.js"),B=e("common/utils.js"),H=M.getQuery("wcslplayerId"),q=!1,U=null,F="video_tail_callback_",Q=0,G={};
H&&window.addEventListener("message",function(e){
"object"===_typeof(e.data)&&"string"==typeof e.data.callbackId&&e.data.callbackId.startsWith(F)?(G[e.data.callbackId]&&G[e.data.callbackId](e.data.res),
delete G[e.data.callbackId]):i(e);
});
var L=!1,Y=!1,K=!1,$=!1,J=!0,X={},Z=C.isIOS&&C.cpVersion("7.0.15",1,!0);
Z=Z||C.isAndroid&&C.cpVersion("7.0.17",1,!0);
var et=O.getId("js_btn_account_subscription"),tt=O.getId("js_profile_icon"),nt=O.getId("js_subscription_success"),it=O.getId("js_video_tail_panel"),ot={
EnterId:parseInt(Date.now()/1e3,10),
ItemShowType:5
};
H&&n("onWcSlPlayerFullscreenChange",function(e){
q=e.state,"string"==typeof e.padding&&(document.body.style.padding=e.padding);
});
var at=!1;
return{
createTailWebview:m,
initEvent4TailWebview:w,
listenAndCreateTailWebview:v,
onReceiveMPPageData:b,
setTailOpts:a,
showTailPanel:l,
sendMPPageData:g,
handleTailWebviewState:y,
closeTailWebview:c,
initProfile:E,
initWebTailPanel:x,
isFullScreen:u,
getSubscribedStatus:S,
reportSubscribeBtnExpose:T,
changeSubscribeStatus:P,
getSubscribedData:I,
supportTailPanel:o,
getReportData:d,
initShareBtnReport:A,
setReportData:s,
setHasAdData4WcSlPlayer:_,
initTailIframe4WcSlPlayer:f,
emitHostEnvEvent4WcSlPlayer:i,
sendMessageToHostEnv:t
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
function _toConsumableArray(e){
if(Array.isArray(e)){
for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];
return o;
}
return Array.from(e);
}
define("a/web_compt_ad.js",["biz_wap/utils/mmversion.js","common/utils.js","a/a_config.js","biz_common/utils/url/parse.js","a/a_utils.js","biz_common/dom/offset.js","biz_wap/utils/ajax.js","a/appdialog_confirm.js","biz_wap/jsapi/core.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function t(e,t){
return e+" | "+t;
}
function o(e,t){
if(!e)return null;
var o=t.aInfo;
console.log("广告 "+o.aid+"使用了 web 组件渲染模式");
var a=document.createElement("wx-ad");
a.className="web_compt_ad",a.scrolling="no",a.createComptTime=Date.now();
var i={
adData:o,
pageData:h(t,e,a.createComptTime)
};
return a.innerHTML='<template slot="renderData">'+JSON.stringify(i).htmlEncodeLite()+"</template>",
e.appendChild(a),n.isIOS&&(a.style.width="1px",a.style.minWidth="100%"),p.report128729(0),
a;
}
function a(){
this.aInfoMap={};
}
var n=e("biz_wap/utils/mmversion.js"),i=e("common/utils.js"),r=e("a/a_config.js"),s=e("biz_common/utils/url/parse.js"),p=e("a/a_utils.js"),d=e("biz_common/dom/offset.js"),c=e("biz_wap/utils/ajax.js"),m=e("a/appdialog_confirm.js"),u=e("biz_wap/jsapi/core.js"),l=!!s.getQuery("mock")||!!s.getQuery("rtx"),f=e("biz_wap/utils/jsmonitor_report.js"),w=r.AD_POS,g=window.__report,_=document.getElementById("page-content"),y=document.getElementById("js_bottom_ad_area"),h=function(e,t,o){
var a="8"===window.item_show_type&&i.isNativePage(),n="";
return e.aInfo.pos_type===w.POS_MID&&(n=t&&t.dataset&&t.dataset.category_id_list),
{
biz:window.biz,
uin:window.uin,
scene:window.scene,
source:window.source,
idx:window.idx,
mid:window.mid,
isSg:window.isSg,
userUin:window.user_uin,
sn:window.sn,
appmsgid:window.appmsgid,
sendTime:window.send_time||"",
passTicket:decodeURIComponent(window.pass_ticket),
globalAdDebug:l,
bodyScrollTop:i.getScrollTop(),
contentOffsetHeight:_?_.offsetHeight:0,
adOffsetTop:d.getOffset(t).offsetTop,
screenHeight:i.getInnerHeight(),
midCategoryIdList:n,
heightWidthRate:e.heightWidthRate,
createComptTime:o,
skin:a?"black":"white"
};
};
return a.prototype.config=function(e){
this.configData=e;
},a.prototype.handleAd=function(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],o=0,a=this;
this.midAdDataCount=t,this.webComptAdInfos=e,e.forEach(function(e){
return a.aInfoMap[e.aid]={
aInfo:e
},e.pos_type===w.POS_MID?(a.initMidAd(a.aInfoMap[e.aid],o),void o++):void(e.pos_type===w.POS_BOTTOM&&a.initBottomAd(a.aInfoMap[e.aid]));
});
var n=document.getElementById("js_article");
n&&n.addEventListener("click",function(){
for(var e in a.aInfoMap)Object.prototype.hasOwnProperty.call(a.aInfoMap,e)&&a.aInfoMap[e].webComptEle&&a.aInfoMap[e].webComptEle.onClickOutside&&a.aInfoMap[e].webComptEle.onClickOutside();
});
},a.prototype.initMidAd=function(e,t){
var a=e.aInfo;
this.configData.insertAutoAdElement(a,!1,t,this.midAdDataCount);
var n=document.getElementsByTagName("mpcpc")[t];
if(n){
var i=o(n,this.aInfoMap[a.aid]);
p.report128729(1),this.aInfoMap[a.aid].webComptEle=i,this.addTagListeners(e,i),g&&g(125);
}
},a.prototype.initBottomAd=function(e){
var t=e.aInfo,a=o(y,this.aInfoMap[t.aid]);
p.report128729(2),this.aInfoMap[t.aid].webComptEle=a,this.addTagListeners(e,a);
},a.prototype.warpProxyCallback=function(e,t,o){
return function(){
for(var a=arguments.length,n=Array(a),i=0;a>i;i++)n[i]=arguments[i];
n=o&&"function"==typeof o?o.apply(void 0,_toConsumableArray(n)):n[0],t.data&&"openUrlWithExtraWebview"===t.data.methodName&&-1===n.err_msg.indexOf("ok")&&(location.href=t.data.args.url),
e.proxyCallback({
proxyId:t.proxyId,
data:n
});
};
},a.prototype.addTagListeners=function(e,o){
var a=this,n=this,i=e.aInfo;
o.addEventListener("ready",function(){
o.setData({
pageData:a.getPageData(e),
adData:i
});
}),o.addEventListener("proxy",function(a){
var i=a.detail;
if(i)if("request"===i.proxyType)n.commonRequest(i.data,n.warpProxyCallback(o,i));else if("appDialogConfirm"===i.proxyType)m({
app_name:i.data.app_name,
app_img_url:i.data.icon_url,
onOk:n.warpProxyCallback(o,i,function(){
return{
err_msg:"appDialogConfirm:yes"
};
}),
onCancel:n.warpProxyCallback(o,i,function(){
return{
err_msg:"appDialogConfirm:cancel"
};
})
});else if("jsapi"===i.proxyType){
var s=function(){
var a=n.checkApiInvokeValid(e,i.data);
if("string"==typeof a)return n.warpProxyCallback(o,i,function(){
return{
err_msg:a
};
})(),{
v:void 0
};
try{
"on"===i.data.methodType?u[i.data.methodType](i.data.methodName,n.warpProxyCallback(o,i)):u[i.data.methodType](i.data.methodName,i.data.args,n.warpProxyCallback(o,i));
}catch(s){
console.error(s),n.warpProxyCallback(o,i,function(){
return{
err_msg:t(r.INVALID_METHOD_TYPE_MSG_PREFIX,i.data.methodType)
};
})();
}
}();
if("object"===("undefined"==typeof s?"undefined":_typeof(s)))return s.v;
}else console.error("unknow webCompt proxy:",i);else console.error("tag proxy without proxyData:",a);
});
},a.prototype.checkApiInvokeValid=function(e,o){
if(!e)return"Invalid aid";
var a=e.aInfo,n=o.methodName;
return-1===r.AD_JSAPI_WHITE_LIST.indexOf(n)?t(r.INVALID_METHOD_NAME_MSG_PREFIX,n):"addContact"!==n&&"profile"!==n||a&&a.biz_info&&o.args.username===a.biz_info.user_name?("preloadMiniProgramContacts"===n&&f.setSum(114217,5,1),
!0):t(r.INVALID_ARGS_MSG_PREFIX,"Invalid biz username");
},a.prototype.commonRequest=function(e,o){
var a=e||{},n=a.path&&p.checkRequestUrlAllowed(a.path);
return n?void c({
type:a.requestType,
url:s.join(a.path,a.requestQuery||{}),
data:a.requestBody||{},
mayAbort:!0,
success:function(e){
o({
err_msg:"request:success",
response:e
});
},
error:function(e,t){
var a={};
try{
a={
readyState:e.readyState,
response:e.response,
responseText:e.responseText,
responseType:e.responseType,
responseURL:e.responseURL,
responseXML:e.responseXML,
status:e.status,
statusText:e.statusText,
timeout:e.timeout
};
}catch(n){
console.error(n);
}
o({
err_msg:"request:error",
xhr:a,
err_info:t
});
}
}):void o({
err_msg:t(r.INVALID_REQ_PATH_MSG_PREFIX,a.path)
});
},a.prototype.getPageData=function(e){
var t="8"===window.item_show_type&&i.isNativePage(),o=e.webComptEle.parentNode,a="";
return e.aInfo.pos_type===w.POS_MID&&(a=o&&o.dataset&&o.dataset.category_id_list),
{
biz:window.biz,
uin:window.uin,
scene:window.scene,
source:window.source,
idx:window.idx,
mid:window.mid,
isSg:window.isSg,
userUin:window.user_uin,
sn:window.sn,
appmsgid:window.appmsgid,
sendTime:window.send_time||"",
passTicket:decodeURIComponent(window.pass_ticket),
globalAdDebug:l,
bodyScrollTop:i.getScrollTop(),
contentOffsetHeight:_?_.offsetHeight:0,
adOffsetTop:d.getOffset(e.webComptEle).offsetTop,
screenHeight:i.getInnerHeight(),
midCategoryIdList:a,
heightWidthRate:e.heightWidthRate,
createComptTime:e.webComptEle.createComptTime,
skin:t?"black":"white"
};
},a;
});define("a/appdialog_confirm.js",["widget/wx_profile_dialog_primary.css","a/a_utils.js","common/utils.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_common/tmpl.js","biz_common/dom/event.js","a/appdialog_confirm.html.js"],function(o){
"use strict";
o("widget/wx_profile_dialog_primary.css");
var e=o("a/a_utils.js"),n=o("common/utils.js"),i=o("biz_wap/jsapi/core.js"),a=o("biz_common/utils/url/parse.js"),m=o("biz_common/tmpl.js"),c=o("biz_common/dom/event.js"),s=o("a/appdialog_confirm.html.js"),t=function(o){
if(e.isVideoSharePageOnlyAd()||n.isNativePage()||a.getQuery("get_ad_after_video"))return void i.invoke("confirmDialog",{
title:"是否立即下载该应用",
contentDesc:o.app_name,
confirmText:"下载",
cancelText:"取消",
msgIconUrl:o.app_img_url,
msgIconWidth:50,
msgIconHeight:50
},function(e){
e.err_msg.indexOf("confirmDialog:ok")>-1?o.onOk&&o.onOk():o.onCancel&&o.onCancel();
});
var t=document.createElement("div");
t.innerHTML=m.tmpl(s,o,!1),document.body.appendChild(t),c.on(t.getElementsByClassName("js_ok")[0],"click",function(){
o.onOk&&o.onOk(),document.body.removeChild(t);
}),c.on(t.getElementsByClassName("js_cancel")[0],"click",function(){
o.onCancel&&o.onCancel(),document.body.removeChild(t);
});
};
return t;
});define("biz_common/utils/comm_report.js",[],function(){
"use strict";
var r={
web:{
report:"/cgi-bin/webreport"
},
wap:{
report:"/mp/wapcommreport"
}
},o=function(r,o){
return o=JSON.parse(JSON.stringify(o)),o.log_id=r,console.log("[comm_report] reportjson: ",o),
JSON.stringify(o);
},e=function(r,o,e){
return function(n){
n&&0!==n.err_code&&console.warn("[comm_report] report "+r+" fail: ",n.err_msg,o),
"function"==typeof e.success&&e.success(n);
};
},n=function(r,o,e){
return function(n,t){
console.error("[comm_report] report "+r+" error: ",t,o),"function"==typeof e.error&&e.error(n,t);
};
},t=!1,c=[],p={
web:{
report:function(t,c,p,s){
s=s||{},t.post({
url:r.web.report,
data:{
reportjson:o(c,p)
},
async:s.async,
success:e(c,p,s),
error:n(c,p,s)
});
},
leaveReport:function(r,o,e){
if(c.push([r,o,e]),!t){
t=!0;
var n=!1,s=function(){
n||(n=!0,c.forEach(function(r){
p.web.report(r[0],r[1],r[2]);
}));
};
window.addEventListener("beforeunload",s,!1),window.addEventListener("unload",s,!1);
}
}
},
wap:{
report:function(t,c,p,s){
s=s||{},t({
type:"POST",
dataType:"json",
url:r.wap.report,
data:{
reportjson:o(c,p)
},
async:s.async,
success:e(c,p,s),
error:n(c,p,s)
});
}
}
};
return{
report:function(r,o,e,n,t){
p[r].report(o,e,n,t);
},
leaveReport:function(r,o,e,n){
p[r].leaveReport(o,e,n);
},
getUrl:function(o,e){
return r[o][e];
},
getData:function(r,e,n){
var t=o(r,e);
return n&&(t=encodeURIComponent(t)),"reportjson="+t;
}
};
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n  <div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n    <div class="discuss_container editing access">\n        <div class="discuss_container_inner">\n          <div class="discuss_container_hd">\n            <h2 class="rich_media_title">\n                <#if(window.item_show_type == 10){#>\n                    <#=textPageTitle#>\n                <#}else{#>\n                    <#=window.msg_title.html(1)#>\n                <#}#>\n            </h2><!-- 标题要转义 -->\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                            <img class="pic_default_primary" src="<#=window.icon_emotion_switch_primary#>" alt="">\n                            <img class="pic_active_primary" src="<#=window.icon_emotion_switch_active_primary#>" alt="">\n                        </span>\n                    </div>\n                </span>\n            </div>\n            <div class="emotion_panel" id="js_emotion_panel">\n                <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                    <i class="emotion_panel_arrow arrow_out"></i>\n                    <i class="emotion_panel_arrow arrow_in"></i>\n                </span>\n                <div class="emotion_list_wrp" id="js_slide_wrapper">\n                    <!--<ul class="emotion_list"></ul>-->\n                    <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                </div>\n                <ul class="emotion_navs" id="js_navbar">\n                    <!--<li class="emotion_nav"></li>-->\n                </ul>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n          </div>\n          <div class="discuss_container_bd">\n            <div class="" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">我的留言</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n            <div class="weui-dialog__wrp weui-transition_opacity-hide" id="js_delete_panel_mobile">\n                <div class="weui-mask"></div>\n                <div class="weui-dialog">\n                    <div class="weui-dialog__bd">确定删除留言吗？</div>\n                    <div class="weui-dialog__ft">\n                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" id="js_delete_cancel_mobile">取消</a>\n                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" id="js_delete_confirm_mobile">删除</a>\n                    </div>\n                </div>\n            </div>\n          </div>\n        </div>\n    </div>\n  </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title.html(1)#></h2><!-- 标题要转义 -->\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">我的留言</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">加载中</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">已留言</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n<div class="weui-webview-nav" style="display:none;" id="js_fake_bar">\n    <button class="weui-webview-nav__btn_goback" id="js_cmt_goback">goback</button>\n    <button class="weui-webview-nav__btn_forward weui-webview-nav__btn_disabled" disabled="disabled">forward</button>\n</div>\n';
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>"\n    id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>"\n    data-elected="<#=report_elected#>"\n    data-friend="<#=report_friend#>"\n    data-content_id="<#=content_id#>"\n    >\n    <div class="discuss_item_hd">\n      <div class="user_info">\n          <div class="nickname_wrp">\n            <img class="avatar" src="<#=logo_url#>">\n            <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n            <i class="icon_appmsg_tag theme_tag">作者</i>\n            <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_appmsg_tag">置顶</span><# } #>\n          </div>\n      </div>\n      <# if (!isWxWork) { #>\n      <div class="discuss_opr">\n          <# if (is_from_me == 1) { #>\n            <a class="discuss_opr_meta discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n          <# } #>\n          <# if(is_elected == 1){ #>\n          <span class="discuss_opr_meta media_tool_meta meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>" data-my-id=\'<#=my_id#>\'>\n            <button class="sns_opr_btn sns_praise_btn"><span data-num="<#=like_num#>" data-like="<#=like_status#>" class="sns_opr_num sns_opr_gap praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span></button>\n          </span>\n          <# } else { #>\n            <span class="discuss_opr_meta">未精选</span>\n          <# } #>\n      </div>\n      <# } #>\n    </div>\n\n    <!-- 预览上次回复内容 -->\n    <!-- <div class="discuss_reply_primary">\n      <strong class="discuss_reply_nickname">昵称：</strong>\n      <p class="discuss_reply_content">Dolor reprehenderit repellendus eos quam.</p>\n    </div> -->\n\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content js_comment_content" data-content="<#=content#>" data-my-id="<#=my_id#>"><#=content#></div>\n    </div>\n    <# if(reply_new && reply_new.reply_list && reply_new.reply_list.length > 0){ #>\n        <# for(var i = 0; i < reply_new.reply_list.length; i++){ #>\n            <div class="reply_result js_reply_item <# if (reply_new.reply_list[i].is_same) {#> reply_result_same <# } #>" <#if (i>=3 && type != \'mine\'){ #> style="display:none" <# } #> data-my-id="<#=my_id#>">\n                <div class="discuss_item_hd">\n                    <# if(reply_new.reply_list[i].is_from_author == 1){ #>\n                        <div class="user_info author_info">\n                        <div class="nickname_wrp">\n                            <img class="avatar" src="<#=logo_url#>">\n                            <div class="nickname">作者昵称作者昵称</div>\n                            <i class="icon_appmsg_tag theme_tag">作者</i>\n                        </div>\n                        </div>\n                    <# } else { #>\n                        <div class="user_info">\n                            <div class="nickname_wrp">\n                            <img class="avatar" src="<#=logo_url#>">\n                            <strong class="nickname"><#=nick_name#></strong>\n                            </div>\n                        </div>\n                    <# } #>\n                    <# if (!isWxWork) { #>\n                    <div class="discuss_opr">\n                        <# if(reply_new.reply_list[i].reply_del_flag == 0){ #>\n                            <# if (reply_new.reply_list[i].is_from_me == 1) { #>\n                                <a class="discuss_opr_meta discuss_del js_reply_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>" data-reply-id="<#=reply_new.reply_list[i].reply_id#>">删除</a>\n                            <# } #>\n                            <# if (reply_new.reply_list[i].reply_is_elected == 1){ #>\n                                <span class="discuss_opr_meta media_tool_meta meta_praise js_reply_praise <# if(reply_new.reply_list[i].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply_new.reply_list[i].reply_like_status#>" data-content-id="<#=content_id#>" data-my-id="<#=my_id#>" data-reply-id=\'<#=reply_new.reply_list[i].reply_id#>\' data-scene="<#=scene#>">\n                                  <button class="sns_opr_btn sns_praise_btn"><span data-num="<#=reply_new.reply_list[i].reply_like_num#>" data-like="<#=reply_new.reply_list[i].reply_like_status#>" class="sns_opr_num sns_opr_gap praise_num"><# if(reply_new.reply_list[i].reply_like_num_format !== 0){ #><#=reply_new.reply_list[i].reply_like_num_format#> <# } #></span></button>\n                                </span>\n                            <# } else { #>\n                                <span class="discuss_opr_meta js_reply_elect_status" data-reply-id=\'<#=reply_new.reply_list[i].reply_id#>\' data-my-id="<#=my_id#>">未精选</span>\n                            <# } #>\n                        <# } #>\n                    </div>\n                    <# } #>\n                </div>\n                <div class="discuss_message">\n                        <# if(reply_new.reply_list[i].reply_del_flag == 1){ #>\n                            <div class="discuss_message_content discuss_message_del">此回复已被删除</div>\n                        <# } else { #>\n                            <div class="discuss_message_content js_reply_content" data-reply-id="<#=reply_new.reply_list[i].reply_id#>" data-my-id="<#=my_id#>" data-content="<#=reply_new.reply_list[i].content#>"><#=reply_new.reply_list[i].content#></div>\n                        <# } #>\n                </div>\n            </div>\n        <# } #>\n    <# } #>\n    <# if(replyListCount > 3 && type != \'mine\'){ #>\n    <div class="discuss_extra_info js_extend_comment discuss_more_access" data-my-id="<#=my_id#>" data-num="<#=replyListCount-3#>">余下<#= replyListCount-3 #>条</div>\n    <# } #>\n    <!-- 上线前暂时隐藏回复入口 -->\n    <# if (supportReply) { #>\n    <p class="discuss_extra_info js_reply_div" data-my-id="<#=my_id#>" <#if (replyListCount > 3 && type != \'mine\'){ #> style="display:none" <# } #>>\n        <a class="js_comment_reply" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">回复</a>\n    </p>\n    <# } #>\n</li>\n<#}else{#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"  data-num="<#=like_num#>"  data-like="<#=like_status#>"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_discuss_top">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>\n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply_new && reply_new.reply_list && reply_new.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply_new.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply_new.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply_new.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"  data-num="<#=reply_new.reply_list[0].reply_like_num#>" data-like="<#=reply_new.reply_list[0].reply_like_status#>"><# if(reply_new.reply_list[0].reply_like_num_format !== 0){ #><#=reply_new.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply_new.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply_new.reply_list[0].time#></p>\n        </div>\n    <# } #>\n\n</li>\n<#}#>\n';
});define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("appmsg/articleReport.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function n(i){
i.dom&&(i.dom.style.display="",t.tap(i.dom,function(){
var n=["https://mp.weixin.qq.com/mp/infringement?url=",encodeURIComponent(i.link.htmlDecode()),"&title=",encodeURIComponent(i.title),"&__biz=",window.biz].join("");
return location.href=n+"#wechat_redirect",!1;
}));
}
i("biz_common/utils/string/html.js");
{
var t=i("biz_common/dom/event.js"),e=i("biz_wap/utils/mmversion.js");
({
not_in_mm:!e.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger")
});
}
return{
init:n
};
});define("appmsg/topic_tpl.html.js",[],function(){
return'<span class="db topic_wrp">\n    <span class="topic_thumb" style="background-image:url({img_url});"></span>\n    <span class="topic_content">\n        <strong class="topic_title">{title}</strong>\n        <span class="topic_desc">{author}</span>\n        <span class="topic_info">\n            <span class="topic_info_extra"><span class="icon_topic"></span>话题</span>\n            <span class="topic_info_primary">相关文章{msg_num}篇</span>\n        </span>\n    </span>\n</span>\n';
});define("appmsg/minishop/minishop_tpl.html.js",[],function(){
return'<# if(cardtype === \'mini\') {#>\n<div role="button" class="appmsg_card_context wx_tap_card minishop_card minishop_card_small js_wx_tap_highlight" data-wxaproduct-productid="<#=productId#>" data-wxaproduct-appid="<#=appid#>" data-wxaproduct-cardtype="<#=cardtype#>">\n  <div class="minishop_card_hd">\n    <i aria-label="商品，" class="minishop_card_thumb" style="background-image:url(<#=headimg#>);"></i>\n  </div>\n  <div class="minishop_card_bd">\n    <div class="minishop_main_context">\n      <strong class="minishop_card_title"><#=title#></strong>\n      <# if(avatar && nickname) { #>\n      <div class="minishop_card_profile weui-flex">\n        <img class="minishop_card_profile_avatar" src="<#=avatar#>" alt="">\n        <strong class="minishop_card_profile_nickname"><#=nickname#></strong>\n      </div>\n      <# } #>\n    </div>\n    <div class="minishop_extra_context weui-flex">\n      <em class="minishop_card_price"><#=price#></em>\n      <button class="weui-btn weui-btn_xmini minishop_card_buy_btn" type="button"><i class="icon_minishop_card_buy"></i>购买</button>\n    </div>\n  </div>\n</div>\n<#} else { #>\n<div role="button" class="appmsg_card_context wx_tap_card minishop_card minishop_card_large js_wx_tap_highlight" data-wxaproduct-productid="<#=productId#>" data-wxaproduct-appid="<#=appid#>" data-wxaproduct-cardtype="<#=cardtype#>">\n  <div class="minishop_card_hd">\n    <i aria-label="商品，" class="minishop_card_thumb" style="background-image:url(<#=headimg#>);"></i>\n  </div>\n  <div class="minishop_card_bd weui-flex__item">\n    <div class="minishop_main_context">\n      <strong class="minishop_card_title"><#=title#></strong>\n      <# if(avatar && nickname) { #>\n      <div class="minishop_card_profile weui-flex">\n        <img class="minishop_card_profile_avatar" src="<#=avatar#>" alt="">\n        <strong class="minishop_card_profile_nickname"><#=nickname#></strong>\n      </div>\n      <# } #>\n    </div>\n    <div class="minishop_extra_context weui-flex">\n      <em class="minishop_card_price"><#=price#></em>\n      <button class="weui-btn weui-btn_xmini minishop_card_buy_btn" type="button"><i class="icon_minishop_card_buy"></i>购买</button>\n    </div>\n  </div>\n</div>\n<# } #>\n';
});define("appmsg/appmsg_live_tpl.html.js",[],function(){
return'<# if (liveDeleted) { #>\n  <!--直播 已被删除-->\n  <div class="appmsg__live appmsg__live__unusual">直播间已被删除</div>\n<# } else { #>\n  <div class="appmsg__live">\n    <div class="appmsg__live__inner">\n      <div class="appmsg__live__main">\n        <div class="appmsg__live__cover__image" style="background: #FFF url(<#=cover#>) no-repeat center top / cover"></div>\n        <div class="appmsg__live__status__area">\n          <!--未开播-->\n          <div class="appmsg__live__status">\n            <div class="appmsg__live__status__tag"><#=tagStatusWord#></div><span class="appmsg__live__status__info"><#=statusInfoWord#></span>\n          </div>\n        </div>\n        <div class="appmsg__live__like-area js_live_like-area">\n          <# if (isInLive) { #>\n            <div class="appmsg__live__like-animation js_live_like-animation"></div>\n          <# } #>\n          <div class="appmsg__live__like-icon">\n            <div class="person-operation__item__inner mode-filter-black">\n              <div class="appmsg__live__like-icon__image"></div>\n            </div>\n          </div>\n          <div class="appmsg__live__like-info"><#=likeCount#></div>\n        </div>\n      </div>\n      <div class="appmsg__live__extend">\n        <div class="appmsg__live__extend__main">\n          <p class="appmsg__live__title"><#=title#></p>\n          <p class="appmsg__live__desc"><#=desc#></p>\n        </div>\n        <# if (showEntryBtn) { #>\n          <a href="javascript:;" class="appmsg__live__extend__button"><#=btnStatusWord#></a>\n        <# } #>\n      </div>\n    </div>\n  </div>\n<# } #>\n';
});define("appmsg/profile/ban_alert_tpl.html.js",[],function(){
return'<div id="js_profile_ban" style="display: none;">\n    <div class="weui-mask_transparent"></div>\n    <div class="weui-toast">\n        <i class="weui-icon-warn weui-icon_toast"></i>\n        <p class="weui-toast__content">该账号因违规无法跳转</p>\n    </div>\n</div>';
});