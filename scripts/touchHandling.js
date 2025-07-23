const dniCard = document.getElementById("dni-card");
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

dniCard.addEventListener('touchstart', handleTouchStart, false);
dniCard.addEventListener('touchmove', handleTouchMove, false);
dniCard.addEventListener('touchend', handleTouchEnd, false);
dniCard.addEventListener('click', () => {
    flipCard();
}, false);

var xDown = null;
var yDown = null;
let transformDegrees = 0;
function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    var touch = evt.touches[0];
    touchX = touch.pageX;
    touchY = touch.pageY;
    touchStart = true;
}

function handleTouchMove(evt) {
    var touch = evt.touches[0];
    var dx = touch.pageX - touchX;
    var dy = touch.pageY - touchY;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    console.log(transformDegrees)

    if (Math.abs(dx) > Math.abs(dy)) {
        
        transformDegrees = dx.map(-vw, vw, -180, 180)
        transformDegrees = Math.min(Math.max(transformDegrees, -180), 180)
        if(touch.pageX > vw/2 && transformDegrees < 0){
            transformDegrees = -transformDegrees;
        }else{
            transformDegrees = transformDegrees;
        }
        dniCard.style.transform = `rotateY(${transformDegrees}deg)`;
    }

    touchStart = false;
}

let isFliped = false;

function handleTouchEnd(evt) {
    console.log("TfD: ", transformDegrees)
    if(transformDegrees < -60){
        console.log("TfD<-60: ", transformDegrees)
        dniCard.style.transform = `rotateY(${0}deg)`;
        selector1.classList.remove('selector-active');
        selector2.classList.remove('selector-active');
        selector2.classList.add('selector-active');
        isFliped = true;
    }else if(transformDegrees > -60 && transformDegrees !== 0){
        console.log("TfD>-60: ", transformDegrees)

        dniCard.style.transform = `rotateY(${180}deg)`;
        selector2.classList.remove('selector-active');
        selector1.classList.remove('selector-active');
        selector1.classList.add('selector-active');
        isFliped = false;
    }
    transformDegrees = 0;

}

let selector1 = document.getElementById("selector-1");
let selector2 = document.getElementById("selector-2");

function flipCard() {
    console.log("flipCard")
    dniCard.style.transform = ``;

    if(isFliped){
        console.log("flipCard1")
        dniCard.classList.remove('is-flipped');
        dniCard.classList.add('is-flipped');
        isFliped = !isFliped;

        //Back
        selector2.classList.remove('selector-active');
        selector1.classList.remove('selector-active');
        selector1.classList.add('selector-active');
    }else{
        console.log("flipCard2");
        dniCard.classList.remove('is-flipped');
        isFliped = !isFliped;

        selector1.classList.remove('selector-active');
        selector2.classList.remove('selector-active');
        selector2.classList.add('selector-active');
    }

}
