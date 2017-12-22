'use strict';

/* Note: using staging server url, remove .testing() for production
Using .testing() will overwrite the debug flag with true */ 
var LEX = require('letsencrypt-express').testing();

var lex = LEX.create({
  configDir: require('os').homedir() + '/letsencrypt/etc'
, approveRegistration: function (hostname, cb) { // leave `null` to disable automatic registration
    // Note: this is the place to check your database to get the user associated with this domain
    cb(null, {
      domains: [hostname]
    , email: 'shemulworld@gmail.com' // user@example.com
    , agreeTos: true
    });
  }
});


var http = require('http');
var https = require('spdy');
// NOTE: you could use the old https module if for some reason you don't want to support modern browsers

function redirectHttp() {
  http.createServer(LEX.createAcmeResponder(lex, function redirectHttps(req, res) {
    res.setHeader('Location', 'https://' + req.headers.host + req.url);
    res.statusCode = 302;
    res.end('<!-- Hello Developer Person! Please use HTTPS instead -->');
  })).listen(85);
}

function serveHttps() {
  var app = require('express')();

  app.use('/', function (req, res) {
    res.end('Hello!');
  });

  https.createServer(lex.httpsOptions, LEX.createAcmeResponder(lex, app)).listen(446);
}

redirectHttp();
serveHttps();

