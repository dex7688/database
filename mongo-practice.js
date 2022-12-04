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
  const member = client.db('kdt4기').collection('member');

  const deleteManyResult = await member.deleteMany({});
  if (!deleteManyResult.acknowledged) throw new Error('삭제 실패');

  const insertResult = await member.insertMany([
    {
      id: 'tetz',
      name: '이효석',
      isMarried: false,
      age: 38,
    },
    {
      id: 'eric',
      name: '김성재',
      isMarried: true,
      age: 38,
    },
    {
      id: 'ailee',
      name: '이재연',
      isMarried: false,
      age: 35,
    },
    {
      id: 'alex',
      name: '하승호',
      isMarried: false,
      age: 34,
    },
    {
      id: 'uncle',
      name: '박동희',
      isMarried: true,
      age: 38,
    },
  ]);
  if (!insertResult.acknowledged) throw new Error('삽입 오류');

  const insertMemberResult = await member.insertOne({
    id: 'ted',
    name: '방성민',
    isMarried: false,
    age: 37,
  });
  if (!insertMemberResult.acknowledged) throw new Error('삽입 오류');

  const updateOneResult = await member.updateOne(
    { id: 'ted' },
    { $set: { isMarried: true } }
  );
  if (!updateOneResult.acknowledged) throw new Error('업데이트 오류');

  // 1
  // const findCursor = member.find({});
  // const data = await findCursor.toArray();
  // console.log(data);

  // 2
  // const data = await member.findOne({ id: 'ted' });
  // console.log(data);

  // 3
  // const findOldMember = member.find({
  //   $and: [{ age: { $gte: 38 } }, { isMarried: true }],
  // });
  // const data = await findOldMember.toArray();
  // console.log(data);

  // 4
  // const findYoungMember = member.find({
  //   $or: [{ age: { $lte: 36 } }, { isMarried: true }],
  // });
  // const data = await findYoungMember.toArray();
  // console.log(data);

  // 5
  const updateTime = await member.updateMany(
    {},
    { $set: { updateTime: new Date(Date.now()) } }
  );
  if (!updateTime.acknowledged) throw new Error('시간 업데이트 오류');

  const cursor = member.find({});
  const data = await cursor.toArray();
  console.log(data);
  client.close();
}

main();
