const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LaptopSchema = new Schema({
    name:{
        type:String,
        required: true
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


const Laptop = mongoose.model('Laptop', LaptopSchema)

module.exports = Laptop