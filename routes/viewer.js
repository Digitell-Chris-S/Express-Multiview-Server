const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')

const Desktop = require('../models/desktop');
const Laptop = require('../models/laptop');

router.get('/', catchAsync( async (req, res) => {
    const desktops = await Desktop.find({});
    const laptops = await Laptop.find({});

    res.render('viewer/index', {desktops, laptops})
}));

router.get('/test', (req, res) => {
    req.flash('info', 'this is a flash')
    res.redirect('/viewer')
})



module.exports = router