//전체 웹사이트의 공통기능에 대한 라우팅 기능 제공

var express = require('express');
var router = express.Router();


//관리자 암호를 단방향암호화(해쉬알고리즘)
var bcrypt = require('bcryptjs');


//ORM DB객체 참조
var db=require('../models/index.js');


//관리자 웹사이트 로그인 요청과 응답처리
// http://localhost:5001/login
router.get('/login', async(req, res, next)=> {

  
  let resultMsg={code:200,msg:""};

  res.render('login.ejs',{layout:false,resultMsg});
});

//관리자가 입력한 아이디/암호를 추출하여 실제 로그인 프로세스를 처리 
// http://localhost:5001/login
router.post('/login', async(req, res, next)=> {
  //Step 1 : 관리자 아이디/암호를 추출
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password;

  //Step 2 : 관리자 아이디/암호를 조회
  const admin = await db.Admin.findOne({where:{admin_id:admin_id}});

  //Step 3 : DB저장 암호와 관리자 입력 암호 체크

  let resultMsg={code:200,msg:""};



  if(admin)
  {

    //db에 저장된 암호와 관리자가 로그인화면에서 입력한 암호가 일치하는지 체크
    if(bcrypt.compare(admin_password,admin.admin_password)){//bcrypt.compare(비교할 암호,해쉬암호화된 암호) => 비교결과 true/false
    
    res.redirect('/main');

    }
    else{//암호가 일치하지 않는 경우
      resultMsg.code=400;
      resultMsg.msg="암호가 일치하지 않습니다.";
      res.render('login.ejs',{layout:false,resultMsg});
    }
  
  }
else
  {//아이디가 존재하지 않는 경우

    resultMsg.code=401;
      resultMsg.msg="아이디가 존재하지 않습니다.";
      res.render('login.ejs',{layout:false,resultMsg});

  }

  //Step 4 : 관리자 아이디/암호가 일치하면 메인 페이지로 이동 , 그렇지 않으면 처리결과 data를 login.ejs로 전달


  
});


//정상적으로 로그인 됐을 시 메인페이지
// http://localhost:5001/login
router.get('/main', async(req, res, next)=> {
  res.render('main');
});


module.exports = router;
