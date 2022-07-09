const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { getJwtToken } = require('../utils/jwt');
const NotFoundError = require('../errors/not-found-err');
const WrongAuthError = require('../errors/wrong-auth-err');
const WrongReqErorr = require('../errors/wrong-req-err');
const UserCreatedError = require('../errors/user-created-err');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length < 1) {
      throw new NotFoundError('пользователи не найдены :(');
    } else {
      res.send(users);
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      throw new NotFoundError('пользователь не найден');
    }
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.send({
      email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new UserCreatedError('Пользователь с такой почтой уже зарегестрирован!'));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new WrongReqErorr('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

exports.updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongReqErorr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.changeAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongReqErorr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.getInfo = async (req, res, next) => {
  const usertoken = req.cookies.jwt;
  const decoded = jwt.verify(usertoken, 'pass');
  try {
    const user = await User.findById(decoded.id);
    if (user == null) {
      throw new NotFoundError('Пользователь не найден');
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new WrongAuthError('Не введен логин или пароль');
  } else {
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = getJwtToken(user._id);
        console.log(token);
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
          .send(JSON.stringify({ token }));
      })
      .catch((err) => {
        next(new WrongAuthError(err.message));
      });
  }
};
