define(['./mediator'], function(mediator) {
	var container = $('.content');
	var Graph = {};

	return function() {
		mediator.subscribe('click', function(data) {
			console.log(data);

			///здесь мы получаем данные с сервера перед отображением графика
			///отправляем запрос с именем графика DATA , получаем в ответ
			/// Graph
			/// Синтаксис:
			/// 1. Для графика Имя строки таблицы и цифры  - recieved_graph_data = [{name: String, data: Array of Numbers }]
			///	2. Ед. измерения  - Y_coordinates_quantity_unit = "String";
			/// 3. Описание оси координат Y - Y_coordinates_description_text = "String";
			/// 4. Описание оси координат Y - X_coordinates_description = [Array of String values];
			/// 5. Количество данных и описаний-Х должно быть равно - recieved_graph_data.data.length === X_coordinates_description.length



			Graph.table_name = data;

			Graph.X_coordinates_description = ['1910', '1911', '1912', '1913', '1914', '1915',
				'1916', '1917', '1918', '1919', '1920', '1921'];

			Graph.Y_coordinates_quantity_unit = 'млн.грн.';

			Graph.Y_coordinates_description_text = "У фактичних цінах";

			Graph.example_recieved_graph_data = [{
				name: 'Склад валового внутрішнього продукту',
				data: [17.0, null, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 91.6],
				visible: false,
				zIndex: 1
			}, {
				name: 'Сільське господарство, мисливство, лісове господарство',
				data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 82.6, 24.5],
				visible: false,
				zIndex: 1
			}, {
				name: 'Добувна промисловість',
				data: [0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 31.9, 14.0],
				visible: false,
				zIndex: 1
			}, {
				name: 'Переробна промисловість',
				data: [21.9, 4.2, 5.7, 12, 11.9, 15.2, 17.0, 16.6, 14.2, 4.3, 54.6, 43.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Виробництво та розподілення електроенергії, газу та води',
				data: [31.9, 12.2, 22, 8.5, 11.9, 13.2, 17.0, 16.6, 14.2, 5.3, 6.6, 42.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Будівництво',
				data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 42.2, 61.3, 19.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Торгівля; ремонт автомобілів, побутових виробів та предметів особистого вжитку',
				data: [3.9, 4.2, 5.7, 8.5, 11.9, 11.2, 17.0, 16.6, 24.2, 7.3, 17.6, 45.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Діяльність транспорту та зв’язку',
				data: [12.9, 14.2, 5.7, 8.5, 11.9, 7.2, 16.0, 16.6, 64.2, 10.3, 19.6, 4.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Освіта',
				data: [3.9, 4.2, 5.7, 8.5, 7.9, 8.2, 19.0, 16.6, 24.2, 6.3, 61.6, 42.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Охорона здоров’я та надання соціальної допомоги',
				data: [3.9, 4.2, 3.7, 6.5, 11.9, 15.2, 25.0, 25.6, 34.2, 10.3, 62.6, 42.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Інші види економічної діяльності',
				data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 24.0, 16.6, 14.2, 10.3, 6.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'фінансова діяльність',
				data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 24.0, 16.6, 14.2, 10.3, 6.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'операції з нерухомим майном, оренда, інжиніринг та надання послуг підприємцям',
				data: [33.9, 44.2, 53.7, 8.5, 11.9, 15.2, 24.0, 19.6, 14.2, 41.3, 6.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'державне управління',
				data: [23.9, 4.2, 51.7, 18.5, 21.9, 15.2, 22.0, 25.6, 14.2, 13.3, 26.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Оплата послуг фінансових посередників',
				data: [13.9, 42.2, 52.7, 28.5, 22.9, 15.2, 24.0, 22.6, 14.2, 12.3, 16.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Податки на продукти',
				data: [3.9, 45.2, 45.7, 28.5, 11.9, 32.2, 24.0, 16.6, 14.2, 27.3, 36.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: 'Субсидії на продукти',
				data: [66.9, 45.2, 54.7, 18.5, 21.9, 15.2, 32.0, 16.6, 21.2, 26.3, 56.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: '2. За розподільчим методом',
				data: [63.9, 44.2, 55.7, 8.5, 25.9, 15.2, 24.0, 16.6, 14.2, 42.3, 16.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: '2.1. Оплата праці найманих працівників',
				data: [13.9, 24.2, 56.7, 38.5, 21.9, 15.2, 24.0, 15.6, 15.2, 32.3, 26.6, 41.8],
				visible: false,
				zIndex: 1
			}, {
				name: '2.2. Податки за виключенням субсидій на виробництво та імпорт',
				data: [23.9, 4.2, 51.7, 28.5, 22.9, 15.2, 34.0, 12.6, 21.2, 10.3, 36.6, 42.8],
				visible: false,
				zIndex: 1
			}, {
				name: '2.3. Валовий прибуток, змішаний доход',
				data: [3.9, 24.2, 52.7, 38.5, 11.9, 15.2, 24.0, 31.6, 22.2, 10.3, 62.6, 31.8],
				visible: false,
				zIndex: 1
			}, {
				name: '3. За методом кінцевого використання',
				data: [13.9, 4.2, 53.7, 8.5, 11.9, 15.2, 24.0, 16.6, 11.2, 32.3, 62.6, 51.8],
				visible: false,
				zIndex: 1
			}, {
				name: '3.1. Кінцеві споживчі витрати',
				data: [23.9, 14.2, 15.7, 18.5, 11.9, 15.2, 24.0, 16.6, 14.2, 10.3, 6.6, 41.8],
				visible: false,
				zIndex: 1
			}];

			//////////////////////////
			/////////////////////////
			////////////////////////
			Highcharts.theme = {
				colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
					"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
				chart: {
					backgroundColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 1,
							y2: 1
						},
						stops: [
							[0, 'rgb(48, 48, 96)'],
							[1, 'rgb(0, 0, 0)']
						]
					},
					borderColor: '#000000',
					borderWidth: 2,
					className: 'dark-container',
					plotBackgroundColor: 'rgba(255, 255, 255, .1)',
					plotBorderColor: '#CCCCCC',
					plotBorderWidth: 1
				},
				title: {
					style: {
						color: '#C0C0C0',
						font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
					}
				},
				subtitle: {
					style: {
						color: '#666666',
						font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
					}
				},
				xAxis: {
					gridLineColor: '#333333',
					gridLineWidth: 1,
					labels: {
						style: {
							color: '#A0A0A0'
						}
					},
					lineColor: '#A0A0A0',
					tickColor: '#A0A0A0',
					title: {
						style: {
							color: '#CCC',
							fontWeight: 'bold',
							fontSize: '12px',
							fontFamily: 'Trebuchet MS, Verdana, sans-serif'

						}
					}
				},
				yAxis: {
					gridLineColor: '#333333',
					labels: {
						style: {
							color: '#A0A0A0'
						}
					},
					lineColor: '#A0A0A0',
					minorTickInterval: null,
					tickColor: '#A0A0A0',
					tickWidth: 1,
					title: {
						style: {
							color: '#CCC',
							fontWeight: 'bold',
							fontSize: '12px',
							fontFamily: 'Trebuchet MS, Verdana, sans-serif'
						}
					}
				},
				tooltip: {
					backgroundColor: 'rgba(0, 0, 0, 0.75)',
					style: {
						color: '#F0F0F0'
					}
				},
				toolbar: {
					itemStyle: {
						color: 'silver'
					}
				},
				plotOptions: {
					line: {
						dataLabels: {
							color: '#CCC'
						},
						marker: {
							lineColor: '#333'
						}
					},
					spline: {
						marker: {
							lineColor: '#333'
						}
					},
					scatter: {
						marker: {
							lineColor: '#333'
						}
					},
					candlestick: {
						lineColor: 'white'
					}
				},
				legend: {
					itemStyle: {
						font: '9pt Trebuchet MS, Verdana, sans-serif',
						color: '#A0A0A0'
					},
					itemHoverStyle: {
						color: '#FFF'
					},
					itemHiddenStyle: {
						color: '#444'
					}
				},
				credits: {
					style: {
						color: '#666'
					}
				},
				labels: {
					style: {
						color: '#CCC'
					}
				},

				navigation: {
					buttonOptions: {
						symbolStroke: '#DDDDDD',
						hoverSymbolStroke: '#FFFFFF',
						theme: {
							fill: {
								linearGradient: {
									x1: 0,
									y1: 0,
									x2: 0,
									y2: 1
								},
								stops: [
									[0.4, '#606060'],
									[0.6, '#333333']
								]
							},
							stroke: '#000000'
						}
					}
				},

				// scroll charts
				rangeSelector: {
					buttonTheme: {
						fill: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0.4, '#888'],
								[0.6, '#555']
							]
						},
						stroke: '#000000',
						style: {
							color: '#CCC',
							fontWeight: 'bold'
						},
						states: {
							hover: {
								fill: {
									linearGradient: {
										x1: 0,
										y1: 0,
										x2: 0,
										y2: 1
									},
									stops: [
										[0.4, '#BBB'],
										[0.6, '#888']
									]
								},
								stroke: '#000000',
								style: {
									color: 'white'
								}
							},
							select: {
								fill: {
									linearGradient: {
										x1: 0,
										y1: 0,
										x2: 0,
										y2: 1
									},
									stops: [
										[0.1, '#000'],
										[0.3, '#333']
									]
								},
								stroke: '#000000',
								style: {
									color: 'yellow'
								}
							}
						}
					},
					inputStyle: {
						backgroundColor: '#333',
						color: 'silver'
					},
					labelStyle: {
						color: 'silver'
					}
				},

				navigator: {
					handles: {
						backgroundColor: '#666',
						borderColor: '#AAA'
					},
					outlineColor: '#CCC',
					maskFill: 'rgba(16, 16, 16, 0.5)',
					series: {
						color: '#7798BF',
						lineColor: '#A6C7ED'
					}
				},

				scrollbar: {
					barBackgroundColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1
						},
						stops: [
							[0.4, '#888'],
							[0.6, '#555']
						]
					},
					barBorderColor: '#CCC',
					buttonArrowColor: '#CCC',
					buttonBackgroundColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1
						},
						stops: [
							[0.4, '#888'],
							[0.6, '#555']
						]
					},
					buttonBorderColor: '#CCC',
					rifleColor: '#FFF',
					trackBackgroundColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1
						},
						stops: [
							[0, '#000'],
							[1, '#333']
						]
					},
					trackBorderColor: '#666'
				},

				// special colors for some of the
				legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
				legendBackgroundColorSolid: 'rgb(35, 35, 70)',
				dataLabelsColor: '#444',
				textColor: '#C0C0C0',
				maskColor: 'rgba(255,255,255,0.3)'
			};

			// Apply the theme
			var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
			////////////////////////
			///////////////////
			//////////////////////
			var chart;
			chart = new Highcharts.Chart({
				chart: {
					renderTo: 'container',
					type: 'column',
					marginRight: 50,
					marginBottom: 25

				},
				title: {
					text: data,
					x: -20 //center
				},
				subtitle: {
					text: 'График построен на основе данных http://ukrstat.gov.ua/',
					x: -20
				},
				xAxis: {
					categories: Graph.X_coordinates_description
				},
				yAxis: {
					title: {
						text: Graph.Y_coordinates_description_text + " " + Graph.Y_coordinates_quantity_unit
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				},
				tooltip: {
					formatter: function() {
						return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y + " " + Graph.Y_coordinates_quantity_unit;
					}
				},
				legend: {
					backgroundColor: '#FCFFC5',
					shadow: true,
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: 120,
					y: 45,
					borderWidth: 1,
					floating: true,
					//enabled: false,
					style: {
						'z-index': '1000'
					},
					itemHiddenStyle: {
						color: '#E00000'
					}
				},
				plotOptions: {
					series: {
						marker: {
							enabled: false
						}
					}
				},
				series: Graph.example_recieved_graph_data
			});

			//////////////////////
			////////////////////
			/////////////////////
			$('.legend ul').text('');
			for (var i = 0; i < Graph.example_recieved_graph_data.length; i++) {
				$('.legend ul').append('<li data-series-id="' + i + '"><a>' + Graph.example_recieved_graph_data[i].name + '</a></li>');
				//console.log(Graph.example_recieved_graph_data[i].name);
			}

			var tranform_attr = $('.highcharts-legend').attr('transform');
			var X_pos_from_transform_attr = /\d+/.exec(tranform_attr);
			var hiding_timer;
			// console.log(a, b);

			var null_position = X_pos_from_transform_attr[0];
			console.log(null_position);

			$('.highcharts-legend').hide();
			/*$('#toggle-legend').text('Скрыть легенду');*/
			$('.buttons').show();
			$('.legend').show();
			/*	function hide_toggle() {
				$('.new-legend').stop();
				$('.new-legend').animate({
					height: 'toggle'
				}, 1000);
				if ($('#toggle-legend').text() === 'Показать легенду') {
					$('#toggle-legend').text('Скрыть легенду');
				} else {
					$('#toggle-legend').text('Показать легенду');
				}
				hiding_timer = false;
			}*/

			//$('#hide-legend-button').on('click', hide_legend);

			/*$('#toggle-legend').on('click', hide_toggle);*/


			/*	setTimeout(hide_toggle, 1000);*/

			var this_chart = $('#container').highcharts();
			var new_legend_item = $('.legend li');
			new_legend_item.bind('click', function() {
				var item_id = $(this).attr('data-series-id');
				var series = this_chart.series[item_id];
				if (series.visible) {
					series.hide();
					$(this).find('a').css('color', 'red');
					//$button.html('Show series');
				} else {
					series.show();
					$(this).find('a').css('color', 'black');
					//$button.html('Hide series');
				}
			});

			// change type of chart
			// Set type
			$.each(['line', 'column', 'spline', 'area', 'areaspline'], function(i, type) {
				$('#' + type).click(function() {
					for (var i = 0; i < this_chart.series.length; i++) {
						this_chart.series[i].update({
							type: type
						});
					}

					console.log('type - ' + type);
				});
			});

			$('#hide-all-series').on('click', function(e) {
				var series_length = this_chart.series;
				for (var i = 0; i < series_length.length; i++) {
					series_length[i].hide();
					$(new_legend_item[i]).find('a').css('color', '#ffffff');
				}
			});

			$(function() {
				'use strict';

				var legendNode;
				var tailNode;
				var isVisible;
				var isAnimating;

				legendNode = $('.legend');
				tailNode = $('.legend .tail');
				isVisible = false;
				isAnimating = false;

				function toggleLegend() {
					isAnimating = true;
					if (isVisible) {
						isVisible = false;
						legendNode.stop().animate({
							'right': -400
						}, 5000, 'easeOutBack', function() {
							isAnimating = false;
						});
					} else {
						isVisible = true;
						legendNode.stop().animate({
							'right': 0
						}, 'easeOutBack', function() {
							isAnimating = false;
						});
					}
				}


				/*legendNode.bind('mouseenter', function() {
					if (isVisible) {
						return;
					}
					isAnimating = true;
					legendNode.stop().animate({
						'right': 0
					}, 500, 'easeInOutCubic', function() {
						isAnimating = false;
					});
				});*/

				/*legendNode.bind('mouseleave', function() {
					if (isVisible) {
						return;
					}
					isAnimating = true;
					legendNode.stop().animate({
						'right': -390
					}, 500, 'easeInOutCubic', function() {
						isAnimating = false;
					});
				});*/

				/*
				 * event handling
				 */
				/*$(document).bind('click', function() {
					if (isVisible && !isAnimating) {
						toggleLegend();
					}
				});*/
				function getCookie(c_name) {
					var i, x, y, ARRcookies = document.cookie.split(";");
					for (i = 0; i < ARRcookies.length; i++) {
						x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
						y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
						x = x.replace(/^\s+|\s+$/g, "");
						if (x == c_name) {
							return unescape(y);
						}
					}
				}

				function setCookie(c_name, value, exdays) {
					var exdate = new Date();
					exdate.setDate(exdate.getDate() + exdays);
					var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
					document.cookie = c_name + "=" + c_value;
				}

				function checkCookie() {
					var username = getCookie("username");
					if (username !== null && username !== "") {
						alert("Welcome again " + username);
					} else {
						username = prompt("Please enter your name:", "");
						if (username !== null && username !== "") {
							setCookie("username", username, 365);
						}
					}
				}

				function showLegendOnLoad() {
					isAnimating = true;
					legendNode.css('right', -380);
					legendNode.stop().animate({
						'right': -400
					}, 1000, 'easeOutBounce', function() {
						isAnimating = false;
					});
					setCookie('show_onload', 'showed', 10);
				}
				tailNode.bind('click', toggleLegend);
				if(!getCookie('show_onload')) {
					showLegendOnLoad();
				}
			});
		});
	};
});