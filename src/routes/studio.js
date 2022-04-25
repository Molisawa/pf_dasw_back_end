const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/studio.controller');
const router = express.Router();

//create studio
router.post('/studios', asyncHandler(controller.create));

//get all studios
router.get('/studios', asyncHandler(controller.findAll));

//get studio by id
router.get('/studios/:id', asyncHandler(controller.findById));

// update studio
router.put('/studios/:id', asyncHandler(controller.update));

//delete studio
router.delete('/studios/:id', asyncHandler(controller.remove));

    



        


module.exports = router;