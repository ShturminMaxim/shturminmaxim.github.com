var myScroll;
var mySlide;

function loaded() {
	myScroll = new iScroll('wrapper');

	mySlide = new iScroll('slider', {
		snap: true,
		momentum: false,
		hScrollbar: false,
		onScrollEnd: function () {
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
		}
	});
}

document.addEventListener('DOMContentLoaded', loaded, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

/*window.onload = function() {
	setTimeout(function() {
	window.scrollTo(0, 1);
}, 100);
};*/