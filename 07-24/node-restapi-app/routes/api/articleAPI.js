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




module.exports = router;