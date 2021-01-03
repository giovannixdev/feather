// const app = require('./api/app.js');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const authController = require('./controllers/authController');
const transactionsRouter = require('./routes/transactionsRouter');
const authRouter = require('./routes/authRouter');
const categoryRouter = require('./routes/categoryRouter');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/transactions', transactionsRouter);

//GLOBAL ERROR CATCH
app.use((error, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 200,
    error_message: { error_message: 'An error occurred' },
    error: {},
  };
  debugger;
  const errorObj = Object.assign({}, defaultErr, error);
  console.log(errorObj.log, error);
  return res.status(errorObj.status).json(errorObj.error_message);
});

app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
app.timeout = 60 * 10 * 1000;
