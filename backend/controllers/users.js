const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const BadRequestError = require('../utils/errors/bad_request');
const UnauthorizedError = require('../utils/errors/unauthorized');
const NotFoundError = require('../utils/errors/not_found');
const ConflictError = require('../utils/errors/conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((result) => res.send(result))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен невалидный id'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.find({ email })
    .then((response) => {
      if (response.length === 0) {
        bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .then((user) => User.findOne({ _id: user._id }))
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Почта уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
      }
    })    
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send( user );
      } else {
        next(new NotFoundError('Пользователь не найден.'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('При обновлении данных пользователя были переданы некорректные данные'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send( user );
      } else {
        next(new NotFoundError('Пользователь не найден.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('При обновлении данных была передана некорректная ссылка'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, 
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Почта или пароль введены неправильно'));
    });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
