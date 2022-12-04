// @ts-check

const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium dicta magni! Repudiandae, incidunt. Sequi quam ea laborum aliquam molestiae facilis eius eveniet aperiam voluptates dolorum ipsam, nam iure dolores!',
  },
  {
    title: 'title02',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium dicta magni! Repudiandae, incidunt. Sequi quam ea laborum aliquam molestiae facilis eius eveniet aperiam voluptates dolorum ipsam, nam iure dolores!',
  },
];

router.get('/', (req, res) => {
  // 글 전체 목록 보여주기
  const articleLen = ARTICLE.length;
  res.render('board', { ARTICLE, articleCounts: articleLen });
});

router.get('/write', (req, res) => {
  // 글 쓰기 모드로 이동
  res.render('board_write');
});

router.post('/write', (req, res) => {
  // 글 추가 기능 수행
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/board');
  } else {
    const err = new Error('Unexpected Query!');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/modify/:title', (req, res) => {
  // 글 수정 모드로 이동
  const arrayIndex = ARTICLE.findIndex(
    (_article) => _article.title === req.params.title
  );
  const selectedArticle = ARTICLE[arrayIndex];
  res.render('board_modify', { selectedArticle });
});

router.post('/modify/:title', (req, res) => {
  // 글 수정
  if (req.body.title && req.body.content) {
    const arrayIndex = ARTICLE.findIndex(
      (_article) => _article.title === req.params.title
    );

    const editedArticle = {
      title: req.body.title,
      content: req.body.content,
    };

    ARTICLE[arrayIndex] = editedArticle;

    res.redirect('/board');
  } else {
    const err = new Error('요청 데이터 이상');
    err.statusCode = 400;
    throw err;
  }
});

router.delete('/delete/:title', (req, res) => {
  // 글 삭제
  const arrayIndex = ARTICLE.findIndex(
    (_article) => _article.title === req.params.title
  );

  if (arrayIndex !== -1) {
    ARTICLE.splice(arrayIndex, 1);
    res.send('삭제완료');
    // res.redirect('/board');
  } else {
    const err = new Error('해당 제목이 없다');
    err.statusCode = 404;
    throw err;
  }
});
module.exports = router;
