const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cardController');
const auth = require('../middlewares/auth');

const isUrlMethod = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const cardRoutes = express.Router();

cardRoutes.get('/', auth, celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
}), getCards);

cardRoutes.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(isUrlMethod),
  }),
}), createCard);

cardRoutes.delete('/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }).unknown(true),
}), deleteCard);

cardRoutes.put('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }).unknown(true),
}), likeCard);

cardRoutes.delete('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }).unknown(true),
}), dislikeCard);

exports.cardRoutes = cardRoutes;
