const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/studio.controller');
const router = express.Router();
const auth = require('../middlewares');

//create studio
router.post('/studios',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.create));

//get all studios
router.get('/studios', asyncHandler(controller.findAll));

//get studio by id
router.get('/studios/:id', asyncHandler(controller.findById));

// update studio
router.put('/studios/:id',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.update));

//delete studio
router.delete('/studios/:id',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.remove));

    



        


module.exports = router;