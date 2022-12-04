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

client.connect((err) => {
  const user = client.db('kdt4').collection('user');

  user.deleteMany({}, (err, deleteResult) => {
    if (deleteResult?.acknowledged) {
      user.insertMany(
        [
          {
            name: 'ppororo',
            age: 5,
          },
          {
            name: 'loopy',
            age: 6,
          },
          {
            name: 'crong',
            age: 4,
          },
        ],
        (err, insertResult) => {
          if (insertResult?.acknowledged) {
            const findCursor = user.find({});
            findCursor.toArray((err, data) => {
              console.log(data);
              client.close();
            });
          }
        }
      );
    }
  });
});
