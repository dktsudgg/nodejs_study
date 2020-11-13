// 여기에 모델을 정의.. user.ctrl.js 주석 참고..

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false  // console.log* 를 안찍는다..
});

// 모델 정의
const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,    // varchar 255 임
        unique: true                // 유니크하도록..
    }
});

module.exports = {  Sequelize, sequelize, User  };

// bin/sync-db.js 에서 생성 작업 수행.