/**
 * Created by Max on 11.02.2015.
 */
define(['game','loader','mediator'], function(game, loader, mediator){
    var makeBlow = function(options) {
        var blowSprite;
        var blowTypes = {
            smallBlow : new createjs.SpriteSheet({
                // image to use
                images: [loader.getResult("blow")],
                // width, height & registration point of each sprite
                frames: {width: 30, height: 30, regX: 15, regY: 15},
                animations: {
                    blow: [0, 6]
                }
            }),
            bigBlow : new createjs.SpriteSheet({
                // image to use
                images: [loader.getResult("bigBlow")],
                // width, height & registration point of each sprite
                frames: {width: 28, height: 34, regX: 14, regY: 17},
                animations: {
                    blow: [0, 7]
                }
            })
        };

        if(options.blowType) {
            blowSprite = blowTypes[options.blowType];
        } else {
            blowSprite = blowTypes['smallBlow'];
        }

        var blow = new createjs.Sprite(blowSprite, "blow");
        blow.x = options.x || 10;
        blow.y = options.y || 10;
        blow.name = "blow";
        game.mainContainer.addChild(blow);
        if(options.destroyedElem) {
            game.mainContainer.removeChild(options.destroyedElem);
        }
        blow.gotoAndPlay("blow");
        blow.on("animationend", function(){
            game.mainContainer.removeChild(blow);
        });
    };

    mediator.on('createBlow', makeBlow);

    return {
        makeBlow : makeBlow
    }
});