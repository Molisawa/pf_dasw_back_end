import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { create, findAll, findById, findByTitle, findByActor, findByCategory, findByDirector, findByStudio, update, remove } from '../controllers/movie.controller';
const router = Router();
import { verifyToken, isAdmin } from '../middlewares/auth.jwt';

//create movie
router.post('/movies',[verifyToken, isAdmin], asyncHandler(create));

//get all movies
router.get('/movies', asyncHandler(findAll));

//get movie by id
router.get('/movies/:id', asyncHandler(findById));

//get movie by title
router.post('/movies/:title', asyncHandler(findByTitle));

//get movie by category
router.get('/movies/category/:category', asyncHandler(findByCategory));

//get movie by actor
router.get('/movies/actor/:actor', asyncHandler(findByActor));

//get movie by director
router.get('/movies/director/:director', asyncHandler(findByDirector));

//get movie by studio
router.get('/movies/studio/:studio', asyncHandler(findByStudio));

// update movie
router.put('/movies/:id',[verifyToken, isAdmin], asyncHandler(update));

//delete movie
router.delete('/movies/:id',[verifyToken, isAdmin], asyncHandler(remove));


export default router;