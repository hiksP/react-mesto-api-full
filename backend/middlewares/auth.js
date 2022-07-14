const jwt = require('jsonwebtoken');
const WrongAuthError = require('../errors/wrong-auth-err');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    const authorization = req.cookies.jwt;
    const secretWord = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

    if (!authorization) throw new WrongAuthError('Необходима авторизация');

    const payload = jwt.verify(authorization, secretWord);

    if (!payload) throw new WrongAuthError('Необходима авторизация');

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
