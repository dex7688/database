// @ts-check

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.cookies.popup);
  res.render('index', { cookie: req.cookies.popup });
});

router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send('쿠키 굽기 성공');
});

module.exports = router;
