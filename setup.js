const seeds = require('./seeds.json');
const User = require('./models/user');
const config = require('./config');


// this should setup a default admin user if one does not exist
async function setup (res, req, next) {
    try{
        if( !(await User.exists({username: 'admin'})) ) {
            const data = seeds.users[0];
            const newUser = {username: data.username, role: data.role, email: data.email}
            await User.register(newUser, data.password);
            next()
        } else {
            next()
        }
    } catch(err) {
        console.log(err);
        next(err);
    }
}

module.exports = setup