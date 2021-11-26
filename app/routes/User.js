const express = require('express')
const router = express.Router();
const UserController = require('../controllers/User')

// Create a user and insert into DB
router.get('/create', UserController.create);

// Find a user(s) based on single or multiple query parameters
router.get('/retrieve', UserController.find);

// Update user(s)
router.get('/update', UserController.update);

// Delete user(s)
router.get('/delete', UserController.destroy);

module.exports = router
