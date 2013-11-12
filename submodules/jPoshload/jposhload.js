/**
 *
 * jPoshLoad - https://github.com/martinkr/jPoshLoad
 *
 * jPoshLoad is an advanced animated preloader - think of flash-ish preloading.
 *
 * @Version: 1.0.1
 *
 *
 * Copyright (c) 2011-2012 Martin Krause (jquery.public.mkrause.info)
 * Dual licensed under the MIT and GPL licenses.
 *
 * @author Martin Krause public@mkrause.info
 * @copyright Martin Krause (jquery.public.mkrause.info)
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @license GNU http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @requires
 *  jQuery JavaScript Library - http://jquery.com/
 *    Copyright 2010, John Resig
 *    Dual licensed under the MIT or GPL Version 2 licenses - http://jquery.org/license
 *
 * @example

	jQuery(document).ready(function(){
	 $.fn.jPoshLoad('test1', {
		forceNoCache: true,
		images : {
			image1: {
				id: 'X',
				src: 'http://www.ipad3wallpapers.com/wp-content/uploads/2012/04/iPad-3-Wallpaper-Pattern-01.jpg'
			},
			image2: {
				id: 'Y',
				src: 'http://www.ipad3wallpapers.com/wp-content/uploads/2012/04/iPad-3-Wallpaper-Pattern-02.jpg'
			},
			image3: {
				id: null,
				src: 'http://www.ipad3wallpapers.com/wp-content/uploads/2012/04/iPad-3-Wallpaper-Pattern-03.jpg'
			},
			image4: {
				id: null,
			src: 'http://www.ipad3wallpapers.com/wp-content/uploads/2012/04/iPad-3-Wallpaper-Pattern-04.jpg'
			},
			image5: {
				id: null,
				src: 'http://www.ipad3wallpapers.com/wp-content/uploads/2012/04/iPad-3-Wallpaper-Pattern-05.jpg'
			},
			image6: {
				id: null,
				src: 'http://www.ipad3wallpapers.com/wp-content/uploads/2012/04/iPad-3-Wallpaper-Pattern-06.jpg'
			}
		}
		});
	})
 */

 /* @jslint 2012-06-13*/
 /* jslint devel: true, browser: true, confusion: true, undef: true, node: false, continue: true, rhino: false, debug: false, sloppy: true, widget: false, eqeq: false, sub: true, windows: true, vars: true, evil: true, white: true, forin: true, css: true, cap: true, nomen: true, plusplus: true, maxerr: 50, indent: 4*/


