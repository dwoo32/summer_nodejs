var express = require('express');
var router = express.Router();

/* 임시 메인 페이지 요청과 응답처리 라우팅 메소드 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//관리자 로그인 페이지 요청과 응답처리 라우팅 메소드
router.get('/login', function(req, res, next) {
  res.render('login.ejs',{resultMsg:''});
});

//관리자 로그인 정보 처리 라우팅 메소드
router.post('/login', function(req, res, next) {
  const id = req.body.userid;
  const pw = req.body.password;
  const result = false;
  if(!result){
    res.render('login.ejs',{resultMsg:'로그인 실패'});
  }
  else{
    res.redirect('/main');
  }
  
});

//관리자 메인 페이지 요청과 응답처리 라우팅 메소드
router.get('/main', function(req, res){
  res.render('main.ejs');
});


module.exports = router;
