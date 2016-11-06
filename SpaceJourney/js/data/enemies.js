define(['game','SpaceShip','loader'],function(game, ship, loader){
/*    var enemyTypes = {
        smallShip:{
            img:"enemy_1"
        }
    };
    var step = 3;
    var cuurEnemyType = "smallShip";
    var enemy_Img = loader.getResult(enemyTypes[cuurEnemyType].img);
    var currEnemy = new createjs.Bitmap(enemy_Img);
    var enemiesOnStage = [];
    var enemiesMoved = false;

    var addEnemy = function(type){
        cuurEnemyType = type;
        enemy_Img = loader.getResult(enemyTypes[cuurEnemyType].img);
        currEnemy = new createjs.Bitmap(enemy_Img);
        currEnemy.x = 100;
        currEnemy.y = 100;
        currEnemy.regX = currEnemy.image.width/2;
        currEnemy.regY = currEnemy.image.height/2;

        enemiesOnStage.push(currEnemy);
        game.mainContainer.addChild(currEnemy);

        if(!enemiesMoved) {
            moveEnemies();
            enemiesMoved = true;
        }
        return currEnemy;
    };
    var moveEnemies = function(){
        var self = this;
        createjs.Ticker.addEventListener("tick", function(){
             if(enemiesOnStage.length > 0) {
                 enemiesOnStage.forEach(function(enemy, i) {
                     var shipCoords = game.mainContainer.globalToLocal(ship.ship.x,ship.ship.y);
                     var angle = Math.atan2(enemy.y-shipCoords.y, enemy.x-shipCoords.x)/ Math.PI * 180;
                     //console.log(angle);
                     enemy.rotation = angle;
                     //console.log(Math.cos(angle/180*Math.PI)*step);
                     enemy.x -= Math.cos(angle/180*Math.PI)*step;
                     enemy.y -= Math.sin(angle/180*Math.PI)*step;
                 });
             }
        });
        createjs.Ticker.RAF = true;
        createjs.Ticker.setFPS(30);
    };

    return {
        init:addEnemy
    }*/
});