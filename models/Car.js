const mongoose = require('mongoose')

const { Schema } = mongoose

const userCarSchema = new Schema({
    whatAreYouDriving: String
})

mongoose.model('userCar', userCarSchema)