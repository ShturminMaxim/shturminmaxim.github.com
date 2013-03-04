"use strict";
// This is unoptimized test
// TODO set negative margin relative to max menu-item width.
// TODO optimize functions

/*global $, console, alert */
$(function() {

	(function change_z_indexes() {
		var z_index = 5;
		$('.menu .menu-item').map(function(val, i) {
			z_index -= 1;
			$(i).css({
				'z-index': z_index
			});
		});
	})();

	(function click_event() {
		var current_slide = current_slide || 0;

		function show_slide(slide_number) {
				current_slide = slide_number;
				$('#holder-'+slide_number).addClass('visible-graph');
				$('#holder-'+slide_number).stop().animate({
					'margin-left': '0'
				}, 1000);
			}
		function hide_slide(current_slide) {
			$('#holder-'+current_slide).removeClass('visible-graph');
			$('#holder-'+current_slide).stop().animate({
					'margin-left': '-800'
				}, 1500);
		}

		$('.menu-item').mousedown(function(event){
			event.preventDefault();
			var number_in_hash = $(event.target).parent().find('a').attr('href').replace('#','');
			if(current_slide !== number_in_hash) {
				hide_slide(current_slide);
				show_slide(number_in_hash);
			}
		});

		$('.first-item').click(function() {
			$(this).toggleClass('closed');
			$('.menu-item').stop();
			if ($(this).hasClass('closed')) {
				$('.menu-item').animate({
					'margin-left': '-260'
				}, 1500);
				hide_slide(current_slide);
				current_slide = 0;
			} else {
				$('.menu-item').animate({
					'margin-left': '-30'
				}, 1500);
			}
		});
	})();
});