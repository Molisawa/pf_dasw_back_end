
const Movie = require('../models/movie');
const Category = require('../models/category');
const Actor = require('../models/actor');
const Director = require('../models/director');
const Studio = require('../models/studio');

const create = async (req, res) => {
    const content = req.body;

    const category = await Category.findById(content.category);
    const actor = await Actor.findById(content.actor[0]);
    const director = await Director.findById(content.director[0]);
    const studio = await Studio.findById(content.studio);
    
    const newMovie = new Movie({
        ...content,
        category,
        actor,
        director,
        studio
    });

    const savedMovie = await newMovie.save();
    
    category.movies = [...category.movies, savedMovie._id];
    await category.save();

    actor.movies = [...actor.movies, savedMovie._id];
    await actor.save();
    director.movies = [...director.movies, savedMovie._id];
    await director.save();
    studio.movies = [...studio.movies, savedMovie._id];
    await studio.save();

    res.status(201).json({
        message: 'Movie created successfully',
        movie: savedMovie
    });
};

const findAll = async (req, res) => {

    // find all movies include populate
    const movies = await Movie
    .find()
    .populate('category',
        {
            name: 1,
            }
    )
    .populate('actor')
    .populate('director')
    .populate('studio');
    if (!movies) {
        res.status(404).json({
            message: 'Movies not found'
        });
    }

    res.status(200).json({
        message: 'Movies fetched successfully',
        movies: movies
    });
};

const findById = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findOne({ _id: id });

    if (!movie) {
        res.status(404).json({
            message: 'Movie not found'
        });
    }

    res.status(200).json({
        message: 'Movie fetched successfully',
        movie: movie
    });
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const movie = await Movie.findOneAndUpdate({ _id: id }, { $set: { name, email, password } });
    
    if (!movie) {
        res.status(404).json({
            message: 'Movie not found'
        });
    }

    res.status(200).json({
        message: 'Movie updated successfully',
        movie: movie
    });
};

const remove = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findOneAndDelete({ _id: id });

    if (!movie) {
        res.status(404).json({
            message: 'Movie not found'
        });
    }

    res.status(200).json({
        message: 'Movie deleted successfully',
        movie: movie
    });

};


module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};