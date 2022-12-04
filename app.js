// @ts-check
const express = require('express');

// cookie-parser
const cookieParser = require('cookie-parser');

// express-session
const session = require('express-session');

// dotenv 호출 --> 보안관련
require('dotenv').config();

// 외부에서 router 가져오기
const indexRouter = require('./routes');
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const dataRouter = require('./routes/data');
const dbBoardRouter = require('./routes/dbBoard');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// app(server), PORT 설정
const app = express(); // express 사용!

const { PORT } = process.env;

// ejs setting
app.set('view engine', 'ejs');

// ejs에서 기본 폴더 설정 ('/' = localhost:4000/public)
app.use(express.static('public'));
// body parser 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie parser 사용
app.use(cookieParser('dexx'));
// session 사용
app.use(
  session({
    secret: 'dexx',
    resave: false,
    saveUninitialized: true,
  })
);

// router 설정
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/board', boardRouter);
app.use('/data', dataRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// err는 가장 밑에!
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버 실행`);
});
