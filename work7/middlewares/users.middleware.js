const { errorMessage } = require('../errors');
const { userModel } = require('../database');
const { responseCodeEnum } = require('../constants');
const ErrorHandler = require('../errors/errorHandler');

module.exports = {

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
  },

  getUserByIdDynamicParam: (paramName, searchIn = 'params', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueParam = req[searchIn][paramName];
      const user = await userModel.findOne({ [dbKey]: valueParam });

      if (!user) {
        throw new ErrorHandler(
          responseCodeEnum.INCORRECT_REQUEST,
          errorMessage.USER_NOT_EXIST.message,
          errorMessage.USER_NOT_EXIST.code
        );
      }
      req.user = user;
      next();
    } catch (e) {
      res.json(e.message);
    }
  },

  getUserDynamicParam: (paramName, searchIn = 'body') => async (req, res, next) => {
    try {
      const valueParams = req[searchIn][paramName];
      const user = await userModel.findOne({ [paramName]: valueParams }).select('+password');

      if (!user) {
        throw new ErrorHandler(
          responseCodeEnum.INCORRECT_REQUEST,
          errorMessage.USER_NOT_EXIST.message,
          errorMessage.USER_NOT_EXIST.code
        );
      }
      req.user = user;
      next();
    } catch (e) {
      res.json(e.message);
    }
  },

  checkUserRole: (rolesArr = []) => (req, res, next) => {
    try {
      if (!rolesArr || !rolesArr.length) {
        return next();
      }
      const { role } = req.user;

      if (!rolesArr.includes(role)) {
        throw new Error('Permission denied');
      }
    } catch (e) {
      next(e);
    }
  }
};
