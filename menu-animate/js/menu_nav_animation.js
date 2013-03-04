"use strict";
// This is unoptimized test
// TODO set negative margin relative to max menu-item width.
// TODO optimize functions
// TODO add function for animate holders

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

		$('.menu-item').mousedown(function(event){
			event.preventDefault();

			if($('.visible-graph')) {
				$('.visible-graph').animate({
					'margin-left': '-800'
				}, 1500);
				$('.visible-graph').removeClass('visible-graph');
			}

			var hash = $(event.target).parent().find('a').attr('href');
			if(hash ==='#1') {
				$('#holder-1').addClass('visible-graph');
				$('#holder-1').animate({
					'margin-left': '0'
				}, 1000);
			}
			if(hash ==='#2') {
				$('#holder-2').addClass('visible-graph');
				$('#holder-2').animate({
					'margin-left': '0'
				}, 1000);
			}
			if(hash ==='#3') {
				$('#holder-3').addClass('visible-graph');
				$('#holder-3').animate({
					'margin-left': '0'
				}, 1000);
			}

		});

		$('.first-item').click(function() {
			$(this).toggleClass('closed');
			$('.menu-item').stop();
			if ($(this).hasClass('closed')) {
				$('.menu-item').animate({
					'margin-left': '-260'
				}, 1500);
				if($('.visible-graph')) {
				$('.visible-graph').animate({
					'margin-left': '-800'
				}, 1500);
				$('.visible-graph').removeClass('visible-graph');
				}
			} else {
				$('.menu-item').animate({
					'margin-left': '-30'
				}, 1500);
			}
		});
	})();
});