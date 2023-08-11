const Movie = require('../models/movie');
const NotFound = require('../components/NotFound');
const Forbidden = require('../components/Forbidden');
const BadRequest = require('../components/BadRequest');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      // Проверяем, является ли ошибка ошибкой валидации
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movieToDelete) => {
      if (!movieToDelete) {
        throw new NotFound();
      }
      if (String(movieToDelete.owner) !== String(req.user._id)) {
        throw new Forbidden();
      }
      movieToDelete.deleteOne()
        .then(() => {
          res.status(200).send({ message: 'Movie deleted successfully' });
        }).catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
