

jQuery(document).ready(function(){

    // Video playback
    jQuery(".video").on("click", play_video);

});

function play_video() {
    var container = jQuery(this);
    var overlay = container.find(".play-overlay");
    var video = container.find("video")[0];


    if(video.paused) {
        overlay.fadeOut("slow");
        video.play();
    } else {
        video.pause();
        overlay.fadeIn("slow");        
    }
}
