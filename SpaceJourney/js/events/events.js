define(['game','mediator','SpaceShip','itemsSpawner'], function(game, mediator, ship, itemsSpawner){
    var initGameEvents = function(){
        window.addEventListener('keydown', function(e) {
            e.preventDefault();
            switch (e.keyCode) {
                case 37 :
                    game.rotateLeft = true;
                    break;
                case 39 :
                    game.rotateRight = true;
                    break;
                case 32 :
                    ship.shoot();
                    //itemsSpawner.bullet.spawnBullet(ship);
                    break;
            }
        });

        window.addEventListener('keyup', function(e) {
            e.preventDefault();
            switch (e.keyCode) {
                case 37 :
                    game.rotateLeft = false;
                    break;
                case 39 :
                    game.rotateRight = false;
                    break;
            }
        });

        game.getButtons().firebtn.addEventListener('mousedown',function(){
            ship.shoot();
        });
        game.getButtons().leftBtn.addEventListener('mousedown',function(){
            game.rotateLeft = true;
        });
        game.getButtons().rightbtn.addEventListener('mousedown',function(){
            game.rotateRight = true;
        });
        game.getButtons().leftBtn.addEventListener('pressup',function(){
            game.rotateLeft = false;
        });
        game.getButtons().rightbtn.addEventListener('pressup',function(){
            game.rotateRight = false;
        });
        $('.left-button').on('touchstart',function(){
            game.rotateLeft = true;
        });
        $('.right-button').on('touchstart',function(){
            game.rotateRight = true;
        });
        $('.left-button').on('touchend',function(){
            game.rotateLeft = false;
        });
        $('.right-button').on('touchend',function(){
            game.rotateRight = false;
        });
        $('.fire-button').on('touchstart',function(){
            ship.shoot();
        });
        /**
         * Spawn Events
         */
        mediator.on('spawn-enemy',function(data){
            itemsSpawner.enemies.addEnemy(data);
        });
        mediator.on('spawn-asterodis',function(data){
            itemsSpawner.asteroids.spawnAsteroids(data);
        });
        mediator.on('spawn-minerals',function(data){
            itemsSpawner.minerals.spawnMinerals(data);
        });
    };

    /**
     * Main Game Events
     */
    mediator.on('start-game',function(){
        //game.loadState();
        game.initEnvironment();
        //game.start();
    });

    return {
        initGameEvents:initGameEvents
    }
});