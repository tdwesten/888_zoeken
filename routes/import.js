var express = require( 'express' );
var router = express.Router();

var npo = require( '../controllers/npo.ctrl' );
var scraper = require( '../controllers/scraper.ctrl' );

router.get( '/npo', function ( req, res, next ) {
    npo.importSeries(
        function ( result ) {
            res.json( result );
        }
    )
} );

router.get( '/es/:limit/:skip', function ( req, res, next ) {
    scraper.start( req.params.limit, req.params.skip );
	
    res.json( {} );
} );


module.exports = router;
