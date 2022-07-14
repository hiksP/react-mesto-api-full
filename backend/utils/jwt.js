const jwt = require('jsonwebtoken');

const JWT_SECRET = 'pass';

const getJwtToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

module.exports = { getJwtToken };
