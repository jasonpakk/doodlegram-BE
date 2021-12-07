import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

import User from '../models/user_model';

// loads in .env file if needed
dotenv.config({ silent: true });

// options for local strategy
const localOptions = { usernameField: 'username' };

// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};
// NOTE: we are not calling this a bearer token (although it technically is), if you see people use Bearer in front of token on the internet you could either ignore it, use it but then you have to parse it out here as well as prepend it on the frontend.

// username/email + password authentication strategy
const localLogin = new LocalStrategy(localOptions, async (username, password, done) => {
  let user;
  let isMatch;

  try {
    user = await User.findOne({ username });
    isMatch = await user.comparePassword(password);
  } catch (error) {
    // error occured in server
    return done(error);
  }

  if (!user) {
    // null since no error
    // but false since we didn't find user w/ given email
    return done(null, false);
  } else if (!isMatch) {
    // null since no error
    // but false since password didnt match
    return done(null, false);
  } else {
    // null since no error
    // and found user w/ valid credentials
    return done(null, user);
  }
});

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // is called with confirmed jwt we just need to confirm that user exits
  let user;

  try {
    user = await User.findById(payload.sub);
  } catch (error) {
    // error occured in server
    return done(error, false);
  }

  if (!user) {
    // null since no error
    // but false since we didn't find user w/ given email
    return done(null, false);
  } else {
    // null since no error
    // and found user w/ valid credentials
    return done(null, user);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin); // for 'jwt'
passport.use(localLogin); // for 'local'

// middleware functions to use in routes
export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
