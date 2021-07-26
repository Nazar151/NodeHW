const { Schema, model } = require('mongoose');
const { userRolesEnum, dbTablesEnum } = require('../constants');

const userSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },

  role: {
    type: String,
    enum: Object.values(userRolesEnum),
    default: dbTablesEnum.USER

  }
}, { timestamps: true });

module.exports = model(dbTablesEnum.USER, userSchema);
