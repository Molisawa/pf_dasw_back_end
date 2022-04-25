const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/actor.controller');
const router = express.Router();

//create actor
router.post('/actors', asyncHandler(controller.create));

//get all actors
router.get('/actors', asyncHandler(controller.findAll));

//get actor by id
router.get('/actors/:id', asyncHandler(controller.findById));

// update actor
router.put('/actors/:id', asyncHandler(controller.update));

//delete actor
router.delete('/actors/:id', asyncHandler(controller.remove));

    



        


module.exports = router;