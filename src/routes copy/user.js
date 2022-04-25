const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/user.controller');
const router = express.Router();

//create user
router.post('/users', asyncHandler(controller.create));

//get all users
router.get('/users', asyncHandler(controller.findAll));

//get user by id
router.get('/users/:id', asyncHandler(controller.findById));

// update user
router.put('/users/:id', asyncHandler(controller.update));

//delete user
router.delete('/users/:id', asyncHandler(controller.remove));

    



        


module.exports = router;