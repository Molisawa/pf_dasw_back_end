import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { create, findAll, findById, update, remove } from '../controllers/category.controller';
const router = Router();
import { verifyToken, isAdmin } from '../middlewares/auth.jwt';

//create category
router.post('/categories',[verifyToken, isAdmin], asyncHandler(create));

//get all categories
router.get('/categories', asyncHandler(findAll));

//get category by id
router.get('/categories/:id', asyncHandler(findById));

// update category
router.put('/categories/:id',[verifyToken, isAdmin], asyncHandler(update));

//delete category
router.delete('/categories/:id',[verifyToken, isAdmin], asyncHandler(remove));

export default router;