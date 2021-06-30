const express= require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')

const catchAsync = require('../utils/catchAsync');
const { session } = require('passport');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');

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
    res.redirect('/settings')
});



// Register User Account
router.post('/register', catchAsync( async (req, res) => {
    try{
        const {username, email, password, role} = req.body;
        console.log(req.body)
        const user = new User({username: username,email: email, role: role})
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err)
            req.flash('success', 'User Created')
            res.redirect('/viewer')
        });
      
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
})




module.exports = router