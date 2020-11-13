// 라우팅 설정 로직이 들어가는 파일
const express = require('express');
const router = express.Router();

const ctrl = require('./user.ctrl');

// 파라메타로 받은 이 두 객체는 express가 http모듈의 req, res를 래핑한 객체임.
router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;