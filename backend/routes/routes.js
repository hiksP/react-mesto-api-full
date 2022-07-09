const express = require('express');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

exports.routes = routes;
