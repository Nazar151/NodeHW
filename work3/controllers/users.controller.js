const { usersService } = require('../services');
const { responseConstants } = require('../constants');

module.exports = {

  getAllUsers: async (req, res) => {
    try {
      const users = await usersService.findAllUsers();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;

      await usersService.insertUser(username, email);
      res.json(responseConstants.SUCCESS);
    } catch (e) {
      console.log(e);
    }
  },

  getUserById: (req, res) => {
    try {
      res.json(req.user);
    } catch (e) {
      console.log(e);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await usersService.deleteUserById(+req.params.id);
      res.json(responseConstants.SUCCESS);
    } catch (e) {
      console.log();
    }
  },

  changeUser: async (req, res) => {
    try {
      await usersService.changeUserName(+req.params.id, req.body);
      res.json(responseConstants.SUCCESS);
    } catch (e) {
      console.log(e);
    }
  }
};
