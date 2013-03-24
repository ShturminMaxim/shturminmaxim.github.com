$(function() {
	var game_menu = $('.game-menu');
	var start_menu_button = $('.start-game');

	game_menu.show();

	start_menu_button.on('click', function() {
		game_menu.hide();
		new Ninja();
		new Enemy_object();
		new Counter();
	});
/*
	new Ninja();
	new Enemy_object();
	new Counter();*/
});
