var request = require( 'request' );
const webvtt = require( 'node-webvtt' );

function getSubTitles( id, cb ) {

    request( 'http://e.omroep.nl/tt888/' + id, function ( error, response, body ) {
        var parsed = [];
        var input = body;

        if( !error && response.statusCode == 200 ) {

            try {
                parsed = webvtt.parse( input );
                cb( parsed );

            } catch ( e ) {
                console.log( 'http://e.omroep.nl/tt888/' + id );
                console.log( e.message );
                cb( parsed );
            }
        } else {
            cb( parsed );
        }
    } );
}


exports.getSubTitles = getSubTitles;
