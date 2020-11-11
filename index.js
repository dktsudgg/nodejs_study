// 첫번째 api 만들어보기..

const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

var users = [
  { id: 1, name: 'limkyoujin1' },
  { id: 2, name: 'limkyoujin2' },
  { id: 3, name: 'limkyoujin3' }
];

app.use(morgan('dev'));

// 파라메타로 받은 이 두 객체는 express가 http모듈의 req, res를 래핑한 객체임.
app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;      // 바로 밑에서 limit값 숫자로 파싱 실패 시 기본값 10으로 설정하기 위함..
  const limit = parseInt(req.query.limit, 10);  // 두번째 파라미터는 진수
  if(Number.isNaN(limit)){
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));  // json형태로 응답
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// index.spec.js에서 불러와서 테스트하기 위해 모듈로 마듦
module.exports = app;