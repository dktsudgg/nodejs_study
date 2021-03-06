// http://expressjs.com/ko/starter/hello-world.html

const express = require('express');
const app = express();
const port = 3000;

// 파라메타로 받은 이 두 객체는 express가 http모듈의 req, res를 래핑한 객체임.
app.get('/users', (req, res) => {
  res.send('User list get');
});
app.post('/users', (req, res) => {
  res.send('User list post');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});