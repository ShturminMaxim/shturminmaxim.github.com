var stage = new createjs.Stage("main");
var canvas = document.getElementById("main");
canvas.width = window.innerWidth-50;
canvas.height = window.innerHeight-150;

var globalSrc = 'img/';
var images = {
  "b":'btn.png',
  "bo":'btn-over.png',
  "de":'draggableElem.png',
  "bg":'spc.jpg',
  "wa":'wall2.png'
};

var loadedImages = {};
var imagesPreloader = function(images, callback){
    var totalImages = Object.keys(images).length;
    var loadedImgCount = 0;
    for(var img in images) {
        loadedImages[img] = new Image();
        loadedImages[img].src = globalSrc+images[img];
        loadedImages[img].onload = function(){
            loadedImgCount += 1;
            if(loadedImgCount === totalImages) {
                callback(loadedImages);
            }
        }
    }
}

imagesPreloader(images, startStage);

function startStage() {
    createjs.Ticker.addEventListener("tick", stage);

    stage.update();

    jQuery(window).on('resize', function(){
        canvas.width = window.innerWidth-50;
        canvas.height = window.innerHeight-100;
        
        stage.update();
    });


    // create draggable elem
    Dr = new createjs.Bitmap('img/wall2.png');
    Dr.y = 200;
    Dr.x = 200;
    stage.addChild(Dr);

    Dr.name = "bmp_sss";
    Dr.cursor = "pointer";

    // using "on" binds the listener to the scope of the currentTarget by default
    // in this case that means it executes in the scope of the button.
    Dr.on("mousedown", function(evt) {
        this.parent.addChild(this);
        this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
    });

    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    Dr.on("pressmove", function(evt) {
      this.x = evt.stageX+ this.offset.x;
      this.y = evt.stageY+ this.offset.y;
      // indicate that the stage should be updated on the next tick:
      update = true;
    });

    Dr.on("rollover", function(evt) {
      this.scaleX = this.scaleY = this.scale*1.2;
      update = true;
    });

    Dr.on("rollout", function(evt) {
      this.scaleX = this.scaleY = this.scale;
      update = true;
    });

       

    /// try do collision test with placed elems
    var placedElems = []
    placedElems.push(Dr);

    function checkCollision(movingElem, elems) {
        var collision = false;
          eLeft = movingElem.x;
          eRight = movingElem.x+movingElem.getBounds().width;
          eTop = movingElem.y;
          eBottom = movingElem.y+movingElem.getBounds().height;

       elems.forEach(function(elem, i) {
          rLeft = elem.x;
          rRight = elem.x+elem.getBounds().width;
          rTop = elem.y;
          rBottom = elem.y+elem.getBounds().height;

          if((eLeft >= rLeft && eLeft <= rRight) || (eRight >= rLeft && eRight <= rRight)) {
              if((eTop >= rTop && eTop <= rBottom) || (eBottom >= rTop && eBottom <= rBottom) || (eTop <= rTop && eBottom >= rBottom)) {
                  console.log('collision');
                  collision = true;
                  return true;
              }
          }
       });
       return collision;
    }

    // draggable elem 2
    Dr2 = new createjs.Bitmap('img/draggableElem.png');
    Dr2.y = 300;
    Dr2.x = 300;
    stage.addChild(Dr2);
    Dr2.cursor = "pointer";

    var old = {};
    Dr2.on("mousedown", function(evt) {
        this.parent.addChild(this);
        this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
    });

    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    Dr2.on("pressmove", function(evt) {
       this.x = evt.stageX+ this.offset.x;
      if(!checkCollision(Dr2, placedElems)) {         
                this.x = evt.stageX+ this.offset.x;
              old.x = this.x;
      } else {
              Dr2.x = old.x;
      }
        this.y = evt.stageY+ this.offset.y;
       if(!checkCollision(Dr2, placedElems)) {         
              this.y = evt.stageY+ this.offset.y;
              old.y = this.y;
      } else {
              Dr2.y = old.y;
      }
    });


    // create button for adding  Walls
    var btn = new createjs.Bitmap('img/btn.png');
    btn.y = 10;
    btn.x = canvas.width-150;

    stage.addChild(btn);

    //stage.enableMouseOver(20); 

    btn.addEventListener('mousedown', function() {
      btn.image.src = 'img/btn-over.png';
      stage.update();
    });
    btn.addEventListener('mouseup', function() {
      btn.image.src = 'img/btn.png';
      stage.update();
    });
    btn.addEventListener('click', function() {
      var elem = new createjs.Bitmap('img/wall2.png');
      elem.y = parseInt(parseFloat(Math.random()*canvas.height), 10);
      elem.x = parseInt(parseFloat(Math.random()*canvas.width), 10);

      elem.on("mousedown", function(evt) {
        this.parent.addChild(this);
        this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
      });
      elem.on("pressmove", function(evt) {
        this.x = evt.stageX+ this.offset.x;
        this.y = evt.stageY+ this.offset.y;
      });

      elem.on("rollover", function(evt) {
        this.scaleX = this.scaleY = this.scale*1.2;
      });

      elem.on("rollout", function(evt) {
        this.scaleX = this.scaleY = this.scale;
      });

      stage.addChild(elem);
      placedElems.push(elem);
      
      stage.update();
    })
}