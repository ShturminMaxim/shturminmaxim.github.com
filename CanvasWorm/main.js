(function(){
	"use strict";
	var stage = new createjs.Stage("canvas");
	var canvas = document.getElementById("canvas");
	canvas.width = 350;
	canvas.height = 600;

	var wormHead = new createjs.Shape();
	var currDirection = 4;
	var step = 6;
	var wormBody = [];
	var wormBodyLength = 10;
	var updateBodyElems = function() {
			wormBody = [];

			for (var i = 0; i < wormBodyLength; i++) {
				(function() {
					var nElem = new createjs.Shape();
					var x,
						y;

					nElem.oldCoords = {};
					x = (function(){
						switch (currDirection) {
							case 1 : 
								return wormHead.x+step;
								break;
							case 2 : 
								return wormHead.x;
								break;
							case 3 : 
								return wormHead.x-step;
								break;
							case 4 : 
								return wormHead.x
								break;
						}
					}());
					y = (function(){
						switch (currDirection) {
							case 1 : 
								return wormHead.y;
								break;
							case 2 : 
								return wormHead.y+step;
								break;
							case 3 : 
								return wormHead.y;
								break;
							case 4 : 
								return wormHead.y-step;
								break;
						}			
					}());

					nElem.graphics.beginFill("#ffffff").drawRect(0, 0, 6, 6);
					wormBody.push(nElem);
					stage.addChild(nElem);
					nElem.x = x;
					nElem.y = y;
				}());
			};
	}
	var addElem = function() {
		wormBodyLength++;
		updateBodyElems();
	}
		//-------------- lets add some planets
	var Planets = function() {
		var maxPlanetsOnScreen = 2;
		var that = {};
		that.planets = [];

		that.addPlanet = function() {
			var planet = new createjs.Shape();
			planet.randX = parseFloat(parseInt(Math.random()*(canvas.width-20), 10)) || 10;
			planet.randY = parseFloat(parseInt(Math.random()*(canvas.height-20), 10)) || 10;

			if(planet.randX<15) { planet.randX += 20; }
			if(planet.randY<15) { planet.randY += 20; }

			that.planets.push(planet);
			planet.graphics.beginFill("#001eff").drawCircle(planet.randX,planet.randY,6);
			stage.addChild(planet);
		}

		that.init = function() {
			for (var i = 0; i < maxPlanetsOnScreen; i++) {
				that.addPlanet();
			};
		}

		return that;
	}
	// init planets
	window.p = new Planets();
	p.init();

	wormHead.graphics.beginFill("#ffffff").drawRect(0, 0, 6, 6);
	stage.addChild(wormHead);
	updateBodyElems();

	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.addEventListener("tick", function() {
		moveHead(currDirection);
		checkCollisions();
	});

	function moveHead(to) {
		wormHead.oldCoords = {
			x:wormHead.x,
			y:wormHead.y
		};
		switch (to) {
			case 1 :
				if(wormHead.x<0) {
					wormHead.x = stage.canvas.width;
				} else {
					wormHead.x-=step;
				}
				break;
			case 2 : 
				if(wormHead.y<0) {
					wormHead.y = stage.canvas.height;
				} else {
					wormHead.y-=step;
				}
				break;
			case 3 : 
				if(wormHead.x>stage.canvas.width) {
					wormHead.x = 0;
				} else {
					wormHead.x+=step;
				}
				break;
			case 4 : 
				if(wormHead.y>stage.canvas.height) {
					wormHead.y = 0;	
				} else {
					wormHead.y+=step;
				}
				break;
		}
		moveBody();
	}

	function moveBody() {
		var oldHeadCoords = wormHead.oldCoords;
		if(wormBody.length) {
			wormBody.forEach(function(elem,i){
				if(i === 0) {
					elem.oldCoords.x = elem.x;
					elem.oldCoords.y = elem.y;
					elem.x = oldHeadCoords.x;
					elem.y = oldHeadCoords.y;
				} else {
					elem.oldCoords.x = elem.x;
					elem.oldCoords.y = elem.y;
					elem.x = wormBody[i-1].oldCoords.x;
					elem.y = wormBody[i-1].oldCoords.y;
				}	
			})
		}
	}

	window.addEventListener('keydown', function(e) {
		e.preventDefault();
		switch (e.keyCode) {
			case 37 : 
				currDirection = 1;
				break;
			case 38 : 
				currDirection = 2;
				break;
			case 39 : 
				currDirection = 3;
				break;
			case 40 : 
				currDirection = 4;
				break;
		}
	});

	// checkCollisions Planets and Worm
	var checkCollisions = function() {
		var vectorLength;
		var vectorCoords = {};

		p.planets.forEach(function(elem, i) {
			vectorCoords.x = elem.randX-wormHead.x;
			vectorCoords.y = elem.randY-wormHead.y;

			vectorLength = parseInt(Math.sqrt( Math.pow(vectorCoords.x, 2) + Math.pow(vectorCoords.y, 2) ),10);
			//console.log(elem.randX);
			if(vectorLength<9) {
				p.planets.splice (i, 1);
				stage.removeChild(elem);	
				p.addPlanet();	
			}
		})
	}
	//-------------- stars constructor
	var Stars = function (options) {
		var that = {};
		var howManyStars = options && options.stars || 30;
		var starsArr = [];
		var speed = 3;
		var step = 1;
		that.stopped = false;

		that.addStar = function() {
			var star = new createjs.Shape();
			var x = 0;
			var y;

			y = parseFloat(parseInt(Math.random()*canvas.height, 10)) || 1;
			starsArr.push(star);

			star.graphics.beginFill("#ffffff").drawRect(x, y, 1, 1);
			stage.addChild(star);
		}
		that.moveStar = function(star) {
			var individualSpeed = parseFloat(parseInt(Math.random()*10, 10)) || 1;
			var moving = setInterval(function(){
				star.x+=step*individualSpeed;
				if(that.stopped) {
					clearInterval(moving);
				}
				if(star.x>stage.canvas.width) {
					star.x = 0;
					star.y = parseFloat(parseInt(Math.random()*canvas.height, 10)) || 1;
					individualSpeed = parseFloat(parseInt(Math.random()*10, 10)) || 1;
				}
			}, 30);
		}

		that.init = function() {
			for (var i = 0; i < howManyStars; i++) {
				that.addStar();
			};
			starsArr.forEach(function(elem, i) {
				var randTimeout = parseFloat(parseInt(Math.random()*500, 10)) || 1;
				setTimeout(function(){
					that.moveStar(elem);
				},randTimeout);
			})
		}

		return that;
	}

	//-------------- add stars
	window.s = new Stars();
	s.init();
}())