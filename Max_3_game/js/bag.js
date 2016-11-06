/**
 * Created by Max on 02.12.2015.
 */
define(function(){
    var items = {};
    var bagInstance = {};

    /**
     * Class Bag
     * @constructor
     */
    var bag = {
        game : {},
        stage : {},
        marginX : 10,
        /**
         * Create and Add to canvas Phaser Group object
         */
        createBagInstance : function(){
            bagInstance = this.game.add.group();
            bagInstance.x = this.stage.fieldInstance.width+this.stage.baseFieldPaddingX+this.marginX;
            bagInstance.y = this.stage.baseFieldPaddingY;
        },

        /**
         * Create Item Object and store it to Storage
         * @param id
         * @param qnty
         * @returns Phaser Group object as Item Wrapper
         */
        createItem : function(id, qnty){
            var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            var newItem = {
                id : id,
                qnty : qnty || 1,
                wrapper : this.game.add.group(),
                itemBgSprite : this.game.add.sprite(0, 0, 'itemBg'),
                itemSprite : this.game.add.sprite(5, 5, id),
                qntyText : this.game.add.text(0, 0, 1, style)
            };

            newItem.itemBgSprite.anchor.x = newItem.itemSprite.anchor.y = 0;
            newItem.itemSprite.anchor.x = newItem.itemSprite.anchor.y = 0;
            newItem.itemBgSprite.width = newItem.itemBgSprite.height = this.stage.sellCpasing;
            newItem.itemSprite.width = newItem.itemSprite.height = this.stage.sellCpasing-10;
            newItem.qntyText.setTextBounds(this.stage.sellCpasing-18, 5, 18, 18);

            newItem.wrapper.add(newItem.itemBgSprite);
            newItem.wrapper.add(newItem.itemSprite);
            newItem.wrapper.add(newItem.qntyText);
            newItem.wrapper.y = Object.keys(items).length*(this.stage.sellCpasing);

            this.storeItem(newItem);

            return newItem.wrapper;
        },

        /**
         * Save item object to storage
         * @param item
         */
        storeItem : function(item){
            items[item.id] = item;
        },

        /**
         * Increase quantity of Present i storage item
         * @param id
         */
        incrementItem : function(id){
            items[id].qnty++;
            items[id].qntyText.setText(items[id].qnty.toString());
        },

        /**
         * Main Collect Item Function
         * create new or increment quantity of present item
         * @param id
         */
        collectItem : function(id){
            if(id in items) {
                this.incrementItem(id);
            } else {
                bagInstance.add(this.createItem(id));
            }
        },

        /**
         * Initialise the Bag
         * @param game
         */
        init : function(game){
            this.game = game;
            this.stage = require('stage');

            this.createBagInstance();
        }
    };


    return bag;
});