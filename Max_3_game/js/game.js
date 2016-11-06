/**
 * Created by Maxim on 26.11.2015.
 */
define(['sources', 'bag', 'stage'], function (sources, bag, stage) {
    /**
     *  Game instance
     */
    var game;

    /**
     * Game Images list
     * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string}}
     */
    var images = sources.images;

    /**
     * Phaser Framework base initial methods
     * @type {{preload: phaserBaseMethods.preload, create: phaserBaseMethods.create, update: phaserBaseMethods.update}}
     */
    var phaserBaseMethods = {
        preload:function() {
            for(var image in images) {
                game.load.image(image, 'assets/'+images[image]+'.png');
            }
        },
        create:function() {
            stage.init(game);
            game.input.mouse.capture = true;
        },
        update:function() {}
    };

    return {
        get game() {
            return game;
        },
        init: function(){
            /**
             * Create game instance
             * @type {c.Game}
             */
            game =  new Phaser.Game(
                window.innerWidth,
                window.innerHeight,
                Phaser.AUTO, '',
                {
                    preload: phaserBaseMethods.preload,
                    create: phaserBaseMethods.create,
                    update: phaserBaseMethods.update
                }
            );
        }
    };
});