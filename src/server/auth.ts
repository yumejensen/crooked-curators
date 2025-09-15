import passport from 'passport';
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const { User } = require('./db/schemas/users');


require('dotenv').config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// implement new google strategy: updates/creates user upon login
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
  function(accessToken, refreshToken, profile, cb){

    // access users schema with findOrCreate
   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      googleId: user.id,
      username: user.username,
      profilePic: user.profilePic
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});