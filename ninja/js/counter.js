
function Counter() {
	var counters = $('.counter');
	var enemy_defeated_counter_container = $('.defeated-count');
	var enemy_passed_counter_container = $('.passed-count');
	var enemy_defeated_count = 0;
	var enemy_passed_count = 0;

	counters.css({'display':'inline-block'});

	window.app.mediator.subscribe('enemy_dead', function(data) {
		//console.log('count');
		enemy_defeated_count += 1;
		enemy_defeated_counter_container.text(enemy_defeated_count);
	});
	window.app.mediator.subscribe('enemy_passing', function(data) {
		enemy_passed_count += 1;
		enemy_passed_counter_container.text(enemy_passed_count);
	});
}