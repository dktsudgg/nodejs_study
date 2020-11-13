// api로직이 들어가는 파일

// 지금까지는 데이터를 유저 객체를 선언해서 작업했음. db사용하자 orm도 사용.. 노드js에서 sql orm은 시퀄라이져(SequelizeJS)가 있다. 많이씀. 테이블을 orm으로 추상화한 것을 모델이라고 한다.
// SequelizeJS 공식문서에서 공부하자..
// 유저 모델을 만든 다음에 유저 모델에서 제공되는 메소드를 사용해서 쿼리 수행..
// models.js파일에 명세함..
// var users = [
//     { id: 1, name: 'alice' },
//     { id: 2, name: 'bek' },
//     { id: 3, name: 'chris' }
// ];
const { User } = require('../../models');
const models = require('../../models');


const index = function(req, res) {
    req.query.limit = req.query.limit || 10;      // 바로 밑에서 limit값 숫자로 파싱 실패 시 기본값 10으로 설정하기 위함..
    const limit = parseInt(req.query.limit, 10);  // 두번째 파라미터는 진수
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }

    models.User
        .findAll({
            limit: limit
        })
        .then(users => {
            res.json(users);
        });

    // res.json(users.slice(0, limit));  // json형태로 응답
};

const show = function(req, res){
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id))  return res.status(400).end();

    //const user = users.filter((user) => user.id === id)[0];
    // if(!user) return res.status(404).end();
    // res.json(user);
    models.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if(!user) return res.status(404).end();
        res.json(user);
    })

};

const destroy = function(req, res){
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id))  return res.status(400).end();

    // users = users.filter((user) => user.id !== id);
    // res.status(204).end();
    models.User.destroy({
        where: {id}
    }).then(()=>{
        res.status(204).end();
    })
}

const create = (req, res)=>{
    /**
     * express는 body를 지원하지 않기 때문에 추가적인 모듈을 설치해야 한다. body-parser와 multer... multer는 이미지같은 큰 데이터를 사용할 때 사용..
     * npm i body-parser --save
     * 윗부분에 app.use~~ 하는 코드 추가.. http://expressjs.com/en/resources/middleware/body-parser.html
     */
    const name = req.body.name;
    if(!name) return res.status(400).end();

    // name 중복 체크
    // const isConflic = users.filter((user)=> user.name === name).length;
    // if(isConflic) return res.status(409).end();

    // const id = Date.now();
    // const user = {id, name};
    // users.push(user);
    // res.status(201).json(user);

    models.User.create({name})
        .then(user=>{
            res.status(201).json(user);
        })
        .catch((err)=>{
            // console.log(err); 이거 로그찍으면 에러메세지 나온다..
            if(err.name === 'SequelizeUniqueConstraintError'){
                return res.status(409).end();
            }
            res.status(500).end();
        });

}

const update = (req, res) =>{
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id))  return res.status(400).end();

    const name = req.body.name;
    if(!name) return res.status(400).end();

    // const isConflic = users.filter(user => user.name === name).length;
    // if(isConflic) return res.status(409).end();

    // const user = users.filter(user => user.id === id)[0];
    // if(!user) return res.status(404).end();

    // user.name = name;
    // res.json(user);

    models.User.findOne({
        where: {id}
    })
    .then(user => {
        if(!user) return res.status(404).end();

        user.name = name;
        user.save()
            .then(()=>{
                res.json(user);
            })
            .catch(err=>{
                // console.log(err); 이거 로그찍으면 에러메세지 나온다..
            if(err.name === 'SequelizeUniqueConstraintError'){
                return res.status(409).end();
            }
            res.status(500).end();
            });
    })


}

// 이렇게 써도 되지만 ES6문법에서는 다음 코드와 같이 써도 된다.
// module.exports = {
//     index: index,
//     show: show,
//     destroy: destroy,
//     create: create,
//     update: update
// }
module.exports = {
    index, show, destroy, create, update
}