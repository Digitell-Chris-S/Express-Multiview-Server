const isLoggedIn = (req, res, next) => {
    console.log(req.originalUrl)
    if(!req.isAuthenticated()){
        // Dont Flash when user first encounters login
        if(req.originalUrl != '/viewer'){
        req.flash('error', 'You must be signed in');
        return res.redirect('/login')
        }
        return res.redirect('/login')
    }
    next()
};

module.exports = isLoggedIn;