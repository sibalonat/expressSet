const express = require('express')

const mongoose = require('mongoose')

require('./models/User')

const passport = require('passport')
// require('./services/passport')

// mongoose.connect('mongodb://user:pass@localhost:port/database')
mongoose.connect('mongodb+srv://root:marini12345@usersauthenticatewithgo.3kdehte.mongodb.net/?retryWrites=true&w=majority', 
{       
    useNewUrlParser: true,
    useUnifiedTopology: true 
})





const app = express()
app.use(passport.initialize())

require('./routes/authRoutes')(app)


const port = 5000
app.listen(port)
