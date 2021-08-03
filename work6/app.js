const express = require('express');
const mongoose = require('mongoose');

const { usersRouter, authRouter } = require('./routes');
const { constant } = require('./constants');

const app = express();
_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(3000, () => {
  console.log(`SERVER APP PORT: ${constant.PORT} `);
});

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || 404,
    massage: err.message || 'Rout not found'
  });
}

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/work6', { useNewUrlParser: true, useUnifiedTopology: true });
}
