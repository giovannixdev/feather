// const app = require('./api/app.js');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const accountsController = require('./controllers/accountsController');
const transactionsRouter = require('./routes/transactionsRouter');
const authRouter = require('./routes/authRouter');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionsRouter);

//GLOBAL ERROR CATCH
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
app.timeout = 60 * 10 * 1000;
