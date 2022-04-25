const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Role = require("../models/role");


const signUp = async (req, res) => {
    const { name, email, password, roles } = req.body;

    const newUser = new User({
        name,
        email,
        password: await User.encryptPassword(password),
        roles,
    });

    if(roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    }else {
        const role = await Role.findOne({ name: "user" })
        newUser.roles = [role._id]
    }


   const savedUser = await newUser.save();
   console.log(savedUser);


   const token = jwt.sign({ _id: savedUser._id }, config.SECRET, { expiresIn: "86400" });

   res.status(200).json({ token});

   
};



const signIn = async (req, res) => {
        const { email, password } = req.body;

        const userFound = await User.findOne({email}).populate("roles");

        if (!userFound) return res.status(400).json({ message: "User not found" });

        const matchPasword = await User.matchPassword(password, userFound.password);

        if (!matchPasword) return res.status(401).json({ token: null, message: "Password incorrect" });

        const token = jwt.sign({ _id: userFound._id }, config.SECRET, { expiresIn: "86400" });
        
        res.status(200).json({ token });
};

module.exports = {
    signUp,
    signIn
};