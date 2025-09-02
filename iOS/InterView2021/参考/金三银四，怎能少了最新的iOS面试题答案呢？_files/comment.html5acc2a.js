function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("pages_new/modules/utils/url.js",[],function(){
"use strict";
var e=function(e){
var n=[],t={};
if(!e)try{
e=window.top.location,n=e.search.substring(1).split("&");
}catch(o){
e=window.location,n=e.search.substring(1).split("&");
}
"string"==typeof e&&(e=new URL(e),n=e.search.substring(1).split("&"));
for(var r=0;r<n.length;r++){
var i=n[r].split("="),s=decodeURIComponent(i.shift());
"undefined"==typeof t[s]&&(t[s]=decodeURIComponent(i.join("=")));
}
return t;
},n=function(e,n,t){
return"string"!=typeof e?"":(n&&"object"===("undefined"==typeof n?"undefined":_typeof(n))&&Object.keys(n).length&&(e+="?"+Object.keys(n).map(function(e){
return e+"="+encodeURIComponent(n[e]);
}).join("&")),t&&"string"==typeof t&&(e+="#"+t),e);
};
return{
getParams:e,
genUrl:n
};
});define("appmsg/comment/comment_write_old.html.js",[],function(){
return'<!-- 旧版写留言 -->\n<div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n  <div class="discuss_container editing access">\n    <div class="discuss_container_inner">\n      <div class="discuss_container_hd">\n        <h2 class="discuss_rich_media_title"><#=textPageTitle#></h2> <!-- 标题要转义 -->\n        <span id="log"></span>\n\n        <div id="js_comment_input_old" class="dicuss_form_area">\n          <!-- 这里放input组件 -->\n        </div>\n      </div>\n      <div class="discuss_container_bd">\n        <!-- 标题 -->\n        <div class="rich_media_extra_title_wrp weui-flex">\n          <div class="weui-flex__item">\n            <strong class="rich_media_extra_title">我的留言</strong>\n          </div>\n        </div>\n\n        <div class="discuss_list_wrp">\n          <ul class="discuss_list" id="js_my_list_old"></ul>\n        </div>\n\n        <!-- 留言加载中 -->\n        <div class="js_mycmt_loading">\n          <div class="weui-loadmore weui-loadmore_default">\n            <i class="weui-loading"></i>\n            <span class="weui-loadmore__tips">正在加载</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- 秒开下的底部导航条 -->\n<div class="weui-webview-nav" style="display: none;" id="js_fake_bar">\n  <button class="weui-webview-nav__btn_goback" id="js_cmt_goback">goback</button>\n  <button class="weui-webview-nav__btn_forward weui-webview-nav__btn_disabled" disabled="disabled">forward</button>\n</div>\n';
});function _classCallCheck(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function t(t,e){
for(var n=0;n<e.length;n++){
var i=e[n];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);
}
}
return function(e,n,i){
return n&&t(e.prototype,n),i&&t(e,i),e;
};
}();
define("appmsg/comment/comment_input/comment_input.js",["biz_common/dom/event.js","pages/utils.js","appmsg/emotion/selection.js","common/utils.js","appmsg/emotion/dom.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","biz_common/tmpl.js","appmsg/comment/comment_input/comment_input.html.js","appmsg/emotion/emotion_pc.js","appmsg/emotion/emotion.js"],function(t){
"use strict";
var e=t("biz_common/dom/event.js"),n=t("pages/utils.js"),i=t("appmsg/emotion/selection.js"),o=t("common/utils.js"),s=t("appmsg/emotion/dom.js"),a=t("biz_wap/utils/device.js"),m=t("biz_wap/utils/mmversion.js"),l=t("biz_common/tmpl.js"),r=t("appmsg/comment/comment_input/comment_input.html.js"),u=a.os.pc&&!m.is_wxwork,d=t(u?"appmsg/emotion/emotion_pc.js":"appmsg/emotion/emotion.js").Emotion,c="comment_primary_counter_warn",p="comment_primary_input_editing",h=o.getInnerHeight(),g=function(t,e){
for(var n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],i=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"],o=e?i:n,s=0;s<o.length;s+=2)t=t.replace(new RegExp(o[s],"g"),o[s+1]);
return t;
},v=function(){
function t(e){
var i=this;
_classCallCheck(this,t),this.type=e.type||"comment",this.placeholder=e.placeholder,
this.length=e.length,this.onChange=e.onChange,this.onSubmit=e.onSubmit,this.onShow=e.onShow,
this.onHide=e.onHide,this.onBlur=e.onBlur,this.onClick=e.onClick,this.dom={},this.renderEl=null,
this.target=null,this.value="",this.lastRange=null,this.isShow=!1,this.params=null;
var o=document.createElement("div");
o.innerHTML=l.tmpl(r,{
deviceIsPc:u,
placeholder:this.placeholder,
submitText:e.submitText,
length:this.length,
iconEmotionSwitch:window.icon_emotion_switch,
iconEmotionSwitchActive:window.icon_emotion_switch_active,
iconEmotionSwitchPrimary:window.icon_emotion_switch_primary,
iconEmotionSwitchActivePrimary:window.icon_emotion_switch_active_primary
},!1);
var a=n.qs(".js_wrp",o);
this.dom={
wrp:a,
input:n.qs(".js_input",a),
placeholder:n.qs(".js_placeholder",a),
emotionWrp:n.qs(".js_emotion_wrp",a),
submit:n.qs(".js_submit",a),
counter:n.qs(".js_counter",a),
counterLen:n.qs(".js_counter_len",a)
},document.body.appendChild(a),this.emotion=new d(u?{
emotionSwitch:this.dom.emotionWrp,
input:this.dom.input,
submit:this.dom.submit,
tool:n.qs(".js_tool",a),
onSelect:function(t){
i.insertHTML('<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single we-emoji '+t.name+'" alt="mo-'+t.title+'">'),
i.emotion.emotionPanelMove();
}
}:{
emotionPanel:s(n.qs(".js_emotion_panel")),
inputArea:s(this.dom.input),
emotionPanelArrowWrp:s(n.qs(".js_emotion_panel_arrow_wrp")),
emotionSwitcher:s(this.dom.emotionWrp),
emotionSlideWrapper:s(n.qs(".js_slide_wrapper")),
emotionNavBar:s(n.qs(".js_navbar")),
submitBtn:s(this.dom.submit),
inputEmotion:function(){
i.dom.submit.disabled=0===n.trim(i.dom.input.value).length;
}
}),this.bindEvent();
}
return _createClass(t,[{
key:"bindEvent",
value:function(){
var o=this;
e.tap(this.dom.submit,function(t){
t.preventDefault(),"function"==typeof o.onSubmit&&o.onSubmit(o.params);
}),u?!function(){
a.os.Mac&&e.on(window,"blur",function(){
o.dom.input&&"none"!==o.dom.input.display&&""!==o.dom.input.innerHTML&&o.blur();
}),e.on(o.dom.input,"focus",function(){
o.dom.wrp.classList.add(p);
}),e.on(o.dom.input,"blur",function(){
o.dom.wrp.classList.remove(p);
}),e.on(o.dom.input,"input",function(){
o.inputHandler();
}),e.tap(o.dom.input,function(){
o.emotion.hide(),"function"==typeof o.onClick&&o.onClick();
}),e.on(o.dom.input,"keyup",function(){
o.saveRange(),o.save();
}),e.on(o.dom.input,"keydown",function(t){
return 13===t.keyCode?(o.saveRange(),o.insertHTML("<br/>"),o.saveRange(),!1):!0;
}),e.on(o.dom.input,"mouseup",function(){
o.saveRange(),o.save();
});
var s=null;
e.on(o.dom.input,"paste",function(){
s&&clearTimeout(s),s=setTimeout(function(){
return i.setCursorToEnd(t.FilterNode(o.dom.input,!0)),o.saveRange(),o.save(),!1;
},10);
}),e.on(document,"click",function(t){
if(o.isShow){
var e=t.target;
n.isParent(e,o.target)||n.isParent(e,o.dom.wrp)||""!==n.trim(o.dom.input.innerHTML)?!o.emotion.isShow||n.isParent(e,o.emotion.dom.emotionPanel)||n.isParent(e,o.dom.emotionWrp)||o.emotion.hide():o.hide();
}
},!1);
}():!function(){
var t=["“”","‘’","（）","《》","〈〉","「」","『』","〔〕","【】","［］","[]","｛｝","{}","()","<>"],i=!1;
e.on(o.dom.input,"input",function(e){
o.dom.submit.disabled=0===n.trim(o.dom.input.value).length,a.os.ios&&e.data&&t.indexOf(e.data)>-1&&(i=!0);
}),a.os.ios&&(e.on(o.dom.input,"click",function(){
i&&(o.blur(),o.focus(),i=!1),"function"==typeof o.onClick&&o.onClick();
}),window.__second_open__&&e.on(o.dom.input,"blur",function(){
"function"==typeof o.onBlur&&o.onBlur();
}));
}();
}
},{
key:"inputHandler",
value:function(){
var t=this.dom.input.innerHTML;
""===t||"<br>"===t?(this.dom.placeholder.style.display="",this.dom.input.innerHTML=""):this.dom.placeholder.style.display="none";
}
},{
key:"show",
value:function(t){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
t!==this.renderEl&&("append"===e.renderType?t.appendChild(this.dom.wrp):t.insertAdjacentElement("afterend",this.dom.wrp),
this.renderEl=t),this.target=e.target||t,void 0!==e.placeholder&&e.placeholder!==this.placeholder&&(this.dom.placeholder.innerHTML=e.placeholder,
this.placeholder=e.placeholder),this.params=e.params||null,this.dom.wrp.style.display="";
var n=this.dom.wrp.getBoundingClientRect();
n.top+n.height>=h&&window.scrollTo(0,window.scrollY+n.height),this.dom.input.innerHTML=e.text||"",
this.isShow=!0,u&&(this.inputHandler(),this.lastRange=null,this.save()),this.focus(),
"function"==typeof this.onShow&&this.onShow(t,this.dom.input);
}
},{
key:"hide",
value:function(){
this.isShow=!1,this.dom.wrp.style.display="none",this.emotion.hide(),"function"==typeof this.onHide&&this.onHide(this.target,this.params),
this.params=null;
}
},{
key:"focus",
value:function(){
this.dom.input.focus();
}
},{
key:"blur",
value:function(){
this.dom.input.blur();
}
},{
key:"hideEmotionPannel",
value:function(){
this.emotion.hidePannel();
}
},{
key:"getInput",
value:function(){
return this.dom.input;
}
},{
key:"getSubmit",
value:function(){
return this.dom.submit;
}
},{
key:"saveRange",
value:function(){
this.lastRange=i.getRange();
}
},{
key:"restoreRange",
value:function(){
if(this.lastRange){
var t=i.getSelection();
if(t.addRange)t.removeAllRanges(),t.addRange(this.lastRange);else{
var e=i.getRange();
e.setEndPoint&&(e.setEndPoint("EndToEnd",this.lastRange),e.setEndPoint("StartToStart",this.lastRange)),
e.select();
}
}
}
},{
key:"save",
value:function(){
if(document.execCommand("AutoUrlDetect",!1,!1),this.value=this.emotion.textFilter(g(this.getAfterFilterNodeHtml())),
u){
var t=n.trim(this.value).replace(/(<br\/>)|\n/g,"").length;
this.dom.counterLen.innerText=t,t>this.length?(this.dom.counter.style.display="",
this.dom.counter.classList.add(c),this.dom.submit.disabled=!0):1>t?(this.dom.counter.style.display="none",
this.dom.counter.classList.remove(c),this.dom.submit.disabled=!0):t>=this.length-10?(this.dom.counter.style.display="",
this.dom.counter.classList.remove(c),this.dom.submit.disabled=!1):(this.dom.counter.style.display="none",
this.dom.counter.classList.remove(c),this.dom.submit.disabled=!1);
}
"function"==typeof this.onChange&&this.onChange(this.renderEl,this.dom.input);
}
},{
key:"insertHTML",
value:function(t){
this.focus(),this.dom.input.scrollTop=this.dom.input.scrollHeight,this.restoreRange();
var e=i.getRange();
if(e){
if(e.createContextualFragment){
t+='<img style="width:1px;height:1px;"></img>';
var n=e.createContextualFragment(t),o=n.lastChild,s=i.getSelection();
e.deleteContents(),e.insertNode(n),e.setStartBefore(o),e.setEndAfter(o),s.removeAllRanges(),
s.addRange(e),document.execCommand("Delete",!1,null);
}else e.pasteHTML&&t&&(e.pasteHTML(t),e.select(),e.collapse&&e.collapse(!1));
this.saveRange(),this.save();
}
}
},{
key:"getAfterFilterNodeHtml",
value:function(){
var e=document.createElement("div");
return e.innerHTML=this.dom.input.innerHTML,t.FilterNode(e),e.innerHTML;
}
}],[{
key:"FilterNode",
value:function(t,e){
for(var n=null,i=t.childNodes.length-1;i>=0;i--){
var o=t.childNodes[i];
switch(o.nodeType){
case 1:
var s=o.nodeName.toUpperCase();
if("BR"!==s){
var a=void 0,m=!1;
if("IMG"===s&&o.classList.contains("icon_emotion_single")?a=o:(a=o.textContent||o.innerText||"",
m=!0),a){
var l=m?document.createTextNode(a):a;
e&&!n&&(n=l),t.replaceChild(l,o);
}else t.removeChild(o);
}
break;

case 3:
break;

default:
t.removeChild(o);
}
}
return e?n:void 0;
}
}]),t;
}();
return v;
});function _typeof(t){
return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t;
}
define("pages_new/3rd/vuex.js",[],function(){
"use strict";
function t(t){
function e(){
var t=this.$options;
t.store?this.$store="function"==typeof t.store?t.store():t.store:t.parent&&t.parent.$store&&(this.$store=t.parent.$store);
}
var n=Number(t.version.split(".")[0]);
if(n>=2)t.mixin({
beforeCreate:e
});else{
var r=t.prototype._init;
t.prototype._init=function(t){
void 0===t&&(t={}),t.init=t.init?[e].concat(t.init):e,r.call(this,t);
};
}
}
function e(t){
L&&(t._devtoolHook=L,L.emit("vuex:init",t),L.on("vuex:travel-to-state",function(e){
t.replaceState(e);
}),t.subscribe(function(t,e){
L.emit("vuex:mutation",t,e);
},{
prepend:!0
}),t.subscribeAction(function(t,e){
L.emit("vuex:action",t,e);
},{
prepend:!0
}));
}
function n(t,e){
return t.filter(e)[0];
}
function r(t,e){
if(void 0===e&&(e=[]),null===t||"object"!==("undefined"==typeof t?"undefined":_typeof(t)))return t;
var o=n(e,function(e){
return e.original===t;
});
if(o)return o.copy;
var i=Array.isArray(t)?[]:{};
return e.push({
original:t,
copy:i
}),Object.keys(t).forEach(function(n){
i[n]=r(t[n],e);
}),i;
}
function o(t,e){
Object.keys(t).forEach(function(n){
return e(t[n],n);
});
}
function i(t){
return null!==t&&"object"===("undefined"==typeof t?"undefined":_typeof(t));
}
function a(t){
return t&&"function"==typeof t.then;
}
function s(t,e){
if(!t)throw new Error("[vuex] "+e);
}
function u(t,e){
return function(){
return t(e);
};
}
function c(t,e,n){
if(f(t,n),e.update(n),n.modules)for(var r in n.modules){
if(!e.getChild(r))return void console.warn("[vuex] trying to add a new module '"+r+"' on hot reloading, manual reload is needed");
c(t.concat(r),e.getChild(r),n.modules[r]);
}
}
function f(t,e){
Object.keys(q).forEach(function(n){
if(e[n]){
var r=q[n];
o(e[n],function(e,o){
s(r.assert(e),l(t,n,o,e,r.expected));
});
}
});
}
function l(t,e,n,r,o){
var i=e+" should be "+o+' but "'+e+"."+n+'"';
return t.length>0&&(i+=' in module "'+t.join(".")+'"'),i+=" is "+JSON.stringify(r)+".";
}
function p(t,e,n){
return e.indexOf(t)<0&&(n&&n.prepend?e.unshift(t):e.push(t)),function(){
var n=e.indexOf(t);
n>-1&&e.splice(n,1);
};
}
function d(t,e){
t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),
t._modulesNamespaceMap=Object.create(null);
var n=t.state;
m(t,n,[],t._modules.root,!0),h(t,n,e);
}
function h(t,e,n){
var r=t._vm;
t.getters={},t._makeLocalGettersCache=Object.create(null);
var i=t._wrappedGetters,a={};
o(i,function(e,n){
a[n]=u(e,t),Object.defineProperty(t.getters,n,{
get:function(){
return t._vm[n];
},
enumerable:!0
});
});
var s=U.config.silent;
U.config.silent=!0,t._vm=new U({
data:{
$$state:e
},
computed:a
}),U.config.silent=s,t.strict&&w(t),r&&(n&&t._withCommit(function(){
r._data.$$state=null;
}),U.nextTick(function(){
return r.$destroy();
}));
}
function m(t,e,n,r,o){
var i=!n.length,a=t._modules.getNamespace(n);
if(r.namespaced&&(t._modulesNamespaceMap[a]&&console.error("[vuex] duplicate namespace "+a+" for the namespaced module "+n.join("/")),
t._modulesNamespaceMap[a]=r),!i&&!o){
var s=x(e,n.slice(0,-1)),u=n[n.length-1];
t._withCommit(function(){
u in s&&console.warn('[vuex] state field "'+u+'" was overridden by a module with the same name at "'+n.join(".")+'"'),
U.set(s,u,r.state);
});
}
var c=r.context=v(t,a,n);
r.forEachMutation(function(e,n){
var r=a+n;
g(t,r,e,c);
}),r.forEachAction(function(e,n){
var r=e.root?n:a+n,o=e.handler||e;
b(t,r,o,c);
}),r.forEachGetter(function(e,n){
var r=a+n;
_(t,r,e,c);
}),r.forEachChild(function(r,i){
m(t,e,n.concat(i),r,o);
});
}
function v(t,e,n){
var r=""===e,o={
dispatch:r?t.dispatch:function(n,r,o){
var i=A(n,r,o),a=i.payload,s=i.options,u=i.type;
return s&&s.root||(u=e+u,t._actions[u])?t.dispatch(u,a):void console.error("[vuex] unknown local action type: "+i.type+", global type: "+u);
},
commit:r?t.commit:function(n,r,o){
var i=A(n,r,o),a=i.payload,s=i.options,u=i.type;
return s&&s.root||(u=e+u,t._mutations[u])?void t.commit(u,a,s):void console.error("[vuex] unknown local mutation type: "+i.type+", global type: "+u);
}
};
return Object.defineProperties(o,{
getters:{
get:r?function(){
return t.getters;
}:function(){
return y(t,e);
}
},
state:{
get:function(){
return x(t.state,n);
}
}
}),o;
}
function y(t,e){
if(!t._makeLocalGettersCache[e]){
var n={},r=e.length;
Object.keys(t.getters).forEach(function(o){
if(o.slice(0,r)===e){
var i=o.slice(r);
Object.defineProperty(n,i,{
get:function(){
return t.getters[o];
},
enumerable:!0
});
}
}),t._makeLocalGettersCache[e]=n;
}
return t._makeLocalGettersCache[e];
}
function g(t,e,n,r){
var o=t._mutations[e]||(t._mutations[e]=[]);
o.push(function(e){
n.call(t,r.state,e);
});
}
function b(t,e,n,r){
var o=t._actions[e]||(t._actions[e]=[]);
o.push(function(e){
var o=n.call(t,{
dispatch:r.dispatch,
commit:r.commit,
getters:r.getters,
state:r.state,
rootGetters:t.getters,
rootState:t.state
},e);
return a(o)||(o=Promise.resolve(o)),t._devtoolHook?o.catch(function(e){
throw t._devtoolHook.emit("vuex:error",e),e;
}):o;
});
}
function _(t,e,n,r){
return t._wrappedGetters[e]?void console.error("[vuex] duplicate getter key: "+e):void(t._wrappedGetters[e]=function(t){
return n(r.state,r.getters,t.state,t.getters);
});
}
function w(t){
t._vm.$watch(function(){
return this._data.$$state;
},function(){
s(t._committing,"do not mutate vuex store state outside mutation handlers.");
},{
deep:!0,
sync:!0
});
}
function x(t,e){
return e.reduce(function(t,e){
return t[e];
},t);
}
function A(t,e,n){
return i(t)&&t.type&&(n=e,e=t,t=t.type),s("string"==typeof t,"expects string as the type, but found "+("undefined"==typeof t?"undefined":_typeof(t))+"."),
{
type:t,
payload:e,
options:n
};
}
function j(e){
return U&&e===U?void console.error("[vuex] already installed. Vue.use(Vuex) should be called only once."):(U=e,
void t(U));
}
function O(t){
return M(t)?Array.isArray(t)?t.map(function(t){
return{
key:t,
val:t
};
}):Object.keys(t).map(function(e){
return{
key:e,
val:t[e]
};
}):[];
}
function M(t){
return Array.isArray(t)||i(t);
}
function $(t){
return function(e,n){
return"string"!=typeof e?(n=e,e=""):"/"!==e.charAt(e.length-1)&&(e+="/"),t(e,n);
};
}
function E(t,e,n){
var r=t._modulesNamespaceMap[n];
return r||console.error("[vuex] module namespace not found in "+e+"(): "+n),r;
}
function C(t){
void 0===t&&(t={});
var e=t.collapsed;
void 0===e&&(e=!0);
var n=t.filter;
void 0===n&&(n=function(){
return!0;
});
var o=t.transformer;
void 0===o&&(o=function(t){
return t;
});
var i=t.mutationTransformer;
void 0===i&&(i=function(t){
return t;
});
var a=t.actionFilter;
void 0===a&&(a=function(){
return!0;
});
var s=t.actionTransformer;
void 0===s&&(s=function(t){
return t;
});
var u=t.logMutations;
void 0===u&&(u=!0);
var c=t.logActions;
void 0===c&&(c=!0);
var f=t.logger;
return void 0===f&&(f=console),function(t){
var l=r(t.state);
"undefined"!=typeof f&&(u&&t.subscribe(function(t,a){
var s=r(a);
if(n(t,l,s)){
var u=G(),c=i(t),p="mutation "+t.type+u;
k(f,p,e),f.log("%c prev state","color: #9E9E9E; font-weight: bold",o(l)),f.log("%c mutation","color: #03A9F4; font-weight: bold",c),
f.log("%c next state","color: #4CAF50; font-weight: bold",o(s)),S(f);
}
l=s;
}),c&&t.subscribeAction(function(t,n){
if(a(t,n)){
var r=G(),o=s(t),i="action "+t.type+r;
k(f,i,e),f.log("%c action","color: #03A9F4; font-weight: bold",o),S(f);
}
}));
};
}
function k(t,e,n){
var r=n?t.groupCollapsed:t.group;
try{
r.call(t,e);
}catch(o){
t.log(e);
}
}
function S(t){
try{
t.groupEnd();
}catch(e){
t.log("—— log end ——");
}
}
function G(){
var t=new Date;
return" @ "+P(t.getHours(),2)+":"+P(t.getMinutes(),2)+":"+P(t.getSeconds(),2)+"."+P(t.getMilliseconds(),3);
}
function N(t,e){
return new Array(e+1).join(t);
}
function P(t,e){
return N("0",e-t.toString().length)+t;
}
var V="undefined"!=typeof window?window:"undefined"!=typeof global?global:{},L=V.__VUE_DEVTOOLS_GLOBAL_HOOK__,H=function(t,e){
this.runtime=e,this._children=Object.create(null),this._rawModule=t;
var n=t.state;
this.state=("function"==typeof n?n():n)||{};
},F={
namespaced:{
configurable:!0
}
};
F.namespaced.get=function(){
return!!this._rawModule.namespaced;
},H.prototype.addChild=function(t,e){
this._children[t]=e;
},H.prototype.removeChild=function(t){
delete this._children[t];
},H.prototype.getChild=function(t){
return this._children[t];
},H.prototype.hasChild=function(t){
return t in this._children;
},H.prototype.update=function(t){
this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),
t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters);
},H.prototype.forEachChild=function(t){
o(this._children,t);
},H.prototype.forEachGetter=function(t){
this._rawModule.getters&&o(this._rawModule.getters,t);
},H.prototype.forEachAction=function(t){
this._rawModule.actions&&o(this._rawModule.actions,t);
},H.prototype.forEachMutation=function(t){
this._rawModule.mutations&&o(this._rawModule.mutations,t);
},Object.defineProperties(H.prototype,F);
var T=function(t){
this.register([],t,!1);
};
T.prototype.get=function(t){
return t.reduce(function(t,e){
return t.getChild(e);
},this.root);
},T.prototype.getNamespace=function(t){
var e=this.root;
return t.reduce(function(t,n){
return e=e.getChild(n),t+(e.namespaced?n+"/":"");
},"");
},T.prototype.update=function(t){
c([],this.root,t);
},T.prototype.register=function(t,e,n){
var r=this;
void 0===n&&(n=!0),f(t,e);
var i=new H(e,n);
if(0===t.length)this.root=i;else{
var a=this.get(t.slice(0,-1));
a.addChild(t[t.length-1],i);
}
e.modules&&o(e.modules,function(e,o){
r.register(t.concat(o),e,n);
});
},T.prototype.unregister=function(t){
var e=this.get(t.slice(0,-1)),n=t[t.length-1],r=e.getChild(n);
return r?void(r.runtime&&e.removeChild(n)):void console.warn("[vuex] trying to unregister module '"+n+"', which is not registered");
},T.prototype.isRegistered=function(t){
var e=this.get(t.slice(0,-1)),n=t[t.length-1];
return e.hasChild(n);
};
var U,D={
assert:function(t){
return"function"==typeof t;
},
expected:"function"
},R={
assert:function(t){
return"function"==typeof t||"object"===("undefined"==typeof t?"undefined":_typeof(t))&&"function"==typeof t.handler;
},
expected:'function or object with "handler" function'
},q={
getters:D,
mutations:D,
actions:R
},B=function Y(t){
var n=this;
void 0===t&&(t={}),!U&&"undefined"!=typeof window&&window.Vue&&j(window.Vue),s(U,"must call Vue.use(Vuex) before creating a store instance."),
s("undefined"!=typeof Promise,"vuex requires a Promise polyfill in this browser."),
s(this instanceof Y,"store must be called with the new operator.");
var r=t.plugins;
void 0===r&&(r=[]);
var o=t.strict;
void 0===o&&(o=!1),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],
this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new T(t),
this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new U,
this._makeLocalGettersCache=Object.create(null);
var i=this,a=this,u=a.dispatch,c=a.commit;
this.dispatch=function(t,e){
return u.call(i,t,e);
},this.commit=function(t,e,n){
return c.call(i,t,e,n);
},this.strict=o;
var f=this._modules.root.state;
m(this,f,[],this._modules.root),h(this,f),r.forEach(function(t){
return t(n);
});
var l=void 0!==t.devtools?t.devtools:U.config.devtools;
l&&e(this);
},J={
state:{
configurable:!0
}
};
J.state.get=function(){
return this._vm._data.$$state;
},J.state.set=function(){
s(!1,"use store.replaceState() to explicit replace store state.");
},B.prototype.commit=function(t,e,n){
var r=this,o=A(t,e,n),i=o.type,a=o.payload,s=o.options,u={
type:i,
payload:a
},c=this._mutations[i];
return c?(this._withCommit(function(){
c.forEach(function(t){
t(a);
});
}),this._subscribers.slice().forEach(function(t){
return t(u,r.state);
}),void(s&&s.silent&&console.warn("[vuex] mutation type: "+i+". Silent option has been removed. Use the filter functionality in the vue-devtools"))):void console.error("[vuex] unknown mutation type: "+i);
},B.prototype.dispatch=function(t,e){
var n=this,r=A(t,e),o=r.type,i=r.payload,a={
type:o,
payload:i
},s=this._actions[o];
if(!s)return void console.error("[vuex] unknown action type: "+o);
try{
this._actionSubscribers.slice().filter(function(t){
return t.before;
}).forEach(function(t){
return t.before(a,n.state);
});
}catch(u){
console.warn("[vuex] error in before action subscribers: "),console.error(u);
}
var c=s.length>1?Promise.all(s.map(function(t){
return t(i);
})):s[0](i);
return new Promise(function(t,e){
c.then(function(e){
try{
n._actionSubscribers.filter(function(t){
return t.after;
}).forEach(function(t){
return t.after(a,n.state);
});
}catch(r){
console.warn("[vuex] error in after action subscribers: "),console.error(r);
}
t(e);
},function(t){
try{
n._actionSubscribers.filter(function(t){
return t.error;
}).forEach(function(e){
return e.error(a,n.state,t);
});
}catch(r){
console.warn("[vuex] error in error action subscribers: "),console.error(r);
}
e(t);
});
});
},B.prototype.subscribe=function(t,e){
return p(t,this._subscribers,e);
},B.prototype.subscribeAction=function(t,e){
var n="function"==typeof t?{
before:t
}:t;
return p(n,this._actionSubscribers,e);
},B.prototype.watch=function(t,e,n){
var r=this;
return s("function"==typeof t,"store.watch only accepts a function."),this._watcherVM.$watch(function(){
return t(r.state,r.getters);
},e,n);
},B.prototype.replaceState=function(t){
var e=this;
this._withCommit(function(){
e._vm._data.$$state=t;
});
},B.prototype.registerModule=function(t,e,n){
void 0===n&&(n={}),"string"==typeof t&&(t=[t]),s(Array.isArray(t),"module path must be a string or an Array."),
s(t.length>0,"cannot register the root module by using registerModule."),this._modules.register(t,e),
m(this,this.state,t,this._modules.get(t),n.preserveState),h(this,this.state);
},B.prototype.unregisterModule=function(t){
var e=this;
"string"==typeof t&&(t=[t]),s(Array.isArray(t),"module path must be a string or an Array."),
this._modules.unregister(t),this._withCommit(function(){
var n=x(e.state,t.slice(0,-1));
U.delete(n,t[t.length-1]);
}),d(this);
},B.prototype.hasModule=function(t){
return"string"==typeof t&&(t=[t]),s(Array.isArray(t),"module path must be a string or an Array."),
this._modules.isRegistered(t);
},B.prototype.hotUpdate=function(t){
this._modules.update(t),d(this,!0);
},B.prototype._withCommit=function(t){
var e=this._committing;
this._committing=!0,t(),this._committing=e;
},Object.defineProperties(B.prototype,J);
var K=$(function(t,e){
var n={};
return M(e)||console.error("[vuex] mapState: mapper parameter must be either an Array or an Object"),
O(e).forEach(function(e){
var r=e.key,o=e.val;
n[r]=function(){
var e=this.$store.state,n=this.$store.getters;
if(t){
var r=E(this.$store,"mapState",t);
if(!r)return;
e=r.context.state,n=r.context.getters;
}
return"function"==typeof o?o.call(this,e,n):e[o];
},n[r].vuex=!0;
}),n;
}),z=$(function(t,e){
var n={};
return M(e)||console.error("[vuex] mapMutations: mapper parameter must be either an Array or an Object"),
O(e).forEach(function(e){
var r=e.key,o=e.val;
n[r]=function(){
for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];
var r=this.$store.commit;
if(t){
var i=E(this.$store,"mapMutations",t);
if(!i)return;
r=i.context.commit;
}
return"function"==typeof o?o.apply(this,[r].concat(e)):r.apply(this.$store,[o].concat(e));
};
}),n;
}),I=$(function(t,e){
var n={};
return M(e)||console.error("[vuex] mapGetters: mapper parameter must be either an Array or an Object"),
O(e).forEach(function(e){
var r=e.key,o=e.val;
o=t+o,n[r]=function(){
return!t||E(this.$store,"mapGetters",t)?o in this.$store.getters?this.$store.getters[o]:void console.error("[vuex] unknown getter: "+o):void 0;
},n[r].vuex=!0;
}),n;
}),Q=$(function(t,e){
var n={};
return M(e)||console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object"),
O(e).forEach(function(e){
var r=e.key,o=e.val;
n[r]=function(){
for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];
var r=this.$store.dispatch;
if(t){
var i=E(this.$store,"mapActions",t);
if(!i)return;
r=i.context.dispatch;
}
return"function"==typeof o?o.apply(this,[r].concat(e)):r.apply(this.$store,[o].concat(e));
};
}),n;
}),W=function(t){
return{
mapState:K.bind(null,t),
mapGetters:I.bind(null,t),
mapMutations:z.bind(null,t),
mapActions:Q.bind(null,t)
};
},X={
Store:B,
install:j,
version:"3.5.1",
mapState:K,
mapMutations:z,
mapGetters:I,
mapActions:Q,
createNamespacedHelpers:W,
createLogger:C
};
return X;
});var _extends=Object.assign||function(n){
for(var e=1;e<arguments.length;e++){
var t=arguments[e];
for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);
}
return n;
};
define("appmsg/comment/comment_report.js",["common/comm_report.js"],function(n){
"use strict";
var e=n("common/comm_report.js"),t=void 0;
switch(1*window.item_show_type){
case 5:
t=1;
break;

case 7:
t=2;
break;

case 8:
t=3;
break;

case 10:
t=4;
break;

case 0:
case 9:
case 11:
default:
t=0;
}
return{
report22214:function(n){
return function(t){
return e.report(22214,_extends({},n,t));
};
}({
BizUin:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
AppMsgItemIdx:window.parseInt(window.idx,10)||0,
Scene:t,
EnterId:window.parseInt(window.enterid,10)||0,
CommentId64Bit:window.parseInt(window.comment_id,10)||0
}),
report22215:function(n){
return function(t){
return e.report(22215,_extends({},n,t));
};
}({
BizUin:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
AppMsgItemIdx:window.parseInt(window.idx,10)||0,
Scene:t,
EnterId:window.parseInt(window.enterid,10)||0,
CommentId64Bit:window.parseInt(window.comment_id,10)||0
})
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
function _classCallCheck(e,t){
if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function e(e,t){
for(var n=0;n<t.length;n++){
var i=t[n];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);
}
}
return function(t,n,i){
return n&&e(t.prototype,n),i&&e(t,i),t;
};
}();
define("appmsg/emotion/emotion_panel.js",["widget/wx-widget/wx_emotion_panel.css","biz_wap/jsapi/core.js","biz_common/dom/event.js","appmsg/emotion/weemoji.js","biz_wap/utils/mmversion.js","appmsg/emotion/selection.js","appmsg/comment/comment_input/comment_input.js"],function(require,exports,module,alert){
"use strict";
require("widget/wx-widget/wx_emotion_panel.css");
var JSAPI=require("biz_wap/jsapi/core.js"),DomEvent=require("biz_common/dom/event.js"),weEmoji=require("appmsg/emotion/weemoji.js"),emojiData=weEmoji.EmojiData||[],panelData=weEmoji.EmojiPanelData||[],mmversion=require("biz_wap/utils/mmversion.js"),Selection=require("appmsg/emotion/selection.js"),CommentInput=require("appmsg/comment/comment_input/comment_input.js"),emotionPanelList=[],EmotionPanel=function(){
function EmotionPanel(e){
switch(_classCallCheck(this,EmotionPanel),this.isShow=!1,this.opt=e,this.__bindEvent(),
e.type){
case"contenteditable":
this.valueKey="innerHTML",this.lastRange=null,this.__bindContenteditableEvent();
break;

default:
this.valueKey="value",this.selectionStart=-1,this.selectionEnd=-1,this.__bindInputEvent();
}
this.limit=e.limit,mmversion.isAndroid&&this.__initEmojiPanel(),emotionPanelList.push(this);
}
return _createClass(EmotionPanel,[{
key:"show",
value:function(){
var e=this;
if(!this.isShow){
var t=this.opt.input;
"contenteditable"!==this.opt.type&&(this.selectionStart=t.selectionStart,this.selectionEnd=t.selectionEnd),
mmversion.isIOS?JSAPI.invoke("showSmileyPanel",{
hidden:!1,
duration:.01
},function(t){
/:ok$/.test(t.err_msg)&&(e.isShow=!0,"function"==typeof e.opt.onShow&&e.opt.onShow(t.height));
}):(t.blur(),JSAPI.invoke("handleDeviceInfo",{
action:"hideKeyBoard"
},function(){}),setTimeout(function(){
e.panel.style.display="",e.isShow=!0,"function"==typeof e.opt.onShow&&e.opt.onShow(e.panel.offsetHeight);
},200));
}
}
},{
key:"hide",
value:function(){
var e=this;
this.isShow&&(mmversion.isIOS?JSAPI.invoke("showSmileyPanel",{
hidden:!0
},function(t){
/:ok$/.test(t.err_msg)&&(e.isShow=!1,"function"==typeof e.opt.onHide&&e.opt.onHide());
}):(this.panel.style.display="none",this.isShow=!1,"function"==typeof this.opt.onHide&&this.opt.onHide(),
JSAPI.invoke("handleDeviceInfo",{
action:"hideKeyBoard"
},function(){})));
}
},{
key:"toggle",
value:function(){
this[this.isShow?"hide":"show"]();
}
},{
key:"setLimit",
value:function(e){
this.limit=e;
}
},{
key:"restoreRange",
value:function(){
if(this.lastRange)if("contenteditable"===this.opt.type){
var e=Selection.getSelection(),t=document.createRange();
t.setStart(this.lastRange.endContainer,this.lastRange.endOffset),t.setEnd(this.lastRange.endContainer,this.lastRange.endOffset),
e.removeAllRanges(),e.addRange(t);
}else{
var e=Selection.getSelection();
if(e.addRange)e.removeAllRanges(),e.addRange(this.lastRange);else{
var t=Selection.getRange();
t.setEndPoint&&(t.setEndPoint("EndToEnd",this.lastRange),t.setEndPoint("StartToStart",this.lastRange)),
t.select();
}
}else if("contenteditable"===this.opt.type){
var e=Selection.getSelection();
e.selectAllChildren(this.opt.input),e.collapseToEnd();
}else{
var n=this.opt.input,i=n.value.length;
n.setSelectionRange(i,i);
}
this.__saveRange();
}
},{
key:"__bindEvent",
value:function(){
var e=this;
DomEvent.on(this.opt.input,"touchstart",function(){
e.hide();
});
}
},{
key:"__bindInputEvent",
value:function(){
var e=this;
DomEvent.on(this.opt.input,"focus",function(){
-1!==e.selectionStart&&-1!==e.selectionEnd&&(e.opt.input.setSelectionRange(e.selectionStart,e.selectionStart===e.selectionEnd?e.selectionStart:e.selectionEnd),
e.selectionStart=-1,e.selectionEnd=-1);
});
}
},{
key:"__bindContenteditableEvent",
value:function(){
var e=this;
DomEvent.on(this.opt.input,"input",function(){
e.__saveRange();
}),DomEvent.on(this.opt.input,"keyup",function(){
e.__saveRange();
}),DomEvent.on(this.opt.input,"mouseup",function(){
e.__saveRange();
});
var t=null;
DomEvent.on(this.opt.input,"paste",function(){
t&&clearTimeout(t),t=setTimeout(function(){
Selection.setCursorToEnd(CommentInput.FilterNode(e.opt.input,!0)),e.__saveRange();
},10);
});
}
},{
key:"__saveRange",
value:function(e){
this.lastRange=e||Selection.getRange();
}
},{
key:"__getContent",
value:function(e,t){
return this.opt.input[this.valueKey].substring(e,t);
}
},{
key:"__setInputValue",
value:function(e,t){
var n=this,i=this.opt.input;
if(this.opt.vueOpt){
var o=this.opt.vueOpt;
o.instance[o.key]=e,o.instance.$nextTick(function(){
n.__setSelectionRange(t);
});
}else i[this.valueKey]=e,this.__setSelectionRange(t);
}
},{
key:"__setSelectionRange",
value:function(e){
var t=this.opt.input;
if("contenteditable"===this.opt.type){
var n=(e||t.childNodes.length-1+"_").split("_").map(function(e,n,i){
return 1===n&&""===e?t.childNodes[1*i[0]].nodeValue.length:+e;
});
this.__saveRange({
endContainer:t.childNodes[n[0]],
endOffset:n[1]
});
}else this.selectionStart=e,this.selectionEnd=e;
}
},{
key:"__insertContent",
value:function(e){
var t=this;
if(this.opt.input){
var n=this.opt.input,i="",o="",a=void 0,s=void 0;
"contenteditable"===this.opt.type?!function(){
var l=-1;
Array.prototype.forEach.call(n.childNodes,function(e,n){
t.lastRange?-1===l?e===t.lastRange.endContainer?1===e.nodeType?(l=n+1,i+=e.outerHTML):(l=n,
i+=e.nodeValue.slice(0,t.lastRange.endOffset),o+=e.nodeValue.slice(t.lastRange.endOffset)):i+=1===e.nodeType?e.outerHTML:e.nodeValue:o+=1===e.nodeType?e.outerHTML:e.nodeValue:i+=1===e.nodeType?e.outerHTML:e.nodeValue;
}),a=i+e+o,s=t.lastRange&&-1!==l?l+"_"+(t.lastRange.endOffset+e.length):"";
}():(i=this.__getContent(0,this.selectionStart),o=this.__getContent(this.selectionEnd),
a=i+e+o,s=this.selectionStart+e.length);
var l=this.opt.counter?this.opt.counter(a):a.length;
if(0!==this.limit&&l>this.limit)return;
this.__setInputValue(EmotionPanel.__filterContent(a),s);
}
}
},{
key:"__delContent",
value:function(){
var e=this;
if(this.opt.input){
var t=this.opt.input,n="",i="";
if("contenteditable"===this.opt.type){
var o=function(){
var o=-1;
if(e.lastRange?Array.prototype.some.call(t.childNodes,function(t){
return o++,t===e.lastRange.endContainer?!0:!1;
}):o=t.childNodes.length-1,-1===o)return{
v:void 0
};
var a=t.childNodes[o];
if(1===a.nodeType)if(t.removeChild(a),0===t.childNodes.length)e.lastRange=null;else{
var s=o,l=void 0;
o?(s--,l=3===t.childNodes[s].nodeType?t.childNodes[s].nodeValue.length:0):l=0,e.__saveRange({
endContainer:t.childNodes[s],
endOffset:l
});
}else{
var u=a.nodeValue;
if(u){
if(0===o&&0===e.lastRange.endOffset)return{
v:void 0
};
e.lastRange?(n=u.slice(0,e.lastRange.endOffset),i=u.slice(e.lastRange.endOffset)):(n=u,
i="");
var r=EmotionPanel.__delEmojiText(n,i),l=void 0;
null===r.value?(a.nodeValue=n.replace(/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])$/,""),
l=a.nodeValue.length,a.nodeValue+=i):(l=e.lastRange.endOffset-r.length,a.nodeValue=r.value),
e.__saveRange({
endContainer:t.childNodes[o],
endOffset:l
});
}else if(o){
t.removeChild(a);
var c=t.childNodes[o-1];
e.__saveRange({
endContainer:c,
endOffset:3===c.nodeType?c.nodeValue.length:0
}),e.__delContent();
}
}
}();
if("object"===("undefined"==typeof o?"undefined":_typeof(o)))return o.v;
}else{
n=this.__getContent(0,this.selectionStart),i=this.__getContent(this.selectionEnd);
var a=void 0,s=void 0;
if(this.selectionStart===this.selectionEnd){
var l=EmotionPanel.__delEmojiText(n,i);
null===l.value?(a=n.replace(/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])$/,""),
s=a.length,a+=i):(a=l.value,s=this.selectionStart-l.length);
}else a=n+i,s=this.selectionStart;
this.__setInputValue(EmotionPanel.__filterContent(a),s);
}
}
}
},{
key:"__initEmojiPanel",
value:function(){
for(var e=this,t="comment_primary_emotion_list_mobile_grid",n=[],i={},o=0;o<panelData.length;o++)for(var a=0;a<emojiData.length;a++)if(emojiData[a].key===panelData[o].key){
n.push({
name:emojiData[a].style,
title:emojiData[a].cn,
key:emojiData[a].key
});
break;
}
for(var o=0;o<n.length;o++)i[n[o].name]=n[o].title;
var s=document.createDocumentFragment();
this.panel=document.createElement("div"),this.panel.className="comment_primary_emotion_list_mobile_wrp js_no_set_font_size "+t,
this.panel.style.display="none",this.panelTitle=document.createElement("div"),this.panelTitle.innerHTML="全部表情",
this.panelTitle.className="comment_primary_emotion_list_mobile_title",this.panel.appendChild(this.panelTitle),
this.panelInner=document.createElement("ul"),this.panelInner.className="comment_primary_emotion_list_mobile",
this.panel.appendChild(this.panelInner),this.panelDelWrp=document.createElement("div"),
this.panelDelWrp.className="comment_primary_emotion_list_mobile_del_btn_wrp",this.panelDel=document.createElement("button"),
this.panelDel.className="reset_btn comment_primary_emotion_list_mobile_del_btn",
this.panelDel.innerHTML="删除",this.panelDelWrp.appendChild(this.panelDel),this.panel.appendChild(this.panelDelWrp),
s.appendChild(this.panel),n.forEach(function(t,n){
var i=document.createElement("li"),o=document.createElement("span");
i.className="comment_primary_emotion_item js_emotion_item",i.setAttribute("data-index",n),
o.className="js_comment_primary_emotion comment_primary_emotion we-emoji "+t.name,
o.setAttribute("text-name",t.name),o.setAttribute("role","button"),o.setAttribute("title",t.title),
i.appendChild(o),e.panelInner.appendChild(i);
}),document.body.appendChild(this.panel);
var l=void 0;
DomEvent.on(this.panel,"touchstart",function(e){
l=e.changedTouches[0].clientY;
}),DomEvent.on(this.panel,"touchmove",function(t){
var n=t.changedTouches[0].clientY,i=e.panel.scrollTop,o=e.panel.scrollHeight,a=e.panel.clientHeight;
(.5>i&&n>l||.5>o-i-a&&l>n)&&t.preventDefault(),"function"==typeof e.opt.onTouchmove&&e.opt.onTouchmove(t);
}),DomEvent.on(this.panel,"click",function(t){
if(console.log("click",t),t.target.className.indexOf("js_comment_primary_emotion")>-1){
var n=t.target.getAttribute("text-name"),o=i[n];
o&&e.__insertContent(o),"function"==typeof e.opt.onChange&&e.opt.onChange({
type:"emotion",
value:n,
text:o
});
}
}),DomEvent.on(this.panelDelWrp,"touchmove",function(e){
e.preventDefault();
}),DomEvent.on(this.panelDel,"click",function(){
emotionPanelList.some(function(e){
return e.isShow?(e.__delContent(),!0):!1;
});
});
}
}],[{
key:"__filterContent",
value:function(e){
var t=e;
return t;
}
},{
key:"__getEmojiText",
value:function __getEmojiText(emoji){
for(var i=0;i<emojiData.length;i++){
var e=emojiData[i];
switch(emoji){
case e.cn:
return e.emoji||e.cn;

case e.hk:
return e.emoji||e.hk;

case e.us:
return e.emoji||e.us;

case e.emoji:
return e.emoji;

case e.code:
return e.emoji||e.cn;

default:
if(!mmversion.isIOS&&e.code.startsWith("\\ue"))try{
var c=eval("'"+e.code+"'");
if(emoji===c)return e.emoji||e.cn;
}catch(err){}
}
}
return"";
}
},{
key:"__delEmojiText",
value:function(e,t){
for(var n=null,i=0;i<emojiData.length;i++){
var o=emojiData[i];
if(o.cn&&e.endsWith(o.cn)){
n=o.cn.length;
break;
}
if(o.hk&&e.endsWith(o.hk)){
n=o.hk.length;
break;
}
if(o.us&&e.endsWith(o.us)){
n=o.us.length;
break;
}
if(o.emoji&&e.endsWith(o.emoji)){
n=o.emoji.length;
break;
}
}
return{
value:null===n?null:e.substring(0,e.length-n)+t,
length:n
};
}
}]),EmotionPanel;
}();
return mmversion.isIOS&&!function(){
var e=function(e,t,n){
"function"==typeof n&&n(),"function"==typeof e.opt.onChange&&e.opt.onChange(t);
};
JSAPI.on("onGetSmiley",function(t){
emotionPanelList.some(function(n){
if(n.isShow){
switch(t.smiley){
case"[DELETE_EMOTION]":
e(n,{
type:"action",
value:"del"
},function(){
n.__delContent();
});
break;

case"[DONE_EMOTION]":
e(n,{
type:"action",
value:"done"
},function(){
n.isShow=!1;
});
break;

default:
var i=EmotionPanel.__getEmojiText(t.smiley);
e(n,{
type:"emotion",
value:t.smiley,
text:i
},function(){
i&&n.__insertContent(i);
});
}
return!0;
}
return!1;
});
});
}(),EmotionPanel;
});define("pages_new/modules/comment/utils.js",["appmsg/i18n.js","pages/utils.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
window.weui.alert(e,{
className:"weui-pop-zindex-primary"
});
}
function n(e){
return e=g.trim(e),_&&(e=e.replace(/<br\/>/g,"").replace(/\n/g,"")||""),Math.ceil(e.replace(/[^\x00-\xff]/g,"**").length/2);
}
function i(e){
return"comment"===e?600:140;
}
function o(e){
var o=arguments.length<=1||void 0===arguments[1]?"comment":arguments[1],a=n(e);
if(1>a)return t("comment"===o?"留言不能为空":"回复不能为空"),{
valid:!1
};
var r=i(o);
return a>r?(t("字数不能多于"+r+"个"),{
valid:!1
}):{
valid:!0,
content:e
};
}
function a(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var i=t/1e3-e,o=n/1e3-e,a=new Date(n).getFullYear(),r=new Date(1e3*e);
return 3600>i?Math.ceil(i/60)+"分钟前":86400>o?Math.floor(i/60/60)+"小时前":172800>o?"昨天":604800>o?Math.floor(o/24/60/60)+"天前":r.getFullYear()===a?r.getMonth()+1+"月"+r.getDate()+"日":r.getFullYear()+"年"+(r.getMonth()+1)+"月"+r.getDate()+"日";
}
function r(e){
var t=e||y;
return t.indexOf("wx.qlogo.cn")>-1?t.replace(/\/132$/,"/96"):t;
}
function s(e){
return e.replace("‮","");
}
function u(e){
return e=parseInt(e,10)>=1e4?(e/1e4).toFixed(1)+"万":e,"en"===window.LANG?p.dealLikeReadShow_en(e):e;
}
function c(e,t,n){
var i=null;
return e.some(function(e){
return e[t]===n?(i=e,!0):!1;
}),i;
}
function l(e){
null===T&&null===C&&(T=document.createElement("input"),T.setAttribute("aria-hidden","true"),
T.style.cssText="position: absolute; left: -999999px;",T.readOnly=!0,document.body.appendChild(T),
C=document.createElement("button"),C.setAttribute("aria-hidden","true"),C.style.cssText="position: absolute; left: -999999px;",
document.body.appendChild(C),C.addEventListener("click",function(){
document.queryCommandEnabled("copy")?(document.execCommand("copy"),window.weui.toast("复制成功",750)):t("复制失败");
})),T.value=e,T.select(),T.setSelectionRange(0,e.length),C.click();
}
function d(e){
var t=arguments.length<=1||void 0===arguments[1]?6:arguments[1],n="",i=0,o=0,a=e.length,r=!0,s=!1,u=void 0;
try{
for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done);r=!0){
var d=c.value;
if(o>=t)break;
/\w/.test(d)?(o+=.5,n+=d):(o++,t>=o&&(n+=d)),i++;
}
}catch(m){
s=!0,u=m;
}finally{
try{
!r&&l.return&&l.return();
}finally{
if(s)throw u;
}
}
return n+(a>i?"...":"");
}
function m(){
var e=arguments.length<=0||void 0===arguments[0]?1:arguments[0],t=90===Math.abs(window.orientation);
return!v.isIPad&&v.isWechat&&b.invoke("handleDeviceInfo",{
action:"setOrientation",
orientation:0,
lock:!0
},function(n){
n.err_msg&&-1!==n.err_msg.indexOf("ok")&&t&&window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&window.WX_BJ_REPORT.BadJs.report("force horizontal screen","biz: "+("function"==typeof window.atob?window.atob(window.biz):window.biz)+" | mid: "+window.mid+" | idx: "+window.idx+" | action: "+e,{
mid:"mmbizwap:horizontal_screen",
view:"wap_business"
});
}),t;
}
function w(){
!v.isIPad&&v.isWechat&&b.invoke("handleDeviceInfo",{
action:"setOrientation",
orientation:0,
lock:!1
},function(){});
}
var p=e("appmsg/i18n.js"),g=e("pages/utils.js"),f=e("biz_wap/utils/device.js"),v=e("biz_wap/utils/mmversion.js"),b=e("biz_wap/jsapi/core.js"),h=v.is_wxwork,_=f.os.pc&&!h,y="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",z=100,x=10,j=2,k=10,T=null,C=null;
return{
FETCH_CMT_LEN:z,
FETCH_RPY_LEN:x,
LIST_LIMIT:j,
REMIND_WORD_COUNT:k,
validContent:o,
dateToString:a,
parseHeadimg:r,
replaceUnico:s,
formatLikeNum:u,
getDataByKey:c,
newAlert:t,
execCommandCopy:l,
getLength:n,
getLimit:i,
sliceNickname:d,
lockOrientation:m,
unlockOrientation:w
};
});define("appmsg/comment_report.js",["biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_wap/utils/storage.js","common/utils.js","biz_common/dom/offset.js"],function(e){
"use strict";
function t(){
if(!i&&(i=!0,setTimeout(function(){
i=!1;
},20),o||(o=document.getElementById("js_cmt_area")))){
var e=d.getInnerHeight(),t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,m=o.querySelectorAll(".js_comment_item");
if(n=p.getOffset(o).offsetTop,m.length)for(var s=0;s<m.length&&n+m[s].offsetTop<t+e;s++)1!=m[s].getAttribute("data-hasreport")&&(m[s].setAttribute("data-hasreport",1),
_.data.push({
content_id:m[s].dataset.content_id,
is_elected_comment:1,
is_friend_comment:1*m[s].dataset.friend,
scene:1
}));
c.set("comment_expose",_,Date.now()+6048e5);
}
}
var o,n,i,m=e("biz_wap/utils/ajax.js"),s=e("biz_common/dom/event.js"),a=e("biz_wap/utils/storage.js"),d=e("common/utils.js"),c=new a("comment_expose"),p=e("biz_common/dom/offset.js"),_={
data:[],
appmsgid:"",
comment_id:"",
idx:"",
item_show_type:0,
biz:""
},r=function(e){
e&&e.data&&e.data.length&&(u(e),c.remove("comment_expose"));
},u=function(e){
m({
type:"post",
url:"/mp/appmsg_comment?action=exposurecomment",
data:{
comment_id:e.comment_id,
appmsgid:e.appmsgid,
idx:e.idx,
item_show_type:e.item_show_type,
__biz:e.biz,
data:JSON.stringify(e.data),
enterid:window.enterid,
sessionid:window.sessionid
},
async:!1,
timeout:2e3
});
};
s.on(window,"scroll",t),s.on(window,"unload",function(){
r(_);
}),s.on(window,"load",function(){
var e=c.getData("comment_expose");
e&&e.comment_expose&&e.comment_expose.val&&e.comment_expose.val.appmsgid&&r(e.comment_expose.val),
t();
});
var f=function(e){
_.comment_id=e.comment_id,_.appmsgid=e.appmsgid,_.idx=e.idx,_.item_show_type=e.item_show_type||0,
_.biz=e.biz,setTimeout(function(){
t();
});
};
return f;
});function _defineProperty(e,t,o){
return t in e?Object.defineProperty(e,t,{
value:o,
enumerable:!0,
configurable:!0,
writable:!0
}):e[t]=o,e;
}
define("pages_new/modules/comment/dialog/unsupport.js",["pages_new/modules/bottom_modal/bottom_modal.js","pages_new/modules/comment/dialog/unsupport.html.js","biz_wap/utils/jsmonitor_report.js","biz_wap/utils/mmversion.js","pages/utils.js"],function(e){
"use strict";
var t=e("pages_new/modules/bottom_modal/bottom_modal.js"),o=e("pages_new/modules/comment/dialog/unsupport.html.js"),s=e("biz_wap/utils/jsmonitor_report.js"),n=e("biz_wap/utils/mmversion.js"),m=e("pages/utils.js"),i="https://itunes.apple.com/cn/app/id414478124?mt=8&ls=1",p="https://support.weixin.qq.com/update/";
return{
name:"mp-comment-c2c-unsupport-dialog",
template:o,
components:_defineProperty({},t.name,t),
data:function(){
return{
commentC2cUnsupportedImg:window.comment_c2c_not_support_img
};
},
methods:{
show:function(){
this.$refs.modal.show();
},
hide:function(){
this.$refs.modal.hide();
},
update:function(){
s.setSum(110809,52,1),m.jumpUrl(n.isIOS?i:p,!0),this.hide();
}
}
};
});function _defineProperty(t,e,i){
return e in t?Object.defineProperty(t,e,{
value:i,
enumerable:!0,
configurable:!0,
writable:!0
}):t[e]=i,t;
}
var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var i=arguments[e];
for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s]);
}
return t;
};
define("pages_new/modules/comment/dialog/dialog.js",["pages/utils.js","common/utils.js","pages/scrollY.js","common/keyboard.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","pages_new/modules/comment/utils.js","pages_new/modules/comment/write_dialog/write_dialog.js","pages_new/modules/comment/list/list.js","pages_new/modules/bottom_modal/bottom_modal.js","pages_new/modules/comment/dialog/dialog.html.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","appmsg/set_font_size.js","appmsg/comment/comment_report.js","pages_new/3rd/vuex.js"],function(t){
"use strict";
var e,i=t("pages/utils.js"),s=t("common/utils.js"),o=t("pages/scrollY.js"),n=t("common/keyboard.js"),a=t("biz_wap/utils/ajax.js"),l=t("biz_common/utils/url/parse.js"),r=t("pages_new/modules/comment/utils.js"),c=t("pages_new/modules/comment/write_dialog/write_dialog.js"),p=t("pages_new/modules/comment/list/list.js"),d=t("pages_new/modules/bottom_modal/bottom_modal.js"),m=t("pages_new/modules/comment/dialog/dialog.html.js"),u=t("biz_wap/utils/mmversion.js"),h=t("biz_wap/utils/device.js"),f=t("appmsg/set_font_size.js"),y=t("appmsg/comment/comment_report.js"),g=y.report22214,_=t("pages_new/3rd/vuex.js"),L=_.mapState,v=_.mapGetters,x=h.os.pc&&!u.is_wxwork,D="page_no_scroll";
return{
name:"mp-comment-dialog",
template:m,
components:(e={},_defineProperty(e,c.name,c),_defineProperty(e,p.name,p),_defineProperty(e,d.name,d),
e),
data:function(){
return{
deviceIsPc:x,
replyData:{},
myId2ContentIdMap:{},
replyListData:null,
cmtData:null,
cmtIdx:-1,
canCheckExposedStatus:!1,
dialogTop:-1,
dialogBottom:-1,
marginBottom:"",
loading:!1,
pcShow:!1,
dialogPaddingBottom:null,
placeholder:"",
showPlaceholder:!0
};
},
computed:_extends({},L("mp-comment",["isVoiceover"]),v("mp-comment",["commentId"]),{
cmtList:function(){
return[this.cmtData];
}
}),
created:function(){
var t=this;
f.onFontScaleChange(function(){
return t.setBdPaddingBottom();
}),u.isIOS&&document.addEventListener("visibilitychange",this.onVisibilitychange);
},
beforeDestroy:function(){
u.isIOS&&document.removeEventListener("visibilitychange",this.onVisibilitychange);
},
methods:{
getReplyList:function(t){
var e=this,i=t.success,s=t.getNextPage,o=void 0===s?!1:s,n=t.cmtData,c=void 0===n?this.cmtData:n,p=t.topReplyId,d=c.content_id;
new Promise(function(t,i){
var s=!0;
if(o||(null!==e.replyListData?(s=!1,t()):e.replyData[d]&&(e.replyListData=e.replyData[d],
s=!1,t())),s){
e.loading=!0;
var n=e.$store.state.cgiData,m={
action:"getcommentreply",
appmsgid:n.appmsgid,
idx:n.idx,
comment_id:e.commentId,
content_id:d,
id:c.id,
r:Math.random(),
limit:r.FETCH_RPY_LEN,
offset:o?e.replyListData.offset:0,
max_reply_id:o?e.replyListData.max_reply_id:c.reply_new.max_reply_id,
sessionid:n.sessionid||"",
enterid:parseInt(n.enterid,10)||0
};
void 0!==p&&(m.top_reply_id=p),a({
url:l.join("/mp/appmsg_comment",m,!0),
dataType:"json",
success:function(s){
if(s&&s.base_resp&&0===s.base_resp.ret){
var n=s.reply_list||{
reply_list:[]
};
o&&void 0!==e.replyListData.topReplyId&&(p=e.replyListData.topReplyId),void 0!==p&&(n.reply_list=n.reply_list.filter(function(t,e){
return!o&&0===e||t.reply_id!==p;
})),o?(e.replyListData.max_reply_id=n.max_reply_id,e.replyListData.reply_list=e.replyListData.reply_list.concat(n.reply_list),
e.replyListData.continue_flag=s.continue_flag,e.replyListData.offset=e.replyListData.offset+r.FETCH_RPY_LEN):(n.continue_flag=s.continue_flag,
n.offset=r.FETCH_RPY_LEN,void 0!==p&&(n.topReplyId=p),e.replyData[d]=n,e.myId2ContentIdMap[c.my_id]=d,
e.replyListData=n),t(n.reply_list),e.$emit("get-reply-list",d,n.reply_list);
}else i();
},
error:function(t){
console.error(t),i();
},
complete:function(){
e.loading=!1;
}
});
}
}).then(i,function(){
r.newAlert("系统错误，请稍后重试");
});
},
getScrollTop:function(){
return this.getModalRef().getScrollEle().scrollTop;
},
cancelAutoNext:function(t){
this.$store.dispatch("mp-video-player/auto-next-plugin/cancelAutoNext",t);
},
resumeAutoNext:function(){
this.$store.dispatch("mp-video-player/auto-next-plugin/resumeAutoNext");
},
show:function(t,e,s){
var o=this;
i.disableSelect(),this.cmtData=t,this.cmtIdx=e;
var n=t.content_id;
this.replyListData=this.replyData[n]||null,this.getReplyList({
success:function(){
console.log(o.replyListData),o.getModalRef().scrollTo(0,o.replyListData.scrollTop||0),
setTimeout(function(){
o.getModalRef().finishPullUpLoad();
},300);
},
topReplyId:s
});
var a=this.$store.state.cgiData;
1*a.item_show_type===5&&this.cancelAutoNext(4),this.placeholder="回复 "+r.sliceNickname(t.nick_name)+"：",
this.getModalRef().show();
},
hide:function(){
this.getModalRef().hide();
},
onPullUpLoad:function(){
var t=this;
this.replyListData&&this.replyListData.continue_flag&&this.getReplyList({
success:function(){
t.getModalRef().finishPullUpLoad();
},
getNextPage:!0
});
},
onShow:function(){
var t=this;
this.$nextTick(function(){
t.setBdPaddingBottom();
});
},
onHide:function(){
var t=this;
this.$set(this.replyListData,"scrollTop",this.getScrollTop()),this.$set(this.replyListData,"exposedStatus",{
comment:[],
reply:[]
}),[this.$refs.cmtSingleList.getItemList(),this.$refs.replyList.getItemList()].forEach(function(e,i){
var s=t.replyListData.exposedStatus[i?"reply":"comment"];
e.forEach(function(t){
var e=t.$el;
e.isExposed&&s.push(e.dataset[i?"replyId":"contentId"]);
});
}),this.canCheckExposedStatus=!1,this.replyListData=null,this.cmtData=null;
var e=this.$store.state.cgiData;
1*e.item_show_type===5&&this.resumeAutoNext(),this.getModalRef().finishPullUpLoad(),
i.enableSelect();
},
onShowAfterAnimation:function(){
this.canCheckExposedStatus=!0,this.checkExposedStatus();
},
onScroll:function(){
this.checkExposedStatus();
},
onPcSroll:function(){
this.getModalRef().checkReachBoundary(),this.checkExposedStatus();
},
setReplyLikeInfo:function(t){
var e=t.contentId,i=t.replyId,s=t.myId,o=t.likeStatus,n=t.likeNum;
void 0===e&&(e=this.myId2ContentIdMap[s]);
var a=this.replyData[e];
if(a){
var l=r.getDataByKey(a.reply_list,"reply_id",i);
l&&(l.reply_like_status=o,"number"!=typeof n&&(n=l.reply_like_num+(o?1:-1)),l.reply_like_num=n);
}
},
checkExposedStatus:function(){
var t=this;
if(this.canCheckExposedStatus){
if(-1===this.dialogTop||-1===this.dialogBottom){
var e=this.getModalRef().getScrollEle().getBoundingClientRect();
this.dialogTop=e.top,this.dialogBottom=e.bottom;
}
this.$refs.cmtSingleList&&this.$refs.replyList&&[this.$refs.cmtSingleList.getItemList(),this.$refs.replyList.getItemList()].forEach(function(e,i){
var s=t.$refs[i?"replyList":"cmtSingleList"];
e.some(function(e){
var i=e.$el;
if(!i.isExposed){
var o=i.getBoundingClientRect(),n=.5*o.height;
if(o.bottom>t.dialogTop+n&&o.top<t.dialogBottom-n){
i.isExposed=!0;
var a=i.dataset,l={
PersonalCommentId:1*a.myId,
ReplyId:0,
IsPopup:1,
IsReplyOther:0,
CommentReplyType:1
};
if(a.replyId){
var r=s.getData({
type:"reply",
contentId:a.contentId,
replyId:1*a.replyId
});
l.ReplyId=r.reply_id,l.IsReplyOther=r.to_nick_name&&r.to_content?1:0;
}
g(l);
}else if(o.top>=t.dialogBottom-n)return!0;
}
return!1;
});
});
}
},
scrollToComment:function(t){
var e=this,i=t.marginBottom,a=t.scrollDeltaY,l=t.shortDistance,r=t.replyEl,c=t.pageHeight,p=t.inputHeight;
this.marginBottom=i+"px";
var d={
el:this.getModalRef().$refs.contentAreaWrp,
y:this.getScrollTop()-a,
end:n.onlyUseH5Keyboard?function(){
var t=r.getBoundingClientRect().bottom,i=s.getInnerHeight();
i!==c&&Math.abs(t+p-i)>=3&&o.start({
el:e.getModalRef().$refs.contentAreaWrp,
distance:t+p-i,
duration:.1
});
}:null
};
l?d.speed=300:d.duration=.3,o.start(d);
},
resetScroll:function(){
this.marginBottom="";
},
cmtRender:function(){
var t=this;
this.replyListData&&this.replyListData.exposedStatus&&!function(){
var e=t.replyListData.exposedStatus.comment;
t.$refs.cmtSingleList.getItemList().forEach(function(t){
var i=t.$el;
e.indexOf(i.dataset.contentId)>-1&&(i.isExposed=!0);
});
}(),this.checkExposedStatus();
},
replyRender:function(){
var t=this;
this.replyListData&&this.replyListData.exposedStatus&&!function(){
var e=t.replyListData.exposedStatus.reply;
t.$refs.replyList.getItemList().forEach(function(t){
var i=t.$el;
e.indexOf(i.dataset.replyId)>-1&&(i.isExposed=!0);
});
}(),this.checkExposedStatus();
},
add:function(t,e,i){
if("undefined"==typeof e)this.replyListData.reply_list.unshift(i);else{
var s=this.$refs.replyList.getReplyIdx(t,e);
this.replyListData.reply_list.splice(s+1,0,i);
}
this.$emit("add",t,e,i);
},
praise:function(t,e,i){
if("undefined"==typeof e)this.cmtData.like_status=i,this.cmtData.like_num+=i?1:-1;else{
var s=this.$refs.replyList.getReplyIdx(t,e),o=this.replyListData.reply_list[s];
o&&(o.reply_like_status=i,o.reply_like_num+=i?1:-1);
}
this.$emit("praise",t,e,i);
},
remove:function(t,e){
if("undefined"==typeof e)this.hide();else{
var i=this.$refs.replyList.getReplyIdx(t,e);
this.replyListData.reply_list.splice(i,1);
}
this.$emit("remove",t,e);
},
getModalRef:function(){
var t=this;
return this.deviceIsPc?{
show:function(){
t.pcShow=!0,document.body.classList.add(D),t.canCheckExposedStatus=!0,t.checkExposedStatus();
},
hide:function(){
t.onHide(),t.pcShow=!1,document.body.classList.remove(D);
},
scrollTo:function(){
var e;
(e=t.$refs.pcContentAreaWrp).scrollTo.apply(e,arguments);
},
getScrollEle:function(){
return t.$refs.pcContentAreaWrp;
},
finishPullUpLoad:function(){
t.__pcPullingUpLock=!1;
},
checkReachBoundary:function(){
t.__pcScrollLock&&0!==t.$refs.pcContentAreaWrp.scrollTop||(t.__pcScrollLock=!0,setTimeout(function(){
t.__pcScrollLock=!1;
},50),setTimeout(function(){
!t.__pcScrollLock&&t.$refs.pcContentAreaWrp.scrollTop+t.$refs.pcContentAreaWrp.offsetHeight+100>t.$refs.pcContentEle.offsetHeight&&(t.onPullUpLoad(),
t.__pcScrollLock=!0);
},100));
}
}:this.$refs.bottomModal;
},
setBdPaddingBottom:function(){
this.$refs.placeholder&&(this.dialogPaddingBottom=this.$refs.placeholder.offsetHeight+"px");
},
onKeyboardShow:function(){
this.showPlaceholder=!1;
},
onKeyboardHide:function(){
this.showPlaceholder=!0;
},
onRemoveAnimation:function(t){
var e=this.replyListData.reply_list[t];
e&&(e.needAnimation=!1);
},
replyComment:function(t){
!this.isVoiceover&&this.onKeyboardShow(),this.$refs.cmtSingleList.commentReply("boolean"==typeof t?t:!1);
},
replyCommentWithEmotion:function(){
this.replyComment(!0);
},
onVisibilitychange:function(){
"hidden"===document.visibilityState&&this.hide(!0);
},
navShadowClick:function(){
this.$parent.$refs.commentDialog.hide();
}
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
var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);
}
return e;
};
define("pages_new/modules/comment/list/list.js",["biz_wap/utils/mmversion.js","pages_new/modules/comment/list/list.html.js","pages_new/modules/comment/utils.js","pages_new/modules/comment/list/item.js","pages_new/3rd/vuex.js"],function(e){
"use strict";
var t=e("biz_wap/utils/mmversion.js"),n=e("pages_new/modules/comment/list/list.html.js"),i=e("pages_new/modules/comment/utils.js"),r=e("pages_new/modules/comment/list/item.js"),o=e("pages_new/3rd/vuex.js"),s=o.mapState,m=o.mapGetters,a=o.mapActions,l=t.is_wxwork;
return{
name:"mp-comment-list",
template:n,
components:_defineProperty({},r.name,r),
props:{
list:{
type:Array,
required:!0
},
showAll:{
type:Boolean,
"default":!0
},
type:{
type:String,
"default":"mine"
},
cmtData:{
type:Object,
"default":null
},
cmtIdx:{
type:Number,
"default":-1
}
},
data:function(){
return{
count:0,
isWxWork:l
};
},
computed:_extends({},s("mp-comment",["reportData"]),m("mp-comment",["commentId","nickName","headImg","canC2cReply"]),{
scene:function(){
switch(this.type){
case"elected":
return 0;

default:
return"";
}
},
cookedList:function(){
var e=this;
return this.count=0,this.__checkCommentContents={},this.__checkCommentContentIds={},
this.list.map(function(t){
var n=void 0;
"reply"!==e.type?(n=e.cookItem(t),n.reply_new=_extends({},n.reply_new,{
reply_list:n.reply_new.reply_list.map(function(t){
return e.cookReplyItem(t);
})
})):n=e.cookReplyItem(t);
try{
e.checkIfCmtRepeated(n);
}catch(i){
console.error(i);
}
return n;
});
}
}),
mounted:function(){
var e=this;
this.$nextTick(function(){
e.$emit("render"),e.detectExtendCmt();
}),window.addEventListener("scroll",this.detectExtendCmt);
},
beforeDestroy:function(){
window.removeEventListener("scroll",this.detectExtendCmt);
},
methods:_extends({},a("mp-comment",["myReport"]),{
cookItem:function(e){
var t=_extends({},e);
return t.count=++this.count,t.time=i.dateToString(t.create_time),t.status="",t.content=t.content.htmlDecodeLite().htmlEncodeLite(),
t.nick_name=i.replaceUnico(t.nick_name.htmlDecodeLite().htmlEncodeLite()),t.is_from_friend=t.is_from_friend||0,
t.is_from_me="mine"===this.type?1:t.is_from_me||0,t.is_from_author=!1,t.is_from=t.is_from||0,
t.reply_new=t.reply_new||{
reply_list:[]
},t.is_elected="elected"===this.type?1:t.is_elected,t.report_elected=t.is_elected||0,
t.report_friend=t.is_from_friend||0,t.scene=this.scene,t.to_nick_name=t.to_nick_name||"",
t.to_content=(t.to_content||"").htmlDecodeLite().htmlEncodeLite(),t.like_num_format=i.formatLikeNum(t.like_num),
t.logo_url=i.parseHeadimg(t.logo_url),t.needAnimation=!!t.needAnimation,t;
},
cookReplyItem:function(e){
var t=_extends({},e);
return t.count=++this.count,t.time=i.dateToString(t.create_time),t.content=(t.content||"").htmlDecodeLite().htmlEncodeLite(),
t.is_from_me=1===t.is_from,t.is_from_author=2===t.is_from,t.reply_like_status=t.reply_like_status||0,
t.reply_like_num=t.reply_like_num||0,t.reply_like_num_format=i.formatLikeNum(t.reply_like_num),
t.reply_is_elected="reply"===this.type?1:t.reply_is_elected||0,t.to_reply_del_flag=t.to_reply_del_flag||0,
t.to_content=(t.to_content||"").htmlDecodeLite().htmlEncodeLite(),t.author_like_status=!!t.author_like_status,
t.needAnimation=!!t.needAnimation,"mine"===this.type&&1===t.is_from?(!t.nick_name&&(t.nick_name=this.nickName),
!t.logo_url&&(t.logo_url=this.headImg)):t.nick_name=i.replaceUnico(t.nick_name.htmlDecodeLite().htmlEncodeLite()),
t.logo_url=i.parseHeadimg(t.logo_url),t;
},
checkIfCmtRepeated:function(e){
var t=e.nick_name+e.content,n=e.content_id,i=void 0;
this.__checkCommentContents[t]&&(i=this.reportData.repeatContent),this.__checkCommentContentIds[n]&&(i=this.reportData.repeatContentID),
this.__checkCommentContents[t]=!0,this.__checkCommentContentIds[n]=!0,"number"==typeof i&&this.myReport([i,encodeURIComponent(JSON.stringify({
comment_id:this.commentId,
content_id:n,
offset:this.offset,
length:this.list.length,
url:window.location.href
}))]);
},
getIsOversize:function(e){
return!this.showAll&&e>i.LIST_LIMIT;
},
getData:function(e){
var t=e.type,n=void 0===t?"comment":t,r=e.contentId,o=e.replyId,s=e.myId;
if("reply"===this.type)return"comment"===n?this.cmtData:i.getDataByKey(this.list,"reply_id",o);
var m=void 0;
return m=void 0===r?i.getDataByKey(this.list,"my_id",s):i.getDataByKey(this.list,"content_id",r),
"comment"===n?m:i.getDataByKey(m.reply_new.reply_list,"reply_id",o);
},
getCommentIdx:function(e){
var t=0;
return this.list.some(function(n){
return n.content_id===e?!0:(t++,!1);
})?t:-1;
},
getComment:function(e){
if("reply"===this.type)return null;
var t=this.getCommentIdx(e);
return t>-1&&t<this.$refs.cmtItem.length?this.$refs.cmtItem[t]:null;
},
getReplyIdx:function(e,t){
var n=0;
if("reply"===this.type){
if(this.list.some(function(e){
return e.reply_id===t?!0:(n++,!1);
}))return n;
}else if(this.list.some(function(i){
return i.content_id===e?(i.reply_new.reply_list.some(function(e){
return e.reply_id===t?!0:(n++,!1);
}),!0):(n+=i.reply_new.reply_list.length+1,!1);
}))return n;
return-1;
},
getReply:function(e,t){
var n=this.getReplyIdx(e,t);
return n>-1&&n<this.$refs.replyItem.length?this.$refs.replyItem[n]:null;
},
getItemList:function(){
return[].concat(this.$refs.cmtItem||[],this.$refs.replyItem||[]);
},
detectExtendCmt:function(){
var e=this;
this.$refs.moreReplies&&this.$refs.moreReplies.length&&this.$refs.moreReplies.forEach(function(t){
return e.$emit("detect-more-replies",t);
});
},
showMoreReplies:function(e,t){
this.$emit("show-more-replies",e,t);
},
getCmtWriteDialog:function(){
switch(this.type){
case"elected":
case"mine":
return this.$parent.$refs.cmtWriteDialog;

case"comment":
case"reply":
return this.$parent.$parent.$refs.cmtWriteDialog;

default:
return null;
}
},
showWriteDialog:function(e){
var t=e.value,n=e.nickName,i=e.toContent,r=e.onSubmit,o=e.onHide,s=this.getCmtWriteDialog();
s.show({
type:"elected"===this.type||"mine"===this.type?"reply":"",
value:t,
nickName:n,
toContent:i,
onSubmit:function(e){
s.disableSubmit(),"function"==typeof r&&r(e);
},
onHide:function(e){
"function"==typeof o&&o(e),s.setInputValue("");
}
});
},
commentReply:function(e){
this.$refs.cmtItem[0].reply(e);
},
add:function(){
var e=this.getCmtWriteDialog();
e.setInputValue(""),e.hide();
for(var t=arguments.length,n=Array(t),i=0;t>i;i++)n[i]=arguments[i];
this.$emit.apply(this,["add"].concat(n));
},
addFail:function(){
this.getCmtWriteDialog().enableSubmit();
},
remove:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["remove"].concat(t));
},
praise:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["praise"].concat(t));
},
dialogScroll:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["dialog-scroll"].concat(t));
},
resetDialogScroll:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["reset-dialog-scroll"].concat(t));
},
navShadowClick:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["nav-shadow-click"].concat(t));
},
onKeyboardShow:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["keyboard-show"].concat(t));
},
onKeyboardHide:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["keyboard-hide"].concat(t));
},
onCanNotReply:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["can-not-reply"].concat(t));
},
onRemoveAnimation:function(){
for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];
this.$emit.apply(this,["remove-animation"].concat(t));
}
})
};
});function _defineProperty(t,e,n){
return e in t?Object.defineProperty(t,e,{
value:n,
enumerable:!0,
configurable:!0,
writable:!0
}):t[e]=n,t;
}
var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var n=arguments[e];
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i]);
}
return t;
};
define("pages_new/modules/comment/write_dialog/write_dialog.js",["biz_common/dom/event.js","pages/utils.js","pages_new/modules/comment/utils.js","biz_wap/utils/mmversion.js","pages_new/modules/bottom_modal/bottom_modal.js","common/navShadow.js","common/keyboard.js","appmsg/emotion/emotion.js","appmsg/emotion/emotion_panel.js","pages_new/modules/comment/write_dialog/write_dialog.html.js","pages_new/3rd/vuex.js"],function(t){
"use strict";
var e=t("biz_common/dom/event.js"),n=t("pages/utils.js"),i=t("pages_new/modules/comment/utils.js"),o=t("biz_wap/utils/mmversion.js"),s=t("pages_new/modules/bottom_modal/bottom_modal.js"),a=t("common/navShadow.js"),u=t("common/keyboard.js"),l=t("appmsg/emotion/emotion.js"),m=t("appmsg/emotion/emotion_panel.js"),c=t("pages_new/modules/comment/write_dialog/write_dialog.html.js"),r=t("pages_new/3rd/vuex.js"),h=r.mapGetters,p="discuss_write_dialog_android_onfocus",d=[],f=0,g={};
Object.defineProperty(g,"keyboardHeight",{
set:function(t){
d.some(function(e){
return e.$refs.modal.getShowStatus()?(e.$nextTick(function(){
e.$refs.bd.setAttribute("style","padding-bottom: "+t+"px; padding-bottom: calc("+t+"px - constant(safe-area-inset-bottom)); padding-bottom: calc("+t+"px - env(safe-area-inset-bottom));");
}),!0):!1;
});
}
}),o.isAndroid&&!function(){
var t=document.documentElement.clientHeight||document.body.clientHeight;
e.on(window,"resize",function(){
d.some(function(e){
if(e.$refs.modal.getShowStatus()&&!e.emotionPanel.isShow){
var n=document.documentElement.clientHeight||document.body.clientHeight;
return e.modalOpt.extClass=n===t?"":p,!0;
}
return!1;
});
});
}();
var b=!1;
return u.onGetKeyboardHeight(function(t){
var e=t.keyboard;
b&&(o.isIOS?g.keyboardHeight=e:e&&(f=e,g.keyboardHeight=f),document.body.style.height=window.screen.availHeight-e+"px");
}),{
name:"mp-comment-write-dialog",
template:c,
components:_defineProperty({},s.name,s),
props:{
inDialog:{
type:Boolean,
"default":!1
}
},
data:function(){
return{
type:this.inDialog?"dialog":"comment",
inputValue:"",
inputStyle:{},
showFakeInput:!1,
inputTips:"",
nickName:"",
toContent:"",
modalOpt:this.inDialog?{
extClass:"",
btnText:"回复",
transparentMask:!0,
animationType:"right",
closeBtnType:"back"
}:{
extClass:"",
btnText:"提交",
transparentMask:!1,
animationType:"bottom",
closeBtnType:"close"
}
};
},
computed:_extends({},h("mp-comment",["canC2cReply"]),{
placeholder:function(){
return"comment"===this.type?"留言被公众号精选后，将对所有人可见":this.canC2cReply?"回复将对所有人可见":"回复被公众号精选后，将对所有人可见";
},
limit:function(){
return i.getLimit(this.type);
}
}),
watch:{
type:function(t){
switch(this.emotionPanel.setLimit(this.limit),t){
case"comment":
this.modalOpt.btnText="提交",this.modalOpt.transparentMask=!1,this.modalOpt.animationType="bottom",
this.modalOpt.closeBtnType="close";
break;

case"reply":
this.modalOpt.btnText="回复",this.modalOpt.transparentMask=!1,this.modalOpt.animationType="bottom",
this.modalOpt.closeBtnType="close";
}
}
},
created:function(){
d.push(this);
},
mounted:function(){
var t=this;
this.disableSubmit(),this.emotionPanel=new m({
input:this.$refs.input,
vueOpt:{
instance:this,
key:"inputValue"
},
limit:this.limit,
counter:function(t){
return i.getLength(t);
},
onChange:function(e){
var n=e.type,i=e.value;
("action"!==n||"done"!==i)&&t.onInputChange();
},
onShow:function(t){
g.keyboardHeight=t;
},
onHide:function(){
o.isAndroid&&(g.keyboardHeight=f);
}
});
},
beforeDestroy:function(){
d.splice(d.indexOf(this),1);
},
methods:{
onSubmit:function(){
this.$refs.input.blur(),"function"==typeof this.innerOnSubmit&&this.innerOnSubmit(this.inputValue);
},
onHide:function(){
var t=this;
"dialog"===this.type&&a.show({
onClick:function(){
t.$emit("nav-shadow-click");
}
}),this.emotionPanel.hide(),this.$refs.input.blur(),"function"==typeof this.innerOnHide&&this.innerOnHide(this.inputValue);
},
onInputChange:function(){
var t=i.getLength(this.inputValue);
this[t&&t<=this.limit?"enableSubmit":"disableSubmit"](),this.setInputTips(t);
},
onPaste:function(t){
var e=t.clipboardData.getData("text"),n=i.getLength(e),o=i.getLength(this.inputValue);
if(o+n>this.limit){
t.preventDefault();
for(var s=this.limit-o,a="",u=0,l=e.length;l>u&&s>0&&(s-=/[^\x00-\xff]/.test(e[u])?1:.5,
!(0>s));u++)a+=e[u];
this.inputValue+=a,this.onInputChange(),this.$refs.input.scrollTop=this.$refs.input.scrollHeight;
}
},
onKeydown:function(t){
if(!t.altKey&&!t.ctrlKey)switch(t.keyCode){
case 8:
case 9:
case 12:
case 16:
case 17:
case 18:
case 20:
case 27:
case 33:
case 34:
case 35:
case 36:
case 37:
case 38:
case 39:
case 40:
case 45:
case 46:
case 144:
case 175:
case 174:
case 179:
case 173:
case 172:
case 180:
case 170:
break;

default:
i.getLength(this.inputValue)>=this.limit&&t.preventDefault();
}
},
onTouchstart:function(){
this.emotionPanel.hide();
},
onFocus:function(){
var t=this;
b=!0,document.body.style.overflow="hidden";
var e=this.$refs.input.scrollTop;
this.inputStyle.height=0,this.inputStyle.flex="none",this.showFakeInput=!0,this.$refs.fakeInput.scrollTop=e;
var n=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
setTimeout(function(){
t.inputStyle={},t.showFakeInput=!1,t.$refs.modal.getBdEle().scrollTop=0,document.documentElement.scrollTop=n,
document.body.scrollTop=n;
},300);
},
onBlur:function(){
b=!1,document.body.style.removeProperty("overflow"),document.body.style.removeProperty("height");
},
toggleEmotion:function(){
var t=this;
this.emotionPanel.isShow?o.isAndroid?setTimeout(function(){
t.$refs.input.focus();
}):this.$refs.input.focus():this.$refs.input.blur(),this.emotionPanel.toggle();
},
show:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
t.type&&(this.type=t.type),this.innerOnSubmit=t.onSubmit,this.innerOnHide=t.onHide,
this.setReplyTo(t.nickName,t.toContent),t.value&&n.trim(t.value)?(this.setInputValue(t.value),
this.enableSubmit()):(this.setInputValue(""),this.disableSubmit()),this.$refs.modal.show();
},
hide:function(){
this.$refs.modal.hide();
},
setAriaHidden:function(t){
this.$refs.modal.setAriaHidden(t);
},
getInputValue:function(){
return this.inputValue;
},
setInputValue:function(t){
this.inputValue=t,this.onInputChange();
},
enableSubmit:function(){
this.$refs.modal.enableBtn();
},
disableSubmit:function(){
this.$refs.modal.disableBtn();
},
setReplyTo:function(t,e){
t&&e&&(this.nickName=t,this.toContent=l.encode(e));
},
setInputTips:function(t){
t=t||i.getLength(this.inputValue),this.inputTips=t>=this.limit-i.REMIND_WORD_COUNT&&t<this.limit?"还可以输入"+(this.limit-t)+"个字":t===this.limit?"达到"+this.limit+"字输入上限":t>this.limit?"已超出"+(t-this.limit)+"字":"";
}
}
};
});define("pages_new/modules/comment/comment.html.js",[],function(){
return'<div ref="cmtContainer" v-show="hasComment" class="rich_media_extra rich_media_extra_discuss">\n  <!-- 手机端写留言 -->\n  <div\n    role="dialog"\n    aria-modal="true"\n    tabindex="0"\n    :aria-hidden="ariaHidden"\n    v-show="cmtEntryCtrlStatus === 5 || cmtEntryCtrlStatus === 6 || cmtEntryCtrlStatus === 7"\n  >\n    <div ref="writeArea" class="discuss_form_write_area" :style="{ height: writeAreaHeight }" :class="{ \'discuss_form_write_show\': showCmtInputStatus }" @touchmove="onCmtAreaTouchmove">\n      <div ref="writeAreaInner" class="discuss_form_write_mod">\n        <div class="rich_media_extra_title_wrp weui-flex">\n          <div @touchstart.prevent class="weui-flex__item">\n            <strong class="rich_media_extra_title js_wx_tap_highlight wx_tap_link">写留言</strong>\n          </div>\n          <a @click="hideCmtInput" class="weui-wa-hotarea js_wx_tap_highlight wx_tap_link" role="button" href="javascript:;">取消</a>\n        </div>\n\n        <!-- 实际编辑用的textarea -->\n        <textarea ref="cmtInput" v-model="cmtInputValue" :style="cmtInputStyle" class="discuss_form_write_input" placeholder="留言精选后，将对所有人可见" @touchstart="onCmtInputTouchstart" @touchmove="onCmtInputTouchmove" @touchend="onCmtInputTouchend" @paste="onCmtInputPaste" @input="onCmtInputInput" @keydown="onCmtInputKeydown" @focus="onCmtInputFocus" @blur="onCmtInputBlur"></textarea>\n        <!-- 以下textarea是仅用于占位用的，为了防止focus时页面抖动，会在focus的瞬间让上面的textarea高度设为0并显示下面的textarea占位，300ms后再隐藏下面的textarea并显示实际的textarea -->\n        <textarea aria-hidden="true" ref="fakeCmtInput" v-show="showFakeCmtInput" v-model="cmtInputValue" class="discuss_form_write_input" placeholder="留言精选后，将对所有人可见" readonly></textarea>\n\n        <div @touchstart="onKeyboardToolTouchstart">\n          <div class="discuss_form_write_tool weui-flex">\n            <div class="weui-flex__item">\n              <span class="discuss_form_write_tips">{{ cmtTips }}</span>\n            </div>\n            <a ref="cmtWriteEmotion" class="icon_discuss_emotion" :class="{ \'icon_discuss_keyboard\': emotionPanelShowStatus }" role="button" :aria-label="emotionPanelShowStatus ? \'键盘\' : \'表情\'" :title="emotionPanelShowStatus ? \'轻点两下切换文本编辑\' : \'轻点两下打开表情键盘\'" href="javascript:;" @click="toggleEmotion"></a>\n            <button ref="cmtSubmit" :class="{ \'weui-btn_disabled\': cmtSubmitDisabled }" :disabled="cmtSubmitDisabled" class="weui-btn weui-btn_primary weui-btn_xmini weui-wa-hotarea discuss_form_write_btn" :title="cmtSubmitTitle" type="button" @click="onCmtSubmitClick">留言</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div v-show="showCmtInputMask" class="weui-mask_transparent" @touchstart="hideCmtInput"></div>\n  </div>\n\n  <template v-if="!tempKey">\n    <!-- pc端写留言 -->\n    <div v-if="cmtEntryCtrlStatus === 4" class="comment_primary_area">\n      <div class="comment_primary_form">\n        <div class="comment_primary_form_bd comment_primary_input_multiline">\n          <div class="comment_primary_input_default" v-show="!pcInputing" ref="inputPC" @click="showPcInputPanel">写下你的留言</div>\n        </div>\n      </div>\n    </div>\n\n    <div ref="cmtArea" v-show="commentData && commentData.enabled" class="discuss_mod discuss_special" id="js_cmt_area">\n      <!-- 我的留言 -->\n      <div class="discuss_container my_discuss_container" v-show="myCommentList.length">\n        <div class="rich_media_extra_title_wrp weui-flex">\n          <div class="weui-flex__item">\n            <strong class="rich_media_extra_title">我的留言</strong>\n          </div>\n          <template v-if="!isWxWork">\n            <p v-show="cmtEntryCtrlStatus === 2" class="tips_global">{{ fansCmtTips }}</p>\n            <a role="button" class="weui-wa-hotarea js_wx_tap_highlight wx_tap_link" v-show="cmtEntryCtrlStatus === 5" href="javascript:;" @click="showCmtInput">写留言</a>\n          </template>\n        </div>\n\n        <div class="discuss_list_wrp" ref="myListContainer">\n          <mp-comment-list\n            ref="myList"\n            :show-all="showMyAll"\n            :list="myCommentList"\n            @render="detectComment"\n            @add="addMyListComment"\n            @remove="removeMyListComment"\n            @praise="praiseMyListComment"\n          ></mp-comment-list>\n        </div>\n\n        <!-- 留言加载中 -->\n        <div v-show="myLoading" role="alert" class="weui-loadmore weui-loadmore_default">\n          <i class="weui-loading"></i>\n          <span class="weui-loadmore__tips">正在加载</span>\n        </div>\n\n        <!-- 默认收起，展开加weui-fold-tips_unfold -->\n        <div v-show="isOversize" ref="mylistFolder" class="weui-fold-tips weui-wa-hotarea_before" @click="showAllMyList">展开我的留言</div> <!-- 默认隐藏，如果溢出了再显示 -->\n\n        <div class="my_dicuss_list_end_tips weui-loadmore weui-loadmore_default weui-loadmore_line">\n          <span class="weui-loadmore__tips">\n            以上留言被精选后，将对所有人可见          </span>\n        </div>\n      </div>\n\n      <!-- 精选留言 -->\n      <div class="discuss_container star_discuss_container" v-show="commentList.length">\n        <div ref="cmtHeader" class="rich_media_extra_title_wrp weui-flex">\n          <div class="weui-flex__item">\n            <strong class="rich_media_extra_title">精选留言</strong>\n          </div>\n          <template v-if="!isWxWork">\n            <p v-show="cmtEntryCtrlStatus === 2" class="tips_global">{{ fansCmtTips }}</p>\n            <a class="weui-wa-hotarea js_wx_tap_highlight wx_tap_link" v-show="cmtEntryCtrlStatus === 6" href="javascript:;" role="button" @click="showCmtInput">写留言</a>\n          </template>\n        </div>\n        <div class="discuss_list_wrp">\n          <mp-comment-list\n            ref="cmtList"\n            type="elected"\n            :list="commentList"\n            @render="detectComment"\n            @add="addCmtListComment"\n            @remove="removeCmtListComment"\n            @praise="praiseCmtListComment"\n            @detect-more-replies="detectExtendCmt"\n            @show-more-replies="showCommentDialog"\n          ></mp-comment-list>\n        </div>\n      </div>\n\n      <template v-if="!isWxWork">\n        <div v-show="cmtEntryCtrlStatus === 3 || cmtEntryCtrlStatus === 7" class="discuss_container discuss_data_empty">\n          <div ref="cmtHeader" class="rich_media_extra_title_wrp tc">\n            <div v-show="cmtEntryCtrlStatus === 3" class="tips_global">{{ fansCmtTips }}</div>\n            <a class="weui-wa-hotarea js_wx_tap_highlight wx_tap_link" v-show="cmtEntryCtrlStatus === 7" href="javascript:;" role="button" @click="showCmtInput">写留言</a>\n          </div>\n        </div>\n      </template>\n\n      <div role="alert" ref="loading" v-show="loading" class="weui-loadmore weui-loadmore_default">\n        <i class="weui-loading"></i>\n        <span class="weui-loadmore__tips">正在加载</span>\n      </div>\n\n      <div role="option" v-show="showStatement" class="weui-loadmore weui-loadmore_default weui-loadmore_line weui-loadmore_dot">\n        <div class="weui-hidden_abs">已无更多数据</div>\n        <span class="weui-loadmore__tips"></span>\n      </div>\n\n      <!-- warning toast -->\n      <div role="alert" v-show="warningToast" class="discuss_warn_toast weui-toast__wrp">\n        <div class="weui-mask_transparent"></div>\n        <div class="weui-toast weui-toast_text-more">\n          <i class="weui-icon-warn weui-icon_toast"></i>\n          <p class="weui-toast__content js_content">\n            {{warningToast}}\n          </p>\n        </div>\n      </div>\n    </div>\n\n    <mp-comment-write-dialog ref="cmtWriteDialog" @nav-shadow-click="navShadowClick"></mp-comment-write-dialog>\n\n    <mp-comment-dialog\n      ref="commentDialog"\n      @praise="syncCmtListPraise"\n      @remove="syncCmtListRemove"\n    ></mp-comment-dialog>\n    <!-- <mp-comment-c2c-unsupport-dialog\n      ref="c2cUnsupportDialog"\n    ></mp-comment-c2c-unsupport-dialog> -->\n  </template>\n\n  <div v-else class="discuss_mod" id="js_cmt_area_temp">\n    <div class="discuss_container discuss_data_empty">\n      <div class="mod_title_context">\n        <p class="rich_media_extra_title_wrp tc">\n          <a id="cmt_area_temp_btn" class="js_wx_tap_highlight wx_tap_link weui-wa-hotarea" href="javascript:;" role="button" @click="tempBtnClick">写留言</a>\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n';
});