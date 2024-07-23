//user.js 라우터 팔일의 기본 호출주소 체계는 /users 이다.(app.js에서 설정한 주소)

var express = require('express');
var router = express.Router();

/* GET users listing. */
//localhost:3000/users/로 접속하면 'respond with a resource'라는 문자열을 응답한다.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//localhost:3000/users/testing로 접속하면 'respond with a resource'라는 문자열을 응답한다.
router.get('/testing', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
