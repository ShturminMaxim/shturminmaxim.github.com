require.config({
	baseUrl: 'js/',
	paths: {
		'mainData':'data/mainData',
		'levelsConfig':'data/levelsConfig',
		'mediator' : 'events/mediator',
		'loader' : 'loader',
		'game': 'game/game',
		'gameState':'game/gameState',
		'effects': 'visuals/effects',
		'SpaceShip': 'ship/SpaceShip',
		'enemies': 'data/enemies',
		'collider': 'stage/collider',
		'interface': 'interface/interface',
		'dialog':'interface/dialog',
		'trade':'trade/tradeGoods',
		"itemsSpawner": "stage/itemsSpawner",
		"events": "events/events"
	}
});

require([
	'mainData',
	'levelsConfig',
	'mediator',
	'loader',
	'interface',
	'game',
	'effects',
	"itemsSpawner",
	'SpaceShip',
	'enemies',
	'collider',
	'events'
], function (mainData, 	levelsConfig, mediator, loader, interface, game, effects, itemsSpawner, SpaceShip, enemies, collider, events) {
	loader.addEventListener("complete", function(){
		document.body.addEventListener('touchmove',function(e){
			e.preventDefault();
		});
		$.when(interface.initBaseInterface(gameText)).
			then(function(){
				interface.startMenu.initEvents();
				interface.ingameMenu.initEvents();
			});

		//interface.showStartMenu().then(function(){
/*
			game.start();
			itemsSpawner.initAll();
			SpaceShip.init();
			createjs.Ticker.addEventListener("tick", function(){
				if(game.started && !game.paused) {
					SpaceShip.move();
					game.stage.update();
					collider.check();
				}
				interface.update({
					debug : createjs.Ticker.getMeasuredFPS()
				});
				//console.log(game.grid[1][1].toString());
			});
			//createjs.Ticker.RAF = true;
			createjs.Ticker.setFPS(60);


			itemsSpawner.enemies.addEnemy();

			events.initEvents();*/
		//});
	});
	return true;
});