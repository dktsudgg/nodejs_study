// 첫번째 api 만들어보기..

const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

var users = [
  { id: 1, name: 'limkyoujin1' },
  { id: 2, name: 'limkyoujin2' },
  { id: 3, name: 'limkyoujin3' }
];

app.use(morgan('dev'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 파라메타로 받은 이 두 객체는 express가 http모듈의 req, res를 래핑한 객체임.
app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;      // 바로 밑에서 limit값 숫자로 파싱 실패 시 기본값 10으로 설정하기 위함..
  const limit = parseInt(req.query.limit, 10);  // 두번째 파라미터는 진수
  if(Number.isNaN(limit)){
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));  // json형태로 응답
});

app.get('/users/:id', function(req, res){
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id))  return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  if(!user) return res.status(404).end();

  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id))  return res.status(400).end();

  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});

app.post('/users', (req, res)=>{
  /**
   * express는 body를 지원하지 않기 때문에 추가적인 모듈을 설치해야 한다. body-parser와 multer... multer는 이미지같은 큰 데이터를 사용할 때 사용..
   * npm i body-parser --save
   * 윗부분에 app.use~~ 하는 코드 추가.. http://expressjs.com/en/resources/middleware/body-parser.html
   */
  const name = req.body.name;
  if(!name) return res.status(400).end();

  // name 중복 체크
  const isConflic = users.filter((user)=> user.name === name).length;
  if(isConflic) return res.status(409).end();

  const id = Date.now();
  const user = {id, name};
  users.push(user);
  res.status(201).json(user);

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// index.spec.js에서 불러와서 테스트하기 위해 모듈로 마듦
module.exports = app;