define("appmsg/profile/mp_profile_tpl.html.js",[],function(){
return' <!-- profile卡片 -->\n<div class="appmsg_card_context wx_profile_card js_wx_profile_card js_wx_tap_highlight wx_tap_card" data-id="<#=id#>" data-isban="<#=isban#>" data-index="<#=index#>" \n  role="link"\n  aria-labelledby="js_wx_profile_nickname js_a11y_comma js_wx_profile_signature js_a11y_comma js_profile_desc js_a11y_comma js_wx_profile_logo"\n  >\n  <div class="wx_profile_card_bd" aria-hidden="true">\n    <div class="wx_profile weui-flex">\n      <div class="wx_profile_hd">\n        <# if(round_head_img) { #>\n        <img class="wx_profile_avatar" src="<#=round_head_img#>" alt="">\n        <# } else {#>\n        <img class="wx_profile_avatar" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="">\n        <# } #>\n      </div>\n      <div class="wx_profile_bd weui-flex weui-flex__item">\n        <div class="weui-flex__item">\n          <strong class="wx_profile_nickname" id="js_wx_profile_nickname">\n              <#  if(nickname) { #>\n                <#=nickname#>\n\n              <# } else { #>\n                <#=alias#>\n              <#}#>\n          </strong>\n          <div class="wx_profile_desc" id="js_wx_profile_signature"><#=signature#></div>\n          <div class="wx_profile_tips" id="js_profile_desc">\n            <span class="wx_profile_tips_meta" id="js_profile_article" <#if (original_num === 0){ #> style="display:none" <# } #>><#=original_num#>篇原创内容</span>\n            <!-- <span class="wx_profile_tips_meta" id="js_profile_friends"></span> -->\n          </div>\n        </div>\n        <i class="weui-icon-arrow"></i>\n      </div>\n    </div>\n  </div>\n  <div class="wx_profile_card_ft" aria-hidden="true" id="js_wx_profile_logo">公众号</div>\n</div>\n';
});define("appmsg/channel/report_topic.js",["common/comm_report.js"],function(n){
"use strict";
var o=n("common/comm_report.js"),e=function(n,e){
var t=0;
try{
t=1*window.atob(window.biz);
}catch(i){}
o.report(24980,{
BizUin:t,
AppMsgID:window.parseInt(window.mid,10)||0,
ItemIndex:window.parseInt(window.idx,10)||0,
Scene:window.parseInt(window.scene,10)||0,
Enterid:window.parseInt(window.enterid,10)||0,
Action:n,
ActionTS:Math.ceil(Date.now()/1e3),
EventId:e||""
});
};
return{
report:e
};
});define("appmsg/channel/report_live.js",["common/comm_report.js"],function(n){
"use strict";
var e=n("common/comm_report.js"),o=function(n,o,i,t){
var r=0;
try{
r=1*window.atob(window.biz);
}catch(w){}
e.report(22035,{
BizUin:r,
AppMsgID:window.parseInt(window.mid,10)||0,
ItemIndex:window.parseInt(window.idx,10)||0,
Scene:window.parseInt(window.scene,10)||0,
Enterid:window.parseInt(window.enterid,10)||0,
Action:n,
Status:t||"",
ActionTS:Math.ceil(Date.now()/1e3),
Noticeid:o||"",
Username:i||""
});
};
return{
report:o
};
});define("appmsg/channel/time_format.js",[],function(){
"use strict";
var e=function(e){
var t=e+"";
return t.length>=2?t:"0"+t;
},t=function(t){
var a=new Date(1e3*t);
return a.getFullYear()<=(new Date).getFullYear()?e(a.getMonth()+1)+"月"+e(a.getDate())+"日 "+e(a.getHours())+":"+e(a.getMinutes()):a.getFullYear()+"年"+e(a.getMonth()+1)+"月"+e(a.getDate())+"日 "+e(a.getHours())+":"+e(a.getMinutes());
},a=function(e,t){
var a=void 0;
switch(e=parseInt(e,10),t=parseInt(t,10),e){
case 0:
a=0===t?"预约":"已预约";
break;

case 1:
a="已失效";
break;

case 2:
a="观看";
break;

case 3:
a="已结束";
break;

default:
a="预约";
}
return a;
},r=function(e,a){
var r=void 0;
switch(a=parseInt(a,10)){
case 0:
r="将在"+t(e)+" 直播";
break;

case 1:
case 3:
r=t(e)+" 直播";
break;

case 2:
r="正在直播";
break;

default:
r="正在直播";
}
return r;
};
return{
getFullTime:t,
getStatusWording:a,
getStatusDesc:r
};
});define("appmsg/channel/video_snap_tpl.html.js",[],function(){
return'<# if(snapType === \'video\'){ #>\n<div role="link" class="wxw_wechannel_card appmsg_card_context js_wechannel_video_card js_wechannel_video_context">\n  <div role="option" class="wxw_wechannel_card_bd">\n    <div aria-label="视频号，" class="wxw_wechannel_video_context" style="background-image:url(<#=url#>)">\n      <i class="weui-play-btn_primary"></i>\n    </div>\n    <div class="wxw_wechannel_profile weui-flex">\n      <# if(headImgUrl){ #>\n      <img alt="" class="wxw_wechannel_avatar" src="<#=headImgUrl#>" data-disable-preview="1">\n      <# }else{ #>\n      <img class="wxw_wechannel_avatar" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" data-disable-preview="1">\n      <# } #>\n      <strong class="wxw_wechannel_nickname"><#=nickname#></strong>\n      <span class="weui-hidden_abs">，</span>\n    </div>\n    <# if(desc){ #>\n    <div class="wxw_wechannel_desc">\n      <#=desc#>\n    </div>\n    <# } #>\n    <!-- 不可引用时show出来即可 -->\n    <# if(flag === 1){ #>\n    <div class="wxw_wechannel_msg">\n      该视频号动态已删除    </div>\n    <# } else if (flag === 2) { #>\n      <div class="wxw_wechannel_msg">\n        无法浏览该视频号动态      </div>\n    <# } #>\n  </div>\n  <div class="wxw_wechannel_card_ft weui-flex" aria-hidden="true">\n    <i class="wxw_wechannel_logo"></i>视频号  </div>\n</div>\n<# } else if (snapType === \'image\'){  #>\n<div role="link" class="wxw_wechannel_card appmsg_card_context js_wechannel_img_card js_wechannel_img_context">\n  <div role="option" class="wxw_wechannel_card_bd">\n    <div aria-label="视频号，" class="wxw_wechannel_img_context">\n        <ul class="wxw_wechannel_img_list js_wechannel_img_list" id="js_wechannel_img_list" data-poster-src="<#=url#>" data-disable-preview="1">\n            <li class="wxw_wechannel_img js_wechannel_img" data-w="1000" data-ratio="1" style="background-image:url(<#=url#>)" data-disable-preview="1"></li>\n        </ul>\n        <ul class="wxw_wechannel_img_navs js_wechannel_img_navs">\n          <# for(var i = 0; i < imgCount; i++){ #>\n            <li class="wxw_wechannel_img_nav <# if(i === 0){ #>  wxw_wechannel_img_nav_current <# } #> "></li>\n          <# } #>\n        </ul>\n    </div>\n    <div class="wxw_wechannel_profile weui-flex">\n      <# if(headImgUrl){ #>\n        <img alt="" class="wxw_wechannel_avatar" src="<#=headImgUrl#>" data-disable-preview="1">\n        <# }else{ #>\n        <img alt="" class="wxw_wechannel_avatar" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" data-disable-preview="1">\n        <# } #>\n      <strong class="wxw_wechannel_nickname"><#=nickname#></strong>\n      <span class="weui-hidden_abs">，</span>\n    </div>\n    <# if(desc){ #>\n    <div class="wxw_wechannel_desc">\n      <#=desc#>\n    </div>\n    <# } #>\n    <# if(flag === 1){ #>\n      <div class="wxw_wechannel_msg">\n        该视频号动态已删除      </div>\n    <# } else if (flag === 2) { #>\n      <div class="wxw_wechannel_msg">\n        无法浏览该视频号动态      </div>\n    <# } #>\n  </div>\n  <div class="wxw_wechannel_card_ft weui-flex" aria-hidden="true">\n    <i class="wxw_wechannel_logo"></i>视频号  </div>\n</div>\n<# } else if (snapType === \'live\') { #>\n<div class="wxw_wechannel_card appmsg_card_context wxw_wechannel_card_live js_wechannel_live_card" data-noticeid="<#=noticeid#>" data-username="<#=username#>">\n  <div class="wxw_wechannel_card_bd">\n    <div class="wxw_wechannel_live_context">\n      <div class="weui-flex wxw_wechannel_live_overview">\n        <div class="wxw_wechannel_live_hd">\n          <img class="wxw_wechannel_live_avatar" src="<#=headImgUrl#>" alt="">\n        </div>\n        <div class="wxw_wechannel_live_bd weui-flex__item">\n          <strong class="wxw_wechannel_live_nickname"><#=nickname#></strong>\n          <div class="wxw_wechannel_live_desc js_wechannel_live_desc"><#=desc#></div>\n        </div>\n        <div class="wxw_wechannel_live_ft js_wechannel_operation_area">\n          <button class="weui-btn weui-btn_mini wxw_wechannel_live_btn js_channel_btn_operation <# if((status !== 0 && status !== 2)|| reservation === 1){ #>weui-btn_disabled<# } #>" data-reservation="<#=reservation#>" data-noticeid="<#=noticeid#>" data-username="<#=username#>" data-status="<#=status#>" type="button">\n            <i class="icon_wxw_wechannel_live js_wechannnel_live" <#if (status !== 2){ #> style="display:none" <# } #>></i>\n            <span class="js_channel_btn_operation_wording"><#=liveWording#></span>\n          </button>\n        </div>\n      </div>\n      <div class="wxw_wechannel_live_tips"><#=intro#></div>\n    </div>\n    <# if (flag === 1) { #>\n      <div class="wxw_wechannel_msg">\n        无法浏览该视频号动态      </div>\n    <# } #>\n  </div>\n  <div class="wxw_wechannel_card_ft weui-flex" id="wxw_wechannel_logo_<#=noticeid#>" aria-hidden="true">\n    <i class="wxw_wechannel_logo"></i>视频号  </div>\n</div>\n<# } else if (snapType === \'topic\') { #>\n<div class="wxw_wechannel_card appmsg_card_context wxw_wechannel_card_topic js_wechannel_topic_card js_wx_tap_highlight wx_tap_card">\n  <div class="wxw_wechannel_card_bd">\n    <div class="wxw_wechannel_topic_context">\n      <div class="weui-flex weui-flex_align-center wxw_wechannel_topic_profile">\n        <div class="wxw_wechannel_topic_hd">\n          <img class="wxw_wechannel_topic_avatar" src="<#=headImgUrl#>" alt="">\n        </div>\n        <div class="wxw_wechannel_topic_bd weui-flex__item">\n          <strong class="wxw_wechannel_topic_nickname"><#=nickname#></strong>\n        </div>\n      </div>\n      <div class="weui-flex weui-flex_align-center">\n        <div class="wxw_wechannel_topic_bd weui-flex__item">\n          <strong class="wxw_wechannel_topic_name"><#=title#></strong>\n        </div>\n        <div class="wxw_wechannel_topic_ft js_wechannel_operation_area">\n          <button class="weui-btn weui-btn_mini wxw_wechannel_topic_btn" <# if(closeFlag){ #>disabled<# } #> type="button"><# if(closeFlag){ #>已结束<# } else { #>参与<# } #></button>\n        </div>\n      </div>\n      <div class="wxw_wechannel_topic_tips"><#=desc#></div>\n      <div class="wxw_wechannel_topic_tips">结束时间：<#=endTime#></div>\n    </div>\n    <# if (flag !== 0) { #>\n      <div class="wxw_wechannel_msg">\n        此视频号活动因违规无法查看      </div>\n    <# } #>\n    <# if (flag === 3453464560) { #>\n      <div class="wxw_wechannel_msg">\n        <span role="img" aria-label="加载中" class="weui-primary-loading">\n          <span class="weui-primary-loading__dot"></span>\n        </span>\n      </div>\n    <# } #>\n  </div>\n  <div class="wxw_wechannel_card_ft weui-flex" id="wxw_wechannel_logo_<#=noticeid#>" aria-hidden="true">\n    <i class="wxw_wechannel_logo"></i>视频号<span class="wxw_wechannel_logo_tail">活动</span>\n  </div>\n</div>\n<# } #>\n';
});define("biz_common/dom/offset.js",[],function(){
"use strict";
function f(f){
if(!f)return{};
for(var t=0,e=0,o=parseInt(document.body.style.marginTop,10)||0;f.offsetParent;)t+=f.offsetTop,
e+=f.offsetLeft,f=f.offsetParent;
return{
offsetTop:t>o?t-o:t,
offsetLeft:e
};
}
return{
getOffset:f
};
});define("appmsg/emotion/dom.js",["biz_common/dom/event.js"],function(t){
"use strict";
function e(t){
if("string"==typeof t){
document.querySelectorAll||!function(){
var t=document.createStyleSheet(),e=function(e,n){
var i,o=document.all,r=o.length,u=[];
for(t.addRule(e,"foo:bar"),i=0;r>i&&!("bar"===o[i].currentStyle.foo&&(u.push(o[i]),
u.length>n));i+=1);
return t.removeRule(0),u;
};
document.querySelectorAll=function(t){
return e(t,1/0);
};
}();
var e=document.querySelectorAll(t);
}else e=[t];
return{
el:e,
on:function(t,e){
return this.each(function(n){
i.on(n,t,e);
}),this;
},
hide:function(){
return this.each(function(t){
t.style.display="none";
}),this;
},
show:function(){
return this.each(function(t){
t.style.display="block";
}),this;
},
each:function(t){
return n(this.el,t),this;
},
width:function(){
return this.el[0].clientWidth;
},
css:function(t){
return this.each(function(e){
for(var n in t)e.style[n]=t[n];
}),this;
},
attr:function(t,e){
var n=this.el[0];
return e?(n.setAttribute(t,e),this):n.getAttribute(t);
},
append:function(t){
return t.el&&(t=t.el[0]),this.el[0].appendChild(t),this;
},
html:function(t){
this.each(function(e){
e.innerHTML=t;
});
}
};
}
function n(t,e){
for(var n=0,i=t.length;i>n;n++)e(t[n],n);
}
var i=t("biz_common/dom/event.js");
return e.el=function(t){
return document.createElement(t);
},e.later=function(t){
setTimeout(t,3);
},e.log=function(){},e.each=n,e;
});function _classCallCheck(t,n){
if(!(t instanceof n))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function t(t,n){
for(var e=0;e<n.length;e++){
var i=n[e];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);
}
}
return function(n,e,i){
return e&&t(n.prototype,e),i&&t(n,i),n;
};
}();
define("appmsg/emotion/emotion.js",["appmsg/emotion/weemoji.js","icon/emotion_panel/weemoji_panel.css","appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","biz_common/dom/class.js","biz_common/tmpl.js","appmsg/emotion/emotion.html.js"],function(t){
"use strict";
var n=t("appmsg/emotion/weemoji.js");
t("icon/emotion_panel/weemoji_panel.css");
for(var e=t("appmsg/emotion/dom.js"),i=t("appmsg/emotion/slide.js"),o=t("appmsg/emotion/common.js"),s=t("appmsg/emotion/nav.js"),a=t("appmsg/emotion/textarea.js"),m=(n.EmojiData||[],
n.EmojiPanelData||[]),p=t("biz_common/dom/class.js"),h=t("biz_common/tmpl.js"),r=t("appmsg/emotion/emotion.html.js"),l=(n.EmojiDataMap||[],
[]),u=15,c=o.EMOTIONS_COUNT,d=o.EMOTION_LI_SIZE,g=0;g<m.length;g++)l.push(m[g].style);
var v=function(){
function t(n){
_classCallCheck(this,t),this.opt=n,this.pannel=n.emotionPanel,this.isPannelShow=!1,
this.navs=[],this.listenTogglePannel(),this.buildEmotions(n),this.slide=new i({
emotionSlideWrapper:n.emotionSlideWrapper,
commonWidth:this.width,
pageCount:this.pageCount,
wrapperWidth:this.wrapperWidth,
navs:this.navs
}),s.activeNav(0,this.navs),this.listenClickOnEmotion(),this.textarea=new a({
inputArea:this.opt.inputArea,
submitBtn:this.opt.submitBtn
});
}
return _createClass(t,[{
key:"listenTogglePannel",
value:function(){
var t=this,n=this.opt.inputArea,i=n.el[0],o=this.opt.emotionPanelArrowWrp,s=this.opt.emotionSwitcher,a="emotion_switch_current";
this.pannel.hide();
var m=function(){
o.show(),t.pannel.show(),i.blur(),e.later(function(){
i.blur();
});
},h=function(){
o.hide(),t.pannel.hide(),i.focus(),e.later(function(){
i.focus();
});
};
s.on("tap",function(n){
n.preventDefault(),n.stopPropagation(),t.isPannelShow=!t.isPannelShow,t.isPannelShow?(m(),
s.each(function(t){
p.addClass(t,a);
})):(h(),s.each(function(t){
p.removeClass(t,a);
}));
}),n.on("tap",function(){
t.pannel.hide(),t.isPannelShow=!1;
});
}
},{
key:"setOuterDivWidth",
value:function(){
this.wrapperWidth=this.pageCount*this.width,this.opt.emotionSlideWrapper.css({
width:this.wrapperWidth+"px"
});
}
},{
key:"generateEmotionListAndAppend",
value:function(){
this.opt.emotionSlideWrapper.el[0].insertAdjacentHTML("beforeend",h.tmpl(r,{
pageCount:this.pageCount,
onePageCount:this.emotionsCountOnePage,
emotionsCount:c,
emotionSize:o.EMOTION_SIZE,
emotionLiSize:d,
width:this.width,
gap:(this.width-this.emotionsOneLine*d)/2
},!1));
}
},{
key:"getPageCount",
value:function(){
var t=this.width-2*u;
this.emotionsOneLine=parseInt(t/d,10),this.emotionsCountOnePage=3*this.emotionsOneLine-1;
var n=parseInt(c/this.emotionsCountOnePage,10);
return c%this.emotionsCountOnePage!==0&&n++,n;
}
},{
key:"genrateNavs",
value:function(){
for(var t=0,n=this.pageCount;n>t;t++){
var i=e(e.el("li"));
i.attr("class","emotion_nav js_emotion_nav"),this.navs.push(i),this.opt.emotionNavBar.append(i);
}
}
},{
key:"buildEmotions",
value:function(){
this.width=window.innerWidth||document.body.clientWidth,this.pageCount=this.getPageCount(),
this.setOuterDivWidth(),this.generateEmotionListAndAppend(),this.genrateNavs();
}
},{
key:"hidePannel",
value:function(){
this.pannel.hide();
}
},{
key:"addEmotion",
value:function(t){
if(!this.slide.isMoved){
var n=e(t.currentTarget),i=+n.attr("data-index");
this.textarea.inputEmotion(i),this.opt.inputEmotion&&this.opt.inputEmotion();
}
}
},{
key:"listenClickOnEmotion",
value:function(){
e("li.js_emotion_item").on("click",this.addEmotion.bind(this)),e("li.js_emotion_item").on("touchend",this.addEmotion.bind(this));
}
}]),t;
}();
return{
Emotion:v,
encode:n.decode
};
});define("question_answer/write_answer_reply.html.js",[],function(){
return'<div class="qa__modal-reply">\n  <div class="qa__modal-reply-msg js_reply_top_content"></div>\n  <div class="frm_textarea_box_wrp">\n    <span class="frm_textarea_box" style="position: relative; display: block;">\n      <div style="position: relative; height: 9.6em; overflow: hidden; font-size: 17px;">\n        <textarea class="frm_textarea js_qa_input" placeholder="内容被公众号精选后，将对所有人可见。" style="height: 9.6em; width: 100%; border: none; outline: none;"></textarea>\n      </div>\n      <div class="emotion_tool">\n        <span class="emotion_switch" style="display:none;"></span>\n        <span id="js_qa_emotion_switch" class="pic_emotion_switch_wrp">\n          <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n          <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n          <img class="pic_default_primary" src="<#=window.icon_emotion_switch_primary#>" alt="">\n          <img class="pic_active_primary" src="<#=window.icon_emotion_switch_active_primary#>" alt="">\n        </span>\n      </div>\n    </span>\n  </div>\n  <div class="emotion_panel" id="js_qa_emotion_panel">\n    <span class="emotion_panel_arrow_wrp" id="js_qa_emotion_panel_arrow_wrp">\n      <i class="emotion_panel_arrow arrow_out"></i>\n      <i class="emotion_panel_arrow arrow_in"></i>\n    </span>\n    <div class="emotion_list_wrp" id="js_qa_emotion_slide_wrapper"></div>\n    <ul class="emotion_navs" id="js_qa_emotion_navbar"></ul>\n  </div>\n</div>\n<div class="qa__list-wrp">\n  <div class="qa__list-hd js_qa_write_head" style="display: none;">\n    <span class="qa__list-hd-title">我的讨论内容</span>\n  </div>\n  <div class="qa__list js_qa_qna_answer_list"></div>\n</div>\n\n<div class="js_loading_toast" style="display: none;">\n  <div class="weui-mask_transparent"></div>\n  <div class="weui-toast">\n    <i class="weui-loading weui-icon_toast"></i>\n    <p class="weui-toast__content js_loading_content">正在加载</p>\n  </div>\n</div>\n\n<div class="js_sended_toast" style="display: none;">\n  <div class="weui-mask_transparent"></div>\n  <div class="weui-toast">\n    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n    <p class="weui-toast__content" id="js_toast_msg">已发送</p>\n  </div>\n</div>\n\n<div class="qa__toast-alert js_alert_toast" style="display: none;">\n  <div class="weui-mask_transparent"></div>\n  <div class="weui-toast">\n    <i class=" qa__icon-alert"></i>\n    <p class="weui-toast__content js_alert_toast_word"></p>\n  </div>\n</div>';
});define("question_answer/reply_item.html.js",[],function(){
return'<section class="qa__reply-item js_qa_reply_item<# if (is_my_reply) { #> js_qa_my_reply<# } #>">\n  <div class="qa__reply-hd">\n    <div class="qa__reply-nickname">\n      <# if (is_biz_reply) { #>\n        作者      <# } else { #>\n        <#=user_info.nickname#>\n      <# } #>\n    </div>\n    <div class="qa__item-action">\n      <# if (is_my_reply && canOp) { #>\n        <div class="qa__action js_delete_reply" data-id="<#=reply_id#>"><i class="icon_delete"></i></div>\n      <# } #>\n      <!-- 精选之后的才能点赞 -->\n      <# if (replyStatus && isLogin) { #>\n        <div class="qa__action qa__action-praise js_qa_like<# if (my_like_status) { #> praised<# } #>" data-type="2" data-id="<#=reply_id#>">\n          <i class="icon_praise_gray"></i>\n          <span class="js_like_num" data-num="<#=like_num#>">\n            <#=likeNumFormated#>\n          </span>\n        </div>\n      <# } #>\n      <# if (!replyStatus) { #>\n        <div class="qa__action qa__action_normal">未精选</div>\n      <# } #>\n    </div>\n  </div>\n  <p class="qa__reply-content js_qa_reply_content"><#=content#></p>\n</section>\n';
});define("question_answer/answer_item.html.js",[],function(){
return'<div class="qa__list-item js_qa_list_item">\n  <!-- 层主头像 -->\n  <section class="qa__item-avatar">\n    <img src="<#=user_info.headimg#>">\n  </section>\n  <section class="qa__item-bd">\n    <div class="qa__item-info">\n      <!-- 层主昵称 -->\n      <div class="qa__item-nickname">\n        <#=user_info.nickname#>\n      </div>\n      <!-- 点赞 -->\n      <div class="qa__item-action">\n        <!-- span加praised点赞 -->\n        <# if (is_my_answer && canOp) { #>\n          <div class="qa__action js_delete_answer" data-id="<#=answer_id#>"><i class="icon_delete"></i></div>\n        <# } #>\n        <!-- 精选之后的才能点赞 -->\n        <# if (answer_status && isLogin) { #>\n          <div class="qa__action qa__action-praise js_qa_like<# if (my_like_status) { #> praised<# } #>" data-type="1" data-id="<#=answer_id#>">\n            <i class="icon_praise_gray"></i>\n            <span class="js_like_num" data-num="<#=like_num#>">\n              <#=likeNumFormated#>\n            </span>\n          </div>\n        <# } #>\n        <# if (!answer_status) { #>\n          <div class="qa__action qa__action_normal">未精选</div>\n        <# } #>\n      </div>\n    </div>\n\n    <!-- 回答内容 -->\n    <p class="qa__item-content js_qa_item_content"><#=content#></p>\n    <!-- <# if (is_my_answer && canOp) { #>\n    <div class="qa__action qa__action-reply js_write_reply" data-answerid="<#=answer_id#>" data-answersn="<#=answer_sn#>" <# if (replyListHtml) { #>style="display: none;"<# } #>><span>回复</span></div>\n    <# } #> -->\n\n    <!-- 回复 -->\n    <section class="qa__reply">\n      <section class="js_qa_reply_list js_qa_reply_list_<#=answer_id#>">\n        <#=replyListHtml#>\n      </section>\n      <# if (replyListHtml && leftReplyCount) { #>\n        <p class="qa__reply-more js_get_more_reply js_get_more_reply_<#=answer_id#>" data-answerid="<#=answer_id#>" data-answersn="<#=answer_sn#>">\n          <#=leftReplyTips#>\n        </p>\n      <# } #>\n      <!-- <# if (is_my_answer && canOp) { #>\n      <div class="qa__action qa__action-reply js_write_reply" data-answerid="<#=answer_id#>" data-answersn="<#=answer_sn#>" <# if (!replyListHtml) { #>style="display: none;"<# } #>><span>回复</span></div>\n      <# } #> -->\n    </section>\n  </section>\n</div>\n';
});define("question_answer/qa_card.html.js",[],function(){
return'<span class="qa__card js_qa_card_inner">\n  <# if (qaDeleted) { #>\n    <span class="qa__card-deleted">讨论内容已被删除</span>\n  <# } else { #>\n    <span>\n      <span class="qa__card-hd">\n        <span class="qa__hd-notice"><#=nickname#> 发起了一个读者讨论</span>\n        <span class="qa__hd-question"><#==title#></span>\n      </span>\n      <# if (!answerCount) { #>\n        <# if (isLogin) { #>\n          <!-- <# if (disableAnswerWord) { #>\n            <span class="qa__list-answer qa__list-answer_desc"><#=disableAnswerWord#></span>\n          <# } else { #>\n            <span class="qa__list-answer js_qa_write_answer">参与讨论</span>\n          <# } #> -->\n          <span class="qa__list-answer qa__list-answer_desc">讨论已结束</span>\n        <# } #>\n      <# } else { #>\n        <span>\n          <span class="qa__list-hd">\n            <span class="qa__list-hd-title js_qa_list_head_title">精选讨论内容</span>\n            <!-- <# if (isLogin) { #>\n              <# if (disableAnswerWord) { #>\n                <span class="qa__list-hd-desc"><#=disableAnswerWord#></span>\n              <# } else { #>\n                <span class="qa__list-hd-action js_qa_write_answer">参与讨论</span>\n              <# } #>\n            <# } #> -->\n          </span>\n          <span class="qa__list js_qa_qna_answer_list"><#==answerListStr#></span>\n          <# if (leftAnswerCnt) { #>\n            <p class="qa__list-more js_more_answer_entry" data-count="<#=answerCount#>"><#=leftAnswerCnt#></p>\n          <# } #>\n        </span>\n      <# } #>\n    </span>\n  <# } #>\n</span>\n';
});define("pages/weapp_tpl.html.js",[],function(){
return'<span role="option" class="weapp_card app_context pages_reset appmsg_card_context wx_tap_card" title="轻点两下打开">\n    <span class="weapp_card_bd">\n        <span class="weapp_card_profile flex_context">\n            <span class="radius_avatar weapp_card_avatar">\n                <img alt="" src="<#=avatar#>">\n            </span>\n            <span class="flex_bd">\n              <span class="weapp_card_nickname_wrp">\n                <span class="weapp_card_nickname"><#=nickname#></span>\n                <span class="weui-hidden_abs">，</span>\n                <span class="guarantee_icon js_guarantee">交易担保</span>\n                <span class="weui-hidden_abs">，</span>\n                <span class="safe_buy_icon icon_appmsg_tag js_relived_buy">放心买</span>\n                <span class="weui-hidden_abs">，</span>\n              </span>\n            </span>\n        </span>\n        <span class="weapp_card_info">\n            <span class="weapp_card_title"><#=title#></span>\n            <span class="weapp_card_thumb_wrp" style="background-image:url(<#=imageUrl#>);"></span>\n        </span>\n    </span>\n    <span class="weapp_card_ft">\n        <span class="weapp_card_logo">小程序</span>\n    </span>\n</span>\n';
});define("appmsg/poi/poi_tpl.html.js",[],function(){
return'<div class="ct_geography_loc_card weapp_card app_context appmsg_card_context wx_tap_card" data-id="<#=data.id#>" data-latitude="<#=data.latitude#>" data-longitude="<#=data.longitude#>">\n  <!-- 插入地理位置 -->\n  <!-- 卡片式插入地理位置 -->\n  <div id="poi_name_<#=data.id#>" role="link" aria-labelledby="poi_name_tips_<#=data.id#> poi_name_<#=data.id#> js_a11y_comma poi_addr_<#=data.id#>" class="location_title line-clamp1"><#=data.name#></div>\n  <div class="weui-hidden_abs" id="poi_name_tips_<#=data.id#>" aria-hidden="true">位置：</div>\n  <div id="poi_addr_<#=data.id#>" class="location_detail line-clamp1" aria-hidden="true"><#=data.address#></div>\n  <div class="location_img_wrp" style="background-image:url(<#=data.img#>);">\n    <!-- <img style="pointer-events: none;" class="location_img" src="<#=data.img#>" />  -->\n    <!-- <div class="location_img" ></div>  -->\n  </div>\n  \n</div>\n\n<!-- 纯文本式插入地理位置 -->\n<!-- <a class="ct_geography_loc_tip">\n  <i class="geography_loc_icon"></i>\n  广东省广州市天河区华丽路45-64保利香槟花园广东省广州市天河区华丽路45-64保利香槟花园</a> -->\n';
});