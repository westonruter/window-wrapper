/*global jQuery */
var WindowWrapper = ( function ( $ ) {
	'use strict';
	var self = {};

	/**
	 * @returns {Object}
	 */
	self.getQueryParams = function () {
		var query = {};
		$.each( location.search.substr( 1 ).split( '&' ), function ( i, pair ) {
			pair = pair.split( '=', 2 );
			query[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
		} );
		return query;
	};

	/**
	 * @return {String|null}
	 */
	self.getUrlParam = function () {
		var query = self.getQueryParams();
		// @todo Verify that url is valid (e.g. on same domain, not referring to wrapper page)
		return query.url;
	};

	/**
	 * @param {String} str
	 * @param {Number|undefined} [length]
	 * @returns {String}
	 */
	self.zeroPad = function ( str, length ) {
		if ( ! length ) {
			length = 2;
		}
		str = str.toString();
		while ( str.length < length ) {
			str = '0' + str;
		}
		return str;
	};

	/**
	 * @returns {String}
	 */
	self.randomHexColor = function () {
		var color, i, number;
		color = '';
		for ( i = 0; i < 3; i += 1 ) {
			number = 127 + Math.floor( Math.random() * 127 );
			color += self.zeroPad( number.toString( 16 ) );
		}
		return color;
	};

	/**
	 *
	 */
	self.init = function () {
		var url, hexColor;

		url = self.getUrlParam();
		hexColor = self.randomHexColor();

		// Set the background to the notice to be a random color to help detect when the wrapper reloads
		$( '#notice' ).css( 'backgroundColor', '#' + hexColor );

		$( '#notice input' ).val( hexColor + ': value should persist across page loads.' );

		// Navigate to the initial URL
		$( '#window' ).prop( 'contentWindow' ).location.replace( url );

		// This is done in the iframe as well, but better to clear out the old URL as soon as possible
		history.replaceState( {}, '', url );
	};

	return self;
}( jQuery ) );
