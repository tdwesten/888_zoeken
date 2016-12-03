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
    description: {
        type: String
    },
    broadcasters: {
        type: Array
    },
    genres: {
        type: Array
    },
    starts_with: {
        type: String
    },
    image: {
        type: String
    },
    active_episodes_count: {
        type: Number
    }
} );

module.exports = mongoose.model( 'series', series );