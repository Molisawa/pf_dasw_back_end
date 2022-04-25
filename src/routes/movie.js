const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/movie');
const router = express.Router();

//create movie
router.post('/movies', asyncHandler(controller.create));

//get all movies
router.get('/movies', asyncHandler(controller.findAll));

//get movie by id
router.get('/movies/:id', asyncHandler(controller.findById));

// update movie
router.put('/movies/:id', asyncHandler(controller.update));

//delete movie
router.delete('/movies/:id', asyncHandler(controller.remove));

    



        


module.exports = router;