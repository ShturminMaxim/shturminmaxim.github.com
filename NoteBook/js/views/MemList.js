define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  '../models/MemModel',
  'collections/MemsCollection',
  'views/MemView',
  'text!template/mainMemListTemplate.html', // get our templates like a text
], function($, _, Backbone, MemModel, MemCollection, MemView, mainMemListTemplate){
       var MemListView = Backbone.View.extend({
           el:$(".container"),
           memContainer:this.$('#mems'),
           initialize:function(){
                this.collection = new MemCollection();
                this.listenTo(this.collection, "add", this.addMem);
           },
           render:function(){
               this.compiledTemplate = _.template(mainMemListTemplate, {date : (function(){
                   var d = new Date();

                   return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
               }())});
               this.$el.append(this.compiledTemplate);

               this.$('.activity').focus();
           },
           addObj:function(){
               var activity = this.$('.activity').val();
               var time = this.$('.time').val();
               var myModel = new MemModel({
                   activity:activity,
                   time:time
               });
               if(activity && activity.length) {
                   this.collection.add(myModel);
                   this.$('.activity').val('');
                   this.$('.time').val('');
               }

           },
           addMem:function(model){
               var view = new MemView({model: model});
               $('#mems').append(view.render().el);
           },
           events: {
               'click .more': function(){
                   this.$el.find('.additional-field').toggle();
               },
               'click .addMem': function(){
                    this.addObj();
               },
               'keyup .time' : function(e){
                   $(e.target).val($(e.target).val().replace(/\D+/gi,''));
               },
               'keypress .form-table': function(e){
                   console.log('key pressed' + e.keyCode);
                      if(e.keyCode === 13) {
                          console.log('enter pressed');
                          this.addObj();
                      }
               }
           }
       });
  return MemListView;
});