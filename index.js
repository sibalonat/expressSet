const express = require('express')
const cookieSession = require('cookie-session');
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/User')


const passport = require('passport');
const { options } = require('mongoose');
require('./services/passport')


// mongoose.connect('mongodb://user:pass@localhost:port/database')
mongoose.connect(keys.mongoose, 
{       
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

const app = express()

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)


const port = 5500
app.listen(port)
