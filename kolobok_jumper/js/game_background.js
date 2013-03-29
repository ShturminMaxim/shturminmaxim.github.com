define(['./mediator'], function(mediator) {
	//define game_background module
	var container = $('.game-container');

	// TODO planing to add moving clouds. pretty fun

	mediator.subscribe('start-game', function() {
		container.css({'background':'url(./img/background-ground.png) no-repeat'});
		//console.log('add-background');
	});
});