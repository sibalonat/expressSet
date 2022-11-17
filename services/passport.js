const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");
const nodemailer = require('nodemailer');
const moongose = require("mongoose");

const User = moongose.model("user");
const passport = require("passport");
// const mongoose = require("mongoose");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


// const keys = require('../config/keys')


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: keys.emailUsername,
        pass: keys.emailPassword,
    },
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
        // find

        // console.log(profile._json.email);

      const existingUser = await User.findOne({ googleId: profile.id, email: profile._json.email });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id, email: profile._json.email }).save();
      transporter.sendMail({
        to: profile._json.email,
        subject: 'Verify Account',
        html: `are you here`
      })
      done(null, user)
    }
  )
);
