var cron = require( 'node-cron' );
var scraper = require( './scraper.ctrl.js' );
var npo = require( './npo.ctrl.js' );

cron.schedule( process.env.CRON_TIME, function () {
    console.log( 'cron------------------------------##' );
    npo.importSeries( function () {
        scraper.start();
    } );
} );