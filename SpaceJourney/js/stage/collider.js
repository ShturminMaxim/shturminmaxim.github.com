/**
 * Created by Max on 10.02.2015.
 */
define([
    'game',
    'SpaceShip',
    'itemsSpawner',
    'effects',
    'interface',
    'mediator'
],function(game, SpaceShip, itemsSpawner, effects, interface, mediator){
    var colliders = [
        /**
         * NEW OPTIMISED Collision detect for Ship
         * @param ship
         */
        function(ship){
            var currGridCell = ship.currGridCell;
            var elements = game.grid.getGridElems(currGridCell);
            var holdOn = false;
            var intersection;
            var elem;
            //console.log(elements.length);
            for(var i = 0;i<elements.length;i++) {
                elem = elements[i];
                switch(elem.name) {
                    case "asteroid":
                        intersection = ndgmr.checkPixelCollision(elem,ship);
                        if(intersection) {
                            console.log('intersect asteroid');
                            if(!holdOn) {
                                holdOn = true;
                                mediator.trigger('createBlow',{
                                    x:elem.x,
                                    y:elem.y,
                                    destroyedElem:elem
                                });

                                elements.splice(i, 1);
                                game.grid.delItemFromGrid(elem);
                                if(game.shield > 0) {
                                    game.shield -=5;
                                    interface.update({
                                        shield : game.shield
                                    });
                                } else {
                                    //message.innerHTML = "You died";
                                    //message.style.display = "block";
                                    //createjs.Ticker.removeEventListener("tick", gameProcess);
                                }
                                setTimeout(function(){
                                    holdOn = false;
                                },1000);
                            }
                        }
                        break;
                    case "mineral":
                        intersection = ndgmr.checkPixelCollision(elem,ship);
                        if(intersection) {
                            console.log('intersect mineral');
                            elements.splice (i, 1);
                            game.grid.delItemFromGrid(elem);
                            game.mainContainer.removeChild(elem);
                            itemsSpawner.spawnMinerals(1);
                            game.score++;
                            interface.update({
                                score : game.score
                            });
                            return;
                        }
                        break;
                    case "collectable" :
                        var intersection = ndgmr.checkPixelCollision(elem, ship);
                        if(intersection) {
                            console.log('intersect collectable');
                            elem.onCollect();
                            var index = itemsSpawner.collectableItems.itemsArr.indexOf(elem);
                            itemsSpawner.collectableItems.itemsArr.splice(index,1);
                            game.grid.delItemFromGrid(elem);
                            game.mainContainer.removeChild(elem);
                        }
                        break;
                    case "base" :
                        var intersection = ndgmr.checkPixelCollision(elem, ship);
                        if(intersection) {
                            console.log('base');
                            game.pauseGame();
                            interface.ingameMenu.show();
                        }
                        break;
                    case "enemyBullet" :
                        var intersection = ndgmr.checkPixelCollision(elem, ship);
                        if(intersection) {
                            mediator.trigger('ShipHit', {
                                hitElem:elem
                            });
                            itemsSpawner.enemyBullets.removeBullet(elem);
                        }
                        break;
                    default:
                        break;
                }
            }
        },
        /**
         * NEW OPTIMISED Collision detect for Bullet
         * @param ship
         */
        function(ship){
            var arr = itemsSpawner.bullet.bulletsArr;
            var bullet;
            var currGridCell;
            var elements;
            var elem;
            var intersection;

            if(arr.length<1)
                return;

            /**
             * for each bullet check collision
             */
            for(var i = 0 ; i < arr.length; i++){
                bullet = arr[i];
                currGridCell = bullet.currGridCell;
                elements = game.grid.getGridElems(currGridCell);
                if(elements.length < 2) {
                    continue;
                }

                /**
                 * for each element in nearest grid cells check collision
                 */
                for(var j = 0; j < elements.length; j++){
                    elem = elements[j];

                    switch(elem.name) {
                        case "asteroid":
                            intersection = ndgmr.checkPixelCollision(elem, bullet);
                            if(intersection) {
                                mediator.trigger('createBlow',{
                                    x:elem.x,
                                    y:elem.y,
                                    destroyedElem:elem
                                });
                                elements.splice(i, 1);
                                game.grid.delItemFromGrid(elem);
                                itemsSpawner.bullet.removeBullet(bullet);
                            }
                            break;
                        case "enemy" :
                            intersection = ndgmr.checkPixelCollision(elem, bullet);
                            if(intersection) {
                                game.stage.removeChild(bullet);
                                mediator.trigger('createBlow',{
                                    x:elem.x,
                                    y:elem.y,
                                    blowType:'bigBlow'
                                });
                                itemsSpawner.collectableItems.spawnItem({
                                    type:"coin",
                                    coords:{
                                        x:elem.x,
                                        y:elem.y
                                    },
                                    isMoving:true
                                });

                                clearInterval(elem.firing);
                                itemsSpawner.enemies.removeEnemy(elem);
                                itemsSpawner.enemies.addEnemy();
                            }
                        default:
                            break;
                    }
                }
            }
        }
    ];

    return {
        add:function(collider){
            colliders.push(collider);
        },
        remove:function(colliderName){
            for(var i; i< colliders.length;i++){
                if(colliders[i].name === colliderName) {
                    colliders.splice(i,1);
                }
            }
        },
        check:function(){
                for(var i = 0; i< colliders.length;i++){
                    if(colliders[i] && typeof colliders[i] === "function") {
                        colliders[i](SpaceShip.ship);
                    }
                }
        }
    };
});