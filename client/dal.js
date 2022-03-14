const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';
let db = null;

MongoClient.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  console.log('Successfully connected to db server');
  db = client.db('badbankdb');
});

//create user account
function create(name, email, password, type) {
  return new Promise((resolve, reject) => {
    const doc = {name, email, password, checking: 50, savings: 50, type};
    const collection = db
      .collection('users')
      .insertOne(doc, {w:1}, function(err, result) {
        err ? reject(err) : resolve(doc);
    });
  });
};

// find user accounts
function find(email) {
  return new Promise((resolve, reject) => {
      const customers = db
          .collection('users')
          .find({ email: email })
          .toArray(function (err, docs) {
              err ? reject(err) : resolve(docs);
      });
  })
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
      const customers = db
          .collection('users')
          .findOne({ email: email })
          .then((doc) => resolve(doc))
          .catch((err) => reject(err));
  })
}

// update - deposit/withdraw amount
function updateSavings(email, amount) {
  amount = parseInt(amount);
  return new Promise((resolve, reject) => {
      const customers = db
          .collection('users')
          .findOneAndUpdate(
              { email: email },
              { $set: { savings: amount } },
              { returnOriginal: false },
              function (err, documents) {
                  err ? reject(err) : resolve(documents);
              }
      );
  });
}

function updateChecking(email, amount) {
  amount = parseInt(amount);
  return new Promise((resolve, reject) => {
      const customers = db
          .collection('users')
          .findOneAndUpdate(
              { email: email },
              { $set: { checking: amount } },
              { returnOriginal: false },
              function (err, documents) {
                  err ? reject(err) : resolve(documents);
              }
      );
  });
}

//all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
    });
  });
}

module.exports = {create, find, findOne, updateChecking, updateSavings, all};