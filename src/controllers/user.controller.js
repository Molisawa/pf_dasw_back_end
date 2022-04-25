
import User from '../models/user';

export const create = async (req, res) => {
    const user = User(req.body);
    res.status(201).json(
        await user
        .save()
        .then(result => {
            res.status(201).json({
                message: 'User created successfully',
                user: result
            });
        })
    );
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