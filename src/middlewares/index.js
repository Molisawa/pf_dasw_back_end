import { verifyToken, isAdmin } from '../middlewares/auth.jwt';
import { isRoleExist, isEmailorUsernameDuplicated } from '../middlewares/verifySignup';

export default {
    verifyToken,
    isAdmin,
    isRoleExist,
    isEmailorUsernameDuplicated
};