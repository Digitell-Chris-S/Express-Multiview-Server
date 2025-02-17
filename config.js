// this file contains enviromental variables
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    DATABASE: process.env.DATABASE || 'mongodb://localhost:27017/test',
}

