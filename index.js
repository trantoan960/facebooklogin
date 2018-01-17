// Import Package Which Application needed
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var facebookStrategy = require('passport-facebook');

// Define What Application use package to build code
var app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'sessionfacebooklogin',
  resave: true,
  saveUninitialized: true
}));


// Set Code API facebook authenticate
var FACEBOOK_APP_ID = '1372643682865207',
    FACEBOOK_APP_SECRET = 'eae12959b20ff98aba1ffc2c0dcaa4f2';

var fbOpts = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:1111/auth/facebook/callback'
};

var fbCallback = function(accessToken, refreshToken, profile, cb) {
  console.log(accessToken, refreshToken, profile);
}

passport.use(new facebookStrategy(fbOpts, fbCallback));


/* ROUTES */
app.route('/')
  .get(passport.authenticate('facebook'));
app.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', function(err, user, info) {
    console.log(err, user, info);
  }));

// Set port server
app.listen(1111);
