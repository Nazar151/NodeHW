const { errorMessage } = require('../errors');
const { userModel } = require('../database');
const { responseCodeEnum } = require('../constants');
const ErrorHandler = require('../errors/errorHandler');

module.exports = {
  isUserExist: async (req, res, next) => {
    try {
      const userById = await userModel.findById(req.params.id);

      if (!userById) {
        throw new ErrorHandler(
          responseCodeEnum.INCORRECT_REQUEST,
          errorMessage.USER_NOT_EXIST.message,
          errorMessage.USER_NOT_EXIST.code
        );
      }
      req.user = userById;

      next();
    } catch (e) {
      res.json(e.message);
    }
  },

  isDataCorrect: (req, res, next) => {
    try {
      if (!req.body.username || !req.body.email) {
        throw new ErrorHandler(
          responseCodeEnum.INCORRECT_DATA,
          errorMessage.INCORRECT_DATA.message,
          errorMessage.INCORRECT_DATA.code
        );
      }

      next();
    } catch (e) {
      res.json(e.message);
    }
  },

  isUserAlreadyExist: async (req, res, next) => {
    try {
      const users = await userModel.find({});

      const isUserExist = users.some((user) => user.username === req.body.username);

      if (isUserExist) {
        throw new ErrorHandler(
          responseCodeEnum.USER_ALREADY_EXIST,
          errorMessage.USER_ALREADY_EXIST.message,
          errorMessage.USER_ALREADY_EXIST.code
        );
      }

      next();
    } catch (e) {
      res.json(e.message);
    }
  }
};
