var myScroll;
var mySlide;

function loaded() {
	setTimeout(function(){mySlide = new iScroll('slider-wrapper', {
		snap: true,
		momentum: false,
		hScrollbar: false,
		onScrollEnd: function () {
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
		}
	});}, 0);
	setTimeout(function(){scroll2 = new iScroll('wrapper');}, 0);

	/*mySlide = new iScroll();

	myScroll = new iScroll('description');*/
}

document.addEventListener('DOMContentLoaded', loaded, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
window.onorientationchange = function(event) {
	event.preventDefault();
};
$(document).ready(function () {
     $(window)
          .bind('orientationchange', function(){
               if (window.orientation % 180 == 0){
                   $(document.body).css("-webkit-transform-origin", "")
                       .css("-webkit-transform", "");
               }
               else {
                   if ( window.orientation > 0) { //clockwise
                     $(document.body).css("-webkit-transform-origin", "200px 190px")
                       .css("-webkit-transform",  "rotate(-90deg)");
                   }
                   else {
                     $(document.body).css("-webkit-transform-origin", "280px 190px")
                       .css("-webkit-transform",  "rotate(90deg)");
                   }
               }
           })
          .trigger('orientationchange');
});
/*window.onload = function() {
	setTimeout(function() {
	window.scrollTo(0, 1);
}, 100);
};*/