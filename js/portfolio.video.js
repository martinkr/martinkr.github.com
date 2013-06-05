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


portfolio.video = {

	__version: 0.0, // class version
	__class: '', // class name
	_player: null,

	/**
	 * Adds class-specific events
	 * @private
	 * @return {Void}
	 */
	_addEvents: function() {
		jQuery('[data-layer]').on('click', portfolio.video.show);
		jQuery('[data-layer]').on('mouseenter', portfolio.video.mouseenter);
		jQuery('[data-layer]').on('mouseleave', portfolio.video.mouseleave);
		jQuery('#layer').on('click', portfolio.video.hide);

	},


	_setUp: function() {
		portfolio.video._addEvents();
		jQuery('[data-layer]').append('<span style="width: 100%; height: 100%; display: block; background: #000; opacity:0;"></span>')

	},

	/**
	 * Contructor
	 * @method initialize
	 * @return {Void}
	 */
	initialize: function() {
		var _scope = portfolio.video;
		_scope._setUp();
	},

	/**
	 * @method handler
	 * @param {Event}
	 * @return {Void}
	 */
	mouseenter: function(event_) {
		var _$element = jQuery(event_.target);
		_$element.stop().animate({'opacity':0.75});
	},
	mouseleave: function(event_) {
		var _$element = jQuery(event_.target);
		_$element.stop().animate({'opacity':0});
	},



	/**
	 * @method handler
	 * @param {Event}
	 * @return {Void}
	 */
	show: function(event_) {
		var _$element = jQuery(event_.target).closest('[data-layer]');
		jQuery('#layer').append('<video  autoplay="true" id="player" src="'+_$element.attr('data-layer')+'" width="900" height="'+_$element.attr('data-layer-height')+'" class="mediaelement mejs-ted"></video>')
		_player = new MediaElementPlayer('#player', {
			 features: ['playpause','backlight','progress','duration'],
		    success: function (mediaElement, domObject) {

		        // add event listener
		        mediaElement.addEventListener('ended', function(e) {
		             portfolio.video.hide({target:jQuery('#layer')});
		        }, false);

		    }
		});
		jQuery('#layer').css({'display':'block'}).animate({'opacity':1})
	},

	hide: function(event_) {
		if( jQuery(event_.target).attr('id') != 'layer') {return;}
		_player.pause();
		jQuery(_player).remove();
		_player = null;
		jQuery('#layer').animate({'opacity':0},function ( ){jQuery('#layer').css({'display':'none'});})
	}
};
// register onDocumentReady
jQuery(document).ready(function () {
	portfolio.video.initialize();

});


