//articleAPI.js 라우터의 기본주소는 
//app.js에서 http://localhost:3000/api/articles 로 설정해줍니다. 

var express = require('express');
var router = express.Router();

/*
-전체 게시글 목록 데이터 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/api/articles/list
-호출방식: Get
-응답결과: 게시글 JSON 데이터 목록
*/
//router.get('호출주소',콜백함수());
//async(req,res)=>{} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.(콜백지옥을 회피하는방법)
router.get('/list',async(req,res)=>{

    //API 호출결과 표준 데이터 포멧 정의
    let apiResult={
        code:200,
        data:null,
        result:""
    };

    try{
        //DB 게시글 테이블에서 전체 게시글 목록을 가져왔다고 가정합니다.
    //가져온 데이터가 아래와 같아요..
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

    apiResult.code=200;
    apiResult.data=articles;
    apiResult.result="success";

  

    }catch(err){
        apiResult.code=500;
        apiResult.data=null;
        apiResult.result="Server Error";

    }

    //서버응답결과물로 순수 json데이터를 반환한다.
    //res.json(json데이터);
    res.json(apiResult);

    
});



/*
-단일 신규 게시글 정보 등록 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/api/articles/create
-호출방식: Post (get은 data 패킷에 head로 보냄,post는 데이터를 패킷으로 body로 보냄 )
-ssl : https와 같은 데이터 통신 통로 // 서버에는 ssl인증서가 있어서 데이터로 바꾸기 가능
-응답결과: 등록 처리 완료된 단일 게시글 정보 반환
*/
router.post('/create',async(req,res)=>{

    //API 호출결과 표준 데이터 포멧 정의
    let apiResult={
        code:200,
        data:null,
        result:""
    };


    //backend 예외처리
    //try catch 는 에러가 나더라도 클라이언트가 안답답하게 다른 조치 하는 거
    try{
         //Step1 : 클라이언트에서 보내준 사용자 입력 json 데이터 추출
        //req.body.속성명
        const title = req.body.title; 
        const contents = req.body.contents; 
        const display = req.body.display;
        //Step2 : DB에 등록
        const article = {
            title,
            contents,
            display,
            view_cnt:0,
            ip_address:"111.111.111.111",
            regist_id:1,
            regist_date:Date.now()
        }

        //DB 게시글 테이블에 상기 데이터를 저장
        //저장하면 DB에 저장된 게시글 정보가 다시 반환됨
        //Step3 : DB에 저장반환된 등록된 신규 게시글 정보가 반환
        const dbArticle={
            article_id:1,
            title,
            contents,
            display,
            view_cnt:0,
            ip_address:"111.111.111.111",
            regist_id:1,
            regist_date:Date.now()
        }

        
        apiResult.code=200;
        apiResult.data=dbArticle;
        apiResult.result="success";

        

    }catch(err){
        //try 블록 스코프 내에서 벡엔드 에러가 발생하면 catch(err) 블럭으로 에러 내용이 전달됨
        apiResult.code=500;
        apiResult.data=null;
        apiResult.result="Server Error";

    }

    //Step4 : 클라이언트에게 반환
    //HTTPResponse 객체의 json('json데이터')메소드는 서버에서 웹브라우저로 json데이터 반환
    res.json(apiResult);

    
});



/*
-단일 기존 게시글 정보 조회 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/api/articles/?aid=1
-호출방식: Get
-응답결과: 단일 게시글 정보 반환
*/
router.get('/',async(req,res)=>{

    let apiResult={
        code:200,
        data:null,
        result:""
    };

    try{

        //Step 1 : API URL 주소에서 게시글 번호 추출(qureystring)
        const aid = req.query.aid;
        
        //Step 2 : 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 해당 게시글 정보를 가져온다.
        //DB에서 조회해온 단일 게시글 정보라고 가정
        const article = {
            article_id:aid,
            title:"게시글 제목입니다.",
            contents:"게시글 내용입니다.",
            display:1,
            view_cnt:10,
            ip_address:"111.111.111.111",
            regist_id:1,
            regist_date:Date.now()
        };

        apiResult.code=200;
        apiResult.data=article;
        apiResult.result="success";


    }catch(err){

        console.log("실제 에러 확인:",err.message);
        //backend에서 에러가 생긴 사실을 서버에 물리적 로그 폴더를 만들고 로그를 .txt 파일로 저장
        //좀 더 적극적으로 서버에 대한 에러 대응 가능

        apiResult.code=500;
        apiResult.data=null;
        apiResult.result="Server Error";

    }
    
    //Step 3 : 단일 게시글 정보를 웹브라우저/ 클라이언트 응답결과로 반환한다.

    res.json(apiResult);

});


