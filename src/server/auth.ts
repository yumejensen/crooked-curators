import passport from 'passport';
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const { User } = require('./db/schemas/users');

type userTypes = {
  id: number;
  googleId: string;
  username: string;
  email: string;
  profilePic?: string;
}

require('dotenv').config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

// implement new google strategy: updates/creates user upon login
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/auth/google/callback`,
},
  function(accessToken, refreshToken, profile, cb){
      // access users schema with findOrCreate
    User.findOrCreate({ 
      where:{ googleId: profile.id }, 
      defaults: { 
        username: 'randomUser',
        email: profile.emails[0].value 
      } 
    })
      .then((user: userTypes) => {
        return cb(null, user);
      })
      .catch((err: () => void) => {
        console.log('failed to find or create user', err)
        return cb(err, null);
      });
    }
  ));
  
  passport.serializeUser(function(user: userTypes, cb) {
    process.nextTick(function() {
    return cb(null, {
      googleId: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic
    });
  });
});

passport.deserializeUser(function(user: userTypes, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});