const jwt = require('jsonwebtoken');
const WrongAuthError = require('../errors/wrong-auth-err');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) throw new WrongAuthError('Необходима авторизация');

    const payload = jwt.verify(token, 'pass');

    if (!payload) throw new WrongAuthError('Необходима авторизация');

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
