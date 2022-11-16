const GoogleStrategy = require('passport-google-oauth20').Strategy

const moongose = require('mongoose')

const User = require('user')
const passport = require('passport')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})






