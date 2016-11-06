/**
 * Created by Max on 10.02.2015.
 */
define([
    'game',
    'interface',
    'itemsSpawner',
    'mediator'
],function(game, interface, itemsSpawner, mediator){
    //var game = require('game');
    var scale = 1;//window.devicePixelRatio || 1;
    var step = 3;
    var rotationSpeed = 4;
    var maxShield = 50;
    var shield = 50;
    var fuel = 60;
    var maxFuel = 60;
    var ammo = 60;
    var maxAmmo = 60;
    var holdOn = false;
    var ship;
    var shipSpriteSheet;
    var fuelSpawned = false;
    var mapHeight = game.getMapSize.h;
    var mapWidth = game.getMapSize.w;

    var init = function(shipType){
        var shipType = shipType || 'smallShip';
        var shipsSprites = require('mainData').shipsSprites;
        shipSpriteSheet = new createjs.SpriteSheet(shipsSprites[shipType]);
        ship = new createjs.Sprite(shipSpriteSheet, "fly");
        ship.baseState = {
            x:200,
            y:250,
            rotation:90
        };
        ship.gotoAndPlay("fly");
        ship.name = "ship";
        ship.x = ship.baseState.x;//game.stage.canvas.width/2;
        ship.y = ship.baseState.y;
        ship.rotation = 90;
        ship.scaleX = ship.scaleY = scale;

        game.stage.addChild(ship);
        startUsingFuel();
        moveShip();
    };
    function moveShip() {
        mapHeight = game.getMapSize.h;
        mapWidth = game.getMapSize.w;
        //var shipCoords;
        ship.oldCoords = {
            x:ship.x,
            y:ship.y
        };
        ship.newCoords = {
            x:ship.x + Math.cos(ship.rotation/180*Math.PI)*step,
            y:ship.y + Math.sin(ship.rotation/180*Math.PI)*step
        };
        if(ship.newCoords.x > game.stage.canvas.width || ship.newCoords.x<0) {
            ship.x = ship.oldCoords.x;
        } else {
            ship.x = ship.newCoords.x;
        }
        if(ship.newCoords.y > game.stage.canvas.height || ship.newCoords.y<0) {
            ship.y = ship.oldCoords.y;
        } else {
            ship.y = ship.newCoords.y;
        }

        game.grid.update(ship);

        if(ship.x<game.stage.canvas.width/2-game.mapPadding) {
            if(game.mainContainer.x - Math.cos(ship.rotation/180*Math.PI)*step < 0 && ship.x < ship.oldCoords.x) {
                ship.x = ship.oldCoords.x;
                game.mainContainer.x -= Math.cos(ship.rotation/180*Math.PI)*step;
            }
        }

        if(ship.y<game.stage.canvas.width/2-game.mapPadding) {
            if(game.mainContainer.y - Math.sin(ship.rotation/180*Math.PI)*step < 0 && ship.y < ship.oldCoords.y) {
                ship.y = ship.oldCoords.y;
                game.mainContainer.y -= Math.sin(ship.rotation/180*Math.PI)*step;
            }
        }
        if(ship.x>game.stage.canvas.width/2+game.mapPadding) {
            console.log(game.mainContainer.x, mapWidth);
            if(game.mainContainer.x - Math.cos(ship.rotation/180*Math.PI)*step - game.stage.canvas.width > -mapWidth && ship.x > ship.oldCoords.x) {
                ship.x = ship.oldCoords.x;
                game.mainContainer.x -= Math.cos(ship.rotation/180*Math.PI)*step;
            }
        }

        if(ship.y>game.stage.canvas.height/2+game.mapPadding) {
            if(game.mainContainer.y - Math.sin(ship.rotation/180*Math.PI)*step - game.stage.canvas.height > -mapHeight && ship.y > ship.oldCoords.y) {
                ship.y = ship.oldCoords.y;
                game.mainContainer.y -= Math.sin(ship.rotation/180*Math.PI)*step;
            }
        }

        if(game.rotateLeft) {
            ship.rotation -= rotationSpeed;
        }
        if(game.rotateRight) {
            ship.rotation += rotationSpeed;
        }
    }
    function startUsingFuel(){
        setInterval(function(){
            fuel--;
            mediator.trigger('interfaceUpdate', {
                fuel : fuel
            });
            if(fuel < maxFuel/3 && !fuelSpawned) {
                require('itemsSpawner').fuel.spawnFuel();
                fuelSpawned = true;
            }
        },1500);
    }
    var refuel = function(){
        fuel = maxFuel;
    };
    var shoot = function(){
        if(ammo>0) {
            ammo--;
            interface.update({
                ammo : ammo
            });
            itemsSpawner.bullet.spawnBullet(ship);
        }
    };

    /**
     * Ship Events
     */

    /**
     * @param data - object
     * when ship hit
     */
    mediator.on('ShipHit',function(data){
        var hitPower = data.hitElem && data.hitElem.power || 2;
        shield -= hitPower;
        interface.update({
            shield : shield
        });
    });
/*
    window.addEventListener('keydown', function(e) {
        e.preventDefault();
        if(e.keyCode === 32) {
            console.log('down space');
            shoot();
        }
    });
*/

    return {
        init:init,
        get ship (){
            return ship;
        },
        shoot:shoot,
        move : moveShip,
        maxFuel:maxFuel,
        getFuel:function(){
          return fuel;
        },
        refuel : refuel
    }
});