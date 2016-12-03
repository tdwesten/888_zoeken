var request = require( 'request' );
const webvtt = require( 'node-webvtt' );
const segmentDuration = 10; // default to 10
const startOffset = 0; // Starting MPEG TS offset to be used in timestamp map, default 900000
const scraper = require( './controllers/scraper.ctrl.js' );
const npo = require( './controllers/npo.ctrl.js' );
//
// npo.getListOfEpisodes( function ( json ) {
// 	console.log( json );
// } );

scraper.start();

//
// function getSubTitles( id ) {
// 	request( 'http://e.omroep.nl/tt888/' + id, function ( error, response, body ) {
// 		if( !error && response.statusCode == 200 ) {
// 			body.replace( /(^[ \t]*\n)/gm, "" );
// 			const parsed = webvtt.parse( body );
// 			console.log( parsed );
// 		}
// 	} )
// }

// getSubTitles( 'POW_03246320' );
//
//
// var bonsai_url =
// 	'https://7f40acyy0y:uwbetnx315@sandbox-cluster-3246853909.eu-west-1.bonsai.io';
// var elasticsearch = require( 'elasticsearch' );
// var client = new elasticsearch.Client( {
// 	host: bonsai_url,
// 	log: 'trace'
// } );
//
// // Test the connection...
// client.ping( {
// 		requestTimeout: 30000,
// 		hello: "elasticsearch"
// 	},
// 	function ( error ) {
// 		if( error ) {
// 			console.error( 'elasticsearch cluster is down!' );
// 		} else {
// 			console.log( 'All is well' );
// 		}
// 	}
// );
