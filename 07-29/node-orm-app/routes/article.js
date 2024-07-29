var express = require('express');
var router = express.Router();

//DB프로그래밍을 위한 ORM DB 객체 참조하기
var db=require('../models/index.js'); 

//게시글 목록 조회
router.get('/list',async (req,res)=>{
    //전체 게시글 목록 조회
    const articles=await db.Article.findAll();
    res.render('article/list',{articles:articles});
});

//신규 게시글 등록
router.get('/create',async (req,res)=>{
    res.render('article/create');
});

//신규 게시글 입력 정보 등록 처리
router.post('/create',async(req,res,next)=>{

    //Step1: 신규 게시글 등록 폼에서 사용자가 입력,선택한 값을 추출
    const title= req.body.title;
    const contents=req.body.contents;
    const display_code=req.body.display;

    //Step2: article 테이블에 등록할 json데이터 생성하기
    //주의/중요: 반드시 json 데이터 속성명은 article.js모델의 속성명과 일치해야함
    const article={
        board_type_code:1,
        title:title,
        article_type_code:0,
        contents:contents,
        view_count:0,
        ip_address:'123.111.123.111',
        is_display_code:display_code,
        reg_date:Date.now(),
        reg_member_id:1
    };

    //Step3: 신규 데이터 article 테이블에 데이터 등록처리
    //create()메소드는 ORM framework에 의해 INSERT INTO article()value()쿼리로 변환되어
    //DB서버로 전송된 후 실행되어 실제 저정된 단일 게시글 DATA를 DB서버에서 반환
    const registedArticle = await db.Article.create(article);

    //목록페이지로 이동
    res.redirect('/article/list');
});



//기존 단일 게시글 정보 수정
router.post('/modify/:id',async(req,res,next)=>{
    //수정한 데이터 추출
    const article_id=req.body.article.id;//html 히든태그에서 추출
    const title=req.body.title;
    const contents=req.body.contents;
    const display_code=req.body.display;

    //수정할 데이터 json객체로 생성
    //주의/중요: 수정할 컬럼과 값만 지정
    const article={
        title,
        contents,
        is_display_code:display_code,
        ip_address:'111.123.122.111',
        edit_date:Date.now(),
        edit_member_id:1
    };


    //수정된 데이터 건수가 데이터 값으로 전달됨
    const updateCnt= await db.Article.update(article,{where:{article_id:article_id}});

    res.redirect('/article/list');
});

//기존 게시글 삭제처리
router.get('/delete',async(req,res,next)=>{
    //삭제할 게시글 고유번호 추출
    const article_id=req.query.article_id;

    //삭제된 건수가 넘어옴
    const deletedCnt= await db.Article.destroy({where:{article_id:article_id}});

    res.redirect('/article/list');
});


//기존 단일 게시글 정보 조회
router.get('/modify/:id',async(req,res)=>{

    //현재 게시글 고유번호 추출
    const article_id=req.params.id;

    //게시글 고유번호로 단일 게시글 정보 조회
    //SELECT * FROM article WHERE article_id=article_id
    //DB서버로 전송되어 실행되고 그 결과를 벡엔드에서 받음
    const article=await db.Article.findOne({
        where:{article_id:article_id}
    });

    res.render('article/modify',{article:article});
});


module.exports = router;
