define(['./mediator'], function(mediator) {
	//define kolobok module
	var container = $('.game-container');
	var kolobok = $('<div/>', {
		class:'kolobok'
	});

	mediator.subscribe('start-game', function() {
		container.append(kolobok);
	});
});