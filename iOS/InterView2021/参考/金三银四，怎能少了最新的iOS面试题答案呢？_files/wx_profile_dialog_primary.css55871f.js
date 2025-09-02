define("appmsg/comment/comment_input/comment_input.html.js",[],function(){
return'<div class="comment_primary_input_area js_wrp" style="display: none">\n  <# if (deviceIsPc) { #>\n    <!-- PC端 -->\n    <div class="comment_primary_input_wrp">\n      <div class="comment_primary_input js_input" contenteditable></div>\n      <div class="comment_primary_input_placeholder js_placeholder"><#=placeholder#></div>\n    </div>\n    <div class="comment_primary_tool js_tool">\n      <button disabled="disabled" class="reset_btn comment_primary_btn js_submit"><#=submitText#></button>\n      <div class="comment_primary_emotion_wrp js_emotion_wrp">\n        <span class="icon_comment_primary_emotion"></span>\n      </div>\n      <!-- 超出字数往comment_primary_counter加comment_primary_counter_warn  -->\n      <span class="comment_primary_counter js_counter" style="display: none">\n        <em class="js_counter_len"></em>\n        /\n        <span><#=length#></span>\n      </span>\n    </div>\n  <# } else { #>\n    <!-- 手机端 -->\n    <div class="discuss_textarea_box">\n      <textarea class="discuss_textarea js_input js_placeholder" placeholder="<#=placeholder#>"></textarea>\n      <div class="emotion_tool">\n        <span class="pic_emotion_switch_wrp js_emotion_wrp">\n          <img class="pic_default" src="<#=iconEmotionSwitch#>" alt="">\n          <img class="pic_active" src="<#=iconEmotionSwitchActive#>" alt="">\n          <img class="pic_default_primary" src="<#=iconEmotionSwitchPrimary#>" alt="">\n          <img class="pic_active_primary" src="<#=iconEmotionSwitchActivePrimary#>" alt="">\n        </span>\n      </div>\n    </div>\n\n    <div class="emotion_panel js_emotion_panel">\n      <span class="emotion_panel_arrow_wrp js_emotion_panel_arrow_wrp">\n        <i class="emotion_panel_arrow arrow_out"></i>\n        <i class="emotion_panel_arrow arrow_in"></i>\n      </span>\n      <div class="emotion_list_wrp js_slide_wrapper"></div>\n      <ul class="emotion_navs js_navbar"></ul>\n    </div>\n\n    <div class="discuss_btn_wrp js_tool">\n      <button disabled="disabled" class="weui-btn weui-btn_primary js_submit">留言</button>\n    </div>\n  <# } #>\n</div>\n';
});define("appmsg/emotion/selection.js",[],function(e,n){
"use strict";
function t(e,n,t){
if(!t&&e===n)return!1;
if(e.compareDocumentPosition){
var o=e.compareDocumentPosition(n);
if(20===o||0===o)return!0;
}else if(e.contains(n))return!0;
return!1;
}
function o(e,n){
var o=n.commonAncestorContainer||n.parentElement&&n.parentElement()||null;
return o?t(e,o,!0):!1;
}
n.getSelection=function(){
return document.selection?document.selection:(window.getSelection||document.getSelection)();
},n.getRange=function(e){
var n=getSelection();
if(!n)return null;
var t=void 0;
return n.getRangeAt&&n.rangeCount?t=n.getRangeAt(0):n.getRangeAt||(t=n.createRange()),
t?e&&o(e,t)?t:e?null:t:null;
},n.setCursorToEnd=function(e){
if(e){
var n=getSelection();
n.extend&&(n.extend(e,e.length),n.collapseToEnd&&n.collapseToEnd());
}
},n.contains=t;
});;define('widget/wx-widget/wx_emotion_panel.css', [], function(require, exports, module) {
	return ".comment_primary_emotion_list_mobile_wrp{bottom:0;left:0;right:0;padding:8px;padding:8px calc(0px + constant(safe-area-inset-right)) calc(44px + constant(safe-area-inset-bottom)) calc(0px + constant(safe-area-inset-left));padding:8px calc(0px + env(safe-area-inset-right)) calc(44px + env(safe-area-inset-bottom)) calc(0px + env(safe-area-inset-left));position:fixed;z-index:9999;height:300px;box-sizing:border-box;background-color:var(--weui-BG-0);overflow-y:scroll;-webkit-overflow-scrolling:touch;font-size:32px;-webkit-text-size-adjust:none}.comment_primary_emotion_list_mobile_wrp:before{content:\"\";position:fixed;bottom:300px;left:0;width:100%;height:1px;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);background:var(--weui-FG-3)}.comment_primary_emotion_list_mobile{margin:0 8px}.comment_primary_emotion_list_mobile_grid .comment_primary_emotion_list_mobile{display:grid;grid-template-columns:repeat(auto-fill,calc(32px + 16px));-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.comment_primary_emotion_list_mobile_flex .comment_primary_emotion_list_mobile{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.comment_primary_emotion_list_mobile .comment_primary_emotion{width:32px;height:32px}.comment_primary_emotion_item{padding:8px;cursor:pointer;list-style:none;border-radius:4px}.comment_primary_emotion_item:active{background-color:rgba(0,0,0,0.1)}.comment_primary_emotion{display:block;margin-top:0;width:1em;height:1em;font-size:inherit}.comment_primary_emotion_list_mobile_title{font-size:14px;line-height:1.4;color:var(--weui-FG-0);padding:12px 16px 8px}.comment_primary_emotion_list_mobile_del_btn_wrp{position:fixed;right:0;bottom:0;padding-bottom:constant(safe-area-inset-bottom);padding-bottom:env(safe-area-inset-bottom);padding-right:12px}.comment_primary_emotion_list_mobile_del_btn_wrp:before{pointer-events:none;content:\"\";position:absolute;bottom:0;right:0;width:104px;height:124px;background:linear-gradient(to bottom,rgba(237,237,237,0),#ededed 50px,#ededed 100%)}.comment_primary_emotion_list_mobile_del_btn{position:relative;z-index:1;display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 16px;margin-bottom:16px;min-height:44px;border-radius:4.8px;color:var(--weui-FG-0);font-size:0;background-color:var(--weui-BG-2)}.comment_primary_emotion_list_mobile_del_btn:before{content:\"\";display:inline-block;vertical-align:middle;width:24px;height:24px;-webkit-mask:url(\"data:image\/svg+xml;charset=utf8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cpath fill-opacity='.9' fill-rule='evenodd' d='M20.5 4A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5H8.47a1.5 1.5 0 0 1-1.192-.589l-4.97-6.5a1.5 1.5 0 0 1 0-1.822l4.97-6.5A1.5 1.5 0 0 1 8.47 4H20.5zm0 1.2H8.47a.3.3 0 0 0-.239.118l-4.97 6.5a.3.3 0 0 0 0 .364l4.97 6.5a.3.3 0 0 0 .239.118H20.5a.3.3 0 0 0 .3-.3v-13a.3.3 0 0 0-.3-.3zM17 8l1 1-3 3 3 3-1 1-3-3-3 3-1-1 3-3-3-3 1-1 3 3 3-3z'\/%3E%3C\/svg%3E\") no-repeat 50% 50%;mask:url(\"data:image\/svg+xml;charset=utf8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cpath fill-opacity='.9' fill-rule='evenodd' d='M20.5 4A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5H8.47a1.5 1.5 0 0 1-1.192-.589l-4.97-6.5a1.5 1.5 0 0 1 0-1.822l4.97-6.5A1.5 1.5 0 0 1 8.47 4H20.5zm0 1.2H8.47a.3.3 0 0 0-.239.118l-4.97 6.5a.3.3 0 0 0 0 .364l4.97 6.5a.3.3 0 0 0 .239.118H20.5a.3.3 0 0 0 .3-.3v-13a.3.3 0 0 0-.3-.3zM17 8l1 1-3 3 3 3-1 1-3-3-3 3-1-1 3-3-3-3 1-1 3 3 3-3z'\/%3E%3C\/svg%3E\") no-repeat 50% 50%;-webkit-mask-size:cover;mask-size:cover;background-color:currentColor}.comment_primary_emotion_list_pc{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:12px;overflow:hidden;font-size:24px}.comment_primary_emotion_list_pc .comment_primary_emotion_item{padding:4px}.comment_primary_emotion_list_pc .comment_primary_emotion_item:hover{background-color:rgba(0,0,0,0.1)}@media(prefers-color-scheme:dark){.comment_primary_emotion_item:active{background-color:rgba(255,255,255,0.05)}.comment_primary_emotion_list_mobile_del_btn_wrp:before{background:linear-gradient(to bottom,rgba(17,17,17,0),#111 50px,#111 100%)}.comment_primary_emotion_list_pc .comment_primary_emotion_item:hover{background-color:rgba(255,255,255,0.05)}}";
});define("pages_new/modules/comment/dialog/unsupport.html.js",[],function(){
return'<!-- 不支持c2c回复弹窗，基于bottom_modal组件 -->\n<mp-bottom-modal\n  ref="modal"\n  top="16px"\n  :has-header="false"\n  class="weui-half-screen-dialog_wrp"\n>\n  <!-- bd部分 -->\n  <div class="discuss_more_guide">\n    <p class="discuss_more_guide_tips">更新微信到最新版本，可以回复他人留言</p>\n    <img class="pic_discuss_more_guide" :src="commentC2cUnsupportedImg" alt="">\n  </div>\n\n  <!-- ft部分 -->\n  <template #footer>\n    <a href="javascript:;" class="weui-btn weui-btn_default" @click="hide">知道了</a>\n    <a href="javascript:;" class="weui-btn weui-btn_primary" @click="update">去更新</a>\n  </template>\n</mp-bottom-modal>';
});define("pages_new/modules/comment/dialog/dialog.html.js",[],function(){
return'<!-- PC自己写一个dialog -->\n<div\n  v-if="deviceIsPc"\n  v-show="pcShow"\n  class="discuss_more_pc_dialog_wrp"\n  @scroll="onPcSroll"\n>\n  <div class="discuss_more_pc_dialog">\n    <div class="discuss_more_pc_dialog_hd">\n      <strong class="discuss_more_pc_dialog_title">留言</strong>\n      <button class="discuss_more_pc_dialog_close_btn reset_btn" @click="hide">\n        <i class="weui-icon-close"></i>\n      </button>\n    </div>\n    <div ref="pcContentAreaWrp" class="discuss_more_pc_dialog_bd">\n      <div ref="pcContentEle" v-if="cmtData">\n        <div class="discuss_media_current">\n          <mp-comment-list\n            ref="cmtSingleList"\n            type="comment"\n            :list="cmtList"\n            :cmt-idx="cmtIdx"\n            @render="cmtRender"\n            @add="add"\n            @praise="praise"\n            @remove="remove"\n            @dialog-scroll="scrollToComment"\n            @reset-dialog-scroll="resetScroll"\n          ></mp-comment-list>\n        </div> <!-- 留言列表 -->\n        <div class="discuss_more_list_area">\n          <div class="discuss_more_list_title">全部回复</div>\n          <ul class="discuss_more_list">\n            <mp-comment-list\n              v-if="replyListData"\n              ref="replyList"\n              type="reply"\n              :cmt-data="cmtData"\n              :cmt-idx="cmtIdx"\n              :list="replyListData.reply_list"\n              @render="replyRender"\n              @add="add"\n              @praise="praise"\n              @remove="remove"\n              @dialog-scroll="scrollToComment"\n              @reset-dialog-scroll="resetScroll"\n              @remove-animation="onRemoveAnimation"\n            ></mp-comment-list>\n          </ul> <!-- 回复列表 -->\n\n          <div v-show="loading" class="weui-loadmore weui-loadmore_default">\n            <i class="weui-primary-loading"></i>\n            <span class="weui-loadmore__tips">正在加载</span>\n          </div>\n\n          <!-- 结束线 -->\n          <div v-show="replyListData && !replyListData.continue_flag" class="weui-loadmore weui-loadmore_default weui-loadmore_line weui-loadmore_dot">\n            <span class="weui-loadmore__tips" style="background-color: transparent;"></span>\n          </div>\n\n          <!-- 无回复 -->\n          <div v-show="replyListData && !replyListData.reply_list.length" class="weui-loadmore weui-loadmore_default">\n            <span class="weui-loadmore__tips">暂无回复</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="weui-mask"></div>\n</div>\n<!-- 手机端基于bottom_modal组件 -->\n<div v-else>\n  <mp-bottom-modal\n    ref="bottomModal"\n    class="discuss_more_dialog_wrp weui-half-screen-dialog_wrp discuss_more_dialog_content"\n    top="16px"\n    @show="onShow"\n    @hide="onHide"\n    @scroll="onScroll"\n    @pullup-load="onPullUpLoad"\n    @show-after-animation="onShowAfterAnimation"\n    hideWhenScrollDown\n    hideWhenSideslip\n  >\n    <template #title>留言</template>\n\n    <div :style="{ paddingBottom: dialogPaddingBottom }">\n      <div class="discuss_more_dialog_content_bd">\n        <template v-if="cmtData">\n          <mp-comment-list\n            ref="cmtSingleList"\n            type="comment"\n            :list="cmtList"\n            :cmt-idx="cmtIdx"\n            @render="cmtRender"\n            @add="add"\n            @praise="praise"\n            @remove="remove"\n            @dialog-scroll="scrollToComment"\n            @reset-dialog-scroll="resetScroll"\n            @nav-shadow-click="hide"\n            @keyboard-show="onKeyboardShow"\n            @keyboard-hide="onKeyboardHide"\n            @can-not-reply="onKeyboardHide"\n          ></mp-comment-list>\n\n          <div class="discuss_more_list_area" :style="{ marginBottom: marginBottom }">\n            <div class="discuss_more_list_wrp">\n              <div class="discuss_more_list_title">全部回复</div>\n              <mp-comment-list\n                v-if="replyListData"\n                ref="replyList"\n                type="reply"\n                :cmt-data="cmtData"\n                :cmt-idx="cmtIdx"\n                :list="replyListData.reply_list"\n                @render="replyRender"\n                @add="add"\n                @praise="praise"\n                @remove="remove"\n                @dialog-scroll="scrollToComment"\n                @reset-dialog-scroll="resetScroll"\n                @nav-shadow-click="hide"\n                @keyboard-show="onKeyboardShow"\n                @keyboard-hide="onKeyboardHide"\n                @can-not-reply="onKeyboardHide"\n                @remove-animation="onRemoveAnimation"\n              ></mp-comment-list>\n            </div>\n\n            <div v-show="loading" class="weui-loadmore weui-loadmore_default">\n              <i class="weui-primary-loading"></i>\n              <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n\n            <!-- 结束线 -->\n            <div v-show="replyListData && !replyListData.continue_flag" class="weui-loadmore weui-loadmore_default weui-loadmore_line weui-loadmore_dot">\n              <span class="weui-loadmore__tips" style="background-color: transparent;"></span>\n            </div>\n\n            <!-- 无回复 -->\n            <div v-show="replyListData && !replyListData.reply_list.length" class="tips_global_primary discuss_more_empty_tips">\n              暂无回复            </div>\n          </div>\n        </template>\n      </div>\n\n      <div ref="placeholder" v-show="showPlaceholder" class="discuss_more_dialog_content_ft">\n        <div class="discuss_more_form weui-flex" @click="replyComment">\n          <div class="weui-flex__item">\n            <div class="discuss_form_input" role="option">{{ placeholder }}</div>\n          </div>\n          <a class="icon_discuss_emotion" role="button" aria-label="表情" title="轻点两下打开表情键盘" href="javascript:;" @click.stop="replyCommentWithEmotion"></a>\n        </div>\n      </div>\n    </div>\n  </mp-bottom-modal>\n\n  <mp-comment-write-dialog ref="cmtWriteDialog" in-dialog @nav-shadow-click="navShadowClick"></mp-comment-write-dialog>\n</div>\n';
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);
}
return e;
};
define("pages_new/modules/comment/list/item.js",["pages/utils.js","pages/scrollY.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","common/keyboard.js","common/utils.js","appmsg/retry_ajax.js","biz_wap/utils/device.js","biz_wap/utils/openUrl.js","common/actionSheet.js","common/navShadow.js","biz_wap/utils/mmversion.js","biz_common/utils/url/parse.js","pages_new/modules/comment/list/item.html.js","pages_new/modules/comment/utils.js","biz_wap/utils/jsmonitor_report.js","pages_new/3rd/vuex.js","appmsg/comment/comment_report.js","common/tap_highlight.js","appmsg/emotion/emotion_pc.js","appmsg/emotion/emotion.js","appmsg/comment/comment_input/comment_input.js"],function(e){
"use strict";
var t=e("pages/utils.js"),i=e("pages/scrollY.js"),n=e("biz_wap/utils/ajax.js"),o=e("biz_wap/jsapi/core.js"),s=e("common/keyboard.js"),a=e("common/utils.js"),r=e("appmsg/retry_ajax.js"),m=e("biz_wap/utils/device.js"),l=e("biz_wap/utils/openUrl.js"),c=e("common/actionSheet.js"),p=e("common/navShadow.js"),d=e("biz_wap/utils/mmversion.js"),h=e("biz_common/utils/url/parse.js"),u=e("pages_new/modules/comment/list/item.html.js"),y=e("pages_new/modules/comment/utils.js"),_=e("biz_wap/utils/jsmonitor_report.js"),g=e("pages_new/3rd/vuex.js"),f=g.mapState,T=g.mapGetters,w=g.mapMutations,v=e("appmsg/comment/comment_report.js"),b=v.report22215,I=e("common/tap_highlight.js"),k="wx_scroll_tansition",x="wx_margin_top_tansition",S=d.isWechat,j=d.is_wxwork,D=m.os.pc&&!d.is_wxwork,R=S&&!j,C=a.getInnerHeight(),E=d.isAndroid&&s.canUseCancel,P=s.onlyUseH5Keyboard,$=1*window.item_show_type===5,L=t.getId("js_article"),H=$?null:t.getId("img-content"),M=e(D?"appmsg/emotion/emotion_pc.js":"appmsg/emotion/emotion.js"),A=document.documentElement.contains?function(e,t){
return!!e&&!!t&&e!==t&&e.contains(t);
}:function(e,t){
if(e&&t&&e!==t)for(;t&&(t=t.parentNode);)if(t===e)return!0;
return!1;
},O=void 0,N=0,W=0,B=0;
return{
name:"mp-comment-item",
template:u,
props:{
item:{
type:Object,
required:!0
},
type:{
type:String,
"default":"mine"
},
itemType:{
type:String,
"default":"comment"
},
itemIdx:{
type:Number,
"default":-1
},
commentIdx:{
type:Number,
"default":-1
},
contentId:{
type:String,
"default":""
},
myId:{
type:Number,
"default":0
},
commentItem:{
type:Object,
"default":function(){
return{};
}
}
},
data:function(){
return{
replyLimit:y.getLimit("reply"),
inputValue:"",
pcInputing:!1,
pcInputMulti:!1,
pcDropdownShow:!1,
touching:!1,
isWxWork:j,
deviceIsPc:D,
canUseOption:d.isMac&&!d.isIOS?1*d.getMacOS().split(".")[0]>=11:!0,
supportReply:R,
showAllContent:!1
};
},
computed:_extends({},f("mp-comment",["isVoiceover","commentData","myCommentData","commentVersion","reportData","replyFlag"]),T("mp-comment",["commentId","canC2cReply","nickName","headImg","isFans","isFansDays"]),{
content:function(){
return M.encode(this.item.content);
},
toContent:function(){
return M.encode(this.item.to_content);
},
scene:function(){
switch(this.type){
case"elected":
return 0;

default:
return"";
}
},
canReply:function(){
return this.canC2cReply||!this.canC2cReply&&"comment"===this.itemType&&1===this.item.is_from_me;
}
}),
mounted:function(){
2===this.commentVersion&&s.onGetKeyboardHeight(this.onGetKeyboardHeight),document.addEventListener("contextmenu",this.onDocCtxMenu),
this.deviceIsPc&&document.body.addEventListener("click",this.hidePcDropdown),"comment"===this.type&&this.$refs.fakeContent.offsetHeight===this.$refs.content.offsetHeight&&this.extendContent();
},
beforeDestroy:function(){
2===this.commentVersion&&s.offGetKeyboardHeight(this.onGetKeyboardHeight),document.removeEventListener("contextmenu",this.onDocCtxMenu),
this.deviceIsPc&&document.body.removeEventListener("click",this.hidePcDropdown);
},
methods:_extends({},w("mp-comment",["setIsVoiceover","setCommentData","setMyCommentData","setWriteStatus","setCommentLike","setAnimationStatus","addComment","removeComment","updateCommentReplyInfo","setWarningToast"]),{
remove:function(e){
var t=this;
e.stopPropagation(),I.highlightEle(e.currentTarget),window.weui.confirm("comment"===this.itemType?"确定删除留言吗？":"确定删除回复吗？",{
className:"weui-pop-zindex-primary",
buttons:[{
label:"取消",
type:"default"
},{
label:"删除",
type:"primary",
onClick:function(){
var e=t.$store.state.cgiData,i={
scene:t.reportData.scene,
appmsgid:e.appmsgid,
my_id:t.myId,
comment_id:t.commentId,
content_id:t.contentId,
sessionid:e.sessionid||"",
enterid:e.enterid||0
};
"comment"===t.itemType?i.action="delete":(i.action="deletecommentreply",i.reply_id=t.item.reply_id),
n({
url:h.join("/mp/appmsg_comment",i,!0),
dataType:"json",
success:function(e){
if(0===e.ret){
switch(t.type){
case"elected":
case"mine":
t.removeComment({
type:t.type,
commentIdx:"reply"===t.itemType?t.commentIdx:t.itemIdx,
replyIdx:"reply"===t.itemType?t.itemIdx:void 0
});
break;

case"comment":
case"reply":}
t.$emit("remove",t.contentId,"reply"===t.itemType?t.item.reply_id:void 0);
}else y.newAlert("删除失败，请重试");
},
error:function(){
y.newAlert("网络错误，请重试");
}
});
}
}]
});
},
praise:function(e){
e.stopPropagation(),I.highlightEle(e.currentTarget.firstChild);
var t=this.$store.state.cgiData,i="/mp/appmsg_comment?action=",n={
comment_id:this.commentId,
content_id:this.contentId,
item_show_type:t.item_show_type||0,
scene:this.scene,
sessionid:t.sessionid||"",
enterid:parseInt(t.enterid,10)||0
},o=void 0;
"comment"===this.itemType?(o=this.item.like_status?0:1,i+="likecomment",n.appmsgid=t.appmsgid,
this.setCommentLike({
type:this.type,
likeStatus:o,
commentIdx:"comment"===this.type?this.commentIdx:this.itemIdx
})):(o=this.item.reply_like_status?0:1,i+="like_reply",n.reply_id=this.item.reply_id,
this.setCommentLike({
type:this.type,
likeStatus:o,
commentIdx:this.commentIdx,
replyIdx:this.itemIdx
})),this.$emit("praise",this.contentId,"reply"===this.itemType?this.item.reply_id:void 0,o),
n.like=o,r({
type:"POST",
url:i,
data:n
});
},
extendContent:function(){
this.showAllContent=!0;
},
showKeyboard:function(e,i,n,o,r,m){
var l=this;
s.show({
type:"reply",
mask:!0,
disableScroll:n||E||P,
text:this.inputValue||"",
placeholder:this.canC2cReply?"回复 "+y.sliceNickname(o)+"：":"回复被精选后，对所有人可见",
maxLength:this.replyLimit,
showRemindWordCount:a.REMIND_WORD_COUNT,
disableScrollAdjustment:n,
scrollContentY:e&&!n?t.getScrollTop()+e.getBoundingClientRect().bottom+90:0,
toggleEmotion:"boolean"==typeof i?i:!1,
success:function(e){
l.sendReply(e);
},
cancel:function(e){
l.inputValue=e;
},
show:function(){
l.$emit("keyboard-show");
},
fail:function(){
m||(l.setIsVoiceover({
value:!0
}),l.replyByDialog(o,r,n));
},
hide:function(e,i){
if(!n&&setTimeout(y.unlockOrientation,2e3),n&&t.disableSelect(),"DONE_EMOTION"===i&&l.sendReply(e),
l.__curReplyEl&&(delete l.__curReplyEl.dataset.bottom,l.__curReplyEl=null),n)l.$emit("reset-scroll");else if(E)document.body.style.removeProperty("margin-bottom"),
H&&(H.classList.remove(x),H.style.removeProperty("margin-top"));else if(P)if(L.classList.remove(k),
L.style.removeProperty("transform"),H&&H.classList.remove(x),L.dataset.distance){
var o=t.getScrollTop()-1*L.dataset.distance;
delete L.dataset.distance,document.documentElement.scrollTop=o,document.body.scrollTop=o;
}else H&&H.style.removeProperty("margin-top"),document.documentElement.scrollTop=0,
document.body.scrollTop=0;
l.$emit("keyboard-hide");
},
showEmotionPanel:function(e){
B=e,l.scroll2Reply(e+s.lastData.input,s.lastData.input);
},
hideEmotionPanel:function(){
B=0,s.lastData.keyboard&&l.scroll2Reply(s.lastData.keyboard+s.lastData.input,s.lastData.input);
},
inputHeightChange:function(e){
B?l.scroll2Reply(B+e,e):s.lastData.keyboard&&l.scroll2Reply(s.lastData.keyboard+e,e);
}
});
},
reply:function(e){
var i=this;
if(this.canReply&&!this.deviceIsPc&&this.checkReplyQualification()){
var n=this.$el,a=this.commentItem,r="reply"===this.itemType?this.item:null,m="comment"===this.itemType&&a.is_from_me||"reply"===this.itemType&&a.is_from_me&&(1===r.is_from||2===r.is_from);
if(2===this.commentVersion){
var l=void 0,c=void 0;
"comment"===this.itemType?(l=a.nick_name,c=a.content):(l=r.nick_name,c=r.content),
this.setWriteStatus({
status:0
});
var p="comment"===this.type||"reply"===this.type;
n&&(p||E||P)&&(this.__curReplyEl=n,s.lastData.keyboard&&s.lastData.input&&this.scroll2Reply(s.lastData.keyboard+s.lastData.input,s.lastData.input)),
t.enableSelect(),d.isIOS&&this.isVoiceover?this.replyByDialog(l,c,p):!function(){
var t=y.lockOrientation(2),o=[n,e,p,l,c,t];
t?setTimeout(function(){
return i.showKeyboard.apply(i,o);
},300):i.showKeyboard.apply(i,o);
}();
}else if(1===this.commentVersion&&m){
var h="comment"===this.itemType?a.content:r.content,u=this.$store.state.cgiData;
o.invoke("handleMPPageAction",{
action:"writeCommentReply",
title:u.title,
comment_id:this.commentId,
style:"white",
personal_comment_id:""+a.my_id,
reply_content:h||""
});
}else _.setSum(110809,51,1);
}
},
replyByDialog:function(e,i,n){
var o=this;
y.lockOrientation(2),n&&(t.enableSelect(),this.$parent.$parent.setAriaHidden(!0)),
this.$parent.showWriteDialog({
value:this.inputValue,
nickName:e,
toContent:i,
onSubmit:function(e){
o.sendReply(e);
},
onHide:function(e){
!o.inDialog&&y.unlockOrientation(),o.inputValue=e,n&&(t.disableSelect(),o.$parent.$parent.setAriaHidden(!1));
}
});
},
pcReply:function(){
var t=this;
if(this.canReply&&this.checkReplyQualification()){
if(!O){
var i=e("appmsg/comment/comment_input/comment_input.js");
O=new i({
type:"reply",
placeholder:"留言被公众号精选后，将对所有人可见",
submitText:"回复",
length:this.replyLimit
});
}
O.onChange=function(e,i){
if(N&&i.offsetHeight>N)t.pcInputMulti=!0;else if(i.childNodes.length){
var n=document.createRange();
n.selectNodeContents(i.childNodes[0]),t.pcInputMulti=n.getBoundingClientRect().width>W?!0:!1;
}else t.pcInputMulti=!1;
},O.onSubmit=function(){
t.sendReply(O.value);
},O.onShow=function(e,t){
""===O.value&&(N=t.offsetHeight,W=t.offsetWidth-20);
},O.onHide=function(){
t.pcInputing=!1,t.inputValue=O.value;
};
var n=this.$refs.pcReplyBtn;
if(O.isShow&&(O.hide(),n===O.target))return;
this.pcInputing=!0;
var o=this.commentItem,s="reply"===this.itemType?this.item:null,a="comment"===this.itemType?o.nick_name:s.nick_name;
O.show(this.$refs.pcReplyArea,{
target:n,
renderType:"append",
text:this.inputValue,
placeholder:this.canC2cReply?"回复 "+a+"：":"回复被精选后，对所有人可见"
});
}
},
sendReply:function(e){
var t=this,i=this.commentItem,o="reply"===this.itemType?this.item:null,s=y.validContent(e,"reply"),a=s.valid,r=s.content;
if(a&&!this.__replyLock){
this.__replyLock=!0;
var m=this.$store.state.cgiData;
n({
url:"/mp/appmsg_comment?action=addcommentreply",
data:{
appmsgid:m.appmsgid,
idx:m.idx,
comment_id:this.commentId,
sn:m.sn,
title:m.title,
nickname:this.nickName,
head_img:this.headImg,
content:r,
enterid:m.enterid,
my_id:i.my_id,
scene:this.reportData.scene,
to_reply_id:"reply"===this.itemType?o.reply_id:"",
content_id:i.content_id,
sessionid:m.sessionid||""
},
type:"POST",
dataType:"json",
success:function(e){
switch(+e.ret){
case 0:
t.deviceIsPc&&O.hide();
var n={
content:r,
create_time:Math.floor(new Date/1e3),
reply_id:e.reply_id,
reply_like_num:0,
reply_like_status:0,
nick_name:t.nickName,
logo_url:t.headImg,
to_content:"reply"===t.itemType?o.content:"",
to_nick_name:y.sliceNickname("reply"===t.itemType?o.nick_name:""),
is_from:1,
to_reply_del_flag:0,
reply_is_elected:t.canC2cReply?1:0,
needAnimation:!0
};
switch(t.type){
case"elected":
t.addComment({
type:t.type,
commentIdx:"reply"===t.itemType?t.commentIdx:t.itemIdx,
replyIdx:"reply"===t.itemType?t.itemIdx:void 0,
replyItem:n
});
break;

case"comment":
case"reply":
t.updateCommentReplyInfo({
commentIdx:"reply"===t.itemType?t.commentIdx:t.itemIdx,
key:"reply_total_cnt",
value:i.reply_new.reply_total_cnt+1
});
break;

case"mine":
t.addComment({
type:t.type,
commentIdx:"reply"===t.itemType?t.commentIdx:t.itemIdx,
replyItem:n
});
}
return t.inputValue="",void t.$emit("add",t.contentId,"reply"===t.itemType?t.item.reply_id:void 0,n);

case-6:
y.newAlert("你回复的太频繁了，休息一下吧");
break;

case-7:
y.newAlert("你还未关注该公众号，不能参与回复");
break;

case-10:
y.newAlert("字数不能多于"+t.replyLimit+"个");
break;

case-15:
y.newAlert("回复已关闭");
break;

case-18:
y.newAlert("你在此留言的回复次数已达上限");
break;

case-20:
y.newAlert("你还未关注该公众号7天，不能参与回复");
break;

default:
y.newAlert("系统错误，请重试");
}
t.$emit("add-fail",t.contentId,"reply"===t.itemType?t.item.reply_id:void 0);
},
error:function(e){
console.error(e),this.$emit("add-fail",this.contentId,"reply"===this.itemType?this.item.reply_id:void 0);
},
complete:function(){
t.__replyLock=!1;
}
});
}
},
checkReplyQualification:function(){
if(1===this.replyFlag)return this.showWarningToast("回复已被关闭"),!1;
if(this.commentItem.is_from_me)return!0;
if(0===this.replyFlag)this.showWarningToast("作者已设置其他人不能回复");else if(3!==this.replyFlag||this.isFans){
if(4!==this.replyFlag||this.isFansDays)return!0;
this.showWarningToast("作者已设置关注7天后才可回复");
}else this.showWarningToast("作者已设置关注后才可以回复");
return this.$emit("can-not-reply"),!1;
},
showWarningToast:function(e){
var t=this;
this.setWarningToast({
content:e
}),this.__warningToastTimer&&clearTimeout(this.__warningToastTimer),this.__warningToastTimer=setTimeout(function(){
t.setWarningToast({
content:""
}),t.__warningToastTimer=null;
},750);
},
togglePcDropdown:function(e){
e.stopPropagation(),this.pcDropdownShow=!this.pcDropdownShow;
},
hidePcDropdown:function(){
this.pcDropdownShow&&(this.pcDropdownShow=!1);
},
onTouchStart:function(e){
var i=this;
this.notShowGray(e.target)||(this.onLongTapStart(e),("elected"===this.type||"mine"===this.type)&&(this.__disableSelectTimer=setTimeout(function(){
t.disableSelect(),i.__disableSelectTimer=null;
},100)),this.__touchDom=e.currentTarget,1===e.touches.length&&this.touchStartHandler(this.canReply?100:200));
},
touchStartHandler:function(e){
var t=this;
this.__grayTimer=setTimeout(function(){
t.touching=!0,t.__grayTimer=null;
},e);
},
onTouchMove:function(e){
var t=this;
this.onLongTapMove(e,function(){
t.__grayTimer?(clearTimeout(t.__grayTimer),t.__grayTimer=null):t.touching=!1,t.__disableSelectTimer&&clearTimeout(t.__disableSelectTimer);
});
},
onTouchEnd:function(e){
var i=this;
this.notShowGray(e.target)||(this.onLongTapEnd(e),("elected"===this.type||"mine"===this.type)&&setTimeout(function(){
t.enableSelect();
},300),this.__touchDom=null,this.canReply?setTimeout(function(){
return i.touchEndHandler();
},500):this.touchEndHandler());
},
touchEndHandler:function(){
this.touching=!1,this.__grayTimer&&(clearTimeout(this.__grayTimer),this.__grayTimer=null),
this.__actionSheetShown&&(this.__actionSheetShown=!1);
},
notShowGray:function(e){
return e===this.$refs.removeBtn||e===this.$refs.replyBtn||A(this.$refs.praiseBtn,e)||e===this.$refs.extendBtn;
},
onMouseOut:function(e){
e.target===this.$el&&this.hidePcDropdown();
},
onAnimationend:function(e){
"newDiscuss"===e.animationName&&("elected"===this.type||"mine"===this.type?this.setAnimationStatus({
type:this.type,
commentIdx:"comment"===this.itemType&&"comment"!==this.type?this.itemIdx:this.commentIdx,
replyIdx:"reply"===this.itemType?this.itemIdx:void 0
}):this.$emit("remove-animation",this.itemIdx));
},
onDocCtxMenu:function(e){
this.__touchDom&&t.isParent(e.target,this.__touchDom)&&(e.preventDefault(),("elected"===this.type||"mine"===this.type)&&t.enableSelect());
},
onLongTapStart:function(e){
var t=this;
if(1===e.touches.length){
var i=e.touches[0];
this.__longTapPos=[i.clientX,i.clientY,Date.now()],this.__longTapTimer=setTimeout(function(){
t.__longTapTimer=null,t.onLongTap(e);
},500);
}
},
onLongTapMove:function(e,t){
if(this.__longTapTimer){
var i=e.changedTouches[0];
(Math.abs(this.__longTapPos[0]-i.clientX)>5||Math.abs(this.__longTapPos[1]-i.clientY)>5)&&(clearTimeout(this.__longTapTimer),
this.__longTapTimer=null,"function"==typeof t&&t());
}
},
onLongTapEnd:function(e){
this.__longTapTimer?(clearTimeout(this.__longTapTimer),this.__longTapTimer=null):e.preventDefault();
},
onLongTap:function(e){
b({
opType:1,
PersonalCommentId:this.myId,
ReplyId:"reply"===this.itemType?this.item.reply_id:0
}),this.showActionSheet(),this.touching=!1,e.preventDefault(),this.__actionSheetShown=!0;
},
onGetKeyboardHeight:function(e){
var t=e.keyboard,i=e.input;
this.__curReplyEl&&this.scroll2Reply(t+i,i);
},
scroll2Reply:function(e){
var n=this,o=arguments.length<=1||void 0===arguments[1]?0:arguments[1];
if(!d.isIOS||!this.isVoiceover)if("comment"===this.type||"reply"===this.type){
var r=C-this.__curReplyEl.getBoundingClientRect().bottom-e;
this.$emit("scroll-to-me",{
shortDistance:Math.abs(r)<150,
marginBottom:e,
scrollDeltaY:r,
replyEl:this.__curReplyEl,
pageHeight:C,
inputHeight:o
});
}else if(E){
var r=this.__curReplyEl.getBoundingClientRect().bottom-(C-e),m=Math.abs(r),l=t.getScrollTop(),c=document.body.scrollHeight-l-C;
r>c?document.body.style.marginBottom=(document.body.style.marginBottom?parseInt(document.body.style.marginBottom,10):0)+r-c+"px":0>r&&m>l&&(H.classList.add(x),
H&&(H.style.marginTop=(H.style.marginTop?parseInt(H.style.marginTop,10):0)+m-l+"px"));
var p={
distance:r,
end:s.onlyUseH5Keyboard?function(){
var e=n.__curReplyEl.getBoundingClientRect().bottom,t=a.getInnerHeight();
t!==C&&Math.abs(e+o-t)>=3&&i.start({
distance:e+o-t,
duration:.1
});
}:null
};
Math.abs(r)<150?p.speed=300:p.duration=.3,i.start(p);
}else if(P){
var h=void 0;
this.__curReplyEl.dataset.bottom?h=1*this.__curReplyEl.dataset.bottom:(h=this.__curReplyEl.getBoundingClientRect().bottom,
this.__curReplyEl.dataset.bottom=h);
var r=C-h-e,l=t.getScrollTop();
L.classList.add(k),r>l?(H&&(H.classList.add(x),H.style.marginTop=r-l+"px"),L.style.transform="translateY("+l+"px)",
delete L.dataset.distance):(L.style.transform="translateY("+r+"px)",L.dataset.distance=r,
H&&H.style.removeProperty("margin-top"));
}
},
showActionSheet:function(){
var e=this;
c.show({
buttons:[{
label:"复制",
onClick:function(){
b({
opType:2,
PersonalCommentId:e.myId,
ReplyId:"reply"===e.itemType?e.item.reply_id:0
});
var t=e.item.content;
o.invoke("handleMPPageAction",{
action:"setClipboardData",
text:t
},function(e){
/:ok$/.test(e.err_msg)?window.weui.toast("复制成功",750):window.navigator.clipboard&&window.navigator.clipboard.writeText?window.navigator.clipboard.writeText(t).then(function(){
window.weui.toast("复制成功",750);
},function(){
y.execCommandCopy(t);
}):y.execCommandCopy(t);
});
}
},{
label:"投诉",
onClick:function(){
b({
opType:3,
PersonalCommentId:e.myId,
ReplyId:"reply"===e.itemType?e.item.reply_id:0
}),e.complain();
}
}],
onClose:function(){
("comment"===e.type||"reply"===e.type)&&p.show({
onClick:function(){
e.$emit("nav-shadow-click");
}
});
}
});
},
complain:function(){
var e={
comment:1,
reply:2
},t="/mp/report?action=getcommentcomplain&comment_id="+this.commentId+"&content_id="+this.contentId+"&type="+e[this.itemType]+"&url="+encodeURIComponent(window.location.href);
"reply"===this.itemType&&(t+="&reply_id="+this.item.reply_id),t+="#wechat_redirect",
l.openUrlWithExtraWebview(t);
}
}),
filters:{
parseNickname:function(e){
return e.replace(/\s/g,"")||" ";
}
}
};
});define("pages_new/modules/comment/list/list.html.js",[],function(){
return'<div>\n  <!-- 底部留言列表的留言和回复项 -->\n  <ul class="discuss_list" v-if="type === \'mine\' || type === \'elected\'">\n    <li\n      v-for="(item, itemIdx) in cookedList"\n      v-show="!getIsOversize(item.count)"\n      :key="item.content_id"\n\n      :class="[\'js_comment_item\', \'discuss_item\', \'cid\' + item.is_from_me == 1 ? item.my_id : item.content_id]"\n      :id="\'cid\' + item.is_from_me == 1 ? item.my_id : item.content_id"\n      :data-elected="item.report_elected"\n      :data-friend="item.report_friend"\n      :data-my-id="item.my_id"\n      :data-content-id="item.content_id"\n    >\n      <mp-comment-item\n        ref="cmtItem"\n        item-type="comment"\n        :item-idx="itemIdx"\n        :item="item"\n        :type="type"\n        :comment-item="item"\n        :content-id="item.content_id"\n        :my-id="item.my_id"\n\n        @add="add"\n        @add-fail="addFail"\n        @remove="remove"\n        @praise="praise"\n        @keyboard-show="onKeyboardShow"\n        @keyboard-hide="onKeyboardHide"\n        @can-not-reply="onCanNotReply"\n      ></mp-comment-item>\n\n      <div class="discuss_reply_area">\n        <div class="discuss_reply">\n          <mp-comment-item\n            v-if="item.reply_new && item.reply_new.reply_list && item.reply_new.reply_list.length > 0"\n            v-for="(replyItem, replyItemIdx) in item.reply_new.reply_list"\n            v-show="!getIsOversize(replyItem.count)"\n            :key="item.content_id + replyItem.reply_id"\n\n            ref="replyItem"\n            item-type="reply"\n            :item-idx="replyItemIdx"\n            :item="replyItem"\n            :type="type"\n            :comment-item="item"\n            :comment-idx="itemIdx"\n            :content-id="item.content_id"\n            :my-id="item.my_id"\n\n            @add="add"\n            @add-fail="addFail"\n            @remove="remove"\n            @praise="praise"\n            @keyboard-show="onKeyboardShow"\n            @keyboard-hide="onKeyboardHide"\n            @can-not-reply="onCanNotReply"\n          ></mp-comment-item>\n        </div>\n\n        <div\n          v-if="type !== \'mine\' && item.reply_new.reply_total_cnt !== 0 && item.reply_new.reply_total_cnt !== item.reply_new.reply_list.length"\n          ref="moreReplies"\n          class="discuss_extra_info"\n          :data-my-id="item.my_id"\n          :data-num="item.reply_new.reply_total_cnt"\n          @click="showMoreReplies(item, itemIdx)"\n        >\n          <a href="javascript:;" role="button" class="dicuss_reply_more js_wx_tap_highlight wx_tap_link">共{{item.reply_new.reply_total_cnt}}条回复</a>\n        </div>\n      </div>\n    </li>\n  </ul>\n  <!-- 留言弹窗留言项 -->\n  <div class="discuss_media_current js_comment_list" v-else-if="type === \'comment\'">\n    <li\n      v-for="(item, itemIdx) in cookedList"\n      :key="item.content_id"\n\n      :class="[\'discuss_item\', \'cid\' + item.is_from_me == 1 ? item.my_id : item.content_id]"\n      :id="\'cid\' + item.is_from_me == 1 ? item.my_id : item.content_id"\n      :data-elected="item.report_elected"\n      :data-friend="item.report_friend"\n      :data-my-id="item.my_id"\n      :data-content-id="item.content_id"\n    >\n      <mp-comment-item\n        ref="cmtItem"\n        item-type="comment"\n        :item-idx="itemIdx"\n        :item="item"\n        :type="type"\n        :comment-item="item"\n        :comment-idx="cmtIdx"\n        :content-id="item.content_id"\n        :my-id="item.my_id"\n\n        @add="add"\n        @add-fail="addFail"\n        @remove="remove"\n        @praise="praise"\n        @scroll-to-me="dialogScroll"\n        @reset-scroll="resetDialogScroll"\n        @nav-shadow-click="navShadowClick"\n        @keyboard-show="onKeyboardShow"\n        @keyboard-hide="onKeyboardHide"\n        @can-not-reply="onCanNotReply"\n      ></mp-comment-item>\n    </li>\n  </div>\n  <!-- 留言弹窗回复项 -->\n  <div class="discuss_more_list js_reply_list" v-else>\n    <mp-comment-item\n      v-for="(item, itemIdx) in cookedList"\n      :key="item.content_id"\n\n      ref="cmtItem"\n      item-type="reply"\n      :item-idx="itemIdx"\n      :item="item"\n      :type="type"\n      :comment-item="cmtData"\n      :comment-idx="cmtIdx"\n      :content-id="cmtData.content_id"\n      :my-id="cmtData.my_id"\n\n      @add="add"\n      @add-fail="addFail"\n      @remove="remove"\n      @praise="praise"\n      @scroll-to-me="dialogScroll"\n      @reset-scroll="resetDialogScroll"\n      @nav-shadow-click="navShadowClick"\n      @keyboard-show="onKeyboardShow"\n      @keyboard-hide="onKeyboardHide"\n      @can-not-reply="onCanNotReply"\n      @remove-animation="onRemoveAnimation"\n    ></mp-comment-item>\n  </div>\n</div>\n';
});define("pages_new/modules/comment/write_dialog/write_dialog.html.js",[],function(){
return'<mp-bottom-modal\n  ref="modal"\n  class="discuss_write_dialog_wrp"\n  content-wrap-class="comment_reply_context_wrp"\n  top="16px"\n  has-btn\n  :ext-class="modalOpt.extClass"\n  :btn-text="modalOpt.btnText"\n  :close-btn-type="modalOpt.closeBtnType"\n  :transparent-mask="modalOpt.transparentMask"\n  :animation-type="modalOpt.animationType"\n  @submit="onSubmit"\n  @hide="onHide"\n>\n  <template #title>\n    <template v-if="type === \'comment\'">写留言</template>\n    <template v-else>写回复</template>\n  </template>\n\n  <div ref="bd" class="comment_reply_context">\n    <div v-if="type !== \'comment\'" class="comment_reply_mod_wrp" role="option">\n      <div class="comment_reply_mod">\n        <span>{{ nickName }}</span>:&nbsp;<span>{{ toContent }}</span>\n      </div>\n    </div>\n\n    <!-- 实际编辑用的textarea -->\n    <textarea ref="input" v-model="inputValue" :style="inputStyle" :placeholder="placeholder" class="weui-textarea comment_textarea" @input="onInputChange" @paste="onPaste" @keydown="onKeydown" @touchstart="onTouchstart" @focus="onFocus" @blur="onBlur"></textarea>\n    <!-- 以下textarea是仅用于占位用的，为了防止focus时页面抖动，会在focus的瞬间让上面的textarea高度设为0并显示下面的textarea占位，300ms后再隐藏下面的textarea并显示实际的textarea -->\n    <textarea aria-hidden="true" ref="fakeInput" v-show="showFakeInput" v-model="inputValue" :placeholder="placeholder" class="weui-textarea comment_textarea" style="flex: 1;" readonly></textarea>\n\n    <div class="discuss_toolbar">\n      <a role="button" class="icon_discuss_emotion" href="javascript:;" @click="toggleEmotion">表情</a>\n      <span class="comment_write_counter">{{ inputTips }}</span>\n    </div>\n\n    <!-- <div style="display: none;">\n      <div class="weui-mask_transparent"></div>\n      <div class="weui-toast">\n        <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n        <p class="weui-toast__content">发送中</p>\n      </div>\n    </div> -->\n  </div>\n</mp-bottom-modal>\n';
});define("pages_new/modules/bottom_modal/bottom_modal.js",["biz_wap/ui/weui_css.js","widget/wx-widget/wx_bottom_modal.css","pages_new/modules/bottom_modal/bottom_modal.html.js","biz_wap/utils/device.js","common/navShadow.js","common/userGoBack.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
t("biz_wap/ui/weui_css.js"),t("widget/wx-widget/wx_bottom_modal.css");
var e=t("pages_new/modules/bottom_modal/bottom_modal.html.js"),i=t("biz_wap/utils/device.js"),n=t("common/navShadow.js"),o=t("common/userGoBack.js"),s=t("biz_wap/jsapi/core.js"),a=100,l=screen.height/4*3+"px",r=function(t){
return Math.ceil(t.scrollTop+t.offsetHeight)>=t.scrollHeight;
},c=function(t){
if(!(t&&t instanceof HTMLElement))return!1;
var e=window.getComputedStyle(t);
return 0!==e.width&&0!==e.height&&0!==e.opacity&&"none"!==e.display&&"hidden"!==e.visibility&&null!==t.offsetParent;
},h={
name:"mp-bottom-modal",
template:e,
props:{
top:{
type:String,
"default":i.os.pc?"20%":screen.height/4-(screen.height-window.innerHeight)+"px"
},
hasHeader:{
type:Boolean,
"default":!0
},
hasBtn:{
type:Boolean,
"default":!1
},
btnText:{
type:String,
"default":"提交"
},
closeBtnType:{
type:String,
"default":"close"
},
noMask:{
type:Boolean,
"default":!1
},
hideWhenMaskClick:{
type:Boolean,
"default":!0
},
endLine:{
type:Boolean,
"default":!1
},
extClass:{
type:String,
"default":""
},
contentAreaClass:{
type:String,
"default":""
},
contentWrapClass:{
type:String,
"default":""
},
animationType:{
type:String,
"default":"bottom"
},
transparentMask:{
type:Boolean,
"default":!1
},
hideWhenScrollDown:{
type:Boolean,
"default":!1
},
hideWhenSideslip:{
type:Boolean,
"default":!1
},
autoHeight:{
type:Boolean,
"default":!1
},
scroll2Hide:{
type:Boolean,
"default":!0
},
enablePulldownLoad:{
type:Boolean,
"default":!1
}
},
data:function(){
return{
ariaHidden:"true",
modalShow:!1,
loading:!1,
pullLoading:0,
curScrollTop:0,
scrollLock:!1,
pullingUpLock:!1,
pullingDownLock:!1,
submitDisabled:!1,
addModalFormClass:!1,
contentAreaStyle:{
visibility:null,
top:null,
transition:null,
transform:null,
maxHeight:this.autoHeight?l:"none"
},
transparentMaskVisibility:null,
triggerEl:null,
isAutoFocus:!0,
disableScrollClass:"page_no_scroll",
headLine:!1
};
},
created:function(){
this.__touches={
startX:0,
startY:0,
curX:0,
curY:0,
isScreenLeft:!1,
direction:"",
times:0
},this.__enableGesture=!1,this.__distance=null,this.bindEvent();
},
methods:{
onMaskClick:function(){
this.hideWhenMaskClick&&this.hide();
},
onMaskFixedClick:function(){
var t=this;
setTimeout(function(){
t.hide(),t.transparentMaskVisibility="hidden",t.contentAreaStyle.visibility=null,
t.contentAreaStyle.transition=null,t.contentAreaStyle.transform=null;
},300);
},
onContentTransitionEnd:function(t){
!this.hideWhenMaskClick||t.target!==this.$refs.contentArea||"transform"!==t.propertyName&&"-ms-transform"!==t.propertyName||(null!==this.contentAreaStyle.transform?this.contentAreaStyle.transform=null:this.getShowStatus()?this.$emit("show-after-animation"):(this.transparentMaskVisibility="hidden",
this.contentAreaStyle.visibility=null,this.contentAreaStyle.transition=null,this.contentAreaStyle.transform=null));
},
moveDialogStart:function(t){
var e=t.touches[0];
this.__touches={
startX:e.pageX,
startY:e.pageY,
curX:e.pageX,
curY:e.pageY,
isScreenLeft:this.__enableGesture&&e.pageX<=30,
direction:"",
times:0
},this.contentAreaStyle.transition="none";
},
moveDialogByHd:function(t){
t.preventDefault();
var e=t.changedTouches[0];
this.getTouchDirection(e)&&this.moveByDirection(e);
},
moveDialogEnd:function(t){
var e=this.__touches.direction,i="X"===e?100:this.$refs.contentArea.offsetHeight/3,n=t.changedTouches[0]["page"+e]-this.__touches["start"+e];
this.contentAreaStyle.transition=null,this.__distance&&(n>i?this.hide():this.contentAreaStyle.transform="translateY(0)",
this.__distance=null);
},
getTouchDirection:function(t){
if(this.__touches.direction)return!0;
if(!this.__touches.isScreenLeft)return this.__touches.direction="Y",!0;
this.__touches.times++;
var e=Math.abs(t.pageX-this.__touches.startX),i=Math.abs(t.pageY-this.__touches.startY);
return this.__touches.times>=3?(this.__touches.direction=e>=i?"X":"Y",!0):e>=5&&e>=i?(this.__touches.direction="X",
!0):i>=5?(this.__touches.direction="Y",!0):!1;
},
moveByDirection:function(t){
var e=this.__touches.direction,i=t["page"+e];
i-this.__touches["start"+e]>0?this.move(i):this.resetMovement(),this.__touches["cur"+e]=i;
},
move:function(t){
(this.hideWhenSideslip&&"X"===this.__touches.direction||this.hideWhenScrollDown&&"Y"===this.__touches.direction)&&(this.__distance=1*(this.__distance||0)+t-this.__touches["cur"+this.__touches.direction],
this.contentAreaStyle.transform="translateY("+this.__distance+"px)");
},
resetMovement:function(){
this.__distance=null,this.contentAreaStyle.transform=null;
},
onSubmitClick:function(){
this.submitDisabled||this.$emit("submit");
},
onTitleClick:function(){
this.$emit("title-click");
},
onScroll:function(){
this.checkReachBoundary(),this.headLine=this.$refs.contentAreaWrp.scrollTop>0?!0:!1;
},
moveDialogByBd:function(t){
var e=t.changedTouches[0];
if(this.getTouchDirection(e)){
var i=this.__touches.direction;
if("Y"===i){
var n=this.$refs.contentAreaWrp,o=e.pageY,s=o-this.__touches.startY,a=0===n.scrollTop&&s>0,l=r(n)&&0>s;
a||l?a&&!this.enablePulldownLoad&&(this.move(o),t.preventDefault()):this.resetMovement(),
this.__touches.curY=o;
}else t.preventDefault(),this.moveByDirection(e);
}
},
moveDialogByFt:function(t){
this.moveDialogByHd(t);
},
disableBtn:function(){
this.submitDisabled=!0;
},
enableBtn:function(){
this.submitDisabled=!1;
},
checkReachBoundary:function(){
var t=this,e=arguments.length<=0||void 0===arguments[0]?!0:arguments[0],i=arguments.length<=1||void 0===arguments[1]?!0:arguments[1];
this.scrollLock&&0!==this.$refs.contentAreaWrp.scrollTop||(this.scrollLock=!0,setTimeout(function(){
t.scrollLock=!1;
},50),this.enablePulldownLoad&&e&&!this.pullingDownLock&&this.$refs.contentAreaWrp.scrollTop<=0&&(this.$emit("pulldown-load"),
this.pullingDownLock=!0),setTimeout(function(){
i&&!t.pullingUpLock&&t.$refs.contentAreaWrp.scrollTop+t.$refs.contentAreaWrp.offsetHeight+a>t.$refs.contentEle.offsetHeight&&(t.$emit("pullup-load"),
t.pullingUpLock=!0);
},100),this.$emit("scroll",this.$refs.contentAreaWrp.scrollTop>this.curScrollTop?"up":"down"),
this.curScrollTop=this.$refs.contentAreaWrp.scrollTop);
},
showLoading:function(){
this.loading=!0;
},
hideLoading:function(){
this.loading=!1;
},
showPullUpLoading:function(){
this.pullLoading=2;
},
hidePullUpLoading:function(){
this.pullLoading=0;
},
showPullDownLoading:function(){
this.pullLoading=1;
},
hidePullDownLoading:function(){
this.pullLoading=0;
},
finishPullUpLoad:function(){
this.pullingUpLock=!1;
},
finishPullDownLoad:function(){
this.pullingDownLock=!1;
},
scrollTo:function(){
var t;
(t=this.$refs.contentAreaWrp).scrollTo.apply(t,arguments);
},
getScrollEle:function(){
return this.$refs.contentAreaWrp;
},
getBdEle:function(){
return this.$refs.contentAreaWrp;
},
getShowStatus:function(){
return this.modalShow;
},
show:function(t,e,a){
var l=this,r=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];
this.getShowStatus()||(this.setAriaHidden(!1),this.modalShow=!0,this.contentAreaStyle.visibility="visible",
this.triggerEl=r.triggerEl||window.event&&window.event.target,this.isAutoFocus=r.isAutoFocus||!0,
document.body.classList.add(this.disableScrollClass),this.$nextTick(function(){
l.$refs.rootEl.focus();
}),this.noMask||(n.show({
alpha:this.transparentMask?0:.6,
callback:function(t){
t&&l.$emit("nav-shadow-show");
},
onClick:function(){
l.hide();
}
}),this.hideWhenMaskClick&&(this.transparentMaskVisibility="visible")),this.hideWhenSideslip&&(i.os.ios?s.invoke("handleDeviceInfo",{
action:"disableInteractivePop",
disable:!0
},function(t){
/:ok$/.test(t.err_msg)&&(l.__enableGesture=!0);
}):o.disable({
onGoBack:function(){
l.hide();
},
onDisable:function(){
l.__enableGesture=!0;
},
onEnable:function(){
l.__enableGesture=!1;
}
})),t?(this.addModalFormClass=!0,this.contentAreaStyle.top=e):this.autoHeight||(this.contentAreaStyle.top=this.top,
"right"===this.animationType&&(this.contentAreaStyle.transform="translateX(0)")),
t&&(setTimeout(function(){
l.contentAreaStyle.top="bottom"===l.animationType?"100%":l.top,l.addModalFormClass=!1,
setTimeout(function(){
l.contentAreaStyle.top=l.top,"right"===l.animationType&&(l.contentAreaStyle.transform="translateX(0)");
});
},0),i.os.ios?this.$nextTick(function(){
a.focus();
}):!function(){
var t=a.cloneNode(!0);
t.style.opacity=0,t.style.position="fixed",t.style.top=0,t.style.zIndex="-1",document.body.appendChild(t),
l.$nextTick(function(){
setTimeout(function(){
a.focus(),document.body.removeChild(t);
},300),t.focus();
});
}(),i.os.ios&&!this.__hasBindInputEvent&&r.afterTransparentInputEle&&r.afterShowInputEle&&(this.__hasBindInputEvent=!0,
a.addEventListener("focus",function(){
setTimeout(function(){
a.style.opacity=1,r.afterShowInputEle();
},50);
}),a.addEventListener("blur",function(){
r.afterTransparentInputEle(),a.style.opacity=0;
}))),this.$emit("show"));
},
hide:function(t){
var e=this;
t&&(this.transparentMaskVisibility="hidden"),this.getShowStatus()&&(document.body.classList.remove(this.disableScrollClass),
this.contentAreaStyle.transform=null,this.setAriaHidden(!0),this.modalShow=!1,this.isAutoFocus&&c(this.triggerEl)&&(this.triggerEl.setAttribute("tabindex","0"),
this.triggerEl.focus()),this.noMask||n.hide(),this.hideWhenSideslip&&(i.os.ios?s.invoke("handleDeviceInfo",{
action:"disableInteractivePop",
disable:!1
},function(t){
/:ok$/.test(t.err_msg)&&(e.__enableGesture=!1);
}):o.enable({
onEnable:function(){
e.__enableGesture=!1;
}
})),this.$emit("hide"));
},
setAriaHidden:function(t){
this.ariaHidden=t.toString();
},
bindEvent:function(){
var t=this;
window.addEventListener("unload",function(){
t.noMask||n.hide();
});
}
}
};
return h;
});var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var i=arguments[e];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);
}
return t;
};
define("pages/bottom_input_bar.js",["biz_wap/zepto/zepto.js","page/pages/bottom_input_bar.css","icon/emotion_panel/weemoji_panel.css","biz_wap/jsapi/log.js","appmsg/emotion/weemoji.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","biz_common/dom/event.js"],function(require,exports,module,alert){
"use strict";
function BottomInputBar(t){
this.opt={
placeholder:"",
limit:0
},this.opt=_extends(this.opt,t),this.state={
inChooseEmoji:!1,
listener:{},
limit:this.opt.limit,
show:!1,
inputHeight:0,
keyboardHeight:0,
panelHeight:0,
androidTriggeringEmoji:!1,
androidShowingKeybroad:!1,
androidInFullscreen:!1,
androidInLandscape:!1,
androidOriWinInnerHeight:[window.innerHeight,window.innerHeight,window.innerWidth],
androidMinWinInnerHeight:[window.innerHeight,window.innerHeight,window.innerWidth],
showEmotionFirst:!1
},this.__isComposition=!1,this.__mount(),this.__bindEvent();
}
require("biz_wap/zepto/zepto.js"),require("page/pages/bottom_input_bar.css"),require("icon/emotion_panel/weemoji_panel.css");
var Log=require("biz_wap/jsapi/log.js"),weEmoji=require("appmsg/emotion/weemoji.js"),emojiData=weEmoji.EmojiData||[],panelData=weEmoji.EmojiPanelData||[],JSAPI=require("biz_wap/jsapi/core.js"),mmversion=require("biz_wap/utils/mmversion.js"),Device=require("biz_wap/utils/device.js"),DomEvent=require("biz_common/dom/event.js"),getEmojiText=function getEmojiText(emoji){
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
},getRealHeightOfIOSNativePanel=function(t,e){
JSAPI.invoke("handleDeviceInfo",{
action:"getUIParams"
},function(i){
var n=t;
i.isShowBottomBar&&(n-=i.bottomBarHeight),n=Math.max(n,0),"function"==typeof e&&e(n);
});
},getAndroidInnerHeightIndex=function(t,e){
return t?e?2:1:0;
},androidNavigationBarHeight=50;
mmversion.isAndroid&&!function(){
var t=function(){
JSAPI.invoke("handleMPPageAction",{
action:"getNavigationBarHeight"
},function(t){
androidNavigationBarHeight=t.height||50;
});
};
t(),document.addEventListener("visibilitychange",function(){
!document.hidden&&t();
});
}();
var tpl='<div class="comment__push__container"><div class="js_bottom_input_mask comment__push__mask" style="display: none;"></div><div class="js_bottom_input_wrapper comment__push" style="opacity: 0;"><div class="comment__push__inner"><div class="comment__push__input_wrp"><div class="js_bottom_input_faker comment__push__input__faker"></div><textarea class="js_bottom_input comment__push__input"></textarea><div class="js_bottom_input_counter comment__push__input__counter comment__push__input__counter_warn" style="display: none;"></div></div></div><div class="comment__push__extend"><a href="javascript:;" class="js_bottom_input_emoji comment__push__btn comment__push__emoji weui-wa-hotarea">表情</a><a href="javascript:;" class="js_bottom_input_submit comment__push__btn comment__push__send weui-wa-hotarea">发送</a></div></div></div>';
return BottomInputBar.prototype.__mount=function(){
this.$el=$(tpl),this.inputEle=this.$el.find(".js_bottom_input")[0],this.$mask=this.$el.find(".js_bottom_input_mask"),
this.$inputWrapper=this.$el.find(".js_bottom_input_wrapper"),0!==this.state.limit&&this.inputEle.setAttribute("maxlength",this.state.limit),
this.inputEle.setAttribute("placeholder",this.__filterContent(this.opt.placeholder)),
mmversion.isIOS||this.__initEmojiPanel(),document.body.append(this.$el[0]);
},BottomInputBar.prototype.__bindEvent=function(){
var t=this,e=this.$el.find(".js_bottom_input_submit")[0],i=this.$el.find(".js_bottom_input_emoji")[0];
DomEvent.tap(this.$inputWrapper[0],function(n){
var o=n.target;
o!==t.inputEle&&o!==e&&o!==i&&n.preventDefault();
}),DomEvent.tap(this.$mask[0],function(e){
console.log("hide[mask tap]"),Log.info("hide[mask tap]"),t.hide(),e.preventDefault();
}),DomEvent.on(this.$mask[0],"touchmove",function(e){
console.log("hide[mask touchmove]"),Log.info("hide[mask touchmove]"),t.hide(),e.preventDefault();
}),DomEvent.tap(this.inputEle,function(e){
t.state.inChooseEmoji&&(t.__triggerEmojiPanel(),e.preventDefault());
}),DomEvent.on(this.inputEle,"focus",function(){
t.__emit("focus");
}),DomEvent.on(this.inputEle,"compositionstart",function(){
t.__isComposition=!0;
}),DomEvent.on(this.inputEle,"compositionend",function(){
t.__isComposition=!1,t.__emit("input",{
data:t.getContent(),
inputType:"setContent"
});
}),DomEvent.on(this.inputEle,"blur",function(){
mmversion.isIOS&&!t.state.inChooseEmoji&&(console.log("hide[input blur]"),Log.info("hide[input blur]"),
t.hide()),t.__emit("blur");
}),DomEvent.on(this.inputEle,"input",function(e){
t.__emit("input",{
data:e.target.value,
inputType:"inputContent"
});
}),DomEvent.on(e,mmversion.isIOS?"tap":"click",function(e){
t.__onSend(),e.preventDefault();
}),DomEvent.on(i,mmversion.isIOS?"tap":"click",function(e){
t.__triggerEmojiPanel(),e.preventDefault();
}),window.addEventListener("resize",function(){
return t.__onResize();
}),window.addEventListener("orientationchange",function(){
t.state.show&&"showing"!==t.state.show&&(console.log("hide[orientationchange]"),
Log.info("hide[orientationchange]"),t.hide());
}),mmversion.isIOS&&window.addEventListener("scroll",function(){
t.state.show&&"showing"!==t.state.show&&(console.log("hide[scroll]"),Log.info("hide[scroll]"),
t.hide());
}),this.__bindAppEvent();
},BottomInputBar.prototype.__bindAppEvent=function(){
var t=this;
mmversion.isIOS&&(JSAPI.on("onGetKeyboardHeight",function(e){
e.height&&"none"!==t.$inputWrapper.css("transform")&&(clearTimeout(t.__failToShowChecker),
getRealHeightOfIOSNativePanel(e.height,function(e){
if(t.state.keyboardHeight=e,t.state.show){
t.state.show=!0;
var i="";
t.showEmotionFirst?(t.showEmotionFirst=!1,i="translate3d(0, "+(e-t.state.panelHeight)+"px, 0)"):i="translate3d(0, 0, 0)",
t.$inputWrapper.css({
opacity:1,
transition:"",
bottom:e,
transform:i
});
}
}));
}),JSAPI.on("onGetSmiley",function(e){
if("[DELETE_EMOTION]"===e.smiley)return void t.delContent();
if("[DONE_EMOTION]"===e.smiley)return console.log("hide[onGetSmiley]"),Log.info("hide[onGetSmiley]"),
t.__onSend(),void t.hide("DONE_EMOTION");
var i=getEmojiText(e.smiley);
i&&t.insertContent(i);
}));
},BottomInputBar.prototype.__emit=function(t){
if("string"!=typeof t)return void console.error("[bottomInputBar] event must be a string");
if("input"===t&&this.__onInput(),"function"==typeof this.state.listener[t]){
for(var e,i=arguments.length,n=Array(i>1?i-1:0),o=1;i>o;o++)n[o-1]=arguments[o];
(e=this.state.listener)[t].apply(e,n);
}
},BottomInputBar.prototype.__onSend=function(){
var t=this.__filterContent(this.getContent());
t=t.replace(/\n/g," "),this.__emit("submit",t),console.log("hide[submit]"),Log.info("hide[submit]"),
this.hide(),this.clear();
},BottomInputBar.prototype.__onResize=function(){
if(this.state.androidTriggeringEmoji)this.state.androidTriggeringEmoji=!1,this.state.keyboardHeight=Math.max(window.innerHeight-this.state.keyboardHeight,0),
this.$el.find(".js_bottom_input_emoji_panel").css({
height:this.state.keyboardHeight
}),this.$inputWrapper.css({
opacity:1,
bottom:this.state.keyboardHeight
}),this.$el.find(".comment_emoji_panel_line").css({
bottom:this.state.keyboardHeight
});else if(this.state.androidShowingKeybroad){
clearTimeout(this.__failToShowChecker);
var t=this.state.androidInLandscape?1.5*androidNavigationBarHeight:0,e=getAndroidInnerHeightIndex(this.state.androidInFullscreen,this.state.androidInLandscape);
console.error("show keyboard",e,window.innerHeight,this.state.androidMinWinInnerHeight),
this.state.androidMinWinInnerHeight[e]>window.innerHeight&&((0===e||1===e)&&window.innerHeight>200||2===e)&&(this.state.androidMinWinInnerHeight[e]=window.innerHeight),
this.$inputWrapper.css({
opacity:1,
left:t,
right:t,
bottom:window.innerHeight-this.state.androidMinWinInnerHeight[e]
}),this.$el.find(".comment_emoji_panel_line").css({
bottom:window.innerHeight-this.state.androidMinWinInnerHeight[e]
}),this.state.show=!0,this.state.androidShowingKeybroad=!1,this.__emit("show");
}else if(mmversion.isIOS)console.log("hide[resize]"),Log.info("hide[resize]"),this.hide();else if(this.state.show){
var e=getAndroidInnerHeightIndex(this.state.androidInFullscreen,this.state.androidInLandscape);
window.innerHeight>this.state.androidOriWinInnerHeight[e]-10?(console.log("hide[resize]"),
Log.info("hide[resize]"),this.hide()):(console.error("show resize",e,window.innerHeight,this.state.androidMinWinInnerHeight),
this.state.androidMinWinInnerHeight[e]>window.innerHeight&&((0===e||1===e)&&window.innerHeight>200||2===e)&&(this.state.androidMinWinInnerHeight[e]=window.innerHeight),
this.$inputWrapper.css({
bottom:window.innerHeight-this.state.androidMinWinInnerHeight[e]
}),this.$el.find(".comment_emoji_panel_line").css({
bottom:window.innerHeight-this.state.androidMinWinInnerHeight[e]
}));
}
},BottomInputBar.prototype.__triggerEmojiPanel=function(){
var t=this;
if(this.state.inChooseEmoji=!this.state.inChooseEmoji,mmversion.isIOS)if(this.state.inChooseEmoji)this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__emoji").addClass("comment__push__keyboard"),
this.inputEle.blur(),JSAPI.invoke("showSmileyPanel",{
hidden:!1,
duration:.01
},function(e){
getRealHeightOfIOSNativePanel(e.height,function(e){
t.state.panelHeight=e;
var i=parseFloat(t.$inputWrapper.css("bottom")),n=i-e;
t.$inputWrapper.css("transform","translate3d(0, "+n+"px, 0)"),t.__emit("showEmotionPanel",e);
});
});else{
this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__keyboard").addClass("comment__push__emoji"),
JSAPI.invoke("showSmileyPanel",{
hidden:!0
},function(){});
var e=this.$inputWrapper.css("bottom"),i=this.$inputWrapper.css("transform"),n=(window.innerHeight-this.state.keyboardHeight)/2-1;
Device.os.getNumVersion()<13&&(this.state.show="showing",n=(window.innerHeight+this.state.keyboardHeight-this.$inputWrapper.offset().height)/2),
this.$inputWrapper.css({
opacity:0,
transition:"none",
bottom:n,
transform:"translate3d(0, 0, 0)"
}),this.inputEle.focus(),this.$inputWrapper.css({
bottom:e,
transform:i
}),setTimeout(function(){
t.$inputWrapper.css({
opacity:1,
transition:"",
bottom:t.state.keyboardHeight,
transform:"translate3d(0, 0, 0)"
});
}),this.__emit("hideEmotionPanel");
}else this.state.androidTriggeringEmoji=!0,this.state.keyboardHeight=window.innerHeight,
this.state.inChooseEmoji?(this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__emoji").addClass("comment__push__keyboard"),
this.inputEle.blur(),JSAPI.invoke("handleDeviceInfo",{
action:"hideKeyBoard"
},function(){}),setTimeout(function(){
var e=t.$el.find(".js_bottom_input_emoji_panel");
if(e.css("display",""),t.showEmotionFirst){
t.showEmotionFirst=!1;
var i=e.height();
t.state.keyboardHeight=window.innerHeight-i,t.$inputWrapper.css({
bottom:i
});
}
},200)):(this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__keyboard").addClass("comment__push__emoji"),
this.$el.find(".js_bottom_input_emoji_panel").css("display","none"),this.inputEle.focus());
},BottomInputBar.prototype.__onInput=function(){
var t=this.__filterContent(this.getContent());
if(this.__isComposition)return void $(".js_bottom_input_faker").html(t.replace(/\n/g,"<br/>"));
this.setInputValue(t);
var e=this.$inputWrapper.height();
e!==this.state.inputHeight&&(this.state.inputHeight=e,this.__emit("inputHeightChange",e));
},BottomInputBar.prototype.__filterContent=function(t){
var e=t;
return e;
},BottomInputBar.prototype.__filterWordsLimit=function(t){
var e=t;
return e;
},BottomInputBar.prototype.addListener=function(t,e){
return"string"!=typeof t?void console.error("[BottomInputBar] event must be a string"):void(this.state.listener[t]=e);
},BottomInputBar.prototype.show=function(t,e,i){
var n=this;
if(!this.state.show){
if(this.$mask.css("display",""),this.__failToShowChecker=setTimeout(function(){
n.hide(),n.__emit("fail");
},1e3),mmversion.isIOS){
JSAPI.invoke("handleMPPageAction",{
action:"opInputAccessoryView",
show:!1
},function(){});
var o=0;
Device.os.getNumVersion()<13&&(o=this.state.keyboardHeight?(window.innerHeight+this.state.keyboardHeight-this.$inputWrapper.offset().height)/2:window.innerHeight-this.$inputWrapper.offset().height),
this.$inputWrapper.css({
opacity:0,
bottom:o,
transform:"translate3d(0, 10px, 1px)"
}),this.inputEle.focus(),this.__emit("show"),this.state.show=Device.os.getNumVersion()<13?"showing":!0;
}else{
this.$inputWrapper.css({
opacity:0,
bottom:window.innerHeight
});
var s=getAndroidInnerHeightIndex(e,i);
this.state.androidOriWinInnerHeight[s]=window.innerHeight,this.state.androidShowingKeybroad=!0,
this.state.androidInLandscape=i,this.state.androidInFullscreen=e,t?this.__onResize():this.inputEle.focus();
}
var a=this.inputEle.value.length;
this.inputEle.setSelectionRange(a,a),e&&(this.$el.addClass("comment__push_danmu"),
this.$el.addClass("comment__push_immersive")),i&&this.$el.addClass("comment__push__container__horizontal"),
t&&(this.showEmotionFirst=!0,this.__triggerEmojiPanel());
}
},BottomInputBar.prototype.hide=function(t){
this.state.androidTriggeringEmoji=!1,this.state.show&&(this.state.inChooseEmoji&&(this.state.inChooseEmoji=!1,
this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__keyboard").addClass("comment__push__emoji"),
mmversion.isIOS?JSAPI.invoke("showSmileyPanel",{
hidden:!0
},function(){}):this.$el.find(".js_bottom_input_emoji_panel").css("display","none")),
mmversion.isIOS?JSAPI.invoke("handleMPPageAction",{
action:"opInputAccessoryView",
show:!0
},function(){}):JSAPI.invoke("handleDeviceInfo",{
action:"hideKeyBoard"
},function(){}),this.$inputWrapper.attr("style","opacity: 0; bottom: "+100*window.innerHeight+"px"),
this.$mask.css("display","none"),this.state.show=!1,this.state.androidShowingKeybroad=!1,
this.inputEle.blur(),this.__emit("hide",t),this.$el.removeClass("comment__push_danmu"),
this.$el.removeClass("comment__push_immersive"),this.$el.removeClass("comment__push__container__horizontal"));
},BottomInputBar.prototype.clear=function(){
this.setInputValue("");
},BottomInputBar.prototype.getContent=function(t,e){
return this.inputEle.value.substring(t,e);
},BottomInputBar.prototype.setLimit=function(t){
this.state.limit=t,0!==this.state.limit?this.inputEle.setAttribute("maxlength",this.state.limit):this.inputEle.removeAttribute("maxlength");
},BottomInputBar.prototype.setPlaceholder=function(t){
this.opt.placeholder=t,this.inputEle.setAttribute("placeholder",this.__filterContent(this.opt.placeholder));
},BottomInputBar.prototype.setInputValue=function(t){
this.inputEle.value=t,$(".js_bottom_input_faker").html(t.replace(/\n/g,"<br/>"));
},BottomInputBar.prototype.setContent=function(t){
var e=this.__filterContent(t);
this.setInputValue(e),this.__emit("input",{
data:t,
inputType:"setContent"
});
},BottomInputBar.prototype.insertContent=function(t){
var e=this.getContent(0,this.inputEle.selectionStart),i=this.getContent(this.inputEle.selectionEnd);
if(!(0!==this.state.limit&&t.length+e.length+i.length>this.state.limit)){
var n=this.inputEle.selectionStart+t.length,o=this.__filterContent(e+t+i);
this.setInputValue(o),this.inputEle.setSelectionRange(n,n),this.__emit("input",{
data:t,
inputType:"insertContent"
});
}
},BottomInputBar.prototype.delContent=function(){
var t=this.getContent(0,this.inputEle.selectionStart),e=this.getContent(this.inputEle.selectionEnd),i=void 0,n=void 0,o=void 0;
if(this.inputEle.selectionStart===this.inputEle.selectionEnd){
for(var s=0;s<emojiData.length;s++){
var a=emojiData[s];
if(a.cn&&t.endsWith(a.cn)){
i=t.substring(0,t.length-a.cn.length)+e,n=t.substring(t.length-a.cn.length,t.length),
o=this.inputEle.selectionStart-a.cn.length;
break;
}
if(a.hk&&t.endsWith(a.hk)){
i=t.substring(0,t.length-a.hk.length)+e,n=t.substring(t.length-a.hk.length,t.length),
o=this.inputEle.selectionStart-a.hk.length;
break;
}
if(a.us&&t.endsWith(a.us)){
i=t.substring(0,t.length-a.us.length)+e,n=t.substring(t.length-a.us.length,t.length),
o=this.inputEle.selectionStart-a.us.length;
break;
}
if(a.emoji&&t.endsWith(a.emoji)){
i=t.substring(0,t.length-a.emoji.length)+e,n=t.substring(t.length-a.emoji.length,t.length),
o=this.inputEle.selectionStart-a.emoji.length;
break;
}
}
"string"!=typeof i&&(i=t.replace(/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])$/,""),
n=t.match(/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])$/)[0],
o=i.length,i+=e);
}else i=t+e,n=this.getContent(this.inputEle.selectionStart,this.inputEle.selectionEnd),
o=this.inputEle.selectionStart;
i=this.__filterContent(i),this.setInputValue(i),this.inputEle.setSelectionRange(o,o),
this.__emit("input",{
data:n,
inputType:"delContent"
});
},BottomInputBar.prototype.__initEmojiPanel=function(){
for(var t=this,e=[],i={},n=0;n<panelData.length;n++)for(var o=0;o<emojiData.length;o++)if(emojiData[o].key===panelData[n].key){
e.push({
name:emojiData[o].style,
title:emojiData[o].cn,
key:emojiData[o].key
});
break;
}
for(var n=0;n<e.length;n++)i[e[n].name]=e[n].title;
var s=document.createDocumentFragment();
e.forEach(function(t,e){
var i=document.createElement("li"),n=document.createElement("span");
i.className="comment_primary_emotion_item js_emotion_item",i.setAttribute("data-index",e),
n.className="js_comment_primary_emotion comment_primary_emotion we-emoji "+t.name,
n.setAttribute("text-name",t.name),n.setAttribute("role","button"),n.setAttribute("title",t.title),
i.appendChild(n),s.appendChild(i);
}),this.$el.append('<div class="comment_primary_emotion_list_mobile_wrp comment_primary_emotion_list_mobile_grid js_bottom_input_emoji_panel comment__emoji__panel js_no_set_font_size" style="display: none;"><div class="comment_emoji_panel_line"></div><div class="comment_primary_emotion_list_mobile_title">全部表情</div><ul class="comment_primary_emotion_list_mobile js_bottom_input_emoji_panel_inner"></ul><div class="comment_primary_emotion_list_mobile_del_btn_wrp"><botton class="reset_btn comment_primary_emotion_list_mobile_del_btn">删除</botton></div></div>'),
this.$el.find(".js_bottom_input_emoji_panel_inner").append(s);
var a=void 0;
DomEvent.on(this.$el.find(".js_bottom_input_emoji_panel")[0],"touchstart",function(t){
a=t.changedTouches[0].clientY;
}),DomEvent.on(this.$el.find(".js_bottom_input_emoji_panel")[0],"touchmove",function(e){
var i=e.changedTouches[0].clientY,n=t.$el.find(".js_bottom_input_emoji_panel")[0].scrollTop,o=t.$el.find(".js_bottom_input_emoji_panel")[0].scrollHeight,s=t.$el.find(".js_bottom_input_emoji_panel")[0].clientHeight;
(.5>n&&i>a||.5>o-n-s&&a>i)&&e.preventDefault();
}),DomEvent.on(this.$el.find(".js_bottom_input_emoji_panel")[0],"click",function(e){
if(e.target.className.indexOf("js_comment_primary_emotion")>-1){
var n=i[e.target.getAttribute("text-name")];
n&&t.insertContent(n);
}
}),DomEvent.on(this.$el.find(".comment_primary_emotion_list_mobile_del_btn_wrp")[0],"touchmove",function(t){
t.preventDefault();
}),DomEvent.on(this.$el.find(".comment_primary_emotion_list_mobile_del_btn_wrp")[0],"click",function(){
t.delContent();
});
},BottomInputBar;
});define("a/appdialog_confirm.html.js",[],function(){
return'<div class="wx_profile_dialog_primary">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog weui-skin_android">\n        <div class="weui-dialog__hd"><strong class="weui-dialog__title">是否立即下载该应用</strong></div>\n        <div class="weui-dialog__bd">\n            <div class="weui-flex">\n                <div class="wx_profile_info_avatar_wrp">\n                    <span class="wx_profile_info_avatar">\n                        <img src="<#=app_img_url#>" alt="">\n                    </span>\n                </div>\n                <div class="weui-flex__item">\n                    <strong class="wx_profile_info_title"><#=app_name#></strong>\n                </div>\n            </div>\n        </div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:;" class="js_cancel weui-dialog__btn weui-dialog__btn_default">取消</a>\n            <a href="javascript:;" class="js_ok weui-dialog__btn weui-dialog__btn_primary">下载</a>\n        </div>\n    </div>\n</div>\n';
});;define('widget/wx_profile_dialog_primary.css', [], function(require, exports, module) {
	return ".radius_avatar{display:inline-block;background-color:#fff;padding:3px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;vertical-align:middle}.radius_avatar img{display:block;width:100%;height:100%;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:#eee}.wx_profile_dialog_primary .weui-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,0.6)}.wx_profile_dialog_primary .weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-65%);transform:translate(-50%,-65%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.wx_profile_dialog_primary .weui-dialog__hd{position:relative;padding:20px 20px 10px;text-align:left}.wx_profile_dialog_primary .weui-dialog__hd:after{content:\" \";position:absolute;left:20px;right:20px;bottom:0;height:1px;border-bottom:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.wx_profile_dialog_primary .weui-dialog__title{font-weight:400;font-size:17px}.wx_profile_dialog_primary .weui-dialog__bd{padding:16px 20px;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;color:#999}.wx_profile_dialog_primary .weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.wx_profile_dialog_primary .weui-dialog__ft{position:relative;line-height:44px;font-size:17px;display:-webkit-box;display:-webkit-flex;display:flex}.wx_profile_dialog_primary .weui-dialog__ft:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.wx_profile_dialog_primary .weui-dialog__btn{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.wx_profile_dialog_primary .weui-dialog__btn:active{background-color:#eee}.wx_profile_dialog_primary .weui-dialog__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.wx_profile_dialog_primary .weui-dialog__btn:first-child:after{display:none}.wx_profile_dialog_primary .weui-dialog__btn_default{color:#353535}.wx_profile_dialog_primary .weui-dialog__btn_primary{color:#1aad19}.wx_profile_dialog_primary .weui-skin_android .weui-dialog{text-align:left;box-shadow:0 6px 30px 0 rgba(0,0,0,0.1)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__title{font-size:21px}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__hd{text-align:left;padding:1.3em 1.6em 1.2em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__hd:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__bd{color:#999;padding:0 1.6em 1.4em;font-size:17px;text-align:left}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__bd:first-child{padding:1.6em 1.6em 2em;color:#353535}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__ft{display:block;text-align:right;line-height:42px;font-size:16px;padding:0 1.6em .7em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__ft:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn{display:inline-block;vertical-align:top;padding:0 .8em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:active{background-color:rgba(0,0,0,0.06)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:visited{background-color:rgba(0,0,0,0.06)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:last-child{margin-right:-0.8em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn_default{color:#808080}@media screen and (min-width:1024px){.wx_profile_dialog_primary .weui-dialog{width:35%}}.wx_profile_dialog_primary .weui-flex{display:-webkit-box;display:-webkit-flex;display:flex}.wx_profile_dialog_primary .weui-flex__item{-webkit-box-flex:1;-webkit-flex:1;flex:1}.wx_profile_dialog_primary .weui-flex{-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_profile_dialog_primary .weui-flex__item{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.wx_profile_info_avatar_wrp{padding-right:10px}.wx_profile_info_avatar{width:50px;height:50px;padding:0;display:inline-block;background-color:#fff;vertical-align:middle}.wx_profile_info_avatar img{display:block;width:100%;border-radius:10px}.wx_profile_info_title{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:16px;font-weight:400;text-align:left}";
});