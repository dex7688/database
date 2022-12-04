// @ts-check

const connection = require('./dbConnect');

const db = {
  // 모든 글 가져오기
  getAllArticles: (cb) => {
    connection.query('select * from mydb.board;', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },

  // 새로운 글 작성하기
  writeArticle: (newArticle, cb) => {
    connection.query(
      `insert into mydb.board (USERID,title, content) values ('${newArticle.id}','${newArticle.title}', '${newArticle.content}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
        // eslint-disable-next-line comma-dangle
      }
    );
  },

  // 특정 ID를 가지는 게시글 찾기
  getArticles: (id, cb) => {
    connection.query(
      `select * from mydb.board where ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
        // eslint-disable-next-line comma-dangle
      }
    );
  },

  // 특정 ID를 가지는 게시글 수정하기
  modifyArticle: (id, modifyArticle, cb) => {
    connection.query(
      `update mydb.board set title = '${modifyArticle.title}', content = '${modifyArticle.content}' where ID_PK = ${id}`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      }
    );
  },

  // 특정 ID를 가지는 게시글 삭제하기
  deleteArticle: (id, cb) => {
    connection.query(
      `delete from mydb.board where ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      }
    );
  },
};

module.exports = db;
