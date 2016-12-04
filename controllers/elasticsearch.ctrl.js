var args = {
    hosts: process.env.ESHOST,
    log: 'error'
};

if( process.env.ENV === 'production' ) {
    args[ 'connectionClass' ] = require( 'http-aws-es' );
    args[ 'amazonES' ] = {
        region: process.env.AMS_REGION,
        accessKey: process.env.AMS_ACCESSKEY,
        secretKey: process.env.AMS_SECRETSKEY
    };
};

var elasticClient = new require( 'elasticsearch' ).Client( args );


var indexName = process.env.ESINDEX;
exports.indexName = indexName;

/**
 * Delete an existing index
 */

function deleteIndex() {
    return elasticClient.indices.delete( {
        index: indexName,
        ignore: [ 404 ]
    } );
}
exports.deleteIndex = deleteIndex;
/**
 * create the index
 */

function initIndex() {
    return elasticClient.indices.create( {
        index: indexName
    } );
}

exports.initIndex = initIndex;

/**
 * check if the index exists
 */
function indexExists() {
    return elasticClient.indices.exists( {
        index: indexName
    } )
}

exports.indexExists = indexExists;

function initMapping() {
    return elasticClient.indices.putMapping( {
        index: indexName,
        type: 'episode',
        body: {
            properties: {
                nebo_id: {
                    type: 'string'
                },
                mid: {
                    type: 'string'
                },
                serieName: {
                    type: 'string'
                },
                serieDescription: {
                    type: 'string'
                },
                name: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                },
                broadcasters: {
                    type: 'string'
                },
                genres: {
                    type: 'string'
                },
                stills: {
                    properties: {
                        url: {
                            type: 'string'
                        },
                        offset: {
                            type: 'integer'
                        }
                    }
                },
                video: {
                    type: 'string'
                },
                duration: {
                    type: 'string'
                },
                revoked: {
                    type: 'string'
                },
                views: {
                    type: 'integer'
                },
                image: {
                    type: 'string'
                },
                active: {
                    type: 'boolean'
                },
                broadcasted_at: {
                    type: 'date'
                },
                broadcasted_on: {
                    type: 'string'
                },
                restrictions: {
                    type: 'object'
                },
                cues: {
                    type: "nested",
                    include_in_root: true,
                    properties: {
                        identifier: {
                            type: 'integer'
                        },
                        start: {
                            type: 'integer'
                        },
                        end: {
                            type: 'integer'
                        },
                        text: {
                            type: 'string'
                        }
                    }
                },
                suggest: {
                    type: 'completion'
                }
            }
        }
    } );
}
exports.initMapping = initMapping;

function addDocument( document ) {
    return elasticClient.index( {
        index: indexName,
        type: 'episode',
        body: {
            nebo_id: document.nebo_id,
            serieName: document.serieName,
            serieDescription: document.serieDescription,
            image: document.image,
            name: document.name,
            description: document.description,
            cues: document.cues,
            broadcasted_at: document.broadcasted_at
        }
    } );
}

exports.addDocument = addDocument;

function search( input ) {

    return elasticClient.search( {
        index: indexName,
        type: 'episode',
        body: {
            _source: {
                "excludes": [ "cues" ]
            },
            from: 0,
            size: 50,
            sort: [
                { broadcasted_at: 'desc' }
            ],
            query: {
                nested: {
                    path: "cues",
                    query: {
                        function_score: {
                            query: {
                                multi_match: {
                                    query: input.toLowerCase(),
                                    type: "phrase",
                                    fields: [
                                        "cues.text^3",
                                        "serieName^2.5",
                                        "serieDescription^2",
                                        "description^2",
                                        "name^2"
                                    ],
                                    // fuzziness: "1",
                                    prefix_length: 2
                                }
                            }
                        }
                    },
                    inner_hits: {
                        highlight: {
                            fields: {
                                "cues.text": {}
                            }
                        },
                        sort: [
                            { "cues.start": 'asc' }
                        ]
                    }
                }
            }
        }
    } );
}

exports.search = search;

function bulk( json ) {
    return elasticClient.bulk( {
        body: json
    } );
}
exports.bulk = bulk;
