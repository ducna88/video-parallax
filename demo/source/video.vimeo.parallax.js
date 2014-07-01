function checkElementOnWindow(element){
    var rect = element.getBoundingClientRect();
    return (rect.bottom > 0 && rect.bottom <= rect.height) ||
        (rect.top > 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight));
}
function videoParallax(video,check3D) {
    var container = jQuery(video).parents(".video-parallax-container").first().get(0);
    if(checkElementOnWindow(container)) {


        var windowHeight = window.innerHeight || document.documentElement.clientHeight,
            videoDemension,
            ratioScroll ,
            maxScrollMove,
            topChange;


        videoDemension = getDemensions(video);
        var containerDemension = getDemensions(container);
        maxScrollMove = windowHeight + containerDemension.height;

        var maxVideoMove = videoDemension.height - containerDemension.height;

        ratioScroll = maxVideoMove/maxScrollMove;
        var left = -(videoDemension.width - containerDemension.width)/2;
        topChange = Math.floor((containerDemension.top - windowHeight) * ratioScroll);
        if(check3D) {
            var translate3D = 'translate3d('+left+'px, '+topChange+'px, 0px)';
            video.style.cssText =
                '-moz-transform:' + translate3D +
                    ';-ms-transform:' + translate3D +
                    ';-o-transform:' + translate3D +
                    ';-webkit-transform:' + translate3D +
                    ';transform:' + translate3D;
        } else {
            video.style.top = topChange+"px";
            video.style.left = left +"px";

        }
    } else {
    }
}

function check3D() {
    var translate3D = 'translate3d(0px, 0px, 0px)',
        divElm = document.createElement('div'),
        matches;
    divElm.style.cssText =
        '-moz-transform:' + translate3D +
            ';-ms-transform:' + translate3D +
            ';-o-transform:' + translate3D +
            ';-webkit-transform:' + translate3D +
            ';transform:' + translate3D;
    matches = divElm.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
    var support3d = matches !== null && matches.length >= 1;
    return support3d;
}

function getDemensions(video) {
    var rect = video.getBoundingClientRect();
    return rect;
}

function loadSize(video) {
    var container = jQuery(video).parents(".video-parallax-container").first().get(0);
    var containerDemension = getDemensions(container);
    //document.getElementById("video0").style.height = containerDemension.width * 9/16 +"px";
    video.height=containerDemension.width * 9/16 * ratio +"px";
    video.width = containerDemension.width * ratio +"px";
}