/**
 * Created by Max on 02.03.2015.
 */
define(function(){
    var imagesRoot = 'img/';
    var data = {
        imagesRoot:'img/',
        imagesManifest : [
            //Maps Images
            {src: "bg/skyHD.png", id:"skymap"},
            {src: "planets/testPlanetHD.png", id:"planet_1"},

            //main images
            {src: "rock.png", id: "rock"},
            {src: "asteroid.png", id: "asteroid"},
            {src: "ship.png", id: "ship"},
            {src: "base.png", id: "defaultBase"},
            {src: "shipSprite.png", id: "shipSprite"},

            //bullets
            {src: "bullet.png", id:"bullet"},
            {src: "bullets/bullet1.png", id:"bullet1"},

            //collectable items
            {src: "coin.png", id: "coin"},
            {src: "fuelbox.png", id: "fuel"},
            {src: "animatedItems/rareMineral.png", id: "rareMineral"},

            {src: "ammoBox.png", id: "ammoBox"},
            //blow Sprites
            {src: "blowSprite.png", id: "blow"},

            {src: "BigBlow.png", id: "bigBlow"},
            //buttons
            {src: "left_key_btn.png", id:"leftbtn"},
            {src: "right_key_btn.png", id:"rightbtn"},
            {src: "fire_btn.png", id:"firebtn"},

            //enemies images
            {src: "enemy_2.png", id:"enemy_1"}
        ],
        shipsSprites : {
            smallShip: {
                // image to use
                images: [imagesRoot+'shipSprite.png'],
                // width, height & registration point of each sprite
                frames: {width: 20, height: 20, regX: 10, regY: 10},
                animations: {
                    fly: [0, 3, "fly", 0.5]
                }
            }
        },
        maps:{
            default:{

            }
        }
    };

    return data;
});