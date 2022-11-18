const mongoose = require('mongoose')


const userCar = require('./Car')

const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    email: String,
    userCar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCar'
    }
})

mongoose.model('user', userSchema)