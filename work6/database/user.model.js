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

  password: {
    type: String,
    select: false
  },

  age: {
    type: Number,
    default: 0,
    max: 120
  },

  role: {
    type: String,
    enum: Object.values(userRolesEnum),
    default: dbTablesEnum.USER

  }
}, { timestamps: true });

module.exports = model(dbTablesEnum.USER, userSchema);
