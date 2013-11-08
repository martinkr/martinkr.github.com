/*! Project: portfolio */
/**
 * @author hello@mkrause.info
 * @version 1.5
 * @copyright hello@mkrause.info
 *
 * Use scriptDoc comments - ever method requires a useful description
 * Visit http://docs.aptana.com/docs/index.php/ScriptDoc_comprehensive_tag_reference
 * for a help on the scriptDoc syntax
 *
 */


/* jshint browser:true, jquery:true, strict: false, smarttabs:true, onevar:true */
/* global jQuery:true, portfolio:true, -$:true */

portfolio = {};

/**
 * @namespace
 */
portfolio.scroll = (function(){

	// private vars
	var
		_aSections = [],
		_iThrottle = 50,
 		_bLockHandler=false,



	/**
	 * channel handler
	 * @param  {Object} sChannel_	normalized channel on which the message was published
	 * @param  {Object} oData_		additional message data
	 * @private
	 * @return {Void}
	*/
	_handler = function (sChannel_,oData_) {

		switch (sChannel_) {

			case '':

			break;
		}


	},

	/**
	 * Add section to the list
	 * @param {Object} oData_ section details
	 */
	_addSection = function ($element_,sId_) {

		var  _iPos;
		if (!$element_) { return;}
 		// show as soon as the element is fully visible
		_iPos = ($element_.size()) ? ( $element_.offset().top + $element_.outerHeight() ) * 0.9 : 0;
		_aSections.push( {'show': _iPos, 'sId':sId_, '$element': $element_, 'data':$element_.data('detail') || {} });
 	},


	/**
	 * Actual scoll handler.
	 * @return {Void}
	 */
	_doScroll = function () {
		var _iScrollTop = jQuery(document).scrollTop(),
			_iScrolled = _iScrollTop + jQuery(window).height(),
			_i, _iLenght = _aSections.length
		;

		// cycle through all registered sections
		for ( _i = 0; _i < _iLenght; _i++) {
			// current viewport position (scroll + window height) shows the whole section

			if(_iScrolled > _aSections[_i].show ) {
					// call start()
					console.log("call START() on" , _aSections[_i].sId);

					_doAction(_aSections[_i]);

					//remove
					_aSections[_i] = null;
				}
		}

		// purge array
		_aSections = jQuery.grep(_aSections,function(n_){ return(n_); });

		if(_iScrollTop > 15) {
			jQuery('html').addClass('has-scrolled');
		} else {
			jQuery('html').removeClass('has-scrolled');
		}

		// remove scoll lock
		_bLockHandler = false;
	},

	_doAction = function (oData_) {
		console.log(arguments)
		oData_.$element.addClass('fx-show');
	},

	/**
	 * Scroll handler proxy
	 * @param  {Event} event_ jQuery-event
	 * @return {Void}
	 */
	_onScroll = function (event_) {
 		// currently running handler, ignore on ipad (scroll triggered after scrrolling is complete)
		if (_bLockHandler === false /*|| _isNotIPad === false*/) {
			_bLockHandler = true;
			// call handler
			window.setTimeout(portfolio.scroll.doScroll, _iThrottle);
		}
	},


	/**
	 * Constructor
	 * @return  {Void}
	 * @private
	 */
	_initialize = function () {
		var _i
		;
		_isNotIPad = !jQuery('html').hasClass('is-iPad');

		jQuery('[data-id] .fx-item').each(function(){
			_addSection(jQuery(this),jQuery(this).data('id'));
		})

		jQuery(window).on('scroll', portfolio.scroll.onEventScroll);
		jQuery(window).on('resize', portfolio.scroll.onEventResize);
	};

	/**
	 * Public API
	 */
	return {

		/**
		 * jQuery.Channel handler
		 * @param  {Object} oData_		additional message data
		 * @return {Void}
		 */
		onChannel: function (oData_) {
			_handler(oData_.originalChannel,oData_);
		},


		/**
		 * Returns application status object
		 * @return {Object} status object
		 */
		/** @dev-*/
		getStatus : function() {
			return ;
		},
		/**-@dev*/

		onEventScroll:_onScroll,
		onEventResize:_onScroll,
		doScroll:_doScroll,

		/**
		 * Constructor
		 * @return {Void}
		 */
		initialize:_initialize
	};

})();

// initialize
jQuery(document).ready(function() {
	portfolio.scroll.initialize();
});

jQuery(window).load(function() {
	jQuery('html').addClass('fx-intro-show');
});










