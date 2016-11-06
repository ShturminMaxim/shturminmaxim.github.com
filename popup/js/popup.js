///Всплывающий ПопАп

function Some_popup(node, options) {
	///опции , максимальные и минимальные размеры
	this.max_width = options.max_width || '500';
	this.max_height = options.max_height || '500';
	this.min_height = options.min_height || '300';
	this.min_width = options.min_width || '300';

	var popup = $('.' + node);
	this.init(popup);
}

Some_popup.prototype.init = function(popup) {
	var self = this;
	var popup_background = '<div class="js-ms-popup-background"></div>';

	this.resize_and_centering_popup(popup);
	this.show(popup_background, popup);
	///делегируем клики
	$('body').click(function(event) {
		var target = $(event.target);
		if(target.hasClass("js-ms-popup-background") || target.hasClass('close-js-ms-popup')) {
			self.hide(popup_background, popup);
		}
	});
	///делегируем нажатия клавиш
	$('body').keydown(function(event) {
		///удаляем попап при нажатии на клавишу escape
		if(event.keyCode == 27) {
			self.hide(popup_background, popup);
		}
	});
};

Some_popup.prototype.resize_and_centering_popup = function(popup) {
	var inserted_info = ['iframe', 'img', 'object']; //массив названий нодов, на наличие которых мы проверяем попап.
	for (var i = 0; i < inserted_info.length; i++) {
		if((popup.children(inserted_info[i]).length) > 0) {

			this.max_width = parseInt(popup.children(inserted_info[i])[0].width, 10) + 100;
			this.max_height = parseInt(popup.children(inserted_info[i])[0].height, 10) + 100;
		}
	}

	popup.css("min-width", this.min_width + 'px');
	popup.css("min-height", this.min_height + 'px');
	popup.css("max-width", this.max_width + 'px');
	popup.css("max-height", this.max_height + 'px');
	popup.css('margin-top', '-' + parseInt((popup.height() / 2) + 10, 10) + 'px');
	popup.css('margin-left', '-' + parseInt((popup.width() / 2) + 10, 10) + 'px');
};

Some_popup.prototype.show = function(popup_background, popup) {
	var close_button = '<br><a class="close-js-ms-popup">X</a>';
	///добавляем бекграунд и сам ПопАп
	$('body').append(popup_background);
	$('.js-ms-popup-background').append(popup);
	$('.js-ms-popup-background').append(close_button);
	$(popup).show();
};

Some_popup.prototype.hide = function(popup_background, popup) {
	// Удаляем бекграунд с ПопАпом
	$(popup).hide();
	$('.js-ms-popup-background').remove();
};

$(function() {
	///при создании обьекта обязательным параметром является Класс блока, содержащего код ПопАпа. дополнительные необязательные параметры -
	/*
	Класс блока
	максимальная ширина,
	максимальная высота,
	минимальная ширина,
	минимальная высота

	передаются чистые цифры. TODO сделать проверку, если фдруг ктото решил передать строку или цифры с  текстом px
	*/
	var options = {
		max_width: '',
		max_height: '',
		min_height: '',
		min_width: ''
	};

	var popup = new Some_popup('js-ms-popup', options);
});