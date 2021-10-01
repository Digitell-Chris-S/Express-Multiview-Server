const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RadiusSchema = new Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    link:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default: Date.now
    },
    updated: Date
})


const Radius = mongoose.model('Radius', RadiusSchema)

module.exports = Radius