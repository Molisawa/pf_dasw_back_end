import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { create, findAll, findById, update, remove } from '../controllers/actor.controller';
const router = Router();
import { verifyToken, isAdmin } from '../middlewares/auth.jwt';

//create actor
router.post('/actors',[verifyToken, isAdmin], asyncHandler(create));

//get all actors
router.get('/actors', asyncHandler(findAll));

//get actor by id
router.get('/actors/:id', asyncHandler(findById));

// update actor
router.put('/actors/:id',[verifyToken, isAdmin], asyncHandler(update));

//delete actor
router.delete('/actors/:id',[verifyToken, isAdmin], asyncHandler(remove));

export default router;