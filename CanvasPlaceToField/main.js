var stage = new createjs.Stage("main");
var canvas = document.getElementById("main");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var Scale = 0.75;
var globalSrc = 'img/';
var base;
var baseContainer;
var images = {
    "base-1":'b-1.png',
    "b": 'btn.png',
    "bo": 'btn-over.png',
    "de": 'draggableElem.png',
    "bg": 'spc.jpg',
    "wa": 'cell.png',
    'bc': 'build-cell.png',
    'station': 'station-cell.png',
    'station': 'energy-cell.png',
    'rmenu': 'r-menu.png',
    'clear-r-btn': 'clean-r-btn.png',
    'build-cell-active':'build-cell-active.png'
};

var buidingsImages = [
    {
        'name': 'emptyCell',
        'img': 'img/empty-cell.png',
        'width': 1,
        'height': 1
    }, {
        'name': 'emptyBuldingCell',
        'img': 'img/build-cell.png',
        'width': 1,
        'height': 1
    }, {
        'name': 'clear',
        'img': ''
    }, {
        'name': 'station',
        'img': 'img/station-cell.png',
        'width': 2,
        'height': 2
    }, {
        'name': 'energy',
        'img': 'img/energy-cell.png',
        'width': 2,
        'height': 1
    }, {
        'name': 'activeBuldingCell',
        'img': 'img/building-test.png',
        'width': 2,
        'height': 2
    }
];

var loadedImages = {};
var imagesPreloader = function(images, callback) {
    var totalImages = Object.keys(images).length;
    var loadedImgCount = 0;
    for (var img in images) {
        loadedImages[img] = new Image();
        loadedImages[img].src = globalSrc + images[img];
        loadedImages[img].onload = function() {
            loadedImgCount += 1;
            if (loadedImgCount === totalImages) {
                callback(loadedImages);
            }
        }
    }
}

imagesPreloader(images, startStage);

function addBase() {
    baseContainer = new createjs.Container();
    base = new createjs.Bitmap('img/b-1.png');
    base.scaleX = 0.75;
    base.scaleY = 0.75;
    baseContainer.x = canvas.width/2 - base.image.width*base.scaleX/2;
    
    stage.addChild(baseContainer);
    baseContainer.addChild(base);
}
function startStage() {
    createjs.Ticker.addEventListener("tick", stage);
    /*-------------add base------------------*/
    addBase();
    /*----------grid init------*/
    grid = new Grid({
        bgImage: {
            center: {
                x: canvas.height / 2,
                y: canvas.width / 2
            }
        }
    });
    grid.init();
    /*-----------------*/
    /*------------------------------------------*/
    stage.update();

    /*----------add events -----------------*/
    jQuery(window).on('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        stage.update();
        grid.update();
    });
}

