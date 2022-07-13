const jwt = require('jsonwebtoken');
const WrongAuthError = require('../errors/wrong-auth-err');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    // eslint-disable-next-line dot-notation
    const token = req.headers['authorization'];

    if (!token) throw new WrongAuthError('Необходима авторизация');

    const payload = jwt.verify(token, 'pass');

    if (!payload) throw new WrongAuthError('Необходима авторизация');

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
