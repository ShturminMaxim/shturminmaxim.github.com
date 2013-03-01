
function Counter() {
	this.counter = $('.count');
	var self = this;
	var count = 0;
	window.app.mediator.subscribe('enemy_dead', function(data) {
		console.log('count');
		count += 1;
		self.counter.text(count);
	});
}

$(function() {
	var counter = new Counter();
});