"use strict";
/*global $, */
$(function() {
//////////////
///////// PIE GRAPH 1
//////////////
	var graph_pie_1 = Raphael("holder-1");
	var pie = graph_pie_1.piechart(320, 200, 100, [35, 20, 13, 32, 5], {
		legend: ["%% - Люди думающие", "%% - Люди не думающие", "%% - Люди хорошие", "%% - Люди плохие", "%% - Не люди"],
		legendpos: "east",
		href: ["#1", "#2", "#3", "#4", "#5"]
	});

	graph_pie_1.text(530, 110, "Статистика людей.").attr({
		font: "20px 'Fontin Sans', Fontin-Sans, sans-serif"
	});

	pie.hover(function() {
		this.sector.stop();
		this.sector.scale(1.1, 1.1, this.cx, this.cy);

		if (this.label) {
			this.label[0].stop();
			this.label[0].attr({
				graph_pie_1: 7.5
			});
			this.label[1].attr({
				"font-weight": 800
			});
		}
	}, function() {
		this.sector.animate({
			transform: 's1 1 ' + this.cx + ' ' + this.cy
		}, 500, "bounce");

		if (this.label) {
			this.label[0].animate({
				graph_pie_1: 5
			}, 500, "bounce");
			this.label[1].attr({
				"font-weight": 400
			});
		}
	});
//////////////
///////// PIE GRAPH 2
//////////////
	var graph_pie_2 = Raphael("holder-2");
	var pie_2 = graph_pie_2.piechart(320, 200, 100, [11, 22, 33, 44, 5], {
		legend: ["%% - Админы думающие", "%% - Админы не думающие", "%% - Админы хорошие", "%% - Админы плохие", "%% - Не Админы"],
		legendpos: "east",
		href: ["#1", "#2", "#3", "#4", "#5"]
	});

	graph_pie_2.text(530, 110, "Статистика админов").attr({
		font: "20px 'Fontin Sans', Fontin-Sans, sans-serif"
	});

	pie_2.hover(function() {
		this.sector.stop();
		this.sector.scale(1.1, 1.1, this.cx, this.cy);

		if (this.label) {
			this.label[0].stop();
			this.label[0].attr({
				graph_pie_2: 7.5
			});
			this.label[1].attr({
				"font-weight": 800
			});
		}
	}, function() {
		this.sector.animate({
			transform: 's1 1 ' + this.cx + ' ' + this.cy
		}, 500, "bounce");

		if (this.label) {
			this.label[0].animate({
				graph_pie_2: 5
			}, 500, "bounce");
			this.label[1].attr({
				"font-weight": 400
			});
		}
	});
//////////////
///////// BAR GRAPH 1
//////////////
	var graph_bar_1 = Raphael("holder-3");

	var fin = function () {
			this.flag = graph_bar_1.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
		};

	var fout = function () {
		this.flag.animate({
			opacity: 0
		}, 300, function() {
			this.remove();
		});
	};

	var txtattr = {
		font: "20px 'Fontin Sans', Fontin-Sans, sans-serif"
	};
	graph_bar_1.text(360, 100, "Статистика учеников").attr(txtattr);
	graph_bar_1.barchart(200, 100, 400, 220, [[50, 40, 40, 30, 28, 25, 22, 26, 30, 22, 26, 18, 10,10, 10, 10, 10]]).hover(fin, fout);

});