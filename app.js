// Modules
var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var compression = require( 'compression' );
var utils = require( './controllers/util.ctrl.js' );
var http = require( 'http' );
var env = require('node-env-file');

var mongoose = require( 'mongoose' );
mongoose.Promise = require('bluebird'); 

env('.env');

// Routes
var routes = require( './routes/index' );
var search = require( './routes/search' );

// App
var port = utils.normalizePort( process.env.PORT );
var app = express();

// View engine setup
// set the static files location /public/img will be /img for users
app.use( express.static( __dirname + '/views' ) );
app.set( 'view engine', 'ejs' ); // set up ejs for templating

app.set( 'port', port );
// Favicon
app.use( favicon( path.join( __dirname, 'public', 'images/favicon.ico' ) ) );

// Logging & Parsing
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: false
} ) );
app.use( compression() )
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', routes );
app.use( '/search', search );

mongoose.connect( process.env.MONGODB );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );

// error handlers

// development error handler
// will print stacktrace 
if( process.env.ENV === 'development' ) {
    app.use( function ( err, req, res, next ) {
        res.status( err.status || 500 );
        res.render( 'error', {
            message: err.message,
            error: err
        } );
    } );
}

// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
        message: err.message,
        error: {}
    } );
} );

var server = http.createServer( app );

server.listen( port );
server.on( 'error', utils.onError );


var cron = require( './controllers/cron.ctrl.js' );
