var cron = require( 'node-cron' );
var scraper = require( './scraper.ctrl.js' );
var npo = require( './npo.ctrl.js' );

cron.schedule( '* * * * */30', function () {
    npo.importSeries( function () {
        console.log( 'cron------------------------------##' );
        scraper.start();
    } );
} );