const User = require('../models/user');

const ROLES = ['user', 'admin'];


const isRoleExist = (req, res, next) => {

    const roles = req.body.roles;

    if(roles){
    for (let i = 0; i < roles.length; i++) {
        if(!ROLES.includes(roles[i])){
            return res.status(400).json({
                message: `${roles[i]} is not a valid role`
            });
        }
    }
}
console.log(req.body.roles, "isRoleEXist");
next();

};

const isEmailorUsernameDuplicated = async (req, res, next) => {
    const { email, name } = req.body;
    const userName = await User.findOne({ name });
    if(userName) return res.status(400).json({ message: `${name} is already taken` } );

    const userEmail = await User.findOne({ email });
    if(userEmail) return res.status(400).json({ message: `${email} is already taken` } );


    next();
};

module.exports = {isRoleExist, isEmailorUsernameDuplicated};