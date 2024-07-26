var express = require('express');
var router = express.Router();

//공통 기능 미들웨어 참조하기
const{checkParams,checkQuery}=require('./middleware.js');

//해당 라우터 파일이 호출되면 무조건 실행되는 미들웨어 함수 정의하기
router.use(function(res,req,next){
  console.log("index.js 라우터 파일이 호출되었습니다",Date.now());
  next(); //다음 미들웨어 함수로 제어권을 넘김 //next가 있어야 다음으로 넘어감
});


//특정 주소호출에 대한 미들웨어 기능 추가
//http://localhost:3000/sample
router.use('/sample',function(req,res,next){

  console.log("index.js 라우터 파일2 호출되었습니다",req.originalUrl);//서버에 호출하는 주소
  next();

},function(req,res,next){
  console.log("index.js 라우터 파일3 호출되었습니다2",req.method);//req에는 서버로 들어오는 모든 정보가 들어있음
  res.send(req.method);

});


/* 
-메인 웹페이지 요청과 응답처리 라우팅 메소드 
-호출주소: http://localhost:3000/
-호출방식: GET
-응답결과: views/index.ejs 파일을 렌더링하여 화면에 출력
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//http://localhost:3000/test/100
//checkParams 미들웨어 함수를 요청 이후 응답 전에 먼저 실행하여 특정 로직을 태움
//router.get 메소드 실행=>checkParams 실행=>콜백함수 실행
router.get('/test/:id',checkParams,async(req,res,next)=>{

  res.render('index.ejs',{title:"test"});

});


//http://localhost:3000/product?category=computer&stock=10
router.get('/product',checkQuery,async(req,res,next)=>{
  
  res.render('index.ejs',{title:"test"});
});

module.exports = router;
