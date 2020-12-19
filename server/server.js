// const app = require('./api/app.js');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const pgController = require('./pgController');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.get('/api/testCreateTable', pgController.createUserTable, (req,res) => {

  console.log("IN TEST CREATE TABLE");
  res.status(200).json(res.locals.userTable);
});

app.get('/api/testdeleteTable', pgController.deleteUserTable, (req,res) => {

  console.log("IN TEST DELETE TABLE");
  res.status(200).json(res.locals.userTable);
});

app.get('/api/register', pgController.createUser, (req,res) => {

  console.log("IN TEST CREATE USER");
  res.status(200).json(res.locals.user);
});

app.get('/api/getUsers', pgController.getUsers, (req,res) => {

  console.log("GETTING USERS");
  res.status(200).json(res.locals.users);
});


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