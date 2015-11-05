/**
 * Created by Max on 06.03.2015.
 */
/* global jQuery, $ */
define(function(){
    var dialog = $('.dialog');
    var dialogData = {
        avatar:'',
        text:''
    };
    var interface = {
        parce:function(){

        },
        show:function(){
            dialog.show();
        },
        hide:function(){
            dialog.hide();
        },
        setContent:function(options){
            dialog.html()
        }
    };

    return interface;
});