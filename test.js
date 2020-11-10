
/**
 * 1. nodejs에 내장된 기본 모듈 사용..
 */
// const http = require('http');
// http.createServer();

/**
 * 2. 내가 만든 커스텀 모듈 사용 방법(math.js파일 만듦)
 * 실행은 node index.js
 */
const math = require('./math.js');
const result = math.sum(1, 2);
console.log(result);

/**
 * nodejs는 비동기와 동기(Sync) 함수가 있다. 비동기 코드를 많이 쓴다.
 */
const fs = require('fs');
// 동기
const data = fs.readFileSync('./data.txt', 'utf8');
console.log(data);
// 비동기
const data = fs.readFile('./data.txt', 'utf8', function(err, data){
    console.log(data);
});

