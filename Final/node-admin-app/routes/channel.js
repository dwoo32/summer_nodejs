var express = require('express');
var router = express.Router();


/* 
- 채팅 목록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/channel/list
- 요청방식: Get
- 응답결과: channel/list.ejs 뷰페이지 반환
*/
router.get('/list', function(req, res) {
    res.render('channel/list.ejs');
});


/* 
- 채팅 신규 등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/channel/create
- 요청방식: Get
- 응답결과: channel/create.ejs 뷰페이지 반환
*/
router.get('/create', function(req, res) {
    res.render('channel/create.ejs');
});

/* 
- 채팅 신규등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/channel/create
- 요청방식: post
- 응답결과: 목록페이지 이동
*/
router.post('/create', function(req, res) {
    

    res.redirect('/channel/list');

    
});



/*
-채팅 데이터 삭제 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:5001/channel/delete?chat_id=1
-호출 방식 : get
-응답 결과 : 해당 게시글 삭제 후 게시글 목록 페이지로 이동
*/
router.get('/delete',async(req,res)=>{

    const chat_id_id=req.query.chat_id;

    //Step 2: 데이터 삭제 처리

    //Step 3 : 게시글 목록 페이지로 이동
    res.redirect('/channel/list');
})

/*
-사용자 계정 수정 웹페이지
-호출 주소 : localhost:5001/channel/modify
-호출 방식 : get
-응답 결과 : 기존 게시글 수정페이지로 이동 
*/

router.post('/modify',async(req,res)=>{

    res.render('channel/modify.ejs');
});



/*
-사용자 계정 수정 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:5001/channel/modify/1
-호출 방식 : post
-응답 결과 : 기존 게시글 수정 후 목록페이지로 이동 
*/

router.post('/modify:channel_id',async(req,res)=>{

    //Step 1 : 사용자 수정 데이터를 추출하고 수정할 데이터 소스 생성
    //수정 게시글  id 값 추출
    const channel_id=req.body.id;

    //실제 수정할 데이터
    const channel={
        id,
        name,
        modify_date:Date.now()
    }

    //Step 2 : DB게시글 테이블에 특정 게시글 번호를 기준으로 게시글 정보 수정
    //Update article set table='수정할 제목', contents='수정한 내용',display='게시여부값' ..etc where article_id=article_id

    //수정이 완료되면 DB서버에서 수정처리 건수가 반환


    //Step 3 : 게시글 목록 페이지로 이동
    res.redirect('/channel/list');
});







module.exports = router;