define(["jquery"], function($){

	/*
	 *
	 * my jquery scroll extension
	 *
	 */
	$.fn.scrollView = function () {
		return this.each(function () {
			$('html, body').animate({
				scrollTop: $(this).offset().top
			}, 500);
		});
	};
		

});