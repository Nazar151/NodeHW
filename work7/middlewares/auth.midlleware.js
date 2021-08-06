const { authConstant, responseCodeEnum } = require('../constants');
const { userModel, oAuthModel } = require('../database');
const { passwordHasher } = require('../password');
const ErrorHandler = require('../errors/errorHandler');
const { errorMessage } = require('../errors');
const { authService } = require('../services');

module.exports = {
  isLoginAndPasswordCorrect: async (req, res, next) => {
    try {
      const { password, email } = req.body;
      const userByEmail = await userModel.findOne({ email }).select('+password');

      if (!userByEmail) {
        throw new ErrorHandler(responseCodeEnum.INCORRECT_REQUEST,
          errorMessage.WRONG_EMAIL_OR_PASS.message,
          errorMessage.WRONG_EMAIL_OR_PASS.code);
      }
      await passwordHasher.compare(userByEmail.password, password);

      req.user = userByEmail;

      next();
    } catch (e) {
      res.json(e.message);
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(authConstant.AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          responseCodeEnum.WRONG_TOKEN,
          errorMessage.WRONG_TOKEN.message,
          errorMessage.WRONG_TOKEN.code
        );
      }
      await authService.verifyToken(token);

      const tokenObject = await oAuthModel.findOne({ accessToken: token });

      if (!token) {
        throw new ErrorHandler(
          responseCodeEnum.WRONG_TOKEN,
          errorMessage.WRONG_TOKEN.message,
          errorMessage.WRONG_TOKEN.code
        );
      }
      req.user = (tokenObject.user);
      next();
    } catch (e) {
      res.json(e.message);
    }
  }
};
