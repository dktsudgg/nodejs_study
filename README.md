# nodejs_study

# npm 초기작업
* npm init 수행하면 package.json 생김
* package.json 내부에서 scripts 항목에 "start": "node index.js" 작성하면 npm start 실행 시 index.js 실행.
* package.json 내부에서 scripts 항목에 "test": "node test.js" 작성하면 npm start 실행 시 test.js 실행.

# 모듈 설치 시, 
* npm install ~~~ --save 하면 운영 환경에서도 사용할 라이브러리 설치 방법(dependencies)
* npm install ~~~ --save-dev 하면 개발 환경에서만 사용할 라이브러리 설치 방법(devDependencies)

# TDD
* mocha로 테스트 실행 시, node_modules/.bin/mocha ~~~.spec.js
* 근데 이렇게 길게 스크립트 입력하지 말고 package.json에 작성하여 사용..
* -w 옵션을 주면 코드 수정 시 자동으로 테스트를 다시 실행해준다.
