const fs = require('fs');
const path = require('path');
const util = require('util');

const { constants } = require('../constants');

const getUsers = util.promisify(fs.readFile);
const writeUsers = util.promisify(fs.writeFile);

const usersPath = path.join(__dirname, constants.DB_URL);

const getAllUsers = async () => {
  const users = await getUsers(usersPath);
  return JSON.parse(users.toString());
};

module.exports = {
  findAllUsers: async () => {
    const users = await getAllUsers();
    return users;
  },

  insertUser: async (username, email) => {
    const users = await getAllUsers();

    users.push({ id: Date.now(), username, email });

    await writeUsers(usersPath, JSON.stringify(users));
  },

  findUserById: async (userId) => {
    const users = await getAllUsers();

    return users.find((user) => user.id === userId);
  },

  deleteUserById: async (userId) => {
    const users = await getAllUsers();

    const newUsersArray = users.filter((user) => user.id !== userId);

    await writeUsers(usersPath, JSON.stringify(newUsersArray));
  },

  changeUserName: async (userId, newInfo) => {
    const users = await getAllUsers();

    const userIndex = users.findIndex((user) => user.id === userId);
    users[userIndex] = { ...users[userIndex], ...newInfo };

    await writeUsers(usersPath, JSON.stringify(users));
  }

};
