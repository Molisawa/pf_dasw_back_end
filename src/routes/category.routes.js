const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/category.controller');
const router = express.Router();

//create category
router.post('/categories', asyncHandler(controller.create));

//get all categories
router.get('/categories', asyncHandler(controller.findAll));

//get category by id
router.get('/categories/:id', asyncHandler(controller.findById));

// update category
router.put('/categories/:id', asyncHandler(controller.update));

//delete category
router.delete('/categories/:id', asyncHandler(controller.remove));

    



        


module.exports = router;