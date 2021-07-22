const { usersService } = require('../services');
const { errorConstants } = require('../constants');

module.exports = {
  isUserExist: async (req, res, next) => {
    try {
      const usersById = await usersService.findUserById(+req.params.id);

      if (!usersById) {
        throw new Error(errorConstants.USER_NOT_EXIST);
      }
      req.user = usersById;

      next();
    } catch (e) {
      console.log(e);
    }
  },

  isDataCorrect: (req, res, next) => {
    try {
      if (!req.body.username || !req.body.email) {
        throw new Error(errorConstants.INCORRECT_DATA);
      }

      next();
    } catch (e) {
      console.log(e);
    }
  },

  isUserAlreadyExist: async (req, res, next) => {
    try {
      const users = await usersService.findAllUsers();

      const isUserExist = users.some((user) => user.username === req.body.username);

      if (isUserExist) {
        throw new Error(errorConstants.USER_ALREADY_EXIST);
      }

      next();
    } catch (e) {
      console.log(e);
    }
  }
};
