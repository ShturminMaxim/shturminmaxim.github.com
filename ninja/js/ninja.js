$(function() {

	function Ninja() {
		this.ninja = $('#ninja');
		this.container = $('.ninja-container');
		this.animate = false;
		this.side = 'r';
		this.events();
		this.sprite_positions = {
			stand_r: '-500px -59px',
			stand_l: '-440px -59px',
			sprite_moving_animation_r: ['-500px 5px', '-570px 5px', '-640px 5px', '-710px 5px'],
			sprite_moving_animation_l: ['-430px 5px', '-370px 5px', '-300px 5px', '-230px 5px'],
			sprite_atacking_animation_l: ['-430px -128px', '-360px -128px', '-290px -128px', '-220px -128px', '-150px -128px', '-80px -128px', '-20px -128px'],
			sprite_atacking_animation_r: ['-500px -128px', '-570px -128px', '-640px -128px', '-710px -128px', '-780px -128px', '-850px -128px', '-920px -128px']
		};
		this.speed = 0;
		this.power = 0.3;
		this.friction = 0.5;
		console.log(this['sprite_moving_animation_' + 'r']);
	}

	Ninja.prototype.events = function() {
		var self = this;
		var current_position;

		$(document).on('keydown', function(event) {
			//console.log(event.keyCode);
			current_position = self.ninja.offset().left;

			if(event.keyCode === 39) {
				self.side = 'r';
				self.moving(current_position);
			}
			if(event.keyCode === 37) {
				self.side = 'l';
				self.moving(current_position);
			}
			if(event.keyCode === 32) {
				self.atack(current_position);
			}
		});

		$(document).on('keyup', function(event) {
			//console.log(event.keyCode);
			var key = event.keyCode;

			if(key === 39 || key === 37) {
				self.stop_moving();
			}
		});
	};

	Ninja.prototype.ninja_animate = function(animation) {
		var self = this;
		var animation_sprites = this.sprite_positions['sprite_moving_animation_' + self.side];
		var i = 0;
		this.moving_animation = setInterval(function() {
			if(i < animation_sprites.length) {
				self.ninja.css({
					'background': 'url("img/ninja_new_strites.png") no-repeat',
					'background-position': animation_sprites[i]
				});
			} else {
				i = 0;
			}
			i += 1;
		}, 100);
	};

	Ninja.prototype.moving = function(current_position) {
		var moving_animation;
		var sprite_count = 1;
		var sprite_change_px = 0;
		var self = this;
		if(!this.animate) {
			this.animate = true;
			this.ninja_animate(this.side);
			/*this.moving_animation = setInterval(function() {
				if(self.sprite_positions.move_right_x_pos > -700) {
					self.ninja.css({
						'background': 'url("img/ninja_new_strites.jpg") no-repeat',
						'background-position': (self.sprite_positions.move_right_x_pos -= sprite_change_px)+'px '+self.sprite_positions.move_right_y_pos+'px'
					});
					sprite_change_px = 70;
				} else {
					self.sprite_positions.move_right_x_pos = -500;
					sprite_change_px = 0;
				}
			}, 80);*/

			this.moving_coordinates = setInterval(function() {
				if(self.side === 'r') {
					self.speed += self.power;
				}
				if(self.side === 'l') {
					self.speed -= self.power;
				}

				self.ninja.offset({
					left: self.ninja.offset().left + self.speed
				});

				//console.log(self.speed);
				if(self.ninja.offset().left <= self.container.offset().left - 5) {
					self.ninja.offset({
						left: self.container.offset().left - 5
					});
				}
				if(self.ninja.offset().left + self.ninja.width()-15 >= self.container.offset().left + self.container.width()) {
					self.ninja.offset({
						left: self.container.offset().left + self.container.width() - self.ninja.width()+15
					});
				}
			}, 40);
		}
	};

	Ninja.prototype.stop_moving = function() {
		// this.side = 'o';
		var self = this;
				self.speed = 0;
				clearInterval(self.moving_coordinates);
				clearInterval(self.moving_animation);
				self.animate = false;
				self.ninja.css({
					'background': 'url("img/ninja_new_strites.png") no-repeat',
					'background-position': self.sprite_positions['stand_' + this.side]
				});
		console.log('stop');
	};

	Ninja.prototype.atack = function() {
		var self = this;
		var animation_sprites = this.sprite_positions['sprite_atacking_animation_' + this.side];
		var i = 0;

		if(!this.atacking) {
			//self.stop_moving(self.side);
			var ataken = setInterval(function() {
				self.atacking = true;
				if(i < animation_sprites.length) {
					self.ninja.css({
						'background': 'url("img/ninja_new_strites.png") no-repeat',
						'background-position': animation_sprites[i]
					});
				} else {
					clearInterval(ataken);
					self.atacking = false;
				}
				i += 1;
			}, 40);

		}
	};

	var ninja = new Ninja();

});