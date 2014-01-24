// TODO too much functions here, need to create new modules.
require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.10.2.min'
    }
});

require(['jquery','canvas','redrawer','player','level','map','interface'], function($, canvas, redrawer, player, level, map, interface) {
  $(function(){
      var frame = 0;
      var framesInRow = 9;
      var frameSize = {
          x:64,
          y:54
      };
      var step = 5;
      var x = 0;
      var nullPos = 0;
      var curX = 100;
      var curY = 100;
      var keyMap = {
          '37':0,
          '38':0,
          '39':0,
          '40':0
      };
      var keyToAnimation = {
          '37':75,
          '38':13,
          '39':204,
          '40':138
      };
      var side = '40';
      var ctx = canvas.getContext('2d');
      var playerImage;
      var animation;
      var currStageRow = 0;
      var currStageRowRoom = 0;
      var images = {
        //player Sprite
          defaultPlayer : "./img/character/walkcycle/BODY_male.png",
          hair: "./img/character/walkcycle/HEAD_hair_black.png",
          test: "./img/character/walkcycle/WEAPON_shield_cutout_chain_armor_helmet.png",
        // Wearing
        // Lether
          letherHead: "./img/character/walkcycle/HEAD_leather_armor_hat.png",
          letherTors: "./img/character/walkcycle/TORSO_leather_armor_shirt_white.png",
          letherShoulders: "./img/character/walkcycle/TORSO_leather_armor_shoulders.png",
          letherArmor: "./img/character/walkcycle/TORSO_leather_armor_torso.png",
          letherShoes: "./img/character/walkcycle/FEET_shoes_brown.png",
        // Mail
          mailHead: "./img/character/walkcycle/HEAD_chain_armor_hood.png",
          mailTors: "./img/character/walkcycle/TORSO_chain_armor_torso.png",
          plateBoots: "./img/character/walkcycle/FEET_plate_armor_shoes.png",
        // Chain
          chainHelmet: "./img/character/walkcycle/HEAD_chain_armor_helmet.png",    
        // Weapon
        // ShortSword
          shortSword: "./img/character/walkcycle/WEAPON_short_sword.png",   
        // Background
          backGroundSprite : "./img/ground.png"
      };
      var playerWearing = [];
      var loadedImages = {};
      var imagesPreloader = function(images, callback){
          var totalImages = Object.keys(images).length;
          var loadedImgCount = 0;
          for(var img in images) {
              loadedImages[img] = new Image();
              loadedImages[img].src = images[img];
              loadedImages[img].onload = function(){
                  loadedImgCount += 1;
                  if(loadedImgCount === totalImages) {
                      callback(loadedImages);
                  }
              }
          }
      }

      function changeHat() {
          playerImage = loadedImages['playerWithHat'];
      };
      var playerEdges = function() {
          return {
              left: curX+20,
              right: curX+(frameSize.x)-20,
              top:  curY+30,
              bottom:  curY+(frameSize.y)-5
          };
      };

      //test ground element for collision test
      // TODO try to optimize level elements
/*      var elements = {
          rock: {
              coords: [129,0]
          },
          chest : {
               coords :[24,384,24,38]
          }
      };*/
      // TODO elements optimization needed!!!
      var gorundElements = [
          {id:0, name:'rock', coords:[129,0]},
          {id:1, name:'trees', coords:[96,193]},
          {id:2, name:'smallTree', coords:[64,194], bg:1},
          {id:3, name:'water', coords:[192,0]},
          {id:4, name:'fenceV', coords:[352,0]},
          {id:5, name:'fenceH', coords:[0,384,16]},
          {id:6, name:'grass', coords:[10,40]},
          {id:7, name:'chestClosed', coords:[24,384,24,38], drop:1},
          {id:8, name:'chestOpened', coords:[48,384,24,38], drop:0},
          {id:9, name:'house1', coords:[320,225,144,133]},
          {id:10, name:'doorClosedV', coords:[320,154,32,64]},
          {id:11, name:'doorOpenedV', coords:[352,154,32,64], bg:1},
          {id:12, name:'doorClosedH', coords:[320,96,64,32]},
          {id:13, name:'doorOpenedH', coords:[320,120,64,32], bg:1},
          {id:14, name:'peaceOfTree', coords:[320,360,64,24]},
          {id:15, name:'peaceOfgold', coords:[80,384,32,32], drop:2},
          {id:16, name:'plants1', coords:[382,358,32,32], bg:1},
          {id:17, name:'plants2rocks', coords:[412,358,32,32], bg:1},
          {id:18, name:'plants3rgassWithRocks', coords:[443,358,64,64], bg:1},
          {id:19, name:'plants4', coords:[443,358,32,32], bg:1},
          {id:20, name:'greenTree', coords:[0,450,64,64]},
          {id:21, name:'appleTree', coords:[64,450,64,64]},
          {id:22, name:'spruce', coords:[0,514,64,64]},
          {id:23, name:'spruceCross', coords:[64,514,64,64]},
          {id:24, name:'buffer', coords:[0,514,32,32]},
          {id:25, name:'buffer', coords:[64,514,32,32]},
          {id:26, name:'stonePentagram', coords:[480,225,32,64]},
          {id:27, name:'dragonOnStone', coords:[0,578,64,64]},
          {id:28, name:'dragonLigths1', coords:[64,578,50,62]},
          {id:29, name:'dragonLigths2', coords:[115,578,55,62]},

      ];

      var elementsAnimation = {
          openChest : function(item){
              item.bgCoords = [49,384,24,38];
          },
          closeChest : function(item){
              item.bgCoords = [24,384,24,38];
          },
          openDoor : function(item){
              if(item.type === 10) {
                  item.bgCoords = gorundElements[11].coords;
              }
              if(item.type === 12) {
                  item.bgCoords = gorundElements[13].coords;
              }
          },
          openDoorH : function(item){
              item.bgCoords = gorundElements[13].coords;
          }
      };
      var rockSize = 32;
      var rock;

      var rocks = [];
      var backgorundElems = [];

      function playerMapAddroom(currStageRow, currStageRowRoom) {
          var map = player.playerItems.map;

          if(!map[currStageRow]) {
              map[currStageRow] = [];
          }
          map[currStageRow][currStageRowRoom] = 1;
      }
      function mapUpdate(){
          player.setPosition([currStageRow, currStageRowRoom]);
          playerMapAddroom(currStageRow, currStageRowRoom);
      }

      function createElem(data){
          var elemType = gorundElements[data.type];
          var elemData = elemType.coords;
          var elemSizeX = elemData[2] || rockSize;
          var elemSizeY = elemData[3] || rockSize;
          var drop = gorundElements[data.type].drop;

          var elem = {
              img: rock,
              posX: data.posX,
              posY: data.posY,
              bgCoords: elemData,
              type: data.type,
              posInLevel : data.posInLevel,
              drop: drop || 0,
              bg: gorundElements[data.type].bg || 0
          }
          elem.edges = {
              left: parseInt(elem.posX , 10),
              right: parseInt(elem.posX+elemSizeX , 10),
              top:  parseInt(elem.posY , 10),
              bottom:  parseInt(elem.posY+elemSizeY , 10)
          }
          return elem;
      };

      function fillStage() {
          rocks = [];
          backgorundElems = [];
          var elements = [null, rock];
          var totalX = canvas.width/32;
          var totalY = canvas.height/32;
          var maps = {
              firstLevel : window.LevelMap
          };
          var currLevel = maps.firstLevel;
          var currentRoom = currLevel[currStageRow][currStageRowRoom];

          for(var a=0;a<=12;a = a+1) {
              for(var b = 0; b<=(currentRoom[a].length-1);b = b+1) {
                  currentX = b * rockSize;
                  currentY = a * rockSize;
                  var currElem = currentRoom[a][b];
                  var elemForStage;
                  if(currElem) {
                      elemForStage = createElem({
                          type:currentRoom[a][b],
                          posX:currentX,
                          posY:currentY,
                          posInLevel:{
                              Room:[currStageRow,currStageRowRoom],
                              posXY:[a,b]
                          }
                      });

                      if(!elemForStage.bg) {
                          rocks.push(elemForStage);
                      } else {
                          backgorundElems.push(elemForStage);
                      }
                  }
              }
          }
      };      

      function playerMoving(){
          x = nullPos + (frame * frameSize.x);
          frame = frame + 1;

          if(frame >= framesInRow) {
              frame = 0;
          }
      }

      imagesPreloader(images, function(){
          rock = loadedImages.backGroundSprite;
          playerImage = loadedImages.defaultPlayer;
          var drawRocks = {
              drawable:true,
              draw:function(){
                  var length = rocks.length;
                  var sizeX;
                  var sizeY;
                  for(var i = 0; i < length; i += 1) {
                      sizeX =  rocks[i].bgCoords[2] || rockSize;
                      sizeY = rocks[i].bgCoords[3] || rockSize;

                      ctx.drawImage(rocks[i].img, rocks[i].bgCoords[0], rocks[i].bgCoords[1], sizeX, sizeY, rocks[i].posX, rocks[i].posY, sizeX, sizeY);
                  }
              }
          };
          var drawBackGround = {
              drawable:true,
              draw:function(){
                  var length = backgorundElems.length;
                  var sizeX;
                  var sizeY;
                  for(var i = 0; i < length; i += 1) {
                      sizeX =  backgorundElems[i].bgCoords[2] || rockSize;
                      sizeY = backgorundElems[i].bgCoords[3] || rockSize;
                      ctx.drawImage(backgorundElems[i].img, backgorundElems[i].bgCoords[0], backgorundElems[i].bgCoords[1], sizeX, sizeY, backgorundElems[i].posX, backgorundElems[i].posY, sizeX, sizeY);
                  }
              }
          };
          var drawPlayer = {
              drawable:true,
              draw:function(){
                  ctx.drawImage(playerImage, x, keyToAnimation[side], frameSize.x, frameSize.y, curX, curY, frameSize.x, frameSize.y);
                  if(playerWearing.length) {
                    for (var i = 0; i < playerWearing.length; i++) {
                      ctx.drawImage(playerWearing[i].image, x, keyToAnimation[side], frameSize.x, frameSize.y, curX, curY, frameSize.x, frameSize.y);                     
                    };
                  }
              }
          };

          fillStage();
          redrawer.addToRedraw(drawRocks);
          redrawer.addToRedraw(drawBackGround);
          redrawer.addToRedraw(drawPlayer);
          redrawer.addToRedraw(map.drawMap());
          playerMapAddroom(currStageRow, currStageRowRoom);
      });

      playerWearing = [
              //{name:'Head', image: loadedImages.letherHead },
              {name:'hair', image: loadedImages.hair },
              {name:'Head', image: loadedImages.letherHead },
              {name:'Tors', image: loadedImages.letherTors },
              {name:'Boots', image: loadedImages.letherShoes }, 
              {name:'Weapon', image: loadedImages.shortSword },                        
      ];

      function changeElemType(elem, toType) {
          var WholeLevelMap = window.LevelMap;
          var room = WholeLevelMap[elem.posInLevel.Room[0]][elem.posInLevel.Room[1]];
          if(typeof !!+toType) {
              //console.log(window.LevelMap[elem.posInLevel.Room[0]][elem.posInLevel.Room[1]][elem.posInLevel.posXY[0]][elem.posInLevel.posXY[1]], toType)
              window.LevelMap[elem.posInLevel.Room[0]][elem.posInLevel.Room[1]][elem.posInLevel.posXY[0]][elem.posInLevel.posXY[1]] = toType;
          }

      }

      function openDoor(elemIndex, elem){
          var playerItems = player.getItems();
          var length = playerItems.length;
          var openedDoorIndex;
          for(var i = 0; i<length; i += 1) {
              // if player have a key we open the door and remove the key
              if(playerItems[i].name === 'key') {
                  //remove key from interface
                  interface.removeItemFromInventory(playerItems[i].id);

                  //remove key from inventory
                  //playerItems.splice(i,1);
                  //player.updateInventory(playerItems);

                  //Do element changes
                  elementsAnimation.openDoor(elem);
                  openedDoorIndex = (function(){
                    if(elem.type === 10) { return 11; }
                    if(elem.type === 12) { return 13; }
                  }());
                  changeElemType(elem, openedDoorIndex);

                  //remove from rocks and push to background elems
                  rocks[elemIndex].type = 11;
                  backgorundElems.push(rocks[elemIndex]);
                  rocks.splice(elemIndex,1);
                  break;
               }
          }
      }

      function gatherElement(index, elem, type){
          var WholeLevelMap = window.LevelMap;
          var elemArray = (function(){
              if(type === 'bg') { return backgorundElems;}
              if(type === 'rock') { return rocks;}
          }());

          elemArray.splice(index,1);
          window.LevelMap[elem.posInLevel.Room[0]][elem.posInLevel.Room[1]][elem.posInLevel.posXY[0]][elem.posInLevel.posXY[1]] = 0;

      }

      function checkCollision(e){
          var length = rocks.length;
          var pLeft = playerEdges().left;
          var pRight = playerEdges().right;
          var pTop = playerEdges().top;
          var pBottom = playerEdges().bottom;
          var rLeft;
          var rRight;
          var rTop;
          var rBottom;

          if(e === 1) {
              pLeft -= step;
          }
          if(e === 2) {
              pTop -= step;
          }
          if(e === 3) {
              pRight += step;
          }
          if(e === 4) {
              pBottom += step;
          }
          for(var i = 0; i < length; i += 1) {
              rLeft = rocks[i].edges.left;
              rRight = rocks[i].edges.right;
              rTop = rocks[i].edges.top;
              rBottom = rocks[i].edges.bottom;

              if((pLeft >= rLeft && pLeft <= rRight) || (pRight >= rLeft && pRight <= rRight)) {
                  if((pTop >= rTop && pTop <= rBottom) || (pBottom >= rTop && pBottom <= rBottom) || (pTop <= rTop && pBottom >= rBottom)) {
                      // collision with chest
                      if(rocks[i].type === 7) {
                          //console.log(rocks[i]);
                          if(rocks[i].drop !== 0) {
                              // TODO think, how we can add items directly to the player
                              interface.addItemToInvetory(rocks[i].drop);
                          }
                          elementsAnimation.openChest(rocks[i]);
                          changeElemType(rocks[i], 8);
                          rocks[i].type = 8;
                          //changeHat();
                      }
                      // collision with door
                      if(rocks[i].type === 10 || rocks[i].type === 12) {
                          openDoor(i, rocks[i]);
                          /*elementsAnimation.openDoor(rocks[i]);
                          changeElemType(rocks[i], 11);
                          //remove from rocks and push to background elems
                          rocks[i].type = 11;
                          backgorundElems.push(rocks[i]);
                          rocks.splice(i,1);*/
                      }
                      //collision with goldBar
                      if(rocks[i].type === 15) {
                          interface.addItemToInvetory(rocks[i].drop);
                          gatherElement(i, rocks[i], 'rock');
                      }
                      return true;
                  }
              }
          }
          if(pRight >= canvas.width) {
              currStageRowRoom += 1;
              fillStage();
              mapUpdate();
              curX = 0 + step;
          }
          if(pLeft <= 0) {
              currStageRowRoom -= 1;
              fillStage();
              mapUpdate();
              curX = canvas.width - frameSize.x - step;
          }
          if(pBottom >= canvas.height) {
              currStageRow += 1;
              fillStage();
              mapUpdate();

              curY = 0 + step;
          }
          if(pTop <= 0) {
              currStageRow -= 1;
              fillStage();
              mapUpdate();

              curY = canvas.height - frameSize.y - step;
          }


          return false;
      }
      setInterval(function() {
          if(keyMap[37] === 1) {
              if(!checkCollision(1)) {
                  curX -= step;
              }
          }
          if(keyMap[38] === 1) {
              if(!checkCollision(2)) {
                  curY -= step;
              }
          }
          if(keyMap[39] === 1) {
              if(!checkCollision(3)) {
                  curX += step;
              }

          }
          if(keyMap[40] === 1) {
              if(!checkCollision(4)) {
                  curY += step;
              }

          }
      }, 60);

      document.addEventListener('keydown', function(e){
        e.preventDefault();
        var keys = [37,38,39,40];
        if(keyMap.hasOwnProperty(e.keyCode)) {
            side = e.keyCode;
            keyMap[e.keyCode] = 1;
            // TODO optimize animation
            if(!animation) {
                animation = setInterval(function(){
                    playerMoving();
                },100);
            }
        }
      });

      document.addEventListener('keyup', function(e){
          e.preventDefault();
          if(keyMap.hasOwnProperty(e.keyCode)) {
                  side = e.keyCode;
                  keyMap[e.keyCode] = 0;
              clearInterval(animation);
              animation = false;

              for(var key in keyMap) {
                  if(keyMap[key] === 1) {
                      side = key;
                      // TODO optimize animation
                      if(!animation) {
                          animation = setInterval(function(){
                              playerMoving();
                          },100);
                      }
                  }
              }


          }
      });
  });
});