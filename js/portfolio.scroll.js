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
	
	/** 
	 * @method handler
	 * @param {Event}
	 * @return {Void}
	 */
	handler: function(event_) {
		var _iDiff = $('section').offset().top - window.scrollY,
			_$element = $('#sticky')
			;
 		if (_iDiff <= 0 && _$element.css('position') !== 'fixed') {
			_$element.css({
				'position':'fixed',
				'top': '0'
			})
			.find('.cta').fadeOut()
			.end()
			.find('.small').fadeIn();

		}
		if (_iDiff > 0 ) {
 			_$element.css({
				'position':'absolute',
				'top':''
			})
			.find('.cta').fadeIn()
			.end()
			.find('.small').fadeOut();
		}
	}
};
// register onDocumentReady 
jQuery(document).ready(portfolio.scroll.initialize);
