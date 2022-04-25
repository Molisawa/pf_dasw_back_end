
import Studio from '../models/studio';

export const create = async (req, res) => {
    const studio = Studio(req.body);
    res.status(201).json(
        await studio
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Studio created successfully',
                studio: result
            });
        })
    );
};

export const findAll = async (req, res) => {
    const studios = await Studio
    .find()
    .populate('movies', {
        title: 1,
        description: 1
    });

    if (!studios) {
        res.status(404).json({
            message: 'Studios not found'
        });
    }

    res.status(200).json({
        message: 'Studios fetched successfully',
        studios: studios
    });
};

export const findById = async (req, res) => {
    const { id } = req.params;
    const studio = await Studio.findOne({ _id: id });

    if (!studio) {
        res.status(404).json({
            message: 'Studio not found'
        });
    }

    res.status(200).json({
        message: 'Studio fetched successfully',
        studio: studio
    });
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const studio = await Studio.findOneAndUpdate({ _id: id }, { $set: { name, email, password } });
    
    if (!studio) {
        res.status(404).json({
            message: 'Studio not found'
        });
    }

    res.status(200).json({
        message: 'Studio updated successfully',
        studio: studio
    });
};

export const remove = async (req, res) => {
    const { id } = req.params;
    const studio = await Studio.findOneAndDelete({ _id: id });

    if (!studio) {
        res.status(404).json({
            message: 'Studio not found'
        });
    }

    res.status(200).json({
        message: 'Studio deleted successfully',
        studio: studio
    });

};