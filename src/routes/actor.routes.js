const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/actor.controller');
const router = express.Router();
const auth = require('../middlewares');

//create actor
router.post('/actors',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.create));

//get all actors
router.get('/actors', asyncHandler(controller.findAll));

//get actor by id
router.get('/actors/:id', asyncHandler(controller.findById));

// update actor
router.put('/actors/:id',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.update));

//delete actor
router.delete('/actors/:id',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.remove));

    



        


module.exports = router;