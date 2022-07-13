const jwt = require('jsonwebtoken');
const WrongAuthError = require('../errors/wrong-auth-err');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    const authorization = req.cookies.jwt;

    if (!authorization) throw new WrongAuthError('Необходима авторизация');

    const payload = jwt.verify(authorization, 'pass');

    if (!payload) throw new WrongAuthError('Необходима авторизация');

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
