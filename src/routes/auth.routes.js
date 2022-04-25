const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/auth.controller');
const router = express.Router();

router.post('/auth/signup', asyncHandler(controller.signUp));
router.post('/auth/signin', asyncHandler(controller.signIn));


module.exports = router;
 