const express = require('express')

const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/User')


const passport = require('passport')
// require('./services/passport')


// mongoose.connect('mongodb://user:pass@localhost:port/database')
mongoose.connect(keys.mongoose, 
{       
    useNewUrlParser: true,
    useUnifiedTopology: true 
})



const app = express()
app.use(passport.initialize())

require('./routes/authRoutes')(app)


const port = 5000
app.listen(port)
