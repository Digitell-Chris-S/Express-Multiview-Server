const isAdmin = (req, res, next) => {
    if(req.user.role != 'admin'){
        req.flash('info', 'You do not have required permissions')
        return res.redirect('/settings')
    }
    next()
}


module.exports = isAdmin