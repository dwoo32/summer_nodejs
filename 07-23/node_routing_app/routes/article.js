//게시글 정보 관리 웹페이지 요청과 응답처리 전용 라우터 파일
//article.js 라우터 팡ㄹ의 기본 주소체계는 app.js 내에서
//http://localhost:3000/article/~~~~~ 형태로 설정되어 있다.


//express 객체를 참조합니다.
var express = require('express');

//각종 요청과 응답 처리를 위한 router 객체
var router = express.Router();

//게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 정의
//localhost:3000/article/list
//router.get() 라우팅 메소드는 클라이언트에서 get방식으로 요청해야함
//클라이언트는 get방식으로 요청하는 방법:브라우저 주소창에 주소를 입력하거나 링크를 클릭하는 경우
//router.get('호출주소 체계',서버응답처리전용콜백함수)
//get,post,put,patch,delte,all 메소드가 있음


router.get('/list', function(req, res) { //콜백함수에는(req,res,next)를 사용할 수 있음
                                        //req:요청객체(클라이언트), res:응답객체(서버), next:다음 미들웨어로 콜백 처리후 요청을 넘기는 함수
    //게시글 목록 웹페이지를 출력합니다.
    res.render('article/list', { title: '게시글 목록' })
    //res.render('뷰파일 경로'):특정 지정뷰 파일의 내용을 웹브라우저로 전달하는 메소드
    //=>views폴더 아래 article 폴더 아래 list.ejs   파일을 웹브라우저로 전달
    //res.render('뷰파일 경로', 해당 지정 뷰에 전달한 data(json형식))
});


//게시글 등록 웹페이지 요청과 응답처리 라우팅 메소드
//localhost:3000/article/create, get 방식, 게시글 등록 웹페이지 출력(뷰파일)
router.get('/create',function(req,res){
    res.render('article/create');
});

//게시글 등록 페이지에서 폼 방식으로 전달해준 사용자 입력 게시글 정보를 추출해 db에 저장하는 라우팅 메소드
//localhost:3000/article/create, post 방식
//** 서버측 라우팅 매소드는 호출 주소 url과 클라이언트 요청 방식이 둘 다 동일해야 해당 메소드가 실행됨 **//
router.post('/create',function(req,res){
    
    //Step1 : 사용자 게시글 등록 폼 태그 내 입력/선택 값 추출하기
    //사용자 입력 폼 내 입력/선택 html요소 선택 값을 추출하려면 req.body.html 태그의 name 속성값을 사용
    //req=HTTPRequest객체 = 요청 정보 담고 있는 클라이언트/웹 브라우저에서 서버로 전달되는 모든 정보를 담고 있는 객체
    const title=req.body.title;
    const contents=req.body.contents;
    const display=req.body.display;

    //Step2 : 추출한 사용자 게시글 정보를 db에 저장하기
    //객체의 속성명과 속성에 할당되는 변수명이 같으면 변수명 생략 가능
    const article = {
        title,    //title:title
        contents,//contents:contents
        display,//display:display
        view_cnt:0,
        ipaddress:"111.111.111.111",
        regist_date:Date.now(),
        regist_id:1,
    }

    //Step3 : DB에 관련 게시글 테이블에 데이터 저장  


    //Step4 : 사용자 웹 브라우저를 게시글 목록페이지로 바로 이동하기
    //res.redirect('이동할 주소'):클라이언트의 요청을 다른 url주소로 재지정하는 메소드
    res.redirect('/article/list');
    //res.render를 사용하지 않고 redirect를 사용하는 이유는 사용자가 등록한 게시글 정보를 db에 저장한 후 그 저장한 값을
    //바로 확인할 수 있도록 게시글 목록페이지로 이동시키기 위함(?) / overhead가 적음
});

//게시글 삭제 처리 요청과 응답처리 라우팅 메소드
//localhost:3000/article/delete, post 방식, 게시글 삭제 처리
router.post('/delete',function(req,res){
    //Step 1 : 삭제할 게시글 고유부호 추출
    const articleIdx = req.body.articleIdx;

    //Step 2 : 게시글 테이블에서 해당 게시글 번호로 단일 게시글 정보를 영구 삭제

    //Step 3 : 게시글 목록페이지로 이동

    res.redirect('/article/list');

});


//게시글 확인 및 수정 웹페이지 요청과 응답처리 라우팅 메소드
//localhost:3000/article/modify?id=1, get 방식, 단일 게시글 정보확인 웹페이지 출력(뷰파일)
router.get('/modify',function(req,res){

    //url 주소에서 데이터 전달하는 방법 2가지
    //1.쿼리스트링 방식:localhost:3000/article/modify?id=1(?키=값&키=값)
    //ex) https://shop.naver.com/category?ptype=tv&brand=lg&price=1000000

    //2.파라미터 방식:localhost:3000/article/modify/1
    //ex) https://shop.naver.com/category/tv/lg/1000000

    //url 주소에 data값을 넣으면 검색 시 더 잘 노출됨

    //Step1:URL주소에서 게시글 고유번호 추출
    //쿼리스트링 방식으로 전달된 키 값은 req.query.key 값으로 데이터 추출
    const articleIdx = req.query.id;

    //Step2:게시글 고유번호에 해당하는 게시글 정보를 db에서 추출
    const article= {
        article_id:1,
        title:"웹퍼블리셔의 업무에 대해 궁금해요",
        contents:"ㅈㄱㄴ",
        display:"1",
        view_cnt:10,
        regist_date:Date.now(),
        regist_id:1,

    }

    //특정 뷰파일에 단일 게시글 데이터를 article이라는 속성명으로 전달
    res.render('article/modify',{article});
});



//** 라우팅 메소드 구현시 가장 중요한 점 : 와일드 카드로 구현된 메소드는 모든 라우팅 메소드의 최하단에 위치해야 함**//
//기존 게시글 정보에 대한 사용자가 수정한 폼 정보를 이용해
//수정 데이터를 폼에서 추출하고 추출한 데이터 정보를 기반으로
//DB에 저장되어 있던 기존 데이터를 수정 처리 후에 목록페이지로 이동은 내 마음
//localhost:3000/article/modify/1, post 방식, 웹 브라우저 주소를 목록 페이지로 이동시킴 ... res.redirect('url')
router.post('/modify/:id',function(req,res){


    //url 파라미터 방식으로 데이터를 전달하는 경우 해당 데이터를 추출하는 방법
    //먼저 라우팅 주소에 와일드 카드 키를 설정=> /modify/:id 이때 id가 와일드카드 키
    //req.params.와일드카드키명으로 데이터 추출

    //Step1 :  게시글 고유 번호 추출   와일드 카드 키 명으로 파라메타 값 추출
    const articleIdx=req.params.id;

    //Step2 : 사용자가 수정한 html요소의 수정값 추출하기
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display; 

    //Step3 : db 게시글 정보 수정을 위한 json수정데이터 생성하기
    const article={
        title,
        contents,
        display,
        
    }

    //Step4 : db 게시글 정보 수정 처리하기


    //수정작업이 끝나면 게시글 목록페이지로 이동시키거나 특정 뷰파일로 전송
    res.redirect('/article/list');

});


module.exports = router;