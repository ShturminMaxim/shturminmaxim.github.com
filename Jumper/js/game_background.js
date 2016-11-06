define(['./mediator', './static_data'], function(mediator, static_data) {
	//define game_background module
	// TODO planing to add moving clouds. pretty fun

	return {
		add_to_container : function(container, image_url) {
			container.css({'background':'url('+image_url+') no-repeat'});
		},
		move_down: function() {
			// TODO change background position coordinats when player move to the top
		}
	}
});