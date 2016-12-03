const npo = require( './npo.ctrl' );
const subtitles = require( './888.ctrl' );
const _ = require( 'lodash' );
const elastic = require( './elasticsearch.ctrl' );
const episodesModel = require( '../models/episodes.js' );

function start( limit, skip ) {
    elastic.indexExists()
        .then( function ( exists ) {
            console.log( exists );
            if( !exists ) {
                return elastic.initIndex()
                    .then( function () {
                        return elastic.initMapping();
                    } );
            }
        } )
        .then( function () {
            episodesModel.find().limit( parseInt( limit ) ).skip( parseInt( skip ) ).exec( function ( err, episodes ) {
                var json = [];
                var counter = 0;

                var done = _.after( episodes.length, function () {
                    elastic.bulk( json ).then( function ( err ) {
                        console.log( 'done---' + counter );
                    } );
                } );

                _.forEach( episodes, function ( episode ) {
                    subtitles.getSubTitles( episode.nebo_id, function ( data ) {
                        if( 'object' == typeof data && data.valid ) {
                            var elm = {
                                cues: data.cues,
                                nebo_id: episode.nebo_id,
                                mid: episode.mid,
                                serieName: episode.serieName,
                                serieDescription: episode.serieDescription,
                                name: episode.name,
                                description: episode.description,
                                broadcasters: episode.broadcasters,
                                genres: episode.genres,
                                stills: episode.stills,
                                video: episode.video,
                                duration: episode.duration,
                                revoked: episode.revoked,
                                views: episode.views,
                                image: episode.image,
                                active: episode.active,
                                broadcasted_at: episode.broadcasted_at,
                                broadcasted_on: episode.broadcasted_on,
                                restrictions: episode.restrictions
                            };

                            json.push( {
                                index: {
                                    _index: elastic.indexName,
                                    _type: 'episode',
                                    _id: episode.nebo_id
                                }
                            } );
                            json.push( elm );

                            if( counter % 50 == 0 ) {
                                var documents = json;
                                json = [];
                                elastic.bulk( documents ).then( function ( err ) {
                                    console.log( err.items );
                                } );
                            }

                            counter = counter + 1;
                        }
                        done();
                    } );
                } );

            } );

        } );
}

exports.start = start;
