"use strict";
// TODO set negative margin relative to max menu-item width.
/*global $*/
$(function() {

	(function change_z_indexes() {
		var z_index = 0;
		$('.menu .menu-item').map(function(val, i) {
			z_index -= 1;
			$(i).css({
				'z-index': z_index
			});
		});
	})();

	(function click_event() {
		$('.first-item').click(function() {
			$(this).toggleClass('closed');
			$('.menu-item').stop();
			if ($(this).hasClass('closed')) {
				$('.menu-item').animate({
					'margin-left': '-260'
				}, 1500);
			} else {
				$('.menu-item').animate({
					'margin-left': '-30'
				}, 1500);
			}
		});
	})();

});