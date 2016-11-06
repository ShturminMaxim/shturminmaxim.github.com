/**
 * Created by Max on 10.02.2015.
 */
define(['mainData'],function(mainData){
    var loader = new createjs.LoadQueue(false);
    loader.loadManifest(mainData.imagesManifest, true, mainData.imagesRoot);

    return loader;
});