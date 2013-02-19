"use strict";
/*global $ window console document*/
$(function() {
	var container = $('.slider-container');
	var slide_field = $('.slider-field');
	var slider = $('.slider');
	var patrs_counter = 100;
	var parts_width = (slide_field.width()-slider.width())/patrs_counter;
	var slider_pos = slider.offset().left;
	var animate;

	delegate_events();
/*

*/
	function delegate_events() {
		var null_coordinate, // нулевая координата, где произошел клик
		slider_null_position; // нулевая координата поизции левого края слайдера
		var x_offset = 0; // сдвиг;

		$(document).bind('mousewheel', function(event, delta) {
			event.preventDefault();
				if(delta > 0) {
					x_offset = 5;
				} else {
					x_offset = -5;
				}
				slider_null_position = slider.offset().left;
				slide(event, slider_null_position, x_offset);
			});
		slider.delegate(slider, 'mousedown', function(event) {
			event.preventDefault();
			null_coordinate = event.clientX;
			slider_null_position = slider.offset().left;
			$(document).mousemove(function(event) {
				x_offset = event.pageX - null_coordinate; //свдиг по оси Х на колическтво пикселей;
				slide(event, slider_null_position, x_offset);
			});
		});

		$(document).delegate($(document), 'mouseup', function(event) {
			$(document).unbind('mousemove');
		});
	}
/*

*/
	function slide(event, slider_null_position, x_offset) {
				var left_border = slide_field.offset().left;
				var right_border = slide_field.offset().left + slide_field.width();
			if (slider.offset().left >= left_border && slider.offset().left + slider.width() <= right_border) {
					slider.offset({
						left: slider_null_position + x_offset
					});
					$('.slider-field-light').css({'width': (slider.width()/2)+parseInt(slider.css("left"),10)});
					var count = parseInt((parseInt(slider.css("left"),10)/parts_width)*100, 10)/100;
					$('.info').text(count.toFixed(0));
			}

			if(slider.offset().left <= left_border) {
				slider.offset({left: left_border});
				$('.slider-field-light').css({'width': (slider.width()/2)+parseInt(slider.css("left"),10)});
				$('.info').text(0);
			}
			if(slider.offset().left + slider.width() >= right_border) {
				slider.offset({left: right_border-slider.width()});
				$('.slider-field-light').css({'width': (slider.width()/2)+parseInt(slider.css("left"),10)});
				$('.info').text(100);
			}


	}
});