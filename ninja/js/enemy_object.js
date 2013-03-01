"use strict"
/*global document $*/

function Enemy_object() {
	this.box = $('<div/>', {
		"class": "enemy-object",
		"style": "left:"+ Math.floor((Math.random()*400)+1) +"px; top:50px;"
	});
	this.container = $('.ninja-container');
	this.container.append(this.box);
	//console.log(this.box);
	var self = this;
	var fall_speed = 50;
	console.log(this.container.height() + this.container.offset().top);

	this.enemy_falling_down = setInterval(function() {
		if(self.box.offset().top < self.container.height() + self.container.offset().top ) {
			fall_speed += 1;
			self.box.css({
				'top': fall_speed
			});
		} else {
			clearInterval(self.enemy_falling_down);

		}
		}, 30);
	window.app.mediator.subscribe('atack', function(data) {
		var ninja_side = data[0];
		var ninja_position = data[1];
		var ninja_center_x = data[2].x_position;
		var ninja_center_y = data[2].y_position;
		var enemy_center_x = self.box.offset().left - self.box.width()/2;
		var enemy_center_y = self.box.offset().top - self.box.height()/2;
		console.log(ninja_position, ninja_center_x, ninja_center_y, enemy_center_x, enemy_center_y);

		var distance = Math.floor(Math.sqrt((Math.pow((enemy_center_x - ninja_center_x),2))+(Math.pow((enemy_center_y - ninja_center_y),2))));
		console.log(distance);
		if (distance < 50) {
			console.log('kick');
			self.box.css({
				'background':'url("img/enemy_box_dead.png") no-repeat'
			});
			if(!self.resurecting) {
				self.resurecting = true;
				setTimeout(function() {
				console.log('resurecting');
				self.box.css({
					'background':'url("img/enemy_box.png") no-repeat'
				});
				self.resurecting = false;
				}, 2000);
			}
			self.box.remove();
			var enemy = new Enemy_object();
			window.app.mediator.publish('enemy_dead');
		}
		//console.log(self.box.width());
		//console.log(ninja_position - self.box.offset().left, ninja_side);
	});
}

Enemy_object.prototype.resurect = function(box) {
};

$(function() {
	var enemy = new Enemy_object();
});