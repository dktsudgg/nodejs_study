// 첫번째 api 만들어보기..

// 이 파일은 express 설정 및 구동을 담당

const express = require('express');
const app = express();
const morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./api/user');  // /api/user/index.js를 참조함

// 테스트 환경에서는 로그찍는 미들웨어 사용 안하도록..
if(process.env.NODE_ENV !== 'test'){
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// express의 전용 라우터클래스를 사용한다.
app.use('/users', user);

// app.listen 하는 코드는 bin/www.js로 옮겨놨음. package.json에 start 스크립트에도 명세함..


// index.spec.js에서 불러와서 테스트하기 위해 모듈로 마듦
module.exports = app;