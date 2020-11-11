const { isMainThread } = require("worker_threads");

/**
 * nodejs에서는 TDD를 위해 세가지 라이브러리를 사용한다.
 * mocha, should, superTest
 * 
 * 1. mocha : 테스트코드 실행 역할.. 테스트러너 라고 얘기함.
 *  테스트 수트 - describe라는 함수를 사용해서 테스트 환경을 구현한다.
 *  테스트 케이스 - it이라는 함수를 사용해서 구현한다.
 * 
 * 테스트코드는 ~~.spec.js형태의 파일에 작성해놓음.
 * 기능 구현은 ~~.js
 * 
 * mocha로 테스트 실행 시, node_modules/.bin/mocha ~~~.spec.js
 * 
 * 2. 근데 테스트 코드를 작성할 때, assert를 사용하지 말고 should같은 라이브러리를 쓰리고 함.
 * 이유는.. 가독성이 나빠서라고 함.
 * 설치해야함.. npm install should --save-dev
 * 
 * 지금까지는 단위 테스트..(함수 하나 테스트)
 * 
 * 2. superTest : 통합테스트를 작성할 때 사용. (api의 기능 테스트 작성)
 * express용 통합 테스트 라이브러리.
 * 
 */

// const assert = require('assert');    // assert 사용은 지양하자
const should = require('should');       // assert 대신 이거 쓰자.
const utils = require('./utils.js');

describe('utils.js모듈의 capitalize 함수는', () => {
    it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
        const result = utils.capitalize('hello');
        // assert.equal(result, 'Hello');
        result.should.be.equal('Hello');
    })
});