var map;
var cells;
var currActiveCell;
/*-------------create grid---------------------*/
/*---------------------------------------------*/
var Grid = function(options) {
    var that = {};
    var bgImage = options.bgImage;
    var grid;
    var currentMode = 'look';
    var activeCells = [];
    that.CellSize = {
        x: 100*Scale,
        y: 70*Scale
    };
    that.gridSize = {
        x: 10,
        y: 10
    };
    that.cellImage = buidingsImages[0].img;
    that.gridCenter = {
        x: 0,
        y: 0
    };
    cells = [];
    map = [];

    that.getCells = function() {
        return cells;
    };
    that.changeCell = function(x, y, toNum, thisCell) {
        var currImageIndex = map[y] && map[y][x] || 0;
        var newImageWidth = buidingsImages[toNum].width - 1;
        var newImageHeight = buidingsImages[toNum].height - 1;

        //console.log(map[y + newImageHeight][x], map[y + newImageHeight][x + newImageWidth], map[y][x + newImageWidth])
        if (map[y + newImageHeight] !== undefined && map[y][x + newImageWidth] !== undefined &&
            map[y][x] === 1 &&
            map[y + newImageHeight][x] === 1 &&
            map[y + newImageHeight][x + newImageWidth] === 1 &&
            map[y][x + newImageWidth] === 1) {
            map[y][x] = toNum;

            that.update();
        }
    };
    that.changeMode = function(toMode) {
        currentMode = toMode;
        that.update();
    }
    that.init = function() {
        that.calculateGridCenter();
        that.calculateStartDrawPosition();
        // that.addGrid();
        that.drawGrid();
    }
    that.update = function() {
        that.clearGrid();

        that.calculateGridCenter();
        that.calculateStartDrawPosition();
        that.drawGrid();
    }

    that.calculateGridCenter = function() {
        that.gridCenter.x = canvas.width / 2;
        that.gridCenter.y = canvas.height / 2;
    };
    that.calculateStartDrawPosition = function() {
        that.StartDraw = {
            x: base.getBounds().width*Scale/2,
            y: that.CellSize.y
        };
    }

    that.clearGrid = function() {
        cells.forEach(function(elem, i) {
            baseContainer.removeChild(elem);
        });
    }

    that.drawGrid = function() {
        var currX;
        var currY;
        var currImage = 0;
        var curWidth = 1;
        var positionOnMap;
        cells = [];
        
        for (var i = 0; i < that.gridSize.y; i++) {
            for (var j = 0; j < that.gridSize.x; j++) {
                currY = that.StartDraw.y + (j * that.CellSize.y/2)+that.CellSize.y/2*i;
                currX = that.StartDraw.x + (j * that.CellSize.x/2)-that.CellSize.x/2-that.CellSize.x/2*i;

                if (map[i] === undefined) {
                    map[i] = [];
                }
                if (map[i][j] === undefined) {
                    map[i][j] = 0;
                } else if (map[i][j] !== 'pass') {
                    currImage = map[i][j];

                    // clear place for big objects
                    var curElemWidth = buidingsImages[map[i][j]].width;
                    var curElemHeight = buidingsImages[map[i][j]].height;

                    if (curElemWidth > 1 && map[i][j + (curElemWidth - 1)] !== undefined) {
                        for (var k = 1; k < curElemWidth; k++) {
                            map[i][j + k] = 'pass';
                        };
                    }
                    if (curElemHeight > 1) {
                        for (var l = 1; l < curElemHeight; l++) {
                            for (var m = 0; m < curElemWidth; m++) {
                                if (map[i + l][j + m] === 1) {
                                    map[i + l][j + m] = 'pass';
                                }
                            };
                        };
                    }
                    if (buidingsImages[map[i][j]].height > 1) {
                        map[i][j + 1] = 'pass';
                    }
                } else {
                    continue;
                }
                if (currentMode === 'build' && currImage === 0) {
                    currImage = 1;
                    if (map[i][j] === 0) {
                        map[i][j] = 1;
                    }
                }
                if (currentMode === 'look' && currImage === 1) {
                    currImage = 0;
                    if (map[i][j] === 1) {
                        map[i][j] = 0;
                    }
                }
                positionOnMap = {
                    'x': j,
                    'y': i,
                    'width': curWidth
                }
                that.addCelltoGrid(currX, currY, currImage, positionOnMap);
            };
        };
    }
    that.addCelltoGrid = function(x, y, imageNumber, positionOnMap) {
        var cell = new createjs.Bitmap(buidingsImages[imageNumber].img);
        var cellImgSize = {x:200*Scale,y:180*Scale};
        cell.y = y;
        cell.x = x;
        if(imageNumber === 3) {
            cell.y = y+that.CellSize.y-cellImgSize.y/2;
            cell.x = x-that.CellSize.x/2;
        }
        cell.positionOnMap = positionOnMap;
        cell.scaleX = Scale;
        cell.scaleY = Scale;

        cells.push(cell);
        baseContainer.addChild(cell);
        if(imageNumber > 1) {
            var cx = cell.x-that.CellSize.x/2;
            var cy = cell.y+(that.CellSize.y*2);

            cell.y = cy-thatElem.getBounds().height*Scale;
            cell.x = cx; 
         //   cell.y = cell.y-cell.getBounds().height*Scale;
        }
    }
    that.clearActiveCells = function() {
        var clearCellImg = new createjs.Bitmap(buidingsImages[1].img);
        activeCells.forEach(function(elem, i) {
            elem.image = clearCellImg.image;
        });
        activeCells = [];
    }
    that.collisionWithCells = function(movingElem) {
        var elems = cells;
        var collision = false;
          eLeft = movingElem.left;
          eRight = movingElem.right;
          eTop = movingElem.top;
          eBottom = movingElem.bottom;  

        var vectorLength;
        var vectorCoords = {};
          //that.clearActiveCells();
         // console.log(eTop, eBottom)
           elems.forEach(function(elem, i) {   
                    vectorCoords.x = elem.x+that.CellSize.x/2-eLeft;
                    vectorCoords.y = elem.y+that.CellSize.y/2-eTop;
                    vectorLength = parseInt(Math.sqrt( Math.pow(vectorCoords.x, 2) + Math.pow(vectorCoords.y, 2) ),10);
                    
                    if(vectorLength<that.CellSize.y/2) {
                        if(elem.positionOnMap.x<that.gridSize.x-1 && elem.positionOnMap.y<that.gridSize.y-1) {
                              thatElem.visible = true;
                              var cx = elem.x-that.CellSize.x/2;
                              var cy = elem.y+(that.CellSize.y*2);

                              thatElem.y = cy-thatElem.getBounds().height*Scale;
                              thatElem.x = cx; 
                              collision = true;
                              currActiveCell = elem;
                        } else if(elem.positionOnMap.x===that.gridSize.x-1 && elem.positionOnMap.y<that.gridSize.y-1) {
                             thatElem.visible = true;
                              var cx = elem.x-that.CellSize.x;
                              var cy = elem.y+that.CellSize.y*1.5;

                              thatElem.y = cy-thatElem.getBounds().height*Scale;
                              thatElem.x = cx; 
                              collision = true;
                        } else if(elem.positionOnMap.x<that.gridSize.x-1 && elem.positionOnMap.y===that.gridSize.y-1)  {
                             thatElem.visible = true;
                              var cx = elem.x;
                              var cy = elem.y+that.CellSize.y*1.5;

                              thatElem.y = cy-thatElem.getBounds().height*Scale;
                              thatElem.x = cx; 
                              collision = true;
                        } else {
                              thatElem.visible = true;
                              var cx = elem.x-that.CellSize.x/2;
                              var cy = elem.y+that.CellSize.y;

                              thatElem.y = cy-thatElem.getBounds().height*Scale;
                              thatElem.x = cx; 
                              collision = true;
                        }
                    }
               
                  /*rLeft = elem.x;
                  rRight = elem.x+elem.getBounds().width*Scale;
                  rTop = elem.y;
                  rBottom = elem.y+elem.getBounds().height;

                  if((eLeft >= rLeft && eLeft <= rRight) || (eRight >= rLeft && eRight <= rRight)) {
                      if((eTop >= rTop && eTop <= rBottom) || (eBottom >= rTop && eBottom <= rBottom) || (eTop <= rTop && eBottom >= rBottom)) {
                          thatElem.visible = true;

                          var cx = elem.x-elem.getBounds().width/2*Scale;
                          var cy = elem.y+(elem.getBounds().height*2)*Scale;

                          thatElem.y = cy-thatElem.getBounds().height*Scale;
                          thatElem.x = cx; 

                          console.log(elem.x, elem.y)
                          collision = true;

                          return true;
                      }
                  }*/
                });
       if(!collision) {thatElem.visible = false;}
       return collision;   
    };
    return that;
}
/*-------------------------------------------------*/
/*-------------add right menu ---------------------*/
var button = new createjs.Bitmap('img/station-cell-old.png');
    button.x = 100;
    button.y = 100;
    button.scaleX = 0.75;
    button.scaleY = 0.75;
    var thatElem;
        /*-------- add drag event to elem ------------*/
