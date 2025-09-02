var _extends=Object.assign||function(e){
for(var i=1;i<arguments.length;i++){
var t=arguments[i];
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
}
return e;
};
define("appmsg/album_keep_read.js",["page/appmsg_new/mod/album_read.css","biz_common/dom/event.js","biz_common/dom/class.js","pages/mod/bottom_modal.js","biz_wap/utils/openUrl.js","pages/utils.js","biz_wap/utils/ajax.js","common/comm_report.js","common/utils.js","biz_common/dom/offset.js","biz_wap/utils/wapsdk.js","common/tap_highlight.js"],function(e){
"use strict";
function i(e,i){
h.jsmonitor({
id:223326,
key:e,
value:i
});
}
function t(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
b.report(21277,_extends({},j,e));
}
function n(){
function e(){
if(!n){
var e=w.getOffset(y).offsetTop,o=f.getScrollTop();
o+f.getInnerHeight()>=e+a&&e+a>=o&&(t({
ActionType:1
}),i(11),n=!0);
}
}
var n=void 0,a=y.offsetHeight/2;
f.bindDebounceScrollEvent(e),e();
}
function a(){
var e=window.appmsg_album_info;
if(e.link){
var i=e.link.replace("#wechat_redirect","&subscene=159&subscene="+window.source+"&scenenote="+encodeURIComponent(window.location.href)+"&nolastread=1#wechat_redirect");
u.openUrlWithExtraWebview(i.htmlDecode());
}
}
function o(e){
e&&c.on(e,"click","."+x.itemClassName,function(e){
var i=e.delegatedTarget;
if(!_.hasClass(i,"album_read_directory_current")){
var n=void 0;
n=i.dataset.url.includes("#")?i.dataset.url.replace("#",T+"&scene=190#"):i.dataset.url+(T+"&scene=190"),
t({
ActionType:5,
Url:n
}),p.jumpUrl(n,!0),_.addClass(i,"album_read_directory_disabled");
}
});
}
function s(){
var e=document.createElement("div"),i=document.createElement("span");
return i.setAttribute("role","option"),i.innerHTML='<span aria-label="话题：">#</span>'+window.appmsg_album_info.title,
e.appendChild(i),e.innerHTML;
}
function r(e){
g({
type:"GET",
url:"/mp/appmsgalbum?action=paging&__biz="+window.biz+"&album_id="+x.albumId+"&cur_msgid="+x.msgid+"&cur_itemidx="+x.idx+"&count="+x.pageCount,
timeout:5e3,
dataType:"json",
success:function(i){
i.base_resp&&0===i.base_resp.ret&&e(i.getalbum_resp);
},
error:function(){
console.log("[error]");
}
});
}
function l(){
function e(e){
var i=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],t=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],n=document.createDocumentFragment();
if(u)if(i){
v=1;
for(var a=0;a<e.length;a++)if(e[a].msgid.toString()===x.msgid.toString()&&e[a].itemidx.toString()===x.idx.toString()){
v=a;
break;
}
e.forEach(function(e,i){
e.index=p?c-(i-v):c+(i-v);
});
}else e.forEach(t?function(e,i){
e.index=p?h.index-i-1:h.index+i+1;
}:function(i,t){
i.index=p?w.index+(e.length-t):w.index-(e.length-t);
});
return e.forEach(function(e){
var i=document.createElement("div");
if(_.addClass(i,x.itemClassName),e.msgid.toString()===window.mid.toString()&&e.itemidx.toString()===window.idx.toString()?_.addClass(i,"album_read_directory_current"):1===e.user_read_status&&(_.addClass(i,"album_read_directory_disabled"),
_.addClass(i,"js_wx_tap_highlight"),_.addClass(i,"wx_tap_cell")),u){
var t=document.createElement("span");
t.className="album_read_directory_item_index",t.innerText=e.index+".",i.appendChild(t);
}
var a=document.createElement("span");
a.className="album_read_directory_title_wrp";
var o=document.createElement("span");
o.className="album_read_directory_title_wrp",o.innerText=e.title,a.appendChild(o),
i.setAttribute("data-url",e.url),i.setAttribute("role","option");
var s=document.createElement("span");
if(e.is_paid){
var r="已付费";
_.addClass(s,"wx_icon_pay_tag"),_.addClass(s,"wx_icon_pay_tag_paid"),s.innerText=r,
a.appendChild(s);
}else if(e.is_pay_subscribe){
var l="付费";
_.addClass(s,"wx_icon_pay_tag"),s.innerText=l,a.appendChild(s);
}
i.appendChild(a),n.appendChild(i);
}),n;
}
function n(e){
1*e.reverse_continue_flag||(b=!1,C.disablePullDownLoad()),1*e.continue_flag||(f=!1);
}
var l=document.createElement("div");
l.style.position="relative",l.setAttribute("role","listbox");
var d=[],c=void 0,u=void 0,p=void 0,b=!0,f=!0,w=void 0,h=void 0,v=1,y={
extClass:"album_read_directory weui-half-screen-dialog_fold",
hasBtn:!0,
btnSlot:'<div id="js_topic_detail" class="weui-btn__word-wrp">\n                  <span class="weui-btn__word">详情</span>\n                  <i class="weui_right_arrow"></i>\n                </div>',
title:s(),
btnClickCb:function(){
t({
ActionType:6
}),i(15),a();
},
cb:function(){
r(function(i){
C.hideLoading(),p=i.base_info.is_reverse,c=i.base_info.cur_article_num,u=c?1:0,l.appendChild(e(i.article_list,!0)),
w=i.article_list[0],h=i.article_list[i.article_list.length-1],n(i),f||C.showEndLine();
var t=l.childNodes[v];
setTimeout(function(){
t.offsetTop+t.clientHeight>C.contentAreaWrp.clientHeight&&C.scrollTo(0,l.offsetHeight);
},200);
});
},
onShow:function(){
t({
ActionType:4
}),i(14);
},
onPullUpLoad:function(){
f&&(C.showPullUpLoading(),g({
type:"GET",
url:"/mp/appmsgalbum?action=paging&__biz="+window.biz+"&album_id="+x.albumId+"&begin_msgid="+h.msgid+"&begin_itemidx="+h.itemidx+"&count="+x.pageCount,
timeout:5e3,
dataType:"json",
success:function(i){
C.hidePullUpLoading();
var t=i.base_resp&&1*i.base_resp.ret;
if(0===t){
var a=i.getalbum_resp.article_list;
n(i.getalbum_resp),l.appendChild(e(a,!1,!0)),d=d.concat(a),C.finishPullUpLoad(),
h=d[d.length-1],1*i.getalbum_resp.continue_flag||C.showEndLine();
}
},
error:function(){}
}));
},
onPullDownLoad:function(){
b&&(C.showPullDownLoading(),g({
type:"GET",
url:"/mp/appmsgalbum?action=paging&__biz="+window.biz+"&album_id="+x.albumId+"&begin_msgid="+w.msgid+"&begin_itemidx="+w.itemidx+"&count="+x.pageCount+"&isbackward=1",
timeout:5e3,
dataType:"json",
success:function(i){
C.hidePullDownLoading();
var t=i.base_resp&&1*i.base_resp.ret;
if(0===t){
var a=i.getalbum_resp.article_list,o=i.getalbum_resp.continue_flag;
i.getalbum_resp.continue_flag=i.getalbum_resp.reverse_continue_flag,i.getalbum_resp.reverse_continue_flag=o,
n(i.getalbum_resp);
var s=e(a,!1,!1),r=l.firstChild;
l.insertBefore(s,r),d=a.concat(d),C.scrollTo(0,r.offsetTop-62),setTimeout(function(){
C.finishPullDownLoad();
},500),w=d[0];
}
},
error:function(){}
}));
}
};
window.appmsg_album_info.size<=4&&(y.top=screen.height/2-(screen.height-window.innerHeight)+"px"),
C=new m(l,y),C.showLoading(),C.show(),o(l);
}
function d(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=document.getElementById("js_album_directory");
c.on(n,"click",function(){
v.highlightEle(n.getElementsByClassName("js_album_directory__name")[0]),v.highlightEle(n.getElementsByClassName("js_album_directory__size")[0]),
C?C.show():l();
});
var a=document.getElementById("js_album_prev"),o=document.getElementById("js_album_next");
e.pre_article_link?c.on(a,"click",function(){
var n=void 0;
t({
ActionType:2,
SubActionType:1
}),i(12),n=e.pre_article_link.includes("#")?e.pre_article_link.replace("#",T+"&scene=189#"):e.pre_article_link+(T+"&scene=189"),
location.href=n.replace(/&amp;/g,"&");
}):a.parentNode.removeChild(a),e.next_article_link?c.on(o,"click",function(){
var n=void 0;
t({
ActionType:2,
SubActionType:2
}),i(13),n=e.next_article_link.includes("#")?e.next_article_link.replace("#",T+"&scene=189#"):e.next_article_link+(T+"&scene=189"),
location.href=n.replace(/&amp;/g,"&");
}):o.parentNode.removeChild(o);
}
e("page/appmsg_new/mod/album_read.css");
var c=e("biz_common/dom/event.js"),_=e("biz_common/dom/class.js"),m=e("pages/mod/bottom_modal.js"),u=e("biz_wap/utils/openUrl.js"),p=e("pages/utils.js"),g=e("biz_wap/utils/ajax.js"),b=e("common/comm_report.js"),f=e("common/utils.js"),w=e("biz_common/dom/offset.js"),h=e("biz_wap/utils/wapsdk.js"),v=e("common/tap_highlight.js"),y=document.getElementById("js_album_keep_read"),x={
link:window.appmsg_album_info.link,
albumId:window.appmsg_album_info.id,
msgid:window.mid,
idx:window.idx,
pageCount:10,
itemClassName:"album_read_directory_item"
},j={
MsgId:1*x.msgid,
ItemIdx:1*x.idx,
BizUin:window.biz,
Itemshowtype:1*window.item_show_type,
SessionId:window.sessionid,
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene,
Albumid:x.albumId,
Albumtype:window.appmsg_album_info.type,
Title:window.appmsg_album_info.title
},C=void 0,T="&cur_album_id="+x.albumId;
return{
init:function(e){
y&&(e.pre_article_link||e.next_article_link)&&(document.getElementById("js_album_keep_read_title").innerHTML=window.appmsg_album_info.title,
document.getElementById("js_album_keep_read_size").innerHTML=window.appmsg_album_info.size,
document.getElementById("js_album_keep_read_pre_title").innerHTML=e.pre_article_title||"",
document.getElementById("js_album_keep_read_next_title").innerHTML=e.next_article_title||"",
y.style.display="block",d(e),n());
}
};
});define("appmsg/more_read.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","appmsg/more_read_tpl.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","biz_wap/utils/jsmonitor_report.js","common/utils.js"],function(n){
"use strict";
function i(n){
for(var i=r.getInnerHeight(),e=document.documentElement.clientWidth||window.innerWidth,t=document.body.scrollHeight||document.body.offsetHeight,s=document.body.scrollTop||document.documentElement.scrollTop,m=[],a=0;a<l.length;a++){
var w=[l[a].bizuin||window.biz||"",l[a].mid||"",l[a].idx||""].join("_");
m.push(w);
}
m=m.join("#");
var p=c[n.index].getBoundingClientRect(),h="fans_read_cnt="+l[n.index].fans_read_cnt,g={
act:n.action||0,
bizuin:window.biz||"",
msgid:window.mid||"",
idx:window.idx||"",
scene:window.source||"",
sub_scene:window.subscene||"",
get_a8_key_scene:window.ascene||"",
screen_height:i,
screen_width:e,
screen_num:Math.ceil(t/i),
action_screen_num:Math.ceil((p.top+p.height+s)/i),
start_time_ms:_,
action_time_ms:Date.now(),
more_msg:m,
a_bizuin:l[n.index].bizuin||window.biz||"",
a_msgid:l[n.index].mid||"",
a_idx:l[n.index].idx||"",
rank:n.index+1,
tip:h,
session_id:u
};
o({
url:"/mp/appmsgreport?action=more_read",
type:"POST",
data:g,
timeout:2e3,
async:!1,
mayAbort:!0
});
var b=1===n.action?4:5;
d.setSum(110809,b,1);
}
function e(){
if(l){
for(var n=0,t=r.getInnerHeight(),o=0;o<c.length;o++)if(c[o].dataset.show)n++;else{
var s=c[o].getBoundingClientRect();
s.top+s.height<t&&(c[o].dataset.show=1,i({
action:1,
index:o
}));
}
n>=c.length&&a.off(window,"scroll",e);
}
}
n("biz_common/utils/string/html.js");
var t=n("biz_common/tmpl.js"),o=n("biz_wap/utils/ajax.js"),s=n("appmsg/more_read_tpl.html.js"),m=n("biz_wap/utils/openUrl.js"),a=n("biz_common/dom/event.js"),d=n("biz_wap/utils/jsmonitor_report.js"),r=n("common/utils.js"),l=null,c=null,_=Date.now(),u=""+_+"_"+Math.random().toString(36).substring(2);
return a.on(window,"scroll",e),function(n,e){
l=e,n.innerHTML=t.tmpl(s,{
list:l
},!1),c=n.getElementsByClassName("more_read_link");
for(var o=0;o<c.length;o++)a.on(c[o],"click",function(n){
return function(){
window.__second_open__?m.openUrlWithExtraWebview(l[n].link.htmlDecode()):window.location.href=l[n].link.htmlDecode(),
i({
action:2,
index:n
});
};
}(o));
n.style.display="";
};
});define("appmsg/like_and_share.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/jsapi/core.js","pages/utils.js","appmsg/retry_ajax.js","appmsg/set_font_size.js","common/comm_report.js","appmsg/related_article.js","appmsg/like_profile.js","common/utils.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","appmsg/appmsg_report.js","appmsg/rec_report_key.js"],function(e,i,o,s){
"use strict";
var n=e("biz_common/dom/event.js"),t=e("biz_common/dom/class.js"),r=e("biz_wap/jsapi/core.js"),a=e("pages/utils.js"),m=a.formatReadNum,d=e("appmsg/retry_ajax.js"),l=e("appmsg/set_font_size.js"),p=e("common/comm_report.js"),c=e("appmsg/related_article.js"),w=e("appmsg/like_profile.js"),_=e("common/utils.js"),k=e("biz_wap/utils/device.js"),u=e("biz_wap/utils/mmversion.js"),h=e("appmsg/appmsg_report.js"),j=e("appmsg/rec_report_key.js"),g=j.RecActionType,b=j.reportRecAction,y=function(e){
return document.getElementById(e);
},f=function(e){
e.style.display="block";
},v=function(e){
e.style.display="none";
},D={
likeNum:0,
isLike:0,
likeDom:y("like_old"),
likeNumDom:y("likeNum_old"),
shareDom:y("js_bottom_share"),
collectDom:y("js_bottom_collect"),
oprRightDom:y("js_bottom_opr_right"),
shareBottomBtn:y("js_bottom_share_btn"),
likeBottomBtn:y("js_bottom_zan_btn"),
similarZanCard:y("js_similar_video_card"),
overflowFontScale:1
},B=function(e){
w&&w.renderLikeProfile&&w.renderLikeProfile(e);
},N=function(){
var e=0,i=/(?:\?|&)search_click_id=([^&]*)(?:&|$)/.exec(window.location.search);
try{
e=1*window.atob(window.biz);
}catch(o){}
var s={
BizUin:e,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0,
EventType:4,
search_click_id:i?i[1]:0
};
p.report(19048,s);
},z=function(){
t.addClass(D.oprRightDom,"sns_opr_overflow");
},L=function(){
t.addClass(D.likeDom,"praised"),D.likeNum++;
var e=D.likeNumDom.innerHTML;
("10万+"!==e||"100k+"!==e)&&(D.likeNumDom.innerHTML=m(D.likeNum)),D.likeNumDom.style.display="",
c&&c.render&&c.render("praise"),B(["like"]),D.likeBottomBtn.setAttribute("aria-describedby","js_a11y_zan_btn_tips"),
v(y("js_parise_wording"));
},I=function(){
t.removeClass(D.likeDom,"praised"),D.likeNum--;
var e=D.likeNumDom.innerHTML;
D.likeNum>=0&&"10万+"!==e&&"100k+"!==e&&(D.likeNumDom.innerHTML=m(D.likeNum)),0===D.likeNum&&(D.likeNumDom.style.display="none",
f(y("js_parise_wording"))),D.likeBottomBtn.removeAttribute("aria-describedby");
},x=[],S=function(e){
"function"==typeof e&&x.push(e);
},P=function(e){
D.isLike=D.isLike?0:1,D.isLike?L():I();
var i=/(?:\?|&)search_click_id=([^&]*)(?:&|$)/.exec(window.location.search);
d({
url:"/mp/appmsg_like?__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&like="+D.isLike+"&f=json&appmsgid="+window.appmsgid+"&itemidx="+window.itemidx,
data:{
scene:window.source,
appmsg_like_type:1,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
is_temp_url:window.is_temp_url||0,
style:e||0,
exptype:window.exptype||"",
enterid:window.enterid||"",
sessionid:window.sessionid||"",
expsessionid:window.expsessionid||"",
search_click_id:i?i[1]:0
},
type:"POST"
}),x.forEach(function(e){
e(D.isLike,D.likeNum);
});
},T=function(e){
return D.likeBottomBtn&&D.likeBottomBtn.disabled===!0?void 0:window.is_temp_url?void("5"!==window.item_show_type||!_.isNativePage()||k.os.pc?window.weui.alert("预览状态下无法操作"):s("预览状态下无法操作")):void P(e);
};
n.on(D.likeDom,"click",function(){
T(),b(g.kLike,D.isLike?1:0);
}),n.on(D.shareDom,"click",function(){
D.shareBottomBtn&&D.shareBottomBtn.disabled===!0||(N(),r.invoke("handleMPPageAction",{
action:"share"
}),B(["share"]),b(g.kShare));
}),n.on(D.collectDom,"click",function(){
r.invoke("handleMPPageAction",{
action:"doFavorite"
}),c&&c.render&&c.render("favorite"),B(["collect"]),h.shareReport({
link:window.msg_link||window.cgiData&&window.cgiData.msg_link,
action_type:24,
share_source:2,
async:!0
}),b(g.kFavorite);
});
var A=function(){
z(),l.onFontScaleChange(z),window.addEventListener("resize",z);
},M=function(e){
var i=e.shareShow,o=e.likeShow,s=e.likeNum,n=e.isLike,r=e.shareGray,a=e.likeGray;
D.likeNum=s,D.isLike=n,i&&D.shareDom&&(k.os.pc?k.os.windows&&u.getInner()>="63010000"&&f(D.shareDom):f(D.shareDom)),
r&&D.shareBottomBtn&&(D.shareBottomBtn.disabled=!0),o&&D.likeDom&&f(D.likeDom),a&&D.likeBottomBtn&&(D.likeBottomBtn.disabled=!0),
o&&D.likeNumDom&&(0!==s?(D.likeNumDom.innerHTML=m(D.likeNum),D.likeNumDom.style.display="",
n&&(t.addClass(D.likeDom,"praised"),D.likeBottomBtn.setAttribute("aria-describedby","js_a11y_zan_btn_tips")),
v(y("js_parise_wording"))):f(y("js_parise_wording"))),(u.isWechat&&(k.os.iphone&&u.getInner()>"17001000"||k.os.android&&u.getInner()>"27001300")||k.os.windows&&u.getInner()>="63010000")&&f(D.collectDom),
A(),x.forEach(function(e){
e(D.isLike,D.likeNum);
});
};
return{
initLikeShareDom:M,
triggerLike:T,
onLikeChange:S,
renderProfile:B
};
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/base64.js","biz_wap/utils/jsmonitor_report.js","appmsg/log.js","complain/tips.js","appmsg/retry_ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/utils.js","appmsg/loading.js","appmsg/like_and_share.js","biz_wap/utils/device.js","appmsg/pay_report_utils.js","pages/utils.js","appmsg/related_article.js","appmsg/rec_report_key.js"],function(require,exports,module,alert){
"use strict";
function qs(e){
return document.getElementById(e);
}
function showAppToast(e,i){
JSAPI.invoke("handleMPPageAction",{
action:"showToast",
wording:e||"",
status:i||"success"
});
}
function initLikeEvent(opt){
function show(e){
e.style.display="";
}
function hide(e){
e.style.display="none";
}
function vShow(e){
e.style.visibility="visible";
}
function vHide(e){
e.style.visibility="hidden";
}
function clear(e){
e.value="";
}
function showLoading(){
commonUtils.isNativePage()?showAppToast("发送中","loading"):Loading.show("发送中");
}
function hideLoading(){
commonUtils.isNativePage()?showAppToast("","dismissloading"):Loading.hide();
}
function showToast(e){
commonUtils.isNativePage()?showAppToast(e):(el_toastMsg.innerHTML=e,show(el_likeToast),
setTimeout(function(){
hide(el_likeToast);
},1e3));
}
function alert2(e){
"5"!==window.item_show_type||!commonUtils.isNativePage()||Device.os.pc?window.weui.alert(e):alert(e);
}
function failAlert(e){
return e&&e.length>maxLikeCommentWord?void alert2("想法不可以超过%s字".replace("%s",maxLikeCommentWord)):void alert2("网络异常，请稍后重试");
}
function isAppCommentAvailable(){
return mmversion.isWechat?Device.os.ipad?!1:mmversion.isInMiniProgram?!1:mmversion.isIOS&&mmversion.gtVersion("7.0.8")?!0:mmversion.isAndroid&&mmversion.gtVersion("7.0.8")?!0:commonUtils.isNativePage()&&(mmversion.isIOS||mmversion.isAndroid)?!0:!1:!1;
}
var scrollTop,el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom,showType=opt.showType,prompted=opt.prompted,haokanLock=!1,startY,jumpWowLock=!1,el_likeToast=qs("js_like_toast"),el_likeBtn=qs("js_like_btn"),el_toastMsg=qs("js_toast_msg"),el_likeEducate=qs("js_like_educate"),el_friend_like=qs("js_friend_like_area"),el_go_wow=qs("js_go_wow"),el_likeComment=qs("js_like_comment"),el_bcommentPanel2=qs("js_comment_panel"),el_bcommentPanel2Wrp=qs("js_comment_wrp"),el_likeCommentShare=qs("js_like_comment_share"),el_likeCommentText=qs("js_comment_text"),el_commentCancel=qs("js_comment_cancel"),el_commentConfirm=qs("js_comment_confirm"),el_commentErrorMsg=qs("js_like_comment_msg"),el_commentCurrentCount=qs("js_like_current_cnt"),el_commentArea=qs("js_comment_area"),el_panelLikeTitle=qs("js_panel_like_title"),el_wowClosePanel=qs("wow_close_inform"),el_wowCloseAck=qs("wow_close_ack"),el_alertPanel=qs("js_alert_panel"),el_alertContent=qs("js_alert_content"),el_alertConfirm=qs("js_alert_confirm");
if(el_like&&el_likeNum){
window.appmsg_like_type&&2===window.appmsg_like_type?jsmonitorReport.setSum(114217,0,1):window.appmsg_like_type&&1===window.appmsg_like_type&&jsmonitorReport.setSum(114217,1,1);
var like_report=function(){
function e(e,i,o,t,n){
if(1===appmsg_like_type)el_like.setAttribute("like",1),Class.addClass(el_like,opt.className),
"100000+"!==e&&(el_likeNum.innerHTML=o+1);else if(2===appmsg_like_type)return void initRecommendPanel();
var s=/(?:\?|&)search_click_id=([^&]*)(?:&|$)/.exec(window.location.search);
RetryAjax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+i+"&f=json&appmsgid="+t+"&itemidx="+n,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
action_type:i?1:2,
device_type:window.devicetype,
exptype:window.exptype||"",
expsessionid:window.expsessionid||"",
search_click_id:s?s[1]:0,
enterid:window.enterid||0,
sessionid:window.sessionid||0
},
type:"POST"
});
}
var i=el_like.getAttribute("like"),o=el_likeNum.innerHTML,t=parseInt(i)?parseInt(i):0,n=t?0:1,s=parseInt(o)?parseInt(o):0,l=opt.appmsgid||opt.mid,a=opt.itemidx||opt.idx;
if(reportRecAction(RecActionType.kSeen,n),t){
if(1!==appmsg_like_type)return void sendRecommendAjax(0);
Class.removeClass(el_like,opt.className),el_like.setAttribute("like",0),s>0&&"100000+"!==o&&(el_likeNum.innerHTML=s-1==0?"赞":s-1);
}else g.supportZaikanAutho?WeixinJSBridge.invoke("handleHaokanAction",{
action:"checkSyncHaoKanPermission"
},function(i){
var t=i.result;
0!==t&&e(o,n,s,l,a);
}):e(o,n,s,l,a);
},reportForceHorizontalbadJS=function(e){
e&&window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&window.WX_BJ_REPORT.BadJs.report("force horizontal screen","biz: "+("function"==typeof window.atob?window.atob(window.biz):window.biz)+" | mid: "+window.mid+" | idx: "+window.idx+" | action: "+e,{
mid:"mmbizwap:horizontal_screen",
view:"wap_business"
});
},initRecommendPanel=function(){
sendRecommendAjax(1,"",1);
},isBeenUnvisible=function(e){
function i(){
return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
}
return e.offsetTop+el_likeComment.offsetHeight-i()>=commonUtils.getInnerHeight()?!0:!1;
},disableMove=function(){
document.addEventListener("touchmove",preventMove,{
passive:!1
}),el_likeCommentText.addEventListener("touchstart",getTouchStart,{
passive:!1
}),el_likeCommentText.addEventListener("touchmove",preventText,!1);
},enableMove=function(){
document.removeEventListener("touchmove",preventMove,{
passive:!1
}),el_likeCommentText.removeEventListener("touchstart",getTouchStart,{
passive:!1
}),el_likeCommentText.removeEventListener("touchmove",preventText,!1);
},preventMove=function(e){
var i=e.target;
"TEXTAREA"!==i.tagName&&"BUTTON"!==i.tagName&&(e.preventDefault(),e.stopPropagation());
},getTouchStart=function(e){
var i=e.targetTouches||[];
if(i.length>0){
var o=i[0]||{};
startY=o.clientY;
}
},preventText=function(e){
var i=!1,o=e.changedTouches,t=this.scrollTop,n=this.offsetHeight,s=this.scrollHeight;
if(o.length>0){
var l=o[0]||{},a=l.clientY;
i=a>startY&&0>=t?!1:startY>a&&t+n>=s?!1:!0,i||e.preventDefault();
}
},isShow=function(e){
return"none"===e.style.display||"hidden"===e.style.visibility?!1:""===e.style.display||"block"===e.style.display||"visible"===e.style.visibility?!0:void 0;
},validataComment=function(e,i){
var o=e.value.replace(/^\s+|\s+$/g,"");
sendRecommendAjax(1,o,i);
},showEducatePanel=function(e,i,o){
show(el_likeComment),el_likeComment.focus();
var t=window.source||window.cgiData&&window.cgiData.source||0;
return t&&(t=parseInt(t,10),94===t)?void(e&&5===e&&hide(el_likeComment)):void(i||(show(el_likeEducate),
o&&o>0&&(el_friend_like.innerHTML="%s位朋友也在看,".replace("%s",o),document.getElementById("js_friend_like_word").innerText="前往“发现”-“看一看”浏览",
show(el_friend_like)),1===showType&&(hide(el_go_wow),hide(el_likeCommentShare)),
isBeenUnvisible(el_likeComment)&&scrollToShow(el_likeComment),educateExpose()));
},setBtnLike=function(){
el_like.setAttribute("like",1),Class.addClass(el_likeBtn,opt.className),realLikeNum+=1;
var e=el_likeNum.innerHTML;
"10万+"!==e&&(el_likeNum.innerHTML=formatReadNum(realLikeNum)),el_likeBtn.setAttribute("aria-describedby","js_a11y_like_btn_tips"),
renderProfile(["zaikan"]),hide(qs("js_like_wording"));
},setLike2Status=function(e,i,o,t){
var n="在看 ";
switch(showType){
case 1:
switch(prompted){
case 0:
showEducatePanel(e,i,o),show(el_likeComment),el_likeComment.focus(),prompted=1;
break;

case 1:
hide(el_likeEducate),showToast(n);
}
setBtnLike();
break;

case 2:
switch(hide(el_bcommentPanel2),4===e&&(el_bcommentPanel2Wrp.setAttribute("aria-hidden","true"),
el_likeCommentShare.focus(),!mmversion.isIPad&&mmversion.isWechat&&JSAPI.invoke("handleDeviceInfo",{
action:"setOrientation",
orientation:0,
lock:!1
},function(){})),clear(el_likeCommentText),prompted){
case 0:
showEducatePanel(e,i,o),5===e&&hide(el_likeCommentShare);
break;

case 1:
(4===e||5===e)&&showToast(4===e?"已发送":n);
}
5!==e&&(4===e&&"none"!==el_likeEducate.style.display?hide(el_likeCommentShare):4===e?hide(el_likeComment):1===t?1===prompted&&hide(el_likeEducate):(show(el_commentArea),
show(el_likeCommentShare),1===prompted&&hide(el_likeEducate),show(el_likeComment),
el_likeComment.focus(),isBeenUnvisible(el_likeComment)&&scrollToShow(el_likeComment))),
4!==e&&setBtnLike(),prompted=1;
}
enableMove(),commonUtils.isNativePage()&&JSAPI.invoke("handleHaokanAction",{
action:"closeComment"
}),log("[Appmsg] zaikan set like success");
},unsetLike2Status=function(e){
1===e?setTimeout(function(){
alert2(" 已取消，想法已同步删除");
},20):showToast("已取消"),2===showType&&isShow(el_likeComment)&&hide(el_likeComment);
var i=el_likeNum.innerHTML;
Class.removeClass(el_likeBtn,opt.className),el_like.setAttribute("like",0),el_likeComment&&hide(el_likeComment),
realLikeNum-=1,realLikeNum>=0&&"10万+"!==i&&(el_likeNum.innerHTML=formatReadNum(realLikeNum)),
realLikeNum>0?hide(qs("js_like_wording")):show(qs("js_like_wording")),el_likeBtn.removeAttribute("aria-describedby"),
log("[Appmsg] zaikan set unlike success");
},sendRecommendAjax=function sendRecommendAjax(like,comment,type,clientType,isActionSheetFrom){
if(!haokanLock){
log("[Appmsg] prepare to send appmsg like request"),showLoading();
var appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
haokanLock=!0;
var action_type;
like?(window.isPaySubscribe&&payReportUtils.reportPayAppmsg(12),action_type=type):(window.isPaySubscribe&&payReportUtils.reportPayAppmsg(13),
action_type=2);
var searchClickId=/(?:\?|&)search_click_id=([^&]*)(?:&|$)/.exec(window.location.search);
ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
comment:comment?comment:"",
prompted:1,
style:clientType||showType,
action_type:action_type,
passparam:window.passparam,
request_id:(new Date).getTime(),
device_type:window.devicetype,
exptype:window.exptype||"",
enterid:window.enterid||"",
sessionid:window.sessionid||"",
expsessionid:window.expsessionid||"",
search_click_id:searchClickId?searchClickId[1]:0
},
type:"POST",
success:function success(res){
haokanLock=!1;
var data=eval("("+res+")");
hideLoading(),log("[Appmsg] success send appmsglike like "+like+" return value is "+JSON.stringify(res)),
0==data.base_resp.ret?(like?(setLike2Status(type,data.is_eu_user,data.friend_like_num,isActionSheetFrom),
relatedArticles&&relatedArticles.render&&relatedArticles.render("like")):unsetLike2Status(data.has_comment),
connectWithApp(like,comment,clientType)):failAlert(comment);
},
error:function(){
hideLoading(),failAlert(),haokanLock=!1;
}
});
}
},showCommentPanel=function(){
var e=90===Math.abs(window.orientation);
return!mmversion.isIPad&&mmversion.isWechat&&JSAPI.invoke("handleDeviceInfo",{
action:"setOrientation",
orientation:0,
lock:!0
},function(i){
i.err_msg&&-1!==i.err_msg.indexOf("ok")&&e&&reportForceHorizontalbadJS(3);
}),commonUtils.isNativePage()?void JSAPI.invoke("handleHaokanAction",{
action:"writeComment",
style:"white"
}):(scrollTop=document.body.scrollTop||document.documentElement.scrollTop,1*window.item_show_type===10&&(el_panelLikeTitle.innerHTML=window.msg_title.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,"")),
show(el_bcommentPanel2),el_bcommentPanel2Wrp.setAttribute("aria-hidden","false"),
el_bcommentPanel2Wrp.focus(),el_likeCommentText.focus(),el_commentConfirm.setAttribute("disabled","disabled"),
disableMove(),void likeClickReport());
};
JSAPI.on("menu:haokan",function(e){
if(!(window.__video_need_fe_fullscreen__&&window.__video_fullscreen__&&commonUtils.supportImmersiveMode)){
if(window.is_temp_url)return void alert2("预览状态下无法操作");
var i=0===parseInt(e.recommend)?0:1;
if(0===i)sendRecommendAjax(i,"",2,clientShowType);else if(g.supportZaikanAutho)WeixinJSBridge.invoke("handleHaokanAction",{
action:"checkSyncHaoKanPermission"
},function(e){
var i=e.result;
0!==i&&(sendRecommendAjax(1,"",1,void 0,1),show(el_likeComment),window.weui.dialog({
title:"已同步到看一看",
content:'<span class="icon_like_logo"></span>',
className:"like_auth_dialog",
buttons:[{
label:"写下你的评论",
type:"primary",
onClick:function(){
WeixinJSBridge.invoke("handleHaokanAction",{
action:"checkSyncCommentPermission"
},function(e){
var i=e.result;
0!==i&&showCommentPanel();
});
}
},{
label:"关闭",
type:"primary",
onClick:function(){}
}],
isAndroid:!1
}));
});else{
var o="";
o=e.comment;
var t=1===e.scene?4:5;
sendRecommendAjax(i,o,t,clientShowType);
}
}
});
var connectWithApp=function(e,i){
var o={
origin:"mp",
isLike:e?1:0,
url:encodeURIComponent(msg_link.html(!1)),
content:i?i:""
};
JSAPI.invoke("handleHaokanAction",{
action:actionString,
recommend:e?1:0,
server_data:JSON.stringify(o)
},function(e){
console.log("handleHaokanAction",e);
}),JSAPI.invoke("handleHaokanAction",{
action:actionForClient,
permission:1,
recommend:e?1:0
},function(e){
console.log("handleHaokanAction for client",e);
}),window.__article_liked__=e;
},goWoW=function(){
jumpWowLock||(jumpToWowClickReport(),jumpWowLock=!0,JSAPI.invoke("handleHaokanAction",{
action:"jumpToWow",
extParams:JSON.stringify({
autoDropLoad:!0
})
},function(e){
jumpWowLock=!1,console.log("jumpToWow",e),e.err_msg&&"handleHaokanAction:fail_entrance_not_open"===e.err_msg?show(el_wowClosePanel):"handleHaokanAction:fail  action not support"===e.err_msg||"handleHaokanAction:fail, action not support"===e.err_msg?alert2("微信版本过低，暂不支持该操作"):"handleHaokanAction:ok"===e.err_msg&&hide(el_likeComment),
JSAPI.invoke("handleHaokanAction",{
action:actionString,
server_data:JSON.stringify({
origin:"mp",
autoDropLoad:!0
})
},function(e){
console.log("sendAutoDropLoad",e);
});
}));
},likeClickReport=function(){
ajax({
url:"/mp/appmsgreport?action=appmsglikeclickcomment&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
});
},likeExpose=function e(){
var i=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,o=qs("like3").offsetTop,t=opt.appmsgid||opt.mid,n=opt.itemidx||opt.idx;
i+commonUtils.getInnerHeight()>o&&o>=i&&(ajax({
url:"/mp/appmsgreport?action=appmsglikeexposure&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+t+"&itemidx="+n,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
}),DomEvent.off(window,"scroll",e));
},educateExpose=function i(){
var e=(document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,
opt.appmsgid||opt.mid),o=opt.itemidx||opt.idx,t=window.item_show_type,n=window.enterid||window.cgiData&&window.cgiData.enterid||"";
el_likeEducate&&"none"!=el_likeEducate.style.display&&commonUtils.getInnerHeight()>el_likeEducate.getBoundingClientRect().top&&el_likeEducate.getBoundingClientRect().top+el_likeEducate.getBoundingClientRect().height>0&&(ajax({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:18266,
buffer:["",Base64.decode(opt.biz),e,o,window.source,window.subscene,1,t,sessionid,n]
},
async:!1,
timeout:2e3
}),DomEvent.off(window,"scroll",i));
},jumpToWowClickReport=function(){
var e=opt.appmsgid||opt.mid,i=opt.itemidx||opt.idx,o=window.enterid||window.cgiData&&window.cgiData.enterid||"";
ajax({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:18266,
buffer:["",Base64.decode(opt.biz),e,i,window.source,window.subscene,2,window.item_show_type,sessionid,o]
},
async:!1,
timeout:2e3
});
};
DomEvent.on(el_alertConfirm,"click",function(){
el_alertPanel.style.display="none";
}),DomEvent.on(el_like,"click",function(e){
if(el_likeBtn.disabled!==!0){
if(window.is_temp_url)return void alert2("预览状态下无法操作");
var i=el_like.getBoundingClientRect();
if(log("[Appmsg zaikan location] top: "+i.top+" left: "+i.left+" bottom: "+i.bottom+" right: "+i.right),
log("[Appmsg zaikan click] clientX: "+e.clientX+" clientY: "+e.clientY),e.currentTarget.classList.contains("js_disabled"))return!1;
like_report(e),e.preventDefault();
}
}),DomEvent.on(el_wowCloseAck,"click",function(){
hide(el_wowClosePanel);
}),DomEvent.on(qs("js_mask_2"),"mousedown",function(){
hide(el_bcommentPanel2),el_bcommentPanel2Wrp.setAttribute("aria-hidden","true"),
el_likeCommentShare.focus(),!mmversion.isIPad&&mmversion.isWechat&&JSAPI.invoke("handleDeviceInfo",{
action:"setOrientation",
orientation:0,
lock:!1
},function(){}),clear(el_likeCommentText),vHide(el_commentErrorMsg),enableMove();
}),DomEvent.on(el_commentConfirm,"mousedown",function(){
validataComment(el_likeCommentText,4);
}),DomEvent.on(el_commentCancel,"mousedown",function(){
hide(el_bcommentPanel2),el_bcommentPanel2Wrp.setAttribute("aria-hidden","true"),
el_likeCommentShare.focus(),!mmversion.isIPad&&mmversion.isWechat&&JSAPI.invoke("handleDeviceInfo",{
action:"setOrientation",
orientation:0,
lock:!1
},function(){}),clear(el_likeCommentText),vHide(el_commentErrorMsg),enableMove();
}),DomEvent.on(el_likeCommentShare,"click",function(){
g.supportZaikanAutho?WeixinJSBridge.invoke("handleHaokanAction",{
action:"checkSyncCommentPermission"
},function(e){
var i=e.result;
0!==i&&showCommentPanel();
}):showCommentPanel();
}),DomEvent.on(el_likeCommentText,"focus",function(){}),DomEvent.on(el_likeCommentText,"blur",function(){
window.scrollTo(0,scrollTop);
}),DomEvent.on(window,"scroll",likeExpose),DomEvent.on(window,"scroll",educateExpose),
DomEvent.on(el_go_wow,"click",goWoW);
var scrollToShow=function(e){
e.scrollIntoView(!1);
};
DomEvent.on(el_likeCommentText,"input",function(e){
var i=el_likeCommentText.value.replace(/^\s+|\s+$/g,"");
i.length>maxLikeCommentWord?(el_commentCurrentCount.innerHTML=i.length,vShow(el_commentErrorMsg)):vHide(el_commentErrorMsg),
i.length>0&&i.length<=maxLikeCommentWord?el_commentConfirm.removeAttribute("disabled"):el_commentConfirm.setAttribute("disabled","disabled"),
Device.os.ios&&e.data&&doubleInputChar.indexOf(e.data)>-1&&(focusTag=!0);
}),DomEvent.on(el_likeCommentText,"click",function(){
Device.os.ios&&focusTag&&(el_likeCommentText.blur(),el_likeCommentText.focus(),focusTag=!1);
});
}
}
function showLikeNum(e){
var i=e||{};
if(i.show){
var o=i.likeAreaDom,t=i.likeNumDom,n=document.getElementById("js_like_btn");
o&&(o.style.display=i.likeAreaDisplayValue,o.style.visibility="",i.liked&&(1===appmsg_like_type?Class.addClass(o,i.className):Class.addClass(n,i.className)),
o.setAttribute("like",i.liked?"1":"0"),i.liked&&n.setAttribute("aria-describedby","js_a11y_like_btn_tips"),
i.likeGray&&(n.disabled=!0));
var s=1===appmsg_like_type?"赞":"";
realLikeNum=i.likeNum||s,1===appmsg_like_type?(parseInt(realLikeNum)>1e5?realLikeNum="100000+":"",
t&&(t.innerHTML=realLikeNum)):2===appmsg_like_type&&(t.innerHTML=formatReadNum(realLikeNum),
qs("js_like_wording").style.display=realLikeNum>0?"none":"block");
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),Base64=require("biz_common/base64.js"),jsmonitorReport=require("biz_wap/utils/jsmonitor_report.js"),log=require("appmsg/log.js"),Tips=require("complain/tips.js"),RetryAjax=require("appmsg/retry_ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),actionString="submitMsgToTL",actionForClient="update_recommend_status",mmversion=require("biz_wap/utils/mmversion.js"),commonUtils=require("common/utils.js"),Loading=require("appmsg/loading.js"),_require=require("appmsg/like_and_share.js"),renderProfile=_require.renderProfile,realLikeNum,clientShowType=5,Device=require("biz_wap/utils/device.js"),payReportUtils=require("appmsg/pay_report_utils.js"),_require2=require("pages/utils.js"),formatReadNum=_require2.formatReadNum,relatedArticles=require("appmsg/related_article.js"),_require3=require("appmsg/rec_report_key.js"),RecActionType=_require3.RecActionType,reportRecAction=_require3.reportRecAction,maxLikeCommentWord=200,focusTag=!1,doubleInputChar=["“”","‘’","（）","《》","〈〉","「」","『』","〔〕","【】","［］","[]","｛｝","{}","()","<>"],g={
supportZaikanAutho:(Device.os.iphone||Device.os.ipad)&&mmversion.isWechat&&mmversion.gtVersion("8.0.18",1)||Device.os.android&&mmversion.isWechat&&mmversion.gtVersion("8.0.19",1)
};
return{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum
};
});define("appmsg/read.js",["pages/utils.js","biz_wap/utils/device.js"],function(e){
"use strict";
function i(e){
var i=e||{},n=1586325600,d="undefined"!=typeof window.ct?parseInt(window.ct,10):0;
if(i.show){
var s=i.readAreaDom,o=i.readNumDom;
s&&(s.style.display=i.readAreaDisplayValue);
var r=i.readNum||1,w=window.ori_send_time||window.cgiData&&window.cgiData.ori_send_time||0,p=/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),m=1566025200,u=1565971200,_=a.os.ios||p?m:u;
parseInt(w,10)>_&&window.item_show_type&&"5"===window.item_show_type&&(n>d?("en"!==window.LANG&&(document.getElementById("readTxt").innerText="播放"),
r=i.videouv||0):("en"!==window.LANG&&(document.getElementById("readTxt").innerText="观看"),
r=i.readNum||0)),1===window.appmsg_like_type?(parseInt(r,10)>1e5?r="100000+":"",
o&&(o.innerHTML=r)):2===window.appmsg_like_type&&(o.innerHTML=t(r),""===o.innerHTML&&(o.innerHTML="0"));
}
}
var n=e("pages/utils.js"),t=n.formatReadNum,a=e("biz_wap/utils/device.js");
return{
showReadNum:i
};
});define("pages_new/modules/utils/event_bus.js",[],function(){
"use strict";
function n(n,e){
delete i[n],e&&delete o[n];
}
function e(n,e,t){
"function"==typeof e&&(t?(o[n]||(o[n]=[]),o[n].push(e)):(i[n]||(i[n]=[]),i[n].push(e)));
}
function t(e){
for(var t=arguments.length,f=Array(t>1?t-1:0),u=1;t>u;u++)f[u-1]=arguments[u];
o[e]&&o[e].forEach(function(n){
"function"==typeof n&&n.apply(void 0,f);
}),i[e]&&(i[e].forEach(function(n){
"function"==typeof n&&n.apply(void 0,f);
}),n(e));
}
function f(n,e,t){
if("function"==typeof e)if(t&&o[n]){
var f=o[n].indexOf(e);
-1!==f&&o[n].splice(f,1);
}else if(i[n]){
var f=i[n].indexOf(e);
-1!==f&&i[n].splice(f,1);
}
}
var i={},o={};
return{
on:e,
emit:t,
remove:f,
clean:n
};
});define("appmsg/share_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <a href="<#= url #>" class="share_appmsg_container appmsg_card_context flex_context">\n        <div class="flex_hd">\n            <i class="share_appmsg_icon"> </i>\n        </div>\n        <div class="flex_bd">\n            <div class="share_appmsg_title">分享给订阅用户</div>\n            <p class="share_appmsg_desc">可快速分享原创文章给你的公众号订阅用户</p>\n        </div>\n    </a>\n</div>\n';
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js","biz_common/utils/wxgspeedsdk.js","biz_common/utils/url/parse.js"],function(e){
"use strict";
function i(e){
var i={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
album_id:"",
idx:"",
scene:"",
title:"",
ct:"",
abtest_cookie:"",
devicetype:"",
version:"",
is_need_ticket:0,
is_need_ad:0,
comment_id:"",
is_need_reward:0,
both_ad:0,
reward_uin_count:0,
send_time:"",
msg_daily_idx:"",
is_original:0,
is_only_read:0,
req_id:"",
pass_ticket:"",
is_temp_url:0,
more_read_type:0,
rtId:"",
rtKey:"",
appmsg_like_type:1,
related_video_sn:"",
vid:"",
is_pay_subscribe:0,
pay_subscribe_uin_count:0,
has_red_packet_cover:0,
related_video_num:e.related_video_source%10?10:5,
album_video_num:5,
onSuccess:function(){},
onError:function(){}
};
for(var d in e)e.hasOwnProperty(d)&&(i[d]=e[d]);
console.info("[(评论、点赞、赞赏) 发送请求]: ",new Date),_({
url:"/mp/getappmsgext?f=json&mock="+n.getQuery("mock"),
data:{
r:Math.random(),
__biz:i.biz,
appmsg_type:i.appmsg_type,
mid:i.mid,
sn:i.sn,
idx:i.idx,
scene:i.scene,
title:encodeURIComponent(i.title.htmlDecode()),
ct:i.ct,
abtest_cookie:i.abtest_cookie,
devicetype:i.devicetype.htmlDecode(),
version:i.version.htmlDecode(),
is_need_ticket:i.is_need_ticket,
is_need_ad:i.is_need_ad,
comment_id:i.comment_id,
is_need_reward:i.is_need_reward,
both_ad:i.both_ad,
reward_uin_count:i.is_need_reward?i.reward_uin_count:0,
send_time:i.send_time,
msg_daily_idx:i.msg_daily_idx,
is_original:i.is_original,
is_only_read:i.is_only_read,
req_id:i.req_id,
pass_ticket:i.pass_ticket,
is_temp_url:i.is_temp_url,
item_show_type:i.item_show_type,
tmp_version:1,
more_read_type:i.more_read_type,
appmsg_like_type:i.appmsg_like_type,
related_video_sn:i.related_video_sn,
related_video_num:i.related_video_num,
vid:i.vid,
is_pay_subscribe:i.is_pay_subscribe,
pay_subscribe_uin_count:i.pay_subscribe_uin_count,
has_red_packet_cover:i.has_red_packet_cover,
album_id:0x11fd1c7c75070000,
album_video_num:i.album_video_num,
cur_album_id:window.appmsg_album_info?window.appmsg_album_info.id:"",
is_public_related_video:i.related_video_source%10,
encode_info_by_base64:i.encodeInfoByBase64,
exptype:window.exptype||""
},
type:"POST",
dataType:"json",
rtId:i.rtId,
rtKey:i.rtKey,
rtDesc:t,
async:!0,
success:function(e){
if(console.info("[(评论、点赞、赞赏) 响应请求]: ",new Date,e),s("[Appmsg] success get async data"),
"function"==typeof i.onSuccess&&i.onSuccess(e),e)try{
s("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(_){}else s("[Appmsg] success get async data, async data is empty");
if(!o&&"5"===window.item_show_type){
var t=Date.now()-window.logs.pagetime.page_begin;
if(o=!0,Math.random()>.1)return;
a.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:29,
time:t
}]
}),a.send();
}
},
error:function(){
s("[Appmsg] error get async data, biz="+i.biz+", mid="+i.mid),"function"==typeof i.onError&&i.onError();
},
complete:function(){
"function"==typeof i.onComplete&&i.onComplete();
}
});
}
var s=e("appmsg/log.js"),_=e("biz_wap/utils/ajax.js"),t=e("rt/appmsg/getappmsgext.rt.js"),a=e("biz_common/utils/wxgspeedsdk.js"),n=e("biz_common/utils/url/parse.js"),o=void 0;
return{
getData:i
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("pages/video_ctrl.js",[],function(){
"use strict";
function i(i){
i=i||window;
var n=i.cgiData;
return n&&2==n.ori_status&&1==n.is_mp_video&&(n.nick_name||n.hit_username)?!0:!1;
}
function n(i){
return i=i||window,!1;
}
function t(){
return!1;
}
function e(){
return-1!=w.indexOf("&dd=1")?!1:"54"==r.appmsg_type?!1:!0;
}
function o(){
var i;
if(parent==window)i=window;else try{
{
r.__videoDefaultRatio;
}
i=r;
}catch(n){
i=window;
}
var t=i.__videoDefaultRatio||16/9;
return"54"==i.appmsg_type?t:t;
}
var r=window.withoutIframe?window:window.parent.window,w=window.location.href;
return{
showPauseTips:e,
showVideoLike:t,
showVideoDetail:n,
showReprint:i,
getRatio:o
};
});define("pages/create_txv.js",["biz_wap/utils/jsmonitor_report.js","biz_wap/utils/ajax_load_js.js","pages/loadscript.js"],function(e){
"use strict";
function o(){
"function"!=typeof window.__createTxVideo&&(window.__createTxVideo=function(e){
n(e);
});
}
function n(e){
var o=function(){},n=function(){};
"function"==typeof e.onSuccess&&(n=e.onSuccess),"function"==typeof e.onError&&(o=e.onError),
r.Load({
url:a.jsUrl,
version:a.jsVersion,
useCache:!0,
win:e.win,
onSuccess:function(s){
2!=s.code&&3!=s.code||0!=s.queueIndex||(i.setSum("64728","111",1),i.setSum("64728","112",1));
var u=e.win||window,c=!0;
if(u.Txp&&"function"==typeof u.Txp.Player?(c=!0,0==s.queueIndex&&(2==s.code?i.setSum("64728","116",1):3==s.code&&i.setSum("64728","117",1))):(c=!1,
0==s.queueIndex&&(2==s.code?i.setSum("64728","114",1):3==s.code&&i.setSum("64728","115",1))),
c){
var d=t({
win:u,
options:e
});
n({
player:d
});
}else r.ClearCache({
win:u,
version:a.jsVersion,
url:a.jsUrl
}),o();
},
onError:function(o){
0==o.queueIndex&&(i.setSum("64728","111",1),i.setSum("64728","118",1),51==o.code?i.setSum("64728","119",1):52==o.code?i.setSum("64728","120",1):53==o.code&&i.setSum("64728","121",1)),
s(e);
}
});
}
function t(e){
var o=e.win||window,n=e.options,t=new o.Txp.Player({
containerId:n.containerId,
vid:n.vid,
width:n.width,
height:n.height,
autoplay:n.autoplay===!0?!0:!1,
allowFullScreen:n.allowFullScreen===!0?!0:!1,
chid:17
});
return t;
}
function s(e){
var o=function(){},n=function(){};
"function"==typeof e.onSuccess&&(n=e.onSuccess),"function"==typeof e.onError&&(o=e.onError);
var s=a.jsUrl;
s+=-1==s.indexOf("?")?"?"+a.customerParam+"="+a.jsVersion:"&"+a.customerParam+"="+a.jsVersion,
u({
win:e.win,
url:s,
timeout:1e4,
type:"JS",
callback:function(){
i.setSum("64728","122",1);
var s=e.win||window;
if(s.Txp&&"function"==typeof s.Txp.Player){
i.setSum("64728","124",1);
var r=t({
win:e.win,
options:e
});
n({
player:r
});
}else i.setSum("64728","123",1),o();
},
onerror:function(e){
switch(i.setSum("64728","122",1),1*e){
case 400:
a.jsLoadState=4,i.setSum("64728","125",1);
break;

case 500:
a.jsLoadState=5,i.setSum("64728","126",1);
break;

default:
a.jsLoadState=6,i.setSum("64728","127",1);
}
o();
}
});
}
var i=e("biz_wap/utils/jsmonitor_report.js"),r=e("biz_wap/utils/ajax_load_js.js"),u=e("pages/loadscript.js"),a={
customerParam:"wxv",
jsUrl:"//vm.gtimg.cn/tencentvideo/txp/js/iframe/api.js?",
jsVersion:"v1"
};
return{
createTxVideo:n,
createGlobalFunc:o
};
});define("appmsg/pay_read/pay_read_utils.js",["biz_wap/ui/weui.js","biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","appmsg/pay_report_utils.js","common/utils.js","pages/utils.js"],function(e){
"use strict";
e("biz_wap/ui/weui.js");
var i=e("biz_wap/jsapi/core.js"),t=e("biz_common/dom/event.js"),n=e("biz_common/dom/class.js"),o=e("biz_wap/utils/mmversion.js"),a=e("biz_wap/utils/device.js"),r=e("appmsg/pay_report_utils.js"),s=e("common/utils.js"),d=e("pages/utils.js"),w=function(e){
var i=arguments.length<=1||void 0===arguments[1]?document:arguments[1];
return i.querySelector(e);
},c=window.payFreeGift,p=function(){
for(var e=Object.create(null),i=1;6>i;i++)e[i]=s.once(r.reportSend.bind(null,i));
return function(i){
return e[i]();
};
}(),f=document.documentElement&&document.documentElement.clientWidth||window.innerWidth;
try{
var u=w("#img-content");
if(u){
var _=u.getBoundingClientRect();
_.width&&(f=_.width);
}
}catch(l){
console.error(l);
}
var m=32,g=8,y='<div class="pay__tag-reward js_reward"></div>',h={
dom:{
payFee:[w("#js_pay_panel .js_pay_fee"),w("#js_pay_panel_bottom .js_pay_fee")],
wrap:w("#js_pay_wall_wrap"),
payNum:w("#js_pay_num"),
rewardNumWrap:w("#js_pay_reward_num_wrap"),
rewardNum:w("#js_pay_reward_num"),
wall:w("#js_pay_wall"),
sendTips:w("#js_pay_preview_tips"),
wecoinTips:w("#js_pay_wecoin_tips"),
giftBar:w("#js_pay_gift_bar"),
giftBarTitle:w("#js_pay_gift_bar_title"),
sendGift:w("#js_send_pay_gift"),
bottomBarWecoinTips:w("#js_pay_panel_bottom_wecoin_tips")
},
perLine:null,
data:{}
},v=function(e){
e&&(/^http/.test(e)||(e=location.protocol+"//"+location.host+e),e.indexOf("#")<0&&(e+="#wechat_redirect"),
-1!==navigator.userAgent.indexOf("MicroMessenger")&&(o.isIOS||o.isAndroid||o.isWp)?i.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(i){
-1===i.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e);
},b=function(){
var e=h.dom,i=h.data,t=parseInt(i.pay_cnt,10);
e.payNum.innerHTML=t>=1e4||i.is_pay_cnt_cut?"en"===window.LANG?"10k+":"1万+":t+"",
i.rewardTotal?(e.rewardNum.innerHTML=i.rewardTotal+(i.rewardTotalCut?"+":""),e.rewardNumWrap.style.display=""):e.rewardNumWrap.style.display="none";
for(var n=3*h.perLine,o="",a=0,r=i.pay_head_imgs.length;r>a;a++){
var s=i.reward_status_list?i.reward_status_list[a]:0;
if(o+='<div class="pay__avatar-wrp"><img alt="" src="'+i.pay_head_imgs[a]+'">'+(s?y:"")+"</div>",
a>=n-1)break;
}
e.wall.innerHTML=o;
},j=function(){
var e=h.dom;
t.tap(e.payNum,function(){
v("/mp/paysub?action=evaluate_show_page&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&link="+encodeURIComponent(window.msg_link)+"&from_scene="+window.source+"&from_subscene="+window.subscene+"&is_fans="+window.isFans);
}),t.tap(e.rewardNum,function(){
var e=(Math.ceil((s.getInnerHeight()-188)/42)+1)*Math.floor((f-15)/42);
v("/mp/reward?act=getrewardheads&__biz="+window.biz+"&appmsgid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&offset=0&count="+e+"&source=1");
}),t.tap(e.sendGift,function(){
if(a.os.iphone||a.os.ipad||a.os.android){
var i=h.data.gift_url.html(),t="",o=i.indexOf("#");
-1!==o&&(t=i.substring(o),i=i.substring(0,o)),p(n.hasClass(e.giftBar,"pay__gift-send_static")?5:3),
v(i+"&sessionid="+window.sessionid+"&enterid="+window.enterid+"&scene="+window.source+"&subscene="+window.subscene+"&biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+t);
}else window.weui.alert("请使用移动端微信打开");
});
},B=function(e,i,a){
if(window.isPaySubscribe){
var s=h.dom;
if(e=JSON.parse(JSON.stringify(e)),window.can_use_wecoin?window.isPaid||(e.wecoin_amount?s.payFee.forEach(function(i){
i.innerHTML=""+e.wecoin_amount,i.parentNode.parentNode.dataset.ready=1;
}):e.fee&&s.payFee.forEach(function(i){
i.innerHTML=""+e.fee/10,i.parentNode.dataset.ready=1;
})):(!e.fee||window.isPaid||window.IAPProductInfo||!function(){
var i=Math.floor(e.fee/100);
s.payFee.forEach(function(e){
!window.iapPriceInfo.currency_symbol&&(e.innerHTML="￥"+i+".00"),e.parentNode.dataset.ready=1;
});
}(),o.isIOS&&e.fee&&(window.IAPProductInfo?("CNY"!==window.IAPProductInfo.currencyCode&&r.report110809(40),
r.reportOverseaPay(window.IAPProductInfo.currencyCode,100*window.IAPProductInfo.price.toFixed(2),1,window.IAPProductInfo.invokeTime,window.IAPProductInfo.countryCode,0,window.IAPProductInfo.err_msg+(window.IAPProductInfo.err_desc?"__"+window.IAPProductInfo.err_desc:""))):window.oriProductFee=Math.floor(e.fee/100))),
e.pay_cnt){
if(e.is_paid&&!c){
e.pay_head_imgs.unshift(e.my_head_img),e.reward_status_list instanceof Array?e.reward_status_list.unshift(e.my_reward_status):e.reward_status_list=[e.my_reward_status];
var w=3*h.perLine;
e.pay_head_imgs.length>w&&(e.pay_head_imgs=e.pay_head_imgs.slice(0,w));
}
e.rewardTotal=i.rewardTotal,e.rewardTotalCut=i.rewardTotalCut,h.data=e,s.wrap.style.height="",
s.wrap.style.marginTop="",s.wrap.style.visibility="visible",b(),!a&&j();
}else s.wrap.style.display="none";
if(s.giftBar)if(window.payGiftsCount-e.gifted_count>0&&!c){
s.giftBar.style.display="";
var f=window.localStorage.getItem("paySuc"),u=h.dom.giftBar.getBoundingClientRect(),_=u.top;
"1"===f&&_>window.innerHeight?!function(){
window.localStorage.setItem("paySuc","0"),h.dom.giftBar.className="pay__gift-send show",
h.dom.giftBarTitle.innerText="已购买，可赠送给一位朋友",p(2);
var e=8+window.parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--sab")),i=0,o=0,a=!1,r=0,s=function(e){
n.hasClass(h.dom.giftBar,"show")&&(a=!0,r=e.touches[0].clientY,i=o);
},d=function(t){
t.preventDefault();
var s=t.touches[0].clientY,d=s-r;
n.hasClass(h.dom.giftBar,"show")&&a&&(d+i>=0&&e>=d+i?(h.dom.giftBar.style.transform="translate3d(0, "+(d+i)+"px, 0)",
o=d+i):d+i>e?(h.dom.giftBar.style.transform="translate3d(0, "+e+"px, 0)",o=e):0>d+i&&(h.dom.giftBar.style.transform="translate3d(0, 0, 0)",
o=0));
},w=function _(){
a=!1,n.hasClass(h.dom.giftBar,"show")&&o===e&&(h.dom.giftBar.className="pay__gift-send",
t.off(h.dom.giftBar,"touchstart",s),t.off(h.dom.giftBar,"touchmove",d),t.off(h.dom.giftBar,"touchend",_));
},c=window.scrollY,f=window.innerHeight/3,u=function l(){
var e=h.dom.wrap.getBoundingClientRect(),i=e.top+e.height-48;
i<=window.innerHeight?(h.dom.giftBarTitle.innerText="可赠送给一位朋友免费阅读",h.dom.giftBar.className="pay__gift-send pay__gift-send_static",
h.dom.giftBar.style.transform="translate3d(0, 0, 0)",t.off(h.dom.giftBar,"touchstart",s),
t.off(h.dom.giftBar,"touchmove",d),t.off(h.dom.giftBar,"touchend",w),t.off(window,"scroll",l),
p(4)):window.scrollY-c>f&&(h.dom.giftBar.className="pay__gift-send");
};
t.on(window,"scroll",u),t.on(h.dom.giftBar,"touchstart",s),t.on(h.dom.giftBar,"touchmove",d),
t.on(h.dom.giftBar,"touchend",w);
}():!n.hasClass(h.dom.giftBar,"show")&&_<=window.innerHeight&&(h.dom.giftBar.className="pay__gift-send pay__gift-send_static",
p(4));
}else s.giftBar.style.display="none";
s.sendTips&&!function(){
var e=function i(){
return d.checkExposedStatus(s.sendTips)?(console.log("report send tips."),p(1),t.off(window,"scroll",i),
!0):!1;
};
e()||t.on(window,"scroll",e),s.sendTips.innerHTML=window.can_use_wecoin?"付费后可赠送给一位朋友免费阅读 (1元 = "+(o.isIOS?7:10)+"微信豆)":"付费后可赠送给一位朋友免费阅读";
}();
var l="1元 = "+(o.isIOS?7:10)+"微信豆";
s.wecoinTips&&(s.wecoinTips.innerHTML=l),s.bottomBarWecoinTips&&(s.bottomBarWecoinTips.innerHTML=l);
}
},T=function(){
if(!window.isPaySubscribe)return 0;
if(null===h.perLine){
var e=m+g;
h.perLine=Math.floor(.8*f/e),h.dom.wall.parentNode.style.width=h.perLine*e-g+"px";
}
return h.perLine;
};
return{
init:B,
getCountPerLine:T
};
});define("appmsg/reward_utils.js",["biz_wap/ui/weui.js","appmsg/reward_entry.js","biz_wap/utils/mmversion.js","biz_common/dom/class.js","biz_common/dom/event.js","appmsg/set_font_size.js"],function(e){
"use strict";
e("biz_wap/ui/weui.js");
var r=e("appmsg/reward_entry.js"),n=e("biz_wap/utils/mmversion.js"),i=e("biz_common/dom/class.js"),a=e("biz_common/dom/event.js"),t=e("appmsg/set_font_size.js"),d=window.navigator.userAgent,s={
perLine:0,
hasBindResize:!1,
hasInit:!1,
pageContainerId:"img-content",
rewardInnerId:"js_reward_inner"
},o=function(e){
return document.getElementById(e);
},_=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.pageContainerId||s.pageContainerId,n=e.rewardInnerId||s.rewardInnerId,i=window.innerWidth||document.documentElement.clientWidth;
try{
var a=o(r).getBoundingClientRect();
a.width&&(i=a.width);
}catch(t){}
var d=36;
s.perLine=Math.floor(.8*i/d);
var _=o(n);
return _&&(_.style.width=s.perLine*d+"px"),s.perLine;
},w=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=e.pageContainerId||s.pageContainerId,d=e.rewardInnerId||s.rewardInnerId;
return e.can_reward&&o(i)&&o(d)?(s.hasBindResize||!function(){
s.hasBindResize=!0;
var i=window.innerWidth;
a.on(window,"resize",function(){
window.innerWidth!==i&&(i=window.innerWidth,_(e),s.hasInit&&r.render(s.perLine));
}),n.isWindows&&t.onFontScaleChange(_);
}(),s.perLine||_(e),s.perLine):0;
},m=function(e,t){
s.hasInit=!0;
var _=e.author_id||window.author_id;
e.reward_head_imgs=e.reward_head_imgs||[];
var m=o("js_author_name");
if(t.reward_entrance_enable_for_preview)if(n.isInMiniProgram)n.isInMiniProgram&&m&&i.removeClass(m,"rich_media_meta_link");else{
if(_||n.isAndroid){
var u=o("js_preview_reward_author");
u&&(u.style.display="block");
var p=o("js_preview_reward_author_wording");
t.reward_wording&&p&&(p.innerText=t.reward_wording,p.style.display="block");
var h=o("js_preview_reward_author_link");
h&&(window.item_show_type&&1*window.item_show_type===5||a.on(h,"tap",function(e){
e.preventDefault(),window.weui.alert("预览状态下无法操作");
}));
}
if(_){
var l=o("js_preview_reward_author_avatar"),c=o("js_preview_reward_author_head");
t.reward_author_head&&l&&c&&(c.setAttribute("src",t.reward_author_head),l.style.display="block");
var g=o("js_preview_reward_link_text");
g&&(g.innerText="喜欢作者");
}else n.isAndroid&&(o("js_preview_reward_author_name").style.display="none");
}else!n.isInMiniProgram&&(d.indexOf("WindowsWechat")>-1||n.isIOS||n.isAndroid)?(r.handle(e,w({
pageContainerId:t.pageContainerId,
rewardInnerId:t.rewardInnerId,
can_reward:1==e.can_reward?!0:!1
})),m&&e.rewardsn&&e.timestamp&&(m.setAttribute("data-rewardsn",e.rewardsn),m.setAttribute("data-timestamp",e.timestamp),
m.setAttribute("data-canreward",e.can_reward)),m&&!e.can_reward&&i.removeClass(m,"rich_media_meta_link")):m&&i.removeClass(m,"rich_media_meta_link");
};
return{
init:m,
getCountPerLine:w
};
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("appmsg/share_biz.js",[],function(){
"use strict";
var e=[2390745668,3099420829,3872121626,3203738065,3072206507,3566970574,3002803029,3099387730,3559965496,3525314097,2390323860,3084276724,3289028514,3003793452,3003972371,2398512110,3071748654,3233018348,3095049467,3076061592,3273032305,3264278949,3086344434,3014829842,3294546013,2058310401,2397841479,2397640820,3282179238,3072107639,3521076442,3554888231,2397274880,2394106525,3077726226,2103095721,3593723769,2395186785,2393698643,3944000110,2397445840,2394144447,3082139483,3070806332,3016714421,3006879186,3213574124,3221398587,3078448935,3591999034,3551390431];
return{
shareBizTest:e
};
});define("appmsg/malicious_wording.js",[],function(){
"use strict";
var i={
0:{
90041:"此标题包含夸大误导信息",
20012:"此标题包含低俗恶俗内容"
},
1:{
90041:"",
20012:""
},
2:{
90041:"此文章包含夸大误导信息",
20012:"此文章包含低俗恶俗内容"
}
},s={
0:{
90041:"标题使用夸大、煽动、低俗等词语造成误导或引人不适",
20012:"标题使用低俗或恶俗词语造成不正当影响或引人不适"
},
1:{
90041:"摘要包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"摘要包含低俗或恶俗内容造成不正当影响或引人不适"
},
2:{
90041:"文章包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"文章包含低俗或恶俗内容造成不正当影响或引人不适"
}
};
return{
maliciousTitleMap:i,
maliciousDescMap:s
};
});