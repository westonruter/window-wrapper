/*global jQuery */
var WrappedWindow = ( function ( $ ) {
	'use strict';
	var self = {};

	/**
	 *
	 */
	self.init = function () {

		var params, exports, state;

		if ( ! history.pushState ) {
			throw new Error( 'Browser does not support HTML5 history' );
		}
		if ( window.parent === window.self ) {
			params = {
				url: location.href
			};
			window.location.replace( 'window-wrapper.html?' + $.param( params ) );
			return;
		}

		window.parent.document.title = document.title;
		// @todo Watch for dynamic changes to document.title

		// @todo Safari bug that results in full history not being navigatable? https://bugs.webkit.org/show_bug.cgi?id=40451
		// @todo  "" http://benalman.com/news/2009/12/webkit-bug-hash-history-iframe/
		if ( location.href !== parent.location.href ) {
			window.parent.history.replaceState( {}, '', location.href );
		}
	};

	return self;
}( jQuery ) );
