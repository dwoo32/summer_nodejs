var express = require('express');
var router = express.Router();

//관리자 목록 페이지 요청과 응답처리 라우팅 메소드
router.get('/list', function(req, res) {
    res.render('admin/list')
});

//관리자 생성 페이지 요청과 응답처리 라우팅 메소드
router.get('/create', function(req, res) {
    res.render('admin/create')
});

//관리자 생성 정보 처리 라우팅 메소드
router.post('/create', function(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const password = req.body.password;
    res.redirect('/admin/list');
});

module.exports = router;