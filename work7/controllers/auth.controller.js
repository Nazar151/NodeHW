const { authConstant, responseCodeEnum } = require('../constants');
const { authService } = require('../services');
const { errorMessage } = require('../errors');
const { oAuthModel } = require('../database');

module.exports = {
  identificationUser: (req, res, next) => {
    try {
      res
        .status(responseCodeEnum.OK)
        .json(req.user);
    } catch (e) {
      next(e);
    }
  },

  login: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error(errorMessage.WRONG_EMAIL_OR_PASS);
      }

      const { _id } = req.user;

      const tokenPair = authService.generateTokenPair();

      await oAuthModel.create({ ...tokenPair, user: _id });
      res.json({
        ...tokenPair,
        user: req.user
      });
      next();
    } catch (e) {
      res.json(e.message);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(authConstant.AUTHORIZATION);
      await oAuthModel.remove({ accessToken: token });
      res
        .status(responseCodeEnum.ACCEPTED)
        .json(req.user);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const token = req.get(authConstant.AUTHORIZATION);

      const { _id } = req.user;
      await oAuthModel.remove({ accessToken: token });

      const tokenPair = authService.generateTokenPair();

      await oAuthModel.create({ ...tokenPair, user: _id });

      res
        .status(responseCodeEnum.ACCEPTED)
        .json({
          ...tokenPair,
          user: req.user
        });
    } catch (e) {
      next(e);
    }
  }
};
