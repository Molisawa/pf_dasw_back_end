
import Category from '../models/category';

export const create = async (req, res) => {
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

export const findAll = async (req, res) => {
    const categories = await Category
    .find()
    // To show poster and year on cards, this could change based on UI requiremens for the cards
    .populate('movies', {
        title: 1,
        poster: 1,
        year: 1
    });

    if (!categories || categories.length === 0) {
        res.status(404).json({
            message: 'Categories not found'
        });
    }

    res.status(200).json({
        message: 'Categories fetched successfully',
        categories: categories
    });
};

export const findById = async (req, res) => {
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

export const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate({ _id: id }, { $set: { name } }, { new: true });
    
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

export const remove = async (req, res) => {
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