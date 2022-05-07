import Movie from "../models/movie";
import Category from "../models/category";
import Actor from "../models/actor";
import Director from "../models/director";
import Studio from "../models/studio";

export const create = async (req, res) => {
  const content = req.body;

  const category = await Category.findById(content.category[0]);
  const actor = await Actor.findById(content.actor[0]);
  const director = await Director.findById(content.director[0]);
  const studio = await Studio.findById(content.studio);

  const newMovie = new Movie({
    ...content,
    category,
    actor,
    director,
    studio,
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
    message: "Movie created successfully",
    movie: savedMovie,
  });
};

export const findAll = async (req, res) => {
  // find all movies include populate
  const movies = await Movie.find()
    .populate("category", {
      name: 1,
    })
    .populate("actor", {
      name: 1,
    })
    .populate("director", {
      name: 1,
    })
    .populate("studio", {
      name: 1,
    });
  if (!movies || movies.length === 0) {
    res.status(404).json({
      message: "Movies not found",
    });
  }

  res.status(200).json({
    message: "Movies fetched successfully",
    movies: movies,
  });
};

export const findById = async (req, res) => {
  const { id } = req.params;
  // Necessary to show names in UI (and avoid to make a lot of querys to differente endpoints on client side)
  const movie = await Movie.findOne({ _id: id }).populate('studio', { name: 1 }).populate('actor', { name: 1 }).populate('director', { name: 1 });

  if (!movie) {
    res.status(404).json({
      message: "Movie not found",
    });
  }

  res.status(200).json({
    message: "Movie fetched successfully",
    movie: movie,
  });
};

export const findByTitle = async (req, res) => {
  const { title } = req.params;
  const movie = await Movie.find({ title: { $regex: `${title}.*` } })
  .limit(2)
  .populate("category", {
    name: 1,
  })
  .populate("actor", {
    name: 1,
  })
  .populate("director", {
    name: 1,
  })
  .populate("studio", {
    name: 1,
  });

  if (!movie) {
    res.status(404).json({
      message: "Movie not found",
    });
  }

  res.status(200).json({
    message: "Movie fetched successfully",
    movie: movie,
  }
  );


};

//find by category and actor and director and studio
export const findByCategory = async (req, res) => {
  const { category } = req.params;
  const movies = await Movie.find({ category: category })
  .populate("category", {
    name: 1,
  }
  ).populate("actor", {
    name: 1,
  }
  ).populate("director", {
    name: 1,
  }
  ).populate("studio", {
    name: 1,
  }
  );

  console.log(movies);
  if (!movies || movies.length === 0) {
    res.status(404).json({
      message: "Movies not found",
    });
  }

  res.status(200).json({
    message: "Movies fetched successfully",
    movies: movies,
  }
  );
}

export const findByActor = async (req, res) => {
  const { actor } = req.params;
  const movies = await Movie.find({ actor: actor })
  .populate("category", {
    name: 1,
  }
  ).populate("actor", {
    name: 1,
  }
  ).populate("director", {
    name: 1,
  }
  ).populate("studio", {
    name: 1,
  }
  );

  if (!movies || movies.length === 0) {
    res.status(404).json({
      message: "Movies not found",
    });
  }

  res.status(200).json({
    message: "Movies fetched successfully",
    movies: movies,
  }
  );
}

export const findByDirector = async (req, res) => {
  const { director } = req.params;
  const movies = await Movie.find({ director: director })
  .populate("category", {
    name: 1,
  }
  ).populate("actor", {
    name: 1,
  }
  ).populate("director", {
    name: 1,
  }
  ).populate("studio", {
    name: 1,
  }
  );

  if (!movies || movies.length === 0) {
    res.status(404).json({
      message: "Movies not found",
    });
  }

  res.status(200).json({
    message: "Movies fetched successfully",
    movies: movies,
  }
  );
}


export const findByStudio = async (req, res) => {
  const { studio } = req.params;
  const movies = await Movie.find({ studio: studio })
  .populate("category", {
    name: 1,
  }
  ).populate("actor", {
    name: 1,
  }
  ).populate("director", {
    name: 1,
  }
  ).populate("studio", {
    name: 1,
  }
  );

  if (!movies || movies.length === 0) {
    res.status(404).json({
      message: "Movies not found",
    });
  }

  res.status(200).json({
    message: "Movies fetched successfully",
    movies: movies,
  }
  );
}

export const update = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  // Update movie in Movie collection and in the categories, actors, directors and studios
  // and check if the array category has more than one element

  const movie = await Movie.findOneAndUpdate({ _id: id }, { $set: content }, { new: true });

  const categories = await Category.find({ _id: { $in: movie.category } });
  const actors = await Actor.find({ _id: { $in: movie.actor } });
  const directors = await Director.find({ _id: { $in: movie.director } });
  const studio = await Studio.findOne({ _id: movie.studio });


  if (categories.length > 1) {
    categories.forEach((category) => {
      category.movies = [...category.movies, movie._id];
      category.save();
    }
    );
  } else {
    categories[0].movies = [...categories[0].movies, movie._id];
    await categories[0].save();
  }

  if (actors.length > 1) {
    actors.forEach((actor) => {
      actor.movies = [...actor.movies, movie._id];
      actor.save();
    }
    );
  } else {
    actors[0].movies = [...actors[0].movies, movie._id];
    await actors[0].save();
  }

  if (directors.length > 1) {
    directors.forEach((director) => {
      director.movies = [...director.movies, movie._id];
      director.save();
    }
    );
  } else {
    directors[0].movies = [...directors[0].movies, movie._id];
    await directors[0].save();
  }

  studio.movies = [...studio.movies, movie._id];
  await studio.save();


  res.status(200).json({
    message: "Movie updated successfully",
    movie: movie,
  });
}

export const remove = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findOneAndDelete({ _id: id });

  if (!movie) {
    res.status(404).json({
      message: "Movie not found",
    });
  }

  res.status(200).json({
    message: "Movie deleted successfully",
    movie: movie,
  });
};
