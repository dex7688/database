// @ts-check
const { ObjectId } = require('mongodb');

const mongoClient = require('./mongoConnect');

const db = {
  // 모든 글 가져오기
  getAllArticles: async () => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const allArticlesCursor = board.find({});
    const allArticles = await allArticlesCursor.toArray();

    return allArticles;
  },

  // 새로운 글 작성하기
  writeArticle: async (newArticle) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const writeResult = await board.insertOne(newArticle);

    if (!writeResult.acknowledged) throw new Error('글쓰기 실패');
    return true;
  },

  // 특정 ID를 가지는 게시글 찾기
  getArticles: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const findArticle = await board.findOne({ _id: new ObjectId(id) });
    if (!findArticle) return false;
    return findArticle;
  },

  // 특정 ID를 가지는 게시글 수정하기
  modifyArticle: async (id, modifyArticle) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const updateResult = await board.updateOne(
      { _id: new ObjectId(id) },
      { $set: { TITLE: modifyArticle.title, CONTENT: modifyArticle.content } }
    );

    if (!updateResult.acknowledged) throw new Error('업에이트 오류');
    return true;
  },

  // 특정 ID를 가지는 게시글 삭제하기
  deleteArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const deleteResult = await board.deleteOne({ _id: new ObjectId(id) });

    if (!deleteResult.acknowledged) throw new Error('게시글 삭제 실패');

    return {
      status: 200,
      result: true,
      msg: '게시글 삭제 성공',
    };
  },
};

module.exports = db;
