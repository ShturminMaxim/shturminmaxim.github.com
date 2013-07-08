define(['./mediator'], function(mediator) {
	//define menu module
	var container = $('.game-container');
	var menu_box = $('<div/>', {
		id:'menu-box'
	});

	var start_button = $('<div/>', {
		class : 'start-button',
		text: 'Start the Game!'
	});

	return (function() {
		container.append(menu_box);
		menu_box.append(start_button);
		start_button.bind('click', function() {
			console.log('start');
			mediator.publish('start-game');
			menu_box.hide();
		});
	}());
});