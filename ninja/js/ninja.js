"use strict"
/*global document $*/
$(function() {

	function Ninja() {
		this.ninja = $('#ninja');
		this.container = $('.ninja-container');
		this.ground = $('.ground');
		this.animate = false;
		this.side = 'r';
		this.events();
		this.sprite_positions = {
			stand_r: '-500px -59px',
			stand_l: '-430px -59px',
			sprite_moving_animation_r: ['-500px 5px', '-570px 5px', '-640px 5px', '-710px 5px'],
			sprite_moving_animation_l: ['-425px 5px', '-365px 5px', '-295px 5px', '-225px 5px'],
			sprite_atacking_animation_l: ['-430px -128px', '-360px -128px', '-290px -128px', '-220px -128px', '-150px -128px', '-80px -128px', '-20px -128px'],
			sprite_atacking_animation_r: ['-500px -128px', '-570px -128px', '-640px -128px', '-710px -128px', '-780px -128px', '-850px -128px', '-920px -128px'],
			sprite_jumping_animation_r: ['-500px -191px', '-570px -191px', '-640px -191px', '-710px -191px', '-780px -191px', '-850px -191px'],
			sprite_jumping_animation_l: ['-430px -191px', '-360px -191px', '-290px -191px', '-220px -191px', '-150px -191px', '-80px -191px'],
			sprite_jump_atacking_animation_r: ['-500px -254px', '-570px -254px', '-640px -254px', '-710px -254px'],
			sprite_jump_atacking_animation_l: ['-430px -254px', '-360px -254px', '-290px -254px', '-220px -254px']
		};
		this.speed = 0;
		this.power = 0.2;
		this.friction = 0.5;
	}

	Ninja.prototype.events = function() {
		var self = this;
		var current_position, current_y_position;

		$(document).on('keydown', function(event) {
			//console.log(event.keyCode);
			current_position = self.ninja.offset().left;
			current_y_position = self.ninja.offset().top;

			if (event.keyCode === 39) {
				self.side = 'r';
				self.moving(current_position);
			}
			if (event.keyCode === 37) {
				self.side = 'l';
				self.moving(current_position);
			}
			if (event.keyCode === 38) {
				self.jump(current_y_position);
			}

			if (event.keyCode === 32) {
				self.atack();
			}
		});

		$(document).on('keyup', function(event) {
			//console.log(event.keyCode);
			var key = event.keyCode;
			if (key === 39 || key === 37) {
				self.stop_moving();
			}
		});
	};


	Ninja.prototype.moving = function(current_position) {
		var self = this;
		var ground_width = this.ground.width();

		if (!this.animate) {
			this.animate = true;
			this.ninja_animate();
		}
		if (!this.ninja_is_moving) {
			this.ninja_is_moving = true;
			this.moving_coordinates = setInterval(function() {
				if (self.side === 'r') {
					self.speed += self.power;
				}
				if (self.side === 'l') {
					self.speed -= self.power;
				}

				self.ninja.offset({
					left: self.ninja.offset().left + self.speed
				});
				// TODO take ground move and ground object to separate module
				self.ground.offset({
					left: self.ground.offset().left - self.speed
				});
				if (self.ground.offset().left <= -ground_width + self.container.width() + 120) {
					self.ground.offset({
						left: -ground_width + self.container.width() + 120
					});
				}
				if (self.ground.offset().left >= 0) {
					self.ground.offset({
						left: 0
					});
				}
				if (self.ninja.offset().left <= self.container.offset().left - 5) {
					self.ninja.offset({
						left: self.container.offset().left - 5
					});
				}
				if (self.ninja.offset().left + self.ninja.width() - 15 >= self.container.offset().left + self.container.width()) {
					self.ninja.offset({
						left: self.container.offset().left + self.container.width() - self.ninja.width() + 15
					});
				}
			}, 40);
		}
	};
	Ninja.prototype.ninja_animate = function() {
		var self = this;
		var animation_sprites = this.sprite_positions['sprite_moving_animation_' + self.side];
		var i = 0;
		this.moving_animation = setInterval(function() {
			if (i < animation_sprites.length) {
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

	Ninja.prototype.jump_animate = function() {
		var self = this;
		var i = 0;
		clearInterval(this.moving_animation);
		this.animate = true;
		var jumping_sprites = self.sprite_positions['sprite_jumping_animation_' + this.side];
		this.jumping_animation = setInterval(function() {
			if (i <= 2) {
				self.ninja.css({
					'background': 'url("img/ninja_new_strites.png") no-repeat',
					'background-position': jumping_sprites[i]
				});
				i += 1;
			} else {
				clearInterval(self.jumping_animation);
			}
		}, 40);
	};

	Ninja.prototype.stop_moving = function() {
		// this.side = 'o';
		var self = this;
		self.speed = 0;
		clearInterval(self.moving_coordinates);
		clearInterval(self.moving_animation);
		self.ninja_is_moving = false;
		if (!this.jumping) {
			self.animate = false;
			self.ninja.css({
				'background': 'url("img/ninja_new_strites.png") no-repeat',
				'background-position': self.sprite_positions['stand_' + this.side]
			});
		}
	};

	Ninja.prototype.jump = function(current_y_position) {
		var null_position = current_y_position;
		var self = this;
		var jump_top = 150;
		var gravitation = 0.85;
		var jump_speed = 4;
		var jump_height = current_y_position - jump_top;

		if (!this.jumping) {
			this.jumping = true;
			self.jump_animate();
			var up = true;
			this.jumping_move = setInterval(function() {
				if (up && self.ninja.offset().top > jump_height) {
					self.ninja.offset({
						'top': self.ninja.offset().top - jump_speed * gravitation
					});
				} else {
					up = false;
					self.ninja.offset({
						'top': self.ninja.offset().top + jump_speed
					});
					if (self.ninja.offset().top > null_position) {
						self.ninja.offset({
							'top': null_position
						});
						clearInterval(self.jumping_move);
						clearInterval(self.jumping_animation);
						self.jumping = false;
						self.animate = false;
						self.stop_moving();
					}
				}
			}, 20);
		} else {
			return false;
		}
	};

	Ninja.prototype.atack = function() {
		var self = this;
		var animation_sprites;
		this.ninja_center_point = {
			x_position : self.ninja.offset().left - self.container.offset().left + this.ninja.width()/2,
			y_position : this.ninja.offset().top - this.ninja.height()/2
		};
		console.log(self.ninja.offset().left - self.container.offset().left);
		if (this.jumping) {
			animation_sprites = this.sprite_positions['sprite_jump_atacking_animation_' + this.side];
		} else {
			animation_sprites = this.sprite_positions['sprite_atacking_animation_' + this.side];
		}
		var i = 0;

		if (!this.atacking) {
			window.app.mediator.publish('atack', [self.side, self.ninja.offset().left + self.ninja.width(), self.ninja_center_point]);
			//self.stop_moving(self.side);
			var ataken = setInterval(function() {
				self.atacking = true;
				if (i < animation_sprites.length) {
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