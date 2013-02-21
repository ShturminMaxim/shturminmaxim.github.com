$(function() {

	function Ninja() {
		this.ninja = $('#ninja');
		this.animate = false;
		this.events();
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
				self.atack();
			}
		});

		$(document).on('keyup', function(event) {
			//console.log(event.keyCode);
			var key = event.keyCode;
			var stand_side;

			if(key === 39 || key === 37) {
				if(key === 39) {
					stand_side = 'stand_r';
				} else {
					stand_side = 'stand_l';
				}
				self.stop_moving(stand_side);
			}
		});
	};

	Ninja.prototype.moving = function(current_position) {
		var moving_animation;
		var sprite_count = 1;
		var position = 0;
		var self = this;
		if(!this.animate) {
			this.animate = true;
			this.moving_animation = setInterval(function() {
				if(sprite_count <= 4) {
					self.ninja.css({
						'background': 'url("img/am-' + self.side + sprite_count + '.png")no-repeat'
					});
					sprite_count += 1;
				} else {
					sprite_count = 1;
				}
			}, 70);
			this.moving_coordinates = setInterval(function() {
				if(self.side === 'r') {
					position += 4;
				} else {
					position -= 4;
				}
				self.ninja.offset({
					left: current_position + position
				});
			}, 40);
		}
	};

	Ninja.prototype.stop_moving = function(stand_side) {
		clearInterval(this.moving_animation);
		clearInterval(this.moving_coordinates);
		this.animate = false;
		this.ninja.css({
			'background': 'url("img/' + stand_side + '.png")no-repeat'
		});
	};

	Ninja.prototype.atack = function() {
		var self = this;
		var sprite_count = 1;

		if(!self.side) {
			self.side = 'r';
		}
		if(!this.atacking) {
			var ataken = setInterval(function() {
				self.atacking = true;
				if(sprite_count <= 7) {
					self.ninja.css({
						'background': 'url("img/atack/a-' + self.side + sprite_count + '.png")no-repeat'
					});
					sprite_count += 1;
				} else {
					clearInterval(ataken);
					self.atacking = false;
				}
			}, 40);
		}
	};

	var ninja = new Ninja();

});