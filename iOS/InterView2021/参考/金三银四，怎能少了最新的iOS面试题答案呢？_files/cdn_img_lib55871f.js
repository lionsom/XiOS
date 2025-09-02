define("appmsg/voicemsg.js",["biz_wap/ui/weui.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js","pages/voice_component.js"],function(e){
"use strict";
e("biz_wap/ui/weui.js");
var i=e("biz_wap/jsapi/core.js"),t=e("biz_wap/utils/ajax.js"),o=e("pages/voice_component.js"),n=document.getElementById("js_read_container"),a={
player:null,
srcId:"__wxtag__"+window.biz+"-"+window.mid+"-"+window.idx,
mediaId:"",
tag:"===mediaId-sep===",
playDuration:0,
playTime:0,
maxNum:5,
curNum:0,
format:"",
type:6,
speed:100,
voiceInfo:{
title:"",
nickname:"",
appmsgUrl:"",
duration:0
},
voiceOpt:null,
lock:!1,
status:"stop",
currentTime:0,
beginTime:0,
leaveNeedReport:!1,
pause2PlayNeedReport:!1,
isSeek:!1,
loadingTimer:null
},s=function(e){
return e+"&uin="+window.uin+"&key="+window.key+"&pass_ticket="+encodeURIComponent(window.pass_ticket);
},d=function(e){
return e||null===a.loadingTimer?void i.invoke("handleMPPageAction",{
action:"showToast",
status:e?"loading":"dismissloading"
}):(clearTimeout(a.loadingTimer),void(a.loadingTimer=null));
},r=function c(){
if(a.curNum>10)return d(!1),a.lock=!1,void weui.alert("系统繁忙，请稍后再试");
a.curNum++;
var e=a.curNum>a.maxNum?5e3:1e3;
t({
url:"/mp/msgvoice?action=getvoiceinfo&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&type="+a.type+"&speed="+a.speed,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
if(i&&i.base_resp&&0===i.base_resp.ret)if(i.mediaid){
a.mediaId=i.mediaid;
var t=encodeURIComponent("__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx),o=a.voiceInfo;
a.voiceOpt={
protocol:2===i.format?"hls":"",
src:s("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&mediaid="+i.mediaid+"&devicetype="+window.devicetype+"&_type="+a.type+"&speed="+a.speed+"&encodeurl="+t),
lowbandUrl:s("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&mediaid="+i.mediaid+"&devicetype="+window.devicetype+"&_type="+a.type+"&speed="+a.speed+"&encodeurl="+t),
title:o.title,
epname:"来自文章",
singer:o.nickname?"的语音":"公众号语音",
srcId:a.srcId+a.tag+a.mediaId,
coverImgUrl:"",
webUrl:o.appmsgUrl,
musicbar_url:"https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&type="+a.type+"#wechat_redirect",
needStartMusicUI:0
},m();
}else setTimeout(c,1e3);else console.log("getvoiceinfo err",i),setTimeout(c,e);
},
error:function(i){
console.log("getvoiceinfo err",i),setTimeout(c,e);
}
});
},m=function(){
a.player=o.init({
protocal:"hls",
wxIndex:a.voiceOpt.srcId,
type:7,
comment_id:"",
src:a.voiceOpt.src,
jsapi2Src:a.voiceOpt.src+"&voice_type=1",
allowPause:!0,
duration:a.voiceInfo.duration,
title:a.voiceOpt.title,
singer:a.voiceOpt.singer,
epname:a.voiceOpt.epname,
coverImgUrl:a.voiceOpt.coverImgUrl,
playingCss:"share_audio_playing",
playCssDom:n.getElementsByClassName("js_read_main")[0],
playArea:n.getElementsByClassName("js_read_play")[0],
progress:n.getElementsByClassName("js_read_progress")[0],
fileSize:0,
playtimeDom:n.getElementsByClassName("js_read_playtime")[0],
bufferDom:n.getElementsByClassName("js_read_buffer")[0],
playdotDom:n.getElementsByClassName("js_read_playdot")[0],
seekRange:n.getElementsByClassName("js_read_seekRange")[0],
seekContainer:n.getElementsByClassName("js_read_main")[0],
loadingDom:n.getElementsByClassName("js_read_loading")[0],
detailArea:"",
detailUrl:a.voiceOpt.musicbar_url,
webUrl:a.voiceOpt.musicbar_url
});
};
t({
url:"/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&type="+a.type+"&f=json",
type:"GET",
dataType:"json",
async:!0,
success:function(e){
e&&e.base_resp&&0===e.base_resp.ret?(a.voiceInfo={
title:e.title,
nickname:e.nickname,
appmsgUrl:e.appmsg_url,
duration:1*e.voice_info.duration
},r(),n.getElementsByClassName("js_read_duration")[0].innerHTML=function(e){
var i=function(e){
return e>=10?e:"0"+e;
};
return i(Math.floor(e/60))+":"+i(e%60);
}(1*e.voice_info.duration)):weui.alert("系统繁忙，请稍后再试");
},
error:function(e){
console.log("ttspage err: ",e),weui.alert("网络不可用，请检查网络设置");
}
});
});define("appmsg/autoread.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","pages/voice_tpl.html.js","pages/voice_component.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
var e=d("autoread");
e&&(e.innerHTML='<p><label>朗读类型：</label>                                <select id="autoreadSelect">                                <option selected="true" value="0">女1</option>                                <option value="1">女2</option>                                <option value="2">男1</option>                                <option value="6">男2</option>                                </select></p><p id="autoread_voice"></p>',
r.on(d("autoreadSelect"),"change",function(){
p.player&&(p.player.destory(),p.player=null),p.checkAudioId&&(clearTimeout(p.checkAudioId),
p.checkAudioId=null);
var e=d("autoreadSelect");
d("autoread_voice").innerHTML="",o(e.value);
}),o(0));
}
function o(e){
var i=d("autoread_voice");
p._oMusic={
voiceid:p.voiceid,
duration_str:"",
posIndex:p.posIndex,
title:"文章朗读体验（"+p.voiceType[e||0]+"）",
nickname:window.nickname||"公众号"
},s.renderPlayer(u,p._oMusic,i,!0),d("voice_author_"+p.key).innerHTML="来自"+p._oMusic.nickname+"（创建音频中）",
c(e);
}
function n(e,i){
var o=p._oMusic;
d("voice_author_"+p.key).innerHTML="来自"+o.nickname,d("voice_duration_"+p.key).innerHTML=s.formatTime(1*i),
p.player=s.init({
protocal:"hls",
wxIndex:o.posIndex,
type:2,
songId:e,
src:a("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&media="+e),
allowPause:!0,
autoPlay:!0,
duration:i,
title:o.title,
singer:o.nickname?o.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:d("voice_main_"+p.key),
playArea:d("voice_play_"+p.key),
progress:d("voice_progress_"+p.key),
fileSize:o.fileSize,
playtimeDom:d("voice_playtime_"+p.key),
bufferDom:d("voice_buffer_"+p.key),
playdotDom:d("voice_playdot_"+p.key),
seekRange:d("voice_seekRange_"+p.key),
seekContainer:d("voice_main_"+p.key),
loadingDom:d("voice_loading_"+p.key)
});
}
function t(e){
p.curNum+=1;
var i=1e3;
p.curNum>p.maxNum&&(i=2e3);
var o=["/mp/msgvoice?action=get_media&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(o){
o.mediaid&&o.duration?n(o.mediaid,o.duration):p.checkAudioId=setTimeout(function(){
t(e);
},i);
},
error:function(){
p.checkAudioId=setTimeout(function(){
t(e);
},i);
}
});
}
function a(e){
return e+=["&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&uin=",window.uin||"","&key=",window.key||"","&pass_ticket=",window.pass_ticket||"","&clientversion=",window.clientversion||"","&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join("");
}
function c(e){
p.curNum=0;
var i=["/mp/msgvoice?action=tts&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:i,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?t(e):d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
},
error:function(){
d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
}
});
}
function d(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),u=e("pages/voice_tpl.html.js"),s=e("pages/voice_component.js"),m=e("biz_wap/utils/ajax.js"),p={
checkId:"",
voiceid:"autoread",
posIndex:0,
key:"autoread_0",
voiceType:{
0:"女1",
1:"女2",
2:"男1",
6:"男2"
},
maxNum:5,
curNum:0
};
i();
});var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var o=arguments[e];
for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);
}
return t;
};
define("appmsg/poi/poi.js",["biz_common/utils/string/html.js","appmsg/poi/poi_tpl.html.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","common/utils.js","pages/player_tips.js","biz_wap/utils/mmversion.js","common/comm_report.js","biz_wap/utils/jsmonitor_report.js","biz_common/base64.js","common/tap_highlight.js","biz_common/dom/class.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var e=t("appmsg/poi/poi_tpl.html.js"),o=t("biz_common/dom/event.js"),n=t("biz_wap/jsapi/core.js"),i=t("biz_common/tmpl.js"),a=t("common/utils.js"),r=t("pages/player_tips.js"),d=t("biz_wap/utils/mmversion.js"),s=t("common/comm_report.js"),m=t("biz_wap/utils/jsmonitor_report.js"),p=t("biz_common/base64.js"),c=t("common/tap_highlight.js"),u=t("biz_common/dom/class.js"),l={
tagName:"mppoi",
isWechat:(d.isAndroid||d.isIOS)&&d.isWechat&&!d.isWxwork,
screen_height:a.getInnerHeight(),
commonReportData:{
bizuin:1*p.decode(window.biz),
msgid:1*window.mid,
itemidx:1*window.idx,
sessionidnew:window.sessionid,
enterid:1*window.enterid
},
poiDom:[]
},g=function(){
return document.documentElement.scrollTop||document.body.scrollTop;
},h=function(t){
l.isWechat?n.invoke("openLocation",{
latitude:1*t.latitude,
longitude:1*t.longitude,
name:t.name,
address:t.address,
infoUrl:""
},function(t){
-1!==t.err_msg.indexOf("ok")?m.setSum(110809,53,1):m.setSum(110809,54,1);
}):new r({
msg:"请使用移动端微信打开。"
});
},b=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.dom,n=t.poiInfo;
o.on(e,"tap",function(t){
c.highlightEle(e),t.stopPropagation(),t.preventDefault(),s.report(19937,_extends({},l.commonReportData,{
type:2,
actiontype:2
})),m.setSum(110809,55,1),h(n);
},!0),o.on(e,"click",function(t){
t.preventDefault(),t.stopPropagation();
},!0);
},f=function(){
for(var t=0;t<l.poiDom.length;t++){
var e=l.poiDom[t];
if(1*e.getAttribute("data-hasreport")!==1){
e.setAttribute("data-hasreport",1);
var o=g();
e.clientHeight+e.offsetTop>=o+e.clientHeight/2&&e.clientHeight+e.offsetTop<=o+e.clientHeight/2+l.screen_height&&("A"===e.tagName?(s.report(19937,_extends({},l.commonReportData,{
type:1,
actiontype:1
})),m.setSum(110809,58,1)):(s.report(19937,_extends({},l.commonReportData,{
type:2,
actiontype:1
})),m.setSum(110809,56,1)));
}
}
};
o.on(window,"scroll",f);
var _=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
t.node&&t.data&&t.data.img&&!function(){
var o=function(t){
var o=t.node,n=t.data;
return function(){
var t=document.createElement("div");
t.innerHTML=i.tmpl(e,{
data:n
},!0).replace(/>\s*</g,"><").replace(/^\s+/,"").replace(/\s+$/,"");
var a=t.firstChild;
o.parentNode.insertBefore(a,o.nextSibling);
var r=o.parentNode.querySelector('[data-preloadingid="'+n.id+'"]');
r&&r.parentNode.removeChild(r),b({
dom:a,
poiInfo:n
}),l.poiDom.push(a),f();
};
}(t),n=function(){
this.onload=null,this.onerror=null,o();
},a=new Image;
a.onload=n,a.onerror=n,a.src=t.data.img;
}();
},j=function(){
for(var t=document.querySelectorAll(l.tagName),e=0,n=t.length;n>e;e++){
var i=t[e],a={
id:decodeURIComponent(i.getAttribute("data-id")||""),
name:decodeURIComponent(i.getAttribute("data-name")||""),
address:decodeURIComponent(i.getAttribute("data-address")||""),
img:decodeURIComponent(i.getAttribute("data-img")||""),
longitude:decodeURIComponent(i.getAttribute("data-longitude")||""),
latitude:decodeURIComponent(i.getAttribute("data-latitude")||""),
type:decodeURIComponent(i.getAttribute("data-type")||"")
};
_({
data:a,
node:i
});
}
for(var r=document.getElementsByClassName("js_poi_entry"),d=0;d<r.length;d++)!function(t){
var e=r[t];
l.poiDom.push(e),o.on(e,"tap",function(t){
t.stopPropagation(),t.preventDefault(),u.addClass(e,"wx_tap_link"),c.highlightEle(e);
var o={
id:decodeURIComponent(e.getAttribute("data-id")||""),
name:decodeURIComponent(e.getAttribute("data-name")||""),
address:decodeURIComponent(e.getAttribute("data-address")||""),
img:decodeURIComponent(e.getAttribute("data-img")||""),
longitude:decodeURIComponent(e.getAttribute("data-longitude")||""),
latitude:decodeURIComponent(e.getAttribute("data-latitude")||""),
type:decodeURIComponent(e.getAttribute("data-type")||"")
};
return o.longitude&&o.latitude&&o.name&&o.address&&(s.report(19937,_extends({},l.commonReportData,{
type:1,
actiontype:2
})),m.setSum(110809,57,1),h(o)),!1;
},!0),o.on(e,"click",function(t){
t.preventDefault(),t.stopPropagation();
},!0);
}(d);
f();
};
j();
});var _extends=Object.assign||function(e){
for(var o=1;o<arguments.length;o++){
var t=arguments[o];
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
}
return e;
};
define("appmsg/search/search.js",["biz_common/utils/string/html.js","appmsg/search/search_tpl.html.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","common/utils.js","pages/player_tips.js","biz_wap/utils/mmversion.js","common/comm_report.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var o=e("appmsg/search/search_tpl.html.js"),t=e("biz_common/dom/event.js"),n=e("biz_wap/jsapi/core.js"),r=e("biz_common/tmpl.js"),i=e("common/utils.js"),s=e("pages/player_tips.js"),a=e("biz_wap/utils/mmversion.js"),m=e("common/comm_report.js"),d=e("biz_wap/utils/jsmonitor_report.js"),c={
tagName:"mpsearch",
isWechat:(a.isAndroid||a.isIOS)&&a.isWechat&&!a.isWxwork,
keywords:[],
screen_height:i.getInnerHeight(),
exposeHasReport:0,
commonReportData:{
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
SearchKeyWord:"",
SessionId:window.sessionid,
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene
}
},p=function(){
return document.documentElement.scrollTop||document.body.scrollTop;
},l=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
t.on(e.dom,"click",function(){
var e=c.keywords.map(function(e){
return e.label;
}).join(";");
if(m.report(19453,_extends({},c.commonReportData,{
SearchKeyWord:e,
EventType:2
})),d.setSum(110809,47,1),c.isWechat){
if(a.isIOS&&a.ltVersion("7.0.12")||a.isAndroid&&a.ltVersion("7.0.12"))return void new s({
msg:"当前微信版本不支持展示该内容，请升级至最新版本。"
});
for(var o=[],t=0;t<c.keywords.length;t++)o.push({
hotword:c.keywords[t].label,
id:t,
optype:1
});
n.invoke("openWXSearchPage",{
query:"",
thirdExtParam:JSON.stringify({
data:[{
items:o,
title:window.nickname+"推荐搜索",
type:4
}],
from:"mpWidget",
bizUserName:window.user_name,
bizNickName:window.nickname,
id:"mpWidget_"+c.commonReportData.BizUin+":"+c.commonReportData.MsgId+":"+c.commonReportData.ItemIdx
})
},function(e){
-1!==e.err_msg.indexOf("ok")?d.setSum(110809,48,1):d.setSum(110809,49,1);
});
}else new s({
msg:"请使用移动端微信打开。"
});
});
var o=function(){
if(!c.exposeHasReport){
c.exposeHasReport=1;
var o=p();
if(e.dom.clientHeight+e.dom.offsetTop>=o+e.dom.clientHeight/2&&e.dom.clientHeight+e.dom.offsetTop<=o+e.dom.clientHeight/2+c.screen_height){
var t=c.keywords.map(function(e){
return e.label;
}).join(";");
m.report(19453,_extends({},c.commonReportData,{
SearchKeyWord:t,
EventType:1
})),d.setSum(110809,46,1);
}
}
};
t.on(window,"scroll",o),o();
},u=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(e.node&&e.data&&e.data.keywords){
var t=function(e){
var t=e.node,n=e.data;
return function(){
var e=document.createElement("div");
e.innerHTML=r.tmpl(o,{
data:n
},!0).replace(/>\s*</g,"><").replace(/^\s+/,"").replace(/\s+$/,"");
var i=e.firstChild;
t.parentNode.insertBefore(i,t.nextSibling);
var s=t.parentNode.querySelector('[data-preloadingid="mpsearch"]');
s&&s.parentNode.removeChild(s),l({
dom:i,
keywords:n.keywords
});
};
}(e);
t();
}
},w=function(){
var e=document.querySelectorAll(c.tagName);
if(!(e.length<=0))for(var o=0,t=e.length;t>o;o++){
var n=e[o],r=[];
try{
r=JSON.parse(window.decodeURIComponent(n.getAttribute("data-keywords")));
}catch(i){
d.setSum(110809,50,1);
}
if(r.length){
var s={
nickname:window.nickname,
avatar:window.round_head_img,
keywords:r
};
c.keywords=r,u({
data:s,
node:n
});
}
}
};
w();
});define("redpackage/redpacketcover.js",["biz_common/utils/string/html.js","redpackage/tpl/card_tpl.html.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","common/utils.js","common/comm_report.js","pages/player_tips.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var t=e("redpackage/tpl/card_tpl.html.js"),a=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),i=e("biz_common/tmpl.js"),o=e("common/utils.js"),n=e("common/comm_report.js"),d=e("pages/player_tips.js"),s=e("biz_common/utils/url/parse.js"),c=e("biz_wap/utils/mmversion.js"),u=e("biz_wap/utils/ajax.js"),p={
tagName:"redpacketcover",
isWechat:c.isWechat,
domMap:{},
dataMap:{},
startTime:window.page_begintime||0,
screen_height:o.getInnerHeight(),
screen_num:0,
pvData:[],
request_id:encodeURIComponent(window.biz+";"+window.mid+";"+window.idx+";"+window.page_begintime||0),
hasBindVisibility:!1,
hasBindScroll:!1,
needReportNum:0,
reportedNum:0
},m=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=window.pageYOffset||document.documentElement.scrollTop,a=(window.logs.read_height||t)+p.screen_height,r={
BizUin:window.biz,
MsgId:1*window.mid,
Idx:1*window.idx,
CoverUri:e.coverUri,
Scene:1*window.source,
Subscene:1*window.subscene,
CoverStatus:1*e.coverStatus,
EventType:1*e.eventType,
EventScreenNum:Math.ceil(a/p.screen_height)||1,
ScreenNum:p.screen_num,
StartTimeMs:p.startTime
};
n.report(19119,r);
},l=function(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=e+p.screen_height,r=0;r<p.pvData.length;r++){
var i=p.pvData[r];
t>=i.start&&t<=i.end&&(p.reportedNum++,p.dataMap&&p.dataMap[i.coverUri]&&(p.dataMap[i.coverUri].reported=!0),
m({
eventType:2,
coverUri:i.coverUri,
coverStatus:p.dataMap[i.coverUri].status
}),p.pvData.splice(r,1),r--);
}
p.reportedNum>=p.needReportNum&&(a.off(window,"scroll",l),p.pvData=[],l=null);
},v=function(){
p.pvData.length>0&&(!p.hasBindScroll&&l&&(p.hasBindScroll=!0,a.on(window,"scroll",l)),
l());
},_=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(p.isWechat){
p.scroll_height=document.body.scrollHeight||document.body.offsetHeight,p.screen_num=Math.ceil(p.scroll_height/p.screen_height);
var t=e.node;
if(p.dataMap[e.coveruri]&&1*p.dataMap[e.coveruri].status!==-1&&!p.dataMap[e.coveruri].reported){
var a=t.getBoundingClientRect();
p.pvData.push({
start:a.top+a.height/2,
end:a.top+a.height/2+p.screen_height,
coverUri:e.coveruri
});
}
v();
}
},g=null,h=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
p.dataMap[e.coveruri]&&a.on(e.dom,"click",function(){
window.is_temp_url?new d({
msg:"预览时不支持领取红包封面"
}):p.isWechat?!function(){
var t=e.dom.getAttribute("data-coveruri")||"",a=t&&p.dataMap[t]?p.dataMap[t].redirect_url:"";
a&&(m({
eventType:1,
coverUri:t,
coverStatus:p.dataMap[t].status
}),r.invoke("openUrlWithExtraWebview",{
url:a,
openType:1
},function(e){
-1===e.err_msg.indexOf("ok")&&(location.href=a);
}));
}():new d({
msg:"请在微信客户端打开"
});
}),!p.hasBindVisibility&&p.isWechat&&(p.hasBindVisibility=!0,o.listenStateChange({
cb:function(e){
("onResume"===e.state_change||"onResume"===e.state)&&u({
type:"GET",
dataType:"json",
url:"/mp/wapredpacketcover?action=get_red_packet_cover_data&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&send_time="+window.send_time,
timeout:1e4,
success:function(e){
if(e&&e.base_resp&&1*e.base_resp.ret===0&&e.red_packet_cover_data&&e.red_packet_cover_data.cover_uri_data&&e.red_packet_cover_data.cover_uri_data.length>0)for(var t=e.red_packet_cover_data.cover_uri_data,a=0,r=t.length;r>a;a++){
var i=t[a],o=p.domMap[i.cover_uri],n=p.dataMap[i.cover_uri];
if(n&&o){
var d=1*n.status,s=1*i.status;
-1!==s&&d!==s&&(n.status=s,g({
data:n,
node:o,
isUpdate:!0
}));
}
}
}
});
}
}));
};
g=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
e.node&&e.data&&e.data.cover_uri&&(e.isUpdate?e.node.innerHTML=i.tmpl(t,{
data:e.data,
isUpdate:!0
},!1).replace(/>\s*</g,"><").replace(/^\s+/,"").replace(/\s+$/,""):e.data.receive_image&&!function(){
var a=function(e){
var a=e.node,r=e.data;
return function(){
var e=document.createElement("div");
e.innerHTML=i.tmpl(t,{
data:r,
isUpdate:!1
},!1).replace(/>\s*</g,"><").replace(/^\s+/,"").replace(/\s+$/,"");
var o=e.firstChild;
a.parentNode.insertBefore(o,a.nextSibling);
var n=a.parentNode.querySelector('[data-preloadingid="'+r.cover_uri+'"]');
n&&n.parentNode.removeChild(n),p.domMap[r.cover_uri]=o,h({
dom:o,
coveruri:r.cover_uri
}),_({
coveruri:r.cover_uri,
node:o
});
};
}(e),r=function(){
this.onload=null,this.onerror=null,a();
},o=new Image;
o.onload=r,o.onerror=r,o.src=e.data.receive_image;
}());
};
var w=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(e.list&&0!==e.list.length){
for(var t=0,a=e.list.length;a>t;t++){
var r=e.list[t];
p.dataMap[r.cover_uri]=r;
}
var i=document.querySelectorAll(p.tagName);
e.list.length!==i.length&&window.__addIdKeyReport&&window.__addIdKeyReport("27613","51",1),
p.needReportNum=i.length;
for(var t=0,a=i.length;a>t;t++){
var r=i[t],o=r.getAttribute("data-coveruri")||"",n=decodeURIComponent(o),d=p.dataMap[n];
if(d&&1*d.status!==-1){
if(d.redirect_url){
var c=d.redirect_url.html(!1);
c=s.addParam(c,"request_id",p.request_id,!0);
var u=s.parseUrl(c);
u.hash?-1===u.hash.indexOf("wechat_redirect")&&(c+="&wechat_redirect"):c+="#wechat_redirect",
d.redirect_url=c;
}
g({
data:d,
node:r,
isUpdate:!1
});
}
}
}
},f=function(){
var e=document.querySelectorAll(p.tagName);
if(!window.__appmsgCgiData||1*window.__appmsgCgiData.has_red_packet_cover!==1)return void(e.length>0&&window.__addIdKeyReport&&window.__addIdKeyReport("27613","51",1));
if(!p.isWechat)for(var t=0,a=e.length;a>t;t++){
var r=e[t],i=r.getAttribute("data-coveruri")||"",o=decodeURIComponent(i),n=decodeURIComponent(r.getAttribute("data-receiveimg")||"");
if(o&&n&&/^http(s)?:\/\/mmcomm\.qpic\.cn([\/?].*)*$/i.test(n)){
var d={
cover_uri:o,
status:0,
name:"",
redirect_url:"",
receive_image:n
};
p.dataMap[o]=d,g({
data:d,
node:r,
isUpdate:!1
});
}
}
};
return f(),{
render:w
};
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","pages/voice_component.js","appmsg/log.js"],function(e){
"use strict";
function i(){
var e=c("js_content");
return e?(m._oElements=e.getElementsByTagName("mpvoice")||[],m._oElements.length<=0?!1:!0):!1;
}
function o(){
m.musicLen=m._oElements.length;
}
function n(e){
for(var i=0,o=0;o<m.musicLen;o++){
var n=m._oElements[o],t={},c=n.getAttribute("voice_encode_fileid")||"";
try{
c=decodeURIComponent(c);
}catch(d){}
t.voiceid=s.encodeStr(c),t.voiceid=t.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
t.isaac=1*n.getAttribute("isaac2")||0,t.src=m.srcRoot.replace("#meidaid#",t.voiceid),
1===t.isaac&&(t.jsapi2Src=t.src+"&voice_type=1"),t.voiceid&&"undefined"!=t.voiceid&&(t.albumLink="",
e&&e.length>0&&e.forEach(function(e){
return e.voice_id===c?(e.appmsgalbuminfo&&(t.albumTitle=e.appmsgalbuminfo.title,
t.albumLink=e.appmsgalbuminfo.link.replace("#wechat_redirect","")+"#wechat_redirect",
t.albumNum=e.appmsgalbuminfo.tag_content_num||0,t.albumid=e.appmsgalbuminfo.album_id||0),
!1):void 0;
}),a(n,t,i),"undefined"!=typeof voiceid&&c&&voiceid&&c===voiceid&&!function(){
var e=n.offsetTop+122-40;
setTimeout(function(){
window.scrollTo(0,e);
},0);
}(),i++);
}
}
function a(e,i,o){
i.duration=parseInt((1*e.getAttribute("play_length")||0)/1e3,10),i.duration_str=s.formatTime(i.duration),
i.posIndex=o;
var n=e.getAttribute("name")||"";
try{
n=decodeURIComponent(n);
}catch(a){}
if(i.title=s.encodeStr(n).replace(/^\s/,"").replace(/\s$/,""),i.fileSize=1*e.getAttribute("high_size")||0,
i.nickname=window.nickname,i.voiceTag="v",1===window.is_temp_url){
var c=window.voice_in_appmsg[i.voiceid],d=c.transState,l=c.voiceVerifyState;
i.transState=d,i.voiceVerifyState=l;
}
s.renderPlayer(r,i,e,void 0,function(){
var o=i.voiceid+"_"+i.posIndex,n=e.parentNode.querySelector('[data-preloadingid="'+o+'"]');
n&&n.parentNode.removeChild(n),t(i),m.musicList[i.voiceid+"_"+i.posIndex]=i;
});
}
function t(e){
var i=e.voiceid+"_"+e.posIndex,o="";
if(window.voice_in_appmsg&&window.voice_in_appmsg[e.voiceid]){
var n=window.voice_in_appmsg[e.voiceid],a=window.biz||"",t=window.mid||"",d=window.idx||"";
n.bizuin&&n.appmsgid&&n.idx&&(a=n.bizuin,t=n.appmsgid,d=n.idx);
var r=window.location.protocol||"https:";
o=r+"//mp.weixin.qq.com/mp/audio?_wxindex_=#_wxindex_#&scene=104&__biz=#biz#&mid=#mid#&idx=#idx#&voice_id=#voice_id#&sn=#sn##wechat_redirect".replace("#_wxindex_#",e.posIndex).replace("#biz#",a).replace("#mid#",t).replace("#idx#",d).replace("#voice_id#",e.voiceid).replace("#sn#",n.sn||"");
}
l("[Voice] init"+o);
var m=s.decodeStr(e.title);
e.player=s.init({
wxIndex:e.posIndex,
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
jsapi2Src:e.jsapi2Src,
allowPause:!0,
duration:e.duration,
title:m,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:c("voice_main_"+i),
playArea:c("voice_play_"+i),
progress:c("voice_progress_"+i),
fileSize:e.fileSize,
playtimeDom:c("voice_playtime_"+i),
bufferDom:c("voice_buffer_"+i),
playdotDom:c("voice_playdot_"+i),
playpercent:c("voice_percent_"+i),
playpercentDesc:c("voice_percent_desc_"+i),
seekRange:c("voice_seekRange_"+i),
seekContainer:c("voice_main_"+i),
loadingDom:c("voice_loading_"+i),
detailArea:o?c("voice_main_"+i):"",
albumDom:c("voice_album_"+i),
detailUrl:o,
webUrl:o,
speedList:[1,1.25,1.5,2],
audioCardBody:c("audio_card_bd_"+i),
ctrlArea:c("audio_card_control_"+i),
fastBackBtn:c("audio_fast_back_"+i),
fastForwardBtn:c("audio_fast_forward_"+i),
doubleSpeedBtn:c("audio_double_speed_"+i),
isAudio:!0,
userName:window.user_name||"",
articleCoverCdnUrl1_1:window.cdn_url_1_1,
tingExtInfo:{
bizuin:1*window.atob(window.biz)||0,
appmsgid:1*window.mid||0,
idx:1*window.idx||0,
audio_id:e.voiceid||"",
is_album_page:!1
},
albumInfo:{
albumId:e.albumid||"",
albumName:e.albumTitle||"",
albumUrl:e.albumLink||""
}
});
}
function c(e){
return document.getElementById(e);
}
function d(e){
i()&&(o(),n(e));
}
e("biz_common/utils/string/html.js");
var r=e("pages/voice_tpl.html.js"),s=e("pages/voice_component.js"),l=e("appmsg/log.js"),m={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return{
init:d
};
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(p._oElements=e.getElementsByTagName("qqmusic")||[],p._oElements.length<=0?!1:!0):!1;
}
function i(){
p.musicLen=p._oElements.length;
}
function s(){
for(var e=0,t=0;t<p.musicLen;t++){
var i=p._oElements[t],s={};
s.musicid=l.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
if(t.media_id=l.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=l.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=l.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=l.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=l.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=l.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=l.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
!t.singer||"undefined"==t.singer){
var s=e.getAttribute("src")||"",r=decodeURIComponent(a.getQuery("singer",s)||"");
t.singer=l.encodeStr(r).replace(/^\s/,"").replace(/\s$/,""),t.singer&&"undefined"!=t.singer||(t.singer="");
}
t.music_name=l.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
p.adapter[t.musictype]&&"function"==typeof p.adapter[t.musictype].initData&&(t=p.adapter[t.musictype].initData(t,{
scene:0
})),l.renderPlayer(m,t,e);
var u=t.musicid+"_"+t.posIndex,c=e.parentNode.querySelector('[data-preloadingid="'+u+'"]');
c&&c.parentNode.removeChild(c),n(t),p.musicList[t.musicid+"_"+t.posIndex]=t;
}
function n(e){
var t=e.musicid+"_"+e.posIndex;
c("[Music] init "+e.detailUrl);
var i=l.decodeStr(e.music_name);
e.player=l.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
jumpurlkey:e.jumpurlkey,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"音乐",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:u("qqmusic_home_"+t)
});
}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var a=e("biz_common/utils/url/parse.js"),c=e("appmsg/log.js"),m=e("pages/qqmusic_tpl.html.js"),l=e("pages/voice_component.js"),p={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),p.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","appmsg/without_iframe/video_communicate_adaptor.js","pages/video_communicate_adaptor.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","biz_wap/utils/ajax.js","appmsg/without_iframe/video_appmsg.js","common/utils.js","appmsg/finance_communicate.js","biz_wap/utils/jsmonitor_report.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
return e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight),
t;
}
function i(e){
console.info("iframe_onload");
var i=0;
try{
var o=document.getElementsByTagName("html").item(0).style["-webkit-text-size-adjust"],n=e.contentDocument;
if(n){
var s=n.getElementsByTagName("html").item(0);
s&&(s.style["-webkit-text-size-adjust"]=o);
}
d.on("menu:setfont",function(){
var i=t(e);
!!e.parentElement&&0!==i&&(e.style.height=i+"px");
}),e.contentDocument&&e.contentDocument.body.offsetHeight?i=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?i=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(i=e.document.body.scrollHeight);
var r=e.parentElement;
if(r&&(e.style.height=i+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var c=e.contentWindow.document.getElementsByTagName("html");
c&&c.length&&(c[0].style.overflow="hidden");
}
p&&p.postPageHeightMessage&&p.postPageHeightMessage("updatePageHeight"),console.log("financeUtils done");
}catch(a){}
}
function o(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=w.video_top.length,i=e+m.getInnerHeight(),d=0,s=0;t>s;s++){
var r=w.video_top[s];
r.reported?d++:i>=r.start&&i<=r.end&&(r.reported=!0,setTimeout(function(e,t,i){
return function(){
var o=n.getVideoInfo(),d="",s="",r=3;
o[e]&&(o[e].hit_bizuin&&(d=o[e].hit_bizuin),o[e].hit_vid&&(s=o[e].hit_vid),o[e].ori_status&&(r=o[e].ori_status)),
l.report({
step:1,
hit_vid:s,
hit_bizuin:d,
ori_status:r,
vid:e,
screen_num:Math.ceil(t/i),
screen_height:i
});
};
}(r.vid,i,m.getInnerHeight()),1e4));
}
d==t&&(v.off(window,"scroll",o),w.video_top=w.video_iframe=o=null);
}
e("biz_common/utils/string/html.js");
var n=e(window.withoutIframe?"appmsg/without_iframe/video_communicate_adaptor.js":"pages/video_communicate_adaptor.js"),d=e("biz_wap/jsapi/core.js"),s=e("biz_wap/utils/mmversion.js"),r=e("biz_wap/utils/device.js"),c=e("biz_wap/utils/ajax.js");
if(window.withoutIframe)var a=e("appmsg/without_iframe/video_appmsg.js");
{
var m=e("common/utils.js"),p=e("appmsg/finance_communicate.js"),_=e("biz_wap/utils/jsmonitor_report.js"),u=e("biz_common/utils/url/parse.js"),l=e("new_video/ctl.js"),w={
txVideoReg:/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
mpVideoReg:/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/,
video_iframe:[],
video_top:[]
},f=e("pages/version4video.js"),g=e("biz_common/dom/attr.js"),v=(g.setProperty,e("biz_common/dom/event.js")),h=[].slice.call(document.getElementsByTagName("iframe")),b=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var x=Math.ceil(1e4*Math.random()),y=0,j=h.length;j>y;++y)!function(e,t){
var o=e.getAttribute("data-src")||"",n=e.className||"",d=e.getAttribute("src")||o;
if(!o||"#"==o){
var m=e.getAttribute("data-display-src");
if(m&&(0==m.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==m.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
m=m.replace(/&amp;/g,"&");
for(var p=m.split("&"),l=["/mp/newappmsgvote?action=show"],g=0;g<p.length;g++)(0==p[g].indexOf("__biz=")||0==p[g].indexOf("supervoteid="))&&l.push(p[g]);
l.length>1&&(o=l.join("&")+"#wechat_redirect");
}
}
if(d&&(w.txVideoReg.test(d)||w.mpVideoReg.test(d))){
if(f.isShowMpVideo()||w.mpVideoReg.test(d)){
var v=u.getQuery("vid",o);
if(!v)return;
var h=e.getAttribute("data-vw"),y=e.getAttribute("data-vh"),j=document.domain;
if("qq.com"==j&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
_.setLogs({
id:27302,
key:100,
value:1,
lc:1,
log0:"[beforeD]"+window.encodeURIComponent(window.location.href)
})),window.reportVid.push(v),d=["/mp/videoplayer?video_h=",y,"&video_w=",h,"&scene=",window.source,"&random_num=",x,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",v,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||"","&sessionid=",window.sessionid||"","&preview=",window.is_temp_url?1:0,"&is_in_pay_subscribe=",window.isPaySubscribe,"&nickname="+window.nickname,"&roundHeadImg="+window.round_head_img,"&enterid="+window.enterid,"&subscene="+window.subscene].join(""),
window.withoutIframe){
var k=a().createMpVideoDom(e,t,d);
w.video_iframe.push({
dom:k,
vid:v
});
}else w.video_iframe.push({
dom:e,
vid:v
}),uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t){
if(t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__)if(s.isIOS){
var i,o,n;
!function(){
var d=function(e,t,i,o){
i&&o&&(e.contentWindow.__auto_play__=!!e.getAttribute("__sec_open_auto_play__"),
e.contentWindow.is_login=t.is_login,e.contentWindow.user_uin=t.user_uin,e.contentWindow.cgiData.ckey=t.ckey,
e.contentWindow.cgiData.ckey_ad=t.ckey_ad,e.contentWindow.seajs.use("pages/video_appmsg.js"));
},s=function(){
r.os.getNumVersion()<14?t.setAttribute("src",e):t.contentWindow.location.replace(e);
};
window.__videohook__=1,i=!1,o=!1,n={},t.onload=function(){
t.contentWindow&&t.contentWindow.cgiData?i=!0:(i=!1,s()),d(t,n,i,o);
},s(),c({
url:e,
type:"GET",
f:"json",
success:function(s){
o=!0;
try{
n=JSON.parse(s),d(t,n,i,o);
}catch(r){
d(t,n,i,o);
}
window.resp=s,t.setAttribute("data-realsrc",e),t.contentWindow.__iframe_src__=e;
}
});
}();
}else c({
url:e,
type:"GET",
f:"html",
success:function(i){
t.setAttribute("data-realsrc",e),t.contentDocument.open("text/html","replace"),t.contentDocument.write(i),
t.contentDocument.close(),t.contentWindow.__iframe_src__=e,t.contentWindow.history.replaceState(null,null,e);
}
});else t.setAttribute("src",e);
},0,d,e);
}
}else if(o&&(o.indexOf("newappmsgvote")>-1&&(n.indexOf("js_editor_vote_card")>=0||n.indexOf("vote_iframe")>=0)||0==o.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&(n.indexOf("card_iframe")>=0||n.indexOf("js_editor_card")>=0)||o.indexOf("appmsgvote")>-1||o.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&o.indexOf(window.biz)<0)return void b.push(e);
if(window.__second_open__||(o=o.replace(/^http:/,location.protocol)),n.indexOf("card_iframe")>=0||n.indexOf("js_editor_card")>=0){
-1===n.indexOf("card_iframe")&&(e.className+=" card_iframe"),-1===n.indexOf("res_iframe")&&(e.className+=" res_iframe");
var O=o.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(O+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?c({
url:O,
type:"GET",
f:"html",
success:function(t){
e.setAttribute("src",O),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(t),
e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,O),
-1==o.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
i(e);
});
}
}):(e.setAttribute("src",O),-1==o.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
i(e);
}));
}else{
var z=o.indexOf("#wechat_redirect")>-1,W=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?W+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):(n.indexOf("vote_iframe")>=0||n.indexOf("js_editor_vote_card")>=0)&&(W+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""),
-1===n.indexOf("vote_iframe")&&(e.className+=" vote_iframe"));
var O=z?o.replace("#wechat_redirect",W):o+W;
window.__second_open__?c({
url:O,
type:"GET",
f:"html",
success:function(t){
e.contentWindow.Ajax=c,e.setAttribute("src",O),e.contentWindow.document.open("text/html","replace"),
e.contentWindow.document.write(t),e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,O),
-1==o.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
i(e);
});
}
}):(e.setAttribute("src",O),-1==o.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
i(e);
}));
}
e.appmsg_idx=g;
}
if(o&&o.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&h>0){
var D=h,q=3*D/4;
e.width=D,e.height=q,e.style.setProperty&&(e.style.setProperty("width",D+"px","important"),
e.style.setProperty("height",q+"px","important"));
}
}(h[y],y);
for(var k=0;k<b.length;k++){
var O=b[k];
O.parentNode.removeChild(O);
}
if(window.iframe_reload=function(){
for(var e=0,t=h.length;t>e;++e){
var o=h[e],n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&i(o);
}
},"getElementsByClassName"in document)for(var z,W=document.getElementsByClassName("video_iframe"),y=0;z=W.item(y++);)z.setAttribute("scrolling","no"),
z.style.overflow="hidden";
w.video_iframe.length>0&&setTimeout(function(){
for(var e=w.video_iframe,t=document.getElementById("js_article"),i=0,n=e.length;n>i;i++){
var d=e[i];
if(!d||!d.dom)return;
for(var s=d.dom,r=parseFloat(getComputedStyle(s).getPropertyValue("height")),c=0;s&&t!==s;)c+=s.offsetTop,
s=s.offsetParent;
w.video_top.push({
start:c+r/2,
end:c+r/2+m.getInnerHeight(),
reported:!1,
vid:d.vid
});
}
o(),v.on(window,"scroll",o);
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/utils/ajax_wx.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_wap/jsapi/leaveReport.js","biz_wap/utils/wapsdk.js","common/utils.js","appmsg/log.js","biz_common/utils/url/parse.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function o(e,o){
if(console.log(e),("success"===o||"error"===o)&&j(e),"error"===o){
var i=new Image;
i.src="https://badjs.weixinbridge.com/report?name="+o+"&mid=mmbizwap:page_pos&view=wap_business&key="+encodeURIComponent(e)+"&msg="+encodeURIComponent(e);
}
}
function i(e){
window.logs||(window.logs={}),I.js_content=e.js_content||document.getElementById("js_content");
var o=e.js_toobar3||document.getElementById("js_toobar3");
I.pageEndTop=o?o.offsetTop:0,I.imgs=I.js_content?I.js_content.getElementsByTagName("img")||[]:[],
I.media=e.media||document.getElementById("media"),I.title=e.title||(window.msg_title||"").htmlDecode(),
I.video_cnt=e.video_cnt||window.logs.video_cnt||0,I.js_cmt_area=e.js_cmt_area||document.getElementById("js_cmt_area"),
I.item_show_type=e.item_show_type||window.item_show_type||0,x=document.getElementsByTagName("html"),
x&&1==!!x.length&&g&&(x=x[0].innerHTML,k.content_length=g.htmlSize),window.logs.pageinfo=k,
function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var o=localStorage.key(e);
o.match(/^\d+$/)?localStorage.removeItem(o):o.match(/^adinfo_/)&&localStorage.removeItem(o),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(m.on(window,"load",function(){
P=1*S.get(M);
var o=""!==z.getQuery("imageIndex");
if(!window.__second_open__){
var i=location.href.indexOf("scrolltodown")>-1;
i&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),i||"undefined"!=typeof voiceid&&voiceid||(!e.disableScroll&&!o&&window.scrollTo(0,P),
b.saveSpeeds({
uin:uin,
pid:"https:"==E?462:417,
speeds:{
sid:36,
time:Math.ceil(P/y.getInnerHeight())
}
}),b.send());
}
if(window.__wxjs_is_wkwebview||window.__second_open__){
if(G)return;
var t=A.getData(),n=localStorage.getItem("hand_up_id");
for(var a in t)a!=n&&t[a]&&(r(t[a].val),T.setSum(28307,59,1),A.remove(a));
window.setInterval(function(){
var e=s();
A.set(C,e,+new Date+864e7);
},1e3);
}
var w=O.getData("spad");
w&&w.spad&&p(w.spad.val),e.hasSpAd&&window.setInterval(function(){
d();
var e=_();
O.set("spad",e,+new Date+864e7);
},1e3),window.setTimeout(function(){
l({
url:"/mp/appmsgreport?action=page_time_5s&__biz="+biz,
type:"POST",
mayAbort:!0,
data:s(),
async:!0,
timeout:2e3
});
},5e3);
}),m.on(window,"unload",function(){
if(j("[Appmsg leaveReport in page_pos 3]"),console.log("[Appmsg leaveReport in page_pos 3]"),
!window.__second_open__&&(j("[Appmsg leaveReport in page_pos 4]"),console.log("[Appmsg leaveReport in page_pos 4]"),
!window.__jsapi_report_has_done__)){
j("[Appmsg leaveReport in page_pos 5]"),console.log("[Appmsg leaveReport in page_pos 5]"),
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=s();
r(e),window.__unload_has_done__=!0;
}
}),window.logs.read_height=0,m.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(H),H=setTimeout(function(){
P=window.pageYOffset,S.set(M,P,+new Date+864e5);
},500);
}),m.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(H),H=setTimeout(function(){
P=window.pageYOffset,S.set(M,P,+new Date+864e5);
},500);
})),v.addReport(function(){
if(j("[Appmsg leaveReport in page_pos 1]"),console.log("[Appmsg leaveReport in page_pos 1]"),
!window.__unload_has_done__){
j("[Appmsg leaveReport in page_pos 2]"),console.log("[Appmsg leaveReport in page_pos 2]"),
N=!0,A.remove(C);
var e=s(),o=[];
for(var i in e)e.hasOwnProperty(i)&&o.push(i+"="+encodeURIComponent(e[i]));
var t={
reportUrl:"https://mp.weixin.qq.com/mp/appmsgreport?action=page_time&__biz="+biz,
reportData:o.join("&"),
method:"POST"
};
return window.__jsapi_report_has_done__=!0,j("[Appmsg leaveReport length]: "+JSON.stringify(t).length),
console.log("[Appmsg leaveReport length]: "+JSON.stringify(t).length),t;
}
}),m.on(document,"visibilitychange",function(){
h.isHidden()?localStorage.setItem("hand_up_id",C):localStorage.setItem("hand_up_id","");
}),w();
}
function t(e,o){
if(e&&!(e.length<=0))for(var i,t,n,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,s=0,r=e.length;r>s;++s)i=e[s],
i&&(t=i.getAttribute(o),t&&(n=t.match(a),n&&n[2]&&(R[n[2]]=!0)));
}
function n(e){
for(var o=0,i=D.length;i>o;++o)if(D[o]==e)return!0;
return!1;
}
function a(){
R={},t(document.getElementsByTagName("a"),"href"),t(document.getElementsByTagName("link"),"href"),
t(document.getElementsByTagName("iframe"),"src"),t(document.getElementsByTagName("script"),"src"),
t(document.getElementsByTagName("img"),"src");
var e=[];
for(var o in R)R.hasOwnProperty(o)&&(window.networkType&&"wifi"==window.networkType&&!B&&n(o)&&(B=!0),
e.push(o));
return R={},e.join(",");
}
function s(){
{
var e,o=window.pageYOffset||document.documentElement.scrollTop,i=I.js_content,t=y.getInnerHeight(),n=I.screen_width,s=I.scroll_height,r=Math.ceil(s/t),d=Math.ceil((i.scrollHeight||i.offsetHeight)/t),_=(window.logs.read_height||o)+t,p=I.pageEndTop,w=I.imgs,m=Math.ceil(_/t)||1,l=I.media,c=50,g=0,u=0,f=0,v=0,b=_+c>p?1:0;
i.offsetTop+i.scrollHeight;
}
m>r&&(m=r);
var j=function(o){
if(o)for(var i=0,t=o.length;t>i;++i){
var n=o[i];
if(n){
g++;
var a=n.getAttribute("src"),s=n.getAttribute("data-type");
a&&0==a.indexOf("http")&&(u++,a.isCDN()&&(f++,-1!=a.indexOf("tp=webp")&&v++),s&&(e["img_"+s+"_cnt"]=e["img_"+s+"_cnt"]||0,
e["img_"+s+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=v||0,e.download_img_cnt=u||0,e.download_cdn_img_cnt=f||0,
e.img_cnt=g||0,e.report_time=parseInt(Date.now()/1e3,10);
},z=window.appmsgstat||{},T=window.logs.img||{},S=window.logs.pagetime||{},A=T.load||{},O=T.read||{},R=[],E=[],D=0,N=0,H=0;
for(var P in O)P&&0==P.indexOf("http")&&O.hasOwnProperty(P)&&E.push(P);
for(var P in A)P&&0==P.indexOf("http")&&A.hasOwnProperty(P)&&R.push(P);
for(var M=0,q=R.length;q>M;++M){
var C=R[M];
C&&C.isCDN()&&(-1!=C.indexOf("/0")&&D++,-1!=C.indexOf("/640")&&N++,-1!=C.indexOf("/300")&&H++);
}
var e={
report_bizuin:biz,
title:I.title,
mid:mid,
idx:idx,
subscene:window.subscene||1e4,
sessionid:window.sessionid||0,
enterid:window.enterid||0,
read_cnt:z.read_num||0,
old_like_cnt:z.old_like_num||0,
like_cnt:z.like_num||0,
screen_width:n,
screen_height:y.getInnerHeight(),
screen_num:d,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:I.video_cnt,
read_screen_num:m||0,
is_finished_read:b,
scene:source,
content_len:k.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
handup_time:h.getHandUpTime(),
total_height:p,
exit_height:_>p?p:_,
img_640_cnt:N,
img_0_cnt:D,
img_300_cnt:H,
wtime:S.onload_time||0,
ftime:S.ftime||0,
ptime:S.ptime||0,
onload_time:S.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:window.ct,
item_show_type:I.item_show_type,
page_req_info:JSON.stringify({
startGetAppmsgExtTime:window.startGetAppmsgExtTime,
startGetAppmsgAdTime:window.startGetAppmsgAdTime,
receiveGetAppmsgExt:window.receiveGetAppmsgExt,
receiveGetAppmsgAd:window.receiveGetAppmsgAd,
jsapiReadyTime:window.jsapiReadyTime,
domCompleteTime:window.domCompleteTime
}),
is_darkmode:window.matchMedia("(prefers-color-scheme: dark)").matches?1:0
},G=/(?:\?|&)search_click_id=([^&]*)(?:&|$)/.exec(window.location.search);
if(e.search_click_id=G?G[1]:0,window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=R.length,
e.wifi_read_imgs_cnt=E.length),window.logs.webplog&&4==window.logs.webplog.total){
var U=window.logs.webplog;
e.webp_total=1,e.webp_lossy=U.lossy,e.webp_lossless=U.lossless,e.webp_alpha=U.alpha,
e.webp_animation=U.animation;
}
if(e.copyright_stat=window.isCartoonCopyright?"3":window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var Y=window.logs.idkeys,J=[];
for(var K in Y)if(Y.hasOwnProperty(K)){
var L=Y[K];
L.val>0&&J.push(K+"_"+L.val);
}
e.idkey=J.join(";");
}
j(!!l&&l.getElementsByTagName("img")),j(w);
var V=(new Date).getDay(),W=a();
return(B||0!==user_uin&&Math.floor(user_uin/100)%7==V)&&(e.domain_list=W),B&&(e.html_content=x),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e.ascene=window.ascene||-1,0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),e.is_pay_subscribe=window.isPaySubscribe,e.is_paid=window.isPaid,e.preview_percent=window.previewPercent,
e.is_finished_preview=window.is_finished_preview||0,e.fee=window.can_use_wecoin?window.wecoin_amount?10*window.wecoin_amount:"":window.paySubscribeInfo?window.paySubscribeInfo.fee:"",
e.pay_cnt=window.paySubscribeInfo?window.paySubscribeInfo.pay_cnt:"",e.worthy_cnt=window.paySubscribeInfo?window.paySubscribeInfo.like_cnt:"",
e.exptype=window.exptype||"",e.expsessionid=window.expsessionid||"",e;
}
function r(e){
if(!N){
N=!0,A.remove(C);
var o="/mp/appmsgreport?action=page_time&__biz="+biz;
if(navigator.sendBeacon){
var i="";
for(var t in e)i+=t+"="+e[t]+"&";
navigator.sendBeacon(c.joinUrl(o),i),console.log("sendBeacon send 10945 data");
}else l({
url:o,
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
});
}
}
function d(){
S.set(M,P,+new Date+72e5);
}
function _(){
return window.__video_report_data;
}
function p(e){
e&&e.play_type&&(O.remove("spad"),e.report_type=1,l({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function w(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/geticon?biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&req_id="+window.req_id+"&r="+Math.random();
}
e("biz_common/utils/string/html.js");
var m=e("biz_common/dom/event.js"),l=e("biz_wap/utils/ajax.js"),c=e("biz_wap/utils/ajax_wx.js"),g=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var u=e("biz_wap/utils/storage.js"),h=e("biz_wap/utils/hand_up_state.js"),f=e("biz_wap/utils/mmversion.js"),v=(e("biz_wap/jsapi/core.js"),
e("biz_wap/jsapi/leaveReport.js")),b=e("biz_wap/utils/wapsdk.js"),y=e("common/utils.js"),j=e("appmsg/log.js"),z=e("biz_common/utils/url/parse.js"),T=(-1!=navigator.userAgent.indexOf("TBS/"),
e("biz_wap/utils/jsmonitor_report.js"));
window.__unload_has_done__=!1;
var x,I={
js_cmt_area:null,
js_content:null,
screen_height:y.getInnerHeight(),
screen_width:document.documentElement.clientWidth||window.innerWidth,
scroll_height:document.body.scrollHeight||document.body.offsetHeight,
pageEndTop:0,
imgs:[],
media:null,
title:"",
video_cnt:0,
item_show_type:0
},S=new u("page_pos","clear-all",o),A=new u("time_on_page"),O=new u("spad"),k={},R={},E=window.location.protocol,B=!1,D=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],N=!1,H=null,P=0,M=[biz,sn,mid,idx].join("_"),q=Math.random(),C=[biz,sn,mid,idx,q].join("_"),G=f.isAndroid&&f.gtVersion("7.0.4",!0)||f.isIOS&&f.gtVersion("7.0.4",!0);
return{
init:i
};
});define("appmsg/product.js",["biz_common/dom/event.js","common/utils.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=0;t<i.length;++t){
var o=i[t];
if(!o.isReport){
var n=o.offsetTop;
n>=e&&e+r.getInnerHeight()>=n&&(o.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+o.product_id+"&order="+o.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js"),r=e("common/utils.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),d=document.getElementsByClassName("js_product_a"),i=[],s=0;s<n.length;++s){
var a=n[s];
a.dataset&&a.dataset.product_id&&a.dataset.order&&i.push({
dom:a,
offsetTop:a.offsetTop,
product_id:a.dataset.product_id||"",
order:a.dataset.order||"",
isReport:!1
});
}
i.length>0&&(o.on(window,"scroll",t),t());
for(var s=0;s<d.length;++s)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(d[s]);
}
});define("appmsg/outer_link.js",["biz_common/dom/event.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","appmsg/popup_report.js","biz_wap/utils/jsmonitor_report.js","biz_common/dom/class.js","common/tap_highlight.js"],function(e){
"use strict";
function t(e){
e.preventDefault();
}
function i(e){
var t=e.innerHTML,i=/<img.*src=[\'\"]/,n=/background-image:(\s*)url\(/,o=/background:[^;"']+url\(/;
return i.test(t)||n.test(t)||o.test(t)?!0:!1;
}
function n(e){
var t=e.innerHTML,i=e.style.fontSize;
return 0===t.trim().length||0===parseFloat(i)?!0:!1;
}
function o(e,t){
var i=e.getElementsByClassName("weui-dialog__bd")[0],n=e.getElementsByClassName("weui-dialog")[0];
if(e.getElementsByClassName("weui-dialog__hd")&&e.getElementsByClassName("weui-dialog__hd").length>0&&n.removeChild(e.getElementsByClassName("weui-dialog__hd")[0]),
t.title&&t.desc){
var o=document.createElement("div");
o.setAttribute("class","weui-dialog__hd");
var r='<strong class="weui-dialog__title">'+t.title+"</strong>";
o.innerHTML=r,i.innerText=t.desc,n.insertBefore(o,i);
}else i.innerText=t.desc;
}
function r(e){
var r=e.container;
if(!r)return!1;
for(var f=r.getElementsByTagName("a")||[],j=0,b=f.length;b>j;++j)!function(r){
var j=f[r],b=j.getAttribute("href");
if(!b)return!1;
var k=0,E=j.innerHTML;
/^[^<>]+$/.test(E)?k=1:/^<img[^>]*>$/.test(E)&&(k=2);
var I=j.getAttribute("data-linktype"),T=j.getAttribute("href");
s.on(j,"click",function(r){
var s=j.getAttribute("href");
if(!s)return!1;
c.addClass(j,"wx_tap_link"),d.highlightEle(j),!!e.changeHref&&!/^https?:\/\/mp\.weixin\.qq\.com\/cgi-bin\//.test(s)&&(s=e.changeHref(s,k)),
r.preventDefault();
var f="";
_[j.getAttribute("data-itemshowtype")]&&(f=_[j.getAttribute("data-itemshowtype")]);
document.getElementById("js_link_dialog_name");
return y&&(g[T]&&g[T].subject_name&&"0"===g[T].item_show_type&&g[T].title?o(y,{
title:'即将打开公众号 "'+g[T].subject_name+'" 的'+_[g[T].item_show_type],
desc:h.innerText="《"+g[T].title+"》"
}):g[T]&&g[T].subject_name&&g[T].item_show_type>=0?o(y,{
desc:'即将打开公众号 "'+g[T].subject_name+'" 的'+_[g[T].item_show_type]
}):o(y,{
desc:"即将打开新的页面"
})),r.stopPropagation(),"undefined"==typeof w[T]&&(T.indexOf("mp.weixin.qq.com/s/")>-1||T.indexOf("mp.weixin.qq.com/s?")>-1)?p.setSum(110809,6,1):"undefined"==typeof w[T]&&p.setSum(110809,7,1),
w=function(){
return g[T]&&g[T].item_show_type>=0&&s.indexOf("mp.weixin.qq.com")>-1&&(l.isIOS||l.isAndroid)&&!l.isInMiniProgram&&l.isWechat?1==j.getAttribute("clicked")?!1:(u.invoke("openWebViewUseFastLoad",{
url:s,
item_show_type:g[T].item_show_type,
openType:0,
scene:1
},function(e){
console.log("openWebViewUseFastLoad res: ",e),e&&e.err_msg&&-1==e.err_msg.indexOf("ok")?u.invoke("openUrlWithExtraWebview",{
url:s,
openType:1
},function(e){
j.setAttribute("clicked",0),e&&e.err_msg&&-1==e.err_msg.indexOf("ok")&&(window.location.href=url);
}):(j.setAttribute("clicked",0),p.setSum(28839,37,1));
}),!1):void(l.isInMiniProgram?location.href=s:(l.isAndroid||l.isIOS)&&l.isWechat?a(s,{
sample:1,
reject:function(){
location.href=s;
}
}):location.href=s);
},("1"===I||i(j)||n(j))&&m.report([2,m.getRedirectType(T),"",window.img_popup?1:0,window.source,m.getUrlData(T)],!0),
("1"===I||i(j)||n(j))&&window.img_popup?(console.log("tap img link",y),y.style.display="block",
setTimeout(function(){
h&&h.focus();
},100),v&&v.setAttribute("aria-hidden","true"),y._url=T,(i(j)||n(j))&&(p.setSum(110809,8,1),
y._type="OTHER"),document.querySelector("body").addEventListener("touchmove",t,{
passive:!1
})):w(),!1;
},!0),s.on(j,"click",function(e){
("1"===I||"2"===I||i(j)||n(j))&&window.img_popup&&(e.preventDefault(),e.stopPropagation());
},!0);
}(j);
}
var s=e("biz_common/dom/event.js"),a=e("appmsg/open_url_with_webview.js"),u=e("biz_wap/jsapi/core.js"),l=e("biz_wap/utils/mmversion.js"),m=(e("biz_wap/utils/ajax.js"),
e("appmsg/popup_report.js")),p=e("biz_wap/utils/jsmonitor_report.js"),c=e("biz_common/dom/class.js"),d=e("common/tap_highlight.js"),_={
0:"文章",
11:"文章",
8:"图片",
7:"语音",
5:"视频"
},g={};
if("undefined"!=typeof jumpInfo)for(var f=0;f<jumpInfo.length;f++)g[jumpInfo[f].url]={
title:jumpInfo[f].title,
item_show_type:jumpInfo[f].item_show_type,
subject_name:jumpInfo[f].subject_name,
link_type:jumpInfo[f].link_type
};
var w=function(){},y=document.getElementById("js_link_dialog"),h=(document.getElementById("js_link_dialog_head"),
document.getElementById("js_link_dialog_body")),j=document.getElementById("js_link_dialog_cancel"),b=document.getElementById("js_link_dialog_ok"),v=document.querySelector("#js_article");
return b&&s.on(b,"click",function(e){
e.stopPropagation(),e.preventDefault(),"OTHER"===y._type&&p.setSum(110809,10,1),
document.querySelector("body").removeEventListener("touchmove",t),w&&w(),y.style.display="none",
v&&v.removeAttribute("aria-hidden"),m.report([4,m.getRedirectType(y._url),"",window.img_popup?1:0,window.source,m.getUrlData(y._url)],!0);
}),j&&s.on(j,"click",function(e){
e.stopPropagation(),e.preventDefault(),document.querySelector("body").removeEventListener("touchmove",t),
"OTHER"===y._type&&p.setSum(110809,9,1),y.style.display="none",v&&v.removeAttribute("aria-hidden"),
m.report([3,m.getRedirectType(y._url),"",window.img_popup?1:0,window.source,m.getUrlData(y._url)],!0);
}),r;
});define("appmsg/copyright_report.js",["common/utils.js","biz_common/dom/event.js"],function(o){
"use strict";
function i(o){
var i=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",o.scene,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&mid=",window.mid,"&idx=",window.idx,"&source_biz=",window.source_biz,"&source_mid=",window.source_mid,"&source_idx=",window.source_idx,"&card_version=2","&show_appmsg_scene=",window.source,"&session_id=",window.sessionid,"&has_recommend_msg=",window.hasRecommendMsg,"&t=",Math.random()].join("");
window.isSg&&(i+="&from=sougou");
var e=new Image;
e.src=i.substr(0,1024);
}
function e(){
var o=__appmsgCgiData;
if("2"==o.copyright_stat){
for(var i=r("copyright_info"),e=r("js_article");i&&e!==i;)c.copyright_top+=i.offsetTop,
i=i.offsetParent;
t.on(window,"scroll",n),n();
}
}
function n(){
var o=window.pageYOffset||document.documentElement.scrollTop;
o+s.getInnerHeight()>c.copyright_top&&(i({
scene:"1",
card_pos:"0"
}),t.off(window,"scroll",n),n=c.copyright_top=null);
}
function r(o){
return document.getElementById(o);
}
var s=o("common/utils.js"),t=o("biz_common/dom/event.js"),c={
copyright_top:0
};
return{
card_click_report:i,
card_pv_report:e
};
});var _extends=Object.assign||function(e){
for(var i=1;i<arguments.length;i++){
var t=arguments[i];
for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);
}
return e;
};
define("appmsg/async.js",["biz_wap/ui/weui.js","biz_common/utils/string/html.js","appmsg/reward_utils.js","appmsg/pay_read/pay_read_utils.js","appmsg/pay_report_utils.js","pages/create_txv.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","appmsg/img_copyright_tpl.html.js","appmsg/appmsgext.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","complain/localstorage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a_utils.js","appmsg/related_article.js","appmsg/like_profile.js","appmsg/set_font_size.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","pages_new/modules/utils/event_bus.js","pages/mod/bottom_modal.js","pages/version4video.js","appmsg/read.js","appmsg/like.js","appmsg/like_and_share.js","appmsg/set_article_read.js","pages_new/appmsg/store.js","appmsg/iframe.js","redpackage/redpacketcover.js","appmsg/more_read.js","appmsg/album_keep_read.js"],function(e){
"use strict";
function i(){
for(var i=document.getElementsByTagName("iframe"),a=[],r=0,s=i.length;s>r;++r)a.push(i[r]);
i=null;
var o=document.getElementById("js_content"),n=o.offsetWidth,_=n/m.getRatio();
window.logs.video_cnt=0;
for(var r=0,s=a.length;s>r;++r){
var d=a[r],p=d.getAttribute("data-src")||"",l=d.getAttribute("src")||p;
if(l){
var c=e("pages/version4video.js");
if(0==l.indexOf("http://z.weishi.com/weixin/player.html"))l=l.replace(/width=\d+/g,"width="+n),
l=l.replace(/height=\d+/g,"height="+_),d.width=n,d.height=_,d.style.setProperty&&(d.style.setProperty("width",n+"px","important"),
d.style.setProperty("height",_+"px","important")),d.setAttribute("src",l),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else{
if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(l)){
if(!c.isShowMpVideo()){
var w;
w=t(g?d:d),w&&x.push(w),"function"==typeof window.__addIdKeyReport&&(window.__addIdKeyReport("28307",10),
c.device.inWechat&&c.device.inWindowWechat?window.__addIdKeyReport("110644",0):c.device.inWechat&&c.device.inMacWechat&&window.__addIdKeyReport("110644",1));
}
window.logs.video_cnt++;
continue;
}
/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/.test(l)&&window.logs.video_cnt++;
}
}
}
x.length>0&&"function"==typeof window.__getVideoWh&&h.on(window,"resize",function(){
try{
for(var e=0,i=x.length;i>e;e++){
var t=x[e],a=t.playerObj;
if(a){
var r=window.__getVideoWh(t);
t.style.width=r.w+"px",t.style.height=r.h+"px",a.resize({
width:r.vw,
height:r.vh
});
}
}
}catch(s){}
},!1);
}
function t(e){
var i=e.getAttribute("data-src")||e.getAttribute("src"),t=l.getQuery("vid",i),r=e.getAttribute("data-vw"),s=e.getAttribute("data-vh"),o=e.getAttribute("data-ratio"),n=document.createElement("span");
n.setAttribute("data-ratio",o),n.id="js_tx_video_container_"+Math.random(),n.className="js_tx_video_container",
n.style.cssText=e.style.cssText,n.style.display="none";
var _=e.parentNode;
return _?(_.lastChild===e?_.appendChild(n):_.insertBefore(n,e.nextSibling),p.createTxVideo({
containerId:n.id,
vid:t,
width:r,
height:s,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(e){
n.playerObj=e.player,a(n,t),n.style.display="block";
},
onError:function(){}
}),_.removeChild(e),n):void 0;
}
function a(e,i){
if(i&&e){
var t=e.parentNode;
if(t){
for(var a=[],r=0,s=t.children.length;s>r;r++){
var o=t.children[r];
o.className.indexOf("img_loading")>=0&&o.getAttribute("data-vid")==i&&a.push(o);
}
for(var r=0,s=a.length;s>r;r++)t.removeChild(a[r]);
e.style.display="block";
}
}
}
function r(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var i={},t=e.img_copy_info.list,a=window.__appmsgCgiData.copyright_stat,r=window.__appmsgCgiData.source_biz,s=0,o=t.length;o>s;s++){
var n=t[s];
if(2==n.type){
if(2==a&&r==n.source_uin)continue;
i[n.img_url]={
source_nickname:n.source_nickname,
source_uin:n.source_uin,
source_encode_biz:n.source_encode_biz||""
};
}
}
for(var _=document.getElementsByTagName("img"),s=0,o=_.length;o>s;s++){
var n=_[s],d=n.getAttribute("data-src")||n.getAttribute("data-backsrc")||"";
if(i[d]){
var p=document.createElement("div");
p.innerHTML=y.tmpl(c,i[d],!1);
{
var m=p.children[0],l=n.parentNode,w=l.insertBefore(m,n),u=w.children[0];
(function(e,i){
h.on(i,"click",function(){
var i="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=i,
!1):(f.invoke("openUrlWithExtraWebview",{
url:i,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=i);
}),!1);
});
})(i[d],u);
}
w.insertBefore(n,u);
}
}
}
}
function s(i){
var t=i.appmsgstat||{},a=i.appmsgact||{},r=i.paySubscribeInfo||{};
if(window.paySubscribeInfo=r,window.isFans=i.is_fans,window.appmsgstat||(window.appmsgstat=t),
t.show_read){
var s=document.getElementById("js_read_area3"),o=document.getElementById("readNum3");
if(!s||!o)return;
var d=e("appmsg/read.js");
d.showReadNum({
show:!0,
readAreaDom:s,
readNumDom:o,
readAreaDisplayValue:window.isPaySubscribe?"none":"block",
readNum:window.is_temp_url?window.read_num:t.read_num
});
}
if(f.invoke("handleHaokanAction",{
imgUrl:ori_head_img_url?ori_head_img_url:"",
link:msg_link.html(!1),
desc:msg_desc?msg_desc:"",
title:msg_title?msg_title.htmlDecode():"",
action:"update_recommend_status",
permission:window.is_temp_url||t.show_like_gray||!t.show_like||2!==appmsg_like_type?0:1,
recommend:t.liked?1:0
},function(){}),t.show_like){
var p=e("appmsg/like.js"),m=document.getElementById("like3"),l=document.getElementById("likeNum3");
if(!m||!l)return;
t.liked=window.is_temp_url?window.liked:t.liked;
var c=1===appmsg_like_type?"praised":"like_btn_liked";
p.showLikeNum({
show:!0,
likeAreaDom:m,
likeNumDom:l,
liked:t.liked,
className:c,
likeAreaDisplayValue:"inline",
likeNum:window.is_temp_url?window.like_num:t.like_num,
likeGray:!!t.show_like_gray
}),p.initLikeEvent({
likeAreaDom:m,
likeNumDom:l,
className:c,
prompted:t.prompted,
biz:window.biz,
mid:window.mid,
idx:window.idx,
appmsgid:window.appmsgid,
itemidx:window.itemidx,
is_temp_url:window.is_temp_url,
showType:t.style
});
}
var w=e("appmsg/like_and_share.js");
w.initLikeShareDom({
shareShow:i.share_flag&&!!i.share_flag.show&&!z.isInMiniProgram,
shareGray:i.share_flag&&!!i.share_flag.show_gray,
likeShow:!!t.show_old_like,
likeGray:!!t.show_old_like_gray,
likeNum:t.old_like_num?t.old_like_num:0,
isLike:t.old_liked?1:0,
isZaikan:t.show_like?1:0
});
var u=e("appmsg/set_article_read.js"),g=u.bindArticleReadEvent;
g();
var y=i.share_flag&&i.share_flag.show;
if(t&&!t.show_like&&!t.show_old_like&&!y){
var b=document.getElementById("js_bottom_opr_right");
b&&(b.style.display="none"),document.getElementById("js_bottom_opr_right")&&(document.getElementById("js_bottom_opr_right").style.display="none");
}
v.setBackgroundClass(),n.init(_extends({
isFans:i.is_fans
},i.reward),{
reward_entrance_enable_for_preview:i.reward_entrance_enable_for_preview,
reward_wording:i.reward_wording,
reward_author_head:i.reward_author_head
}),window.isPaySubscribe&&_.init(r,{
rewardTotal:i.reward.reward_total||0,
rewardTotalCut:i.reward.is_reward_total_count_cut
});
var x=document.getElementById("js_cmt_container");
1==i.comment_entrance_enable_for_preview&&window.is_temp_url&&x&&(x.style.display="block"),
i.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
h.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),window.weui.alert("预览状态下无法操作");
})),i.comment_enabled&&x&&(x.style.display="block");
var I=[],E="",A=a.old_liked_before,S=a.seen_before,B=a.favorite_before,R=a.share_before,W=a.reward_before,N=a.pay_before,P=t.old_liked,T=t.liked;
(P||A)&&(E="praise",I.push("like")),(T||S)&&(E="like",I.push("zaikan")),B&&(E="favorite",
I.push("collect")),R&&(E="share",I.push("share")),W&&I.push("reward"),N&&I.push("pay"),
j&&(I.length>0||k.isFromRecommend)&&j.renderLikeProfile(I),k&&(t.old_liked||a.old_liked_before?k.render("praise",!0):t.liked||a.seen_before?k.render("like",!0):a.favorite_before?k.render("favorite",!0):a.share_before?k.render("share",!0):k.isFromRecommend||!window.is_login?k.render("other",!0):a.reward_before?k.render("reward",!0):a.pay_before&&k.render("pay",!0));
}
function o(){
var i=0,t="27613",a="50";
w.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:msg_title,
ct:ct,
abtest_cookie:abtest_cookie,
devicetype:devicetype,
version:window.clientversion,
is_need_ticket:x&&x.length>0?1:0,
is_need_ad:0,
comment_id:comment_id,
is_need_reward:is_need_reward,
both_ad:0,
reward_uin_count:is_need_reward?3*n.getCountPerLine({
can_reward:!0
})-1:0,
send_time:window.send_time||"",
msg_daily_idx:msg_daily_idx,
item_show_type:window.item_show_type,
is_original:i,
is_only_read:is_only_read,
req_id:window.req_id||"",
pass_ticket:pass_ticket,
is_temp_url:window.is_temp_url||0,
more_read_type:more_read_type||0,
rtId:t,
rtKey:a,
appmsg_like_type:window.appmsg_like_type,
is_pay_subscribe:window.isPaySubscribe,
pay_subscribe_uin_count:window.isPaySubscribe?3*_.getCountPerLine():0,
has_red_packet_cover:window.__appmsgCgiData.has_red_packet_cover,
onSuccess:function(i){
if(i)try{
var o=e("pages_new/appmsg/store.js");
if(o.commit("SET_EXT_RES",i),window.__second_open__&&i.pay_subscribe_info&&1*i.pay_subscribe_info.is_paid!=isPaid)return d.report110809(11),
(new Image).src="https://badjs.weixinbridge.com/badjs?id=244&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
void f.invoke("handleMPPageAction",{
action:"paySuccess",
fullUrl:window.location.href,
itemShowType:window.item_show_type
},function(e){
d.report110809(e.err_msg.indexOf("ok")>-1?19:20),window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("isPaid-"+window.biz+"-"+window.mid+"-"+window.idx,"1"),
window.location.href=window.location.href+"&r="+Math.random()+"#wechat_redirect";
});
if(i&&i.base_resp&&i.base_resp.wxtoken&&(window.wxtoken=i.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
r(i),i.ret)return;
if(i.red_packet_cover_data&&i.red_packet_cover_data.cover_uri_data&&i.red_packet_cover_data.cover_uri_data.length>0){
var n=e("redpackage/redpacketcover.js");
n.render({
list:i.red_packet_cover_data.cover_uri_data
});
}
var _=document.getElementById("js_more_read_area");
if(_&&i&&i.more_read_list&&i.more_read_list.length&&e("appmsg/more_read.js")(_,i.more_read_list),
window.isFans=i.is_fans,i.pay_subscribe_info&&(window.payEduTips={
firstWecoinRecharge:1*i.pay_subscribe_info.first_wecoin_recharge,
userImgUrl:i.pay_subscribe_info.user_img_url,
userNickname:i.pay_subscribe_info.user_nick_name
},window.payGlobal={
enable_custom_recharge:i.pay_subscribe_info.enable_custom_recharge,
agreement_url:i.pay_subscribe_info.agreement_url,
agreement_version:i.pay_subscribe_info.agreement_version,
agreement_status:i.pay_subscribe_info.agreement_status,
recharge_product_id:i.pay_subscribe_info.recharge_product_id,
price:i.pay_subscribe_info.price
},i.pay_subscribe_info.wecoin_tips&&(z.isIOS||z.isAndroid)&&!z.is_wxwork&&!function(){
var e=void 0,i=z.isIOS?7:10,t=document.createElement("div");
t.innerHTML='<div class="pay__wecoin-edu"><div class="pay__wecoin-title"><div class="pay__icon-wecoin"></div><div>付费内容需用微信豆支付</div></div><div class="pay__wecoin-edu-desc">微信豆是用于购买微信内虚拟物品和服务的道具。<span>1元 = '+i+"微信豆。</span>微信豆还可用于购买直播间的虚拟礼物等。</div></div>";
var a=document.createElement("a");
a.innerText="常见问题",a.className="pay__wecoin-edu-link",h.on(a,"tap",function(i){
i&&i.preventDefault(),d.reportPayAppmsg(17),f.invoke("openUrlWithExtraWebview",{
url:"https://kf.qq.com/touch/product/WXDB_app.html",
openType:1
}),e.hide();
}),e=new E(t,{
title:"",
extClass:"pay__wecoin-edu-modal",
top:window.innerHeight-375+"px",
footerEl:a
}),e.show();
}()),s({
appmsgstat:i.appmsgstat,
appmsgact:i.appmsgact,
comment_enabled:i.comment_enabled,
comment_count:i.comment_count,
only_fans_can_comment:i.only_fans_can_comment,
only_fans_days_can_comment:i.only_fans_days_can_comment,
is_fans_days:i.is_fans_days,
reward:{
reward_total:i.reward_total_count,
is_reward_total_count_cut:i.is_reward_total_count_cut,
reward_head_imgs:i.reward_head_imgs||[],
can_reward:i.can_reward,
user_can_reward:i.user_can_reward,
reward_qrcode_ticket:i.reward_qrcode_ticket,
timestamp:i.timestamp,
reward_author_head:i.reward_author_head,
rewardsn:i.rewardsn,
scene:source,
is_need_reward:is_need_reward,
title:msg_title,
author_id:author_id,
appmsgextRtId:t,
appmsgextRtKey:a,
can_whisper:i.can_whisper
},
reward_entrance_enable_for_preview:i.reward_entrance_enable_for_preview,
reward_wording:i.reward_wording,
reward_author_head:i.reward_author_head,
comment_entrance_enable_for_preview:i.comment_entrance_enable_for_preview,
share_redirect_url:i.share_redirect_url||"",
logo_url:i.logo_url,
nick_name:i.nick_name,
is_fans:i.is_fans,
paySubscribeInfo:i.pay_subscribe_info,
share_flag:i.share_flag,
test_flag:i.test_flag
}),i.appmsg_album_extinfo){
var p=e("appmsg/album_keep_read.js");
p.init(i.appmsg_album_extinfo);
}
}catch(m){
b("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var l=new Image;
return l.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(m.toString())+"&r="+Math.random()).substr(0,1024),
console&&console.error(m),void("undefined"!=typeof window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.onError(m));
}
},
onError:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
},
onComplete:function(){
window.ext_complete=!0,I.emit("ext-complete");
}
});
}
e("biz_wap/ui/weui.js"),e("biz_common/utils/string/html.js");
var n=e("appmsg/reward_utils.js"),_=e("appmsg/pay_read/pay_read_utils.js"),d=e("appmsg/pay_report_utils.js"),p=e("pages/create_txv.js"),m=e("pages/video_ctrl.js"),l=e("biz_common/utils/url/parse.js"),c=e("appmsg/img_copyright_tpl.html.js"),w=e("appmsg/appmsgext.js"),u=(e("appmsg/share_tpl.html.js"),
navigator.userAgent),g=-1!=u.indexOf("MicroMessenger"),h=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),f=(e("biz_wap/utils/ajax.js"),e("biz_wap/jsapi/core.js")),y=e("biz_common/tmpl.js"),b=(e("complain/localstorage.js"),
e("appmsg/log.js")),v=(e("rt/appmsg/getappmsgext.rt.js"),e("a/a_utils.js")),k=e("appmsg/related_article.js"),j=e("appmsg/like_profile.js"),x=[],z=(e("appmsg/set_font_size.js"),
e("biz_wap/utils/device.js"),e("biz_wap/utils/mmversion.js")),I=e("pages_new/modules/utils/event_bus.js"),E=e("pages/mod/bottom_modal.js");
i(),o();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=this.offset||60,a=0;
if("wifi"==window.networkType){
var s={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),o=Math.max(s.bottom*e,o),
a=Math.max(s.top*e,a);
}
for(var r=+new Date,h=[],d=this.sw,f=this,p=-1,g=0,u=t.length;u>g;g++)!function(t,i){
var s=t.placeholder.getBoundingClientRect(),r=t.src;
if(r){
(r.match(/\:\/\/[^\/]+\/mmbiz\//)&&r.indexOf("wx_fmt=gif")>-1||r.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&p++;
var f=a,g=o;
(r.match(/\:\/\/[^\/]+\/mmbiz\//)&&r.indexOf("wx_fmt=gif")>-1||r.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&m&&(f=0,
g=60),(!t.show&&(s.top<=0&&s.top+s.height+f>=0||s.top>0&&s.top<e+g)||i.isAccessibility)&&(i.inImgRead&&(s.top<=0&&s.top+s.height>=0||s.top>0&&s.top<e)&&i.inImgRead(r,networkType),
i.changeSrc&&(r=i.changeSrc(t.loader,r,p,t.placeholder)),t.loader.onerror=function(){
var e=this;
!!i.onerror&&i.onerror(t.loader.src,e,t.placeholder);
},t.loader.onload=function(){
var e=this;
if("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="!=e.src){
e.style.cssText=t.placeholder.style.cssText;
var o=e.getAttribute("data-forceheight");
o?(e.removeAttribute("data-forceheight"),c(e,"height",o,"important")):c(e,"height","auto","important"),
e.getAttribute("_width")?c(e,"width",e.getAttribute("_width"),"important"):c(e,"width","auto","important"),
t.placeholder.parentNode.replaceChild(e,t.placeholder),t.placeholder=e,!!i.onload&&i.onload(e.src,e),
this.onload=null;
}
},l(t.loader,"src",r),h.push(r),t.show=!0,c(t.placeholder,"visibility","visible","important")),
n.isWp&&1*t.placeholder.width>d&&(t.placeholder.width=d);
}
}(t[g],f);
h.length>0&&this.detect&&this.detect({
time:r,
loadList:h,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,a=this.attrKey||"data-src",n=o.offsetWidth,s=0,r=this.imgOccupied||!1,m=this.crossOrigin||!1;
o.currentStyle?s=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(s=getComputedStyle(o).width),
this.sw=1*s.replace("px","");
for(var d=0,f=t.length;f>d;d++){
var p=t.item(d),g=l(p,a),u=l(p,"src");
if(g&&!(u&&u.indexOf("data:image/gif;base64")<0)){
var b=100;
if(p.dataset&&p.dataset.ratio){
var A=1*p.dataset.ratio,w=1*p.dataset.w||n;
"number"==typeof A&&A>0?(w=n>=w?w:n,b=w*A,r||(p.style.width&&p.setAttribute("_width",p.style.width),
c(p,"width",w+"px","important"),c(p,"visibility","visible","important"),p.setAttribute("src",h))):c(p,"visibility","hidden","important");
}else c(p,"visibility","hidden","important");
r||c(p,"height",b+"px","important"),m&&-1==g.indexOf("mmsns.qpic.cn")&&!(g.match(/\:\/\/[^\/]+\/mmbiz\//)&&g.indexOf("wx_fmt=gif")>-1||g.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&(p.crossOrigin="anonymous"),
p.alt="图片",e.push({
placeholder:p,
loader:p.cloneNode(),
src:g,
height:b,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
if(this.__called_first_time)i.call(this,t),this.__called_first_time=!1;else if(!this.debounce){
this.debounce=!0;
var e=this;
setTimeout(function(){
i.call(e,t),e.debounce=!1;
},500);
}
}
function a(t){
s.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),s.on(document,"touchmove",function(i){
o.call(t,i);
}),t.__called_first_time=!0,o.call(t,{}),t.accessibilityCallback&&t.accessibilityCallback(function(){
t.isAccessibility=!0,o.call(t,{});
});
}
var n=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),r=t("biz_common/dom/attr.js"),l=r.attr,c=r.setProperty,h=t("biz_common/ui/imgonepx.js"),m=!0;
return a;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
var _extends=Object.assign||function(e){
for(var i=1;i<arguments.length;i++){
var n=arguments[i];
for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t]);
}
return e;
};
define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/jquery.md5.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","appmsg/appmsg_report.js","appmsg/kan_report.js","appmsg/malicious_wording.js","biz_wap/utils/jsmonitor_report.js","appmsg/related_article.js","appmsg/share_biz.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function i(e,i,n){
var t="",o="";
try{
""!=tid&&(o="tid="+tid+"&aid=54");
var r=e.split("?")[1]||"";
if(r=r.split("#")[0],""==r);else{
var s=[r,"mpshare=1","scene="+i,"srcid="+srcid,"sharer_sharetime="+n,"sharer_shareid="+_];
if(""!=o&&s.push(o),r=s.join("&"),2===i&&d&&d.indexOf(h)>-1){
var a=Math.floor(Math.random()*u.length),m=u[a];
t=e.split("?")[0]+"?"+r+("&testtype="+m)+"#"+(e.split("#")[1]||"");
}else t=e.split("?")[0]+"?"+r+"#"+(e.split("#")[1]||"");
}
}catch(l){
t="";
}
return t||(t=location.href+"#wechat_redirect",c.setLogs({
id:28307,
key:47,
value:1,
lc:1,
log0:"[share_link]["+encodeURIComponent(location.href)+"]["+encodeURIComponent(e)+"]["+encodeURIComponent(msg_link)+"]"
})),t;
}
function n(e,i,n,t){
var o=arguments.length<=4||void 0===arguments[4]?0:arguments[4];
s.shareReport({
link:e,
action_type:n,
sharer_sharetime:t,
sharer_shareid:_,
share_source:window.customShareSource||(0===o?1:2)
});
}
function t(e,i){
return e.isCDN()&&(e=o.addParam(e,"wxfrom",i,!0)),e;
}
e("biz_common/utils/string/html.js"),e("appmsg/cdn_img_lib.js"),e("biz_common/jquery.md5.js");
var o=e("biz_common/utils/url/parse.js"),r=e("biz_wap/utils/mmversion.js"),s=e("appmsg/appmsg_report.js"),a=e("appmsg/kan_report.js"),m=e("appmsg/malicious_wording.js"),c=e("biz_wap/utils/jsmonitor_report.js"),l=e("appmsg/related_article.js"),p=e("appmsg/share_biz.js"),d=p.shareBizTest,_=window.md5(window.user_uin),u=["testrd","otherrd"],h=0;
try{
h=1*window.atob(window.biz);
}catch(g){}
var f={
report_action:2,
share_type:5
},w=e("biz_wap/jsapi/core.js");
w.call("hideToolbar"),w.call("showOptionMenu");
var b=msg_title.htmlDecode(),v=(msg_source_url.htmlDecode(),""),k=cdn_url_1_1||msg_cdn_url||ori_head_img_url||round_head_img,j=k,y=msg_link.htmlDecode(),b=msg_title.htmlDecode(),D=msg_desc.htmlDecode();
D=D||"",D=D.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(D=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
k.isCDN()&&(k=k.replace(/\/0$/,"/300"),k=k.replace(/\/0\?/,"/300?")),j.isCDN()&&(j=j.replace(/\/0$/,"/640"),
j=j.replace(/\/0\?/,"/640?")),malicious_title_reason_id&&(b=m.maliciousTitleMap[malicious_content_type][malicious_title_reason_id]||b,
D=m.maliciousDescMap[malicious_content_type][malicious_title_reason_id]||D,1!=malicious_content_type&&(k="https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png")),
"1"==is_limit_user&&w.call("hideOptionMenu"),window.is_temp_url&&w.invoke("hideMenuItems",{
menuList:["menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:qzone","menuitem:share:weibo","menuItem:share:WeiboApp","menuItem:share:QZone","menuitem:facebook","menuItem:copyUrl","menuItem:share:email","menuitem:copy_url","menuitem:share:haokan"]
},function(){});
var I="https://res.wx.qq.com/op_res/Fwh9olR917lxUMxpJVM5sCCyrQOJSm68IEt-HfL7vpc5-_etzmyuLg1kPdU6RNRX";
w.on("menu:share:appmessage",function(e){
if(window.is_wash){
var o=Date.now();
w.invoke("sendAppMessage",{
img_url:I,
img_width:"640",
img_height:"640",
link:i(y,r,o),
desc:"你可以阅读以下原创作者的内容",
title:"原文存在洗稿行为"
},function(){
n(y,fakeid,r,o,e.shareScene);
});
}else{
var r=1,s=t(k,"1");
e&&"favorite"==e.scene&&(r=24,s=t(k,"4"),l&&l.render&&l.render("share")),1==malicious_content_type&&(s="https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png");
var o=Date.now(),m={
appid:v,
img_url:s,
img_width:"640",
img_height:"640",
link:y,
desc:D,
title:b
};
if(window.customShareInfo&&"object"===_typeof(window.customShareInfo)&&_extends(m,window.customShareInfo),
"string"==typeof m.forbid_msg){
var c=m.forbid_msg.replace("#op#","favorite"===e.scene?"收藏":"分享");
return void(window.weui||window).alert(c);
}
m.link=i(m.link,r,o),w.invoke("sendAppMessage",m,function(){
n(y,fakeid,r,o,e.shareScene),l&&l.render&&l.render("share"),m.vid&&(f=_extends(f,{
vid:m.vid,
share_type:2
}),a.reportKanData(f));
});
}
}),w.on("menu:share:timeline",function(e){
if(window.is_wash){
var o=Date.now();
w.invoke("shareTimeline",{
img_url:I,
img_width:"640",
img_height:"640",
link:i(y,2,o),
desc:"",
title:"原文存在洗稿行为，你可以阅读以下原创作者的内容"
},function(){
n(y,fakeid,2,o,e.shareScene);
});
}else{
var s=k;
r.isIOS||(s=t(k,"2"));
var o=Date.now(),m={
img_url:s,
img_width:"640",
img_height:"640",
link:y,
desc:D,
title:b
};
if(window.customShareInfo&&"object"===_typeof(window.customShareInfo)&&_extends(m,window.customShareInfo),
"string"==typeof m.forbid_msg){
var c=m.forbid_msg.replace("#op#","分享");
return void(window.weui||window).alert(c);
}
m.link=i(m.link,2,o),w.invoke("shareTimeline",m,function(){
n(y,fakeid,2,o,e.shareScene),l&&l.render&&l.render("share"),m.vid&&(f=_extends(f,{
vid:m.vid,
share_type:1
}),a.reportKanData(f));
});
}
});
w.on("menu:share:weiboApp",function(){
var e=Date.now();
w.invoke("shareWeiboApp",{
img_url:k,
link:i(y,3,e),
title:b
},function(){
n(y,fakeid,3,e);
});
}),w.on("menu:share:facebook",function(){
var e=Date.now();
n(y,fakeid,7,e),w.invoke("shareFB",{
img_url:j,
img_width:"640",
img_height:"640",
link:i(y,43,e),
desc:D,
title:b
},function(){});
}),w.on("menu:share:QZone",function(){
var e=t(k,"6"),o=Date.now();
n(y,fakeid,5,o),w.invoke("shareQZone",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(y,22,o),
desc:D,
title:b
},function(){});
}),w.on("menu:share:qq",function(){
var e=t(k,"7"),o=Date.now();
n(y,fakeid,5,o),w.invoke("shareQQ",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(y,23,o),
desc:D,
title:b
},function(){});
}),w.on("menu:share:email",function(){
var e=Date.now();
n(y,fakeid,5,e),w.invoke("sendEmail",{
content:i(y,5,e),
title:b
},function(){});
}),w.on("sys:record",function(){
w.invoke("recordHistory",{
link:y,
title:b,
source:nickname,
img_url:k
},function(){});
});
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
function t(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=gif")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_gif\//)&&-1==t.indexOf("/s640");
}
function i(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=png")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_png\//);
}
function n(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=jpg")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_jpg\//);
}
function r(t){
return t.indexOf("tp=webp")>-1;
}
function e(t){
return t.indexOf("tp=wxpic")>-1;
}
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qpic.cn/");
},String.prototype.https2http=function(){
var t=this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
return t=t.replace(/https:\/\/mmbiz\.qpic\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/")||0==this.indexOf("http://res.wx.qq.com/")||0==this.indexOf("https://res.wx.qq.com/");
},String.prototype.nogif=function(){
var i=this.toString();
return t(i)?i.replace(/\/\d+\?/g,"/s640?").replace(/\/\d+\//g,"/s640/").replace(/\/\d+\./g,"/s640.").replace("wx_fmt=gif",""):i;
},String.prototype.isGif=function(){
var i=this.toString();
return t(i);
},String.prototype.isWxpic=function(){
var t=this.toString();
return e(t);
},String.prototype.isWebp=function(){
var t=this.toString();
return r(t);
},String.prototype.canHevc=function(){
var r=this.toString();
return n(r)||i(r)||t(r);
},String.prototype.getImgType=function(){
var p=this.toString();
return t(p)?"gif":r(p)?"webp":e(p)?"wxpic":i(p)?"png":n(p)?"jpg":"unknow";
},String.prototype.getOriginImgType=function(){
var r=this.toString();
return t(r)?"gif":i(r)?"png":n(r)?"jpg":"unknow";
},String.prototype.imgChange640=function(){
var t=this.toString();
t=t.replace(/(\?tp=webp)|(\?tp=wxpic)|(&tp=webp)|(&tp=wxpic)/g,"");
var i=new Date;
return i.setFullYear(2014,9,1),t.isCDN()&&1e3*ct>=i.getTime()&&!t.isGif()&&(t=t.replace(/\/0$/,"/640"),
t=t.replace(/\/0\?/,"/640?"),t=t.replace(/\/0\./,"/640.")),t;
};
});