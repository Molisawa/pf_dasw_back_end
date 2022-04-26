import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { signUp, signIn } from '../controllers/auth.controller';
const router = Router();
import { verifyToken, isAdmin } from '../middlewares/auth.jwt';
import { isRoleExist, isEmailorUsernameDuplicated } from '../middlewares/verifySignup';

router.post('/auth/signup',[isRoleExist, isEmailorUsernameDuplicated], asyncHandler(signUp));
router.post('/auth/signin', asyncHandler(signIn));

export default router;
 