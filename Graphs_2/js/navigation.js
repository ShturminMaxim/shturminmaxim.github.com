define(['./mediator'], function(mediator) {

	var menu_container = $('.navigation-menu ul');

		/// предполагаю здесь обращение к серверу и получение информации в виде массива названий пунктов меню.
		/// и подпунктов массива обьектовс именем каждого графика? Graph.example_recieved_graph_data[i].name
		/// тело функции
		/// получаем

		//Graph.table_names = [];
		//Graph.Graph.example_recieved_graph_names_array = []; не уверен

		var menu_items = ['Валовий внутрішній продукт'];

	$(menu_items).each(function(item, value) {
		menu_container.append('<li>'+value+'</li>');
	});

	menu_container.delegate(menu_container, 'click', function(event) {
		var target = $(event.target);

		if(target.is('li')) {
			mediator.publish('click', target.text());
		}
	});

	return function() {
		/*setTimeout(function() {
			mediator.publish('click', 'data');
		}, 3000);*/
	};
});