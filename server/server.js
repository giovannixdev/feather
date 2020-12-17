// const app = require('./api/app.js');
const express = require('express')
const app = express();
const path = require('path');

app.get('/', (req,res) => {
  res.send("hello world")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
app.timeout = 60 * 10 * 1000;