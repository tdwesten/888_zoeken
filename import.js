var env = require( 'node-env-file' );
env( '.env' );

var mongoose = require( 'mongoose' );
var scraper = require( './controllers/scraper.ctrl.js' );
var npo = require( './controllers/npo.ctrl.js' );

mongoose.Promise = require( 'bluebird' );
mongoose.connect( process.env.MONGODB );

console.log( 'import------------------------------##' );

npo.importSeries( function () {

    console.log( 'npo import done' );

    scraper.start();
} );
