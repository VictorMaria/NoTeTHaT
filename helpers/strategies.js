import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();


const googleConfiguration = {
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  callbackURL: process.env.googleRedirectURI,
};

passport.use(new GoogleStrategy(
  googleConfiguration,
  (accessToken, refreshToken, profile, done) => done(null, profile),
));

passport.serializeUser((user, done) => {
  done(null, user);
});
