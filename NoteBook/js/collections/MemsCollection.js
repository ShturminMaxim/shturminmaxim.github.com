define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  '../models/MemModel'
], function($, _, Backbone, MemModel){
  var MemCollection = Backbone.Collection.extend({
      model:MemModel
  });

  return MemCollection;
});