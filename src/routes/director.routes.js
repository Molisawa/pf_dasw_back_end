import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { create, findAll, findById, update, remove } from '../controllers/director.controller';
const router = Router();
import { verifyToken, isAdmin } from '../middlewares/auth.jwt';

//create director
router.post('/directors',[verifyToken, isAdmin], asyncHandler(create));

//get all directors
router.get('/directors', asyncHandler(findAll));

//get director by id
router.get('/directors/:id', asyncHandler(findById));

// update director
router.put('/directors/:id',[verifyToken, isAdmin], asyncHandler(update));

//delete director
router.delete('/directors/:id',[verifyToken, isAdmin], asyncHandler(remove));

export default router;