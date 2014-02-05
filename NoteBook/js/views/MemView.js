define([
  'jquery',
  'underscore',
  'backbone',
  'text!template/memTemplate.html' // get our templates like a text
], function($, _, Backbone, memTemplate){
    var MemView = Backbone.View.extend({
        tagName: 'tr',
        className : 'mem-item',
        initialize: function () {
            this.template = _.template(memTemplate);
            this.listenTo(this.model,'change', this.render);
            this.listenTo(this.model,'destroy', this.remove);
        },
        render: function(){
            var view = this.template(this.model.toJSON());
            this.$el.html(view);
            return this;
        }
    });

  return MemView;
});