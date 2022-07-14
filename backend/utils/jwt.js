const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const secretWord = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const getJwtToken = (id) => jwt.sign({ id }, secretWord, { expiresIn: '7d' });

module.exports = { getJwtToken };
