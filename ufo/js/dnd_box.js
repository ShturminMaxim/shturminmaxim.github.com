"use strict"
/*global document */
function Ufo_object() {
	this.container = document.querySelector('.field');
	//console.log(this.container);
	var random_ufo = Math.floor((Math.random()*3)+1);
	this.ufo = document.createElement('div');
	this.ufo.className = 'ufo';
	this.ufo.style.backgroundImage = 'url(img/ufo-'+random_ufo+'.png)';
	this.init();
}

Ufo_object.prototype.init = function() {
	this.container.appendChild(this.ufo);
	var self = this;

	function fly(event) {
		self.flying(event);
	}

	this.ufo.onmousedown = function(event) {
		event.preventDefault();
		document.addEventListener('mousemove', fly);
		self.ufo.style.cursor = 'none';
	};

	this.ufo.onmouseup = function(event) {
		document.removeEventListener('mousemove', fly);
		self.ufo.style.cursor = 'pointer';
	};


};

Ufo_object.prototype.flying = function(event) {
	var y_position = event.clientY-this.container.getBoundingClientRect().top-(this.ufo.offsetHeight/2);
	var x_position = event.clientX-this.container.getBoundingClientRect().left-(this.ufo.offsetWidth/2);
	//console.log(this.ufo.offsetTop, this.ufo.offsetLeft);
	var over_top = this.ufo.offsetTop < 0;
	var over_left = this.ufo.offsetLeft < 0;

	this.ufo.style.top = y_position+'px';
	this.ufo.style.left = x_position+'px';

	if(this.ufo.offsetTop < 0) {
		this.ufo.style.top = '0px';
	}
	if(this.ufo.offsetLeft < 0) {
		this.ufo.style.left = '0px';
	}
	if(this.ufo.offsetLeft+this.ufo.offsetWidth > this.container.offsetLeft+this.container.offsetWidth) {
		this.ufo.style.left = this.container.offsetWidth-(this.ufo.offsetWidth)+'px';
	}
	if(this.ufo.offsetTop+this.ufo.offsetHeight > this.container.offsetTop+this.container.offsetHeight) {
		this.ufo.style.top = this.container.offsetHeight-(this.ufo.offsetHeight)+'px';
	}
};

window.onload = function() {
	document.getElementById('add_button').onclick = function() {
		var ufo = new Ufo_object();
	};
};
