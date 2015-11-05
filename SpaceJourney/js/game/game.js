/**
 * Created by Max on 10.02.2015.
 */
define(['loader'], function(loader){
    var canvas = document.getElementById("canvas");
    var stage = new createjs.Stage("canvas");
    var mainContainer = new createjs.Container();
    var currBtn;
    var scale = 1;
    var mapScale = (function(){
        if(devicePixelRatio && devicePixelRatio > 1) {
            return 0.5;
        } else {
            return 1;
        }
    }());
    var mapPadding = 40;
    var coins = 0;
    var skyMap;
    var currentPlanet = {};
    var firebtn;
    var leftBtn;
    var rightbtn;
    var grid = [];
    var createButtons = function(){
        //add Buttons
        currBtn = loader.getResult("leftbtn");
        leftBtn =  new createjs.Bitmap(currBtn);
        leftBtn.regX = leftBtn.image.width/2;
        leftBtn.regY = leftBtn.image.height/2;
        leftBtn.x = (leftBtn.image.width/2)*scale;
        leftBtn.y = canvas.height-((leftBtn.image.height/2)*scale);
        leftBtn.scaleX = leftBtn.scaleY = scale;
        leftBtn.name = 'btn';

        currBtn = loader.getResult("rightbtn");
        rightbtn =  new createjs.Bitmap(currBtn);
        rightbtn.regX = rightbtn.image.width/2;
        rightbtn.regY = rightbtn.image.height/2;
        rightbtn.x = canvas.width-((rightbtn.image.width/2)*scale);
        rightbtn.y = canvas.height-((rightbtn.image.height/2)*scale);
        rightbtn.scaleX = rightbtn.scaleY = scale;
        rightbtn.name = 'btn';

        currBtn = loader.getResult("firebtn");
        firebtn =  new createjs.Bitmap(currBtn);
        firebtn.regX = firebtn.image.width/2;
        firebtn.regY = firebtn.image.height/2;
        firebtn.x = (canvas.width/2);
        firebtn.y = canvas.height-((firebtn.image.height/2)*scale);
        firebtn.scaleX = firebtn.scaleY = scale;
        firebtn.name = 'btn';
    };
    var addButtons = function(){
        stage.addChild(firebtn);
        stage.addChild(leftBtn);
        stage.addChild(rightbtn);
    };
    var addMap = function(){
        var mapImage = loader.getResult("skymap");
        var planetImage = loader.getResult("planet_1");

        skyMap = new createjs.Bitmap(mapImage);
        skyMap.name = "skymap";
        skyMap.scaleX = skyMap.scaleY = mapScale;

        currentPlanet.planet = new createjs.Bitmap(planetImage);
        currentPlanet.planet.name = 'planet';
        currentPlanet.planet.x = skyMap.image.width*mapScale-currentPlanet.planet.image.width*mapScale;
        currentPlanet.planet.y = skyMap.image.height*mapScale-currentPlanet.planet.image.height*mapScale;
        currentPlanet.planet.scaleX = currentPlanet.planet.scaleY = mapScale;

        mainContainer.addChild(skyMap);
        mainContainer.addChild(currentPlanet.planet);
    };
    var grid = {
        cellSize:200,
        container : [],
        init:function(){
            var xCells = Math.ceil(skyMap.image.width/this.cellSize);
            var yCells = Math.ceil(skyMap.image.height/this.cellSize);
            var row;

            for(var i = 0; i <= yCells; i++){
                row = [];

                for(var j = 0; j <= xCells; j++){
                    row.push([]);
                }
                this.container.push(row);
            }

        },
        /**
         * for collision we shoul get 3x3 cells around current cell
         * @param GridCoordinates
         */
        getGridElems:function(GridCoordinates){
            var summaryElementsArray = [];

            for(var x = GridCoordinates.x-1;x<=GridCoordinates.x+1;x++){
                for(var y = GridCoordinates.y-1;y<=GridCoordinates.y+1;y++) {
                    //debugger;
                    if(this.container[y] !== undefined && this.container[y][x] !== undefined)
                        summaryElementsArray = summaryElementsArray.concat(this.container[y][x]);
                }
            }
            return summaryElementsArray;
        },
        update:function(item, inContainer){
            var itemObject;
            if(!inContainer) {
                itemObject = mainContainer.globalToLocal(item.x,item.y);
            } else {
                itemObject = item;
            }
            item.oldGridCell = item.oldGridCell || {
                x:0,
                y:0
            };

            item.currGridCell = {
                x : Math.ceil(itemObject.x/this.cellSize),
                y : Math.ceil(itemObject.y/this.cellSize)
            };

            if((item.currGridCell.x != item.oldGridCell.x) || (item.currGridCell.y != item.oldGridCell.y)) {
                var index = this.container[item.oldGridCell.y][item.oldGridCell.x].indexOf(item);
                if(index != -1) {
                    this.container[item.oldGridCell.y][item.oldGridCell.x].splice(index,1);
                }

                this.container[item.currGridCell.y][item.currGridCell.x].push(item);
                if(item.name && item.name === "mineral")
                    console.log('pushed');
                item.oldGridCell = {
                    x : item.currGridCell.x,
                    y : item.currGridCell.y
                };
            }
        },
        delItemFromGrid:function(item){
            var index = this.container[item.currGridCell.y][item.currGridCell.x].indexOf(item);
            this.container[item.currGridCell.y][item.currGridCell.x].splice(index, 1);
        }
    };
    var loadState = function(){
        var state = require('gameState');

    };
    var initEnvironment = function(){
        var itemsSpawner = require('itemsSpawner');
        addMap();
        grid.init();
        itemsSpawner.base.init();
        itemsSpawner.initAll();
        createjs.Ticker.addEventListener("tick", function(){
            gameState.stage.update();
        });
    };
    var startGame = function(){
        var itemsSpawner = require('itemsSpawner');
        var ship = require('SpaceShip');
        var collider = require('collider');
        var events = require('events');

        createButtons();
        addButtons();

        ship.init();
        createjs.Ticker.addEventListener("tick", function(){
            if(gameState.started && !gameState.paused) {
                ship.move();
                collider.check();
            }
        });
        //createjs.Ticker.RAF = true;
        createjs.Ticker.setFPS(60);
        itemsSpawner.enemies.addEnemy();
        events.initGameEvents();
        this.started = true;

    };
    var pauseGame = function(){
        gameState.paused = true;
    };
    var scenarioState = {
        level:1,
        lastDialog:null
    };
    mainContainer.name = 'mainContainer';
    stage.addChild(mainContainer);

    //canvas options
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //stage options
    createjs.Touch.enable(stage);
    //stage.enableMouseOver();



    var gameState = {
        start: startGame,
        getButtons:function(){
            return {
                leftBtn:leftBtn,
                rightbtn:rightbtn,
                firebtn:firebtn
            }
        },
        pauseGame:pauseGame,
        sendMessage : function(){
            var messageBox = require('interface');
        },
        grid : grid,
        started: false,
        paused: false,
        scale: scale,
        canvas : canvas,
        stage : stage,
        initEnvironment:initEnvironment,
        mainContainer : mainContainer,
        get getMapSize (){
            return {
                w: skyMap && skyMap.image.width*mapScale || 2000,
                h: skyMap && skyMap.image.height*mapScale || 2000
            }
        },
        mapScale:mapScale,
        mapPadding:mapPadding,
        score : 0,
        coins : coins,
        shield : 50,
        rotateLeft : false,
        rotateRight : false
    };

    return gameState;
});
