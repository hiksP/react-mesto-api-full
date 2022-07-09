const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const NoRightsError = require('../errors/no-rights-err');
const WrongReqErorr = require('../errors/wrong-req-err');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    if (cards.length < 1) {
      throw new NotFoundError('Карточек нет :(');
    } else {
      res.send(cards);
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (card.owner.toString() === req.user.id) {
        card.remove();
        res.send({ data: card });
      } else {
        throw new NoRightsError('Недостаточно прав');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongReqErorr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user.id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new WrongReqErorr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.likeCard = async (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongReqErorr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.dislikeCard = async (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongReqErorr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
