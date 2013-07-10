define(['./mediator'], function(mediator) {
	//define plates module
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	var plates_number= 4;
/*
	var default_position_x = getRandomInt(100, 300);
	var default_position_y = getRandomInt(100, 450);*/

	var plates_coords = {
		p1 : [getRandomInt(50, 300), getRandomInt(120, 150)],
		p2 : [getRandomInt(50, 300), getRandomInt(180, 210)],
		p3 : [getRandomInt(50, 300), getRandomInt(230, 270)],
		p4 : [getRandomInt(50, 300), getRandomInt(300, 310)],
		p5 : [getRandomInt(50, 300), getRandomInt(340, 380)]
	};
	var array_of_plates = [];
	var y_coords = [];

	var create_plates =  function(how_many_plates) {
			var how_many_plates = how_many_plates || 1;

			for (var i = 0; i < how_many_plates; i++) {
				array_of_plates.push($('<div/>', {class:'plate'}));
			}

			return array_of_plates;
		};
	create_plates(5);

	return {
		add_to_container : function(container) {
			$(array_of_plates).each(function(i, elem){
				container.append(elem);

				var pos_x = plates_coords['p'+(i+1)][0];
				var pos_y = plates_coords['p'+(i+1)][1];
				y_coords.push(pos_y);
				//console.log(pos_y, pos_x);
				$(elem).offset({ top: pos_y, left: pos_x});
			});

		},
		array_of_plates : array_of_plates,
		y_coords : y_coords
	};
});