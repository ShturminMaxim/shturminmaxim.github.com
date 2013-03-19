define(['./mediator'], function(mediator) {

	var menu_container = $('.navigation-menu ul');

		/// предполагаю здесь обращение к серверу и получение информации в виде массива названий пунктов меню.
		///
		/// тело функции
		///
		var menu_items = ['Валовий внутрішній продукт', 'второй график'];

	$(menu_items).each(function(item, value) {
		menu_container.append('<li>'+value+'</li>');
	});

	menu_container.delegate(menu_container, 'click', function(event) {
		var target = $(event.target);
		mediator.publish('click', target.text());
	});

	return function() {
		/*setTimeout(function() {
			mediator.publish('click', 'data');
		}, 3000);*/
	};
});