var mongoose = require( 'mongoose' );

var series = new mongoose.Schema( {
    nebo_id: {
        type: String
    },
    mid: {
        type: String
    },
    name: {
        type: String
    },
    serieName: {
        type: String
    },
    serieDescription: {
        type: String
    },
    description: {
        type: String
    },
    broadcasters: {
        type: Array
    },
    genres: {
        type: Array
    },
    stills: {
        type: Array
    },
    video: {
        type: Array
    },
    duration: {
        type: String
    },
    revoked: {
        type: String
    },
    views: {
        type: Number
    },
    image: {
        type: String
    },
    active: {
        type: Boolean
    },
    broadcasted_at: {
        type: Number
    },
    broadcasted_on: {
        type: String
    },
    cues: {
        type: Array
    },
    restrictions: {
        type: Object
    },
    in_es: {
        type: Boolean,
        default: false
    }
} );

module.exports = mongoose.model( 'episodes', series );