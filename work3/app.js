const express = require('express');

const { usersRouter } = require('./routes');
const { constants } = require('./constants');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log(`SERVER APP PORT: ${constants.PORT} `);
});
