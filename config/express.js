'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var flash = require('connect-flash');
var helpers = require('view-helpers');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

var sessionMiddleware = require('./middlewares/session');
var config = require('./config');
var winston = require('./winston');
////var proxy = require('express-http-proxy');   
var http = require('http');
var express = require("express");
var RED = require("node-red");


module.exports = function(app, passport) {

    winston.info('Initializing Express');

    app.set('showStackError', true);    
    
    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Setting the fav icon and static folder
   /* app.use(favicon(config.root + '/public/img/icons/favicon.ico'));*/ 
   // app.use(express.static(config.root + '/public'));
   app.use(express.static(config.root + '/uploads'));

    //Don't use logger for test env
    if (config.NODE_ENV !== 'test') { 
        app.use(logger('dev', { "stream": winston.stream }));
    }


    //Set views path, template engine and default layout
   // app.set('views', config.root + '/app/views');
    //app.set('view engine', 'jade');

    //Enable jsonp
    app.enable("jsonp callback");

    //cookieParser should be above session
    app.use(cookieParser());

    // request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({limit: '100mb', extended: true , parameterLimit: 10000000000 }));
    app.use(bodyParser.json({limit: '100mb'}));
    app.use(methodOverride());
	

	
	////Allow access to forms
	app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
	  
}); 

	/*************
	** proxy setup
	**************/
	//app.use('/58.26.233.148:3000/*', proxy('58.26.233.148:4500'));
	
	/****************
	**Proxy setup finished
	****************/

    //express session configuration
    //app.use(sessionMiddleware);

    //connect flash for flash messages
    //app.use(flash());

    //dynamic helpers
    app.use(helpers(config.app.name));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
      require(path.resolve(routePath))(app);
    });

    /**********************
****Setting up the node red
***********************/
// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/home/umch/.node-red/", 
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen( process.env.PORT || config.PORT);

RED.start();
/**********************
***End Node Red Configration
***********************/



    app.use('*',function(req, res){
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });

    app.use(function(err, req, res, next) {

        //Log it
        winston.error(err);
         res.send('Not Found');
        //Error page
       /* res.status(500).render('500', {
            error: err.stack
        });*/
    });

};
