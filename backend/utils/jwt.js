const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'pass';

const getJwtToken = (id) => jwt.sign({ id }, secret, { expiresIn: '7d' });

module.exports = { getJwtToken };
