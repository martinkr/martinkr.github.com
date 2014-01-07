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
		_aWaypoints = [],
		_iThrottle = 50,
 		_bLockHandler = false,
 		_iScrollOffset = 0,
		_iIndexWaypoint = 0,


	/**
	 * Add section to the list
	 * @param {Object} oData_ section details
	 */
	_addSection = function ($element_,sId_) {

		var  _iPos;
		if (!$element_) { return;}
 		// show as soon as the element is fully visible
		_iPos = ($element_.size()) ? ( $element_.offset().top + $element_.outerHeight()*0.25 )  : 0;
		_aSections.push( {'show': _iPos, 'sId':sId_, '$element': $element_, 'data':$element_.data('detail') || {} });
 	},

	/**
	 * Add a waypoint to the list
	 * @param {Object} oData_ section details
	 */
	_addWaypoint = function ($element_,sId_) {

		var  _iPos;
		if (!$element_) { return;}
		_aWaypoints.push( $element_.offset().top + $element_.outerHeight() );
 	},

	_gotoWaypoint = function (iDirection_) {
		jQuery('html,body').animate({
			'scrollTop': _aWaypoints[(iDirection_>0) ? ++_iIndexWaypoint:--_iIndexWaypoint] + _iScrollOffset
		});
 	},

	/**
	 * Actual scoll handler.
	 * @return {Void}
	 */
	_doScroll = function () {
		var _iScrollTop = jQuery(document).scrollTop(),
			_iScrolled = _iScrollTop + jQuery(window).height(),
			_i,
			_iLengthSections = _aSections.length,
			_iLengthWaypoints = _aWaypoints.length-1
		;

		// cycle through all registered sections
		for ( _i = 0; _i < _iLengthSections; _i++) {
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

		// update waypoint index
		// @TODO: in between : e.g. palmengarten half way scrolled, prev should be palmengarten again not a3sb
		for ( _i = 0; _i < _iLengthWaypoints; _i++) {
			console.log(_iScrollTop , _aWaypoints[_i] ,_aWaypoints[_i+1] )
			if( _iScrollTop > _aWaypoints[_i] &&  _iScrollTop < _aWaypoints[_i+1] ) {
				_iIndexWaypoint = _i;
				break;
			}
		}


		// remove scoll lock
		_bLockHandler = false;
	},

	_doAction = function (oData_) {
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

		jQuery('.fx-project[data-id]').each(function(){
			_addWaypoint(jQuery(this),jQuery(this).data('id'));
		})

		jQuery(window).on('scroll', portfolio.scroll.onEventScroll);
		jQuery(window).on('resize', portfolio.scroll.onEventResize);
	};

	/**
	 * Public API
	 */
	return {


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
		onWaypointNext: function () { _gotoWaypoint(+1); },
		onWaypointPrev: function () { _gotoWaypoint(-1); },
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
jQuery(document).on('poshload:complete',function() {
	portfolio.scroll.initialize();
});

jQuery(window).load(function() {
	jQuery('html').addClass('fx-intro-show');
});










