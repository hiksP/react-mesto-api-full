const jwt = require('jsonwebtoken');
require('dotenv').config();
const WrongAuthError = require('../errors/wrong-auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    const authorization = req.cookies.jwt;
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'pass';

    if (!authorization) throw new WrongAuthError('Необходима авторизация');

    const payload = jwt.verify(authorization, secret);

    if (!payload) throw new WrongAuthError('Необходима авторизация');

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
