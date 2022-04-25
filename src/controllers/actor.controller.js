
const Actor = require('../models/actor');

const create = async (req, res) => {
    const actor = Actor(req.body);
    res.status(201).json(
        await actor
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Actor created successfully',
                actor: result
            });
        })
    );
};

const findAll = async (req, res) => {
    const actors = await Actor
    .find()
    .populate('movies', {
        title: 1,
        description: 1
    });

    if (!actors) {
        res.status(404).json({
            message: 'Actors not found'
        });
    }

    res.status(200).json({
        message: 'Actors fetched successfully',
        actors: actors
    });
};

const findById = async (req, res) => {
    const { id } = req.params;
    const actor = await Actor.findOne({ _id: id });

    if (!actor) {
        res.status(404).json({
            message: 'Actor not found'
        });
    }

    res.status(200).json({
        message: 'Actor fetched successfully',
        actor: actor
    });
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const actor = await Actor.findOneAndUpdate({ _id: id }, { $set: { name, email, password } });
    
    if (!actor) {
        res.status(404).json({
            message: 'Actor not found'
        });
    }

    res.status(200).json({
        message: 'Actor updated successfully',
        actor: actor
    });
};

const remove = async (req, res) => {
    const { id } = req.params;
    const actor = await Actor.findOneAndDelete({ _id: id });

    if (!actor) {
        res.status(404).json({
            message: 'Actor not found'
        });
    }

    res.status(200).json({
        message: 'Actor deleted successfully',
        actor: actor
    });

};


module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};