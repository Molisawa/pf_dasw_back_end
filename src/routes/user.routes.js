const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/user.controller');
const router = express.Router();
const auth = require('../middlewares');

//create user
router.post('/users',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.create));

//get all users
router.get('/users', asyncHandler(controller.findAll));

//get user by id
router.get('/users/:id', asyncHandler(controller.findById));

// update user
router.put('/users/:id',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.update));

//delete user
router.delete('/users/:id',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.remove));

    



        


module.exports = router;