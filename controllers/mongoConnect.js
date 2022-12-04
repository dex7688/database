// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');
const { userInfo } = require('os');
const uri =
  'mongodb+srv://wooseok:2619@cluster0.equfazo.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// wifi version
// let MongoClient = require('mongodb').MongoClient;
// let uri = "mongodb://wooseok:<password>@ac-alpkans-shard-00-00.equfazo.mongodb.net:27017,ac-alpkans-shard-00-01.equfazo.mongodb.net:27017,ac-alpkans-shard-00-02.equfazo.mongodb.net:27017/?ssl=true&replicaSet=atlas-d0s294-shard-0&authSource=admin&retryWrites=true&w=majority";
// const client = MongoClient.connect(uri);

module.exports = client;
