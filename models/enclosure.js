const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EnclosureSchema = new Schema({
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


const Enclosure = mongoose.model('Enclosure', EnclosureSchema)

module.exports = Enclosure