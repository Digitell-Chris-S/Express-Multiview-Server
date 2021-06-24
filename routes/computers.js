var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();
const plantSeeds = require('../dataHelpers')
const catchAsync = require('../utils/catchAsync')
// Models

// for testing remove later
const seeds = require('../seeds.json')


// ------------------------
// TESTING - Remove later
router.get('/seed', (req,res, next) => {
  res.render('test/seed')
})
// Seed Database Router
router.post('/seed', catchAsync(async (req, res, next) => {
  await plantSeeds()
  res.send('planted')
}))
// Test route for serving seed data
router.get('/test', async (req, res, next) => {
  
})



// Get Computer Collections
router.get('/desktops', async (req, res, next) => {
  
});

router.get('/laptops', async (req, res, next) => {
  
})


module.exports = router;
