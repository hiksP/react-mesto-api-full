const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers, getUserById, getInfo, updateUser, changeAvatar,
} = require('../controllers/userController');
const auth = require('../middlewares/auth');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const userRoutes = express.Router();

userRoutes.get('/', auth, celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
}), getUsers);

userRoutes.get('/me', auth, celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
}), getInfo);

userRoutes.get('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

userRoutes.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRoutes.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(method),
  }),
}), changeAvatar);

exports.userRoutes = userRoutes;
