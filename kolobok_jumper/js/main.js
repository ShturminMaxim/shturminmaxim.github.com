require(['static_data', 'mediator', 'menu', 'kolobok', 'plates', 'game_background','actions'], function(static_data, mediator, menu, kolobok, plates, game_background, actions) {
	///think


	mediator.subscribe('start-game', function() {
		// add backgound image to container all static data in other one file
		game_background.add_to_container(static_data.container, static_data.bg_img_url);

		//plates.add_to_container(static_data.container, static_data.plate);
		plates.add_to_container(static_data.container);
		// add player to container
		static_data.container.append(static_data.player);

		var game_updater = setInterval(function() {
			kolobok.update();
			kolobok.check_collisions();
		},10);

	});


});