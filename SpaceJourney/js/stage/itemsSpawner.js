/**
 * Created by Max on 10.02.2015.
 */
define(['game','loader','effects'], function(game,loader,effects){
    var setRandomCoords = function(elem){
        //coordinates should be not on current view area
        var randDirection = function(){
            if(Math.random()>0.5) {
                return 1;
            } else {
                return -1;
            }
        };
        var gameMapCurrSize = game.getMapSize;
        var currArea = {
            left: game.mainContainer.x,
            top: game.mainContainer.y,
            right: game.mainContainer.x+game.canvas.width,
            bottom: game.mainContainer.y+game.canvas.height
        };
        var generateRightCoords = function(){
            elem.x = parseFloat(parseInt(Math.random()*game.getMapSize.w, 10));
            elem.y = parseFloat(parseInt(Math.random()*game.getMapSize.h, 10));

            if(elem.x > currArea.left && elem.x < currArea.right && elem.y > currArea.top && elem.y < currArea.bottom) {
                generateRightCoords();
            }
        };
        generateRightCoords();

        return elem;
    };
    var setRandomAnyCoordinates = function(elem){
        elem.x = getRandomInt(game.mapPadding, game.getMapSize.w-game.mapPadding);
        elem.y = getRandomInt(game.mapPadding, game.getMapSize.h-game.mapPadding);

        return elem;
    };
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var base = {
        lives:100,
        baseCoordinates:{
            x:200,
            y:200
        },
        baseObject:null,
        init:function(baseType){
            var baseType = baseType || 'defaultBase';
            var baseImg = loader.getResult(baseType);
            var base = new createjs.Bitmap(baseImg);

            base.x = this.baseCoordinates.x;
            base.y = this.baseCoordinates.y;
            base.regX = base.image.width/2;
            base.regY = base.image.height/2;
            base.name = "base";
            this.baseObject = base;
            game.mainContainer.addChild(base);
            game.grid.update(base,true);
        }
    };
    var fuel = {
        fuelbox : null,
        fuelSpawned : false,
        spawnFuel : function(){
            var fuelImg = loader.getResult("fuel");
            this.fuelbox = new createjs.Bitmap(fuelImg);

            setRandomAnyCoordinates(this.fuelbox);
            this.fuelbox.regX = 10;
            this.fuelbox.regY = 10;
            this.fuelbox.scaleX = this.fuelbox.scaleY = game.scale;
            this.fuelbox.name = 'fuel';

            game.mainContainer.addChild(this.fuelbox);
        }
    };
    var minerals = {
        maxMineralOnScreen : 25,
        mineralsArr : [],
        addMineral : function() {
            var shipSpriteSheet = new createjs.SpriteSheet({
                // image to use
                images: ['img/mineralSprite.png'],
                // width, height & registration point of each sprite
                frames: {width: 20, height: 20, regX: 10, regY: 10},
                animations: {
                    animate: [0, 15, "animate"]
                }
            });
            var mineral = new createjs.Sprite(shipSpriteSheet);
            setRandomAnyCoordinates(mineral);
            mineral.name = "mineral";
            mineral.regX = 10;
            mineral.regY = 10;
            mineral.scaleX = mineral.scaleY = game.scale;

            this.mineralsArr.push(mineral);
            game.mainContainer.addChild(mineral);
            game.grid.update(mineral, true);
            //debugger;
            //mineral.cache(-mineral.spriteSheet._frameWidth/2, -mineral.spriteSheet._frameHeight/2, mineral.spriteSheet._frameWidth, mineral.spriteSheet._frameHeight);
        },
        spawnMinerals : function(one) {
            if(one) {
                minerals.addMineral();
                return;
            }
            for (var i = 0; i < this.maxMineralOnScreen; i++) {
                this.addMineral();
            }

        }
    };
    var stars = {
        howManyStars : 50,
        starsArr : [],
        speed : 3,
        step : 1,
        stopped : false,
        addStar : function() {
            var star = new createjs.Shape();
            var x = -300;
            var y;


            y = getRandomInt(1, game.getMapSize.h);
            this.starsArr.push(star);

            star.graphics.beginFill("#ffffff").drawRect(x, y, 1, 1);
            star.name = 'star';
            game.mainContainer.addChild(star);
        },
        moveStar : function(star) {
            var self = this;
            var individualSpeed =  getRandomInt(1, 10);
            var moving = setInterval(function(){
                star.x+=self.step*individualSpeed;
                if(self.stopped) {
                    clearInterval(moving);
                }
                if(star.x>game.getMapSize.w) {
                    star.x = 0;
                    star.y =  getRandomInt(1, game.getMapSize.h);
                    individualSpeed = getRandomInt(1, 10);
                }
            }, 30);
        },
        spawnStars : function() {
            var self = this;
            for (var i = 0; i < this.howManyStars; i++) {
                this.addStar();
            }
            this.starsArr.forEach(function(elem, i) {
                var randTimeout = getRandomInt(50*i, 5000);
                setTimeout(function(){
                    self.moveStar(elem);
                },randTimeout);
            })
        }
    };
    var asteroids = {
        holdOn:false,
        howMuchAsteroids:25,
        asteroidsArr:[],
        stop:false,
        createAsteroid:function(){
            var asteroidImg = loader.getResult("asteroid");
            var asteroid = new createjs.Bitmap(asteroidImg);

            setRandomCoords(asteroid);
            asteroid.name = "asteroid";
            asteroid.regX = asteroid.image.width/2;
            asteroid.regY = asteroid.image.height/2;

            return asteroid;
        },
        addAsteoird:function(){
            var newAsteroid = this.createAsteroid();

            this.asteroidsArr.push(newAsteroid);
            game.mainContainer.addChild(newAsteroid);
            //newAsteroid.cache(-newAsteroid.image.width/2, -newAsteroid.image.height/2, newAsteroid.image.width*2, newAsteroid.image.height*2);
        },
        moveAsteroid : function(asteroid) {
            var self = this;
            var individualXSpeed = getRandomInt(-2,2);
            var individualYSpeed = getRandomInt(-2,2);

            individualXSpeed === 0 ? individualXSpeed += 2: null;
            var moving = function(){
                asteroid.rotation+=individualXSpeed;
                asteroid.x+=individualXSpeed;
                asteroid.y+=individualYSpeed;

                if(asteroid.x < 0 || asteroid.x>game.getMapSize.w || asteroid.y > game.getMapSize.h || asteroid.y < 0) {
                    setRandomCoords(asteroid);
                    individualXSpeed = getRandomInt(-2,2);
                    individualYSpeed = getRandomInt(-2,2);
                }

                game.grid.update(asteroid, true);
            };
            createjs.Ticker.addEventListener("tick", moving);
        },
        spawnAsteroids : function(){
            var self = this;
            for (var i = 0; i < this.howMuchAsteroids; i++) {
                    self.addAsteoird();
            }
            self.asteroidsArr.forEach(function(elem, i) {
                    self.moveAsteroid(elem);
            });
        }
    };
    var enemies = {
        enemyTypes : {
                smallShip:{
                    img:"enemy_1"
                }
            },
        speed : 1,
        minStopRange:100,
        maxStopRange:200,
        enemiesOnStage:[],
        enemiesMoved : false,
        countEnemies:function(){

        },
        removeEnemy:function(enemy){
            var index = this.enemiesOnStage.indexOf(enemy);
            this.enemiesOnStage.splice(index,1);
            clearInterval(enemy.firing);
            game.grid.delItemFromGrid(enemy);
            game.mainContainer.removeChild(enemy);
        },
        addEnemy :function(options){
            var options = options || {};
            var currEnemy;
            var currEnemyType = options.type || "smallShip";
            var enemy_Img = loader.getResult(this.enemyTypes[currEnemyType].img);
            currEnemy = new createjs.Bitmap(enemy_Img);
            currEnemy.name = "enemy";

            if(options.coordinates) {
                currEnemy.x = options.coordinates.x;
                currEnemy.y = options.coordinates.y;
            } else {
                setRandomAnyCoordinates(currEnemy);
            }
            currEnemy.regX = currEnemy.image.width/2;
            currEnemy.regY = currEnemy.image.height/2;

            currEnemy.vectorLength = 0;
            this.enemiesOnStage.push(currEnemy);
            game.mainContainer.addChild(currEnemy);
            currEnemy.firing = setInterval(function(){
                if(currEnemy.vectorLength > 0 && currEnemy.vectorLength < 300) {
                    enemyBullets.spawnBullet(currEnemy);
                }
            },3000);
            if(!this.enemiesMoved) {
                this.moveEnemies();
                this.enemiesMoved = true;
            }
            return currEnemy;
        },
        moveEnemies : function(){
            var self = this;
            var ship = require('SpaceShip');
            createjs.Ticker.addEventListener("tick", function(){
                if(self.enemiesOnStage.length > 0) {
                    self.enemiesOnStage.forEach(function(enemy, i) {
                        var vectorLength;
                        var shipCoords = game.mainContainer.globalToLocal(ship.ship.x,ship.ship.y);
                        var angle = Math.atan2(enemy.y-shipCoords.y, enemy.x-shipCoords.x)/ Math.PI * 180;
                        vectorLength = Math.sqrt(((enemy.y-shipCoords.y)*(enemy.y-shipCoords.y)) + ((enemy.x-shipCoords.x)*(enemy.x-shipCoords.x)));

                        var updatePositionWhileSlide = function(){
                            enemy.oldCoords = {
                                x:enemy.x,
                                y:enemy.y
                            };
                            enemy.newCoords = {
                                x: enemy.x-Math.cos((angle+45)/180*Math.PI)*self.speed/2,
                                y: enemy.y-Math.sin((angle+45)/180*Math.PI)*self.speed/2
                            };

                            if(enemy.newCoords.x > game.getMapSize.w || enemy.newCoords.x<0 ) {
                                enemy.x = enemy.oldCoords.x;
                            } else {
                                enemy.x = enemy.newCoords.x;
                            }
                            if(enemy.newCoords.y > game.getMapSize.h || enemy.newCoords.y<0) {
                                enemy.y = enemy.oldCoords.y;
                            } else {
                                enemy.y = enemy.newCoords.y;
                            }
                        };
                        var updatePositionWhileMove = function(){
                            enemy.oldCoords = {
                                x:enemy.x,
                                y:enemy.y
                            };
                            enemy.newCoords = {
                                x: enemy.x-Math.cos(angle/180*Math.PI)*self.speed,
                                y: enemy.y-Math.sin(angle/180*Math.PI)*self.speed
                            };
                            if(enemy.newCoords.x > game.getMapSize.w || enemy.newCoords.x<0) {
                                enemy.x = enemy.oldCoords.x;
                            } else {
                                enemy.x = enemy.newCoords.x;
                            }
                            if(enemy.newCoords.y > game.getMapSize.h || enemy.newCoords.y<0) {
                                enemy.y = enemy.oldCoords.y;
                            } else {
                                enemy.y = enemy.newCoords.y;
                            }
                        };
                        enemy.rotation = angle;
                        enemy.vectorLength = vectorLength;
                        if(vectorLength < self.maxStopRange && vectorLength > self.minStopRange) {
                            updatePositionWhileSlide();
                            game.grid.update(enemy, true);
                        } else if(vectorLength < self.maxStopRange) {
                            //do nothing
                        } else {
                            updatePositionWhileMove();
                            game.grid.update(enemy, true);
                        }
                    });
                }
            });
        }
    };
    var bullets = {
        bulletsMoved : false,
        bulletsArr:[],
        bulletsSpeed:12,
        spawnBullet:function(ship){
            var bulletImg = loader.getResult("bullet");
            var bullet = new createjs.Bitmap(bulletImg);

            bullet.x = ship.x;
            bullet.y = ship.y;
            bullet.name = "playerBullet";
            game.grid.update(bullet);

            //bullet.regX = bullet.image.width/2;
            bullet.regY = bullet.image.height/2;
            bullet.rotation = ship.rotation;

            this.bulletsArr.push(bullet);
            game.stage.addChild(bullet);
            this.moveBullet(bullet);
        },
        removeBullet:function(bullet){
            var index = this.bulletsArr.indexOf(bullet);
            this.bulletsArr.splice(index,1);
            createjs.Ticker.removeEventListener("tick", bullet.moving);
            game.grid.delItemFromGrid(bullet);
            game.stage.removeChild(bullet);
        },
        moveBullet : function(bullet){
            var self = this;
            var bulletRemoved = false;
            bullet.moving = function(){
                var currCoords = {
                    x:bullet.x,
                    y:bullet.y
                };
                var newCoords = {
                    x: bullet.x + Math.cos(bullet.rotation/180*Math.PI)*self.bulletsSpeed,
                    y: bullet.y + Math.sin(bullet.rotation/180*Math.PI)*self.bulletsSpeed
                };
                var newCoordsLocal = game.mainContainer.globalToLocal(newCoords.x,newCoords.y);
                if(!bulletRemoved) {
                    if(newCoordsLocal.x < 0 || newCoordsLocal.y < 0 || newCoordsLocal.x >= game.getMapSize.w || newCoordsLocal.y >= game.getMapSize.h) {
                        self.removeBullet(bullet);
                        return;
                    }
                    bullet.x += Math.cos(bullet.rotation/180*Math.PI)*self.bulletsSpeed;
                    bullet.y += Math.sin(bullet.rotation/180*Math.PI)*self.bulletsSpeed;
                    game.grid.update(bullet);
                }
            };

            createjs.Ticker.addEventListener("tick", bullet.moving);
            setTimeout(function(){
                createjs.Ticker.removeEventListener("tick", bullet.moving);
                if(bullet) {
                    game.stage.removeChild(bullet)
                }
            },1000);

        }
    };
    var enemyBullets = {
        bulletsMoved : false,
        bulletsArr:[],
        bulletsSpeed:6,
        spawnBullet:function(ship){
            var bulletImg = loader.getResult("bullet1");
            var bullet = new createjs.Bitmap(bulletImg);

            bullet.x = game.mainContainer.localToGlobal(ship.x,ship.y).x;
            bullet.y = game.mainContainer.localToGlobal(ship.x,ship.y).y;

            //bullet.regX = bullet.image.width/2;
            bullet.regY = bullet.image.height/2;
            bullet.rotation = ship.rotation+getRandomInt(-15,15);
            bullet.name = 'enemyBullet';
            bullet.power = 4;

            this.bulletsArr.push(bullet);
            game.stage.addChild(bullet);
            game.grid.update(bullet);
            this.moveBullet(bullet);
        },
        removeBullet:function(bullet){
            var index = this.bulletsArr.indexOf(bullet);
            this.bulletsArr.splice(index,1);
            createjs.Ticker.removeEventListener("tick", bullet.moving);
            game.grid.delItemFromGrid(bullet);
            game.stage.removeChild(bullet);
        },
        moveBullet : function(bullet){
            var self = this;
            var bulletRemoved = false;

            var updatePositionWhileMove = function(bullet){
                bullet.currCoords = {
                    x:bullet.x,
                    y:bullet.y
                };
                bullet.newCoords = {
                    x: bullet.x - Math.cos(bullet.rotation/180*Math.PI)*self.bulletsSpeed,
                    y: bullet.y - Math.sin(bullet.rotation/180*Math.PI)*self.bulletsSpeed
                };
                var newCoordsLocal = game.mainContainer.globalToLocal(bullet.newCoords.x, bullet.newCoords.y);
                if(!bulletRemoved) {
                    if(newCoordsLocal.x < 0 || newCoordsLocal.y < 0 || newCoordsLocal.x >= game.getMapSize.w || newCoordsLocal.y >= game.getMapSize.h) {
                        self.removeBullet(bullet);
                        return;
                    }
                    bullet.x = bullet.newCoords.x;
                    bullet.y = bullet.newCoords.y;
                }
            };

            bullet.moving = function(){
                updatePositionWhileMove(bullet);
                game.grid.update(bullet);
            };

            createjs.Ticker.addEventListener("tick", bullet.moving);
            setTimeout(function(){
                createjs.Ticker.removeEventListener("tick", bullet.moving);
                if(bullet) {
                    game.grid.delItemFromGrid(bullet);
                    game.stage.removeChild(bullet);
                }
            },1000);

        }
    };
    var collectableItems = {
        itemsArr:[],
        types : {
            coin:{
                createItem:function(){
                    var itemImg = loader.getResult('coin');
                    var item = new createjs.Bitmap(itemImg);
                    item.regX = item.image.width;
                    item.regY = item.image.height;

                    return item;
                },
                onCollect:function(elem){
                    var interface = require("interface");
                    game.coins++;
                    interface.update({
                        coins : game.coins
                    });
                }
            },
            fuelbox:{
                img:"fuel",
                onCollect:function(){

                }
            },
            ammoBox:{
                img:"ammoBox",
                onCollect:function(){

                },
                ammoBonus:20
            },
            rareMineral:{
                createItem:function(){
                    var itemImg = loader.getResult('rareMineral');
                    var shipSpriteSheet = new createjs.SpriteSheet({
                        // image to use
                        images: [itemImg],
                        // width, height & registration point of each sprite
                        frames: {width: 25, height: 20, regX: 17, regY: 10},
                        animations: {
                            animate: [0, 5, 'animate', 0.25]
                        }
                    });
                    var item = new createjs.Sprite(shipSpriteSheet);
                    item.gotoAndPlay('animate');
                    return item;
                },
                onCollect:function(elem){
                    var interface = require("interface");
                    game.coins++;
                    interface.update({
                        coins : game.coins
                    });
                },
                isAnimated:true
            }
        },
        /**
         * Spawn item in coords
         * @param {Object} options
         *
         * Example
         *   require('itemsSpawner').collectableItems.spawnItem({
         *      type:"coin",
         *      randomCoords:true,  //Optional //removed
         *      //or
         *      coords: {           //Optional, can be Random without this property
         *          x:100,
         *          y:100
         *      },
         *      isMoving:true
         *   });
         */
        spawnItem : function(options){
            var self = this;
            var itemType = options.type || 'coin';
            var coords = (function(){
                 if(options.coords) {
                     return options.coords;
                 } else {
                     return setRandomCoords({});
                 }
            }());
            var item = self.types[itemType].createItem();
            var movingSpeed = 2;
            var friction = 0.7;
            var randDirection = function(){
                if(Math.random()>0.5) {
                    return 1;
                } else {
                    return -1;
                }
            };

            item.gametype = itemType;
            item.x = coords.x;
            item.y = coords.y;
            item.name = "collectable";
            item.onCollect = this.types[itemType].onCollect;

            if(item.x<game.mapPadding) { item.x += game.mapPadding; }
            if(item.y<game.mapPadding) { item.y += game.mapPadding; }

            game.grid.update(item, true);

            //self managed items array
            this.itemsArr.push(item);

            //add item to stage
            game.mainContainer.addChild(item);

            if(options.isMoving === true) {
                var individualXSpeed = parseFloat(parseInt(Math.random()*15*randDirection(), 10)) || 1;
                var individualYSpeed = parseFloat(parseInt(Math.random()*15*randDirection(), 10)) || 1;
                var move = setInterval(function(){
                    individualXSpeed *= friction;
                    individualYSpeed *= friction;

                    item.x += individualXSpeed*friction;
                    item.y += individualYSpeed*friction;
                },30);

                setTimeout(function(){
                    clearInterval(move);
                },500);
            }
        }
    };
    var initAll = function(){
        minerals.spawnMinerals();
        stars.spawnStars();
        asteroids.spawnAsteroids();
    };

    return {
        initAll:initAll,
        fuel:fuel,
        minerals:minerals,
        stars:stars,
        asteroids:asteroids,
        bullet:bullets,
        enemies:enemies,
        collectableItems:collectableItems,
        enemyBullets:enemyBullets,
        base:base,
        spawnMinerals: minerals.spawnMinerals,
        spawnFuel: fuel.spawnFuel,
        spawnStars: stars.spawnStars,
        spawnAsteroids: asteroids.spawnAsteroids,
        spawnBullet: bullets.spawnBullet,
        elems:{
            minerals:minerals.mineralsArr,
            asteroids:asteroids.asteroidsArr,
            fuel:fuel.fuelbox
        }
    };
});