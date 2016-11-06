define(['./mediator'/*, './kolobok'*/], function(mediator/*, kolobok*/) {
	///think

	return {
		container: $('.game-container'),
		container_edges : [6,351],
		bg_img_url : './img/background-ground.png',
		plate_img: './img/cloud.png',
		player: $('<div/>', {class:'kolobok'}),
		player_img: './img/kolobok.png',
		/*player_top : this.player.offset().top,
		player_bottom : this.player.offset().top + player.height(),
		player_left : this.player.offset().left,
		player_right : this.player.offset().left + player.width(),*/
		current_actions:{}
	};
});