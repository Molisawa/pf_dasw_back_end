const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/director.controller');
const router = express.Router();

//create director
router.post('/directors', asyncHandler(controller.create));

//get all directors
router.get('/directors', asyncHandler(controller.findAll));

//get director by id
router.get('/directors/:id', asyncHandler(controller.findById));

// update director
router.put('/directors/:id', asyncHandler(controller.update));

//delete director
router.delete('/directors/:id', asyncHandler(controller.remove));

    



        


module.exports = router;