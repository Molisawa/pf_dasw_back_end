
const Category = require('../models/category');

const create = async (req, res) => {
    const category = Category(req.body);
    
    res.status(201).json(
        await category
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Category created successfully',
                category: result
            });
        })
    );
};

const findAll = async (req, res) => {
    const categories = await Category
    .find()
    .populate('movies', {
        name: 1,
        description: 1
    });

    if (!categories) {
        res.status(404).json({
            message: 'Categories not found'
        });
    }

    res.status(200).json({
        message: 'Categories fetched successfully',
        categories: categories
    });
};

const findById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });

    if (!category) {
        res.status(404).json({
            message: 'Category not found'
        });
    }

    res.status(200).json({
        message: 'Category fetched successfully',
        category: category
    });
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const category = await Category.findOneAndUpdate({ _id: id }, { $set: { name, email, password } });
    
    if (!category) {
        res.status(404).json({
            message: 'Category not found'
        });
    }

    res.status(200).json({
        message: 'Category updated successfully',
        category: category
    });
};

const remove = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id });

    if (!category) {
        res.status(404).json({
            message: 'Category not found'
        });
    }

    res.status(200).json({
        message: 'Category deleted successfully',
        category: category
    });

};


module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};