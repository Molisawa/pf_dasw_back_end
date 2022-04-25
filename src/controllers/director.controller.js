
const Director = require('../models/director');

const create = async (req, res) => {
    const director = Director(req.body);
    res.status(201).json(
        await director
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Director created successfully',
                director: result
            });
        })
    );
};

const findAll = async (req, res) => {
    const directors = await Director
    .find()
    .populate('movies', {
        name: 1,
        description: 1
        });
    
    if (!directors) {
        res.status(404).json({
            message: 'Directors not found'
        });
    }

    res.status(200).json({
        message: 'Directors fetched successfully',
        directors: directors
    });
};


const findById = async (req, res) => {
    const { id } = req.params;
    const director = await Director.findOne({ _id: id });

    if (!director) {
        res.status(404).json({
            message: 'Director not found'
        });
    }

    res.status(200).json({
        message: 'Director fetched successfully',
        director: director
    });
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const director = await Director.findOneAndUpdate({ _id: id }, { $set: { name, email, password } });
    
    if (!director) {
        res.status(404).json({
            message: 'Director not found'
        });
    }

    res.status(200).json({
        message: 'Director updated successfully',
        director: director
    });
};

const remove = async (req, res) => {
    const { id } = req.params;
    const director = await Director.findOneAndDelete({ _id: id });

    if (!director) {
        res.status(404).json({
            message: 'Director not found'
        });
    }

    res.status(200).json({
        message: 'Director deleted successfully',
        director: director
    });

};


module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};