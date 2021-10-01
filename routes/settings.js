const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const catchAsync = require('../utils/catchAsync')
const isAdmin = require('../middleware/isAdmin')

const Desktop = require('../models/desktop')
const Laptop = require('../models/laptop')
const User = require('../models/user');
const Enclosure = require('../models/enclosure')
const Radius = require('../models/radius')
const sendMail = require('../middleware/sendEmail');

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const desktops = await Desktop.find({})
    const laptops = await Laptop.find({})
    const users = await User.find({})
    const enclosures = await Enclosure.find({})
    const radius = await Radius.find({})
    res.render('settings/adminPanel', {desktops, laptops, enclosures, radius, users})
}));
// Desktop Edit Form
router.get('/desktops/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params
    const comp = await Desktop.findById({_id: id})
    res.render('settings/showEncoder', {comp, post:'desktops'})
}));
// Laptop Edit Form
router.get('/laptops/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params
    const comp = await Laptop.findById({_id: id})
    res.render('settings/showEncoder', {comp, post:'laptops'})
}));
// Radius Edit Form
router.get('/radius/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params
    const comp = await Radius.findById({_id: id})
    res.render('settings/showEncoder', {comp, post:'radius'})
}));
// Enclosure Edit Form
router.get('/enclosures/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params
    const comp = await Enclosure.findById({_id: id})
    res.render('settings/showEncoder', {comp, post:'enclosures'})
}));
// User Show
router.get('/users/:id', isLoggedIn, isAdmin, catchAsync(async (req, res) => {
    const {id} = req.params
    const user = await User.findById({_id: id})
    res.render('settings/showUser', {user})
}));


// -----------------Post Requests---------------------
// ---------------------------------------------------

// Create Encoder
router.post('/encoder/new', isLoggedIn, isAdmin, catchAsync( async (req, res) => {
    try{
        const {encoder} = req.body
        // Creates a new encoder using the desktop model
        if(encoder.type == "Desktop"){
            console.log("type: desktop, ", encoder)
            let newUser = new Desktop({name: encoder.name, link:encoder.link})
            await newUser.save()   
        }
        // Creates a new encoder using the laptop model
        else if(encoder.type == "Laptop"){
            console.log("type: laptop, ",encoder)
            let newUser = new Laptop({name: encoder.name, link: encoder.link})
            await newUser.save()
        }
        // Creates a new user using the Remote Encoder model
        else if(encoder.type == "Enclosure"){
            console.log("type: Enclosure, ",encoder)
            let newUser = new Enclosure({name: encoder.name, link: encoder.link})
            await newUser.save()
        }
        // Creates a new encoder using the Radius Model
        else if(encoder.type == "Radius"){
            console.log("type: radius, ",encoder)
            let newUser = new Radius({name: encoder.name, link: encoder.link})
            await newUser.save()
        }
        res.redirect('/settings')
    }
    catch(err){
        console.log(err)
    }
}))


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

// enclosure Patch Request
router.patch('/enclosures/:id', isLoggedIn, isAdmin, catchAsync( async(req, res) => {
    try{
        const {id} = req.params
        const changes = req.body.encoder
        changes.updated = Date.now()
        await Enclosure.findByIdAndUpdate(id, changes)
        req.flash('success', 'Successfully posted changes')
        res.redirect(`/settings/enclosures/${id}`)
    }
    catch(err){
        req.flash('error', 'Unable to make changes: ', err.message)
        res.redirect(`/settings/enclosures/${id}`)
    }
}))
// Radius Patch Request
router.patch('/radius/:id', isLoggedIn, isAdmin, catchAsync( async(req, res) => {
    try{
        const {id} = req.params
        const changes = req.body.encoder
        changes.updated = Date.now()
        await Radius.findByIdAndUpdate(id, changes)
        req.flash('success', 'Successfully posted changes')
        res.redirect(`/settings/radius/${id}`)
    }
    catch(err){
        req.flash('error', 'Unable to make changes: ', err.message)
        res.redirect(`/settings/radius/${id}`)
    }
}))
// Edit User Post Request
router.patch('/users/:id', isLoggedIn, isAdmin, catchAsync(async (req,res) => {
    const id = req.params.id
    const userChanges = req.body.user
    try{
        await User.findByIdAndUpdate(id, userChanges)
        req.flash('success', 'Your changes have been saved')
        res.redirect(`/settings/users/${id}`)
    }
    catch(err){
        req.flash('error', 'Unable to make changes - ', err.message)
        res.redirect(`/settings/users/${id}`)
    }
}));

module.exports = router