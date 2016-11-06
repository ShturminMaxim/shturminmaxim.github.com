/**
 * Created by Max on 26.11.2015.
 * Main game Field
 */
define({
    game : null,
    locker : true,          // user move locker. prevent move during animations
    verticalMatches : 0,
    horizontalMatches : 0,
    fieldWrapper : null,
    fieldInstance : null,
    fieldSizeX : 8,         // main field size
    fieldSizeY : 8,         // main field size
    baseFieldPaddingY : 40,
    baseFieldPaddingX : 200,
    get winHeightWithPadding() {
        return window.innerHeight - (this.baseFieldPaddingY * 2);
    },
    get cellSize() { return this.sellCpasing - 2; },          // main Items size
    get sellCpasing() { return (this.winHeightWithPadding) / this.fieldSizeY; },       // add item margin
    grid : [],              // main Field Array with Items Column
    matchesToDelete : [],

    /**
     * Initial method
     * @param gameInstance
     */
    init : function(gameInstance){
        this.game = gameInstance;

        this.addBg();

        this.addField();
        this.fillField();

        this.addMenu();

        setTimeout(function(){
            this.checkMatches();
        }.bind(this),500);
    },
    addMenu : function(){
        this.bag = require('bag');

        this.bag.init(this.game);
        //this.bag.collectItem(1);
    },

    /**
     * Add field instance
     */
    addField : function(){
        //var fieldBg = this.game.add.sprite(0, 0, 'fieldBg');
       // fieldBg.height = fieldBg.width = this.winHeightWithPadding;

        this.fieldWrapper && this.fieldWrapper.removeAll();
        this.fieldInstance && this.fieldInstance.removeAll();

        this.fieldWrapper = this.game.add.group();
        this.fieldInstance = this.game.add.group();

        this.fieldWrapper.x = this.baseFieldPaddingX;
        this.fieldWrapper.y = this.baseFieldPaddingY;
      //  this.fieldWrapper.add(fieldBg);
        this.fieldWrapper.add(this.fieldInstance);
    },
    addBg : function(){
        var bg = this.game.add.sprite(0, 0, 'panel');
        bg.height = window.innerHeight;
        bg.width = window.innerWidth;
    },
    /**
     * Create random Items to insert on field
     * @param xIndex
     * @param yIndex
     * @param spriteYPosition
     * @returns {{animated: boolean, type: *, x: *, y: *, sprite: *}}
     */
    addRandomItem : function(xIndex,yIndex, spriteYPosition){
        var itemRandNum = this.game.rnd.integerInRange(1,7);
        var spriteY = spriteYPosition || (yIndex*this.sellCpasing);
        var nextElem = {
            animated: false,
            type: itemRandNum,
            x: xIndex,
            y: yIndex,
            sprite :  this.game.add.sprite(xIndex*this.sellCpasing+this.cellSize/2, spriteY+this.cellSize/2, itemRandNum.toString())
        };

        this.fieldInstance.add(nextElem.sprite);

        nextElem.sprite.anchor.x = nextElem.sprite.anchor.y = 0.5;
        nextElem.sprite.width = nextElem.sprite.height = this.cellSize;
        nextElem.sprite.parentBox = nextElem;

        nextElem.sprite.inputEnabled = true;
        nextElem.sprite.events.onInputDown.add(function(elem){
            this.handleElemClick(elem);
        }.bind(this),this);

        return nextElem;
    },

    /**
     * Checker. Are some items were deleted
     * @returns {boolean}
     */
    get isEmptyCellsOnField(){
        for(var x = 0; x < this.fieldSizeX; x++) {
            if(this.grid[x][0] === null) {
                return true;
            }
        }

        return false;
    },

    /**
     * Click on item listener
     * @param elem
     */
    handleElemClick : function(elem){
        if(this.locker) { return; }

        this.locker = true;

        this.blowElem(elem.parentBox)
            .then(function(){
                this.moveElementsAbove(elem.parentBox.x, elem.parentBox.y)
                    .then(function(){
                        this.addMatchesToField().then(function(){
                            this.checkMatches();
                        }.bind(this));
                    }.bind(this));
            }.bind(this));
    },

    /**
     * Base Game Field filler
     * Adds random items to fill the whole field
     */
    fillField : function(){
        var currentColumn;

        for(var i = 0; i < this.fieldSizeX; i++) {
            currentColumn = [];

            for(var j = 0; j < this.fieldSizeY; j++) {
                currentColumn.push(this.addRandomItem(i,j));
            }

            this.grid.push(currentColumn);
        }
    },

    /**
     * Add few new items after Matches were deleted
     * @returns {Promise}
     */
    addMatchesToField : function(){
        var howMuchItemsToAdd;
        var currColumn;
        var queue;
        var newItem;
        var animationsStack = [];

        for(var x = 0; x < this.fieldSizeX; x++) {
            queue = 1;
            currColumn = this.grid[x];
            howMuchItemsToAdd = this.getEmptyCells(currColumn);

            for(var y = howMuchItemsToAdd-1; y >=0 ; y--) {
                newItem = this.addRandomItem(x, y, -(queue*this.sellCpasing));
                this.grid[x][y] = newItem;

                animationsStack.push(this.animate(newItem));
                queue++;
            }
        }

        return Q.all(animationsStack);
    },

    /**
     * Main global Matching checker
     */
    checkMatches : function(){
        console.log('CHECk');
        this.locker = true;
        this.findMatches().then(function(){
                Q.fcall(this.removeMatches.bind(this))
                    .then(function(){
                        var deferred = Q.defer();

                        this.moveElements().then(function(){
                            console.log('When all Movings finished');
                            return deferred.resolve();
                        });

                        return deferred.promise;
                    }.bind(this))
                    .done(this.checkMatches.bind(this));
            }.bind(this))
            .fail(function(){
                console.log('FAIL');
                if(this.isEmptyCellsOnField) {
                    this.addMatchesToField().then(function(){
                        console.log('new items added lets find new matches');
                        this.checkMatches();
                    }.bind(this));
                } else {
                    this.locker = false;
                    console.log('No need to add new items, and no matches');
                }
            }.bind(this))
            .catch(function(e){
                console.dir(e);
            });
    },

    /**
     * How many empty cells in current field column
     * @param column
     * @returns {Number}
     */
    getEmptyCells : function(column){
        return column.filter(function(elem){ return !elem; }).length;
    },

    /**
     * Main matches destroyer
     * @returns {Promise}
     */
    removeMatches : function(){
        var fnArray = [];

        for(var i = 0; i < this.matchesToDelete.length; i++) {
            fnArray.push(this.blowElem(this.matchesToDelete[i]));
        }

        return Q.all(fnArray);
    },

    /**
     * Main matches finder
     * @returns {Promise}
     */
    findMatches : function(){
        var deferred = Q.defer();

        this.matchesToDelete = [];

        this.findHorizontal();
        this.findVertical();

        if(this.matchesToDelete.length === 0) {
            deferred.reject();
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    },
    findVertical : function () {
        for (var i = 0; i < this.fieldSizeX; i++) {
            for (var j = 0; j < this.fieldSizeY;) {
                this.verticalMatches = 1;

                this.findNextVerticalMatch(this.grid[i][j]);

                if (this.verticalMatches > 2) {
                    for (var k = 0; k < this.verticalMatches; k++) {
                        this.matchesToDelete.push(this.grid[i][j + k]);
                    }
                    j += this.verticalMatches;
                } else {
                    j++
                }
            }
        }
    },
    findNextVerticalMatch : function(element){
        var currType =  element && element.type;
        var aboveElemType = (element && this.grid[element.x][element.y + 1] && this.grid[element.x][element.y + 1].type) || -1;

        if (aboveElemType === currType) {
            this.verticalMatches++;
            this.findNextVerticalMatch(this.grid[element.x][element.y + 1]);
        } else {
            return this.verticalMatches;
        }
    },
    findHorizontal : function () {
        for (var j = 0; j < this.fieldSizeY; j++) {
            for (var i = 0; i < this.fieldSizeX;) {
                this.horizontalMatches = 1;

                this.findNextHorizontalMatch(this.grid[i][j]);

                if (this.horizontalMatches > 2) {
                    for (var k = 0; k < this.horizontalMatches; k++) {
                        if (this.grid[i + k][j]) {
                            if(this.matchesToDelete.indexOf(this.grid[i + k][j]) === -1) {
                                this.matchesToDelete.push(this.grid[i + k][j]);
                            }
                        }
                    }
                    i += this.horizontalMatches;
                } else {
                    i++;
                }
            }
        }
    },
    findNextHorizontalMatch : function (element) {
        if (element && this.grid[element.x + 1] && this.grid[element.x + 1][element.y] && this.grid[element.x + 1][element.y].type === element.type) {
            this.horizontalMatches++;
            this.findNextHorizontalMatch(this.grid[element.x + 1][element.y]);
        } else {
            return this.horizontalMatches;
        }
    },

    /**
     * Animate and delete one element on Field
     * @param gridItem
     * @returns {Promise}
     */
    blowElem : function(gridItem){
        var elem = gridItem.sprite;         // element image
        var elemCurrScale = elem.scale.x;   // element image scaling
        var blink = this.game.add.tween(elem.scale).to( { x: elemCurrScale+0.02, y: elemCurrScale+0.02 }, 300, Phaser.Easing.Bounce.Out, true).start();
        var disapear = this.game.add.tween(elem).to( { alpha: 0 }, 300).start();
        var deferred = Q.defer();

        disapear.onComplete.add(function(){
            this.bag && this.bag.collectItem(gridItem.type);
            this.removeSprite(gridItem);
            this.grid[gridItem.x][gridItem.y] = null;
            deferred.resolve(true);

        }, this);

        return deferred.promise;
    },

    /**
     * remove elem's Sprite from Canvas stage
     * @param elem
     */
    removeSprite : function(elem){
        try {
            this.fieldInstance.removeChild(elem.sprite);
        } catch(e) {
            debugger;
        }
    },

    /**
     * Move all elements in Field
     * @returns {Promise}
     */
    moveElements : function(){
        var movingFunctions = [];

        for (var x = 0; x < this.fieldSizeX; x++) {
            for (var y = 1; y < this.fieldSizeY;y++) {
                if(this.grid[x][y] === null) {
                    movingFunctions.push(this.moveElementsAbove(x, y));
                }
            }
        }
        return Q.all(movingFunctions);
    },

    /**
     * Move all elements in current Column
     * @param startX
     * @param startY
     * @returns {Promise}
     */
    moveElementsAbove : function(startX, startY){
        var elemAbove;
        var moveStep = 1;
        var elemsToMove = [];

        /**
         * Change all items posittion
         */
        for(var y = startY-1; y >= 0; y--) {
            elemAbove = this.grid[startX][y];

            if(elemAbove !== null) {
                elemAbove.y = y+moveStep;
                this.grid[startX][y+moveStep] = elemAbove;
                this.grid[startX][y] = null;

                elemsToMove.push(elemAbove);
            } else {
                moveStep++;
            }
        }

        /**
         * Animate all items according to new position
         * @type {Array} of Promises
         */
        var all = elemsToMove.map(this.animate.bind(this));


        return Q.all(all);
    },
    /**
     * Animate element
     * @param elem
     * @returns {Promise}
     */
    animate : function(elem){
        var deferred = Q.defer();

        this.tweenDown(elem).onComplete.add(function(){
            deferred.resolve();
        }.bind(this));

        return deferred.promise;
    },
    /**
     * Element animation down from current position to new position
     * @param elem
     */
    tweenDown : function(elem){
        return this.game.add.tween(elem.sprite).to({ y: this.sellCpasing*elem.y+this.cellSize/2 }, 500).start();
    }
});