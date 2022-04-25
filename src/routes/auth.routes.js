const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/auth.controller');
const router = express.Router();
const verifySignup = require('../middlewares/');

router.post('/auth/signup',[verifySignup.isEmailorUsernameDuplicated, verifySignup.isRoleExist], asyncHandler(controller.signUp));
router.post('/auth/signin', asyncHandler(controller.signIn));


module.exports = router;
 