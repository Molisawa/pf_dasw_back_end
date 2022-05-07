import User from "../models/user";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { SECRET } from "../config";
import Role from "../models/role";


export const signUp = async (req, res) => {
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

   const user = await User.findById(savedUser._id).populate("roles");


   const token = sign({ _id: savedUser._id, roles: user.roles }, SECRET, { expiresIn: "7d" });

   res.status(200).json({ token});

   
};



export const signIn = async (req, res) => {
        const { email, password } = req.body;

        const userFound = await User.findOne({email}).populate("roles");

        if (!userFound) return res.status(400).json({ message: "User not found" });

        const matchPasword = await User.matchPassword(password, userFound.password);

        if (!matchPasword) return res.status(401).json({ token: null, message: "Password incorrect" });

        const token = sign({ _id: userFound._id, roles: userFound.roles }, SECRET, { expiresIn: "7d" });
        
        res.status(200).json({ token });
};