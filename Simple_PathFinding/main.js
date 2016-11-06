(function(){
	"use strict";
	/*global createjs*/
	var stage = new createjs.Stage("canvas");
	var canvas = document.getElementById("canvas");
	var allElems = [];
	var walls = [];
	var canHeMove = true;

	canvas.width = 350;
	canvas.height = 600;

	var enemy = new createjs.Shape();
	enemy.width = 20;
	enemy.height = 20;
	enemy.graphics.beginFill("#d8d8d8").drawRect(0, 0, enemy.width, enemy.height);
	allElems.push(enemy);

	var character = new createjs.Shape();
	character.graphics.beginFill("#d8d8d8").drawCircle(0, 0, 10);
	allElems.push(character);

	var wall = new createjs.Shape();
	wall.width = 40;
	wall.height = 350;
	wall.graphics.beginFill("#d8d8d8").drawRect(0, 0, wall.width , wall.height);
	allElems.push(wall);
	walls.push(wall);

	var wall2 = new createjs.Shape();
	wall2.width = 60;
	wall2.height = 120;
	wall2.graphics.beginFill("#d8d8d8").drawRect(0, 0, wall2.width , wall2.height);
	allElems.push(wall2);
	walls.push(wall2);

	function add(elems) {
		elems.forEach(function(elem,i){
			stage.addChild(elem);
		});
	}
	add(allElems);
	character.x = 250;
	character.y = 550;
	wall.x = 100;
	wall.y = 180;
	wall2.x = 60;
	wall2.y = 0;

	createjs.Ticker.addEventListener("tick", stage);


	function getCharCoords() {
		return {x:character.x, y:character.y};
	}
	function moveChar() {
		if(character.y>=0) {
			character.y-=5;
		}
	}

	function moveToChar(enemyTroop, rad) {
		var currCharCoords = getCharCoords();
		var pX;
		var pY;
		var s;
		var step = 5;
		var alphaRad;
		var stepX;
		var stepY;

		//определим проекции вектора
		pX = currCharCoords.x - enemyTroop.x-10;
		pY = currCharCoords.y - enemyTroop.y-10;

		//определим длину пути по теореме пифагора
		s = Math.sqrt(pX*pX+pY*pY);

		// радианы
		alphaRad = rad || Math.atan2(pY, pX);

		stepX = step * Math.cos(alphaRad);
		stepY = step * Math.sin(alphaRad);

		(function findRightPath(){
			//проверяем соударение со стенами 
			// TODO решить периодически возникающую проблему с рекурсией
			if(checkCollision(enemyTroop, walls, stepX, stepY)) {
				//останавливаем покадровую анимацию, изменяем угол вектора движения и снова пробуем передвинуть Врага к персонажу
				canHeMove = false;
				var ch = 0.02;
				if(stepY <= 0) {
					ch = -ch;
				}
				moveToChar(enemy, alphaRad+ch);
			} else {
				canHeMove = true;
				if(s > 5) {
					enemyTroop.x+=stepX;
					enemyTroop.y+=stepY;
				}
			}
		}());
	}

    function checkCollision(movingElem, elems, stepX, stepY) {
        var collision = false;
          var eLeft = movingElem.x+stepX;
          var eRight = movingElem.x+movingElem.width+stepX;
          var eTop = movingElem.y+stepY;
          var eBottom = movingElem.y+movingElem.height+stepY;

       elems.forEach(function(elem, i) {
          var rLeft = elem.x;
          var rRight = elem.x+elem.width;
          var rTop = elem.y;
          var rBottom = elem.y+elem.height;

          if((eLeft >= rLeft && eLeft <= rRight) || (eRight >= rLeft && eRight <= rRight)) {
              if((eTop >= rTop && eTop <= rBottom) || (eBottom >= rTop && eBottom <= rBottom) || (eTop <= rTop && eBottom >= rBottom)) {
                  collision = true;
                  return true;
              }
          }
       });
       return collision;
    }
    
	createjs.Ticker.addEventListener("tick", function(){
		if(canHeMove) {
			moveToChar(enemy);
		}
	});

	setTimeout(function() {
		createjs.Ticker.addEventListener("tick", function(){
			moveChar();
		});
	},2000);
}());

