const { userModel } = require('../database');
const { passwordHasher } = require('../password');
const ErrorHandler = require('../errors/errorHandler');
const { responseCodeEnum } = require('../constants');
const { errorMessage } = require('../errors');

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
      console.log(userByEmail);
      await passwordHasher.compare(userByEmail.password, password);

      req.user = userByEmail;

      next();
    } catch (e) {
      res.json(e.message);
    }
  }
};