(function($) {

	/**
	* Contructor
	* @param  {String} sIdLoader_ Loader id
	* @param  {Object} oOptions_
	* {
	* 	forceNoCache: false,
	* 	sTextHeadline : 'Loading...',
	* 	images : {
	* 		 id: {STRING}
	* 		 src: {STRING}
	* 	}
	* }
	* @return {Void}
	*/
	$.fn.jPoshLoad = function(sIdLoader_,oOptions_) {
			jQuery('html').addClass('jPoshLoad_completed-false');
			// build main options before element iteration
			var _oOpts = $.extend({}, $.fn.jPoshLoad.oDefaults, oOptions_);

			var _$elWrapper  = _createHTMLWrapper(sIdLoader_,_oOpts.sTextHeadline);
			var _oData = {};
			_oData[sIdLoader_] = {oOptions: _oOpts, iTotal: 0 , _aLoad: [], _aLoaded:[],$elWrapper:_$elWrapper};

			var _aElements = oOptions_.images;
			var _sForceNoCache = oOptions_.forceNoCache || false;
			var _i;


			for (_i = 0; _i <_aElements.length; _i++) {
 				_oData[sIdLoader_]._aLoad.push(_aElements[_i]);
			}

			_oData[sIdLoader_].iTotal = _oData[sIdLoader_]._aLoad.length;
			_oData[sIdLoader_].iLoaded = 0;

			$(document).data('jPoshload',_oData);

			for (_i = 0; _i <_aElements.length; _i++) {
				_addItem(sIdLoader_,_sForceNoCache,_aElements[_i]);
			}

	};


	// private functions

	/**
	* Adds plugin / class specific events.
	* @private
	* @param  {String} sIdLoader_ Completed loader's id
	* @param {Bool} sForceNoCache_ Use a GET-Param to prevent caching images
	* @param {Object} oElement_      Items's options
	* @return {Void}
	*/
	function _addItem(sIdLoader_,sForceNoCache_,sSrc_) {
			// handle image

			var _elImage = document.createElement('img');
			jQuery(_elImage).on('load.jPoshLoad',{sIdLoader: sIdLoader_},$.fn.jPoshLoad.onLoadItem);

			_elImage.src = [sSrc_,(sForceNoCache_ ? ['?',++$.fn.jPoshLoad.UID].join('') : '' )].join('') ;
			// execute callback for cached images
			// opera and ie6 will not trigger the load event on those elements
			if ( _elImage.complete || _elImage.readyState === 4 ) {
				$.fn.jPoshLoad.onLoadItem({
					target: _elImage,
					data : {
						sIdLoader:sIdLoader_
					}
				});
			}

	}

	/**
	* Executed when all elements are completed
	* @private
	* @param  {String} sIdLoader_ Completed loader's id
	* @param  {jQuery-Element} $elWrapper_ The loader's wrapper element
	* @return {Void}
	*/
	function _doOnComplete(sIdLoader_,$elWrapper_) {
		jQuery('html').removeClass('jPoshLoad_completed-false');

	};


	/**
	* Adds plugin / class specific events.
	* @return {HTMLElement}
	* @private
	*/
	function _createHTMLWrapper() {
		jQuery('.intro').after(function() {
			return $(this).clone().addClass('fx-loader has-color');
		});

		return jQuery('.fx-loader.has-color');
	};

	// public functions
	/**
	* onComplete callback - triggered when every element has been loaded
	* @param  {String} sIdLoader_ Completed loader's id
	* @return {Void}
	*/
	$.fn.jPoshLoad.onComplete = function (sIdLoader_) {
		_doOnComplete(sIdLoader_,$(document).data('jPoshload')[sIdLoader_].$elWrapper);
	};

	/**
	* Updates the status elements
	* @param  {String} sIdLoader_ Current loader's id
	* @return {Void}
	*/
	$.fn.jPoshLoad.updateStatus = function (sIdLoader_) {

		var _oData = $(document).data('jPoshload')[sIdLoader_],
			_$elWrapper =  _oData.$elWrapper,
			_iTotal =  _oData.iTotal,
			_iLoaded =  _oData.iLoaded
		;


		// animation and stuff
		_$elWrapper
 				.stop(true,true)
				.animate( {'width' : [ Math.floor( (_iLoaded / _iTotal ) *100 ) ,'%'].join('')},1000)
				//console.log(_iLoaded , ' / ', _iTotal  ,  Math.floor( (_iLoaded / _iTotal ) *100 )  + "%")
		// everonyes finally loaded call onComplete
		// if( $(document).data('jPoshload')[sIdLoader_]._aLoad.lenght === 0) {
		if(_iLoaded === _iTotal) {
			_doOnComplete(sIdLoader_,_$elWrapper);
		}
	};


	/**
	* onLoadItem callback for the image element
	* @param {Event} event_, DOM-event
	* @return {Void}
	*/
	$.fn.jPoshLoad.onLoadItem = function(event_) {
		var _i;
		var _iIndex;
		var _evtElement = jQuery(event_.target);

		// update
		var _oData = $(document).data('jPoshload');

		_oData[event_.data.sIdLoader].iLoaded = _oData[event_.data.sIdLoader].iLoaded+1;

		_evtElement.unbind('load.jPoshLoad');
		 $(document).data('jPoshload',_oData);

		_evtElement= null;

		// set status
		$.fn.jPoshLoad.updateStatus(event_.data.sIdLoader);

		// notify other elements
		jQuery('document').triggerHandler('jPoshLoad;load;element',{element:event_.target, id: event_.data.sIdLoader});

		return;
	};


	// plugin defaults

	$.fn.jPoshLoad.__version = 1.1; // class version
	$.fn.jPoshLoad.__class = '$.fn.jPoshLoad'; // class name
	$.fn.jPoshLoad.UIDBase = new Date().getTime();
	$.fn.jPoshLoad.UID = $.fn.jPoshLoad.UIDBase;
	$.fn.jPoshLoad.sClassLoaded = 'jPoshLoad_loaded';


	// plugin defaults
	$.fn.jPoshLoad.oDefaults = {
		forceNoCache: false,
		images : {

		}

	};
})(jQuery);



	jQuery(window).load(function(){
		window.setTimeout(function () {
			var _aImages = [];
			jQuery('[data-src]').each(function () {
				_aImages.push(jQuery(this).data('src'));
			});
			 $.fn.jPoshLoad('projects', {
				forceNoCache: false,
					images : _aImages
				});
			},1500)
	})


