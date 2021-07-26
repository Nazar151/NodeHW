const { errorMassages } = require('../errors');
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
          errorMassages.USER_NOT_EXIST.message,
          errorMassages.USER_NOT_EXIST.code
        );
      }
      req.user = userById;

      next();
    } catch (e) {
      next(e);
    }
  },

  isDataCorrect: (req, res, next) => {
    try {
      if (!req.body.username || !req.body.email) {
        throw new ErrorHandler(
          responseCodeEnum.INCORRECT_DATA,
          errorMassages.INCORRECT_DATA.message,
          errorMassages.INCORRECT_DATA.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserAlreadyExist: async (req, res, next) => {
    try {
      const users = await userModel.find({});

      const isUserExist = users.some((user) => user.username === req.body.username);

      if (isUserExist) {
        throw new ErrorHandler(
          responseCodeEnum.USER_ALREADY_EXIST,
          errorMassages.USER_ALREADY_EXIST.message,
          errorMassages.USER_ALREADY_EXIST.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
