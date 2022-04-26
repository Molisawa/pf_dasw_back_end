import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { create, findAll, findById, update, remove } from '../controllers/movie.controller';
const router = Router();
import { verifyToken, isAdmin } from '../middlewares/auth.jwt';

//create movie
router.post('/movies',[verifyToken, isAdmin], asyncHandler(create));

//get all movies
router.get('/movies', asyncHandler(findAll));

//get movie by id
router.get('/movies/:id', asyncHandler(findById));

// update movie
router.put('/movies/:id',[verifyToken, isAdmin], asyncHandler(update));

//delete movie
router.delete('/movies/:id',[verifyToken, isAdmin], asyncHandler(remove));


export default router;