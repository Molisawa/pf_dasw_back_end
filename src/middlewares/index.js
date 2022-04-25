const {verifyToken, isAdmin} = require('../middlewares/auth.jwt');

module.exports = {
    verifyToken,
    isAdmin
};