var express = require( 'express' );
var router = express.Router();
const elastic = require( '../controllers/elasticsearch.ctrl' );
var Slack = require( 'slack-node' );

slack = new Slack();
slack.setWebhook( process.env.SLACK_WEBHOOK );


router.get( '/s/:input', function ( req, res ) {
    elastic.search( req.params.input )
        .then( function ( result ) {

            slack.webhook( {
                channel: "#888",
                username: "888",
                text: "Er is gezocht op: " + req.params.input + "! - " + result.hits.total + " resultaten"
            }, function ( err, response ) {
            } );

            res.json( result.hits )
        } );

} );

module.exports = router;
