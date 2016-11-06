define(['./mediator', './static_data', './actions', './plates'], function(mediator, static_data, actions, plates) {
	// initial player data
	//var player = static_data.player;
	var speed = 0,
		power = 0.2,
		friction = 0.95,

		gravitation = 0.95,
		jump_speed = 0,
		jump_power = 0.3,
		jump_height = 100,
		jump_start_position,

		position_x = 15,
		position_y = 415,

		gound_position = 415,

		is_flying = false,
		fly_up = false,
		is_faling = false,

		player_stand_pos = null,

		is_on_the_plate = false,

		current_plate_data = {
			rightside: null,
			leftside: null
		},
		is_alive = true;


	var player,
		player_center;
	/*= {
			player_bottom: 	null,
			player_left:	null,
			player_right: 	null,
			player_center: 	null
		}*/


	var fall_down = function() {
		is_on_the_plate = false;
		var myplates = $(plates.array_of_plates);
		player = $(static_data.player);
		player_bottom = player.offset().top + player.height();
		player_left = player.offset().left;
		player_right = player.offset().left + player.width();
		player_center = player.offset().left + (player.width() / 2);

		var falling_down = setInterval(function() {
			is_faling = true;

			//console.log(myplates);
			myplates.each(function(i, plate) {
				//console.log(player_center);
				var plate_coords = $(plate).offset();
				var plate_top = plate_coords.top;
				var plate_left = plate_coords.left;
				var plate_right = plate_coords.left + $(plate).width();
				var plate_v_center = plate_coords.top + ($(plate).height() / 2);

				if (plate_v_center > player_bottom) {
					//console.log("check-1 true plate under player");
					if (player_center > plate_left && player_center < plate_right) {
						//console.log("check-2 true player above plate");
						if (player_stand_pos) {
							if (plate_v_center < player_stand_pos) {
								player_stand_pos = plate_v_center-40;

							}
						} else {
							player_stand_pos = plate_v_center-40;
						}
						is_on_the_plate = true;
						current_plate_data.rightside = plate_right;
						current_plate_data.leftside = plate_left;
						current_plate_data.center = plate_v_center;
						//console.log(current_plate_data, player_stand_pos);
						return false;
					}
				}

			});

			if (!is_on_the_plate) {
				player_stand_pos = gound_position;
			} else {
				player_stand_pos = current_plate_data.center-40;
			}

			if (position_y - jump_speed >= player_stand_pos) {
				clearInterval(falling_down);
				is_faling = false;
				is_flying = false;
			}
		}, 15);
	};

	return {
		update: function() {

			if (Object.keys(actions.active_key).length) {
				for (var action in actions.active_key) {
					var move = action;
					if (move === 'left') {
						this.move_left();
					}
					if (move === 'right') {
						this.move_right();
					}
					if (move === 'jump') {
						this.jump();
					}
				}
			} else {
				if (speed < 2 && speed > -2) {
					speed = 0;
				}
				if (!is_flying && !is_faling) {
					if (jump_speed < 2) {
						jump_speed = 0;
					}
				}
			}

			position_x += speed;
			if (fly_up) {
				position_y -= jump_speed;
				jump_speed *= gravitation;
			}
			if (is_faling) {
				jump_speed -= jump_power;
				position_y -= jump_speed;
				//jump_speed *= gravitation;
			}

			speed *= friction;

			this.update_pos();
		},
		update_pos: function() {
			//console.log(static_data.container_edges);
			if(position_x <= static_data.container_edges[0]) {
				position_x = static_data.container_edges[0];
			}
			if(position_x >= static_data.container_edges[1]) {
				position_x = static_data.container_edges[1];
			}
			static_data.player.offset({
				top: position_y.toFixed(0),
				left: position_x.toFixed(0)
			});

			if (is_on_the_plate) {
				player_center = player.offset().left + (player.width() / 2);
				//console.log(player_center, current_plate_data);
				if (player_center > current_plate_data.rightside || player_center < current_plate_data.leftside) {
					console.log('fall',fly_up);
					if (!fly_up) {
						fall_down();
					}
				}
			}

		},
		jump: function() {
			if (!is_flying) {
				is_flying = true;
				fly_up = true;
				jump_speed = 4;
				jump_start_position = position_y;

				var flyup = setInterval(function() {
					jump_speed += jump_power;
					if (position_y <= jump_start_position - jump_height) {
						clearInterval(flyup);
						fly_up = false;
						fall_down();
					}
				}, 30);

			}
		},
		death: function() {
			if (is_alive) {
				is_alive = false;
				mediator.publish('player dead');
			}
		},
		move_left: function() {
			// TODO animate
			speed -= power;
		},
		move_right: function() {
			// TODO animate
			speed += power;
		}
	};
});