/*
-단일 기존 게시글 수정 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/api/articles/modify
-호출방식: post
-응답결과: 수정 결과 반환 (json데이터)
*/
router.post("/modify",async(req,res)=>{

    //API 호출결과 표준 데이터 포멧 정의
    let apiResult={
        code:200,
        data:null,
        result:""
    };


    //backend 예외처리
    //try catch 는 에러가 나더라도 클라이언트가 안답답하게 다른 조치 하는 거
    try{
         //Step1 : 클라이언트에서 보내준 수정 json 데이터 추출
        //req.body.속성명
        const article_id = req.body.article_id;
        const title = req.body.title; 
        const contents = req.body.contents; 
        const display = req.body.display;

        //Step2 : 사용자가 보내준 속성만 json 데이터를 해당 테이블의 컬럼값으로 수정
        //DB 게시글 테이블에 수정할 json 단일 데이터 속성정의
        const article = {
            title,
            contents,
            display,
            ip_address:"111.111.111.111",
            modify_id:1,
            modify_date:Date.now()
            
        }

        //DB 게시글 테이블에 상기 데이터를 수정
        //저장하면 DB에서 수정된 건수를 반환해줌
        //Step3 : 수정된 건수를 데이터 값으로 지정해주고 프론트에 수정된 건수를 전달
        
        
        apiResult.code=200;
        apiResult.data=1; // 실제 db서버에서 제공된 수정된 건수
        apiResult.result="success";

        

    }catch(err){
        //try 블록 스코프 내에서 벡엔드 에러가 발생하면 catch(err) 블럭으로 에러 내용이 전달됨
        apiResult.code=500;
        apiResult.data=0;
        apiResult.result="Server Error";

    }

    //Step4 : 클라이언트에게 반환
    //HTTPResponse 객체의 json('json데이터')메소드는 서버에서 웹브라우저로 json데이터 반환
    res.json(apiResult);

});



/*
-단일 기존 게시글 삭제 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/api/articles/delete?aid=1 (qureystring)
-호출방식: get(보안상 not good)
-응답결과: 수정 결과 반환 (json데이터)
*/
router.get('/delete',async(req,res)=>{

    //API 호출결과 표준 데이터 포멧 정의
    let apiResult={
        code:200,
        data:null,
        result:""
    };

    try{
        //Step 1 : url에서 삭제하려는 게시글 번호 조회
        const article_id = req.query.aid;

        //Step 2 : DB테이블에서 해당 게시글 삭제
        //DB서버에서 특정 데이터가 삭제되면 삭제 건수가 벡엔드로 반환

        const deletedcnt = 1;

        apiResult.code=200;
        apiResult.data=deletedcnt;
        apiResult.result="success";



    }catch(err){
        apiResult.code=500;
        apiResult.data=0;
        apiResult.result="Server Error";


    }


    res.json(apiResult);



});


/*
-단일 기존 게시글 삭제 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/api/articles/delete
-호출방식: post(보안상 better)
-응답결과: 수정 결과 반환 (json데이터)
*/

router.get('/delete',async(req,res)=>{

    //API 호출결과 표준 데이터 포멧 정의
    let apiResult={
        code:200,
        data:null,
        result:""
    };

    try{
        //Step 1 : url에서 삭제하려는 게시글 번호 조회
        const article_id = req.body.article_id;

        //Step 2 : DB테이블에서 해당 게시글 삭제
        //DB서버에서 특정 데이터가 삭제되면 삭제 건수가 벡엔드로 반환

        const deletedcnt = 1;

        apiResult.code=200;
        apiResult.data=deletedcnt;
        apiResult.result="success";



    }catch(err){
        apiResult.code=500;
        apiResult.data=0;
        apiResult.result="Server Error";


    }


    res.json(apiResult);



});

/*
-단일 기존 게시글 정보 조회 요청과 응답처리 라우팅메소드 paramater 방식
-호출주소: http://localhost:3000/api/articles/1
-호출방식: Get
-응답결과: 단일 게시글 정보 반환 (json데이터)
*/
router.get('/:aid',async(req,res)=>{

    let apiResult={
        code:200,
        data:null,
        result:""
    };

    try{

        //Step 1 : API URL 주소에서 게시글 번호 추출(paramater)
        //paramater는 와일드 카드 키 값을 이용해 req.params.키값으로 추출
        const aid = req.params.aid;
        
        //Step 2 : 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 해당 게시글 정보를 가져온다.
        //DB에서 조회해온 단일 게시글 정보라고 가정
        const article = {
            article_id:aid,
            title:"게시글 제목입니다.",
            contents:"게시글 내용입니다.",
            display:1,
            view_cnt:10,
            ip_address:"111.111.111.111",
            regist_id:1,
            regist_date:Date.now()
        };

        apiResult.code=200;
        apiResult.data=article;
        apiResult.result="success";


    }catch(err){

        console.log("실제 에러 확인:",err.message);
        //backend에서 에러가 생긴 사실을 서버에 물리적 로그 폴더를 만들고 로그를 .txt 파일로 저장
        //좀 더 적극적으로 서버에 대한 에러 대응 가능

        apiResult.code=500;
        apiResult.data=null;
        apiResult.result="Server Error";

    }
    
    //Step 3 : 단일 게시글 정보를 웹브라우저/ 클라이언트 응답결과로 반환한다.

    res.json(apiResult);







});






module.exports = router;