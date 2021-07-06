const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')

const Desktop = require('../models/desktop');
const Laptop = require('../models/laptop');
const isLoggedIn = require('../middleware/isLoggedIn');
const sendMail = require('../middleware/sendEmail')

router.get('/', isLoggedIn, catchAsync( async (req, res) => {
    const desktops = await Desktop.find({});
    const laptops = await Laptop.find({});

    res.render('viewer/index', {desktops, laptops})
}));

router.get('/report/:id', isLoggedIn, catchAsync( async (req, res) => {
    const {id} = req.params
    const computer = await Laptop.findById({_id:id})
    res.render('viewer/report', {computer})
}));

router.post('/report', isLoggedIn, sendMail('report'), (req, res) => {
    req.flash('info', 'Your Ticket has been submitted. We will notify you when the issue is resolved.')
    res.redirect('/viewer')
})

module.exports = router