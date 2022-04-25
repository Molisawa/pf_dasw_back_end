const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const Role = require('../models/role');

const verifyToken = async (req, res, next) => {
    
    try {
        const token = req.headers['x-access-token'] || req.headers['authorization'];

        if (!token) return res.status(403).json({ message: "No token provided" });
    
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded._id;
        const user = await User.findById(req.userId, { password: 0 });
        
    
        if (!user) return res.status(401).json({ message: "Invalid token" });
    
        next();
    } catch (err) {

        return res.status(500).json({ message: "Unauthorized" });
        
    }


};

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 });
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next();
            return;
        }
    }
    
    return res.status(401).json({ message: "Unauthorized, Admin Role required." });
};


module.exports = {
    verifyToken,
    isAdmin
};