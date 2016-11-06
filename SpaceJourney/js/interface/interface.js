/**
 * Created by Max on 10.02.2015.
 */
define(['mediator'],function(mediator){
    var templateParser = function(str, dataObject){
        if(!str || !dataObject) return '';
        return str.replace(new RegExp("{{(.*?)}}","ig"),function(){
            return dataObject[arguments[1]] ? dataObject[arguments[1]] : arguments[0]
        });
        },
    debug,
    scoreContainer,
    shieldContainer,
    fuelContainer,
    message,
    coinsContainer,
    ammoContainer,
    debugCaontainer;

    /**
     * Init interface with chosen language
     * @param gameText
     */
    var initBaseInterface = function(gameText){
        var interface = gameText.interface;
        var interfaceBlock = $('.interface');
        interfaceBlock.html(templateParser(interfaceBlock.html(),interface));


        debug = document.querySelector('.debug');
        scoreContainer = document.querySelector('.score .amount');
        shieldContainer = document.querySelector('.shield');
        fuelContainer =  document.querySelector('.fuelContainer');
        message = document.querySelector('.message');
        coinsContainer = document.querySelector('.coins-count');
        ammoContainer = document.querySelector('.ammo');
        debugCaontainer = document.querySelector('.debug');

        interfaceBlock.show();


        /*ammoContainer.innerHTML = interface.energy;
        fuelContainer.innerHTML = interface.fuel;
        shieldContainer.innerHTML = interface.shield;*/
    };

    /**
     * update HTML inside interface
     * @param data
     */
    var update = function(data){
        if(data.shield)
            shieldContainer.style.width = data.shield*2+"px";
        if(data.score)
            scoreContainer.innerHTML = data.score;

        if(data.fuel)
            fuelContainer.style.height = data.fuel*2+"px";

        if(data.coins)
            coinsContainer.innerHTML = data.coins;

        if(data.ammo)
            ammoContainer.style.width = data.ammo*2+"px";
        if(data.debug)
            debugCaontainer.innerHTML = data.debug;
    };
    var ingameMenu = {
        show:function(){
            document.querySelector('.ingame-menu').style.display = "block";
        },
        hide:function(){
            document.querySelector('.ingame-menu').style.display = "none";
        },
        launchShip:function(){
            var game = require('game');
            var ship;
            if(game.paused === false) {
                game.start();
                this.hide();
            } else {
                this.hide();
                ship = require('SpaceShip');
                ship.ship.x = ship.ship.baseState.x;//game.stage.canvas.width/2;
                ship.ship.y = ship.ship.baseState.y;
                ship.ship.rotation = ship.ship.baseState.rotation;
                game.paused = false;
            }
        },
        initEvents:function(){
            var self = this;
            $('.ing-launch').on('touchstart click', function(){
                self.launchShip();
            });
        }
    };
    var startMenu = {
        show:function(){

        },
        hide:function(){
            document.querySelector('.main-menu-container').style.display = "none";
        },
        initEvents:function(){
            var self = this;
            document.querySelector('.game-start').addEventListener('touchstart', function(){
                console.log('strat trigger');
                mediator.trigger('start-game');
                self.hide();
                ingameMenu.show();
            });

            document.querySelector('.game-start').addEventListener('click', function(){
                console.log('strat trigger');
                mediator.trigger('start-game');
                self.hide();
                ingameMenu.show();
            });

            document.querySelector('.game-credits').addEventListener('touchstart', function(){

            });

            document.querySelector('.game-help').addEventListener('touchstart', function(){

            });
        }
    };

    mediator.on('interfaceUpdate',function(data){
        update(data);
    });

    return {
        initBaseInterface:initBaseInterface,
        update : update,
        ingameMenu:ingameMenu,
        startMenu : startMenu
    }
});
