const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const catchAsync = require('../utils/catchAsync')
const isAdmin = require('../middleware/isAdmin')

const Desktop = require('../models/desktop')
const Laptop = require('../models/laptop')
const User = require('../models/user')

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const desktops = await Desktop.find({})
    const laptops = await Laptop.find({})
    const users = await User.find({})
    res.render('settings/adminPanel', {desktops, laptops, users})
}));
// Desktop Edit Form
router.get('/desktops/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params
    const comp = await Desktop.findById({_id: id})
    res.render('settings/show', {comp, post:'desktops'})
}));
// Laptop Edit Form
router.get('/laptops/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params
    const comp = await Laptop.findById({_id: id})
    res.render('settings/show', {comp, post:'laptops'})
}));
// User Show
router.get('/users/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params
    const comp = await User.findById({_id: id})
    res.send(comp)
}));


// -----------------Post Requests---------------------
// ---------------------------------------------------

// Desktop Patch Request
router.patch('/desktops/:id', isLoggedIn, isAdmin, catchAsync( async(req, res) => {
    try{
        const {id} = req.params
        const changes = req.body.encoder
        changes.updated = Date.now()
        await Desktop.findByIdAndUpdate(id, changes)
        req.flash('success', 'Successfully posted changes')
        res.redirect(`/settings/desktops/${id}`)
    }
    catch(err){
        req.flash('error', 'Unable to make changes: ', err.message)
        res.redirect(`/settings/desktops/${id}`)
    }
    
}))

// Laptop Patch Request
router.patch('/laptops/:id', isLoggedIn, isAdmin, catchAsync( async(req, res) => {
    try{
        const {id} = req.params
        const changes = req.body.encoder
        changes.updated = Date.now()
        await Laptop.findByIdAndUpdate(id, changes)
        req.flash('success', 'Successfully posted changes')
        res.redirect(`/settings/laptops/${id}`)
    }
    catch(err){
        req.flash('error', 'Unable to make changes: ', err.message)
        res.redirect(`/settings/laptops/${id}`)
    }
    
}))

module.exports = router