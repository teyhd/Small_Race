var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

document.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesure();
}, false); 

function handleGesure() {
    
    let Xs= Math.abs(touchendX - touchstartX);
    let Ys= Math.abs(touchendY - touchstartY);
    if ((Xs>100)||(Ys>100))
 if (Xs>Ys){
    if (touchendX < touchstartX) {
        go_left(); //о
    }
    if (touchendX > touchstartX) {
        go_right();
    }
 } else{
    if (touchendY < touchstartY) {
        go_up();
    }
    if (touchendY > touchstartY) {
        go_down();
    }
}
    /*if (touchendY == touchstartY) {
        alert(touchendY);
        alert(touchstartY);
    }*/
}

