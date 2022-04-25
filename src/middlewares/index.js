const {verifyToken, isAdmin} = require('../middlewares/auth.jwt');
const {isRoleExist, isEmailorUsernameDuplicated} = require('../middlewares/verifySignup');

module.exports = {
    verifyToken,
    isAdmin,
    isRoleExist,
    isEmailorUsernameDuplicated
};