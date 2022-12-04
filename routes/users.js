// @ts-check

const express = require('express');

const router = express.Router();

const USER = [
  { id: 'dldntjr2619', name: '이우석', email: 'dldntjr2710@gmail.com' },
  { id: 'sonny', name: '손흥민', email: 'sonny@email.com' },
];

// 유저 라우터, 전체 회원 목록 조회
router.get('/list', (req, res) => {
  res.send(USER);
});

// 유저 라우터, 특정 회원 조회
router.get('/id/:id', (req, res) => {
  const findUser = USER.find((user) => user.id === req.params.id);
  if (findUser) {
    res.send(findUser);
  } else {
    const err = new Error('ID를 찾을 수 없습니다!');
    err.statusCode = 404;
    throw err;
  }
});

// 새로운 회원 등록
router.post('/', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send(USER);
    } else {
      const err = new Error('Unexpected Query!');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('Unexpected Query!');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 정보 수정
router.put('/id/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const findUserIndex = USER.findIndex((user) => user.id === req.params.id);

    if (findUserIndex !== -1) {
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[findUserIndex] = modifyUser;
      res.send('회원 정보 수정 완료');
    } else {
      const err = new Error('ID를 찾을 수 없습니다!');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('Unexpected Query');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 삭제 API
router.delete('/:id', (req, res) => {
  const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
  if (findUserIndex !== -1) {
    USER.splice(findUserIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    const err = new Error('ID를 찾을 수 없습니다!');
    err.statusCode = 404;
    throw err;
  }
});

// ejs 라우팅
// app.set에서 ejs 셋팅을 했기 때문에 render는 view 폴더 내에서 파일을 찾도록 되어있음
router.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('users', { USER, userCounts: userLen });
});

module.exports = router;
