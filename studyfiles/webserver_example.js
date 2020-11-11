// 노드의 기본 모듈 중에 http모듈 불러옴
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// 서버를 생성하고
const server = http.createServer((req, res) => {
    /**
     * 이렇게 각 요청에 대한 분기를 if else 형태로 작성하는건 너무 원시적이다..
     * ==> 그래서 ExpressJS라는 웹 애플리케이션 프레임워크를 사용한다.
     * 다섯가지 기능이 있다. 어플리케이션, 미들웨어(함수), 라우팅, 요청객체, 응답객체
     */
    if(req.url == '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    }
    else if(req.url == '/users'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('User list');
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
    
});

// 요청 대기 상태로 만듦
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});