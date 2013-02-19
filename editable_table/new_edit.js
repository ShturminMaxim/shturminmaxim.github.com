///Скрипт добавляет обработчик ячейкам таблицы для последующего их редактирования и внесения изменений в Базу Данных

$(function() {
    document.onclick = function(event) {
        //   console.log(event.target);
        var target = $(event.target);
        if(target.hasClass('editable')) {
            new Editable_cell(target);
        }
    };

    function Editable_cell(node) {
        this.form_display_control(node); ///проверка на наличие формы в таблице и ячейке
        var present_cell_data = node.text();
        this.add_form(node, present_cell_data); ///доавбляем форму в ячейку с ее текущим значением
        this.buttons_click(node); // добавляем обработчик событий для данной ноды
    }

    //управление отображаеним формы до ее добавления в ячейку
    Editable_cell.prototype.form_display_control = function(node) {
        //контролируем, что бы форма была одна
        if(node.find('input').length) { //проверяем произошел ди клик по ноде, в которой уже есть форма
            return false;
        } else {
            this.delete_active_form(); //удаляем активную форму, если она присутствует
        }
    };
    ///функция добавления активной формы
    Editable_cell.prototype.add_form = function(node, present_cell_data) {
        var cell_form = '<div class="cell-form"><input type="text" id="edit" value="' + present_cell_data + '"></input><button id="ok">ok</button><button id="cancel">no</button></div>';
        node.empty(); ///очищаем
        node.append(cell_form); ///добавляем код формы
        node.addClass(' active'); ///ставим класс active
        $('#edit').focus().select(); ///выделяем весь текст в форме
    };
    ////функция удаления активной формы
    Editable_cell.prototype.delete_active_form = function() {
        var active_node_with_form = $('td.active'); /// ищем в документе ячейку с классом active
        var value = active_node_with_form.find('input').val(); /// получаем данные из ячейки
        active_node_with_form.empty(); /// очищаем удаляя форму
        active_node_with_form.text(value); ///добавляем текст
        active_node_with_form.removeClass('active'); ///удаляем класс active
    };

    Editable_cell.prototype.send_new_cell_data = function(node) {
        //отправляем на сервер новую информацию
        var self = this;
        var id = node.parents('tr').attr('data-object-id'); //id для БД
        var field = node.attr('data-field-name'); //имя изменяемого столбца для БД
        var new_value = $('#edit').val(); // новое значение ячейки для БД
        $.ajax({
            url: '/check/edit.php',
            // наш url который обрабатываем запрос
            type: 'get',
            // это просто запрос, не изменяющий данные, юзаем get (+он быстрее)
            dataType: 'json',
            data: {
                data: new_value,
                id: id,
                row: field
            }
        }).success(function(data) {
            self.delete_active_form(); // при успешном завершении работы аякса удаляем форму
        }).error(function(data) {
            // если произошла ошибка
            alert('Ошибка выполнения запроса');
        });
        return false;
    };

    Editable_cell.prototype.buttons_click = function(node) {
        var self = this;
        ///обработчик нажатия на клавишу Enter
        $('#edit').keydown(function(event) {
            if(event.keyCode == 13) {
                //вызываем функцию отправки данных по ентеру
                self.send_new_cell_data(node);
                //  console.log("отправляем данные....");
                return false;
            }
            ///удалим форму при нажатии на клавишу escape
            if(event.keyCode == 27) {
                self.delete_active_form();
            }
        });
        // нажатие на кнопку ОК
        $('#ok').click(function() {
            //вызываем функцию отправки
            self.send_new_cell_data(node);
            console.log();
            console.log("отправляем данные....");
            return false;
        });
        // нажатие на кнопку отмена
        $('#cancel').click(function() {
            self.delete_active_form();
            console.log("отмена ввода...");
        });
    };

});