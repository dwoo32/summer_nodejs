var express = require('express');
var router = express.Router();


/* 
- 관리자계정목록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Get
- 응답결과: admin/list.ejs 뷰페이지 반환
*/
router.get('/list', function(req, res, next) {
    res.render('admin/list.ejs');
});

/* 
- 관리자계정 신규등록 웹페이지 
- 요청주소: http://localhost:5001/admin/create
- 요청방식: Get
- 응답결과: admin/create.ejs 뷰페이지 반환
*/
router.get('/create', function(req, res, next) {
    res.render('admin/create.ejs');
});

/* 
- 관리자계정 신규등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: post
- 응답결과: 목록페이지 이동
*/
router.post('/create', function(req, res, next) {
    //기능구현
    res.redirect('/admin/list');
});

/* 
- 관리자계정 수정 웹페이지
- 요청주소: http://localhost:5001/admin/modify
- 요청방식: get
- 응답결과: 수정웹페이지 이동
*/

router.get('/modify', function(req, res) {
    res.render('admin/modify.ejs');
});



/*
-관리자 계정 삭제 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:5001/admin/delete //?id=1
-호출 방식 : get
-응답 결과 : 해당 게시글 삭제 후 게시글 목록 페이지로 이동
*/
router.get('/delete',async(req,res)=>{

    const admin_id=req.query.id;

    //Step 2: 데이터 삭제 처리

    //Step 3 : 게시글 목록 페이지로 이동
    res.redirect('/admin/list');
})

/* 
- 관리자계정 수정 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/modify/1
- 요청방식: post
- 응답결과: 수정 후 목록페이지 이동
*/

router.post('/modify:id', function(req, res){

    
    
    const id=req.body.id;

    //실제 수정할 데이터
    const admin={
        id,
        name,
        modify_date:Date.now()
    }

    //Step 2 : DB게시글 테이블에 특정 게시글 번호를 기준으로 게시글 정보 수정
    //Update article set table='수정할 제목', contents='수정한 내용',display='게시여부값' ..etc where article_id=article_id

    //수정이 완료되면 DB서버에서 수정처리 건수가 반환


    //Step 3 : 게시글 목록 페이지로 이동
    res.redirect('/admin/list');

});







module.exports = router;