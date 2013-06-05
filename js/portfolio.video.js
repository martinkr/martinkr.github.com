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
		jQuery('#layer').on('click', portfolio.video.hide);
	},


	_setUp: function() {
		portfolio.video._addEvents();
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
	show: function(event_) {
		var _$element = jQuery(event_.target);
		jQuery('#layer').append('<video id="player" src="'+_$element.attr('data-layer')+'" width="900" height="'+_$element.attr('data-layer-height')+'" class="mediaelement"></video>')
		_player = new MediaElementPlayer('#player', {});
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


