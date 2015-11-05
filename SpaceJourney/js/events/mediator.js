define([],function(){
    var mediator = (function () {
        'use strict';
        var events;

        events = {};
        return {
            on : function (event_name, callback) {
                if (!events[event_name]) {
                    events[event_name] = [];
                }
                events[event_name].push(callback);
            },

            off : function (event_name, callback_) {
                if (arguments.length === 1) {
                    delete events[event_name];
                } else {
                    if (events[event_name]) {
                        events[event_name] = events[event_name].filter(function (callback) {
                            return callback !== callback_;
                        });
                    }
                }
            },

            trigger : function (event_name, data) {
                var callbacks;
                var i;

                callbacks = events[event_name];
                if (callbacks && callbacks.length) {
                    for (i = 0; i < callbacks.length; i += 1) {
                        callbacks[i].call(undefined, data);
                    }
                }
            }
        }
    }());

    return mediator;
});