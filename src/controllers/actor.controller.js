
import Actor from '../models/actor';

export const create = async (req, res) => {
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

export const findAll = async (req, res) => {
    const actors = await Actor
    .find()
    .populate('movies', {
        title: 1,
        description: 1
    });

    if (!actors || actors.length === 0) {
        res.status(404).json({
            message: 'There are no actors'
        });
    }

    res.status(200).json({
        message: 'Actors fetched successfully',
        actors: actors
    });
};

export const findById = async (req, res) => {
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

export const update = async (req, res) => {
    const { id } = req.params;
    const { name, age, character } = req.body;
    const actor = await Actor.findOneAndUpdate({ _id: id }, { $set: { name, age, character } }, { new: true });
    
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

export const remove = async (req, res) => {
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