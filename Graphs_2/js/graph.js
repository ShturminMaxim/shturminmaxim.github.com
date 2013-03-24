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
				data: [17.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 91.6],
				visible: false,
				zIndex: 1
			}, {
				name: 'Сільське господарство, мисливство, лісове господарство',
				data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 82.6, 24.5],
				visible: false,
				zIndex: 1
			}, {
				name: 'Добувна промисловість',
				data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 31.9, 14.0],
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


			var chart;
			chart = new Highcharts.Chart({
				chart: {
					renderTo: 'container',
					type: 'line',
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

			$('.new-legend>div').text('');
			for (var i = 0; i < Graph.example_recieved_graph_data.length; i++) {
				if (i < (Graph.example_recieved_graph_data.length / 3)) {
					//console.log("1-" + i);
					$('.new-legend-1').append('<li data-series-id="' + i + '"><a>' + Graph.example_recieved_graph_data[i].name + '</a></li>');
					continue;
				}
				if (i < (Graph.example_recieved_graph_data.length / 3) * 2) {
					//console.log("2-" + i);
					$('.new-legend-2').append('<li data-series-id="' + i + '"><a>' + Graph.example_recieved_graph_data[i].name + '</a></li>');
					continue;
				}
				if (i < (Graph.example_recieved_graph_data.length)) {
					//console.log("3-" + i);
					$('.new-legend-3').append('<li data-series-id="' + i + '"><a>' + Graph.example_recieved_graph_data[i].name + '</a></li>');
				}
				//console.log(Graph.example_recieved_graph_data[i].name);
			}

			var tranform_attr = $('.highcharts-legend').attr('transform');
			var X_pos_from_transform_attr = /\d+/.exec(tranform_attr);
			var hiding_timer;
			// console.log(a, b);

			var null_position = X_pos_from_transform_attr[0];
			console.log(null_position);

			$('.highcharts-legend').hide();
			$('#toggle-legend').text('Скрыть легенду');
			$('.buttons').show();

			function hide_toggle() {
				$('.new-legend').stop();
				$('.new-legend').animate({
					height: 'toggle'
				}, 1000);
				if($('#toggle-legend').text() === 'Показать легенду') {
					$('#toggle-legend').text('Скрыть легенду');
				} else {
					$('#toggle-legend').text('Показать легенду');
				}
				hiding_timer = false;
			}

			//$('#hide-legend-button').on('click', hide_legend);

			$('#toggle-legend').on('click', hide_toggle);

			/*$('.new-legend li').on('click', function() {
				if(!hiding_timer) {
					console.log("must hide");
					hiding_timer = true;
					setTimeout(hide_toggle, 5000);
				}
			});*/

			var this_chart = $('#container').highcharts();
			var new_legend_item = $('.new-legend li');
			new_legend_item.click(function() {
				var item_id = $(this).attr('data-series-id');
				var series = this_chart.series[item_id];
				if (series.visible) {
					series.hide();
					$(this).find('a').css('color', 'red');
					//$button.html('Show series');
				} else {
					series.show();
					$(this).find('a').css('color', 'green');
					//$button.html('Hide series');
				}
			});

			$('#hide-all-series').on('click', function(e) {
				var series_length = this_chart.series;
				for (var i = 0; i < series_length.length; i++) {
					series_length[i].hide();
					$(new_legend_item[i]).find('a').css('color', 'blue');
				}
			});
		});
	};
});