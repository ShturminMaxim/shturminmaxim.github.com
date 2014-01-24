define(['canvas','player'],function(canvas, player){
        var ctx = canvas.getContext("2d");
        var that = {};
        var mapRooms = player.playerItems.map;
        var mapBG = new Image();
        var roomBG = new Image();
        var roomActiveBG = new Image();

        roomActiveBG.src = './img/roombgActive.png';
        roomBG.src = './img/roombg.png';
        mapBG.src = './img/mapbg.png';


        that.drawMap = function(){
            var map = {
                name:'map',
                drawable:false
            };
            map.draw = function(){
                var size = 20;
                var currPlayerPositionOnMap = player.getPosition();

                //ctx.fillStyle = "rgb(0,0,0)";
                ctx.drawImage(mapBG,0,0,220,320,10,10,220,320);
                for(var row = 0; row<mapRooms.length; row += 1) {
                    for(var cell = 0; cell<mapRooms[row].length; cell += 1) {
                        if(mapRooms[row][cell]) {
                            //ctx.fillStyle = "rgb(216,216,216)";
                            ctx.drawImage(roomBG, 0, 0, size, size,(20+(cell*size)),(20+(row*size)),size,size);
                        }
                    }
                }
                //ctx.fillStyle = "rgb(215,167,167)";
                ctx.drawImage(roomActiveBG, 0, 0, size, size, (20+(currPlayerPositionOnMap[1]*size)),(20+(currPlayerPositionOnMap[0]*size)),size,size);
            };
            map.events = (function(){
                var buttonContainer = $('.interface');
                var mapButton = '.map';
                buttonContainer.on('click', '.map', function(e){
                    e.preventDefault();
                    map.drawable ? map.drawable=false : map.drawable = true;
                });
            }());
            return map;
        };
        return that;
});