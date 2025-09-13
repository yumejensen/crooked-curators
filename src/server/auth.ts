const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

require('dotenv').config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// implement new google strategy: updates/creates user upon login
passport.use(new GoogleStrategy({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
  function(accessToken, refreshToken, profile, done){

    // access users schema with findOrCreate
  }
))
