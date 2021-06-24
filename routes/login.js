const express= require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')

const catchAsync = require('../utils/catchAsync')

// Forms
router.get('/', (req, res) => {
    res.render('login/login')
})

router.get('/register',  (req, res) => {
    res.render('login/register')
});

// User Login
router.post('/', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), (req, res) => {
    req.flash('success', "You have logged in")
    res.redirect('/viewer')
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




module.exports = router