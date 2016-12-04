var express = require( 'express' );
var router = express.Router();
const elastic = require( '../controllers/elasticsearch.ctrl' );

router.get( '/s/:input', function ( req, res ) {
    elastic.search( req.params.input )
        .then( function ( result ) {
            res.json( result.hits )
        } );

} );

module.exports = router;
