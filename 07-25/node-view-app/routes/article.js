//article.js 라우터 파일은 게시글 관련 각종 웹페이지들에 대한 각종 요청과 응답을 처리
//http://localhost:3000/article 로 시작하게 app.js에서 라우터 파일 참조시 기본 주소 설정해줌


var express=require('express');
var router=express.Router();

/*
-게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:3000/article/list
-호출 방식 : GET
-응답 결과 : 게시글 목록 데이터를 기반으로 게시글 목록 웹페이지 전달
*/
router.get('/list',async(req,res)=>{


    //게시글 데이터 생성 추후에 DB연결 설정
    const articles = [
        {
            article_id:1,
            title:"게시글 제목1입니다.",
            contents:"게시글1 내용입니다.",
            display:1,
            view_cnt:10,
            ip_address:"111.111.111.111",
            regist_id:1,
            regist_date:Date.now()
        },
        {
            article_id:2,
            title:"게시글 제목2입니다.",
            contents:"게시글2 내용입니다.",
            display:0,
            view_cnt:11,
            ip_address:"222.111.111.111",
            regist_id:2,
            regist_date:Date.now()
        },
        {
            article_id:3,
            title:"게시글 제목3입니다.",
            contents:"게시글3 내용입니다.",
            display:1,
            view_cnt:30,
            ip_address:"211.111.111.111",
            regist_id:3,
            regist_date:Date.now()
        }
    ];

    //views/article/list.ejs 뷰 파일을 렌더링하여 응답
    res.render('article/list.ejs',{articles});
});

/*
-신규 게시글 등록 웹페이지 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:3000/article/create
-호출 방식 : GET
-응답 결과 : 게시글 등록 웹 페이지 뷰파일 전달
*/
router.get('/create',async(req,res)=>{
    res.render('article/create.ejs');
});

/*
-신규 게시글 등록 웹페이지에서 보내는 신규 게시글 등록 처리 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:3000/article/create
-호출 방식 : post
-응답 결과 : 신규 게시글 DB등록 처리 후 특정 웹 페이지 뷰파일 전달 or 특정 웹페이지로 이동
*/
router.post('/create',async(req,res)=>{

    //Step 1 : 사용자가 입력한 formtag 내 입력/선택 데이터 추출
    const title=req.body.title;
    const contents=req.body.contents;
    const display=req.body.display;
    // const view_cnt=req.body.view_cnt;
    // const ip_address=req.body.ip_address;
    // const regist_id=req.body.regist_id;
    // const regist_date=req.body.regist_date;

    //Step 2 : DB 게시글 테이블에 저장할 json 데이터 생성
    const article={
        title, //title:title //title:req.body.title
        contents,
        display,
        ip_address:"111.111.111.111",
        view_cnt:0,
        regist_id:1,
        regist_date:Date.now()
    }

    //Step 3 : 게시글 테이블에 상기 article 데이터 등록 처리(DB연동)
    //DB 서버에서 Inser SQL구문을 통해서 DB 등록 처리가 되면 실제 데이터 셋을 다시 반환함
    const DBarticle={
        title, //title:title //title:req.body.title
        contents,
        display,
        ip_address:"111.111.111.111",
        view_cnt:0,
        regist_id:1,
        regist_date:Date.now()
    }


    //Step 4 : 등록 완료 후 게시글 목록 페이지로 이동
    res.redirect('/article/list');



    res.render('article/create.ejs');
});


/*
-기존 게시글을 수정한 사용자 form에 대한 게시글 데이터 수정처리 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:3000/article/modify
-호출 방식 : post
-응답 결과 : 기존 게시글 수정 후 목록페이지로 이동 
*/

router.post('/modify',async(req,res)=>{

    //Step 1 : 사용자 수정 데이터를 추출하고 수정할 데이터 소스 생성
    //수정 게시글  id 값 추출
    const article_id=req.body.article_id;

    //실제 수정할 데이터
    const article={
        title:req.body.title,
        contents:req.body.contents,
        display:req.body.display,
        modify_id:1,
        modify_date:Date.now()
    }

    //Step 2 : DB게시글 테이블에 특정 게시글 번호를 기준으로 게시글 정보 수정
    //Update article set table='수정할 제목', contents='수정한 내용',display='게시여부값' ..etc where article_id=article_id

    //수정이 완료되면 DB서버에서 수정처리 건수가 반환


    //Step 3 : 게시글 목록 페이지로 이동
    res.redirect('/article/list');
});



/*
-기존 게시글 데이터 삭제 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:3000/article/delete?aid=1
-호출 방식 : get
-응답 결과 : 해당 게시글 삭제 후 게시글 목록 페이지로 이동
*/
router.get('/delete',async(req,res)=>{

    const article_id=req.query.article_id;

    //Step 2: 데이터 삭제 처리

    //Step 3 : 게시글 목록 페이지로 이동
    res.redirect('/article/list');
})





/*
-기존 등록된 게시글 데이터를 조회해서 게시글 수정 웹페이지에서 데이터를 포함한 웹페이지 요청과 응답처리 라우팅 메소드
-호출 주소 : localhost:3000/article/modify/id
-호출 방식 : get
-응답 결과 : DB에서 해당 단일 게시글 정보를 조회해와서 지정 뷰파일에 데이터를 전달하고 뷰파일 내에서 해당 데이터를 html태그에
            출력하여 최종 웹브라우저에 동적으로 변경된 웹페이지를 사용자에게 보여줌
*/

router.get('/modify/:idx',async(req,res)=>{
    //Step 1 : 수정할 게시글의 article_id값을 추출
    const idx=req.params.idx;

    //Step 2 : DB에서 해당 게시글 정보를 조회해옴(가정)
    const article={
        article_id:"1",
        title:"게시글 제목입니다.",
        contents:"게시글 내용입니다.",
        display:1,
        view_cnt:10,
        ip_address:"111.111.111.111",
        regist_id:1,
        regist_date:Date.now()
    }

    //Step 3 : DB에서 가져온 단일 게시글 정보를 modify.ejs 뷰파일에 전달
    res.render('article/modify.ejs',{article});
});





module.exports=router;