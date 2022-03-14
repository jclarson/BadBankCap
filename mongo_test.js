const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';
const url = "mongodb+srv://jclarson:6BwLPDVC@cluster0.rjv6e.mongodb.net/badbankdb?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("badbankdb").collection("users");
  // perform actions on the collection object
  collection
    .find()
    .toArray(function(err, docs) {
      console.log('Collection:', docs);
    client.close();
  })
});
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//   console.log('Connected!');

//   //database Name
//   const dbName = 'myproject';
//   const db = client.db(dbName);

//   //new user
//   var name = `user${Math.floor(Math.random()*10000)}`;
//   var email = `${name}@mit.edu`;

//   //insert into customer table
//   var collection = db.collection('customers');
//   var doc = {name, email};
//   collection.insertOne(doc, {w:1}, function(err, result) {
//     console.log('Document insert');
//   });

//   var customers = db
//     .collection('customers')
//     .find()
//     .toArray(function(err, docs) {
//       console.log('Collection:', docs);

//       //clean up
//       client.close();
//     });
// });