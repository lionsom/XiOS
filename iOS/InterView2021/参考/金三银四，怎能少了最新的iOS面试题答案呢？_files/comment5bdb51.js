define("appmsg/kan_report.js",["biz_wap/utils/ajax.js","pages/utils.js"],function(e){
"use strict";
function a(e){
e.rec_expand=r.getParam("rec_expand")||"",e.scene=r.getParam("scene")||"",e.rec_expand&&1*e.scene===94&&t({
url:s,
type:"POST",
data:e,
async:!1,
timeout:2e3
});
}
var t=e("biz_wap/utils/ajax.js"),r=e("pages/utils.js"),s="/mp/videoreport?action=report_for_kyk";
return{
reportKanData:a
};
});!function(n){
"use strict";
function t(n,t){
var r=(65535&n)+(65535&t),u=(n>>16)+(t>>16)+(r>>16);
return u<<16|65535&r;
}
function r(n,t){
return n<<t|n>>>32-t;
}
function u(n,u,e,o,c,f){
return t(r(t(t(u,n),t(o,f)),c),e);
}
function e(n,t,r,e,o,c,f){
return u(t&r|~t&e,n,t,o,c,f);
}
function o(n,t,r,e,o,c,f){
return u(t&e|r&~e,n,t,o,c,f);
}
function c(n,t,r,e,o,c,f){
return u(t^r^e,n,t,o,c,f);
}
function f(n,t,r,e,o,c,f){
return u(r^(t|~e),n,t,o,c,f);
}
function i(n,r){
n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;
var u,i,h,a,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;
for(u=0;u<n.length;u+=16)i=l,h=d,a=v,g=C,l=e(l,d,v,C,n[u],7,-680876936),C=e(C,l,d,v,n[u+1],12,-389564586),
v=e(v,C,l,d,n[u+2],17,606105819),d=e(d,v,C,l,n[u+3],22,-1044525330),l=e(l,d,v,C,n[u+4],7,-176418897),
C=e(C,l,d,v,n[u+5],12,1200080426),v=e(v,C,l,d,n[u+6],17,-1473231341),d=e(d,v,C,l,n[u+7],22,-45705983),
l=e(l,d,v,C,n[u+8],7,1770035416),C=e(C,l,d,v,n[u+9],12,-1958414417),v=e(v,C,l,d,n[u+10],17,-42063),
d=e(d,v,C,l,n[u+11],22,-1990404162),l=e(l,d,v,C,n[u+12],7,1804603682),C=e(C,l,d,v,n[u+13],12,-40341101),
v=e(v,C,l,d,n[u+14],17,-1502002290),d=e(d,v,C,l,n[u+15],22,1236535329),l=o(l,d,v,C,n[u+1],5,-165796510),
C=o(C,l,d,v,n[u+6],9,-1069501632),v=o(v,C,l,d,n[u+11],14,643717713),d=o(d,v,C,l,n[u],20,-373897302),
l=o(l,d,v,C,n[u+5],5,-701558691),C=o(C,l,d,v,n[u+10],9,38016083),v=o(v,C,l,d,n[u+15],14,-660478335),
d=o(d,v,C,l,n[u+4],20,-405537848),l=o(l,d,v,C,n[u+9],5,568446438),C=o(C,l,d,v,n[u+14],9,-1019803690),
v=o(v,C,l,d,n[u+3],14,-187363961),d=o(d,v,C,l,n[u+8],20,1163531501),l=o(l,d,v,C,n[u+13],5,-1444681467),
C=o(C,l,d,v,n[u+2],9,-51403784),v=o(v,C,l,d,n[u+7],14,1735328473),d=o(d,v,C,l,n[u+12],20,-1926607734),
l=c(l,d,v,C,n[u+5],4,-378558),C=c(C,l,d,v,n[u+8],11,-2022574463),v=c(v,C,l,d,n[u+11],16,1839030562),
d=c(d,v,C,l,n[u+14],23,-35309556),l=c(l,d,v,C,n[u+1],4,-1530992060),C=c(C,l,d,v,n[u+4],11,1272893353),
v=c(v,C,l,d,n[u+7],16,-155497632),d=c(d,v,C,l,n[u+10],23,-1094730640),l=c(l,d,v,C,n[u+13],4,681279174),
C=c(C,l,d,v,n[u],11,-358537222),v=c(v,C,l,d,n[u+3],16,-722521979),d=c(d,v,C,l,n[u+6],23,76029189),
l=c(l,d,v,C,n[u+9],4,-640364487),C=c(C,l,d,v,n[u+12],11,-421815835),v=c(v,C,l,d,n[u+15],16,530742520),
d=c(d,v,C,l,n[u+2],23,-995338651),l=f(l,d,v,C,n[u],6,-198630844),C=f(C,l,d,v,n[u+7],10,1126891415),
v=f(v,C,l,d,n[u+14],15,-1416354905),d=f(d,v,C,l,n[u+5],21,-57434055),l=f(l,d,v,C,n[u+12],6,1700485571),
C=f(C,l,d,v,n[u+3],10,-1894986606),v=f(v,C,l,d,n[u+10],15,-1051523),d=f(d,v,C,l,n[u+1],21,-2054922799),
l=f(l,d,v,C,n[u+8],6,1873313359),C=f(C,l,d,v,n[u+15],10,-30611744),v=f(v,C,l,d,n[u+6],15,-1560198380),
d=f(d,v,C,l,n[u+13],21,1309151649),l=f(l,d,v,C,n[u+4],6,-145523070),C=f(C,l,d,v,n[u+11],10,-1120210379),
v=f(v,C,l,d,n[u+2],15,718787259),d=f(d,v,C,l,n[u+9],21,-343485551),l=t(l,i),d=t(d,h),
v=t(v,a),C=t(C,g);
return[l,d,v,C];
}
function h(n){
var t,r="";
for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);
return r;
}
function a(n){
var t,r=[];
for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;
for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;
return r;
}
function g(n){
return h(i(a(n),8*n.length));
}
function l(n,t){
var r,u,e=a(n),o=[],c=[];
for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),r=0;16>r;r+=1)o[r]=909522486^e[r],
c[r]=1549556828^e[r];
return u=i(o.concat(a(t)),512+8*t.length),h(i(c.concat(u),640));
}
function d(n){
var t,r,u="0123456789abcdef",e="";
for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+=u.charAt(t>>>4&15)+u.charAt(15&t);
return e;
}
function v(n){
return unescape(encodeURIComponent(n));
}
function C(n){
return g(v(n));
}
function s(n){
return d(C(n));
}
function A(n,t){
return l(v(n),v(t));
}
function m(n,t){
return d(A(n,t));
}
n.md5=function(n,t,r){
return t?r?A(t,n):m(t,n):r?C(n):s(n);
};
}("function"==typeof jQuery?jQuery:this);define("complain/utils/const.js",[],function(A,i,g){
"use strict";
g.exports={
WRAP_TAG:"span",
IMG_TAG:"IMG",
HIGHLIGHT_ID:"highlight-id",
IMG_ID:"img-id",
CAMEL_HIGHLIGHT_ID:"highlightId",
CAMEL_IMG_ID:"imgId",
NODE_TYPE:{
text:1,
img:2
},
placeHolder:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
};
});define("complain/utils/dom.js",["complain/utils/utils.js","complain/utils/const.js"],function(e,t,r){
"use strict";
function n(e){
for(var t=arguments.length<=1||void 0===arguments[1]?"className":arguments[1],r=arguments.length<=2||void 0===arguments[2]?y:arguments[2],n=0;n<r.length;n++)if(e[t]&&"string"==typeof e[t]&&e[t].indexOf(r[n])>-1)return!0;
return!1;
}
function a(e){
var t=e.$blockNode,r=e.$node;
if(null===t)return null;
var n=[],a=[],i=0;
for(n.push(t);n.length>0;){
var o=n.pop();
if(3===o.nodeType&&o.nodeValue!==r.nodeValue)a.push(o),i+=o.textContent.length;else if(1===o.nodeType){
if(i+=1,o===r)break;
}else if(o.nodeValue===r.nodeValue){
i+=o.textContent.length;
break;
}
for(var d=o.childNodes,s=d.length-1;s>=0;s--)n.push(d[s]);
}
return i;
}
function i(e){
var t=j(e),r=+t.dataset.index,n=0,a={
$blockNode:t,
$node:e,
paraIndex:r,
offset:n
},i=f();
return{
start:a,
end:a,
id:i
};
}
function o(e){
return e.tagName===m||3===e.nodeType?e:e.childNodes[0];
}
function d(e,t,r,n){
e.style.setProperty?(n=n||null,e.style.setProperty(t,r,n)):"undefined"!=typeof e.style.cssText&&(n=n?"!"+n:"",
e.style.cssText+=";"+t+":"+r+n+";");
}
function s(e){
if(!e)return!1;
var t=e.nodeType,r=e.tagName;
return 3===t?!1:r===m?!0:!1;
}
function u(e){
return e.reduce(function(t,r,n){
if(0===n)return r.type===x.text?t.text.push(r.data):r.type===x.img&&t.pic.push(r.data),
t;
if(r.type===x.text){
if(e[n-1].type===x.text){
var a=t.text.pop();
a+=r.data,t.text.push(a);
}else t.text.push(r.data);
return t;
}
return r.type===x.img&&t.pic.push(r.data),t;
},{
audio:[],
pic:[],
video:[],
text:[]
});
}
function p(e,t){
T[t]=e;
}
function l(e,t){
var r=i(e),n=Y([{
$node:e,
type:x.img,
idx:r.start.paraIndex
}],t),a=J(r),o=u(n);
return{
meta:{
anchorTree:n,
anchorMeta:a,
anchorBrief:o
},
range:r
};
}
function c(e,t){
var r=e.childNodes,n=t,a=null,i=0;
for(i=0;i<r.length;i++)if(a=r[i],3===a.nodeType){
var o=a.length;
if(o>n)break;
n-=o;
}
return{
$node:a,
cursor:n
};
}
var _=e("complain/utils/utils.js"),f=_.uuid,g=e("complain/utils/const.js"),h=g.WRAP_TAG,m=g.IMG_TAG,x=g.NODE_TYPE,v=["P","DIV","SECTION","LI","H1","H2","H3","H4","H5","H6","TABLE","PRE","BLOCKQUOTE"],y=["js_product_container","js_blockquote_wrap"],b=["IFRAME","VIDEO","MPVOICE","MPGONGYI","QQMUSIC","MPSHOP","MP-WEAPP","MP-MINIPROGRAM","MPPRODUCT","MPCPS"],w=["js_mpvideo"],N=["js_product_container"],T={},E=function(e){
var t=arguments.length<=1||void 0===arguments[1]?v:arguments[1];
if(!e||1!==e.nodeType)return!1;
for(var r=0;r<e.children.length;r++)if(-1!==t.indexOf(e.children[r].tagName))return!0;
return!1;
},R=function(e){
var t=e.parentNode;
return e.parentNode.removeChild(e),t.children&&t.children.length?!1:!0;
},O=function(e,t){
var r=t.getNestedStructure,a=void 0===r?!0:r,i=t.removeIgoreEle,o=void 0===i?!1:i,d=function s(e,t){
var r=e.children;
if(!r)return[];
if(!r.length)return r;
for(var a=void 0,i=[],d=0;d<r.length;d++)a=r[d],n(a,"id",w)||n(a,"className",N)?o&&(a.parentNode.removeChild(a),
d-=1):E(a,b)?o&&(R(a),d-=1):E(a,v)&&!n(a)?(i=i.concat(s(a,t)),t&&(a.getAttribute("data-index")||i.push(a))):a.getAttribute("data-index")||i.push(a);
return i;
}(e,a);
return[].slice.call(d);
};
O.paragraphStartIdx=1e6;
var k=function(e,t,r,n){
try{
e.splitText(t);
}catch(a){
"undefined"!=typeof WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.report("ArticleMask:Error","splitText Error",{
mid:"mmbizwap:articlemask_Monitor",
view:"wap_business",
_info:{
type:"getSplitTextNode textnode",
startOffset:t,
endOffset:r
}
});
}
var i=e.nextSibling;
try{
i.splitText(r-t);
}catch(o){
"undefined"!=typeof WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.report("ArticleMask:Error","splitText Error",{
mid:"mmbizwap:articlemask_Monitor",
view:"wap_business",
_info:{
type:"getSplitTextNode nextSibling",
startOffset:t,
endOffset:r
}
});
}
return[{
$node:i,
type:x.text,
idx:n
}];
},j=function Z(e){
return-1!==v.indexOf(e.tagName)&&"undefined"!=typeof e.dataset.index?e:Z(e.parentNode);
},P=function et(e){
return e?-1!==v.indexOf(e.tagName)?e:et(e.parentNode):e;
},$=function(e){
var t=e.start,r=e.end,n=e.$container,a=t.$node,i=t.offset,o=r.$node,d=r.offset,s=[],u=[],p=!1,l=!1,c=0;
for(s.push(n);s.length>0;){
var _=s.pop(),f=_.nodeType,g=_.tagName;
if(_.dataset&&_.dataset.index&&(c=+_.dataset.index),p&&!l&&(3===f&&u.push({
$node:_,
type:x.text,
idx:c
}),g===m&&u.push({
$node:_,
type:x.img,
idx:c
})),_===a){
if(3===f){
try{
_.splitText(i);
}catch(h){
WX_BJ_REPORT.BadJs.report("ArticleMask:Error","splitText Error",{
mid:"mmbizwap:articlemask_Monitor",
view:"wap_business",
_info:{
type:"getNodes startNode",
startOffset:i,
endOffset:d
}
});
}
var v=_.nextSibling;
u.push({
$node:v,
type:x.text,
idx:c
});
}else u.push(g===m?{
$node:_,
type:x.img,
idx:c
}:{
$node:_,
type:x.text,
idx:c
});
p=!0;
}
if(_===o||l){
if(l||(l=!0),_===o&&u.pop(),3===f){
try{
_.splitText(d);
}catch(h){
"undefined"!=typeof WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.report("ArticleMask:Error","splitText Error",{
mid:"mmbizwap:articlemask_Monitor",
view:"wap_business",
_info:{
type:"getSplitTextNode endNode",
startOffset:i,
endOffset:d
}
});
}
u.push({
$node:_,
type:x.text,
idx:c
});
break;
}
if(g===m){
u.push({
$node:_,
type:x.img,
idx:c
});
break;
}
for(var y=_.childNodes,b=y.length-1;b>=0;b--)s.push(y[b]);
}
for(var w=_.childNodes,b=w.length-1;b>=0;b--)s.push(w[b]);
}
return u;
},B=function(e){
var t=e.start,r=e.end,n=t.$node,a=t.offset,i=r.$node,o=r.offset;
return n===i&&n instanceof Text?k(n,a,o,t.paraIndex):$(e);
},q=function(e){
return e&&(e.nodeValue||e.innerText);
},S=function(e,t,r){
var n=r===e?t:e;
if(!q(e)||!q(t))return n;
var a=(e.nodeValue||e.innerText)+(t.nodeValue||t.innerText);
return r.nodeValue=a,r.parentNode.removeChild(n),r;
},I=function(e,t){
var r=[],n=0,a=0,i=void 0;
for(r.push(e);r.length>0&&(i=r.pop(),!(3===i.nodeType&&(a=t-n,n+=i.textContent.length,
n>=t)));)for(var o=i.childNodes,d=o.length-1;d>=0;d--)r.push(o[d]);
return{
$parentNode:e,
$node:i,
offset:a
};
},C=function(e){
var t=e.$node,r=e.$parentNode,n=Number(r.dataset.index),i=a(r,t);
return{
parentIndex:n,
fromParentoffset:i
};
},A=function(){
var e=window.getSelection();
if(null===e.anchorNode)return null;
var t=e.getRangeAt(0);
if(!t||!e.toString())return null;
var r=t.startContainer,n=t.endContainer,a=t.commonAncestorContainer,i=t.startOffset,o=t.endOffset,d=j(r),s=j(n),u=d&&d.dataset.index,p=s&&s.dataset.index,l={
$blockNode:d,
$node:r,
offset:i,
paraIndex:Number(u)
},c={
$blockNode:s,
$node:n,
offset:o,
paraIndex:Number(p)
},_="string"==typeof a?a.parentNode:a,g=f();
return{
start:l,
end:c,
$container:_,
id:g
};
},M=function(e,t){
if(!e)return null;
if(3===e.nodeType){
var r=document.createElement(h);
return r.setAttribute("data-splitid",t),r.appendChild(e.cloneNode(!1)),e.parentNode&&e.parentNode.replaceChild(r,e),
r;
}
return e;
},J=function(e){
var t=e.start,r=e.end,n=e.id,i=a(t),o=t.$node===r.$node?r.offset-t.offset+i:a(r),d={
id:n,
start:{
para_offset:i,
para_index:t.paraIndex
},
end:{
para_offset:o,
para_index:r.paraIndex
}
};
return d;
},W=function(e){
return function(t){
var r=t.para_offset,n=t.para_index,a=e[n],i=[],o=0,d=0,s=void 0;
for(i.push(a);i.length>0&&(s=i.pop(),!(3===s.nodeType&&(d=r-o,o+=s.textContent.length,
o>=r)))&&!(1===s.nodeType&&(d=r-o,o+=1,o>=r));)for(var u=s.childNodes,p=u.length-1;p>=0;p--)i.push(u[p]);
return{
$blockNode:a,
$node:s,
offset:d,
paraIndex:n
};
};
},X=function(e,t,r){
var n=W(t);
return{
start:n(e.start),
end:n(e.end),
id:e.id,
$container:r
};
},z=function(e){
window.getSelection().removeAllRanges();
var t=window.getSelection(),r=document.createRange(),n=o(T.start),a=o(T.end);
r.setStart(n,e.start.offset),r.setEnd(a,e.end.offset),t.addRange(r);
},V=function(e,t){
var r=[],n=0;
for(r.push(e);r.length>0;){
var a=r.pop();
if(a===t)break;
n++;
for(var i=a.children,o=0;o<i.length;o++)r.push(i[o]);
}
return n;
},H=function(e,t){
var r=[],n=0,a=null;
for(r.push(e);r.length>0;){
var i=r.pop();
if(n===t){
a=i;
break;
}
n++;
for(var o=i.children,d=0;d<o.length;d++)r.push(o[d]);
}
return a;
},G=function(e,t){
return e&&"string"==typeof e&&-1!==e.indexOf(t)?!0:!1;
},D=function(e){
var t="rich_pages,blockquote_info,blockquote_biz,blockquote_other,blockquote_article,js_jump_icon,h5_image_link,js_banner_container,js_list_container,js_cover,js_tx_video_container,js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-1,list-paddingleft-2,list-paddingleft-3,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link,js_img_loading,wx_video_context,db,wx_video_thumb_primary,wx_video_play_btn,wx_video_mask,qqmusic_area,tc,tips_global,unsupport_tips,qqmusic_wrp,appmsg_card_context,appmsg_card_active,wx_tap_card,js_wx_tap_highlight,wx_tap_link,qqmusic_bd,play_area,icon_qqmusic_switch,pic_qqmusic_default,qqmusic_thumb,access_area,qqmusic_songname,qqmusic_singername,qqmusic_source,js_audio_frame,share_audio_context,flex_context,pages_reset,share_audio_switch,icon_share_audio_switch,share_audio_info,flex_bd,share_audio_title,share_audio_tips,share_audio_progress_wrp,share_audio_progress,share_audio_progress_inner,share_audio_progress_buffer,share_audio_progress_loading,share_audio_progress_loading_inner,share_audio_progress_handle,share_audio_desc,share_audio_length_current,share_audio_length_total,video_iframe,vote_iframe,js_editor_vote_card,res_iframe,card_iframe,js_editor_card,weapp_display_element,js_weapp_display_element,weapp_card,app_context,weapp_card_bd,weapp_card_profile,radius_avatar,weapp_card_avatar,weapp_card_nickname,weapp_card_info,weapp_card_title,weapp_card_thumb_wrp,weapp_card_ft,weapp_card_logo,js_pay_btn,pay,pay__mask,wx_video_loading,js_redpacketcover,js_uneditable,js_uneditablemouseover,js_editor_qqmusic,js_editor_audio,ct_geography_loc_tip,js_poi_entry".split(","),r="qa__",n=[new RegExp("^weui"),new RegExp("^appmsg"),new RegExp("^audio"),new RegExp("^music"),new RegExp("^cps_inner"),new RegExp("^bizsvr_"),new RegExp("^code-snippet"),new RegExp("^"+r),new RegExp("^wx-edui-"),new RegExp("^wx_"),new RegExp("^wx-")];
if(!e)return null;
for(var a=e.split(/\s+/),i=[],o=0,d=a.length;d>o;++o){
var s=a[o];
if(s&&-1!==t.indexOf(s))i.push(s);else for(var u=0,p=n.length;p>u;u++)if(n[u].test(s)){
i.push(s);
break;
}
}
var l=i.join(".");
return l&&"."+l;
},L=function tt(e){
var t=arguments.length<=1||void 0===arguments[1]?"":arguments[1],r=arguments.length<=2||void 0===arguments[2]?document.body:arguments[2];
if(!e||e===r)return t;
var n=e.getAttribute("id"),a=e.getAttribute("class"),i=e.tagName.toLowerCase(),o=null;
if(n&&!G(a,"articlepart-selector-area_choice-button_wrap"))return t?"#"+n+">"+t:"#"+n;
var d=D(a);
return o=d?d:G(a,"js_choice-img")?".js_choice-img":G(a,"articlepart-selector-area_choice")&&e.dataset.splitid?"":i,
tt(e.parentNode,[o,t].filter(function(e){
return!!e;
}).join(">"),r);
},Q=function(e,t){
var r=L(e,"",t),n=[];
try{
n=t.querySelectorAll(r);
}catch(a){
console.log("get node selector wrap err",a);
}
for(var i=n.length,o=null,d=0;i>d;d++)if(e===n[d]){
o=d;
break;
}
null===o&&"undefined"!=typeof WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.report("ArticleMask:Error","selector:node not find",{
mid:"mmbizwap:articlemask_Monitor",
view:"wap_business",
_info:{
selector:r
}
});
var s=(r||"").replace(">.js_choice-img>",">")+("|"+i+" "+(o||0));
return s;
},U=function(e){
return e.map(function(e){
var t=e.$node,r=e.type,n=e.idx,a=0,i=null,o="",d=j(t);
if(r===x.text){
var s=V(d,t.parentNode);
t&&t.data&&(a=s,i=t.data,o=t.previousSibling&&t.previousSibling.data);
}else if(r===x.img){
var u=d.getElementsByTagName("img");
i=t.src,a=Array.prototype.slice.call(u).slice(0).indexOf(t);
}
return{
data:i,
index:a,
idx:n,
type:r,
meta:o
};
}).filter(function(e){
return e.index>-1&&!!e.data;
});
},Y=function(e,t){
var r=t||document.getElementById("js_content");
return e.map(function(e){
var t=e.$node,n=e.type,a=e.idx,i=null,o=null,d="";
return n===x.text?t&&t.data&&(i=Q(t.parentNode,r),o=t.data,d=t.previousSibling&&t.previousSibling.data):n===x.img&&(i=Q(t,r),
o=t.src),{
data:o,
idx:a,
type:n,
meta:d,
selector:i
};
}).filter(function(e){
return!!e.selector&&!!e.data;
});
},F=function(e,t){
return(t||document).querySelector(e);
},K=function(e,t){
return(t||document).querySelectorAll(e);
};
r.exports={
getDomMeta:C,
getContent:u,
getParaList:O,
getBlockNode:j,
getSelectedNodes:B,
connectSiblingText:S,
getTextNodeByOffset:I,
getBlockOffset:a,
getSelection:A,
transferTextToElement:M,
serialize:J,
deSerialize:X,
resetRange:z,
serializeToC:U,
setProperty:d,
hasImgNode:s,
nodeToSelection:i,
saveNode:p,
serializeNode:l,
getNodeByIndex:H,
findChildIndex:c,
serializeToC2:Y,
blockEleTagName:v,
getPureBlockNode:P,
qs:F,
qsAll:K,
hasClass:G
};
});define("appmsg/subscribe/subscribe_btn_tpl.html.js",[],function(){
return'<#if(supportWxOpen){#>\n<wx-open-subscribe template="<#=templateIdList#>" scene="<#=scene#>" username="<#=username#>" scale="<#=scale#>" appmsgindex="<#=appmsgIndex#>"> \n  <template slot="style">\n    <style>\n    .reset_btn{\n      -webkit-appearance: none;\n      -webkit-tap-highlight-color:rgba(0,0,0,0);\n      outline: 0;\n      background-color: transparent;\n      border: 0;\n      font-family:inherit;\n      display: inline-block;\n      vertical-align: middle;\n    }\n    .subsc_btn {\n      font-size:inherit;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 0;\n      margin: 0;\n      color: #576b95;\n    }\n    .icon_subsc {\n      display: -ms-flexbox;\n      display: flex;\n      width: 20px;\n      height: 20px;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      margin-right: 4px;\n      box-sizing: border-box;\n      border-radius: 100%;\n      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);\n    }\n    .icon_subsc:before {\n      content: "";\n      display: inline-block;\n      vertical-align: middle;\n      width: 14px;\n      height: 14px;\n      -webkit-mask: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 14 14\'%3E  %3Cpath fill=\'%23576B95\' d=\'M7 1.167a1.167 1.167 0 0 1 1.15 1.36 3.501 3.501 0 0 1 2.35 3.306v2.334c0 .857.315 1.714.945 2.571a.583.583 0 0 1-.47.929H7.582v.116a.583.583 0 0 1-1.166 0v-.116H3.025a.583.583 0 0 1-.47-.929c.63-.857.944-1.714.944-2.571V5.833c0-1.53.982-2.83 2.35-3.306A1.167 1.167 0 0 1 7 1.167zm0 1a.167.167 0 0 0-.167.166l.003.03.139.831-.797.277a2.501 2.501 0 0 0-1.672 2.185l-.006.177v2.334c0 .833-.23 1.653-.678 2.45l-.029.049h6.413l-.028-.048c-.403-.719-.63-1.454-.671-2.202l-.007-.25V5.834a2.5 2.5 0 0 0-1.515-2.298l-.163-.064-.797-.277.14-.832A.167.167 0 0 0 7 2.166z\'/%3E%3C/svg%3E") no-repeat 50% 50%;\n      mask: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 14 14\'%3E  %3Cpath fill=\'%23576B95\' d=\'M7 1.167a1.167 1.167 0 0 1 1.15 1.36 3.501 3.501 0 0 1 2.35 3.306v2.334c0 .857.315 1.714.945 2.571a.583.583 0 0 1-.47.929H7.582v.116a.583.583 0 0 1-1.166 0v-.116H3.025a.583.583 0 0 1-.47-.929c.63-.857.944-1.714.944-2.571V5.833c0-1.53.982-2.83 2.35-3.306A1.167 1.167 0 0 1 7 1.167zm0 1a.167.167 0 0 0-.167.166l.003.03.139.831-.797.277a2.501 2.501 0 0 0-1.672 2.185l-.006.177v2.334c0 .833-.23 1.653-.678 2.45l-.029.049h6.413l-.028-.048c-.403-.719-.63-1.454-.671-2.202l-.007-.25V5.834a2.5 2.5 0 0 0-1.515-2.298l-.163-.064-.797-.277.14-.832A.167.167 0 0 0 7 2.166z\'/%3E%3C/svg%3E") no-repeat 50% 50%;\n      -webkit-mask-size: cover;\n      mask-size: cover;\n      background-color: currentColor;\n    }\n    @media (prefers-color-scheme: dark) {\n      .subsc_btn {\n        color: #7d90a9;\n      }\n      .icon_subsc {\n        box-shadow: 0 0 3px 0 rgba(255, 255, 255, 0.1);\n      }\n    }\n    </style>\n  </template>\n  <template>\n    <div class="subsc_context">\n      <button class="subsc_btn reset_btn" type="button"><i class="icon_subsc"></i>订阅通知</button>\n    </div>\n  </template>\n</wx-open-subscribe>\n<#}else{#>\n  <div class="subsc_context js_subsc_btn">\n    <button class="subsc_btn reset_btn" type="button"><i class="icon_subsc"></i>订阅通知</button>\n  </div>\n<#}#>\n\n\n';
});define("appmsg/i18n.js",[],function(e,n){
"use strict";
n.dealLikeReadShow_en=function(e){
if("undefined"==typeof LANG||!LANG)return 0===parseInt(e)?"":e;
if("en"==LANG){
var n="";
if(parseInt(e)>1e5)n="100k+";else if(parseInt(e)>1e4&&parseInt(e)<=1e5){
var r=""+parseInt(e)/1e3,t=r.indexOf(".");
n=-1===t?r+"k":r.substr(0,t)+"."+r.charAt(t+1)+"k";
}else n=0===parseInt(e)?"":e;
return n;
}
return"";
};
});define("album/utils/report.js",["common/comm_report.js"],function(e){
"use strict";
var i=e("common/comm_report.js"),o=window.WX_BJ_REPORT||{},n=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
ItemShowType:1*window.item_show_type||0,
SessionId:window.sessionid+"",
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene,
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
Vid:e.vid,
Audioid:e.audioid||"",
Title:e.title||"",
TagSource:1*e.tagSrc||0
};
i.report(19647,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19647",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},r=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
Scene:1*window.source,
SubScene:1*window.subscene,
EnterId:1*window.enterid,
SceneNote:e.sceneNote+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
IfSubscription:1*e.isSubscribed===1?2:1,
NewTagId:e.tagId+"",
ShowTag:e.showTag+"",
InsideTag:e.insideTag+"",
Cate1:e.c1+"",
Cate2:e.c2+"",
StayTime:e.stayTime?1*e.stayTime:0,
NetworkType:1*e.networkType
};
i.report(19648,n,{
async:e.async||!0,
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19648",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},d=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
MsgId:1*e.msgid,
ItemIdx:1*e.itemidx,
Pos:1*e.pos,
Scene:1*window.source,
SubScene:1*window.subscene,
EnterId:1*window.enterid,
SceneNote:e.sceneNote+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
Vid:e.vid,
IfSubscription:1*e.isSubscribed===1?2:1,
NewTagId:e.tagId+"",
ShowTag:e.showTag+"",
InsideTag:e.insideTag+"",
Cate1:e.c1+"",
Cate2:e.c2+"",
ArticleSource:1
};
i.report(19649,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19649",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
}),1*e.eventType===1&&!function(){
var n={
BizUin:window.biz,
MsgId:1*e.msgid,
ItemIdx:1*e.itemidx,
AppMsgUrl:e.url,
Title:e.title,
IsReaded:1*e.isRead,
Scene:1*window.source,
SubScene:1*window.subscene
};
i.report(20805,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 20805",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
}();
},t=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
bizuin:window.biz,
url:e.url+"",
ActionType:1*e.actionType,
Scene:1*window.source,
Network:window.__networkType+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
ExpType:window.exptype||"",
EnterId:window.enterid||"",
SessionId:window.sessionid||"",
ExpSessionIdStr:window.expsessionid||""
};
i.report(10380,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 10380",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},s=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
Action:1*e.action,
AppMsgLikeType:window.appmsg_like_type,
Scene:1*window.source,
SubScene:1*window.subscene,
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
ExpType:window.exptype||"",
SessionId:window.sessionid||"",
ExpSessionIdStr:window.expsessionid||""
};
i.report(14299,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 14299",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
};
return{
cardReport:n,
albumActionReport:r,
articleActionReport:d,
shareReport:t,
likeReport:s
};
});define("appmsg/rec_report_key.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),n=[],i=void 0;
!function(){
i[i.kRead=1]="kRead",i[i.kLike=2]="kLike",i[i.kSeen=3]="kSeen",i[i.kShare=4]="kShare",
i[i.kFavorite=5]="kFavorite",i[i.kComment=6]="kComment",i[i.kReward=7]="kReward",
i[i.kSubscibe=8]="kSubscibe",i[i.kRead20Percent=9]="kRead20Percent",i[i.kReadOver=10]="kReadOver";
}(i||(i={}));
var o=function(e){
var i=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
if("169"===window.source){
var o=n.indexOf(e);
-1===o&&1===i?n.push(e):o>-1&&0===i&&n.splice(o,1),console.log("[reportRecommend] params: "+JSON.stringify(n)),
r.invoke("handleMPPageAction",{
action:"reportRecommend",
reportData:JSON.stringify({
action:n
})
},function(e){
console.log("[reportRecommend] res: "+JSON.stringify(e));
});
}
},t=function(){
n.splice(0,n.length);
};
return{
RecActionType:i,
reportRecAction:o,
resetActionMap:t
};
});define("pages/scrollY.js",["pages/utils.js"],function(e){
"use strict";
var n=e("pages/utils.js"),t=window.requestAnimationFrame,o=0;
["webkit","moz","ms","o"].some(function(e){
return t?!0:(t=t||window[e+"RequestAnimationFrame"],!1);
}),t||(t=function(e){
var n=(new Date).getTime(),t=Math.max(0,16-(n-o));
return o=n+t,window.setTimeout(function(){
return e(n+t);
},t);
});
var r={
easeOutSine:function(e){
return Math.sin(e*(Math.PI/2));
},
easeInOutSine:function(e){
return-.5*(Math.cos(Math.PI*e)-1);
},
easeInOutQuint:function(e){
return e/=.5,1>e?.5*Math.pow(e,5):.5*(Math.pow(e-2,5)+2);
},
easeInOutCubic:function(e){
return.5>e?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1;
}
},i=function(e,n){
var t=arguments.length<=2||void 0===arguments[2]?document.body:arguments[2];
"function"==typeof e&&e(),t===document.body?(document.documentElement.scrollTop=n,
document.body.scrollTop=n):t.scrollTop=n;
},u=function(){
var e=arguments.length<=0||void 0===arguments[0]?document.body:arguments[0];
return e===document.body?n.getScrollTop():e.scrollTop;
},a={},s=function m(){
var e=1*new Date+"_"+1e4*Math.random().toFixed(4);
return a[e]?m():e;
},c=function(e){
delete a[e];
},d=function(e){
var n=e.el,o=void 0===n?document.body:n,d=e.y,m=e.distance,f=e.speed,l=e.duration,v=e.easing,p=void 0===v?"easeOutSine":v,g=e.begin,h=e.end,b=e.beforeScroll;
"function"==typeof g&&g(),Object.keys(a).forEach(function(e){
a[e].el===o&&c(e);
});
var y=u(o),w=0;
if(void 0!==d)m=d-y;else{
if(void 0===m)return void console.error("need param `y` or `distance`.");
d=m+y;
}
if(0!==m){
void 0===f&&(f=void 0!==l?m/l:2e3);
var M=l||Math.max(.1,Math.min(Math.abs((y-d)/f),.8)),T=s();
a[T]={
el:o
};
var O=function I(){
if(a[T]){
w+=1/60;
var e=w/M,n=r[p](e);
1>e?(t(I),i(b,y+(d-y)*n,o)):(c(T),i(b,d,o),"function"==typeof h&&h());
}
};
O();
}
};
return{
start:d,
stop:c
};
});define("appmsg/related_article_feedback.js",["biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","common/utils.js","common/tap_highlight.js"],function(e){
"use strict";
function t(e,t){
for(;!e.parentNode.className.match(t);)e=e.parentNode;
return e.parentNode||"";
}
function i(e){
this.container=e.container,this.biz=e.biz,this.mid=e.mid,this.idx=e.idx,this.vid=e.vid,
this.isVideo=e.isVideo,this.dislikeCb=e.dislikeCb,o["top"===e.position?"addClass":"removeClass"](this.container.querySelector(".js_dialog_wrp"),"feedback_dialog_pos_top"),
this.bindEvent();
}
function a(e){
var a=e.container;
n.on(a,"touchstart",".js_feedback_btn",function(e){
e.stopPropagation();
},!0),n.on(a,"touchend",".js_feedback_btn",function(e){
e.stopPropagation();
},!0),n.on(a,"click",".js_feedback_btn",function(a){
a.stopPropagation();
var s=a.delegatedTarget,o=t(s,"js_related_item"),n=268;
l.highlightEle(s),c=new i({
container:o,
biz:e.biz,
mid:e.mid,
idx:e.idx,
isVideo:e.isVideo,
vid:e.vid,
position:r.getInnerHeight()-o.getBoundingClientRect().bottom<n?"top":"bottom",
dislikeCb:e.dislikeCb
}),c.show();
},!0);
}
var s=e("biz_wap/utils/ajax.js"),o=e("biz_common/dom/class.js"),n=e("biz_common/dom/event.js"),d=e("biz_common/utils/url/parse.js"),r=e("common/utils.js"),l=e("common/tap_highlight.js"),c=null;
return i.prototype.bindEvent=function(){
var e=this,i=this.container,a=this.biz,r=this.mid,l=this.idx,c=i.getAttribute("data-url"),u=new Set,h=new Set,m=i.querySelector(".js_submit");
this.tabClickEventHandler=function(e){
e.stopPropagation(),e.preventDefault();
var t=e.delegatedTarget,i=t.getAttribute("data-value");
o.hasClass(t,"js_reason")&&(i*=1),o.hasClass(t,"feedback_tag_selected")?(o.removeClass(t,"feedback_tag_selected"),
o.hasClass(t,"js_reason")?u.delete(i):h.delete(i),t&&t.setAttribute("aria-checked","false")):(o.addClass(t,"feedback_tag_selected"),
o.hasClass(t,"js_reason")?u.add(i):h.add(i),t&&t.setAttribute("aria-checked","true")),
0===u.size&&0===h.size?o.addClass(m,"weui-btn_disabled"):o.removeClass(m,"weui-btn_disabled");
},this.submitDataHandler=function(n){
n.stopPropagation(),n.preventDefault();
var m=n.target;
if(!o.hasClass(m,"weui-btn_disabled")){
var _={
tacitly:Array.from(u),
keyword:Array.from(h)
},b={
biz_from:a,
mid_from:r,
idx_from:l,
recommended_biz:d.getQuery("__biz",c),
mid:d.getQuery("mid",c),
idx:d.getQuery("idx",c),
reason:JSON.stringify(_)
},f="/mp/relatedarticle?action=dislike";
e.isVideo&&(b.vid_from=e.vid,b.vid=i.getAttribute("data-vid"),f="/mp/video_similar?action=dislike"),
s({
type:"POST",
url:f,
dataType:"json",
data:b,
success:function(i){
if(console.log(i),i&&i.base_resp&&0===i.base_resp.ret){
e.hide(m);
var a=t(m,"js_related_item");
e.dislikeCb(a);
}else window.weui.alert("系统错误，请稍后重试");
}
});
}
},this.maskHandler=function(t){
t.stopPropagation(),t.preventDefault(),e.hide(t.target);
},this.maskTouchMoveHandler=function(e){
e.stopPropagation(),e.preventDefault();
},this.stopPropagationHandler=function(e){
e.stopPropagation();
},n.on(i,"click",".js_tag_item",this.tabClickEventHandler,!0),n.on(m,"click",this.submitDataHandler,!0),
n.on(i,"click",".js_mask",this.maskHandler,!0),n.on(i,"touchmove",".js_mask",this.maskTouchMoveHandler,!0),
n.on(i,"touchmove",".js_dialog_wrp",this.maskTouchMoveHandler,!0),n.on(i,"click",".js_dialog_wrp",this.maskTouchMoveHandler,!1),
n.on(i,"touchstart",".js_feedback_dialog",this.stopPropagationHandler,!0),n.on(i,"touchend",".js_feedback_dialog",this.stopPropagationHandler,!0);
},i.prototype.show=function(){
var e=this.container.querySelector(".js_feedback_dialog");
e&&(e.style.display="",o.addClass(e,"feedback_dialog_show"),e.setAttribute("aria-hidden","false"),
e.focus());
},i.prototype.hide=function(){
var e=this.container,t=e.querySelector(".js_submit"),i=e.querySelector(".js_feedback_dialog"),a=e.querySelector(".js_feedback_btn");
n.off(e,"click",this.tabClickEventHandler,!0),n.off(t,"click",this.submitDataHandler,!0),
n.off(e,"click",this.maskHandler,!0),n.off(e,"touchmove",this.maskTouchMoveHandler,!0),
n.off(e,"click",this.maskTouchMoveHandler,!1),o.removeClass(i,"feedback_dialog_show"),
i.setAttribute("aria-hidden","true"),a.focus();
},{
init:a
};
});define("biz_wap/utils/openUrl.js",["biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function r(e){
var r=document.createElement("a");
return r.href=e,{
source:e,
protocol:r.protocol.replace(":",""),
host:r.hostname,
port:r.port,
query:r.search,
params:function(){
for(var e,t={},i=r.search.replace(/^\?/,"").split("&"),a=i.length,o=0;a>o;o++)i[o]&&(e=i[o].split("="),
t[e[0]]=e[1]);
return t;
}(),
file:(r.pathname.match(/([^\/?#]+)$/i)||[,""])[1],
hash:r.hash.replace("#",""),
path:r.pathname.replace(/^([^\/])/,"/$1"),
relative:(r.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],
segments:r.pathname.replace(/^\//,"").split("/")
};
}
function t(e,t){
var o;
t=t||1,0==e.indexOf("/")&&(o=r(location.href),e=o.protocol+"://"+o.host+e,console.log("openUrlWithExtraWebview with relative path:",e)),
e=e.replace(/(#[^#]*)+/,function(e,r){
return r;
}),-1!==navigator.userAgent.indexOf("MicroMessenger")&&(a.isIOS||a.isAndroid||a.isWp)?i.invoke("openUrlWithExtraWebview",{
url:e,
openType:t
},function(r){
-1==r.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
}
var i=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/mmversion.js");
return{
openUrlWithExtraWebview:t
};
});define("appmsg/related_article_item.html.js",[],function(){
return'<# list.forEach(function(item, idx) { #>\n  <div class="weui-media-box weui-media-box_appmsg js_related_item js_wx_tap_highlight wx_tap_cell"\n    data-index="<#=begin+idx#>"\n    data-url="<#=item.url#>"\n    data-time="<#=item.send_time#>"\n    data-recalltype="<#=item.recall_type#>"\n    data-isreaded="<#=item.is_readed#>"\n    data-bizuin="<#=item.bizuin#>"\n    data-mid="<#=item.mid#>"\n    data-idx="<#=item.idx#>"\n    data-item_show_type="<#=item.item_show_type#>"\n    data-exptype="<#=item.exptype#>"\n    data-ext_info="<#=item.ext_info#>"\n  >\n    <div class="weui-media-box__bd">\n      <div class="ellipsis_relate_title mask_ellipsis_wrp mask_ellipsis_auto_height\n        <# if (item.is_pay_subscribe) { #>\n          <# if (item.is_paid) { #>\n          relate_article_pay\n          <# } else { #>\n          <# } #>\n        <# } else { #>\n          relate_article_default\n        <# } #>\n        "\n        role="link"\n        aria-labelledby="relate_article_title_<#=item.mid#>_<#=item.idx#> js_a11y_comma relate_article_nickname_<#=item.mid#>_<#=item.idx#> js_a11y_comma relate_article_num_<#=item.mid#>_<#=item.idx#>" \n      >\n        <div aria-hidden="true" class="mask_ellipsis_text">\n          <#=item.title#>\n          <# if (item.is_pay_subscribe) { #>\n            <# if (item.is_paid) { #>\n              <span class="pay__tag">已付费</span>\n            <# } else { #>\n              <span class="unpay__tag">付费</span>\n            <# } #>\n          <# } #>\n        </div>\n        <div aria-hidden="true" class="mask_ellipsis">\n          <div class="mask_ellipsis_text" id="relate_article_title_<#=item.mid#>_<#=item.idx#>">\n            <#=item.title#>\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n                <span class="pay__tag">已付费</span>\n              <# } else { #>\n                <span class="unpay__tag">付费</span>\n              <# } #>\n            <# } #>\n          </div>\n          <div class="mask_ellipsis_placeholder"></div>\n          <div class="mask_ellipsis_extra">\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n                <span class="pay__tag">已付费</span>\n              <# } else { #>\n                <span class="unpay__tag">付费</span>\n              <# } #>\n            <# } #>\n          </div>\n        </div>\n      </div>\n      <div class="weui-media-box__info weui-flex">\n        <div class="weui-media-box__info__inner weui-flex weui-flex__item">\n          <div aria-hidden="true" id="relate_article_nickname_<#=item.mid#>_<#=item.idx#>" class="js_profile relate_profile_nickname weui-media-box__info__meta" data-username="<#=item.username#>">\n            <#=item.nickname#>\n          </div>\n          <div class="weui-media-box__info__meta" aria-hidden="true" id="relate_article_num_<#=item.mid#>_<#=item.idx#>">\n            <# if (item.old_like_num >= 10) { #>\n              赞 <#=item.like_num_wording#>            <# } else if (item.is_pay_subscribe && item.pay_cnt) { #>\n              付费 <#=item.pay_cnt_wording#>            <# } else if (item.read_num) { #>\n              阅读 <#=item.read_num_wording#>            <# } #>\n          </div>\n        </div>\n        <div class="relate_article_opr">\n          <button type="button" class="reset_btn dislike_btn js_feedback_btn weui-wa-hotarea">不喜欢</button>\n        </div>\n        <!-- 去掉display:none;改用样式默认隐藏，加classnamme:feedback_dialog_show显示 -->\n        <div class="feedback_dialog_wrp js_feedback_dialog" role="dialog" aria-modal="true" tabindex="0" aria-hidden="true">\n          <div class="weui-mask js_mask" role="button" aria-label="关闭"></div>\n          <!-- 底部时弹窗向上，加.feedback_dialog_pos_top -->\n          <div class="feedback_dialog js_dialog_wrp">\n            <div class="feedback_dialog_hd weui-flex">\n              <div class="weui-flex__item feedback_dialog_title">不看的原因</div>\n              <button type="button" class="weui-btn weui-btn_primary weui-btn_mini weui-btn_disabled js_submit">确定</button>\n            </div>\n            <div class="feedback_dialog_bd">\n              <ul class="feedback_tag_list">\n                <!-- 选中时tag加.feedback_tag_selected -->\n                <# reason.forEach(function(r) { #>\n                  <li role="checkbox" aria-checked="false" class="feedback_tag_item js_reason js_tag_item" data-value="<#=r.value#>"><#=r.name#></li>\n                <# }); #>\n                <# item.keyword.forEach(function(k,i) { #>\n                  <# if (i<2) { #>\n                    <li role="checkbox" aria-checked="false" class="feedback_tag_item js_keyword js_tag_item" data-value="<#=k#>">对<#=k#>不感兴趣</li>\n                  <# } #>\n                <# }); #>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="weui-media-box__ft" style="background-image:url(<#=item.cover#>)"></div>\n  </div>\n<# }); #>\n';
});define("appmsg/related_article_tpl.html.js",[],function(){
return'<div class="relate_mod_transition function_mod js_related_area" style="opacity: 1; overflow: hidden; height: 0; margin: 0;">\n  <div class="function_mod_index js_related_main">\n      <div class="function_hd js_related_title">\n        <# if (type === \'share\') { #> <!-- 分享 -->\n          分享此内容的人还喜欢        <# } else if (type === \'favorite\') { #> <!-- 收藏 -->\n          收藏此内容的人还喜欢        <# } else if (type === \'praise\' || type === \'like\') { #> <!-- 点赞/在看 -->\n          喜欢此内容的人还喜欢        <# } else { #> <!-- 其它 -->\n          喜欢此内容的人还喜欢        <# } #>\n      </div>\n      <div class="function_bd">\n          <div class="relate_article_list relate_article_placeholder js_related_placeholder">\n              <div class="weui-media-box weui-media-box_appmsg"><div class="weui-media-box_placeholder"></div></div>\n              <div class="weui-media-box weui-media-box_appmsg"><div class="weui-media-box_placeholder"></div></div>\n              <div class="weui-media-box weui-media-box_appmsg"><div class="weui-media-box_placeholder"></div></div>\n          </div>\n          <div class="relate_article_index_list relate_article_list js_related_list" style="height: auto;"></div>\n      </div>\n  </div>\n</div>\n';
});function _defineProperty(e,n,_){
return n in e?Object.defineProperty(e,n,{
value:_,
enumerable:!0,
configurable:!0,
writable:!0
}):e[n]=_,e;
}
define("pages_new/appmsg/store.js",["pages_new/3rd/vue.js","pages_new/3rd/vuex.js","pages_new/modules/utils/url.js","pages_new/modules/comment/comment_store.js"],function(e){
"use strict";
function n(){
return window;
}
var _,t=e("pages_new/3rd/vue.js"),r=e("pages_new/3rd/vuex.js"),s=e("pages_new/modules/utils/url.js");
t.use(r);
var o={
SET_EXT_RES:"SET_EXT_RES",
SET_AD_RES:"SET_AD_RES",
SET_CGI_DATA:"SET_CGI_DATA",
SET_URL_PARAMS:"SET_URL_PARAMS"
},a=e("pages_new/modules/comment/comment_store.js"),u=new r.Store({
modules:_defineProperty({},a.name,a),
state:{
extRes:{},
adRes:{},
cgiData:{},
urlParams:{}
},
mutations:(_={},_defineProperty(_,o.SET_EXT_RES,function(e,n){
e.extRes=n;
}),_defineProperty(_,o.SET_AD_RES,function(e,n){
e.adRes=n;
}),_defineProperty(_,o.SET_CGI_DATA,function(e,n){
e.cgiData=n;
}),_defineProperty(_,o.SET_URL_PARAMS,function(e,n){
e.urlParams=n;
}),_)
});
return u.commit(o.SET_CGI_DATA,n()),u.commit(o.SET_URL_PARAMS,s.getParams()),u;
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
define("pages_new/modules/comment/comment.js",["pages/utils.js","biz_common/tmpl.js","biz_wap/jsapi/log.js","pages/scrollY.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","common/keyboard.js","common/utils.js","biz_wap/utils/device.js","common/comm_report.js","biz_wap/utils/fakehash.js","biz_wap/utils/mmversion.js","biz_common/utils/url/parse.js","pages_new/modules/comment/comment.html.js","biz_common/utils/wxgspeedsdk.js","biz_wap/utils/jsmonitor_report.js","pages_new/modules/comment/write_dialog/write_dialog.js","pages_new/modules/comment/list/list.js","pages_new/modules/comment/dialog/dialog.js","pages_new/modules/comment/dialog/unsupport.js","appmsg/comment_report.js","pages_new/modules/comment/utils.js","appmsg/emotion/emotion_panel.js","appmsg/comment/comment_report.js","pages_new/3rd/vuex.js","appmsg/comment/comment_input/comment_input.js","appmsg/comment/comment_write_old.html.js"],function(t){
"use strict";
var e,n=t("pages/utils.js"),i=t("biz_common/tmpl.js"),o=t("biz_wap/jsapi/log.js"),s=t("pages/scrollY.js"),m=t("biz_wap/utils/ajax.js"),a=t("biz_wap/jsapi/core.js"),r=t("common/keyboard.js"),c=t("common/utils.js"),d=t("biz_wap/utils/device.js"),l=t("common/comm_report.js"),h=t("biz_wap/utils/fakehash.js"),u=t("biz_wap/utils/mmversion.js"),p=t("biz_common/utils/url/parse.js"),f=t("pages_new/modules/comment/comment.html.js"),_=t("biz_common/utils/wxgspeedsdk.js"),g=t("biz_wap/utils/jsmonitor_report.js"),y=t("pages_new/modules/comment/write_dialog/write_dialog.js"),w=t("pages_new/modules/comment/list/list.js"),I=t("pages_new/modules/comment/dialog/dialog.js"),C=t("pages_new/modules/comment/dialog/unsupport.js"),v=t("appmsg/comment_report.js"),L=t("pages_new/modules/comment/utils.js"),b=t("appmsg/emotion/emotion_panel.js"),x=t("appmsg/comment/comment_report.js"),S=x.report22214,T=t("pages_new/3rd/vuex.js"),k=T.mapState,D=T.mapGetters,R=T.mapMutations,$=T.mapActions,j="comment_editing",E="my_comment_empty_data",A="wx_margin_top_tansition",P=n.getId("img-content"),M=u.is_wxwork,B=d.os.pc&&!u.is_wxwork,H=window.location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1,V=void 0,F=function(t,e){
t&&(t.style.display=e||"block");
},O=function(t){
t&&(t.style.display="none");
},z=function(t,e){
Math.random()<.999||(_.saveSpeeds({
uin:window.uin,
pid:"https:"===window.location.protocol?18:9,
speeds:[{
sid:29,
time:t
},{
sid:30,
time:e
}]
}),_.send());
},N=function(t){
var e=L.validContent(t);
return e.valid&&B&&(e.content=V.value),e;
},U=[];
c.bindDebounceScrollEvent(function(){
U.forEach(function(t){
return t();
});
});
var W=[];
return c.listenMpPageAction(function(t){
W.forEach(function(e){
return e(t);
});
}),{
name:"mp-comment",
template:f,
components:(e={},_defineProperty(e,y.name,y),_defineProperty(e,w.name,w),_defineProperty(e,I.name,I),
_defineProperty(e,C.name,C),e),
props:{
fetchBeforeExtResp:{
type:Boolean,
"default":!1
}
},
data:function(){
var t=this.$store.state.cgiData,e=0;
try{
e=1*window.atob(t.biz);
}catch(n){}
return{
commentLimit:L.getLimit("comment"),
urls:[],
scrollCount:0,
lastContent:"",
showMyAll:!1,
pcInputing:!1,
isWxWork:M,
deviceIsPc:B,
clientId:Date.now(),
canUseCancel:r.canUseCancel,
canAddComment:!window.isPaySubscribe||window.isPaySubscribe&&window.isPaid,
commonDataFor19048Report:{
BizUin:e,
BizUinStr:t.biz||"",
AppMsgId:parseInt(t.mid,10)||0,
ItemIdx:parseInt(t.idx,10)||0,
ItemShowType:parseInt(t.item_show_type,10)||0,
SessionIdStr:t.sessionid||"",
EnterId:parseInt(t.enterid,10)||0,
Scene:parseInt(t.source,10)||0,
SubScene:parseInt(t.subscene,10)||0
},
commonDataFor19462Report:{
bizuin:e,
msgid:parseInt(t.mid,10)||0,
itemidx:parseInt(t.idx,10)||0,
scene:parseInt(t.source,10)||0
},
cmtInputValue:"",
cmtInputStyle:{},
cmtTips:"",
ariaHidden:"true",
showCmtInputStatus:!1,
showCmtInputMask:!1,
showFakeCmtInput:!1,
cmtSubmitDisabled:!0,
writeAreaHeight:null,
emotionPanelShowStatus:!1,
preventMove:!1
};
},
computed:_extends({},k("mp-comment",["isVoiceover","writeStatus","commentStatus","commentData","commentVersion","myCommentStatus","myCommentData","offset","reportData","warningToast"]),D("mp-comment",["tempKey","commentId","commentEnabled","commentCount","nickName","headImg","isFans","isFansDays","onlyFansCanComment","onlyFansDaysCanComment","canC2cReply"]),{
loading:function(){
return 100===this.commentStatus;
},
myLoading:function(){
return 100===this.myCommentStatus;
},
hasComment:function(){
return window._has_comment=u.isWechat&&1===this.commentEnabled&&1*this.commentId!==0,
window._has_comment;
},
showStatement:function(){
return this.commentData&&this.commentData.elected_comment_total_cnt?this.offset+L.FETCH_CMT_LEN>=this.commentData.elected_comment_total_cnt:!1;
},
cmtEntryCtrlStatus:function(){
if(this.commentData){
if(this.checkIfFansDaysNotRequired||this.checkIfFansNotRequired)return this.myCommentList.length?1:this.commentData.elected_comment.length?2:3;
if(this.canAddComment)return this.deviceIsPc?4:this.myCommentList.length?5:this.commentData.elected_comment.length?6:7;
}
return 0;
},
fansCmtTips:function(){
return this.checkIfFansDaysNotRequired?"作者已设置关注7天后才可留言":this.checkIfFansNotRequired?"作者已设置关注后才可以留言":"";
},
checkIfFansNotRequired:function(){
return this.onlyFansCanComment&&0===this.isFans;
},
checkIfFansDaysNotRequired:function(){
return this.onlyFansDaysCanComment&&0===this.isFansDays;
},
commentList:function(){
return this.commentData&&this.commentData.elected_comment||[];
},
myCommentList:function(){
return this.myCommentData&&this.myCommentData.my_comment||[];
},
isOversize:function(){
var t=this.myCommentList.length+this.myCommentList.reduce(function(t,e){
return(e.reply_new&&e.reply_new.reply_list.length||0)+t;
},0);
return!this.showMyAll&&t>L.LIST_LIMIT;
},
cmtSubmitTitle:function(){
return this.cmtSubmitDisabled?"不可点击":"";
}
}),
watch:{
hasComment:function(t){
t&&this.initComment();
},
writeStatus:function(t){
!t&&u.isAndroid&&r.canUseCancel&&document.body.style.removeProperty("margin-bottom");
}
},
created:function(){
var t=this;
a.invoke("getUserConfig",{},function(e){
/:ok$/.test(e.err_msg)&&e.isAccessibilityMode&&t.setIsVoiceover({
value:!0
});
}),this.fetchBeforeExtResp&&this.getCommentData(),window.pageCommentReportData&&window.pageCommentReportData.idkey&&(H&&console.log("init reportData"),
this.setReportData({
data:_extends({},this.reportData,window.pageCommentReportData)
})),this.__hasReportExposeExtendList=[],this.__needRun=!0,this.__needShowDialog=!0,
this.__scrollToReplyInElected=!1,this.__isInMyList=null,this.__isInCmtList=null,
this.__inputTouchstart=null,this.__keyboardToolStart=null,this.__cmtInputBlurTimer=null,
this.__checkIsVoiceoverTimer=null,this.__hideCmtWriteMaskTimer=null,this.__curCmtAddBtn=null,
this.__pageHeight={
vertical:0,
horizontal:0
},0===window.orientation||180===window.orientation?(this.__pageHeight.vertical=c.getInnerHeight(),
this.__pageHeight.horizontal=screen.width-(screen.height-this.__pageHeight.vertical)):(this.__pageHeight.horizontal=c.getInnerHeight(),
this.__pageHeight.vertical=screen.width-(screen.height-this.__pageHeight.horizontal+60));
},
mounted:function(){
var t=this;
this.deviceIsPc&&document.body.classList.add("pages_skin_pc"),this.deviceIsPc||(this.cmtEmotionPanel=new b({
input:this.$refs.cmtInput,
vueOpt:{
instance:this,
key:"cmtInputValue"
},
limit:this.commentLimit,
counter:function(t){
return L.getLength(t);
},
onChange:function(e){
var n=e.type,i=e.value;
return"action"===n&&"done"===i?void t.onCmtSubmitBtnTap():(t.onCmtInputInput(),void(t.emotionPanelShowStatus=!0));
},
onShow:function(e){
t.showCmtInputStatus?t.scroll2Comment(e):t.cmtEmotionPanel.hide();
},
onTouchmove:function(t){
t.stopPropagation();
}
}),0===this.commentVersion&&(h.on("comment",function(){
t.commonShowCommentEntry(null,!0);
}),h.on("article",function(){
H&&console.log("FakeHash on article"),t.hideComment();
}),h.on(function(e){
"comment"===e&&t.hideComment();
}))),this.sendCommentLock=!1;
},
beforeDestroy:function(){
U=[],W=[],this.deviceIsPc||(r.offGetKeyboardHeight(this.onGetKeyboardHeight),u.isAndroid&&window.removeEventListener("resize",this.onWindowResize)),
window.removeEventListener("scroll",this.detectAutoNext),window.removeEventListener("scroll",this.detectLoading),
window.removeEventListener("scroll",this.detectExpandAllCmt),document.removeEventListener("visibilitychange",this.detectVisibleChange),
0===this.commentVersion&&(n.getId("js_cmt_goback")&&n.getId("js_cmt_goback").removeEventListener("click",this.hideCmtWhenFakeBarGoBack),
d.os.ios&&window.__second_open__&&window.removeEventListener("orientationchange",this.fixIOS8NoReflowBug));
},
methods:_extends({},R("mp-comment",["setIsVoiceover","setCommentVersion","setWriteStatus","setCommentData","setCommentStatus","setMyCommentData","setMyCommentStatus","setOffset","setReplyFlag","setReportData","setCommentLike","removeComment","addComment","updateCommentReplyInfo"]),$("mp-comment",["myReport"]),{
initComment:function(){
var e=this;
switch(this.getMyCommentData(),this.fetchBeforeExtResp?this.__renderCommentOpts&&this.renderComment(this.__renderCommentOpts):this.getCommentData(!0),
"1"===p.getQuery("js_my_comment")&&(1===this.commentVersion?this.invokeAppComment():0!==this.commentVersion||this.deviceIsPc||this.showComment(!0)),
U.push(this.detectComment),window.addEventListener("scroll",this.detectAutoNext),
window.addEventListener("scroll",this.detectLoading),window.addEventListener("scroll",this.detectExpandAllCmt),
document.addEventListener("visibilitychange",this.detectVisibleChange),this.detectExpandAllCmt(),
this.commentVersion){
case 2:
break;

case 1:
W.push(function(t){
if("deleteComment"===t.action){
var n=e.$refs.cmtList.getData({
myId:t.personal_comment_id
});
if(n){
var i=e.$refs.cmtList.getCommentIdx(n.content_id);
-1!==i&&e.removeComment({
type:"elected",
commentIdx:i
});
}
}
if("deleteCommentReply"===t.action){
var n=e.$refs.cmtList.getData({
myId:t.personal_comment_id
});
if(n){
var i=e.$refs.cmtList.getCommentIdx(n.content_id);
if(-1!==i){
var o=e.$refs.cmtList.getReplyIdx(n.content_id,t.replyId);
-1!==o&&e.removeComment({
type:"elected",
commentIdx:i,
replyIdx:o
});
}
}
}
if("praiseComment"===t.action)if(t.reply_id&&0!==t.reply_id){
var n=e.$refs.cmtList.getData({
myId:t.personal_comment_id
});
if(n){
var i=e.$refs.cmtList.getCommentIdx(n.content_id);
if(-1!==i){
var o=e.$refs.cmtList.getReplyIdx(n.content_id,t.replyId);
-1!==o&&e.setCommentLike({
type:"elected",
likeStatus:t.is_like,
commentIdx:i,
replyIdx:o
});
}
}
e.$refs.commentDialog.setReplyLikeInfo({
myId:t.personal_comment_id,
replyId:t.reply_id,
likeStatus:t.is_like
});
}else{
var n=e.$refs.cmtList.getData({
myId:t.personal_comment_id
});
if(n){
var i=e.$refs.cmtList.getCommentIdx(n.content_id);
-1!==i&&e.setCommentLike({
type:"elected",
likeStatus:t.is_like,
commentIdx:e.itemIdx
});
}
}
});
break;

case 0:
n.getId("js_cmt_goback")&&n.getId("js_cmt_goback").addEventListener("click",this.hideCmtWhenFakeBarGoBack),
d.os.ios&&window.__second_open__&&(this.__fixIOS8NoReflowBugTimer=null,this.__fixIOS8NoReflowBugSubTimer=null,
window.addEventListener("orientationchange",this.fixIOS8NoReflowBug));
}
if(this.deviceIsPc){
if(document.body.classList.add("pages_skin_pc"),!V){
var o=t("appmsg/comment/comment_input/comment_input.js");
V=new o({
placeholder:"留言被公众号精选后，将对所有人可见",
submitText:"留言",
length:this.commentLimit
});
}
V.onSubmit=this.comment,V.onHide=function(){
e.pcInputing=!1;
};
}else if(r.onGetKeyboardHeight(this.onGetKeyboardHeight),u.isAndroid&&window.addEventListener("resize",this.onWindowResize),
0===this.commentVersion){
var s=t("appmsg/comment/comment_write_old.html.js");
if(document.body.insertAdjacentHTML("beforeend",i.tmpl(s,{
textPageTitle:1*window.item_show_type===10?n.getId("js_text_content").innerHTML.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,""):window.msg_title.html(1)
},!1)),window.__second_open__&&d.os.ios&&(n.getId("js_cmt_mine").style.marginBottom=getComputedStyle(n.getId("js_fake_bar")).height),
!V){
var o=t("appmsg/comment/comment_input/comment_input.js");
V=new o({
placeholder:"留言被公众号精选后，将对所有人可见",
submitText:"留言",
length:this.commentLimit
});
}
V.onSubmit=this.comment,V.onClick=function(){
window.__second_open__&&O(n.getId("js_fake_bar"));
},V.onBlur=function(){
"none"!==n.getId("js_cmt_mine").style.display&&F(n.getId("js_fake_bar"));
},V.show(n.getId("js_comment_input_old"),{
renderType:"append"
});
}
},
initCommentReport:function(){
if(!this.__hasInitCommentReport){
this.__hasInitCommentReport=!0;
var t=this.$store.state.cgiData;
new v({
comment_id:this.commentId,
appmsgid:t.appmsgid,
idx:t.idx,
item_show_type:t.item_show_type||0,
biz:t.biz
});
}
},
onGetKeyboardHeight:function(t){
var e=t.keyboard,n=t.input;
r.onlyUseH5Keyboard?(this.__checkIsVoiceoverTimer&&(clearTimeout(this.__checkIsVoiceoverTimer),
this.__checkIsVoiceoverTimer=null),!this.emotionPanelShowStatus&&this.scroll2Comment(e)):this.scroll2Comment(e+n,this.$refs.cmtContainer.getBoundingClientRect().top);
},
getCommentData:function(t,e){
var n=this;
if(1*this.commentId!==0&&(t&&this.setOffset({
value:0
}),!this.loading&&-1!==this.offset)){
var i=c.getScrollTop(),s=document.documentElement.scrollHeight;
if(!(this.offset>0&&s-i-c.getInnerHeight()>500)){
if("number"==typeof this.commentCount&&0===this.commentCount&&!t)return void this.renderComment({
resp:{
enabled:1,
elected_comment:[],
elected_comment_total_cnt:0,
my_comment:[],
only_fans_can_comment:this.onlyFansCanComment,
is_fans:this.isFans,
logo_url:this.headImg,
nick_name:this.nickName
}
});
this.setCommentStatus({
status:100
});
var a=this.$store.state.cgiData,r=p.join("/mp/appmsg_comment",{
action:"getcomment",
scene:this.reportData.scene,
appmsgid:a.appmsgid,
idx:a.idx,
comment_id:this.commentId,
offset:this.offset,
limit:L.FETCH_CMT_LEN,
send_time:a.send_time,
sessionid:a.sessionid||"",
enterid:parseInt(a.enterid,10)||0
},!0),d=Date.now();
this.detectLoading();
try{
this.scrollCount++,t&&(this.urls=[]),this.scrollCount>1&&!t&&this.myReport([this.reportData.moreList,encodeURIComponent(r)]),
this.urls.indexOf(r)>-1&&this.myReport([this.reportData.repeatList,encodeURIComponent(r)]),
this.urls.push(r);
}catch(l){
console.error(l);
}
H&&console.info("[图文评论] 开始请求评论数据:",r),o.info("[Appmsg comment] start get comment data, url:"+r),
m({
url:r,
dataType:"json",
success:function(i){
var s=i.base_resp&&i.base_resp.ret;
if(0===s){
i.elected_comment.forEach(function(t){
t.is_elected=1;
});
var m={
resp:i,
forceRefresh:t,
notFirstRender:e,
loadTime:Date.now()-d
};
n.fetchBeforeExtResp&&0===n.offset&&!n.hasComment?n.__renderCommentOpts=m:n.renderComment(m);
}else n.myReport([n.reportData.errList,"type:resperr;url:"+encodeURIComponent(r)+";ret="+s]);
o.info("[Appmsg comment] get comment success");
},
error:function(){
n.myReport([n.reportData.errList,"type:ajaxerr;url:"+encodeURIComponent(r)]),o.info("[Appmsg comment] get comment ajax error");
},
complete:function(){
n.setCommentStatus({
status:1
}),window.removeEventListener("scroll",n.detectLoading);
}
});
}
}
},
getMyCommentData:function(){
var t=this;
if(0===this.myCommentStatus){
var e=this.$store.state.cgiData,i=p.join("/mp/appmsg_comment",{
action:"getmycomment",
scene:this.reportData.scene,
appmsgid:e.appmsgid,
idx:e.idx,
comment_id:this.commentId,
sessionid:e.sessionid||"",
enterid:parseInt(e.enterid,10)||0
},!0);
this.setMyCommentStatus({
status:100
}),0===this.commentVersion&&Array.prototype.forEach.call(n.qsAll(".js_mycmt_loading"),F),
m({
url:i,
dataType:"json",
success:function(e){
var n=e.base_resp&&e.base_resp.ret;
0===n?(t.setMyCommentStatus({
status:1
}),t.setMyCommentData({
data:e
})):(t.setMyCommentStatus({
status:0
}),t.myReport([t.reportData.errComment,"type:resperr;url:"+encodeURIComponent(i)+";ret="+n])),
t.__hasRenderMyList=!0,t.afterRender(!0,!1);
},
error:function(){
t.setMyCommentStatus({
status:0
}),t.myReport([t.reportData.errComment,"type:ajaxerr;url:"+encodeURIComponent(i)]);
},
complete:function(){
0===t.commentVersion&&Array.prototype.forEach.call(n.qsAll(".js_mycmt_loading"),O);
}
});
}
},
renderComment:function(t){
var e=t.resp,n=t.forceRefresh,i=t.notFirstRender,o=t.loadTime,s=Date.now();
if(this.setReplyFlag({
flag:this.canC2cReply?e.reply_flag:0
}),this.myReport([this.reportData.handleList,encodeURIComponent(JSON.stringify({
comment_id:this.commentId,
offset:this.offset,
url:window.location.href
}))]),1!==e.enabled&&(e.elected_comment=[],e.elected_comment_total_cnt=0),0===this.offset){
this.setCommentData({
data:e
});
var m=e.elected_comment;
m&&m.length&&(this.__hasReportCommentShowTime||"5"!==window.item_show_type||(this.__hasReportCommentShowTime=!0,
Math.random()<.1&&(_.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:27,
time:Date.now()-window.logs.pagetime.page_begin
}]
}),_.send()))),this.__hasRenderCmtList=!0,this.afterRender(n,i),this.scrollToDown();
}else{
var m=e.elected_comment;
m&&m.length&&this.setCommentData({
data:_extends({},this.commentData,{
elected_comment:this.commentData.elected_comment.concat(m)
})
});
}
this.setOffset(0===e.elected_comment_total_cnt?{
value:-1
}:this.offset+L.FETCH_CMT_LEN>=e.elected_comment_total_cnt?{
value:-1
}:{
value:this.offset+e.elected_comment.length
}),this.initCommentReport(),o&&this.$nextTick(function(){
z(o,Date.now()-s);
});
},
afterRender:function(t,e){
var i=this;
this.$nextTick(function(){
var o=function(t){
t&&window.scrollTo(0,t.getBoundingClientRect().top+n.getScrollTop()-6);
};
if(i.__needRun&&window.goContentId&&!e&&t)if(!window.onload_endtime||Date.now()-window.onload_endtime<1e3){
if(i.__hasRenderMyList&&(null===i.__isInMyList&&(i.__isInMyList=null!==i.$refs.myList.getData({
contentId:window.goContentId
})),i.__isInMyList))return void(i.commentData&&i.commentData.enabled&&(i.showAllMyList(),
o(""!==window.goReplyId?i.$refs.myList.getReply(window.goContentId,1*window.goReplyId).$el:i.$refs.myList.getComment(window.goContentId).$el),
i.__needRun=!1));
i.__hasRenderCmtList&&(null===i.__isInCmtList&&(i.__goCommentData=i.$refs.cmtList.getData({
contentId:window.goContentId
}),i.__isInCmtList=null!==i.__goCommentData),i.__isInCmtList&&(i.__needShowDialog&&""!==window.goReplyId&&(i.__goCommentData.reply_new.reply_total_cnt&&i.__goCommentData.reply_new.reply_total_cnt!==i.__goCommentData.reply_new.reply_list.length?i.$refs.commentDialog.show(i.$refs.cmtList.getData({
contentId:window.goContentId
}),1*window.goReplyId):i.__scrollToReplyInElected=!0,i.__needShowDialog=!1),i.__hasRenderMyList&&(o(i.__scrollToReplyInElected?i.$refs.cmtList.getReply(window.goContentId,1*window.goReplyId).$el:i.$refs.cmtList.getComment(window.goContentId).$el),
i.__needRun=!1)));
}else i.__needRun=!1;
});
},
isInsideView:function(t){
if(!t)return!1;
var e=c.getScrollTop(),n=t.offsetTop;
return t!==this.$el&&(n+=this.$el.offsetTop),e+c.getInnerHeight()>n&&n>=e;
},
scrollToDown:function(){
var t=this;
this.$nextTick(function(){
var e=t.$refs.cmtArea.getBoundingClientRect().y;
location.href.indexOf("scrolltodown")>-1&&e&&window.scrollTo(0,e-25);
});
},
showAllMyList:function(){
this.showMyAll=!0,this.detectComment();
},
detectExtendCmt:function(t){
var e=t.dataset.myId;
-1===this.__hasReportExposeExtendList.indexOf(e)&&this.isInsideView(t)&&(l.report(19462,_extends({
PersonalCommentId:parseInt(e,10)||0,
CommentId:parseInt(this.commentId,10)||0,
actiontype:1,
wording:"余下N条",
number:parseInt(t.dataset.num,10)||0,
devicetype:this.deviceIsPc?1:2
},this.commonDataFor19462Report)),this.__hasReportExposeExtendList.push(e));
},
detectAutoNext:function(){
var t=this;
1*window.item_show_type===5&&!this.__detectCmtViewTimeout&&this.$refs.cmtHeader&&!function(){
var e=c.getScrollTop(),n=t.$refs.cmtHeader.offsetTop+t.$el.offsetTop;
e+c.getInnerHeight()>n&&(t.__detectCmtViewTimeout=setTimeout(function(){
t.__detectCmtViewTimeout=null,Math.abs(c.getScrollTop()-e)>50&&t.cancelAutoNext(9);
},200));
}();
},
detectLoading:function(){
try{
this.isInsideView(this.$refs.loading)&&this.loading&&(g.setLogs({
id:28307,
key:45,
value:1,
lc:1,
log0:""
}),window.removeEventListener("scroll",this.detectLoading));
}catch(t){
console.error(t);
}
},
detectExpandAllCmt:function(){
this.hasComment?this.isInsideView(this.$refs.mylistFolder)&&(l.report(19462,_extends({
CommentId:parseInt(this.commentId,10)||0,
actiontype:1,
wording:"展开全部留言",
number:this.$refs.myList.count,
devicetype:1
},this.commonDataFor19462Report)),window.removeEventListener("scroll",this.detectExpandAllCmt)):window.removeEventListener("scroll",this.detectExpandAllCmt);
},
detectComment:function(){
var t=this;
if(1===this.myCommentStatus&&this.$refs.myList&&this.$refs.cmtList){
var e=c.getInnerHeight();
[this.$refs.myList.getItemList(),this.$refs.cmtList.getItemList()].forEach(function(n,i){
var o=t.$refs[i?"cmtList":"myList"];
n.some(function(t){
var n=t.$el;
if(!n.isExposed){
var s=n.getBoundingClientRect(),m=.5*s.height;
if(s.bottom>m&&s.top<e-m){
n.isExposed=!0;
var a=n.dataset,r={
PersonalCommentId:1*a.myId,
ReplyId:0,
IsPopup:0,
IsReplyOther:0,
CommentReplyType:i?1:2
};
if(a.replyId){
var c=o.getData({
type:"reply",
contentId:a.contentId,
replyId:1*a.replyId
});
r.ReplyId=c.reply_id,r.IsReplyOther=c.to_nick_name&&c.to_content?1:0;
}
S(r);
}else if(s.top>=e-m)return!0;
}
return!1;
});
});
}
},
detectVisibleChange:function(){
document.hidden||this.isInsideView(this.$el)||this.getCommentData(!0,!0),u.isIOS&&"hidden"===document.visibilityState&&this.hideCmtInput(!0);
},
invokeAppComment:function(){
switch(this.commentVersion){
case 2:
break;

case 1:
a.invoke("handleMPPageAction",{
action:"writeComment",
title:this.$store.state.cgiData.title,
comment_id:this.commentId,
style:"white"
});
}
1*window.item_show_type===5&&this.cancelAutoNext(6);
},
showPcInputPanel:function(){
this.pcInputing=!0,V.show(this.$refs.inputPC);
},
hideCmtWhenFakeBarGoBack:function(t){
t.preventDefault(),this.hideComment(),O(n.getId("js_fake_bar"));
},
fixIOS8NoReflowBug:function(){
var t=this;
"none"!==n.getId("js_fake_bar").style.display&&(clearTimeout(this.__fixIOS8NoReflowBugTimer),
this.__fixIOS8NoReflowBugTimer=setTimeout(function(){
window.innerWidth!==parseFloat(getComputedStyle(n.getId("js_fake_bar")).width)&&(clearTimeout(t.__fixIOS8NoReflowBugSubTimer),
n.getId("js_cmt_mine").style.height=c.getInnerHeight()+"px",window.scrollBy&&window.scrollBy(0,1),
t.__fixIOS8NoReflowBugSubTimer=setTimeout(function(){
window.scrollBy&&window.scrollBy(0,-1),n.getId("js_cmt_mine").style.height="";
},100));
},50));
},
showComment:function(t){
this.__isShowOldCommentWrite=!0,this.__showCommentScrollTop=c.getScrollTop(),!this.deviceIsPc&&O(n.getId("js_article")),
n.getId("js_my_list_old").appendChild(this.$refs.myList.$el),this.showAllMyList(),
F(n.getId("js_cmt_mine")),document.body.classList[this.$refs.myList.count?"remove":"add"](E),
window.__second_open__&&d.os.ios&&F(n.getId("js_fake_bar")),window.scrollTo(0,0),
this.getMyCommentData(),!t&&setTimeout(function(){
return V.focus();
},3);
},
hideComment:function(){
this.__isShowOldCommentWrite=!1,this.$refs.myListContainer.appendChild(this.$refs.myList.$el),
O(n.getId("js_cmt_mine")),F(n.getId("js_article")),window.scrollTo(0,this.__showCommentScrollTop),
document.body.classList.remove(j),document.body.classList.remove(E);
},
sendComment:function(t){
var e=this,n=t.content,i=t.successBegin,o=t.successEnd,s=t.fail,a=t.complete;
this.sendCommentLock||!function(){
e.lastContent!==n&&(e.clientId=Date.now());
var t=e.$store.state.cgiData,r=p.join("/mp/appmsg_comment",{
action:"addcomment",
scene:e.reportData.scene,
appmsgid:t.appmsgid,
idx:t.idx,
comment_id:e.commentId,
sn:t.sn,
sessionid:t.sessionid||"",
enterid:parseInt(t.enterid,10)||0
},!0);
m({
url:r,
data:{
content:n,
title:t.title,
head_img:e.headImg,
nickname:e.nickName,
client_id:e.clientId
},
type:"POST",
dataType:"json",
success:function(t){
switch("function"==typeof i&&i(),+t.ret){
case 0:
var m={
content:n,
nick_name:e.nickName,
create_time:Date.now()/1e3|0,
is_elected:0,
logo_url:e.headImg,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:t.my_id,
content_id:t.content_id,
reply_new:{
reply_list:[]
},
needAnimation:!0
};
return e.addComment({
commentItem:m
}),e.showAllMyList(),void("function"==typeof o&&o());

case-6:
window.weui.alert("你留言的太频繁了，休息一下吧");
break;

case-7:
window.weui.alert("你还未关注该公众号，不能参与留言");
break;

case-10:
window.weui.alert("字数不能多于"+e.commentLimit+"个");
break;

case-15:
window.weui.alert("留言已关闭");
break;

case-18:
window.weui.alert("你在此文章的留言次数已达上限");
break;

default:
e.lastContent=n,window.weui.alert("系统错误，请重试");
}
e.myReport([e.reportData.addCommentErr,"type:resperr;url:"+encodeURIComponent(r)+";ret="+t.ret]),
"function"==typeof s&&s();
},
error:function(t){
console.log(t),e.myReport([e.reportData.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(r)]),
"function"==typeof s&&s();
},
complete:function(){
e.sendCommentLock=!1,"function"==typeof a&&a();
}
});
}();
},
comment:function(){
var t=this,e=V.getSubmit(),n=V.getInput();
if(e.disabled!==!0){
var i=N(this.deviceIsPc?V.value:n.value),o=i.valid,s=i.content;
o&&(e.disabled=!0,this.sendComment({
content:s,
successBegin:function(){
!t.deviceIsPc&&V.hideEmotionPannel();
},
successEnd:function(){
t.deviceIsPc?(V.hide(),t.pcInputing=!1):n.value="";
},
complete:function(){
""!==n.value&&(e.disabled=!1);
}
}));
}
},
cancelAutoNext:function(t){
this.$store.dispatch("mp-video-player/auto-next-plugin/cancelAutoNextWhenTipsShowed",t);
},
commonShowCommentEntry:function(t,e){
switch(t&&t.preventDefault(),this.invokeAppComment(),this.commentVersion){
case 2:
l.report(19048,_extends({
EventType:1,
IsFans:this.isFans,
CommentPageType:3
},this.commonDataFor19048Report));
break;

case 1:
l.report(19048,_extends({
EventType:1,
IsFans:this.isFans,
CommentPageType:2
},this.commonDataFor19048Report));
break;

case 0:
default:
if(document.body.classList.add(j),e)return H&&console.log("FakeHash on comment"),
void this.showComment();
window.__second_open__&&d.os.ios?this.showComment():(H&&console.log("push comment"),
h.push("comment")),l.report(19048,_extends({
EventType:1,
IsFans:this.isFans,
CommentPageType:1
},this.commonDataFor19048Report));
}
},
showNativeKeyboard:function(){
var t=this;
r.show({
type:"comment",
mask:!0,
disableScroll:!0,
text:this.cmtInputValue,
placeholder:"留言精选后，将对所有人可见，轻触可换行",
maxLength:this.commentLimit,
showRemindWordCount:L.REMIND_WORD_COUNT,
disableScrollAdjustment:!1,
scrollContentY:n.getScrollTop()+this.$refs.writeArea.getBoundingClientRect().top+90,
success:function(e){
var n=N(e),i=n.valid,o=n.content;
i&&t.sendComment({
content:o,
successEnd:function(){
this.cmtInputValue="";
},
fail:function(){
this.cmtInputValue=e;
}
});
},
cancel:function(e){
t.cmtInputValue=e;
},
hide:function(){
t.showCmtInputStatus=!1,document.body.style.removeProperty("margin-bottom"),P&&(P.classList.remove(A),
P.style.removeProperty("margin-top")),L.unlockOrientation();
}
});
},
showCmtInput:function(t){
var e=this,n=L.lockOrientation();
if(this.showCmtInputStatus=!0,r.onlyUseH5Keyboard){
this.__curCmtAddBtn=t.target;
var i=window.getComputedStyle(this.$refs.writeAreaInner),o=i.marginTop,s=i.marginBottom;
this.showCmtInputMask=!0,this.emotionPanelShowStatus=!1,this.writeAreaHeight=this.$refs.writeAreaInner.offsetHeight+parseInt(o,10)+parseInt(s,10)+"px",
this.ariaHidden="false",this.$forceUpdate(),this.isVoiceover||(this.__checkIsVoiceoverTimer=setTimeout(function(){
e.setIsVoiceover({
value:!0
});
},1e3)),u.isIOS?(a.invoke("handleMPPageAction",{
action:"opInputAccessoryView",
show:!1
}),this.$refs.cmtInput.focus()):setTimeout(function(){
return e.$refs.cmtInput.focus();
});
}else r.lastData.keyboard&&r.lastData.cmtInput&&this.scroll2Comment(r.lastData.keyboard+r.lastData.cmtInput,this.$refs.cmtContainer.getBoundingClientRect().top),
n?setTimeout(function(){
return e.showNativeKeyboard();
},300):this.showNativeKeyboard();
},
onCmtInputTouchstart:function(t){
this.emotionPanelShowStatus&&(this.preventMove=!0,this.emotionPanelShowStatus=!1),
this.__inputTouchstart=1===t.touches.length?t.touches[0]:null;
},
onCmtInputTouchmove:function(t){
var e=this;
this.preventMove&&t.preventDefault(),u.isAndroid?setTimeout(function(){
return e.$refs.cmtInput.focus();
}):this.$refs.cmtInput.focus();
},
onCmtInputTouchend:function(){
this.preventMove=!1;
},
onCmtInputPaste:function(t){
var e=t.clipboardData.getData("text"),n=L.getLength(e),i=L.getLength(this.cmtInputValue);
if(i+n>this.commentLimit){
t.preventDefault();
for(var o=this.commentLimit-i,s="",m=0,a=e.length;a>m&&o>0&&(o-=/[^\x00-\xff]/.test(e[m])?1:.5,
!(0>o));m++)s+=e[m];
var r=this.$refs.cmtInput,c=this.cmtInputValue.substring(0,r.selectionStart),d=this.cmtInputValue.substring(r.selectionEnd),l=r.selectionStart+s.length;
this.cmtInputValue=c+s+d,this.onCmtInputInput(),r.scrollTop=r.scrollHeight,r.setSelectionRange(l,l);
}
},
onCmtInputInput:function(){
var t=L.getLength(this.cmtInputValue);
this.cmtSubmitDisabled=0>=t||t>this.commentLimit,this.setCmtTips();
},
onCmtInputKeydown:function(t){
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
L.getLength(this.cmtInputValue)>=this.commentLimit&&t.preventDefault();
}
},
onCmtInputFocus:function(){
u.isIOS&&this.doCmtInputFocus();
},
doCmtInputFocus:function(){
var t=this;
if(!this.isVoiceover){
var e=this.$refs.cmtInput.scrollTop;
this.cmtInputStyle.padding=0,this.cmtInputStyle.height=0,this.showFakeCmtInput=!0,
this.$refs.fakeCmtInput.scrollTop=e,setTimeout(function(){
t.cmtInputStyle={},t.showFakeCmtInput=!1;
},300);
}
r.lastData.keyboard&&!this.emotionPanelShowStatus&&this.scroll2Comment(r.lastData.keyboard);
},
onCmtInputBlur:function(){
var t=this;
u.isIOS&&(this.__cmtInputBlurTimer=setTimeout(function(){
!t.isVoiceover&&t.hideCmtInput(),t.__cmtInputBlurTimer=null;
}));
},
hideCmtInput:function(t){
var e=this;
L.unlockOrientation(),this.$refs.cmtInput.blur(),this.showCmtInputStatus=!1,document.body.style.removeProperty("margin-bottom"),
P&&(P.classList.remove(A),P.style.removeProperty("margin-top")),this.cmtEmotionPanel.hide(),
this.writeAreaHeight=null,this.ariaHidden="true",this.$forceUpdate(),this.__hideCmtWriteMaskTimer&&(clearTimeout(this.__hideCmtWriteMaskTimer),
this.__hideCmtWriteMaskTimer=null),t===!0?this.showCmtInputMask=!1:this.__hideCmtWriteMaskTimer=setTimeout(function(){
e.showCmtInputMask=!1,e.__hideCmtWriteMaskTimer=null;
},500),u.isIOS&&a.invoke("handleMPPageAction",{
action:"opInputAccessoryView",
show:!0
}),this.isVoiceover&&this.__curCmtAddBtn&&(this.__curCmtAddBtn.setAttribute("tabindex","-1"),
this.__curCmtAddBtn.focus(),this.__curCmtAddBtn=null);
},
onKeyboardToolTouchstart:function(t){
var e=t.target;
e===this.$refs.cmtWriteEmotion||e===this.$refs.cmtSubmit&&!this.cmtSubmitDisabled||t.preventDefault();
},
toggleEmotion:function(){
var t=this;
this.__cmtInputBlurTimer&&(clearTimeout(this.__cmtInputBlurTimer),this.__cmtInputBlurTimer=null),
this.cmtEmotionPanel.isShow?(this.emotionPanelShowStatus=!1,u.isAndroid?setTimeout(function(){
return t.$refs.cmtInput.focus();
}):this.$refs.cmtInput.focus()):(this.emotionPanelShowStatus=!0,this.$refs.cmtInput.blur()),
this.cmtEmotionPanel.toggle();
},
onCmtSubmitClick:function(){
var t=this;
if(this.__cmtInputBlurTimer&&(clearTimeout(this.__cmtInputBlurTimer),this.__cmtInputBlurTimer=null),
!this.cmtSubmitDisabled){
var e=N(this.cmtInputValue),n=e.valid,i=e.content;
n&&(this.cmtSubmitDisabled=!0,this.sendComment({
content:i,
successEnd:function(){
t.cmtInputValue="",setTimeout(function(){
t.emotionPanelShowStatus=!1,t.hideCmtInput();
},10);
},
fail:function(){
t.cmtSubmitDisabled=!1;
}
}));
}
},
onCmtAreaTouchmove:function(t){
if(t.target===this.$refs.cmtInput){
var e=t.target;
if(null===this.__inputTouchstart)t.preventDefault();else{
var n=t.changedTouches[0].clientY-this.__inputTouchstart.clientY;
(e.scrollTop<=0&&n>0||e.scrollTop>=e.scrollHeight-e.offsetHeight&&0>n)&&t.preventDefault();
}
}else t.preventDefault();
},
onWindowResize:function(){
if(this.showCmtInputStatus){
var t=0===window.orientation||180===window.orientation?"vertical":"horizontal",e=this.__pageHeight[t],n=c.getInnerHeight();
e>n?r.onlyUseH5Keyboard&&this.doCmtInputFocus():(r.onlyUseH5Keyboard&&!this.emotionPanelShowStatus&&this.hideCmtInput(),
n>e&&(this.__pageHeight[t]=n));
}
},
scroll2Comment:function(t,e){
var n=this;
this.showCmtInputStatus&&this.$nextTick(function(){
void 0===e&&(e=n.$refs.writeArea.getBoundingClientRect().bottom);
var i=n.__pageHeight[0===window.orientation||180===window.orientation?"vertical":"horizontal"],o=e-(i-t),m=Math.abs(o),a=c.getScrollTop(),d=document.body.scrollHeight-a-i;
if(o>d&&(r.onlyUseH5Keyboard||u.isAndroid))document.body.style.marginBottom=(document.body.style.marginBottom?parseInt(document.body.style.marginBottom,10):0)+o-d+"px";else if(0>o&&m>a&&P&&(P.classList.add(A),
P.style.marginTop=(P.style.marginTop?parseInt(P.style.marginTop,10):0)+m-a+"px",
!r.onlyUseH5Keyboard&&u.isIOS))return;
var l={
distance:o,
end:r.onlyUseH5Keyboard&&u.isAndroid?function(){
var e=n.$refs.writeArea.getBoundingClientRect().bottom,i=c.getInnerHeight()-(n.emotionPanelShowStatus?t:0);
Math.abs(e-i)>=3&&s.start({
distance:e-i,
duration:.1
});
}:null
};
150>m?l.speed=300:l.duration=.3,s.start(l);
});
},
setCmtTips:function(t){
t=t||L.getLength(this.cmtInputValue),this.cmtTips=t>=this.commentLimit-L.REMIND_WORD_COUNT&&t<this.commentLimit?"还可以输入"+(this.commentLimit-t)+"个字":t===this.commentLimit?"达到"+this.commentLimit+"字输入上限":t>this.commentLimit?"已超出"+(t-this.commentLimit)+"字":"";
},
addCmtListComment:function(t,e,n){
if(this.canC2cReply){
if(this.$refs.commentDialog.replyData[t]=void 0,"undefined"!=typeof t){
var i=this.$refs.cmtList.getCommentIdx(t);
-1!==i&&this.updateCommentReplyInfo({
commentIdx:i,
key:"max_reply_id",
value:n.reply_id+1
});
}
}else if("undefined"!=typeof t&&"undefined"==typeof e){
var i=this.$refs.myList.getCommentIdx(t);
-1!==i&&this.addComment({
type:"mine",
commentIdx:i,
replyItem:n
});
}else if("undefined"!=typeof t&&"undefined"!=typeof e){
var i=this.$refs.myList.getCommentIdx(t);
if(-1!==i){
var o=this.$refs.myList.getReplyIdx(t,e);
-1!==o&&this.addComment({
type:"mine",
commentIdx:i,
replyIdx:o,
replyItem:n
});
}
}
this.detectComment();
},
praiseCmtListComment:function(t,e,n){
if(this.canC2cReply)this.$refs.commentDialog.setReplyLikeInfo({
contentId:t,
replyId:e,
likeStatus:n
});else if("undefined"!=typeof t&&"undefined"==typeof e){
var i=this.$refs.myList.getCommentIdx(t);
-1!==i&&this.setCommentLike({
type:"mine",
likeStatus:n,
commentIdx:i
});
}else if("undefined"!=typeof t&&"undefined"!=typeof e){
var i=this.$refs.myList.getCommentIdx(t);
if(-1!==i){
var o=this.$refs.myList.getReplyIdx(t,e);
-1!==o&&this.setCommentLike({
type:"mine",
likeStatus:n,
commentIdx:i,
replyIdx:o
});
}
}
},
removeCmtListComment:function(t,e){
if(this.canC2cReply)this.$refs.commentDialog.replyData[t]=void 0;else if("undefined"!=typeof t&&"undefined"==typeof e){
var n=this.$refs.myList.getCommentIdx(t);
-1!==n&&this.removeComment({
type:"mine",
commentIdx:n
});
}else if("undefined"!=typeof t&&"undefined"!=typeof e){
var n=this.$refs.myList.getCommentIdx(t);
if(-1!==n){
var i=this.$refs.myList.getReplyIdx(t,e);
-1!==i&&this.removeComment({
type:"mine",
commentIdx:n,
replyIdx:i
});
}
}
this.detectComment();
},
addMyListComment:function(t,e,n){
!this.canC2cReply&&this.syncCmtListAdd(t,e,n),this.showAllMyList();
},
praiseMyListComment:function(t,e,n){
!this.canC2cReply&&this.syncCmtListPraise(t,e,n);
},
removeMyListComment:function(t,e){
!this.canC2cReply&&this.syncCmtListRemove(t,e),this.detectComment();
},
showCommentDialog:function(t,e){
this.$refs.commentDialog.show(t,e);
},
navShadowClick:function(){
this.$refs.commentDialog.hide();
},
syncCmtListAdd:function(t,e,n){
if("undefined"!=typeof t&&"undefined"==typeof e){
var i=this.$refs.cmtList.getCommentIdx(t);
-1!==i&&this.addComment({
type:"elected",
commentIdx:i,
replyItem:n
});
}else{
var i=this.$refs.cmtList.getCommentIdx(t);
if(-1!==i){
var o=this.$refs.cmtList.getReplyIdx(t,e);
-1!==o&&this.addComment({
type:"elected",
commentIdx:i,
replyIdx:o,
replyItem:n
});
}
}
},
syncCmtListPraise:function(t,e,n){
if("undefined"!=typeof t&&"undefined"==typeof e){
var i=this.$refs.cmtList.getCommentIdx(t);
-1!==i&&this.setCommentLike({
type:"elected",
likeStatus:n,
commentIdx:i
});
}else if("undefined"!=typeof t&&"undefined"!=typeof e){
var i=this.$refs.cmtList.getCommentIdx(t);
if(-1!==i){
var o=this.$refs.cmtList.getReplyIdx(t,e);
-1!==o&&this.setCommentLike({
type:"elected",
likeStatus:n,
commentIdx:i,
replyIdx:o
});
}
}
},
syncCmtListRemove:function(t,e){
if("undefined"!=typeof t&&"undefined"==typeof e){
var n=this.$refs.cmtList.getCommentIdx(t);
-1!==n&&this.removeComment({
type:"elected",
commentIdx:n
});
}else if("undefined"!=typeof t&&"undefined"!=typeof e){
var n=this.$refs.cmtList.getCommentIdx(t);
if(-1!==n){
var i=this.$refs.cmtList.getReplyIdx(t,e);
-1!==i&&this.removeComment({
type:"elected",
commentIdx:n,
replyIdx:i
});
}
}
},
tempBtnClick:function(){
a.invoke("confirmDialog",{
title:"预览状态下无法操作",
contentDesc:"",
confirmText:"确定"
},function(t){
console.log(t);
});
}
})
};
});