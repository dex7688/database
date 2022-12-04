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

async function main() {
  await client.connect();
  const user = client.db('kdt4').collection('user');
  const deleteResult = await user.deleteMany({});
  if (!deleteResult.acknowledged) throw new Error('삭제 이상');

  // insertOne
  // const inserResult = await user.insertOne({ name: 'ppororo', age: 5 });
  // if (!inserResult.acknowledged) throw new Error('삽입 오류');
  // const findCursor = user.find({});
  // const data = await findCursor.toArray();
  // console.log(data);
  // client.close();

  // insertMany;
  const insertResult = await user.insertMany([
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
  ]);

  if (!insertResult.acknowledged) throw new Error('삽입 에러');

  // deleteone
  // const deleteOneResult = await user.deleteOne({ name: 'croong' });
  // if (!deleteOneResult.acknowledged) throw new Error('삭제오류');

  // deleteMany
  // const deleteManyResult = await user.deleteMany({ age: { $gte: 5 } });
  // if (!deleteManyResult.acknowledged) throw new Error('삭제오류');

  // updateone
  // const updateOneResult = await user.updateOne(
  //   { name: 'loopy' },
  //   { $set: { name: '루피' } }
  // );
  // if (!updateOneResult.acknowledged) throw new Error('업데이트 오류');

  // updateMany
  // const updateManyResult = await user.updateMany(
  //   { age: { $gte: 5 } },
  //   { $set: { name: '5살 이상입니다.' } }
  // );
  // if (!updateManyResult.acknowledged) throw new Error('업데이트 오류');

  // findOne
  // const data = await user.findOne({ name: 'loopy' });

  // find
  const findCursor = user.find({});
  const data = await findCursor.toArray();
  console.log(data);
  client.close();
}

main();
