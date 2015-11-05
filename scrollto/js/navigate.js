///TODO
/// Полечить баг с вызовом множества Публикаций в медиатр при простом скролле.
/// Полечить баг с вызовом метода move_to_anchor() что бы определять какие данные переданы в функцию айдишник или имя.
/*global window $ console*/
;(function(mediator) {
	'use strict';

	function Horizontal_nav_menu(container, onMenuSuccess) {
		this.onMenuSuccess = onMenuSuccess || '';
		this.container = $(container);
		this.anchor_params_obj = {};
		this.anchors_arr = $("a[data-title]");
		this.init();
	}

	Horizontal_nav_menu.prototype.init = function() {
		this.move_to_anchor_animation = false;
		this.get_anchors();
		//создаем меню
		this.create_menu();
		//проверяем, есть ли в урл индекс якоря, если есть, то скролим к якорю
		this.check_url();
		//делегируем скроллинг
		this.screen_srolling();
	};

	Horizontal_nav_menu.prototype.get_anchors = function() {
		var anchor_name, anchor_menu_name;
		var self = this;
		/// если якоря присутствуютна странице, выполняется функция onMenuSuccess
		if(this.anchors_arr.length > 0) {
			////создаем обьект anchors_object для формирования меню -> name : data-title
			this.anchors_arr.each(function(anchor) {
				anchor_name = $(this).attr('name');
				anchor_menu_name = $(this).attr('data-title');
				self.anchor_params_obj[anchor_name] = anchor_menu_name;
			});
		} else {
			alert('no anchors on page');
		}
	};

	Horizontal_nav_menu.prototype.create_menu = function() {
		var menu = '<ul style="display:none; position:fixed; z-index:1000;" id="navigation_menu"></ul>';
		var menu_item, obj_item, index, name, title, menu_item_text, resized_item_text, index_counter = 0;
		$('body').prepend(menu);
		var menu_container = $('#navigation_menu');

		for(obj_item in this.anchor_params_obj) {
			index = index_counter++;
			name = obj_item;
			title = this.anchor_params_obj[obj_item];
			menu_item_text = this.anchor_params_obj[obj_item];
			resized_item_text = menu_item_text.substring(15, -15) + '...';
			menu_item = '<li class="navigation_menu-item" style="list-style:none;margin:10px;background:#fff;border:solid 6px blue;border-radius: 0 0 5px 5px;display:inline;" name="' + name + '" title="' + title + '" href="#' + index + '">' + resized_item_text + '</li>';
			menu_container.append(menu_item);
		}
		menu_container.show();
		this.onMenuSuccess();
		this.click_delegate(menu_container);
	};

	Horizontal_nav_menu.prototype.click_delegate = function(menu_container) {
		var self = this;

		menu_container.click(function(event) {
			var target = $(event.target);
			var anchor_id, anchor_name;

			if(target.hasClass('navigation_menu-item')) {
				self.create_data_bject_for_publish(target);
				// подсветка меню , передвижение к якорю и создание линка на этот якорь
				self.menu_item_light_up(target);
				self.move_to_anchor(self.anchor_params_obj);
				self.create_link_to_anchor(target);
				//передаем информацию о собутии в медиатр
				self.publish_actions_for_mediator('navTo', self.anchor_params_obj);
			}
		});

	};

	Horizontal_nav_menu.prototype.menu_item_light_up = function(menu_item) {
		this.menu_item_darkening();
		menu_item.addClass('active');
		menu_item.css('background', 'red');
	};

	Horizontal_nav_menu.prototype.menu_item_darkening = function(menu_item) {
		var active_menu_item = $('.navigation_menu-item.active');
		active_menu_item.css('background', 'white');
		active_menu_item.removeClass('active');
	};

	Horizontal_nav_menu.prototype.move_to_anchor = function(anchor_params_obj) {
		var self = this;
		var item, item_name, item_id, anchor_id;

		self.move_to_anchor_animation = true; ///флаг анимации свидетельствует о начале движения
		$.scrollTo.window().stop(true); //останавливаем текущую анимацию.
		if(anchor_params_obj.anchor_name) {
			item_name = anchor_params_obj.anchor_name;
			item = $('a[name="' + item_name + '"]');
		} else {
			anchor_id = anchor_params_obj.anchor_id;
			if(anchor_id > this.anchors_arr.length) {
				return;
			} else {
				item = this.anchors_arr[anchor_id];
			}
		}
		//Скроллирование к якорю
		$.scrollTo(item, 2000, {
			queue: false,
			offset: {top:-50, left:0},
			onAfter: function() {
				self.move_to_anchor_animation = false; ///флаг анимации свидетельствует об окончании движения
			}
		}
		);
	};
///обработка ручного скроллирования пользователем
	Horizontal_nav_menu.prototype.screen_srolling = function() {
		var anchor, anchor_top, anchor_name, menu_item, scroll_flag;
		var self = this;

		$(document).scroll(function() {
			self.anchors_arr.each(function(elem) {
				if(!self.move_to_anchor_animation) {
					anchor = $(this);
					anchor_name = anchor.attr('name');
					menu_item = $('li[name="' + anchor_name + '"]');

					if(this.getBoundingClientRect().top >= 10 && this.getBoundingClientRect().top <= 100) {
						// подсветка пункта меню , создание линка на этот якорь
						self.create_data_bject_for_publish(menu_item);
						self.create_link_to_anchor(menu_item);
						self.publish_actions_for_mediator('navScrollTo', self.anchor_params_obj);
						self.menu_item_light_up(menu_item);
					}
				}
			});

		});
	};

	Horizontal_nav_menu.prototype.create_data_bject_for_publish = function(item) {
		this.anchor_params_obj.anchor_id =
		this.anchor_params_obj.anchor_name = item.attr('name');
	};

	Horizontal_nav_menu.prototype.move_to_home = function() {
		//ToDo
	};

	Horizontal_nav_menu.prototype.check_url = function() {
		//var pattern=/(?:#)\d+/;
		var self = this;
		var url = window.location.hash;
		var index = url.replace('#', '');
		if(index) {
			setTimeout(function() {self.move_to_anchor({anchor_id:index});}, 500);
		} else {
			return;
		}
	};

	Horizontal_nav_menu.prototype.create_link_to_anchor = function(item) {
		var index_for_url = item.attr('name');
		window.location.hash = index_for_url;
	};

	Horizontal_nav_menu.prototype.publish_actions_for_mediator = function(action, params) {
		mediator.publish(action, params);
	};

	window.Horizontal_nav_menu = Horizontal_nav_menu;

}(mediator));

$(function() {
	var success_function = function() {
			console.log('ok');
		};
	new Horizontal_nav_menu('#for-nav-menu', success_function);

});