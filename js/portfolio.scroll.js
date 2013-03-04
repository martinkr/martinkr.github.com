/**
 * portfolioNAME JavaScript library:
 *
 * @portfolioDescription
 * @scroll
 *
 * @author $Author: martinkr $
 * @version $Revision: 0	$
 *
 * @author script@mkrause.info
 * @version 0.0
 * @copyright Neue Digitale / Razorfish
 *
 */
portfolio = {};

portfolio.scroll = {

	__version: 0.0, // class version
	__class: '', // class name

	/**
	 * Adds class-specific events
	 * @private
	 * @return {Void}
	 */
	_addEvents: function() {
		jQuery(window).on('scroll', portfolio.scroll.handler)
	},

	/**
	 * Prepares environment, usually called by constructor-function
	 * @private
	 * @return {Void}
	 */
	_setUp: function() {
		portfolio.scroll._addEvents();
	},

	/**
	 * Contructor
	 * @method initialize
	 * @return {Void}
	 */
	initialize: function() {
		var _scope = portfolio.scroll;
		_scope._setUp();
	},

	getScrollY: function () {
		return window.scrollY;
	},

	/**
	 * @method handler
	 * @param {Event}
	 * @return {Void}
	 */
	handler: function(event_) {
		var _iDiff = $('section').offset().top - portfolio.scroll.getScrollY(),
			_$element = $('#sticky')
			;
 		if (_iDiff <= 0 && _$element.css('position') !== 'fixed') {
			_$element.addClass('is-sticky');
			$('article:first').css('margin-top','100px')
		}
		if (_iDiff > 0 ) {
 			_$element.removeClass('is-sticky');
 			$('article:first').css('margin-top','50px')
		}
	}
};
// register onDocumentReady
jQuery(document).ready(function () {
	portfolio.scroll.initialize();
	portfolio.scroll.handler();

});


