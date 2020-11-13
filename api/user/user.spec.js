// 테스트코드가 들어가는 파일


const app = require('../../');
// supertest 사용..
// npm install supertest --save-dev
const request = require('supertest');
const should = require('should');

const models = require('../../models');

/**
 * 특정 it() 함수만 동작시켜보기 위해서는 it.only()를 사용하면 된다.
 * describe()에도 describe.only()를 걸면 해당 describe만 동작시켜볼 수 있다.
 */
describe('GET /users는', () => {
    const users = [{name:'alice'}, {name:'bek'}, {name:'chris'}];

    /**
     * 여기 before들은 it들이 실행되기 전에 최초 한번 실행된다..
     */
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));

    describe('성공시', () => {
        it('유저 객체를 담은 배열로 응답한다', (done)=>{
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 limit갯수만큼 응답한다', (done)=>{
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.be.lengthOf(2);
                    done();
                });
        });
    });

    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다', (done)=>{
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});

describe('GET /users/:id는', () => {
    const users = [{name:'alice'}, {name:'bek'}, {name:'chris'}];

    /**
     * 여기 before들은 it들이 실행되기 전에 최초 한번 실행된다..
     */
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));

    describe('성공 시,', () => {
        it('id가 1인 유저 객체를 반환한다.', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });
    describe('실패 시,', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404으로 응답한다.', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    })
});

describe('DELETE /users/1는', () => {
    const users = [{name:'alice'}, {name:'bek'}, {name:'chris'}];

    /**
     * 여기 before들은 it들이 실행되기 전에 최초 한번 실행된다..
     */
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));

    describe('성공 시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    });
    describe('실패 시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
    });
})

describe('POST /users는', () => {
    const users = [{name:'alice'}, {name:'bek'}, {name:'chris'}];

    /**
     * 여기 before들은 it들이 실행되기 전에 최초 한번 실행된다..
     */
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));

    describe('성공 시', ()=>{
        let body;
        let name = 'daniel';
        before(done=>{
            request(app)
                .post('/users')
                .send({name}) //{name: name} 이랑 같다
                .expect(201)
                .end((err, res)=>{
                    body = res.body;
                    done();
                })
        });

        it('생성된 유저 객체를 반환한다', ()=>{
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다.', ()=>{
            body.should.have.property('name', name);
        })
    })
    describe('실패 시', ()=>{

        it('name 파라미터 누락 시 400을 반환한다', (done)=>{
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('name이 중복일 경우 409를 반환한다', (done)=>{
            request(app)
                .post('/users')
                .send({name: 'daniel'}) // 이미 있는 데이터를 사용하여 테스트
                .expect(409)
                .end(done)
        })
    })
    
});

describe('PUT /users/:id', () => {
    const users = [{name:'alice'}, {name:'bek'}, {name:'chris'}];

    /**
     * 여기 before들은 it들이 실행되기 전에 최초 한번 실행된다..
     */
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));
    
    describe('성공시', () => {
        it('변경된 name으로 응답한다.', (done) => {
            const name= 'chally'
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) =>{
                    res.body.should.have.property('name', name);
                    done();
                })
        })
    })

    describe('실패시', ()=>{
        it('정수가 아닌 id에서 400응답한다', done =>{
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        });

        it('name이 없을 경우 400응답한다', done =>{
            request(app)
                .put('/users/1')
                .expect(400)
                .end(done);
        });

        it('없는 유저일 경우 404응답한다', done =>{
            request(app)
                .put('/users/999')
                .send({name: 'foo'})
                .expect(404)
                .end(done);
        });

        it('이름이 중복일 경우 409응답한다', done =>{
            request(app)
                .put('/users/3')
                .send({name: 'bek'})
                .expect(409)
                .end(done);
        });
    });
})