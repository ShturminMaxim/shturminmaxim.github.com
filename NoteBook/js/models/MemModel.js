define([
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function(_, Backbone){

    var MemModel = Backbone.Model.extend({
        defaults: {
           /* task : 'regular',
            client: 'q',*/
            activity : 'a',
            time: '-',
      /*      link : 'a',*/
            date : function(){
                var currDate = new Date();
                var data = {
                    day : currDate.getDay(),
                    month: currDate.getMonth()+1,
                    year: currDate.getFullYear(),
                    time : (function(){
                        return currDate.getHours()+':'+currDate.getMinutes()+':'+currDate.getSeconds()
                    }())
                };

                return data;
            },
        },
        initialize: function(){}
    });

  return MemModel;
});