import User from "../models/user";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { SECRET } from "../config";
import Role from "../models/role";

export const create = async (req, res) => {
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


   const token = sign({ _id: savedUser._id }, SECRET, { expiresIn: "86400" });

   res.status(200).json({ token });
};

export const findAll = async (req, res) => {
    res.status(200).json(
         await User
         .find()
         .then(result => {
            res.status(200).json({
                message: 'Users fetched successfully',
                users: result
            });    
        })
    );
};

export const findById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
        res.status(404).json({
            message: 'User not found'
        });
    }

    res.status(200).json({
        message: 'User fetched successfully',
        user: user
    });
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findOneAndUpdate({ _id: id }, { $set: { name, email, password } });
    
    if (!user) {
        res.status(404).json({
            message: 'User not found'
        });
    }

    res.status(200).json({
        message: 'User updated successfully',
        user: user
    });
};

export const remove = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
        res.status(404).json({
            message: 'User not found'
        });
    }

    res.status(200).json({
        message: 'User deleted successfully',
        user: user
    });

};