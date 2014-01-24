define(['canvas','redrawer'], function(canvas, redrawer){
    var ctx = canvas.getContext("2d");
    var health = 100;
    var position = [];
    var inventory = [];
    var wearing = {
      head:null,
      body:null,
      shoulders:null,
      pants:null,
      boots:null,
      hands:null,
      weapon:null,
    };
    var naked = true;

    var that = {
       getHealth: (function(){
           return health;
       }()),
       dead:false,
       playerItems : {
           map : []
       },
       getWearing: function(){
         return wearing;
       },
       wearItem:function(name, data) {
         wearing[name] = data[image];
         if(naked) {naked = false;}
       },

       getItems : function(){
         return inventory;
       },
       updateInventory : function(itemsArray){
           inventory = itemsArray;
       },
       setPosition: function(pos){
           position = [pos[0], pos[1]];
       },
       getPosition: function(){
         return position;
       }
   };
   /*that.drawMap = function(){
       var that = {
           name:'map',
           drawable:false
       };
       that.draw = function(){
           ctx.fillRect(20,20,300,200);
       };
       that.events = (function(){
           var mapButton = $('.map');
           mapButton.bind('click', function(e){
               //console.log('click', that.drawable);
               e.preventDefault();
               that.drawable ? that.drawable=false : that.drawable = true;
           })
       }());
       redrawer.addToRedraw(that);
   };*/

   that.init = function(){
       //that.drawMap();
   };

   that.init();
   return that;
});