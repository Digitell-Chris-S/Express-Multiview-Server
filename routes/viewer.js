const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')

const Desktop = require('../models/desktop');
const Laptop = require('../models/laptop');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, catchAsync( async (req, res) => {
    const desktops = await Desktop.find({});
    const laptops = await Laptop.find({});

    res.render('viewer/index', {desktops, laptops})
}));


module.exports = router