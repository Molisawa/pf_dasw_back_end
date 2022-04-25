import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { create, findAll, findById, update, remove } from '../controllers/studio.controller';
const router = Router();
import { verifyToken, isAdmin } from '../middlewares/auth.jwt';

//create studio
router.post('/studios',[verifyToken, isAdmin], asyncHandler(create));

//get all studios
router.get('/studios', asyncHandler(findAll));

//get studio by id
router.get('/studios/:id', asyncHandler(findById));

// update studio
router.put('/studios/:id',[verifyToken, isAdmin], asyncHandler(update));

//delete studio
router.delete('/studios/:id',[verifyToken, isAdmin], asyncHandler(remove));
        


export default router;