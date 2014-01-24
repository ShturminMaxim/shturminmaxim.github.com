define(['canvas'], function(canvas){
    var ctx = canvas.getContext('2d');
    var redrawArray = [];
    var length = redrawArray.length;

    (function redraw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var i=0;i<length; i += 1) {
            if(redrawArray[i].drawable) {
                redrawArray[i].draw();
            }
        }
        setTimeout(redraw, 60);
    }());

    return {
        addToRedraw:function(elem){
            if(typeof elem === 'object') {
                redrawArray.push(elem);
                length = redrawArray.length;
            }
        }
    }
});