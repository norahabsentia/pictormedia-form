'use strict';
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8081,
    bodyParser = require('body-parser'),
    db = require('./config/database');
var path = require('path');

//const https = require('https');
const http = require('http');
const fs = require('fs');

//const options = {
  //key: fs.readFileSync('/etc/letsencrypt/live/pictorpv.com/privkey.pem'),
//  cert: fs.readFileSync('/etc/letsencrypt/live/pictorpv.com/fullchain.pem')
//};

//var httpsServer = https.createServer(options, app);
var httpServer = http.createServer( app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

const routes = require('./api/routes/api'); //importing route
routes(app); //register the route

app.get('/',function (request, response) {
response.writeHead(302, {
  'Location': 'form.html'
  //add other headers here...
});
response.end();
});

/*app.get('/',function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './form.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

})*/

/*app.get('/client/:clientId', function(req, res) {
        var cleintid = req.params.clientId;
        let users = db.collection('clients');
        var arr = users.find();
        console.log("ARR"+arr);
        /*Game.find({ 'gamelocal.email': req.user.local.email }, function(err, game) {
            res.render('profilexml.ejs', {
                user: req.user,
                game: game
            });
        });
    });*/


app.use(function(req, res) {
    
    res.status(404).send({url: req.originalUrl + ' not found'})
});

httpServer.listen(8081);

console.log('API server started on: ' + port);
