const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailerLink: Joi.string().uri().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
}), deleteMovieById);

module.exports = router;
