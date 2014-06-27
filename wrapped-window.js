/*global jQuery */
var WrappedWindow = ( function ( $ ) {
	'use strict';
	var self = {};

	/**
	 *
	 */
	self.init = function () {

		if ( ! history.pushState ) {
			throw new Error( 'Browser does not support HTML5 history' );
		} else if ( self.isWrapped() ) {
			self.updateWrapper();
		} else if ( self.enabled() ) {
			self.enterWrappedWindow();
		}

		// @todo Safari bug that results in full history not being navigatable? https://bugs.webkit.org/show_bug.cgi?id=40451
		// @todo  "" http://benalman.com/news/2009/12/webkit-bug-hash-history-iframe/
	};

	/**
	 *
	 * @returns {boolean}
	 */
	self.isWrapped = function () {
		try {
			return ( window.parent !== window.self && typeof parent.WindowWrapper !== 'undefined' );
		}
		catch( e ) {}
		return false;
	};

	/**
	 *
	 */
	self.enterWrappedWindow = function () {
		var params = {
			url: location.href
		};
		window.location.replace( 'window-wrapper.html?' + $.param( params ) );
	};

	/**
	 *
	 */
	self.updateWrapper = function () {
		if ( ! self.isWrapped() ) {
			return;
		}
		// @todo Watch for dynamic changes to document.title
		window.parent.document.title = document.title;
		if ( location.href !== parent.location.href ) {
			window.parent.history.replaceState( {}, '', location.href );
		}
	};

	/**
	 *
	 * @param setting
	 * @returns {boolean}
	 */
	self.enabled = function ( setting ) {
		if ( typeof setting !== 'undefined' ) {
			if ( setting ) {
				localStorage.setItem( 'windowWrapperEnabled', '1' );
			} else {
				localStorage.removeItem( 'windowWrapperEnabled' );
			}
		}
		return !! localStorage.getItem( 'windowWrapperEnabled' );
	};

	/**
	 *
	 */
	self.ready = function () {
		var toggle;
		toggle = $( '#toggle' );
		toggle.text( self.enabled() ? 'Exit wrapped window' : 'Enter wrapped window' );
		toggle.on( 'click', function () {
			var isEnabled = self.enabled();
			self.enabled( ! isEnabled );
			if ( isEnabled ) {
				parent.location = window.location;
			} else {
				self.enterWrappedWindow();
			}
		} );
		toggle.show();
	};

	$( function () {
		self.ready();
	} );

	return self;
}( jQuery ) );
