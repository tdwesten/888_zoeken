var env = require('node-env-file');
env('.env');

const elastic = require( './controllers/elasticsearch.ctrl' );


elastic.indexExists().then( function ( exists ) {
    if ( exists ) {
        elastic.deleteIndex().then( function () {
            elastic.initIndex().then( function () {
                elastic.initMapping().then( function () {

                    console.log( "index is removed and new db is create with mappings");
                } );
            } );
        } );
    } else {
        elastic.initIndex().then( function () {
            elastic.initMapping().then( function () {
                console.log(  "new db is create with mappings" );
            } );
        } );
    }
} );