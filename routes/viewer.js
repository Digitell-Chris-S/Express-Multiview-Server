const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')

const Desktop = require('../models/desktop');
const Laptop = require('../models/laptop');
const Enclosure = require('../models/enclosure');
const Radius = require('../models/radius');
const isLoggedIn = require('../middleware/isLoggedIn');
const sendMail = require('../middleware/sendEmail')

router.get('/', isLoggedIn, catchAsync( async (req, res) => {
    const desktops = await Desktop.find({});
    const laptops = await Laptop.find({});
    const enclosures = await Enclosure.find({});
    const radius = await Radius.find({});
    res.render('viewer/index', {desktops, laptops, enclosures, radius});
}));

router.get('/report/:id', isLoggedIn, catchAsync( async (req, res) => {
    const {id} = req.params
    // What I am about to do should be a war crime
        // if laptop query returns nothing, query each model until it finds a match
        // this could be solved by adding a type field to the models or adding type dataset submitted in the params
    let computer = await Laptop.findById({_id:id})
    if( computer === null) {
        try{
            computer = await Desktop.findById({_id:id})
        }
        catch(err){
            console.log(err.message)
        }
    }
    else if( computer === null) {
        try{
            computer = await Enclosure.findById({_id:id})
        }
        catch(err){
            console.log(err)
        }
    }
    else if( computer === null) {
        try{
            computer = await Radius.findById({_id:id})
        }
        catch(err){
            console.log(err)
        }
    }
    
    res.render('viewer/report', {computer})
}));

router.post('/report', isLoggedIn, sendMail('report'), (req, res) => {
    req.flash('info', 'Your Ticket has been submitted. We will notify you when the issue is resolved.')
    res.redirect('/viewer')
})

module.exports = router