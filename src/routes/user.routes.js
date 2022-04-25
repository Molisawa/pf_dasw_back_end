import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { create, findAll, findById, update, remove } from '../controllers/user.controller';
const router = Router();
import { verifyToken, isAdmin } from '../middlewares/auth.jwt';
import { isRoleExist } from '../middlewares/verifySignup';

//create user
router.post('/users',[verifyToken, isAdmin, isRoleExist], asyncHandler(create));

//get all users
router.get('/users', asyncHandler(findAll));

//get user by id
router.get('/users/:id', asyncHandler(findById));

// update user
router.put('/users/:id',[verifyToken, isAdmin], asyncHandler(update));

//delete user
router.delete('/users/:id',[verifyToken, isAdmin], asyncHandler(remove));




export default router;