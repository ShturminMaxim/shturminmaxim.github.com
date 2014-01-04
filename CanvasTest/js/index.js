window.onload = function (argument) {
	var frame = 0;
	var framesInRow = 3;
	var currentRow = 0;
	var frameSize = {
		x:32,
		y:45
	};
    var step = 5;
    var x;
    var curX = 0;
    var curY = 0;
    var keyMap = {
        '37':0,
        '38':0,
        '39':0,
        '40':0
    };
    var keyToAnimation = {
        '37':64,
        '38':192,
        '39':128,
        '40':0
    };
    var side = '40';
	var canvas = document.getElementById("mygame");
	var ctx = canvas.getContext('2d');
	var image = new Image();
	var animation;

	image.src = "./img/char.png";
    var playerEdges = function() {
        return {
            left: curX,
            right: curX+(frameSize.x),
            top:  curY,
            bottom:  curY+(frameSize.y)
        }
    }
    //test ground element for collision test
    var howManyElements = 3;
    var rockCoords = [129,0];
    var rockSize = 32;
    var rock = new Image();
    rock.src = "./img/ground.png";

    var rocks = []
    function createElem(){
        var elem = {
            img:rock,
            posX: parseInt(Math.random()*300+50 , 10),
            posY: parseInt(Math.random()*300+50 , 10),
        }
        elem.edges = {
                left: parseInt(elem.posX , 10),
                right: parseInt(elem.posX+rockSize , 10),
                top:  parseInt(elem.posY , 10),
                bottom:  parseInt(elem.posY+rockSize , 10)
        }
        return elem;
    };

    for(var j=0;j<howManyElements;j+=1) {
        rocks.push(createElem());
    }

    function drawRocks(){
        var length = rocks.length;
        for(var i = 0; i < length; i += 1) {
            ctx.drawImage(rocks[i].img, rockCoords[0], rockCoords[1], rockSize, rockSize, rocks[i].posX, rocks[i].posY, rockSize, rockSize);
        }
    }
    rock.onload = function(){
        drawRocks();
    };

	function playerMoving(side){
		x = frame * frameSize.x;
		frame = frame + 1;
		
		if(frame >= framesInRow) {
			frame = 0;
		}
	}

	image.onload = function(){
        //do redraw
        (function redraw(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawRocks();
            ctx.drawImage(image, x, keyToAnimation[side], frameSize.x, frameSize.y, curX, curY, frameSize.x, frameSize.y);
            setTimeout(redraw, 60);
        }());
	};
    function checkCollision(e){
        var length = rocks.length;
        var pLeft = playerEdges().left;
        var pRight = playerEdges().right;
        var pTop = playerEdges().top;
        var pBottom = playerEdges().bottom;
        var rLeft;
        var rRight;
        var rTop;
        var rBottom;

        if(e === 1) {
            pLeft -= step;
        }
        if(e === 2) {
            pTop -= step;
        }
        if(e === 3) {
            pRight += step;
        }
        if(e === 4) {
            pBottom += step;
        }
        for(var i = 0; i < length; i += 1) {
            rLeft = rocks[i].edges.left;
            rRight = rocks[i].edges.right;
            rTop = rocks[i].edges.top;
            rBottom = rocks[i].edges.bottom;

            if((pLeft >= rLeft && pLeft <= rRight) || (pRight >= rLeft && pRight <= rRight)) {
                if((pTop >= rTop && pTop <= rBottom) || (pBottom >= rTop && pBottom <= rBottom) || (pTop <= rTop && pBottom >= rBottom)) {
                    return true;
                }
            }
        }
        return false;
    }
	setInterval(function() {
        if(keyMap[37] === 1) {
            if(!checkCollision(1)) {
                curX -= step;
            }
        }
        if(keyMap[38] === 1) {
            if(!checkCollision(2)) {
                curY -= step;
            }
        }
        if(keyMap[39] === 1) {
            if(!checkCollision(3)) {
                curX += step;
            }

        }
        if(keyMap[40] === 1) {
            if(!checkCollision(4)) {
                curY += step;
            }

        }
	}, 60);

	document.addEventListener('keydown', function(e){
        e.preventDefault();
        //console.log(e.keyCode);
        side = e.keyCode;
        if(side === 37) {
            keyMap[37] = 1;
        }
        if(side === 38) {
            keyMap[38] = 1;
        }
        if(side === 39) {
            keyMap[39] = 1;
        }
        if(side === 40) {
            keyMap[40] = 1;
        }

        //do animation
		if(!animation) {
			animation = setInterval(function(){
				playerMoving();
			},100);
		}
	});

	document.addEventListener('keyup', function(e){
        side = e.keyCode;
        if(side === 37) {
            keyMap[37] = 0;
        }
        if(side === 38) {
            keyMap[38] = 0;
        }
        if(side === 39) {
            keyMap[39] = 0;
        }
        if(side === 40) {
            keyMap[40] = 0;
        }
		clearInterval(animation);
		animation = false;
	});
}