button.on("click", function(evt) {
    grid.changeMode('build');
    thatElem = new createjs.Bitmap('img/building-test.png');
    //this.parent.addChild(this);
    //console.dir(evt);
    baseContainer.addChild(thatElem);
    baseContainer.setChildIndex(thatElem, baseContainer.children.length);

    thatElem.visible = false
    //thatElem.x = baseContainer.globalToLocal(evt.stageX, evt.stageY).x-thatElem.image.width*Scale/2;
    //thatElem.y = baseContainer.globalToLocal(evt.stageX, evt.stageY).y-thatElem.image.height*Scale/2;
    thatElem.scaleX = 0.75;
    thatElem.scaleY = 0.75;
   // this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
    var onMouseMove = function(evt) {
        //console.log(, );
        var box = {
            left: baseContainer.globalToLocal(evt.stageX, evt.stageY).x,
            right: baseContainer.globalToLocal(evt.stageX, evt.stageY).x, // 50 - cell width /2
            top: baseContainer.globalToLocal(evt.stageX, evt.stageY).y, // 50 - cell width /2
            bottom: baseContainer.globalToLocal(evt.stageX, evt.stageY).y // 50 - cell width /2
        }
        grid.collisionWithCells(box);
        //thatElem.x = baseContainer.globalToLocal(evt.stageX, evt.stageY).x-thatElem.image.width*Scale/2;
        //thatElem.y = baseContainer.globalToLocal(evt.stageX, evt.stageY).y+10-thatElem.image.height*Scale/2;
    }
    stage.addEventListener("stagemousemove", onMouseMove);
    stage.addEventListener('mousedown', function(e) { 
        if (e.nativeEvent.button == 2 ) { 
            //console.log('rightclick');
            grid.changeCell(currActiveCell.positionOnMap.x,currActiveCell.positionOnMap.y,5,currActiveCell);
            thatElem.visible = false;
            stage.removeEventListener('stagemousemove', onMouseMove);

        } 
    })
});

stage.addChild(button);