const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, './config/dev.env')
});

require('./data');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use('/api/auth/', authRouter);

app.use('/api/users/', usersRouter);

// catch 404
app.use(function(req, res, next) {
  res.status(404).send();
});

// global error handler
app.use(function(err, req, res, next) {
  res.status(500).send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started of port ${PORT}`));

module.exports = app;
