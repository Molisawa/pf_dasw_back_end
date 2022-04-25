const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/movie.controller');
const router = express.Router();
const auth = require('../middlewares');

//create movie
router.post('/movies',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.create));

//get all movies
router.get('/movies', asyncHandler(controller.findAll));

//get movie by id
router.get('/movies/:id', asyncHandler(controller.findById));

// update movie
router.put('/movies/:id',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.update));

//delete movie
router.delete('/movies/:id',[auth.verifyToken, auth.isAdmin], asyncHandler(controller.remove));

    



        


module.exports = router;