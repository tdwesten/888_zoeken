var express = require( 'express' );
var router = express.Router();

const elastic = require( '../controllers/elasticsearch.ctrl' );

/* GET suggestions */
router.get( '/s/:input', function ( req, res, next ) {
    elastic.search( req.params.input )
        .then( function ( result ) {
            res.json( result.hits )
        } );

} );

/* POST document to be indexed */
router.get( '/cleanindex', function ( req, res, next ) {
    elastic.indexExists().then( function ( exists ) {
            console.log( exists );
        if ( exists ) {
            elastic.deleteIndex().then( function () {
                elastic.initIndex().then( function () {
                    elastic.initMapping().then( function () {

                        res.json( { mgs: "index is removed and new db is create with mappings" } );
                    } );
                } );
            } );
        } else {
            elastic.initIndex().then( function () {
                elastic.initMapping().then( function () {

                    res.json( { mgs: "new db is create with mappings" } );
                } );
            } );
        }
    } );
} );

module.exports = router;
