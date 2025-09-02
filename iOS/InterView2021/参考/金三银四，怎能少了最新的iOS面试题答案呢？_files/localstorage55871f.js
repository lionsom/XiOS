define("appmsg/getForbidConfig.js",[],function(){
"use strict";
return function(n){
window.getWXLongPressImageEventConfig=function(){
return n.isPaySubscribe?{
forbidForward:1
}:{
forbidForward:0
};
};
};
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);
}
return e;
};
define("appmsg/related_article.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","appmsg/related_article_tpl.html.js","appmsg/related_article_item.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","common/utils.js","biz_common/dom/class.js","biz_common/utils/url/parse.js","common/comm_report.js","appmsg/related_article_feedback.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","appmsg/set_font_size.js","biz_wap/utils/jsmonitor_report.js","pages/utils.js","pages/scrollY.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var t=e("biz_common/tmpl.js"),i=e("biz_wap/utils/ajax.js"),n=e("biz_wap/jsapi/core.js"),o=e("appmsg/related_article_tpl.html.js"),a=e("appmsg/related_article_item.html.js"),r=e("biz_wap/utils/openUrl.js"),s=e("biz_common/dom/event.js"),l=e("common/utils.js"),d=e("biz_common/dom/class.js"),c=e("biz_common/utils/url/parse.js"),m=e("common/comm_report.js"),u=e("appmsg/related_article_feedback.js"),p=e("biz_wap/utils/mmversion.js"),_=e("biz_wap/utils/device.js"),w=e("appmsg/set_font_size.js").setFontSize,g=e("biz_wap/utils/jsmonitor_report.js"),f=e("pages/utils.js"),h=f.getId,j=f.getByClass,b=f.qs,v=f.formatReadNum,y=f.getScrollTop,z=f.getDefaultFontSize,x=e("pages/scrollY.js"),T=l.getInnerHeight();
if(p.isMpapp)return null;
var R={
bottomOpr:h("js_bottom_opr_right"),
container:h("js_related_container")
};
if(null===R.container)return null;
var I=0,B=!1,C=null,O=null,E=!1,F=3,P=100*Math.random()<1;
P&&window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs.report("relatedArticleFlag","value:"+window.relatedArticleFlag,{
mid:"mmbizwap:related_monitor",
uin:window.user_uin
});
var S=_.os.ipad||!p.isIOS&&!p.isAndroid,A=0;
p.isIOS?A=1:p.isAndroid&&(A=2);
var W={
Bizuin_from:window.biz,
Msgid_from:window.parseInt(window.mid,10)||0,
Itemidx_from:window.parseInt(window.idx,10)||0,
Scene:window.parseInt(window.source,10)||0,
Subscene:window.parseInt(window.subscene,10)||0,
Sessionid:window.sessionid||"",
Enterid:window.parseInt(window.enterid,10)||0
},J=[{
name:"内容质量低",
value:1
},{
name:"不看此公众号",
value:2
}];
P&&window.WX_BJ_REPORT.BadJs.report("RELATED_ARTICLE_COUNT","count:"+F,{
mid:"mmbizwap:related_monitor",
uin:window.user_uin
});
var M=function(e){
var t=document.createElement("div");
return t.innerHTML=e,t.childNodes;
},k=function(){
null!==C&&(s.off(R.area,"transitionend",C),C=null);
};
C=function(e){
e.target===R.area&&"height"===e.propertyName&&(R.area.style.overflow="visible",k());
};
var L=function(e,t){
var i=document.querySelector(".js_related_title"),n=6.5,o=2.25,a=0;
if(i){
var r=i.getBoundingClientRect().height;
r>0&&(o=r/z());
}
return 0===e?(R.area.style.overflow="hidden",R.area.style.margin="0",k()):(R.area.style.margin="12px 0 0",
a=e*n+o),R.area.style.height=a+"em",E&&e&&C&&C({
target:R.area,
propertyName:"height"
}),t?(I||(I=R.placeholder?b("div",R.placeholder).getBoundingClientRect().height:b(".js_related_item",R.list).getBoundingClientRect().height),
e*I+b(".js_related_title",R.main).getBoundingClientRect().height):void 0;
},H=function(e){
null!==O?(clearTimeout(O),O=null,"function"==typeof e&&e(!0)):"function"==typeof e&&e(!1);
},N=function(){
var e=!1,t=[],n=function o(n){
e=!0,i({
url:"/mp/relatedarticle?action=expose",
type:"POST",
dataType:"json",
data:n,
complete:function(){
t.length?o(t.shift()):e=!1;
}
});
};
return function(i){
e?t.push(i):n(i);
};
}(),U=function(){
for(var e=j("js_related_item"),t=y(),i=[],o=0;o<e.length;o++){
var a=e[o];
1*a.dataset.hasreport!==1&&a.clientHeight+a.offsetTop>=t+a.clientHeight/2&&a.clientHeight+a.offsetTop<=t+a.clientHeight/2+l.getInnerHeight()&&!function(e,t){
var n=e.dataset,o=n.url;
n.hasreport=1,g.setSum(110809,21,1),m.report(18832,_extends({
Actiontype:1,
Type:1,
Bizuin:c.getQuery("__biz",o),
Msgid:window.parseInt(c.getQuery("mid",o),10)||0,
Itemidx:window.parseInt(c.getQuery("idx",o),10)||0,
Sendtimestamp:window.parseInt(n.time)||0,
Pos:t+1,
Recalltype:1*n.recalltype,
Mmversion:A,
Isreaded:1*n.isreaded,
ExpType:n.exptype,
ExtInfo:n.ext_info
},W)),N({
bizuin:n.bizuin,
mid:n.mid,
idx:n.idx
}),i.push({
item_show_type:n.item_show_type,
url:o
});
}(a,o);
}
i.length&&n.invoke("downloadPageDataForFastLoad",{
itemList:i
},function(e){
console.log("downloadPageDataForFastLoad",e);
});
},X=function(e){
return 1===window.show_related_article||e.indexOf(window.source)>-1||e.indexOf(window.subscene)>-1;
}(["157","169"]),Q=0,D=function(){
R.container.innerHTML="",s.off(window,"scroll",U);
},q=function(){
var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0],n=arguments.length<=1||void 0===arguments[1]?F:arguments[1],o=parseFloat(window.getComputedStyle(R.main).marginTop),r=function(e){
if(E)L(e);else{
var t=24,i=R.area.getBoundingClientRect().top,n=L(e,!0)+t+o,a=R.bottomOpr.getBoundingClientRect().top,r=i+n;
if(!(a>T||0>r)){
var s=i-t;
s>0&&T>r||x.start(0>s?{
distance:s,
duration:.5,
end:U
}:{
distance:r-T,
duration:.5,
end:U
});
}
}
O=null;
};
O=setTimeout(function(){
return r(3);
},500),i({
url:"/mp/relatedarticle?action=getlist&count="+n+"&begin="+e+"&article_url="+window.encodeURIComponent(location.href)+"&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&has_related_article_info="+window.hasRelatedArticleInfo+"&is_pay="+Q+"&is_from_recommand="+(X?1:0)+"&scene="+W.Scene+"&subscene="+W.Subscene,
type:"GET",
dataType:"json",
success:function(i){
i&&i.base_resp&&1*i.base_resp.ret===0&&i.list&&i.list.length?!function(){
var o=i.list.map(function(e){
return X&&(e.url=e.url.replace(/#wechat_redirect/,"&show_related_article=1$&")),
e.like_num_wording=e.old_like_num?v(e.old_like_num):"",e.read_num_wording=e.read_num?v(e.read_num):"",
e.pay_cnt_wording=e.pay_cnt?v(e.pay_cnt):"",e.ext_info=e.ext_info.html(!0),e;
});
P&&window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs.report("list.length","list.length:"+o.length,{
mid:"mmbizwap:related_monitor",
_info:{
relatedArticleFlag:window.relatedArticleFlag,
isPc:S
},
uin:window.user_uin
}),o.length!==n&&window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs.report("list is no match","list.length:"+o.length+"|count:"+n,{
mid:"mmbizwap:related_monitor",
_info:{
relatedArticleFlag:window.relatedArticleFlag,
list:o,
isPc:S
},
uin:window.user_uin
});
var s=document.createDocumentFragment();
Array.prototype.forEach.call(M(t.tmpl(a,{
list:o,
reason:J,
begin:e
})),function(e){
s.appendChild(e.cloneNode(!0));
}),R.list.appendChild(s),I=b("div",R.placeholder).getBoundingClientRect().height,
R.placeholder.parentNode.removeChild(R.placeholder),R.placeholder=null,H(function(e){
e?r(i.list.length):L(i.list.length);
}),R.list.style.opacity=1,U(),window.ipados13_font_scale&&w(R.list,window.ipados13_font_scale/100);
}():H(function(e){
!e&&L(0),D();
});
}
});
},V=function(){
s.on(R.list,"click",".js_related_item",function(e){
var t=e.delegatedTarget,i=t.dataset,o=i.url;
g.setSum(110809,23,1),m.report(18832,_extends({
Actiontype:2,
Type:1,
Bizuin:c.getQuery("__biz",o),
Msgid:window.parseInt(c.getQuery("mid",o),10)||0,
Itemidx:window.parseInt(c.getQuery("idx",o),10)||0,
Sendtimestamp:window.parseInt(i.time)||0,
Pos:(1*i.index||0)+1,
Recalltype:1*i.recalltype,
Isreaded:1*i.isreaded,
Mmversion:A,
ExpType:i.exptype,
ExtInfo:i.ext_info
},W)),p.isWechat&&!p.isMpapp?n.invoke("openWebViewUseFastLoad",{
url:o,
item_show_type:i.item_show_type,
scene:132,
openType:0
},function(e){
console.log("openWebViewUseFastLoad res: ",e),e&&e.err_msg&&-1===e.err_msg.indexOf("ok")&&r.openUrlWithExtraWebview(o);
}):location.href=o;
});
var e=null,t=null;
s.on(R.list,"touchstart",".js_related_item",function(i){
i.stopPropagation(),t=i.delegatedTarget,e=setTimeout(function(){
t&&d.addClass(t,"card_custom_active"),e=null;
},100);
},!1),s.on(R.list,"touchmove",".js_related_item",function(){
e?(clearTimeout(e),e=null):t&&d.removeClass(t,"card_custom_active");
},!1),s.on(R.list,"touchend",".js_related_item",function(i){
i.stopPropagation(),setTimeout(function(){
t&&d.removeClass(t,"card_custom_active"),t=null,e&&(clearTimeout(e),e=null);
},200);
},!1),s.on(window,"scroll",U),null!==C&&s.on(R.area,"transitionend",C),u.init({
container:R.list,
biz:window.biz,
mid:window.mid,
idx:window.idx,
dislikeCb:function(e){
e.parentNode.removeChild(e),L(R.list.children.length);
}
});
};
return{
isFromRecommend:X,
render:function(e,i){
if(!B&&1*window.item_show_type===0&&""!==window.item_show_type&&"industrynews"!==window.wwdistype){
if(E=i,!E){
var n=R.bottomOpr.getBoundingClientRect(),a=n.top,r=n.bottom;
if(a>T||0>r)return;
}
B=!0,Q="pay"===e?1:0,R.container.innerHTML=t.tmpl(o,{
type:e
}),R.area=b(".js_related_area",R.container),E&&(R.area.style.transition="none"),
R.main=b(".js_related_main",R.area),R.list=b(".js_related_list",R.main),R.placeholder=b(".js_related_placeholder",R.main),
V(),q();
}
}
};
});define("common/a11y/modal.js",[],function(){
"use strict";
var t="aria-modal",e="aria-hidden",r="data-"+e,i=document.body,u=[],n=function(t,e){
for(var r=t.parentElement,u=function(r){
r!==t&&e(r);
};r!==i;)Array.prototype.forEach.call(r.children,u),t=r,r=t.parentElement;
},a=new MutationObserver(function(i){
i.forEach(function(i){
var a=i.type,o=i.attributeName,b=i.target;
"attributes"===a&&o===e&&"true"===b.getAttribute(t)&&-1===u.indexOf(b)&&("false"===b.getAttribute(e)?n(b,function(t){
u.push(t);
var i=t.getAttribute(e);
null!==i&&t.setAttribute(r,i),t.setAttribute(e,"true");
}):(u.forEach(function(t){
var i=t.getAttribute(r);
null!==i?(t.setAttribute(e,i),t.removeAttribute(r)):t.removeAttribute(e);
}),setTimeout(function(){
u=[];
})));
});
});
a.observe(i,{
attributes:!0,
attributeFilter:[e],
subtree:!0
});
});function _defineProperty(e,n,t){
return n in e?Object.defineProperty(e,n,{
value:t,
enumerable:!0,
configurable:!0,
writable:!0
}):e[n]=t,e;
}
define("pages_new/appmsg/page_bottom.js",["pages_new/appmsg/page_bottom.html.js","pages_new/modules/comment/comment.js","pages_new/appmsg/store.js","pages_new/3rd/vue.js"],function(e){
"use strict";
var n=e("pages_new/appmsg/page_bottom.html.js"),t=e("pages_new/modules/comment/comment.js"),s=e("pages_new/appmsg/store.js"),a=e("pages_new/3rd/vue.js");
return function(){
function e(){
p||(p=new a({
store:s,
el:"#page_bottom_area",
template:n,
components:_defineProperty({},t.name,t)
}));
}
var p=null;
e();
};
});define("appmsg/pay_read/buy_wecoin_btn_tpl.html.js",[],function(){
return'<div class="pay__wecoin-entry">\n  <i class="pay__icon-wecoin"></i>\n  <span class="price" id="js_wecoin_remain"></span>\n</div>\n';
});define("appmsg/pay_read/pay_confirm_tpl.html.js",[],function(){
return'<div class="pay__wecoin">\n  <div id="js_wecoin_title" class="pay__wecoin-title" style="font-weight: normal;">购买全文</div>\n  <div class="pay__wecoin-content pay__wecoin-content-price">\n    <i class="pay__icon-wecoin"></i>\n    <span id="js_wecoin_price" class="price"><#=price#></span>\n  </div>\n  <div id="js_wecoin_tips" class="pay__wecoin-tips" style="display:none"></div>\n</div>\n';
});function _typeof(t){
return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t;
}
function _classCallCheck(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}
var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var o=arguments[e];
for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);
}
return t;
},_createClass=function(){
function t(t,e){
for(var o=0;o<e.length;o++){
var n=e[o];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);
}
}
return function(e,o,n){
return o&&t(e.prototype,o),n&&t(e,n),e;
};
}();
define("pages/mod/bottom_modal.js",["biz_wap/ui/weui_css.js","widget/wx-widget/wx_bottom_modal.css","pages/mod/bottom_modal.html.js","biz_common/tmpl.js","biz_common/dom/class.js","biz_common/dom/event.js","biz_wap/utils/device.js","common/navShadow.js","common/userGoBack.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function e(t,e,o,n){
o=n?o+"px":o,t.style[e]=o;
}
function o(t){
return Math.ceil(t.scrollTop+t.offsetHeight)>=t.scrollHeight;
}
function n(t){
if(!(t&&t instanceof HTMLElement))return!1;
var e=window.getComputedStyle(t);
return 0!==e.width&&0!==e.height&&0!==e.opacity&&"none"!==e.display&&"hidden"!==e.visibility&&null!==t.offsetParent;
}
t("biz_wap/ui/weui_css.js"),t("widget/wx-widget/wx_bottom_modal.css");
var i=t("pages/mod/bottom_modal.html.js"),s=t("biz_common/tmpl.js"),a=t("biz_common/dom/class.js"),r=t("biz_common/dom/event.js"),l=t("biz_wap/utils/device.js"),c=t("common/navShadow.js"),h=t("common/userGoBack.js"),u=t("biz_wap/jsapi/core.js"),d=100,p="weui-btn_disabled",m="page_no_scroll",f=screen.height/4*3+"px",g={
top:l.os.pc?"20%":screen.height/4-(screen.height-window.innerHeight)+"px",
btnText:"提交",
hasHeader:!0,
clickMask2Hide:!0,
animationType:"bottom",
scroll2Hide:!0
},v=function(){
function t(o){
var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
_classCallCheck(this,t),n=_extends({},g,n);
var a=document.createElement("div");
a.innerHTML=s.tmpl(i,{
hasBtn:n.hasBtn,
btnText:n.btnText,
extClass:n.extClass||"",
hasMask:!n.removeMask,
isTopic:!!n.isTopic,
hasHeader:n.hasHeader,
hasFooter:!!n.footerEl,
btnSlot:n.btnSlot,
autoHeight:n.autoHeight,
maxHeight:f
});
var r=a.firstChild;
this.scrollLock=!1,this.curScrollTop=0,this.touches={
startX:0,
startY:0,
curX:0,
curY:0,
isScreenLeft:!1,
direction:"",
times:0
},this.opt=n,this.rootEle=r,this.contentEle=o,this.contentAreaWrp=r.getElementsByClassName("js_bottom_modal_bd")[0],
this.contentAreaWrp.appendChild(o),this.contentArea=r.getElementsByClassName("js_bottom_modal_content")[0],
this.loading=this.rootEle.getElementsByClassName("js_modal_loading")[0],this.pullLoading=this.rootEle.getElementsByClassName("js_pull_loading")[0],
this.endLine=this.rootEle.getElementsByClassName("js_modal_end_line")[0],this.enableGesture=!1,
this.triggerEl=null,this.isAutoFocus=!0,n.removeMask||(this.maskEle=r.getElementsByClassName("js_bottom_modal_mask")[0],
this.maskNotClick=r.getElementsByClassName("js_bottom_modal_mask_not_click")[0],
n.transparentMask&&e(this.maskEle,"opacity",0)),n.hasHeader&&(this.headAreaWrp=r.getElementsByClassName("js_bottom_modal_hd")[0],
this.submitBtn=this.headAreaWrp.getElementsByClassName("js_submit_bottom_modal")[0],
this.closeBtn=this.headAreaWrp.getElementsByClassName("js_close_bottom_modal")[0],
this.setTitle(n.title)),n.footerEl&&(this.footAreaWrp=r.querySelector(".js_bottom_modal_ft"),
this.footAreaWrp.appendChild(n.footerEl)),"right"===n.animationType&&this.rootEle.classList.add("wx_bottom_modal_right"),
document.body.appendChild(r),n.cb&&n.cb(),this.bindEvent();
}
return _createClass(t,[{
key:"bindEvent",
value:function(){
var t=this;
this.maskEle&&(this.opt.clickMask2Hide&&r.tap(this.maskEle,function(){
t.hide();
}),r.on(this.contentArea,"transitionend",function(o){
o.target!==t.contentArea||"transform"!==o.propertyName&&"-ms-transform"!==o.propertyName||(""!==t.contentArea.style.transform?t.contentArea.style.removeProperty("transform"):t.getShowStatus()?"function"==typeof t.opt.onShowAfterAnimation&&t.opt.onShowAfterAnimation():(e(t.maskNotClick,"visibility","hidden"),
!t.opt.autoHeight&&e(t.contentArea,"top",t.opt.top)));
}),r.tap(this.maskNotClick,function(){
return setTimeout(function(){
t.hide(),e(t.maskNotClick,"visibility","hidden"),!t.opt.autoHeight&&e(t.contentArea,"top",t.opt.top);
},300);
}),r.on(this.maskEle,"touchmove",function(t){
t.preventDefault();
})),this.headAreaWrp&&(r.on(this.headAreaWrp,"touchstart",function(e){
return t.onTouchStart(e);
}),r.on(this.headAreaWrp,"touchmove",function(e){
e.preventDefault();
var o=e.changedTouches[0];
t.getTouchDirection(o)&&t.moveByDirection(o);
}),r.on(this.headAreaWrp,"touchend",function(e){
return t.onTouchEnd(e);
})),this.footAreaWrp&&(r.on(this.footAreaWrp,"touchstart",function(e){
return t.onTouchStart(e);
}),r.on(this.footAreaWrp,"touchmove",function(e){
e.preventDefault();
var o=e.changedTouches[0];
t.getTouchDirection(o)&&t.moveByDirection(o);
}),r.on(this.footAreaWrp,"touchend",function(e){
return t.onTouchEnd(e);
})),this.closeBtn&&r.on(this.closeBtn,"click",function(){
t.hide();
}),this.submitBtn&&r.on(this.submitBtn,"click",function(){
a.hasClass(t.submitBtn,p)||t.opt.btnClickCb&&t.opt.btnClickCb();
}),r.on(this.contentAreaWrp,"scroll",function(){
t.checkReachBoundary(),t.contentAreaWrp.scrollTop>0?a.addClass(t.contentArea,"weui-half-screen-dialog_headline"):a.removeClass(t.contentArea,"weui-half-screen-dialog_headline");
}),this.headAreaWrp&&r.tap(this.headAreaWrp.getElementsByClassName("js_bottom_modal_title")[0],function(){
t.opt.titleClickCb&&t.opt.titleClickCb();
}),r.on(this.contentAreaWrp,"touchstart",function(e){
return t.onTouchStart(e);
}),r.on(this.contentAreaWrp,"touchmove",function(e){
var n=e.changedTouches[0];
if(t.getTouchDirection(n)){
var i=t.touches.direction;
if("Y"===i){
var s=t.contentAreaWrp,a=n.pageY,r=a-t.touches.startY,l=s.scrollTop<=0&&r>0,c=o(s)&&0>r;
l||c?l&&!t.opt.onPullDownLoad&&(t.move(a),e.preventDefault()):t.resetMovement(),
t.touches.curY=a;
}else e.preventDefault(),t.moveByDirection(n);
}
}),r.on(this.contentAreaWrp,"touchend",function(e){
return t.onTouchEnd(e);
}),r.on(window,"unload",function(){
t.opt.removeMask||c.hide();
});
}
},{
key:"checkReachBoundary",
value:function(){
var t=this,e=arguments.length<=0||void 0===arguments[0]?!0:arguments[0],o=arguments.length<=1||void 0===arguments[1]?!0:arguments[1];
this.scrollLock&&0!==this.contentAreaWrp.scrollTop||(this.scrollLock=!0,setTimeout(function(){
t.scrollLock=!1;
},50),e&&!this.pullingDownLock&&this.contentAreaWrp.scrollTop<=0&&(this.opt.onPullDownLoad&&this.opt.onPullDownLoad(),
this.pullingDownLock=!0),setTimeout(function(){
o&&!t.pullingUpLock&&t.contentAreaWrp.scrollTop+t.contentAreaWrp.offsetHeight+d>t.contentEle.offsetHeight&&(t.opt.onPullUpLoad&&t.opt.onPullUpLoad(),
t.pullingUpLock=!0);
},100),this.opt.onScroll&&this.opt.onScroll(this.contentAreaWrp.scrollTop>this.curScrollTop?"up":"down"),
this.curScrollTop=this.contentAreaWrp.scrollTop);
}
},{
key:"onTouchStart",
value:function(t){
var e=t.touches[0];
this.touches={
startX:e.pageX,
startY:e.pageY,
curX:e.pageX,
curY:e.pageY,
isScreenLeft:this.enableGesture&&e.pageX<=30,
direction:"",
times:0
},this.contentArea.style.transition="none";
}
},{
key:"onTouchEnd",
value:function(t){
var e=this.touches.direction,o="X"===e?100:this.contentArea.offsetHeight/4,n=t.changedTouches[0]["page"+e]-this.touches["start"+e],i=this.contentArea.dataset;
this.contentArea.style.removeProperty("transition"),i.distance&&(n>o?this.hide():this.contentArea.style.transform="translateY(0)",
delete i.distance);
}
},{
key:"getTouchDirection",
value:function(t){
if(this.touches.direction)return!0;
if(!this.touches.isScreenLeft)return this.touches.direction="Y",!0;
this.touches.times++;
var e=Math.abs(t.pageX-this.touches.startX),o=Math.abs(t.pageY-this.touches.startY);
return this.touches.times>=3?(this.touches.direction=e>=o?"X":"Y",!0):e>=5&&e>=o?(this.touches.direction="X",
!0):o>=5?(this.touches.direction="Y",!0):!1;
}
},{
key:"moveByDirection",
value:function(t){
var e=this.touches.direction,o=t["page"+e];
o-this.touches["start"+e]>0?this.move(o):this.resetMovement(),this.touches["cur"+e]=o;
}
},{
key:"move",
value:function(t){
if(this.opt.sideslip2Hide&&"X"===this.touches.direction||this.opt.scroll2Hide&&"Y"===this.touches.direction){
var e=this.contentArea.dataset;
e.distance=1*(e.distance||0)+t-this.touches["cur"+this.touches.direction],this.contentArea.style.transform="translateY("+e.distance+"px)";
}
}
},{
key:"resetMovement",
value:function(){
delete this.contentArea.dataset.distance,this.contentArea.style.removeProperty("transform");
}
},{
key:"show",
value:function(t,o,n){
var i=this,s=arguments.length<=3||void 0===arguments[3]?!0:arguments[3];
if(a.addClass(document.body,m),this.triggerEl=n||window.event&&window.event.target,
this.isAutoFocus=s,!this.getShowStatus()){
t||this.opt.autoHeight||(e(this.contentArea,"top",this.opt.top),console.log(this.contentArea.offsetHeight)),
e(this.contentArea,"visibility","visible"),a.addClass(this.rootEle,"wx_bottom_modal_show");
var d=document.getElementById("img-content");
d&&d.setAttribute("aria-hidden","true"),this.setAriaHidden(!1),this.contentArea.focus(),
this.maskEle&&this.opt.clickMask2Hide&&e(this.maskNotClick,"visibility","visible"),
this.opt.removeMask||c.show({
alpha:this.opt.transparentMask?0:.6,
callback:function(t){
t&&"function"==typeof i.opt.onShowNavShadow&&i.opt.onShowNavShadow();
},
onClick:function(){
i.hide();
}
}),this.opt.sideslip2Hide&&(l.os.ios?u.invoke("handleDeviceInfo",{
action:"disableInteractivePop",
disable:!0
},function(t){
/:ok$/.test(t.err_msg)&&(i.enableGesture=!0);
}):h.disable({
onGoBack:function(){
i.hide();
},
onDisable:function(){
i.enableGesture=!0;
},
onEnable:function(){
i.enableGesture=!1;
}
})),t&&(a.addClass(this.rootEle,"wx_bottom_modal_form"),e(this.contentArea,"top","25px")),
setTimeout(function(){
t||"right"===i.opt.animationType&&(e(i.contentArea,"-ms-transform","translateX(0)"),
e(i.contentArea,"transform","translateX(0)"));
}),t&&(setTimeout(function(){
"bottom"===i.opt.animationType?e(i.contentArea,"top","100%"):e(i.contentArea,"top",i.opt.top),
console.log(i.contentArea.offsetHeight),a.removeClass(i.rootEle,"wx_bottom_modal_form"),
setTimeout(function(){
e(i.contentArea,"top",i.opt.top),"right"===i.opt.animationType&&(e(i.contentArea,"-ms-transform","translateX(0)"),
e(i.contentArea,"transform","translateX(0)"));
});
},50),l.os.ios?o.focus():(this.tmpInputEle||(this.tmpInputEle=o.cloneNode(!0)),this.tmpInputEle.style.opacity=0,
this.tmpInputEle.style.position="fixed",this.tmpInputEle.style.top=0,this.tmpInputEle.style.zIndex="-1",
document.body.appendChild(this.tmpInputEle),setTimeout(function(){
o.focus(),i.opt.makeInputEleBigger&&i.opt.makeInputEleBigger(),document.body.removeChild(i.tmpInputEle);
},300),this.tmpInputEle.focus()),l.os.ios&&!this.hasBindInputEvent&&this.opt.makeFakeInputEle&&this.opt.removeInputEle&&(this.hasBindInputEvent=!0,
r.on(o,"focus",function(){
setTimeout(function(){
o.style.opacity=1,i.opt.removeInputEle();
},50);
}),r.on(o,"blur",function(){
i.opt.makeFakeInputEle(),o.style.opacity=0;
}))),this.opt.onShow&&this.opt.onShow();
}
}
},{
key:"hide",
value:function(t){
var o=this;
if(a.removeClass(document.body,m),t&&e(this.maskNotClick,"visibility","hidden"),
this.getShowStatus()){
this.contentArea.style.removeProperty("-ms-transform"),this.contentArea.style.removeProperty("transform"),
a.removeClass(this.rootEle,"wx_bottom_modal_show");
var i=document.getElementById("img-content");
i&&i.setAttribute("aria-hidden","false"),this.setAriaHidden(!0),this.isAutoFocus&&n(this.triggerEl)&&(this.triggerEl.setAttribute("tabindex","0"),
this.triggerEl.focus()),this.opt.removeMask||c.hide(),this.opt.sideslip2Hide&&(l.os.ios?u.invoke("handleDeviceInfo",{
action:"disableInteractivePop",
disable:!1
},function(t){
/:ok$/.test(t.err_msg)&&(o.enableGesture=!1);
}):h.enable({
onEnable:function(){
o.enableGesture=!1;
}
})),this.opt.onHide&&this.opt.onHide();
}
}
},{
key:"disableBtn",
value:function(){
this.submitBtn&&a.addClass(this.submitBtn,p);
}
},{
key:"enableBtn",
value:function(){
this.submitBtn&&a.removeClass(this.submitBtn,p);
}
},{
key:"finishPullUpLoad",
value:function(){
this.pullingUpLock=!1;
}
},{
key:"finishPullDownLoad",
value:function(){
this.pullingDownLock=!1;
}
},{
key:"setTitle",
value:function(t){
this.headAreaWrp&&("string"==typeof t?this.headAreaWrp.getElementsByClassName("js_bottom_modal_title")[0].innerHTML=t:"object"===("undefined"==typeof t?"undefined":_typeof(t))&&t.innerHTML&&(this.headAreaWrp.getElementsByClassName("js_bottom_modal_title")[0].innerHTML=t.innerHTML));
}
},{
key:"scrollTo",
value:function(){
var t;
(t=this.contentAreaWrp).scrollTo.apply(t,arguments);
}
},{
key:"getRootEle",
value:function(){
return this.rootEle;
}
},{
key:"getBdEle",
value:function(){
return this.contentAreaWrp;
}
},{
key:"getScrollEle",
value:function(){
return this.contentAreaWrp;
}
},{
key:"setCloseBtnStyle",
value:function(t){
if(this.closeBtn){
var e=this.closeBtn.getElementsByTagName("i")[0],o="weui-icon-close-thin",n="weui-icon-back-arrow-thin";
"back"===t?(a.removeClass(e,o),a.addClass(e,n)):(a.removeClass(e,n),a.addClass(e,o));
}
}
},{
key:"getShowStatus",
value:function(){
return a.hasClass(this.rootEle,"wx_bottom_modal_show");
}
},{
key:"showLoading",
value:function(){
e(this.loading,"display","block");
}
},{
key:"hideLoading",
value:function(){
e(this.loading,"display","none");
}
},{
key:"showPullUpLoading",
value:function(){
this.contentAreaWrp.appendChild(this.pullLoading),e(this.pullLoading,"display","block");
}
},{
key:"hidePullUpLoading",
value:function(){
e(this.pullLoading,"display","none");
}
},{
key:"showPullDownLoading",
value:function(){
this.contentAreaWrp.insertBefore(this.pullLoading,this.contentAreaWrp.firstChild),
e(this.pullLoading,"display","block");
}
},{
key:"hidePullDownLoading",
value:function(){
e(this.pullLoading,"display","none");
}
},{
key:"showEndLine",
value:function(){
this.contentAreaWrp.appendChild(this.endLine),e(this.endLine,"display","block");
}
},{
key:"setAriaHidden",
value:function(t){
this.contentArea.setAttribute("aria-hidden",t.toString());
}
},{
key:"disablePullDownLoad",
value:function(){
this.opt.onPullDownLoad=null;
}
}]),t;
}();
return v;
});define("biz_wap/utils/jsmonitor_report.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax.js","biz_wap/utils/log.js"],function(o){
"use strict";
function n(o,t){
r=window.setTimeout(function(){
o(),n(o,t);
},t);
}
var t=o("biz_common/utils/monitor.js"),i=o("biz_wap/utils/ajax.js"),e=o("biz_wap/utils/log.js"),r=null,s={};
return window.__jsmonitorReport?window.__jsmonitorReport:(window.__monitor_unload_has_done__=!1,
s.setSum=function(o,n,i){
return t.setSum(o,n,i),s;
},s.setAvg=function(o,n,i){
return t.setAvg(o,n,i),s;
},s.setLogs=function(o){
return t.setLogs(o),s;
},s.send=function(o){
return o!==!1&&(o=!0),t.send(o,i),s;
},n(function(){
s.send();
},1e3),window.addEventListener("unload",function(){
e("[leaveReport in jsmonitor_report 4]"),console.log("[leaveReport in jsmonitor_report 4]"),
window.__monitor_report_has_done__||(e("[leaveReport in jsmonitor_report 5]"),console.log("[leaveReport in jsmonitor_report 5]"),
window.__ajaxtest="2",r&&(window.clearTimeout(r),r=null),s.send(!1),window.__monitor_unload_has_done__=!0);
},!1),window.__jsmonitorReport=s,s);
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var o=arguments[t];
for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i]);
}
return e;
};
define("appmsg/topbar.js",["biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/comm_report.js","pages/utils.js","biz_common/dom/event.js","common/utils.js","biz_wap/utils/setMpInfo.js"],function(e){
"use strict";
function t(e){
e="undefined"!=typeof e?e:!1;
var t={
userName:I.userName,
brandName:I.bizNickName,
title:I.title,
brandIcon:I.headImg,
topBarStyle:N?1:0,
topBarShowed:e,
isMenuShowBrandInfo:1,
cover:I.cover,
digest:I.digest.htmlDecode()
};
if(""!==I.itemShowType&&null!==I.itemShowType&&void 0!==I.itemShowType&&_extends(t,{
itemShowType:I.itemShowType
}),""!==I.showSourceInfo&&_extends(t,{
showSourceInfo:I.showSourceInfo
}),"0"===I.itemShowType)_extends(t,{
isPaySubscribe:window.isPaySubscribe,
forbidForward:window.isPaySubscribe?1:0
});else if("5"===window.item_show_type)_extends(t,{
vid:I.vid,
duration:I.videoDuration,
videoWidth:I.videoWidth,
videoHeight:I.videoHeight,
disableShowFinderLiveTopBar:-1!==location.href.indexOf("item_show_type=16")?1:0
});else if("17"===window.item_show_type)_extends(t,{
shortContentMainBody:I.shortMsgContent.htmlDecode(),
shortContentJumpLinkUrl:I.shortMsgLink,
shortContentImgList:I.shortMsgImgs
});else{
var o=I.voiceid||0,i=I.duration||0;
_extends(t,{
audioUrl:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid="+o,
audioLen:i
});
}
b.currentMpInfo(t);
}
function o(){
N&&p.invoke("currentMpInfoShow",{
userName:I.userName,
brandName:I.bizNickName
});
}
function i(){
N&&p.invoke("currentMpInfoHide");
}
function n(){
N&&(t(),f.getScrollTop()>I.showTitleHeight&&o());
}
function r(){
N&&(f.getScrollTop()>I.showTitleHeight?o():i());
}
function s(e){
var t=parseInt(Date.now()/1e3,10);
I.reportData.EnterId=I.reportData.EnterId&&10===I.reportData.EnterId.toString().length?I.reportData.EnterId:t;
var o=1*(f.getScrollTop()+f.getInnerHeight()),i=_extends({},I.reportData,{
Event:e,
CurrScreen:3===e?Math.ceil(f.getScrollTop()/f.getInnerHeight()):0,
ExitHeight:3===e?Math.ceil(o):0
});
g.report(17335,i);
}
function a(){
p.on("topbar:click",function(){
s(3);
});
}
function d(){
var e=f.getScrollTop();
e>=I.showTitleHeight&&!S?(S=!0,N?(p.invoke("currentMpInfoShow",{
userName:I.userName,
brandName:I.bizNickName
}),_||(s(1),_=!0)):document.title=I.bizNickName):e<I.showTitleHeight&&S&&(S=!1,N?p.invoke("currentMpInfoHide"):document.title="");
}
function c(e){
k=e;
}
function m(){
v.bindVisibilityChangeEvt(function(e){
e&&f.getScrollTop()>=I.showTitleHeight&&k&&(t(),o());
});
}
function u(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
e.bizNickName||(e.bizNickName=N?"未命名公众号":e.bizNickNameBackup);
for(var t in e)e[t]&&(I[t]=e[t]);
I.bizNickName=I.bizNickName.htmlDecode(),I.title=I.title.htmlDecode(),I.headImg=I.headImg.replace(/\/0$/,"/132");
}
function h(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
u(e),t(),a(),m(),v.on(window,"load",function(){
document.title="",d();
}),v.on(window,"scroll",T),window.addEventListener("pageshow",function(e){
e.persisted&&n();
});
}
var p=e("biz_wap/jsapi/core.js"),l=e("biz_wap/utils/mmversion.js"),g=e("common/comm_report.js"),w=e("pages/utils.js"),v=e("biz_common/dom/event.js"),f=e("common/utils.js"),b=e("biz_wap/utils/setMpInfo.js"),I={
showTitleHeight:40,
userName:"",
bizNickName:"",
bizNickNameBackup:"",
title:"",
headImg:"",
voiceid:"",
duration:"",
vid:"",
videoDuration:0,
videoWidth:0,
videoHeight:0,
itemShowType:window.item_show_type,
showSourceInfo:"",
reportData:{},
cover:"",
digest:"",
shortMsgContent:"",
shortMsgLink:"",
shortMsgImgs:[]
},N=!1,S=!1,_=!1;
N="5"===I.itemShowType?l.isIOS&&l.gtVersion("7.0.12",!0)||l.isAndroid&&l.gtVersion("7.0.12",!0):l.isIOS&&l.gtVersion("7.0.10",!0)||l.isAndroid&&l.gtVersion("7.0.12",!0);
var T=w.throttle(d,50),k=!0;
return{
setCurrentMpInfo:t,
showCurrentMpInfo:o,
hideCurrentMpInfo:i,
setTopBarWhenVisible:c,
resetTopBar:n,
setTopBar:r,
update:u,
init:h
};
});define("appmsg/finance_communicate.js",[],function(){
"use strict";
function e(e){
console.info("postPageHeightMessage");
var t=getComputedStyle(n);
window.parent.postMessage({
name:e,
data:parseFloat(t.height)
},"http://finance.qq.com"),window.parent.postMessage({
name:e,
data:parseFloat(t.height)
},"http://gu.qq.com"),window.parent.postMessage({
name:e,
data:parseFloat(t.height)
},"https://gu.qq.com"),window.parent.postMessage({
name:e,
data:parseFloat(t.height)
},"https://wzq.tenpay.com");
}
function t(e){
console.log("[IFRAME RECEIVE MESSAGE]: ",e);
var t;
if(e.origin?t=e.origin:e.originalEvent&&(t=e.originalEvent.origin),/^http(s)?\:\/\/finance\.qq\.com$/.test(t)&&/^http(s)?\:\/\/gu\.qq\.com$/.test(t)&&/^http(s)?\:\/\/wzq\.tenpay\.com$/.test(t)&&e.source){
e.data,document.getElementsByTagName("body")[0],document.getElementById("activity-name"),
document.getElementById("meta_content"),document.getElementById("page-content");
}
}
if(window.parent===window)return!1;
document.getElementsByTagName("html")[0].style.width="1px",document.getElementsByTagName("html")[0].style.minWidth="100%";
var n=(document.getElementById("js_content"),document.getElementById("img-content"),
document.getElementById("page-content")),a=document.getElementsByClassName("rich_media_area_extra")[0];
return a.style.display="none",e("pageHeight"),window.addEventListener("message",t,!1),
{
postPageHeightMessage:e
};
});var _extends=Object.assign||function(e){
for(var o=1;o<arguments.length;o++){
var i=arguments[o];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);
}
return e;
};
define("appmsg/like_profile.js",["biz_common/template-2.0.1-cmd.js","appmsg/like_profile_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/utils.js","common/comm_report.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function o(){
p({
biz:y,
scene:112
},{
username:b,
scene:"209"
});
}
function i(e){
var i={
bottomOpr:m("js_bottom_opr_right"),
container:m("js_like_profile_container")
};
s({
url:"/mp/getbizbanner?__biz="+window.biz+"&is_from_recommand="+(k?1:0),
type:"GET",
dataType:"json",
success:function(s){
if(!s.base_resp||0===s.base_resp.ret){
var c=s.friend_subscribe_count,p=s.is_subscribed,y=s.orignal_num,x=s.is_ban;
if(!(p||x||m("js_focus"))){
k&&_.report(23219,_extends({},h,{
Actiontype:5,
type:7
})),u=!p,i.container.innerHTML=n.compile(t)({
friendSubscribeCount:c,
isSubscribed:p,
orignalNum:y,
isShowFocusBottom:u,
roundHeadImg:w,
nickname:f
}),e.forEach(function(e){
_.report(23219,_extends({},h,{
Actiontype:1,
type:g[e]
}));
}),m("js_like_profile_bar").classList.remove("wx_follow_hide");
var B=d("js_function_mod_inner")[0].offsetHeight;
d("js_function_mod")[0].style.height=B+"px",i.focusBottom=m("js_focus"),i.alreadyFocusBottom=m("js_already_focus"),
u?(i.focusBottom.style.display="",i.alreadyFocusBottom.style.display="none"):(i.focusBottom.style.display="none",
i.alreadyFocusBottom.style.display=""),r.on(i.focusBottom,"click",function(o){
o.stopPropagation(),e.forEach(function(e){
_.report(23219,_extends({},h,{
Actiontype:2,
type:g[e]
}));
}),l.isWindows?location.href=z:a.invoke("quicklyAddBrandContact",{
username:b,
scene:j,
scenenote:location.href
},function(e){
/ok/.test(e.err_msg)&&(i.focusBottom.style.display="none",i.alreadyFocusBottom.style.display="");
});
}),r.on(i.alreadyFocusBottom,"click",function(i){
e.forEach(function(e){
_.report(23219,_extends({},h,{
Actiontype:4,
type:g[e]
}));
}),i.stopPropagation(),o();
}),r.on(m("js_like_profile_bar"),"click",function(){
e.forEach(function(e){
_.report(23219,_extends({},h,{
Actiontype:3,
type:g[e]
}));
}),o();
});
}
}
}
});
}
var n=e("biz_common/template-2.0.1-cmd.js"),t=e("appmsg/like_profile_tpl.html.js"),s=e("biz_wap/utils/ajax.js"),r=e("biz_common/dom/event.js"),a=e("biz_wap/jsapi/core.js"),c=e("pages/utils.js"),m=c.getId,d=c.getByClass,p=c.goProfile,_=e("common/comm_report.js"),l=e("biz_wap/utils/mmversion.js"),u=!0,w=window.round_head_img||window.cgiData.round_head_img||"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",f=window.nickname||window.cgiData.nick_name,b=window.user_name||window.cgiData.user_name,y=window.appuin||window.cgiData.biz,j=209,g={
share:1,
collect:2,
zaikan:3,
like:4,
reward:5,
pay:6
},h={
Msgid_from:1*(window.msgid||window.appmsgid),
Itemidx_from:1*window.idx,
Bizuin:window.biz,
Itemshowtype:1*window.item_show_type,
Sessioid:window.sessionid,
Enterid:1*window.enterid,
Scene:1*window.source,
Subscene:1*window.subscene
},z="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+y+"&scene=112#wechat_redirect",k=function(e){
return 1===window.show_related_article||e.indexOf(window.source)>-1||e.indexOf(window.subscene)>-1;
}(["157","169"]);
return{
renderLikeProfile:i
};
});define("appmsg/loading.js",["tpl/appmsg/loading.html.js"],function(e){
"use strict";
var n=e("tpl/appmsg/loading.html.js"),t=document.createElement("div");
t.innerHTML=n,t=t.children[0];
var a=t.querySelector(".js_loading_content");
return document.querySelector("body").appendChild(t),t.addEventListener("touchstart",function(e){
e.preventDefault();
},!1),{
show:function(){
var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];
a.innerHTML=e,t.style.display="";
},
hide:function(){
t.style.display="none";
}
};
});define("appmsg/pay_report_utils.js",["biz_wap/jsapi/core.js","common/comm_report.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js"],function(e){
"use strict";
function n(e){
var n=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=110809_"+e+"_"+n+"&r="+Math.random();
}
function i(e){
var n=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
r.isIOS?(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=110809_"+e+"_"+n+"&r="+Math.random():r.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=110809_"+(1*e+1)+"_"+n+"&r="+Math.random());
}
var o=e("biz_wap/jsapi/core.js"),t=e("common/comm_report.js"),r=e("biz_wap/utils/mmversion.js"),w=e("biz_wap/utils/device.js"),d={
netType:null
},s=function(e){
o.invoke("getNetworkType",{},function(n){
switch(n.err_msg){
case"network_type:edge":
case"network_type:wwan":
switch(n.detailtype){
case"2g":
d.netType=2;
break;

case"3g":
d.netType=3;
break;

case"4g":
d.netType=4;
break;

default:
d.netType=0;
}
break;

case"network_type:wifi":
d.netType=1;
break;

case"network_type:fail":
d.netType=-1;
break;

default:
d.netType=0;
}
"function"==typeof e&&e();
});
},a=function(e,n,i){
var o=arguments.length<=3||void 0===arguments[3]?"":arguments[3],r=arguments.length<=4||void 0===arguments[4]?"":arguments[4],w=arguments.length<=5||void 0===arguments[5]?"":arguments[5],d=void 0;
d=window.can_use_wecoin?window.wecoin_amount?10*window.wecoin_amount:"":window.paySubscribeInfo?window.paySubscribeInfo.fee:"",
t.report(18485,{
bizuin:window.biz,
msgid:1*window.mid,
itemidx:1*window.idx,
price:1*d,
Preview:1*window.previewPercent,
worthycnt:1*window.paySubscribeInfo.like_cnt,
paidcnt:1*window.paySubscribeInfo.pay_cnt,
is_finished:1*window.is_finished_preview,
PayTime:1*e,
PayResult:1*n,
ErrMsg:o+"",
ErrCodeInt:1*r,
ErrDomain:w+"",
Order_Id:i+"",
EnterId:1*window.enterid
});
},c=function g(e){
if(window.isPaySubscribe)if(null===d.netType)s(function(){
return g(e);
});else{
var n=Math.round(new Date/1e3);
t.report(18488,{
NetType:d.netType,
Bizuin:window.biz,
MsgId:1*window.mid,
itemIdx:1*window.idx,
Url:window.msg_link+"",
Title:window.msg_title+"",
EventTime:n,
EventType:e,
Scene:1*window.source,
Subscene:1*window.subscene,
IsFans:1*window.isFans,
SessionId:window.sessionid+"",
EnterId:1*window.enterid
});
}
},p=function I(e,n){
if(null===d.netType)s(function(){
return I(e,n);
});else{
var i=Math.round(new Date/1e3),o={
NetType:d.netType,
Bizuin:window.biz,
MsgId:1*window.mid,
itemIdx:1*window.idx,
Url:window.msg_link+"",
Title:window.msg_title+"",
EventTime:i,
EventType:e,
Scene:1*window.source,
Subscene:1*window.subscene,
IsFans:1*window.isFans,
SessionId:window.sessionid+"",
EnterId:1*window.enterid
};
void 0!==n&&(o.ActionType=n),t.report(18488,o);
}
},u=function b(e,n){
if(null===d.netType)s(function(){
return b(e,n);
});else{
var i=Math.round(new Date/1e3),o={
NetType:d.netType,
EventTime:i,
EventType:e,
SessionId:window.sessionid+"",
EnterId:1*window.enterid
};
void 0!==n&&(o.ActionType=n),t.report(18488,o);
}
},m=function(e,n,i,o,r,d,s){
t.report(19158,{
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
OriPrice:window.paySubscribeInfo?1*window.paySubscribeInfo.fee:0,
IAPCurrency:e,
IAPPrice:n,
GetIAPType:i,
GetIAPTime:o,
ProductId:window.payProductId,
EnterId:1*window.enterid,
CountryCode:r,
SystemVer:w.os.version,
GetIAPResult:d,
GetIAPErrMsg:s
});
},y=function(e){
t.report(22287,{
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
Url:window.msg_link+"",
Title:window.msg_title+"",
SessionId:window.sessionid+"",
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene,
EventTime:Math.round(new Date/1e3),
EventType:e
});
},l={
report110809:n,
reportPay:a,
reportPayAppmsg:c,
reportPayWall:p,
reportProfile:u,
report110809ForDevice:i,
reportOverseaPay:m,
reportSend:y
};
return l;
});define("appmsg/popup_report.js",["biz_wap/utils/ajax.js","biz_common/base64.js","biz_common/utils/url/parse.js"],function(e){
"use strict";
function i(e){
var i=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];
r({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:17988,
buffer:a.concat(e).join(",")
},
async:i,
timeout:2e3
});
}
function t(e){
var i=2,t=u.getQuery("__biz",e)||"",n=u.getQuery("mid",e)||"",r=u.getQuery("idx",e)||"";
return t.length&&n.length&&r.length?i=3:-1!==e.indexOf("mp.weixin.qq.com")&&(i=4),
i;
}
function n(e){
var i="",t=u.getQuery("__biz",e)||"",n=u.getQuery("mid",e)||"",r=u.getQuery("idx",e)||"";
return i=-1===e.indexOf("mp.weixin.qq.com")?e:t.length&&n.length&&r.length?t+"_"+n+"_"+r:e;
}
var r=e("biz_wap/utils/ajax.js"),o=e("biz_common/base64.js"),u=e("biz_common/utils/url/parse.js"),a=["",""+o.decode(window.biz),""+window.mid,""+window.idx,""+window.enterid];
return{
report:i,
getRedirectType:t,
getUrlData:n
};
});define("complain/localstorage.js",[],function(){
"use strict";
var t={};
return t=window.localStorage?{
set:function(t,e){
null!==this.get(t)&&this.remove(t),localStorage.setItem(t,e);
},
get:function(t){
var e=localStorage.getItem(t);
return void 0===e?null:e;
},
remove:function(t){
localStorage.removeItem(t);
},
clear:function(){
localStorage.clear();
},
each:function(t){
for(var e,o=localStorage.length,l=0,t=t||function(){};o>l&&(e=localStorage.key(l),
t.call(this,e,this.get(e))!==!1);l++)localStorage.length<o&&(o--,l--);
}
}:{
set:function(){},
get:function(){}
};
});