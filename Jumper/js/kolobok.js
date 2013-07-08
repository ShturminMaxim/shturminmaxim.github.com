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
		default_y_pos = 415,
		is_flying = false,
		fly_up = false,
		fly_down = false,
		plate_stand_h_pos = null,
		is_on_the_plate = false,
		current_plate_data = {rightside:null,leftside:null},
		is_alive = true;


		var player = {
			player_bottom: 	null,
			player_left:	null,
			player_right: 	null,
			player_center: 	null
		}


		var fall_down = function() {
			plate_stand_h_pos = null;
			is_on_the_plate = false;
			jump_start_position = default_y_pos;

			var flydown = setInterval(function(){
				fly_down = true;
				jump_speed -= jump_power;

				if((plate_stand_h_pos && position_y-jump_speed >= plate_stand_h_pos) || position_y-jump_speed >= jump_start_position) {
					//console.log(position_y);
					if(plate_stand_h_pos) {
						position_y = plate_stand_h_pos;
						is_on_the_plate = true;
					} else {
						position_y = jump_start_position;
					}
					jump_speed = 0;
					fly_down = false;
					is_flying = false;
					clearInterval(flydown);
					return;
				}
				position_y -= jump_speed;
			},15);
		};
		//console.log(myplates);
return {
		update: function() {

			if(Object.keys(actions.active_key).length) {
				for(var action in actions.active_key) {
					var move = action;
					if(move === 'left') {
						this.move_left();
					}
					if(move === 'right') {
						this.move_right();
					}
					if(move === 'jump') {
						this.jump();
					}
				}
			}
			position_x += speed;
			if(fly_up) {
				position_y -= jump_speed;
				jump_speed *= gravitation;
			}
			if(fly_down) {
				//jump_speed *= gravitation;
			}

			speed *= friction;
			if(is_on_the_plate) {
				if(player_center > current_plate_data.rightside || player_center < current_plate_data.leftside) {
					console.log('fall');
					if(!fly_up) {
						fall_down();
					}
				}
			}

			this.update_pos();
		},
		update_pos:function(){
			static_data.player.offset({ top: position_y, left: position_x});
		},
		jump: function() {
			if(!is_flying) {
				is_flying = true;
				fly_up = true;
				jump_speed = 4;
				jump_start_position = position_y;
				//console.log(jump_start_position);
				// TODO change coordinats, jumping
				// TODO check collisions with plates to stop jump
				var flyup = setInterval(function(){
					jump_speed += jump_power;
					if(position_y <= jump_start_position-jump_height) {
						clearInterval(flyup);
						fly_up = false;

						fall_down();
						//is_flying = false;
					}
					//console.log(jump_speed);
				},30);

			}
			//console.log('jumping');
		},
		death: function() {
			if(is_alive) {
				is_alive = false;
				mediator.publish('player dead');
			}
		},
		move_left:function() {
			// TODO animate
			speed -= power;
		},
		move_right:function() {
			// TODO animate
			speed += power;
		},
		check_collisions : function() {
			var myplates = $(plates.array_of_plates);
			player = $(static_data.player);
			player_top = player.offset().top;
			player_bottom = player.offset().top + player.height();
			player_left = player.offset().left;
			player_right = player.offset().left + player.width();
			player_center = player.offset().left + (player.width()/2);
			//console.log(myplates);
			myplates.each(function(i, plate) {
				//console.log(player_center);
				var plate_top = $(plate).offset().top-20;
				var plate_left = $(plate).offset().left;
				var plate_right = $(plate).offset().left + $(plate).width();
				var plate_v_center = $(plate).offset().top + ($(plate).height()/2);

				//console.log(layer_center > plate_left, player_center < plate_right, player_bottom < plate_v_center);
				if(player_center > plate_left && player_center < plate_right && player_bottom < plate_v_center) {
					//console.log($(plate).offset().top,$(plate).offset().left);
					//console.log('check', plate_v_center);
					if(plate_stand_h_pos) {
						if(plate_top < plate_stand_h_pos) {
							plate_stand_h_pos = plate_top;
						}
					}else {
						plate_stand_h_pos = plate_top;
					}

					current_plate_data.rightside = plate_right;
					current_plate_data.leftside = plate_left;

					return false;
				}
			});
		}
	};
});