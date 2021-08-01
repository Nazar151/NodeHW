const { responseConstant, responseCodeEnum } = require('../constants');
const { userModel } = require('../database');
const { passwordHasher } = require('../password');

module.exports = {

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userModel.find({});
      res
        .status(responseCodeEnum.SUCCESS)
        .json(users);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await passwordHasher.hash(password);
      await userModel.create({ ...req.body, password: hashedPassword });
      res
        .status(responseCodeEnum.CREATED)
        .json(responseConstant.SUCCESS);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      res
        .status(responseCodeEnum.SUCCESS)
        .json(req.user);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await userModel.findOneAndRemove({ _id: req.params.id });
      res
        .status(responseCodeEnum.DELETED)
        .json(responseConstant.SUCCESS);
    } catch (e) {
      next(e);
    }
  },

  changeUser: async (req, res, next) => {
    try {
      await userModel.findOneAndUpdate({ _id: req.params.id }, req.body);
      res
        .status(responseCodeEnum.UPDATED)
        .json(responseConstant.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
};
