﻿//To run and track changes to reload use this command
//nodemon -w ../api -w ../web app.js

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rs = require('./misc/rs');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));

var context = {
    root_path: __dirname,
    app: app
};

require('./routes')(context);

// catch 404 and forward to error handlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handlers
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        if (!err.is_rs) {
            var stack = err.stack;
            rs_err = rs.error({
                message: err.message,
                type: 'system',
                stack: err.stack,
                is_rs: false,
                status: err.status
            });
            res.send(rs_err);
            return;
        }
        res.send(err);
    });
}

// production error handlers
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    delete err.source;
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//needed for unintended errors like database connection closed remotely
process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});

var port = process.env.PORT || 3212;
app.listen(port, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3212);
});
if (app.get('env') === 'development') {
    console.log('\n================= \x1b[35mRumsan Powered NodeJS Site\x1b[0m ===================',
        '\nYour NodeJS website is listening on port number \x1b[36m' + port + '\x1b[0m.',
        '\nPlease visit \x1b[33mhttp://localhost:' + port + '\x1b[0m to view your site.',
        '\nFor sample api go to \x1b[33mhttp://localhost:' + port + '/api/1/sample\x1b[0m',
        '\n================================================================');
    console.log('Your current directory:\n' + __dirname);
}
module.exports = app;
