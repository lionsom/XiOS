define("appmsg/search/search_tpl.html.js",[],function(){
return'<span class="appmsg_card_context wx_tap_card appmsg_search_card js_wx_tap_highlight">\n  <!-- 搜索推荐 -->\n  <span class="appmsg_search_hd weui-flex" id="js_appmsg_search_keywords_head" role="link" aria-labelledby="js_appmsg_search_keywords_head" aria-describedby="appmsg_search_keywords_tips appmsg_search_keywords_keywords_list">\n    <img class="appmsg_search_avatar" src="<#==data.avatar#>" alt="">\n    <span class="weui-flex__item" role="option">\n      <span class="appmsg_search_nickname_wrp"><span id="appmsg_search_keywords_nickname" class="appmsg_search_nickname"><#==data.nickname#></span><span id="appmsg_search_keywords_title">推荐搜索</span></span>\n    </span>\n  </span>\n  <span class="appmsg_search_bd">\n    <span class="appmsg_search_keywords_area">\n      <span class="appmsg_search_keywords_hd">\n        <i class="weui-icon-search"></i>\n      </span>\n      <span class="weui-hidden_abs" aria-hidden="true" id="appmsg_search_keywords_tips">关键词列表：</span>\n      <span id="appmsg_search_keywords_keywords_list" aria-hidden="true" class="appmsg_search_keywords_list">\n        <# data.keywords.forEach(function (k, index) { #>\n        <span class="appmsg_search_keywords"><#=k.label#></span>\n        <# }); #>\n      </span>\n    </span>\n  </span>\n</span>\n';
});define("pages/player_tips.js",["biz_common/tmpl.js","pages/audition_tpl.html.js","biz_common/dom/event.js"],function(t){
"use strict";
function i(t){
this.parent=document.body,this.opt=t||{},this.init();
}
var n=t("biz_common/tmpl.js"),e=t("pages/audition_tpl.html.js"),o=t("biz_common/dom/event.js");
return i.prototype.init=function(){
var t=document.createElement("div");
t.innerHTML=n.tmpl(e,this.opt,!1),this.parent.appendChild(t),this.dom=document.getElementById("js_music_dialog");
var i=this;
o.on(i.dom.getElementsByClassName("js_submit")[0],"click",function(){
i.parent.removeChild(t),"function"==typeof i.opt.onClick&&i.opt.onClick();
});
},i;
});define("redpackage/tpl/card_tpl.html.js",[],function(){
return'<#if(!isUpdate){#>\n<section class="js_wap_redpacketcover red_package_cover_wrp" data-coveruri="<#=data.cover_uri#>">\n<#}#>\n    <!--不可操作，这里加className point_event_no-->\n    <!--todo 加载中加className red_package_cover__inner__loading-->\n    <section class="red_package_cover__inner">\n        <section class="red_package_cover__inner__main">\n            <section class="red_package_cover__body">\n                <!--图片没加载处理，这里加className red_package_cover_img_loading-->\n                <span class="red_package_cover_img" style="background-image: url(\'<#=data.receive_image#>\');"></span>\n            </section>\n            <section class="red_package_cover__foot">\n                <#if(data.status * 1===0){#>\n                <span class="red_package_cover__access-link">领取<#=data.name#>红包封面</span>\n                <#}else if(data.status * 1===1){#>\n                <span class="red_package_cover__access-link disabled">已领取红包封面</span>\n                <#}else if(data.status * 1===2){#>\n                <span class="red_package_cover__access-link disabled">红包封面已领取完</span>\n                <#}else{#>\n                <span class="red_package_cover__access-link disabled">红包封面不可领取</span>\n                <#}#>\n            </section>\n        </section>\n        <section class="red_package_cover__extend">\n            <span class="red_package_cover__extend_icon"></span>\n            <span class="red_package_cover__extend_info">微信红包封面</span>\n        </section>\n    </section>\n<#if(!isUpdate){#>\n</section>\n<#}#>';
});define("pages/voice_tpl.html.js",[],function(){
return'<span class="js_audio_frame db pages_reset audio_area <#if(!!albumLink){#>audio_area_tag<#}#>">\n  <#if(show_not_support===true){#>\n  <span class="db">当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放</span>\n  <#}#>\n\n  <span tabindex="0" id="voice_main_<#=voiceid#>_<#=posIndex#>" class="wx_tap_card js_wx_tap_highlight appmsg_card_context db audio_card <# if (!!errMsg) { #> pages_ban_msg_wrp <# } #>" <#if(!musicSupport){#>style="display:none;"<#}#>>\n    <span id="audio_card_bd_<#=voiceid#>_<#=posIndex#>" class="audio_card_bd" <# if (!!errMsg) { #> style="visibility: hidden;"<# } #>>\n      <strong  id="voice_title_<#=voiceid#>_<#=posIndex#>" class="audio_card_title" role="link" aria-labelledby="js_a11y_audio_title_tips_<#=voiceid#>_<#=posIndex#> voice_title_<#=voiceid#>_<#=posIndex#>"><#=title#></strong>\n      <span class="weui-hidden_abs" id="js_a11y_audio_title_tips_<#=voiceid#>_<#=posIndex#>" aria-hidden="true">音频：</span>\n\n      <span class="weui-flex weui-flex_align-center">\n        <span class="weui-flex__item">\n          <span class="audio_card_opr">\n            <span id="voice_seekRange_<#=voiceid#>_<#=posIndex#>" class="audio_card_progress_wrp">\n              <span class="audio_card_progress">\n                <span id="voice_progress_<#=voiceid#>_<#=posIndex#>" style="width:0%" class="audio_card_progress_inner"></span>\n                <span id="voice_buffer_<#=voiceid#>_<#=posIndex#>" class="audio_card_progress_buffer" style="width:0%;"></span>\n                <span id="voice_loading_<#=voiceid#>_<#=posIndex#>" class="audio_card_progress_loading" style="display:none;"></span>\n              </span>\n              <span tabindex="0" role="option" title="按住可调" id="voice_playdot_<#=voiceid#>_<#=posIndex#>" class="audio_card_progress_handle weui-wa-hotarea" style="display:none;left:0%;">\n                <span class="weui-hidden_abs">\n                  <span id="voice_percent_desc_<#=voiceid#>_<#=posIndex#>">进度条</span>\n                  <span id="voice_percent_<#=voiceid#>_<#=posIndex#>"></span>\n                </span>\n              </span>\n            </span>\n            <span role="option" class="audio_card_tips">\n              <em id="voice_playtime_<#=voiceid#>_<#=posIndex#>" class="audio_card_length_current">00:00</em>\n              <span class="weui-hidden_abs">/</span>\n              <em id="voice_duration_<#=voiceid#>_<#=posIndex#>" class="audio_card_length_total"><#=duration_str#></em>\n            </span>\n          </span>\n        </span>\n        <span tabindex="0" role="button" aria-label="播放" id="voice_play_<#=voiceid#>_<#=posIndex#>" class="audio_card_switch"><em id="audio_play_btn" class="weui-wa-hotarea weui-audio-btn"></em></span>\n      </span>\n\n      <span id="audio_card_control_<#=voiceid#>_<#=posIndex#>" class="weui-flex weui-flex_align-center audio_card_playtool" style="display: none;">\n        <button type="button" id="audio_fast_back_<#=voiceid#>_<#=posIndex#>" class="reset_btn audio_card_playbtn js_wx_tap_highlight"><span class="weui-hidden_abs">后退15秒</span></button>\n        <button type="button" id="audio_double_speed_<#=voiceid#>_<#=posIndex#>" class="weui-btn weui-btn_mini audio_card_playbtn_multiple weui-wa-hotarea js_wx_tap_highlight">倍速</button>\n        <button type="button" id="audio_fast_forward_<#=voiceid#>_<#=posIndex#>" class="reset_btn audio_card_playbtn js_wx_tap_highlight"><span class="weui-hidden_abs">快进15秒</span></button>\n      </span>\n    </span>\n\n    <#if(!!albumLink){#>\n      <span class="audio_card_ft" <# if (!!errMsg) { #> style="visibility: hidden;"<# } #>>\n        <span id="voice_album_<#=voiceid#>_<#=posIndex#>" class="audio__tag wx_tap_card" data-link="<#=albumLink#>" data-title="<#=albumTitle#>" data-album="<#=albumid#>" target="_blank">\n          <span role="link" aria-labelledby="js_a11y_voice_album_link_<#=voiceid#>_<#=posIndex#> js_a11y_voice_album_link_title_<#=voiceid#>_<#=posIndex#> js_a11y_voice_album_link_num_<#=voiceid#>_<#=posIndex#>" id="js_a11y_voice_album_link_<#=voiceid#>_<#=posIndex#>" class="audio__tag-title">话题</span>\n          <span class="weui-flex__item" id="js_a11y_voice_album_link_title_<#=voiceid#>_<#=posIndex#>" aria-hidden="true">\n            <span class="audio__tag-name"><span aria-hidden="true">#</span><#=albumTitle#></span>\n          </span>\n          <span class="audio__tag-num" id="js_a11y_voice_album_link_num_<#=voiceid#>_<#=posIndex#>" aria-hidden="true"><#=albumNum#>个</span>\n        </span>\n      </span>\n    <#}#>\n\n    <# if (!!errMsg) { #>\n      <!-- 违规处理提示 -->\n      <!-- 在需要处理的模块加上pages_ban_msg_wrp，然后加一个msg的子元素 -->\n      <span class="pages_ban_msg"><#=errMsg#></span>\n    <# } #>\n  </span>\n</span>\n';
});define("pages/kugoumusic_ctrl.js",["biz_wap/utils/jsmonitor_report.js","biz_wap/utils/ajax.js","pages/musicUrlReport.js"],function(e){
"use strict";
function r(e,r){
for(var t,a=[/^http(s)?:\/\/singerimg\.kugou\.com([\/?].*)*$/i,/^http(s)?:\/\/imge\.kugou\.com([\/?].*)*$/i],o=!1,s=0;t=a[s++];)if(t.test(e.albumurl)){
o=!0;
break;
}
return o||(e.albumurl=""),e.detailUrl="https://m3ws.kugou.com/kgsong/"+e.jumpurlkey+".html?fromweixin=",
e.webUrl=e.detailUrl,e.musicIcon=n.musicIcon,e.media_id=e.musicid,e.type=1*r.scene===0?5:1*r.scene===1?6:9,
e;
}
function t(e,r){
var t=e,a=t.otherid+(t.albumid||""),s=n.cache[a];
return s&&"function"==typeof r.callback?void r.callback(s):void(n.submiting[a]!==!0&&(n.submiting[a]=!0,
o({
jumpurlkey:t.jumpurlkey,
songId:t.songId,
akey:t.otherid,
albumid:t.albumid||"",
onSuc:function(e){
n.submiting[a]=!1,n.cache[a]=e,"function"==typeof r.callback&&r.callback(e);
},
onError:function(){
n.submiting[a]=!1,"function"==typeof r.callback&&r.callback({
canplay:!1,
msg:"系统繁忙，请稍后再试。返回码：-1",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var r=!0,t="";
switch(1*e){
case 0:
r=!0;
break;

case 1:
r=!1,t="该歌曲版权已过期，无法播放。";
break;

case 1002:
r=!1,t="系统错误，请稍后再试。";
break;

case 1001:
r=!1,t="系统错误，请稍后再试。";
break;

default:
r=!1,t="系统错误，请稍后再试。";
}
return t&&(t+="错误码："+e),{
canplay:r,
msg:t
};
}
function o(e){
u.setSum(n.reportId,87,1);
var r=+new Date,t="/mp/getkugousong?params=#params#",o=[{
akey:e.akey,
albumid:e.albumid||""
}],m=encodeURIComponent(JSON.stringify(o));
t=t.replace("#params#",m),c({
url:t,
type:"GET",
dataType:"json",
success:function(t){
var o=+new Date-r;
if(setTimeout(function(){
i.reportRespData({
type:2,
songid:e.songId,
musicid:e.akey,
jumpurlkey:e.jumpurlkey,
responseData:JSON.stringify(t||{}),
kugouParams:m
});
},0),!t||"undefined"==typeof t.errcode){
var u=1;
return s({
type:"error",
time:o,
code:u
}),void("function"==typeof e.onError&&e.onError({
errcode:u
}));
}
var c=0,n="";
0==t.errcode?t.data&&t.data[0]&&t.data[0].url?(c=0,n=t.data[0].url):c=1001:c=1==t.errcode?1:1002,
s({
type:"success",
time:o,
code:c
});
var p=a(c);
e.onSuc({
canplay:p.canplay,
msg:p.msg,
errcode:c,
play_url:n
});
},
error:function(){
var t=+new Date-r,a=2;
s({
type:"error",
time:t,
code:a
}),"function"==typeof e.onError&&e.onError({
errcode:a
});
}
});
}
function s(e){
var r=Math.max(e.time,0);
if(r=Math.min(r,1e4),r>=0&&500>r?u.setSum(n.reportId,98,1):r>=500&&1e3>r?u.setSum(n.reportId,99,1):r>=1e3&&2e3>r?u.setSum(n.reportId,100,1):r>=2e3&&5e3>r?u.setSum(n.reportId,101,1):r>=5e3&&1e4>=r&&u.setSum(n.reportId,102,1),
"error"==e.type){
switch(1*e.code){
case 1:
u.setSum(n.reportId,94,1);
break;

case 2:
u.setSum(n.reportId,91,1);
break;

case 3:
u.setSum(n.reportId,92,1);
break;

case 4:
u.setSum(n.reportId,93,1);
}
u.setSum(n.reportId,88,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
u.setSum(n.reportId,95,1);
break;

case 0:
u.setSum(n.reportId,97,1);
break;

case 1002:
u.setSum(n.reportId,96,1);
break;

case 1001:
u.setSum(n.reportId,103,1);
}
u.setSum(n.reportId,89,1);
}
}
var u=e("biz_wap/utils/jsmonitor_report.js"),c=e("biz_wap/utils/ajax.js"),i=e("pages/musicUrlReport.js"),n={
reportId:"28306",
musicIcon:window.icon_kugou_source||"",
cache:{},
submiting:{}
};
return{
initData:r,
getPlayUrl:t
};
});define("pages/qqmusic_ctrl.js",["biz_wap/utils/jsmonitor_report.js","pages/player_adaptor.js","biz_wap/jsapi/log.js","biz_wap/utils/ajax.js","pages/musicUrlReport.js"],function(e){
"use strict";
function r(e,r){
if(/^http(s)?:\/\//i.test(e.albumurl)){
for(var t,a=[/^http(s)?:\/\/imgcache\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/y\.gtimg\.cn([\/?].*)*$/i],s=!1,i=0;t=a[i++];)if(t.test(e.albumurl)){
s=!0;
break;
}
s||(e.albumurl="");
}else{
var o=e.albumurl.split("/");
try{
o=o[o.length-1],o=o.split(".")[0];
}catch(n){
o="";
}
e.albumurl=o?m.imgroot2.replace("#mid#",o):m.imgroot+e.albumurl;
}
return e.albumurl=e.albumurl.replace("mid_album_68","mid_album_90").replace("68x68","90x90"),
e.musicIcon=m.musicIcon,e.type=1*r.scene===0?0:1*r.scene===1?1:8,c.inQMClient?(e.allowPause=!0,
e.detailUrl="",e.pauseCss="qqmusic_playing_pause",e.webUrl=e.detailUrl):(e.allowPause=!1,
e.pauseCss="",e.detailUrl=["http://i.y.qq.com/v8/playsong.html?referFrom=music.qq.com&songid=",e.musicid,"&songmid=",e.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join(""),
e.webUrl=e.detailUrl),e;
}
function t(e,r){
var t=e,a=m.cache[t.songId];
return c.inQMClient?void r.callback({
canplay:!0,
play_url:"https://www.qq.com"
}):a&&"function"==typeof r.callback&&(a.canplay||!a.canplay&&!a.retry)?(a.in_cache=!0,
void r.callback(a)):void(m.submiting[t.songId]!==!0&&(m.submiting[t.songId]=!0,a&&o.setSum(m.reportId,122,1),
s({
id:t.songId,
mid:t.mid,
onSuc:function(e){
m.submiting[t.songId]=!1,m.cache[t.songId]&&!m.cache[t.songId].canplay&&e.canplay&&o.setSum(m.reportId,123,1),
m.cache[t.songId]=e,"function"==typeof r.callback&&r.callback(e);
},
onError:function(){
m.submiting[t.songId]=!1,"function"==typeof r.callback&&r.callback({
canplay:!1,
msg:"系统繁忙，请稍后再试。",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var r=!0,t=!1,a="";
switch(1*e){
case 0:
r=!0;
break;

case 1:
r=!1,a="因版权限制，音乐无法播放。";
break;

case 2:
r=!1,a="因版权限制，音乐无法播放。";
break;

case 3:
r=!1,a="因版权限制，音乐无法播放。";
break;

case 4:
r=!1,a="当前区域因版权限制，音乐无法播放。";
break;

case 5:
r=!1,t=!0,a="播放失败，请稍后再试。";
break;

case 6:
r=!1,t=!0,a="系统错误，请稍后再试。";
break;

case 7:
r=!1,t=!0,a="系统错误，请稍后再试。";
break;

case 8:
r=!0,a="该音乐为付费音乐，当前为你播放试听片段。";
break;

default:
r=!1,a="系统错误，请稍后再试。";
}
return{
canplay:r,
msg:a,
retry:t
};
}
function s(e){
o.setSum(m.reportId,18,1);
var r=+new Date,t="//mp.weixin.qq.com/mp/qqmusic?action=get_song_info&song_mid=#mid#";
t=t.replace("#mid#",e.mid),p({
url:t,
type:"GET",
dataType:"json",
success:function(t){
var s=+new Date-r;
if(200==t.http_code){
setTimeout(function(){
u.reportRespData({
type:1,
songid:e.id,
musicid:e.mid,
responseData:t.resp_data||""
});
},0);
var o={};
try{
o=JSON.parse(t.resp_data);
}catch(c){
var p=1;
return i({
type:"error",
time:s,
code:p
}),"function"==typeof e.onError&&e.onError({
errcode:p
}),void n.info("qqmusic_checkCopyright_parsefail mid:"+e.mid+", repsponeData:"+t.resp_data);
}
if("undefined"==typeof o.ret||0!=o.ret||0!=o.sub_ret||0==o.songlist.length){
var p=1;
return i({
type:"error",
time:s,
code:p
}),"function"==typeof e.onError&&e.onError({
errcode:p
}),void n.info("qqmusic_checkCopyright_dataerror mid:"+e.mid+", repsponeData:"+t.resp_data);
}
var m,l=o.songlist[0],d=l.song_play_url,b=l.song_play_time||0;
if(l.playable)m=d?0:6;else if(l.try_playable)l.try_file_size>0&&l.try_30s_url?(m=8,
d=l.try_30s_url,b=30):m=7;else switch(1*l.unplayable_code){
case 1:
m=1;
break;

case 2:
m=2;
break;

case 3:
m=3;
break;

case 4:
m=4;
break;

case 5:
m=5;
break;

default:
m=5;
}
i({
type:"success",
time:s,
code:m
});
var y=a(1*m);
e.onSuc({
canplay:y.canplay,
retry:y.retry,
msg:y.msg,
status:m,
play_url:d||"",
duration:b
}),y.canplay||n.info("qqmusic_checkCopyright_cannotplay mid:"+e.mid+", repsponeData:"+t.resp_data);
}else{
var p=4;
switch(t.http_code){
case 200:
break;

case 400:
p=2;
break;

case 500:
p=3;
break;

default:
p=4;
}
i({
type:"error",
time:s,
code:p
}),"function"==typeof e.onError&&e.onError({
errcode:p
});
}
},
error:function(){
"function"==typeof e.onError&&e.onError({
errcode:4
});
}
});
}
function i(e){
var r=Math.max(e.time,0);
if(r=Math.min(r,6e4),e.time>=0&&e.time<200?o.setSum(m.reportId,24,1):e.time>=200&&e.time<500?o.setSum(m.reportId,25,1):e.time>=500&&e.time<1e3?o.setSum(m.reportId,26,1):e.time>=1e3&&e.time<2e3?o.setSum(m.reportId,27,1):e.time>=2e3&&e.time<1e4?o.setSum(m.reportId,28,1):e.time>=1e4&&o.setSum(m.reportId,29,1),
o.setAvg(m.reportId,23,r),"error"==e.type){
switch(1*e.code){
case 1:
o.setSum(m.reportId,9,1);
break;

case 2:
o.setSum(m.reportId,10,1);
break;

case 3:
o.setSum(m.reportId,11,1);
break;

case 4:
o.setSum(m.reportId,12,1);
}
o.setSum(m.reportId,19,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
o.setSum(m.reportId,8,1);
break;

case 0:
o.setSum(m.reportId,17,1);
break;

case 2:
o.setSum(m.reportId,13,1);
break;

case 3:
o.setSum(m.reportId,14,1);
break;

case 4:
o.setSum(m.reportId,15,1);
break;

case 5:
o.setSum(m.reportId,16,1);
break;

case 6:
o.setSum(m.reportId,47,1);
break;

case 7:
o.setSum(m.reportId,120,1);
break;

case 8:
o.setSum(m.reportId,121,1);
}
o.setSum(m.reportId,20,1);
}
}
var o=e("biz_wap/utils/jsmonitor_report.js"),c=e("pages/player_adaptor.js"),n=e("biz_wap/jsapi/log.js"),p=e("biz_wap/utils/ajax.js"),u=e("pages/musicUrlReport.js"),m={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_90",
imgroot2:"https://y.gtimg.cn/music/photo_new/T002R90x90M000#mid#.jpg",
reportId:"28306",
musicIcon:window.icon_qqmusic_source||"",
cache:{},
submiting:{}
};
return{
initData:r,
getPlayUrl:t
};
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var a=arguments[t];
for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);
}
return e;
};
define("pages/voice_component.js",["biz_wap/zepto/zepto.js","biz_wap/ui/weui.js","common/tap_highlight.js","biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","pages/player_adaptor.js","biz_common/dom/class.js","pages/report.js","pages/music_report_conf.js","pages/player_tips.js","biz_wap/jsapi/leaveReport.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/openUrl.js","pages/version4video.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js","album/utils/report.js","common/comm_report.js"],function(e){
"use strict";
function t(){
T.hasInit||(i(),n(),p(),T.hasInit=!0);
}
function a(e){
t(),this._o={
protocal:"",
wxIndex:0,
type:0,
comment_id:"",
src:"",
jsapi2Src:"",
mid:"",
songId:"",
otherid:"",
albumid:"",
jumpurlkey:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
appPlay:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:[location.protocol,"//mp.weixin.qq.com/s?referFrom=#referFrom#&songid=#songId#&__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
musicbar_url:"",
playingCss:"",
pauseCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:"",
fileSize:0,
playtimeDom:"",
loadingDom:"",
bufferDom:"",
playdotDom:"",
playpercent:"",
seekRange:"",
seekContainer:"",
isTingOpen:-1
},this._init(e),T.allComponent.push(this);
}
function o(e){
if(!e.isReport){
var t=(e.getAttribute("data-link"),$(e).parent().parent().siblings()),a=$(e).data("album"),o=t.attr("voice_encode_fileid"),r=$(e).data("title");
e.isReport=1,B.cardReport({
albumId:a,
albumType:7,
eventType:1,
audioid:o,
title:r
});
}
}
function r(e,t,a,o,r){
T.num++,t.musicSupport=T.musicSupport,t.show_not_support=!1,T.musicSupport||1!=T.num||(t.show_not_support=!0);
var n=function(){
var n=document.createElement("div");
if(n.innerHTML=f.tmpl(e,t,!1),o===!0)a.appendChild(n.children[0]);else{
var i=a.parentNode;
if(!i)return;
i.lastChild===a?i.appendChild(n.children[0]):i.insertBefore(n.children[0],a.nextSibling);
}
"function"==typeof r&&r();
};
t.errMsg="",void 0!==t.transState&&void 0!==t.voiceVerifyState?(0===t.transState?t.errMsg="音频转码中":2===t.transState?t.errMsg="音频转码失败":1===t.voiceVerifyState?t.errMsg="音频审核中":2===t.voiceVerifyState?t.errMsg="音频审核失败":4===t.voiceVerifyState&&(t.errMsg="此音频因违规无法查看"),
n()):"v"===t.voiceTag?S({
url:"/voice/getvoicestatus?mediaid="+t.voiceid,
dataType:"json",
success:function(e){
e&&e.base_resp&&0===e.base_resp.ret&&4===e.voice_verify_state&&(t.errMsg="此音频因违规无法查看"),
n();
},
error:function(e){
console.log(e),t.errMsg="系统繁忙，请稍后重试",n();
}
}):n();
}
function n(){
T.hasInit||v.inQMClient&&s("QMClient_pv",1);
}
function i(){
window.reportMid=[],window.reportVoiceid=[];
for(var e in D)if(D.hasOwnProperty(e)){
var t=D[e],a=t.split("_");
T.reportData2[e]={
id:a[0],
key:a[1],
count:0
};
}
}
function s(e,t){
T.reportData2[e]&&(t=t||1,T.reportData2[e].count+=t,T.debug&&console.log("addpv:"+e+" count:"+T.reportData2[e].count));
}
function p(){
x.gtVersion("7.0.6")||m.on(window,"unload",function(){
for(var e=l(),t=JSON.parse(e.report_list),a=0;a<t.length;a++)S({
type:"POST",
url:"/mp/musicreport?#wechat_redirect",
timeout:2e4,
async:!0,
data:t[a]
});
}),T.repotIntervalId&&clearInterval(T.repotIntervalId),T.repotIntervalId=setInterval(function(){
c();
},3e4);
}
function l(){
h.triggerUnloadPlaying(),c();
for(var e,t={},a=0,o=T.allComponent.length;o>a;a++){
var r=T.allComponent[a];
r.player&&"function"==typeof r.player.getPlayTotalTime&&(T.reportData[r._o.type].play_last_time[r._g.posIndex]=parseInt(1e3*r.player.getPlayTotalTime())),
"number"!=typeof r._status||1!==r._status&&4!==r._status||(e=r._o.songId);
}
e&&(t.current_musicid=e);
var n=[];
for(var a in T.reportData)n=n.concat(b.musicreport({
data:T.reportData[a]
}));
t.report_list=JSON.stringify(n),i();
for(var a=0,o=T.allComponent.length;o>a;a++){
var r=T.allComponent[a];
r&&"function"==typeof r._initReportData&&r._initReportData(),r.player&&"function"==typeof r.player.resetPlayTotalTime&&r.player.resetPlayTotalTime();
}
return t;
}
function c(){
var e=[];
for(var t in T.reportData2)if(T.reportData2.hasOwnProperty(t)){
var a=T.reportData2[t];
a.count>0&&(e.push(a.id+"_"+a.key+"_"+a.count),a.count=0);
}
e.length>0&&S({
type:"POST",
url:"/mp/jsmonitor?#wechat_redirect",
timeout:2e4,
async:!1,
data:{
idkey:e.join(";"),
t:Math.random()
}
});
}
function d(e){
return new a(e);
}
function u(e){
if(isNaN(e))return"00:00";
e=Math.floor(e);
var t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),o=e-3600*t-60*a;
return 0!=t?(10>t&&(t="0"+t),t+=":"):t="",10>a&&(a="0"+a),10>o&&(o="0"+o),t+a+":"+o;
}
function _(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function y(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
e("biz_wap/zepto/zepto.js"),e("biz_wap/ui/weui.js");
var g=e("common/tap_highlight.js"),m=e("biz_common/dom/event.js"),f=e("biz_common/tmpl.js"),h=e("pages/music_player.js"),v=e("pages/player_adaptor.js"),w=e("biz_common/dom/class.js"),b=e("pages/report.js"),D=e("pages/music_report_conf.js"),k=e("pages/player_tips.js"),I=e("biz_wap/jsapi/leaveReport.js"),x=e("biz_wap/utils/mmversion.js"),S=e("biz_wap/utils/ajax.js"),j=e("biz_wap/jsapi/core.js"),C=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,P=e("pages/version4video.js"),T={
allComponent:[],
hasInit:!1,
reportId:"28306",
musicSupport:h.getSurportType(),
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
reportData:{},
posIndex:{},
num:0,
reportData2:{},
adapter:{
m:e("pages/qqmusic_ctrl.js"),
k:e("pages/kugoumusic_ctrl.js")
},
needReport11982:!1,
repotIntervalId:null,
inWechat:!P.device.inWechat||P.device.inWindowWechat||P.device.inMacWechat?!1:!0,
inPC:x.isWindows||x.isMac&&!x.isIOS,
fastForwardSec:15,
fastBackSec:15,
pcFastForwardBackSec:5,
pcCtrlVolGap:.05
},B=e("album/utils/report.js"),A=e("common/comm_report.js"),M=function(){
var e=null,t=null,a="";
return function(o){
null===e?(e=document.createElement("div"),e.innerHTML='<div role="alert">\n    <div class="weui-mask_transparent"></div>\n    <div class="weui-toast">\n        <i class="weui-icon-warn weui-icon_toast"></i>\n        <p class="weui-toast__content" style="font-size: 12px;">'+o+"</p>\n    </div>\n  </div>"):o!==a&&(e.querySelector(".weui-toast__content").innerHTML=o),
a=o,null!==t&&(clearTimeout(t),t=null),t=setTimeout(function(){
document.body.removeChild(e),t=null;
},3e3),document.body.appendChild(e);
};
}(),R=null;
return"function"==typeof IntersectionObserver&&(R=new IntersectionObserver(function(e){
e.forEach(function(e){
e.isIntersecting&&o(e.target);
});
})),a.prototype._init=function(e){
var t=this;
this._extend(e),this._g={
posIndex:void 0,
tag:"",
canDragBar:!1,
barDraging:!1,
canGoDetail:!0
},5==this._o.type||6==this._o.type||9==this._o.type?this._g.tag="k":this._o.type>=2&&this._o.type<=4?this._g.tag="v":7==this._o.type?this._g.tag="a":(0==this._o.type||1==this._o.type||8==this._o.type)&&(this._g.tag="m"),
this._initData(),this._initQQmusicLyric(),this._initReportData(),T.inWechat?j.invoke("getTingAudioState",{},function(e){
/:ok$/.test(e.err_msg)?t._o.isTingOpen=1:("undefined"!=typeof e.ting_enabled&&1*e.ting_enabled===0||-1!==e.err_msg.indexOf("function_not_exist"))&&(t._o.isTingOpen=0),
t._initPlayer();
}):this._initPlayer();
},a.prototype._initData=function(){},a.prototype._initQQmusicLyric=function(){
var e=this._o,t=this._g;
e.webUrl="m"==t.tag?e.webUrl.replace("#songId#",e.songId||"").replace("#referFrom#","music.qq.com"):e.webUrl.replace("#songId#","").replace("#referFrom#","");
},a.prototype._initReportData=function(){
var e=this._o,t=this._g;
"v"==t.tag?window.reportVoiceid.push(e.songId):"m"==t.tag&&window.reportMid.push(e.songId),
"undefined"==typeof T.reportData[e.type]&&(T.reportData[e.type]=b.getMusicReportData(e),
T.posIndex[e.type]=0),"undefined"==typeof t.posIndex&&(t.posIndex=T.posIndex[e.type]++);
var a=T.reportData[e.type];
a.musicid[t.posIndex]=e.songId,a.commentid[t.posIndex]=e.comment_id,a.hasended[t.posIndex]=0,
a.mtitle[t.posIndex]=e.title,a.detail_click[t.posIndex]=0,a.duration2[t.posIndex]=parseInt(1e3*e.duration),
a.errorcode[t.posIndex]=0,a.play_duration2[t.posIndex]=0,a.seek[t.posIndex]=0,a.seek_position[t.posIndex]=[],
a.play_last_time[t.posIndex]=0,a.local_time[t.posIndex]=0,a.seek_loaded[t.posIndex]=[];
},a.prototype._initPlayer=function(){
if(T.musicSupport){
var e=this,t=this._o,a=this._g.tag;
t.onStatusChange=this._statusChangeCallBack(),t.onTimeupdate=this._timeupdateCallBack(),
t.onError=this._errorCallBack(),t.onUpdateSeekRange=this._onUpdateSeekRange(),t.onAndroidForceH5=function(){
s("force_h5",1);
},t.onH5Begin2Play=function(){
s(a+"_pv",1),s(a+"_h5_pv",1);
},t.onH5Error=function(t,o){
s(a+"_h5_err_total",1),s(a+"_h5_err_"+o.code,1),e._reportH5Error({
type:1,
code:o.code
});
},t.onJsapi1Begin2Play=function(){
s(a+"_pv",1),s(a+"_wx_pv",1),s(a+"_wx_pv_1",1);
},t.onJsapi2Begin2Play=function(e,o){
s(a+"_pv",1),s(a+"_wx_pv",1),s(a+"_wx_pv_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src&&s("aac_pv",1),
t.musicPlayerOnJsapi2Begin2Play&&t.musicPlayerOnJsapi2Begin2Play(o);
},t.onJsapi2PlaySuccess=function(e,a){
t.musicPlayerOnJsapi2PlaySuccess&&t.musicPlayerOnJsapi2PlaySuccess(a);
},t.onJsapi2Begin2PlayErr=function(){
if(s(a+"_wx_err_1",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_start_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
h.isAndroid?(b.logReport("",e.replace("#type#","android"),"ajax"),s("android_aac_err_1",1)):(b.logReport("",e.replace("#type#","ios"),"ajax"),
s("ios_aac_err_1",1));
}
},t.onJsapi2PlayingErr=function(){
if(s(a+"_wx_err_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_ing_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
h.isAndroid?(b.logReport("",e.replace("#type#","android"),"ajax"),s("android_aac_err_2",1)):(b.logReport("",e.replace("#type#","ios"),"ajax"),
s("ios_aac_err_2",1));
}
},t.onJsapi2PlayingStop=function(){
var e=a+"_stoped_";
e+=h.isAndroid?"android":"ios",s(e,1);
},t.onJsapi2PlayingPause=function(){
var e=a+"_paused_";
e+=h.isAndroid?"android":"ios",s(e,1);
},t.onSeekErr=function(){
if(s(a+"_seek_err",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_seek_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
h.isAndroid?(b.logReport("",e.replace("#type#","android"),"ajax"),s("android_aac_err_3",1)):(b.logReport("",e.replace("#type#","ios"),"ajax"),
s("ios_aac_err_3",1));
}
},t.onUnloadPlaying=function(){
s(a+"_unload_wx_pv",1);
},t.onQMClientPlay=function(){
s("QMClient_play",1);
},t.onSeekNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=T.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=1);
}
},t.onSeekNotNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=T.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=0);
}
},v.create(this._o,{
callback:function(t){
e.player=t,e.afterCreatePlayer();
}
});
}
},a.prototype.afterCreatePlayer=function(){
this._playEvent();
},a.prototype.isInSeekrang=function(e){
var t=this._o.seekRange;
if(!t)return!1;
if(t===e)return!0;
for(var a=t.getElementsByTagName("*"),o=0,r=a.length;r>o;o++)if(a[o]===e)return!0;
return!1;
},a.prototype._playEvent=function(){
var e=this,t=this._o,a=this._g,o=function(e){
if("[object String]"!==Object.prototype.toString.call(e))return!1;
var t=["audio_fast_back","audio_double_speed","audio_fast_forward","audio_play_btn"];
return t.some(function(t){
return-1!==e.indexOf(t);
});
};
if(t.detailUrl&&t.detailArea&&m.on(t.detailArea,"click",function(r){
if(!o(r.target.getAttribute("id"))&&!a.barDraging&&a.canGoDetail){
var n=r.target||r.srcElement;
if(!n||!e.isInSeekrang(n))if("v"==a.tag){
if(window.is_temp_url)return;
if(t.detailArea.classList.contains("pages_ban_msg_wrp"))return;
T.reportData[t.type].detail_click[a.posIndex]=1,window.__second_open__?C(t.detailUrl):window.location.href=t.detailUrl;
}else("m"==a.tag||"k"==a.tag)&&T.adapter[a.tag].getPlayUrl(t,{
callback:function(e){
e.canplay?(T.reportData[t.type].detail_click[a.posIndex]=1,window.__second_open__?C(t.detailUrl):window.location.href=t.detailUrl):e.msg&&new k({
msg:e.msg
});
}
});
}
}),t.albumDom&&(R&&R.observe(t.albumDom),m.on(t.albumDom,"click",function(){
g.highlightEle(t.albumDom);
var e=t.albumDom.getAttribute("data-link").replace("#wechat_redirect","&scene=173#wechat_redirect"),a=$(t.albumDom).parent().parent().siblings(),o=$(t.albumDom).data("album"),r=a.attr("voice_encode_fileid"),n=$(t.albumDom).data("title");
return B.cardReport({
albumId:o,
albumType:7,
eventType:2,
audioid:r,
title:n
}),C(e),!1;
},!0)),T.musicSupport){
var r=0,n=4,i=5;
switch(1*t.type){
case 0:
r=1;
break;

case 1:
r=13;
break;

case 8:
r=14;
break;

case 2:
r=3;
break;

case 3:
r=6;
break;

case 4:
r=7;
break;

case 5:
r=10;
break;

case 6:
r=15;
break;

case 7:
r=11;
break;

case 9:
r=12;
}
var s="";
s=t.allowPause?t.pauseCss||t.playingCss:t.playingCss,m.on(t.playArea,"click",function(){
return console.log("click playArea",w.hasClass(t.playCssDom,s)),w.hasClass(t.playCssDom,s)?(t.allowPause?e.player.pause():e.player.stop(),
b.report({
type:r,
comment_id:t.comment_id,
voiceid:t.songId,
action:i
})):"v"==a.tag||"a"==a.tag?e._playMusic(r,n):T.adapter[a.tag].getPlayUrl(t,{
callback:function(o){
o.canplay&&o.play_url?(o.duration&&(t.duration=o.duration,e.player.setDuration(t.duration),
T.reportData[t.type].duration2[a.posIndex]=parseInt(1e3*t.duration)),e.player.setSrc(o.play_url),
8!=o.status||o.in_cache?e._playMusic(r,n):new k({
msg:"该音乐为付费音乐，当前为你播放试听片段",
onClick:function(){
e._playMusic(r,n);
}
})):o.msg&&new k({
msg:o.msg
});
}
}),!1;
}),e._dragEvent(),e._ctrlAreaEvt(),e.a11y4PC();
}
},a.prototype.getSeekRangeOffsetLeft=function(){
var e=0,t=this._o.seekRange,a=!1,o=window.__zoom||1;
for(1!=o&&(a=!0);t&&t!=document.body;)e+=a?t.offsetLeft*o:t.offsetLeft,"page-content"==t.id&&(a=!1),
t=t.offsetParent;
return e;
},a.prototype._dragEvent=function(){
var e=this,t=this._o,a=this._g,o=t.seekRange;
if(o){
var r=e.player.getDuration();
a.seekData={
zoom:window.__zoom||1,
duration:r,
startTime:0,
dragTime:0,
downX:0,
moveX:0
},m.on(o,"mousedown",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation());
}),m.on(t.seekContainer,"mousemove",function(t){
a.canDragBar&&a.barDraging&&(e._pointerMoveHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation());
}),m.on(document.body,"mouseup",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation(),!1):void 0;
}),m.on(o,"touchstart",function(o){
a.canDragBar&&(e._pointerDownHandler({
x:o.changedTouches[0].clientX
}),t.playpercentDesc&&t.playpercentDesc.setAttribute("aria-hidden","true"),t.playdotDom&&t.playdotDom.setAttribute("aria-live","assertive"),
o.preventDefault(),o.stopPropagation());
}),m.on(o,"touchmove",function(t){
a.canDragBar&&a.barDraging&&(e._pointerMoveHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),t.stopPropagation());
}),m.on(o,"touchend",function(o){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:o.changedTouches[0].clientX
}),t.playdotDom&&t.playdotDom.removeAttribute("aria-live"),setTimeout(function(){
t.playpercentDesc&&t.playpercentDesc.removeAttribute("aria-hidden");
},100),o.preventDefault(),o.stopPropagation(),!1):void 0;
});
}
},a.prototype._ctrlAreaEvt=function(){
var e=this,t=this._o;
t.fastBackBtn&&m.on(t.fastBackBtn,"click",function(){
var t=e.player.getCurTime(),a=Math.max(+t-T.fastBackSec,0);
e.player.seek(a),e.report11899({
Action:33
});
}),t.fastForwardBtn&&m.on(t.fastForwardBtn,"click",function(){
var t=e.player.getCurTime(),a=e.player.getDuration(),o=Math.min(+t+T.fastForwardSec,+a);
e.player.seek(o),e.report11899({
Action:32
});
}),t.doubleSpeedBtn&&m.on(t.doubleSpeedBtn,"click",function(){
var a=h.getPlaybackRate();
e.player.doubleSpeed({
succCallback:function(){
var t=h.getPlaybackRate();
e.report11899({
Action:21,
FromPlaybackRate:a+"",
ToPlaybackRate:t+""
});
},
pcCallback:function(){
var e=h.getPlaybackRate();
t.doubleSpeedBtn.innerHTML=1===e?"倍速":e+"倍";
}
});
});
},a.prototype._pointerDownHandler=function(e){
var t=this._g;
t.barDraging=!0,t.canGoDetail=!1,t.seekData.downX=e.x,t.seekData.startTime=this.player.getCurTime();
},a.prototype._pointerMoveHandler=function(e){
var t=this._g,a=t.seekData;
a.moveX=e.x;
var o=this.getSeekRangeOffsetLeft(),r=(a.moveX-o)/a.zoom/this._o.seekRange.offsetWidth;
r=Math.min(r,1),r=Math.max(r,0),a.dragTime=r*a.duration,a.dragTime!=a.startTime&&this._updateProgressBar(a.dragTime);
},a.prototype._pointerUpHandler=function(e){
var t=this._g,a=t.seekData;
a.dragTime||this._pointerMoveHandler({
x:e.x
}),t.barDraging=!1,this.player.seek(a.dragTime),T.reportData[this._o.type].seek[t.posIndex]=1,
T.reportData[this._o.type].seek_position[t.posIndex].push(parseInt(1e3*a.startTime)+","+parseInt(1e3*a.dragTime));
var o=T.reportData[this._o.type].seek_position[t.posIndex].length;
T.reportData[this._o.type].seek_loaded[t.posIndex][o-1]=0,t.seekData.startTime=0,
t.seekData.dragTime=0,t.seekData.downX=0,t.seekData.moveX=0,setTimeout(function(){
t.canGoDetail=!0;
},1e3);
},a.prototype._playMusic=function(e,t){
var a=this,o=this._o,r=this._g,n=function(){
a.player.play(),T.reportData[o.type].hasended[r.posIndex]=1,0==T.reportData[o.type].local_time[r.posIndex]&&(T.reportData[o.type].local_time[r.posIndex]=parseInt(+new Date/1e3)),
b.report({
type:e,
comment_id:o.comment_id,
voiceid:o.songId,
action:t
}),x.gtVersion("7.0.6")&&!T.needReport11982&&(T.needReport11982=!0,I.addSpecificReport("music_data",l),
console.log("music play leave report added"));
};
"v"===r.tag?S({
url:"/voice/getvoicestatus?mediaid="+o.songId,
dataType:"json",
success:function(e){
e&&e.base_resp&&0===e.base_resp.ret?4===e.voice_verify_state?M("因违反相关法律法规，音频不可播放"):n():window.weui.alert("系统繁忙，请稍后重试");
},
error:function(e){
console.log(e),window.weui.alert("系统繁忙，请稍后重试");
}
}):n();
},a.prototype._extend=function(e){
for(var t in e)this._o[t]=e[t];
},a.prototype._onUpdateSeekRange=function(){
var e=this,t=e._o,a=e._g;
return function(e){
this.surportSeekRange()&&t.bufferDom&&t.playdotDom?(a.canDragBar=!0,t.playdotDom.style.display="block",
t.bufferDom.style.width=1*e+"%"):(a.canDragBar=!1,t.playdotDom&&(t.playdotDom.style.display="none"));
};
},a.prototype._statusChangeCallBack=function(){
var e=this;
return function(t,a){
e._status=a,e._updatePlayerCss(this,a),e._o.musicPlayerStatusChange&&e._o.musicPlayerStatusChange(a);
};
},a.prototype._timeupdateCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
e._updateProgress(r),0!=r&&(T.reportData[t.type].play_duration2[a.posIndex]=parseInt(1e3*r)),
e._o.timeupdateCallBack&&e._o.timeupdateCallBack(r);
var n=h.getPlaybackRate();
t.doubleSpeedBtn&&(t.doubleSpeedBtn.innerHTML=1===n?"倍速":n+"倍");
};
},a.prototype._errorCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
T.reportData[t.type].errorcode[a.posIndex]=r.code,e._updatePlayerCss(this,3);
};
},a.prototype._reportH5Error=function(e){
if("mp.weixin.qq.com"==location.host&&1==e.type||T.debug){
var t=["code:",e.code,";type:",this._o.type,";url:",window.location.href];
this.player&&t.push(";src:"+this.player.getSrc());
var a=new Image;
a.src=["https://badjs.weixinbridge.com/badjs?level=4&id=112&msg=",encodeURIComponent(t.join("")),"&uin=",window.uin||"","&from=",this._o.type].join("");
}
},a.prototype._updatePlayerCss=function(e,t){
!!T.debug&&console.log("status:"+t);
{
var a=this,o=a._o,r=o.playCssDom;
o.progress;
}
if(2===t)w.removeClass(r,o.playingCss),o.pauseCss&&w.removeClass(r,o.pauseCss),o.playdotDom&&(e.surportSeekRange()?(o.playdotDom.style.display="block",
this._g.canDragBar=!0):(o.playdotDom.style.display="none",this._g.canDragBar=!1)),
o.playArea&&o.playArea.setAttribute("aria-label","播放");else if(3===t)o.ctrlArea&&(o.ctrlArea.style.display="none"),
w.removeClass(r,o.playingCss),o.pauseCss&&w.removeClass(r,o.pauseCss),o.playdotDom&&(o.playdotDom.style.display="none",
this._g.canDragBar=!1),this._updateProgress(0),o.playArea&&o.playArea.setAttribute("aria-label","播放");else if(1===t||4===t){
var n=h.getPlaybackRate();
o.doubleSpeedBtn&&(o.doubleSpeedBtn.innerHTML=1===n?"倍速":n+"倍"),T.allComponent.forEach(function(e){
e===a?(o.ctrlArea&&(o.ctrlArea.style.display=""),o.playArea&&o.playArea.setAttribute("aria-label","暂停")):(e._o.ctrlArea&&(e._o.ctrlArea.style.display="none"),
e._o.playArea&&e._o.playArea.setAttribute("aria-label","播放"));
}),o.allowPause?w.addClass(r,o.pauseCss||o.playingCss):w.addClass(r,o.playingCss),
o.playdotDom&&(e.surportSeekRange()?(o.playdotDom.style.display="block",this._g.canDragBar=!0):(o.playdotDom.style.display="none",
this._g.canDragBar=!1));
}
o.loadingDom&&(o.loadingDom.style.display=4==t?"block":"none");
},a.prototype._updateProgress=function(e){
this._g.barDraging||this._updateProgressBar(e);
},a.prototype._updateProgressBar=function(e){
var t=this._o,a=this.player,o=a.getDuration();
if(o){
var r=this._countProgress(o,e);
t.progress&&(t.progress.style.width=r),t.playtimeDom&&e>=0&&(t.playtimeDom.innerHTML=u(e)),
t.playdotDom&&t.playpercent&&(t.playdotDom.style.left=r,t.playpercent.innerHTML=r);
}
},a.prototype._countProgress=function(e,t){
return Math.round(Math.min(t/e*100,100))+"%";
},a.prototype.destory=function(){
this.player&&this.player.destory();
},a.prototype.setOption=function(e){
e.duration&&(this._g.seekData.duration=e.duration),this._extend(e);
},a.prototype.setMusicPlayerOption=function(e){
e.duration&&this._g&&this._g.seekData&&(this._g.seekData.duration=e.duration),this.player&&this.player.setOption(e);
},a.prototype.getBackgroundAudioState=function(e){
return this.player.getBackgroundAudioState(e);
},a.prototype.report11899=function(e){
var t=this._o,a=2===t.type?3:4===t.type?6:0,o=window.withoutIframe?window:window.parent.window;
"[object Object]"!==Object.prototype.toString.call(e)&&(e={}),A.report(11899,_extends({},{
Type:a,
BizUin:window.biz||"",
Mid:window.parseInt(window.mid,10)||0,
Idx:window.parseInt(window.idx,10)||0,
VoiceId:t.songId||"",
scene:1*o.scene
},e));
},a.prototype.a11y4PC=function(){
if(T.inPC){
var e=this,t=e._o;
t.playdotDom&&t.playdotDom.setAttribute("title",x.isMac?"按住option + 左右方向键可调":"按alt + 左右方向键可调"),
!T.inWechat&&t.playArea&&t.playArea.setAttribute("title",x.isMac?"按住option + 上下方向键可调音量":"按alt + 上下方向键可调音量"),
!T.inWechat&&t.playCssDom&&m.on(t.playCssDom,"keydown",function(t){
t.preventDefault();
var a=t.keyCode||t.which,o=e.player.getCurVol();
switch(a){
case 38:
e.player._h5SetVolume(o+T.pcCtrlVolGap);
break;

case 40:
e.player._h5SetVolume(o-T.pcCtrlVolGap);
}
}),t.playCssDom&&m.on(t.playCssDom,"keyup",function(t){
t.preventDefault();
var a=t.keyCode||t.which,o=e.player.getCurTime();
switch(a){
case 13:
1===e.player.getPlayStatus()?e.player.pause():e.player.play();
break;

case 37:
e.player.seek(o-T.pcFastForwardBackSec);
break;

case 39:
e.player.seek(o+T.pcFastForwardBackSec);
}
});
}
},{
init:d,
renderPlayer:r,
formatTime:u,
decodeStr:_,
encodeStr:y
};
});define("pages/qqmusic_tpl.html.js",[],function(){
return'<span id="qqmusic_main_<#=musicid#>_<#=posIndex#>" class="js_wap_qqmusic db pages_reset music_area <#if(!musicSupport){#> unsupport<#}#>">\n    <span class="tc tips_global unsupport_tips" <#if(show_not_support!==true){#>style="display:none;"<#}#>>\n    当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放    </span>\n    <span class="db music_card appmsg_card_context wx_tap_card js_wx_tap_highlight">\n            <a role="none" id="qqmusic_home_<#=musicid#>_<#=posIndex#>" class="music_card_bd">\n                <span role="link" aria-labelledby="music_title_tips_<#=musicid#>_<#=posIndex#> music_link_<#=musicid#>_<#=posIndex#> js_a11y_comma music_singer_<#=musicid#>_<#=posIndex#> js_a11y_comma music_source_<#=musicid#>_<#=posIndex#>" id="music_link_<#=musicid#>_<#=posIndex#>" class="music_card_title"><#=music_name#></span>\n                <span aria-hidden="true" id="music_title_tips_<#=musicid#>_<#=posIndex#>" class="weui-hidden_abs">音乐：</span>\n                <span aria-hidden="true" class="music_card_desc" id="music_singer_<#=musicid#>_<#=posIndex#>"><#=singer#></span>\n                <span class="music_card_source <#if(musictype==2){#>music_card_source_kugou<#}#>">\n                  <img aria-hidden="true" id="music_source_<#=musicid#>_<#=posIndex#>" src="<#=musicIcon#>" alt="<#if(musictype==2){#>来自酷狗音乐<#}else{#>来自QQ音乐<#}#>"></span>\n            </a>\n            <span role="button" aria-label="播放" id="qqmusic_play_<#=musicid#>_<#=posIndex#>" class="music_card_ft">\n                <i class="weui-play-btn"></i>\n                <img src="<#=albumurl#>" data-autourl="<#=audiourl#>" data-musicid="<#=musicid#>" class="music_card_thumb" alt="">\n            </span>\n    </span>\n</span>\n';
});define("new_video/ctl.js",["common/comm_report.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
var i,r=window.withoutIframe?window:window.parent.window,t=e("common/comm_report.js");
if(parent==window)i=window;else try{
{
r.location.href;
}
i=r;
}catch(n){
i=window;
}
var a=i.user_uin,o=Math.floor(i.user_uin/100)%20;
a||(o=-1);
var d=function(){
return o>=0;
};
i.__webviewid||(i.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var s=function(){
var e=i.mid,r=i.idx,t="";
t=e&&r?e+"_"+r:"";
var n=i.__webviewid,o=[a,t,n].join("_");
return o;
},c=function(i){
if(20>o)try{
var t=i.vid||"",n={};
n.__biz=r.biz||"",n.vid=t,n.clienttime=+new Date;
var a=r.mid,c=r.idx,p="";
p=a&&c?a+"_"+c:t,n.type="undefined"!=typeof i.type?i.type:a&&c?1:2,n.id=p,n.hit_bizuin=i.hit_bizuin||"",
n.hit_vid=i.hit_vid||"",n.webviewid=s(),n.step=i.step||0,n.orderid=i.orderid||0,
n.ad_source=i.ad_source||0,n.traceid=i.traceid||0,n.ext1=i.ext1||"",n.ext2=i.ext2||"",
n.r=Math.random(),n.devicetype=r.devicetype,n.version=r.clientversion,n.is_gray=d()?1:0,
n.mid=a||"",n.idx=c||"",n.url=r.location.href,n.screen_num=i.screen_num||0,n.screen_height=i.screen_height||0,
n.ori_status=i.ori_status||3,n.fromid=i.fromid||0,n.sessionid=window.sessionid||"",
n.appmsg_scene=window.source||(i.cgiData?i.cgiData.scene:0)||0,!n.appmsg_scene&&n.fromid?n.appmsg_scene=n.fromid:!n.fromid&&n.appmsg_scene&&(n.fromid=n.appmsg_scene),
n.total_range=i.total_range||0,n.current_range=i.current_range||0,n.duration=i.duration||0;
var m=e("biz_wap/utils/ajax.js");
m({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:n
});
}catch(_){}
},p=function(e){
try{
var i=e.vid||"",n={};
n.BizUin=r.biz||"",n.Vid=i,n.ClientTime=+new Date;
var a=r.mid,o=r.idx,c="";
c=a&&o?a+"_"+o:i,n.Type="undefined"!=typeof e.type?e.type:a&&o?1:2,n.Id=c,n.HitBizUin=parseInt(e.hit_bizuin)||0,
n.HitVid=e.hit_vid||"",n.WebViewId=s(),n.Step=parseInt(e.step,10)||0,n.OrderId=(e.orderid||"").toString(),
n.AdSource=parseInt(e.ad_source,10)||0,n.TraceId=(e.traceid||"").toString(),n.Ext1=(e.ext1||"").toString(),
n.Ext2=(e.ext2||"").toString(),n.r=Math.random(),n.DeviceType=r.devicetype,n.ClientVersion=parseInt(r.clientversion),
n.IsGray=d()?1:0,n.msgid=parseInt(a,10)||0,n.itemidx=parseInt(o,10)||0,n.Url=r.location.href,
n.ScreenNum=parseInt(e.screen_num,10)||0,n.ScreenHeight=parseInt(e.screen_height,10)||0,
n.OrStatus=parseInt(e.ori_status,10)||3,n.Fromid=parseInt(e.fromid,10)||0,n.SessionId=(window.sessionid||"").toString(),
n.AppmsgScene=parseInt(window.source||(e.cgiData?e.cgiData.scene:0),10)||0,!n.AppmsgScene&&n.Fromid?n.AppmsgScene=n.Fromid:!n.Fromid&&n.AppmsgScene&&(n.Fromid=n.AppmsgScene),
n.AppmsgScene=parseInt(n.AppmsgScene,10)||0,n.Fromid=parseInt(n.Fromid,10)||0,n.TotalRange=parseInt(e.total_range,10)||0,
n.CurrentRange=parseInt(e.current_range,10)||0,n.Duration=parseInt(e.duration,10)||0,
n.RemindTrafficSize=parseInt(e.remind_traffic_size,10)||0,n.TrafficReminderType=parseInt(e.traffic_reminder_type,10)||0,
t.report(12710,n);
}catch(p){}
};
return{
report:c,
getWebviewid:s,
showAd:d,
commReport:p
};
});function _defineProperty(e,i,o){
return i in e?Object.defineProperty(e,i,{
value:o,
enumerable:!0,
configurable:!0,
writable:!0
}):e[i]=o,e;
}
define("appmsg/without_iframe/video_appmsg.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","appmsg/without_iframe/video_appmsg.html.js","biz_common/utils/url/parse.js","appmsg/without_iframe/iframe_communicate.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","pages/video_ctrl.js","biz_wap/jsapi/core.js","pages_new/3rd/vuex.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","biz_wap/utils/jsmonitor_report.js","pages_new/common_share/video/player/controller.js","pages_new/common_share/video/player/plugins/danmu/danmu.js","pages_new/common_share/video/player/player_store.js","pages_new/common_share/video/player/plugins/danmu/danmu_store.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var i=e("biz_common/tmpl.js"),o=e("appmsg/without_iframe/video_appmsg.html.js"),t=e("biz_common/utils/url/parse.js"),n=e("appmsg/without_iframe/iframe_communicate.js"),s=e("biz_wap/utils/ajax.js"),d=e("biz_common/dom/event.js"),a=e("pages/video_ctrl.js"),r=e("biz_wap/jsapi/core.js"),_=e("pages_new/3rd/vuex.js"),m=e("biz_wap/utils/device.js"),c=e("biz_wap/utils/mmversion.js"),p=e("biz_wap/utils/jsmonitor_report.js"),u=e("pages_new/common_share/video/player/controller.js"),v=e("pages_new/common_share/video/player/plugins/danmu/danmu.js"),l=e("pages_new/common_share/video/player/player_store.js");
return function(){
function w(e,i){
var o=i||window.location.search,t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=o.substr(o.indexOf("?")+1).match(t);
return null!=n?n[2]:"";
}
function h(e){
return document.querySelector("#js_mp_video_container_"+z.iframeIdx+" #"+e);
}
function y(){
z.ori_status=1*k.ori_status===1?1:1*k.ori_status===2?2:3,z.showComment=1*k.show_comment===1,
z.comment_id=k.comment_id,z.vid=k.vid,z.ckey=k.ckey,z.ckey_ad=k.ckey_ad,z.__biz=k.__biz,
z.uin=k.uin,z.mid=k.mid,z.idx=k.idx,z.scene=k.scene||w("scene",window.location.href)||0,
z.autoplay=!!z.container.getAttribute("__sec_open_auto_play__"),z.iframeIdx=k.iframeIdx,
z.dom={
js_article:document.getElementById("js_article"),
js_mpvedio:h("js_mpvedio_wrapper_"+z.vid),
page_content:h("page-content")
};
}
function b(){
var i=z.ratio;
k.vw&&k.vh&&(i=k.vw/k.vh);
var o=k.vw||z.dom.js_mpvedio.offsetWidth,t=Math.ceil(o/i),s=[];
c.isWechat&&(m.os.iphone||m.os.android)&&new Date(1e3*window.ct)>new Date("2022/01/12 19:00:00 GMT+0800")&&s.push(v);
var d={
preview:!(1*k.preview!==1),
isInIframe:!0,
hitBizuin:k.hit_bizuin,
hitVid:k.hit_vid,
fromid:z.scene,
oriStatus:z.ori_status,
isMpVideo:k.txvideo_vid?0:k.is_mp_video,
plugins:s,
oriVid:z.vid,
vid:k.txvideo_vid?k.txvideo_vid:z.vid,
ckey:k.txvideo_vid?"":z.ckey,
ckey_ad:z.ckey_ad,
width:o,
height:t,
__biz:z.__biz,
uin:z.uin,
mid:z.mid,
idx:z.idx,
coverFit:"cover",
vtitle:window.msg_title,
useFeFullscreen:!0,
comment_id:z.comment_id,
scene_type:0,
autoplay:z.autoplay,
videoMd5:k.video_md5,
headImgUrl:window.round_head_img,
canShareVideo:!k.isPaySubscribe,
bizUserName:window.user_name,
bizNickName:window.nickname,
profileTabType:1,
leaveReport12710Type:1
},r=new _.Store({
modules:_defineProperty({},l.name,l),
state:{
cgiData:k
}
}),p=e("pages_new/common_share/video/player/plugins/danmu/danmu_store.js");
r.registerModule([l.name,p.name],p),z.myPlayer=new u.mpVideoPlayer({
store:r,
el:"#js_vue_player_"+z.iframeIdx,
opt:d
}),z.myPlayer.$on("player-ready",function(){
if(z.dom.js_mpvedio.style.height="100%",(a.showVideoDetail()||a.showReprint())&&!z.hasShowBotbar){
var e=h("bottom_bar");
e&&(e.style.display="",z.hasShowBotbar=!0,n.postMessage({
type:"addVideoIframeHeight",
data:{
vid:k.txvideo_vid||z.id,
height:z.mpVideoBotH
}
}));
}
n.postMessage({
type:"videoInited",
data:{
vid:z.id,
ori_status:z.ori_status,
hit_bizuin:k.hit_bizuin,
hit_vid:k.hit_vid
}
});
}),z.myPlayer.$on("video-ready",function(){
n.postMessage({
type:"removeVideoLoading",
data:{
vid:z.vid
}
});
}),z.dom.page_content.style.transition="opacity 0s",z.myPlayer.$on("fullscreenchange",function(e){
"frontend"===e.type&&(e.state&&z.dom.js_mpvedio.parentNode!==document.body?(z.dom.js_mpvedio.style="position: fixed; top: 0; width: 100%; height: 100%",
z.dom.js_article.style.opacity=0,window.requestAnimationFrame(function(){
document.body.appendChild(z.dom.js_mpvedio),z.dom.js_article.style.transition="opacity .1s";
})):e.state||z.dom.js_mpvedio.parentNode===z.dom.page_content||(z.dom.js_mpvedio.style="",
z.dom.page_content.appendChild(z.dom.js_mpvedio),setTimeout(function(){
z.dom.js_article.style.opacity=1;
},150)));
});
}
function g(){
b();
}
function f(){
var e=h("h5_profile_btn");
e&&2===k.ori_status&&d.tap(e,function(){
var e="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+k.source_encode_biz+"&scene=111#wechat_redirect";
-1!==navigator.userAgent.indexOf("WindowsWechat")||-1!==navigator.userAgent.indexOf("Mac OS")?location.href=e:r.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(i){
-1===i.err_msg.indexOf("ok")&&(location.href=e);
});
});
var i=h("video_detail_btn");
i&&1===k.media_source&&d.tap(i,function(){
var e=["https://mp.weixin.qq.com/mp/video?t=pages/video_detail_new","&vid=",z.vid,"&mid=",z.mid,"&__biz=",z.__biz,"&idx=",z.idx,"&sn=",window.sn||w("sign",window.location.href)||"","&vidsn=",k&&k.vidsn?k.vidsn:"","&scene=100#wechat_redirect"];
z.myPlayer&&z.myPlayer.extendMpReportData({
detail_click:1
}),window.location.href=e.join("");
});
}
function j(e,i){
s({
url:i,
type:"GET",
f:"json",
success:function(i){
var o={};
try{
o=JSON.parse(i),p.setSum(110644,51,1);
}catch(t){
p.setSum(110644,53,1);
}
var n=e.vid,s=e.vh,d=e.vw,a=e.ratio,r=e.index;
k={
hit_bizuin:o.hit_bizuin,
hit_vid:o.hit_vid,
txvideo_vid:o.txvideo_vid,
txvideo_openid:o.txvideo_openid,
ckey:o.ckey,
ckey_ad:o.ckey_ad,
video_title:o.video_title,
ori_status:o.ori_status,
nick_name:window.nickname,
hit_username:o.hit_username,
is_mp_video:o.is_mp_video,
is_login:o.is_login,
user_uin:o.user_uin,
vh:s,
vw:d,
scene:window.source||w("scene",window.location.href)||0,
ratio:a,
openid:o.openid,
show_comment:window.show_comment,
comment_id:window.comment_id,
vid:n,
__biz:window.biz,
biz:window.biz,
mid:window.mid,
idx:window.idx,
uin:window.uin,
media_source:o.media_source,
vidsn:o.vidsn,
username:o.biz_user_name,
preview:!!window.is_temp_url,
sn:window.sn||w("sign",window.location.href)||"",
source_encode_biz:window.source_encode_biz,
video_md5:o.video_md5,
isPaySubscribe:1*window.isPaySubscribe||0,
bizNickname:window.nickname,
roundHeadImg:window.round_head_img,
subscene:window.subscene,
enterid:1*window.enterid,
sessionid:window.sessionid,
channel_session_id:window.channel_session_id,
real_item_show_type:window.real_item_show_type,
item_show_type:window.item_show_type,
clientversion:window.clientversion,
devicetype:window.devicetype,
isprofileblock:window.isprofileblock,
iframeIdx:r
},y(),g(),f();
},
error:function(){
p.setSum(110644,52,1);
}
});
}
function x(e,n,s){
for(var d=e.getAttribute("data-src")||e.getAttribute("src"),a=t.getQuery("vid",d),r=e.getAttribute("data-vw"),_=e.getAttribute("data-vh"),m=e.getAttribute("data-ratio"),c=document.createElement("span"),p=e.attributes,u=p.length-1;u>=0;u--)c.setAttribute(p[u].name,p[u].value);
c.id="js_mp_video_container_"+n,c.setAttribute("vid",a),c.classList.add("video_iframe"),
c.style.cssText=e.style.cssText,c.style.display="none";
var v=i.tmpl(o,{
vid:a,
index:n,
video_h:_
},!1);
c.innerHTML=v;
var l=e.parentNode;
return l?(l.lastChild===e?l.appendChild(c):l.insertBefore(c,e.nextSibling),l.removeChild(e),
z.container=c,j({
iframe:c,
vid:a,
vh:_,
vw:r,
ratio:m,
index:n
},s),c):null;
}
var z={
hasShowBotbar:!1,
mpVideoBotH:37,
showComment:!0,
loverCount:{}
},k={};
return{
createMpVideoDom:x
};
};
});define("biz_wap/jsapi/leaveReport.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_wap/utils/log.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=l?"1":"0",t.f="json",f.join(e,t);
}
function o(e){
return e&&"object"==typeof e;
}
function n(e,t){
if(o(e)&&o(t))for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
}
function r(e){
u("[leaveReport 1]"),console.log("[leaveReport 1]");
var r={};
for(var i in y){
r[i]||(r[i]={});
for(var a=0;a<y[i].length;a++){
var p=y[i][a];
"function"==typeof p?n(r[i],p(e)):o(p)&&n(r[i],p);
}
}
u("[leaveReport getDataFunc.length "+_.length+"]"),console.log("[leaveReport getDataFunc.length "+_.length+"]");
for(var a=0;a<_.length;a++){
var s=_[a](e);
o(s)&&g.push(s);
}
for(var a=0;a<g.length;a++)g[a].reportUrl&&(g[a].reportUrl=t(g[a].reportUrl));
return r.data={
requestList:g
},r;
}
function i(e){
"function"==typeof e?_.push(e):o(e)&&g.push(e);
}
function a(e,t){
y[e]||(y[e]=[]),y[e].push(t);
}
function p(e){
var t=r(!0);
c.invoke("handleMPPageAction",{
action:"reportByLeaveForMPGateway",
reportData:t
},function(o){
if(o&&o.err_msg&&-1!==o.err_msg.indexOf(":ok"))_=[],g=[],y={},"function"==typeof e&&e(o);else{
_=[],g=[];
var n=t.data.requestList.length;
t.data.requestList.forEach(function(t){
t.reportUrl&&s({
type:t.method||"GET",
url:t.reportUrl,
data:t.reportData,
async:!1,
success:function(t){
--n<0&&"function"==typeof e&&e({
err_msg:"handleMPPageAction:ok",
fallback:!0,
resp:t
});
},
error:function(t,o){
--n<0&&"function"==typeof e&&e({
err_msg:"handleMPPageAction:fail",
fallback:!0,
err:o
});
}
});
});
}
});
}
var s=e("biz_wap/utils/ajax.js"),c=e("biz_wap/jsapi/core.js"),f=e("biz_common/utils/url/parse.js"),u=e("biz_wap/utils/log.js"),l=-1!=navigator.userAgent.indexOf("TBS/"),d={},v=!1;
try{
d=top.window.document;
}catch(w){
v=!0;
}
if(!v&&top.window.__leaveReport)return top.window.__leaveReport;
if(window.__leaveReport)return window.__leaveReport;
var _=[],g=[],y={};
c.on("reportOnLeaveForMP",function(){
return r(!1);
});
var h={
reportNow:p,
addReport:i,
addSpecificReport:a
};
return window.__leaveReport=h,h;
});define("biz_wap/utils/hand_up_state.js",["biz_common/dom/event.js"],function(n){
"use strict";
function e(){
if("hidden"in document)return"hidden";
for(var n=["webkit","moz","ms","o"],e=0;e<n.length;e++)return n[e]+"Hidden"in document,
n[e]+"Hidden";
return null;
}
function i(){
var n=e();
return n?document[n]:!1;
}
function t(){
return r;
}
var d=n("biz_common/dom/event.js"),o=e(),r=0,u=0;
if(o){
var m=o.replace(/[H|h]idden/,"")+"visibilitychange";
d.on(document,m,function(){
i()?u=(new Date).getTime():r+=(new Date).getTime()-u;
},!1);
}
return{
getHandUpTime:t,
isHidden:i
};
});define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
return t&&1==!!t.length?(t=t[0].innerHTML,t.length):0;
}
return{
htmlSize:t()
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("appmsg/open_url_with_webview.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),n=-1!=navigator.userAgent.indexOf("WindowsWechat"),i=function(e,i){
if(n)return location.href=e,!1;
i=i||{};
var o=i.sample||0;
o*=1e3;
var t=window.user_uin||0,s=0!==t&&Math.floor(t/100)%1e3<o;
return s?void r.invoke("openUrlWithExtraWebview",{
url:e,
openType:i.openType||1,
scene:i.scene||"",
bizUsername:i.user_name||""
},function(e){
e&&"openUrlWithExtraWebview:ok"===e.err_msg?i.resolve&&i.resolve():i.reject&&i.reject();
}):void(i.reject&&i.reject());
};
return i;
});