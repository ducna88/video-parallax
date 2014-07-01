    function checkElementOnWindow(element){
        var rect = element.getBoundingClientRect();
        return (rect.bottom > 0 && rect.bottom <= rect.height) ||
            (rect.top > 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight));
    }
    function imageParallax(image,check3D) {

        var windowHeight = window.innerHeight || document.documentElement.clientHeight,
            imageDemension,
            ratioScroll ,
            topChange;

        imageDemension = getDemensions(image);
        var container = jQuery(image).parents(".image-parallax-container").first().get(0);

        var containerDemension = getDemensions(container);
        var maxScrollMove = windowHeight + containerDemension.height;

        var maxImageMove = imageDemension.height - containerDemension.height;
        ratioScroll = maxImageMove/maxScrollMove;
        var left = -(imageDemension.width - containerDemension.width)/2;
        if(checkElementOnWindow(container)) {
            topChange = Math.floor((containerDemension.top - windowHeight) * ratioScroll);
            if(check3D) {
                var translate3D = 'translate3d('+left+'px, '+topChange+'px, 0px)';
                    image.style.cssText =
                        '-moz-transform:' + translate3D +
                        ';-ms-transform:' + translate3D +
                        ';-o-transform:' + translate3D +
                        ';-webkit-transform:' + translate3D +
                        ';transform:' + translate3D;
                ;
            } else {
                image.style.top = topChange+"px";
                image.style.left = left +"px";
            }


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

    function getDemensions(image) {
        var rect = image.getBoundingClientRect();
        return rect;
    }
