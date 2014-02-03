require.config({
    paths: {
        jquery: 'lib/jquery-1.10.2.min',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone'
    } ,
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'app'
], function($, _, Backbone, app){
    console.log('main init');
    app.init();
});