// @ts-check

const mongoClient = require('./mongoConnect');

const db = {
  //모든 회원 정보 가져오기
  // getUsers: (cb) => {
  //   connection.query('SELECT * FROM mydb.user', (err, data) => {
  //     if (err) throw err;
  //     cb(data);
  //   });
  // },

  // 중복 유저 체크
  userCheck: async (userId) => {
    const client = await mongoClient.connect();
    const user = client.db('kdt4').collection('user');

    const findUser = await user.findOne({ id: userId });
    if (!findUser) return false;
    return findUser;
  },

  // 회원 가입
  registerUser: async (newUser) => {
    const client = await mongoClient.connect();
    const user = client.db('kdt4').collection('user');

    const registerResult = await user.insertOne({
      id: newUser.id,
      password: newUser.password,
    });

    if (!registerResult.acknowledged) throw new Error('회원등록 실패');

    return true;
  },
};

module.exports = db;
