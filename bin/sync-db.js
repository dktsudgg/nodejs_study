
// 데이터베이스를 싱크하는 역할. 여기에서 모델을 싱크시킴.. 싱크 시점은 www.js가 서버를 돌리는 곳이므로 거기에서 하자.
const models = require('../models');

module.exports = () => {
    const options = {
        force: process.env.NODE_ENV === 'test' ? true : false   // true이면 기존에 디비가 이미 있더라도 날려버리고 다시 만듦. false면 기존값 날리지 않고 유지한다. 테스트모드일때는 true, 아닐때는 false
    };
    
    return models.sequelize.sync(options);
}