const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");
const nodemailer = require('nodemailer');
const moongose = require("mongoose");

const User = moongose.model("user");
const userCar = moongose.model("userCar");
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
      
      const existingUser = await User.findOne({ googleId: profile.id, email: profile._json.email });
      if (existingUser) {
        transporter.sendMail({
          to: profile._json.email,
          subject: 'Verify Account',
          html: `
            <div style="display: block; width: 100%; height: 10vh;">
              <h1>${profile._json.name}</h1>
              <img src="${profile._json.picture}">
            </div>
          `
        })
        return done(null, existingUser);
      }
      const whatAreYouDriving = 'benz'
      const car = await new userCar({whatAreYouDriving: whatAreYouDriving}).save()

      const user = await new User({ googleId: profile.id, email: profile._json.email, userCar:  car }).save();
      transporter.sendMail({
        to: profile._json.email,
        subject: 'Verify Account',
        html: `<h1>${user.userCar.whatAreYouDriving}</h1>`
      })
      done(null, user)
    }
  )
);
