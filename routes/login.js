const express= require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')

const catchAsync = require('../utils/catchAsync');
const { session } = require('passport');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');
const sendMail = require('../middleware/sendEmail');

// Forms
router.get('/', (req, res) => {
    res.render('login/login')
})

router.get('/register', isLoggedIn, isAdmin,  (req, res) => {
    res.render('login/register')
});

// User Login
router.post('/', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), (req, res) => {
    req.flash('success', `Logged in as "${req.body.username}"`)
    res.redirect('/viewer')
});



// Register User Account
router.post('/register', isLoggedIn, isAdmin, sendMail('new_user'), catchAsync( async (req, res) => {
    try{
        const {username, email, password, role} = req.body;
        const user = new User({username: username,email: email, role: role})
        const registeredUser = await User.register(user, password);
        req.flash('success', 'User Created')
        res.redirect('/viewer')
    }
    catch(e){
        req.flash('error', e.message)
        res.redirect('/login/register')
    }
}));

router.post('/logout', (req,res) => {
    req.logout();
    req.flash('info', 'You have been logged out')
    res.redirect('/viewer')
});

router.post('/reset/:id', isAdmin, catchAsync( async (req,res) => {
    const id = req.params.id
    console.log(req.body)
    try{
        const foundUser = await User.findOne({id})
        await foundUser.setPassword(req.body.pass)
        foundUser.save()
        req.flash('success', "User Password Changed")
        res.redirect(`/settings/users/${id}`)
    }
    catch(err){
        req.flash('error', "Password Change Failed - ", err.message)
        res.redirect(`/settings/users/${id}`)
    }
}));



module.exports = router