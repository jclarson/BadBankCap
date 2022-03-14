var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
  dal
    .create(req.params.name, req.params.email, req.params.password, "customer")
    .then((user) => {
      console.log(user);
      res.send(user);
  });
});

//create admin account
app.get('/account/create/admin/:name/:email/:password', function (req, res) {
  dal
    .create(req.params.name, req.params.email, req.params.password, "admin")
    .then((user) => {
      console.log(user);
      res.send(user);
  });
});

app.get('/account/update/checking/:email/:amount', function (req, res) {
  dal
    .updateChecking(req.params.email, req.params.amount)
    .then((user) => {
      console.log(user);
      res.send(user);
  });
});

app.get('/account/update/savings/:email/:amount', function (req, res) {
  dal
    .updateSavings(req.params.email, req.params.amount)
    .then((user) => {
      console.log(user);
      res.send(user);
  });
});

//find account by email
app.get('/account/balance/:email', function (req, res) {
  dal
    .findOne(req.params.email)
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    });
});

app.get('/account/login/:email', function (req, res) {
  dal
    .findOne(req.params.email)
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    });
});

//all accounts
app.get('/account/all', function (req, res) {
  dal
    .all()
    .then((docs) => {
      console.log(docs);
      res.send(docs);
  });
});

app.get('/account/user/:email', function (req, res) {
  dal
  .findOne(req.params.email)
  .then((doc) => {
      console.log(doc);
      res.send(doc);
  });
});

app.listen(port);
console.log(`Running on port: ${port}`);