/**
 * RequireJS modules base configuration
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        phaser : 'lib/phaser.min',  // Phaser canvas framework
        q : 'lib/q',                // Q - promises library
        game : 'game',              // main game module
        stage : 'stage',            // game field
        sources : 'sources'         // images data
    },
    shim : {
        'game' : {
            deps:['q']
        }
    }
});

/**
 * Load the main game files.
 */
require(['phaser','q','sources', 'stage', 'game'], function(){
    var game = require('game');

    window.Q = require('q'); // promises will be used on global level

    game.init();
});