const { Schema, model } = require('mongoose');
const { dbTablesEnum } = require('../constants');

const oAuthSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: dbTablesEnum.USER
  }
});

oAuthSchema.pre('find', function() {
  this.populate('user');
});

oAuthSchema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(dbTablesEnum.O_AUTH, oAuthSchema);
