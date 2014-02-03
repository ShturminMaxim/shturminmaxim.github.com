define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
    './views/MemList'
], function($, _, Backbone, MemListView){
       function init(){
           console.log('app init');
           var view = new MemListView(this.model);
           view.render();
       }
  return {
      init:init
  };
});