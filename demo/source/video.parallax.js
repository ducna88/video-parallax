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
        containerDemension,
        maxScrollMove = windowHeight + containerDemension.height,
        maxVideoMove,
        ratioScroll,
        topChange;


    videoDemension = getDemensions(video);
    containerDemension = getDemensions(container);
    maxVideoMove = videoDemension.height - containerDemension.height;
    ratioScroll = maxVideoMove/maxScrollMove;
    var left = -(videoDemension.width - containerDemension.width)/2;
    topChange = Math.floor((containerDemension.top - windowHeight) * ratioScroll);

        video.play();
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
        video.pause();
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