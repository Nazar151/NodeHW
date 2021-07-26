const { responseConstants, responseCodeEnum } = require('../constants');
const { userModel } = require('../database');

module.exports = {

  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find({});
      res
        .status(responseCodeEnum.SUCCESS)
        .json(users);
    } catch (e) {
      res
        .status(responseCodeEnum.INCORRECT_REQUEST)
        .json(e.message);
    }
  },

  createUser: async (req, res) => {
    try {
      await userModel.create(req.body);
      res
        .status(responseCodeEnum.CREATED)
        .json(responseConstants.SUCCESS);
    } catch (e) {
      res
        .status(responseCodeEnum.INCORRECT_REQUEST)
        .json(e.message);
    }
  },

  getUserById: (req, res) => {
    try {
      res
        .status(responseCodeEnum.SUCCESS)
        .json(req.user);
    } catch (e) {
      res
        .status(responseCodeEnum.INCORRECT_REQUEST)
        .json(e.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await userModel.findOneAndRemove({ _id: req.params.id });
      res
        .status(responseCodeEnum.DELETED)
        .json(responseConstants.SUCCESS);
    } catch (e) {
      res
        .status(responseCodeEnum.INCORRECT_REQUEST)
        .json(e.message);
    }
  },

  changeUser: async (req, res) => {
    try {
      await userModel.findOneAndUpdate({ _id: req.params.id }, req.body);
      res
        .status(responseCodeEnum.UPDATED)
        .json(responseConstants.SUCCESS);
    } catch (e) {
      res
        .status(responseCodeEnum.INCORRECT_REQUEST)
        .json(e.message);
    }
  }
};
