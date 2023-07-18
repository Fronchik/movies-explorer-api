const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  getUsersMe, updateProfileUser,
} = require('../controllers/users');

// возвращает информацию о текущем пользователе
router.get('/me', getUsersMe);

// обновляет информацию о пользователе(email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateProfileUser);

module.exports = router;
