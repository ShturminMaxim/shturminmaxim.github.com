$(function() {
	var myScroll;
	var mySlide;

	(function loaded() {
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
})();
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
});