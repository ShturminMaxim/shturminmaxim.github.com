// TODO сделать в стиле ООП, подредактировать верстку.
"use strict"; /*global $ document console window*/
$(function() {
	var form_to_validate = $('.login-form');
	var tooltip = $('.tooltip');
	///Создаем обьекты для валидации
	var form_items = {
		name: {
			box_name: 'name',
			box: $('input[name=name]'),
			validation_pattern: / */,
			min_length: -1,
			is_valid: true,
			tooltip_message: 'Введите ваше имя',
			valid_message: 'Проверено.',
			not_valid_message: 'Неверно введено имя'
		},
		email: {
			box_name: 'email',
			box: $('input[name=email]'),
			validation_pattern: /\w+@\w+/,
			min_length: 5,
			is_valid: false,
			tooltip_message: 'Введите настоящий почтовый адрес',
			valid_message: 'Почтовый адрес проверен',
			not_valid_message: 'Неверный почтовый адрес, перепроверьте'
		},
		password: {
			box_name: 'password',
			box: $('input[name=password]'),
			validation_pattern: /^[a-zA-Z0-9]+\d+[a-zA-Z0-9]*$/,
			min_length: 6,
			is_valid: false,
			tooltip_message: 'Минимум 6 символов. Должен содержать цифру.',
			valid_message: 'Пароль в порядке',
			not_valid_message: 'Минимум 6 символов. Должен содержать цифру.'
		},
		telefone: {
			box_name: 'telefone',
			box: $('input[name=telefone]'),
			validation_pattern: /^(\d8)(\d{3})(\d{7})$/,
			min_length: 10,
			is_valid: false,
			tooltip_message: 'Номер должен начинаться на 380.. Только цифры.',
			valid_message: 'Телефон проверен',
			not_valid_message: 'Номер должен начинаться на 380.. Только цифры.'
		},
		checkbox: {
			checked_items: {},
			box: $('ul[name=checkbox]'),
			min_checked_items: 3,
			is_valid: false,
			tooltip_message: 'Min checked items is 3',
			valid_message: 'Выбор подтвержден',
			not_valid_message: 'Выберите минимум 3 пункта.'
		}
	};
	var validation_inputs_arr = [form_items.email, form_items.password, form_items.telefone, form_items.checkbox];

	function show_tooltip(box, message) {
		var label = box.closest('div').find('label');

		tooltip.text(message);
		tooltip.offset({
			top: label.offset().top,
			left: label.offset().left + label.width() + 5
		});
		tooltip.show();
	}

	function hide_tooltip() {
		tooltip.text('');
		tooltip.offset({
			top: 0,
			left: 0
		});
		tooltip.hide();
	}
	///при фокусе показываем тултип
	$('input').on('focus', function(event) {
		var target = $(event.target);
		var input_name = target.attr('name');

		show_tooltip(target, form_items[input_name].tooltip_message);
	});
	////При уходе курсора с инпута, скрываем тултип
	$('input').on('blur', function(event) {
		hide_tooltip();
	});

	///Валидация при изменнии данных в инпутах
	form_to_validate.on('change', function(event) {
		var target = $(event.target);
		var input_name = target.attr('name');

		if(target.attr('type') != "checkbox") {
			validate_input(input_name);
		} else {
			validate_checkboxes(target);
		}
	});

	//Валидируем инпуты
	function validate_input(input_name) {
		var is_validate = form_items[input_name].validation_pattern.test(form_items[input_name].box.val());
		var is_valid_length = form_items[input_name].box.val().length > form_items[input_name].min_length;

		if(is_validate && is_valid_length) {
			add_validation(form_items[input_name], form_items[input_name].box, true);
			return true;
		} else {
			add_validation(form_items[input_name], form_items[input_name].box, false);
			return false;
		}
	}

	//отдельно валидируем чекбоксы
	function validate_checkboxes(checkbox_item) {
		var checkbox_item_name = checkbox_item.attr('name');
		var checkbox_item_title = checkbox_item.parent().find('label').text();
		///Используем обьект, вдруг нам в будущем понадобятся данные о выбранных чекбоксах
		if(checkbox_item.prop('checked')) {
			form_items.checkbox.checked_items[checkbox_item_name] = checkbox_item_title;
		} else {
			delete form_items.checkbox.checked_items[checkbox_item_name];
		}
		if(Object.keys(form_items.checkbox.checked_items).length >= form_items.checkbox.min_checked_items) {
			add_validation(form_items.checkbox, form_items.checkbox.box, true);
			return true;
		} else {
			add_validation(form_items.checkbox, form_items.checkbox.box, false);
			return false;
		}
	}

	///добавляем или удаляем из инпутов класс, который раскрашивает инпут в нужный цвет.
	function add_validation(input_item, box, valid) {
		view_message(box, valid);
		if(valid) {
			input_item.is_valid = true;
			box.removeClass('not-valid');
			box.addClass('valid');
		} else {
			input_item.is_valid = false;
			box.removeClass('valid');
			box.addClass('not-valid');
		}
	}

	///Сообщения
	function view_message(box, is_valid) {
		var elem;
		var box_name = box.attr('name');

		function create_elem(node_class) {
			elem = $('<div/>', {
				"class": ' message ' + node_class,
				"name": box_name
			});
			return elem;
		}
		if(is_valid) {
			create_elem('valid-message');
			elem.text(form_items[box_name].valid_message);
		} else {
			create_elem('not-valid-message');
			elem.text(form_items[box_name].not_valid_message);
		}
		$('div[name=' + box_name + ']').remove();
		$(elem).insertAfter(box.parent());
	}
	//Делегируем сабмит
	$(window).delegate(form_to_validate, 'submit', function(event) {
		//проверим еще разок, все ли инпуты прошли валидацию
		for(var i = 0; i < validation_inputs_arr.length; i++) {
			if(validation_inputs_arr[i].is_valid === true) {
				continue;
			} else {
				event.preventDefault();
				//если нашлось невалидное поле, выведем сообщение
				view_message(validation_inputs_arr[i].box, false);
				if(validation_inputs_arr[i + 1]) { //если присутствует следующий лемент в массиве, продолжим, если нет, то остановим отправку формы
					console.log(validation_inputs_arr[i + 1]);
					continue;
				}
				return false;
			}
		}
	});
});