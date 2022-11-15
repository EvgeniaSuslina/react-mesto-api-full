const routesUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  getCurrentUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const regexUrl = /^(http[s]:\/\/)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+(\.[a-zA-Z]{2,}([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=])*)/;

routesUsers.get('/me', getCurrentUserInfo);

routesUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

routesUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexUrl),
  }),
}), updateAvatar);

routesUsers.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

routesUsers.get('/', getUsers);

module.exports = routesUsers;
