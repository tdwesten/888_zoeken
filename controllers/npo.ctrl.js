const npoBaseUrl = 'http://apps-api.uitzendinggemist.nl';
const seriesPath = '/series.json';
const episodePath = '/series/';
const _ = require( 'lodash' );
const request = require( 'request' );
const seriesModel = require( '../models/series.js' );
const episodesModel = require( '../models/episodes.js' );

function requestJsonData( url, cb ) {
    var json = {};
    request( url, function ( error, response, body ) {
        if( error || response.statusCode !== 200 ) {
            cb( false );
        } else {
            try {
                json = JSON.parse( body )
            } catch ( exception ) {
                console.log( exception.message );
            }
            cb( json );
        }
    } );
}


function importSeries( cb ) {
    var response = {
        series: 0,
        episodes: 0
    };

    getSeries( function ( series ) {

        var done = _.after( series.length, function () {
           cb();
        } );

        _.forEach( series, function ( serie ) {
            addSerie( serie, function () {
                done();
            } );
        } );
    } );
}

exports.importSeries = importSeries;

function addSerie( serie, cb ) {
    seriesModel.findOneAndUpdate( {
        nebo_id: serie.nebo_id
    }, serie, {
        new: true, upsert: true
    }, function ( err, newSerie ) {

    } );

    if( serie.active_episodes_count > 0 ) {
        addEpisode( serie, function ( ) {
            cb();
        } );
    } else {
        cb();
    }
}


function addEpisode( serie, cb ) {

    var seriesUrl = npoBaseUrl + '/series/' + serie.mid + '.json';

    requestJsonData( seriesUrl, function ( data ) {

        if( 'object' === typeof data.episodes ) {

            var done = _.after( data.episodes.length, function () {
                cb();
            });

            _.forEach( data.episodes, function ( episode ) {
                episode[ 'serieName' ] = serie.name;
                episode[ 'serieDescription' ] = serie.description;

                episodesModel.findOneAndUpdate( {
                    nebo_id: episode.nebo_id
                }, episode, {
                    upsert: true
                }, function ( err, newEpisode ) {
                    done();
                } );
            } );

        } else {
            cb();
        }
    } );

}


function getSeries( cb ) {
    const seriesUrl = npoBaseUrl + seriesPath;

    requestJsonData( seriesUrl, function ( json ) {
        cb( json );
    } );
}