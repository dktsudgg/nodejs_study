// 로그찍어주는 미들웨어 먄들어보는 예제

// express 설치하기.. 이거 사용 이유는 webserver_example.js에 썼음.
// npm install express
const express = require('express');
const morgan = require('morgan');// 얘는 로그찍어주는 서드파티 모듈임.
const app = express();

// 서버에 필요한 기능인 미들웨어(함수)를 어플리케이션에 추가한다
function logger(req, res, next){
    console.log('I am logger');
    // 자신이 할 일을 다한다음에 next함수를 호출해준다..
    // 이거 주석처리하면 logger2가 동작을 안한다. 주의할 것!!!!!
    next();
}
function logger2(req, res, next){
    console.log('I am logger2');
    // 자신이 할 일을 다한다음에 next함수를 호출해준다..
    next();
}

// 클라이언트 요청이 들어오면 logger가 먼저 호출되고,
// logger의 next함수가 호출되면 logger2가 호출된다
app.use(logger);
app.use(logger2);
app.use(morgan('dev')); // 얘는 로그찍어주는 서드파티 모듈..

app.listen(3000, function(){
    console.log('Server is Running');
})