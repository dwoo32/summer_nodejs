//일반 회원 정보 처리를 위한 각종 요청과 응답처리 제공 라우터 파일
//기본 호출 주소 : http://localhost:5000/api/member
//기본 호출 주소 정의는 app.js에서 설정함
var express = require("express");
var router = express.Router();

//사용자 암호 단방향 암호화
var encrypt = require("bcryptjs");

//jwt토큰 생성을 위한 jsonwebtoken 패키지 참조
const jwt = require("jsonwebtoken");

//ORM DB객체 참조하기
var db = require("../models/index");

/*
- 신규 회원 정보 등록 처리 요청과 응답 처리 라우팅 메소드
- 요청주소 : http://localhost:5000/api/member/entry
- 요청방식 : Post
- 응답결과 : 신규 회원 정보 등록 처리 후 DB에 결과를 반환
*/
router.post("/entry", async (req, res) => {
  //백엔드 API를 호출하면 무조건 아래의 형식으로 데이터를 백엔드에서 반환
  let apiResult = {
    code: 400, //요청 상태 코드 200:정상, 400:에러(요청 리소스가 없음), 500:서버에러
    data: null, //백엔드에서 프론틍드로 전달할 데이터
    msg: "", //처리결과 코멘트(백엔드 개발자가 프런트 개발자에게 알려주는 코멘트 메시지)
  };

  try {
    //로직 구현 // 로직이 에러가 나면 catch로 넘어감

    //Step1:프런트엔드에서 전송해준 회원정보 데이터(json)를 받음
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const encryptedPassword = await encrypt.hash(password, 12);

    //Step2:회원정보 데이터를 DB에 저장
    //등록할 데이터의 구조(속성명)은 member모델의 속성명을 지군으로 한다
    const member = {
      email: email,
      member_password: encryptedPassword,
      name: name,
      profile_img_path: "/img/user.png",
      entry_type_code: 0,
      use_state_code: 1,
      entry_date: Date.now(),
    };

    //위에 등록한 데이터가 db Member테이블에 저장된 후 실제 저정된 회원이 다시 반환됨
    let registedMember = await db.Member.create(member);
    registedMember.member_password = ""; //보안상 암호는 제거

    //Step3:DB에 저장된 결과를 프런트엔드에 반환
    apiResult.code = 200;
    apiResult.data = {};
    apiResult.msg = "회원정보가 성공적으로 등록되었습니다.";
  } catch (err) {
    console.log("/api/member/entry 호출 에러 발생", err.message);

    //중요: 백엔드의 구체적인 에러 내용을 프론트 에러로 전송하는 것은 사직서와 다를 바 없다(보안 위함)
    //DB등록 처리 시 먼저 DB서버를 연결하는데 DB연결 실패하면 연결 메시지를 제공하는데 이런 정보 내에 보안적으로 공유하면 안되는 정보들이 존재
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  //프론트엔드에 최종처리 결과 반환
  res.json(apiResult);
});

/*
- 회원 로그인 처리 요청과 응답 처리 라우팅 메소드
- 요청주소 : http://localhost:5000/api/member/login
- 요청방식 : Post
- 응답결과 : 사용자 메일/암호를 확인하고 JWT 사용자 인증 토큰값 반환
*/
router.post("/login", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //Step1: 프론트엔드에서 전달해주는 사용자의 로그인 정보 추출
    const email = req.body.email;
    const password = req.body.password;

    //Step2: 사용자 메일 주소 존재 여부 체크
    const member = await db.Member.findOne({
      where: { email: email },
    });

    if (member) {
      //동일 메일주소가 존재하는 경우

      //Step3: 사용자 암호값 비교
      const compareResult = await encrypt.compare(
        password,
        member.member_password
      );
      if (compareResult) {
        //암호가 일치하는 경우

        //Step4: 사용자 정보가 일치하면 현재 로그인 사용자 정보를 json데이터로 생성
        const tokenJsonData = {
          member_id: member.member_id,
          email: member.email,
          name: member.name,
          profile_img_path: member.profile_img_path,
        };

        //Step5: 인증된(확인된)사용자 json데이터를 jwt토큰에 담아 토큰문자열을 생성
        //jwt.sign('토큰에 담을 데이터', '인증키값', '옵션 값(유효기간,발급자)')
        const token = await jwt.sign(tokenJsonData, process.env.JWT_AUTH_KEY, {
          expiresIn: "1h",
          issuer: "KDW",
        });

        //Step6: jwt토큰 문자열을 프론트 엔드로 반환
        apiResult.code = 200;
        apiResult.data = token;
        apiResult.msg = "Success";
      } else {
        //암호가 불일치하는 경우
        apiResult.code = 400;
        apiResult.data = null;
        apiResult.msg = "IncorrectPassword";
      }
    } else {
      //메일주소가 존재하지 않는 경우 프론트엔드로 결과값 바로 반환
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "NotExistEmail";
    }
  } catch (err) {}

  res.json(apiResult);
});

/*
- 현재 로그인한 사용자의 상세 프로필 정보를 DB에서 조회하여 반환하는 라우팅 메소드
- 요청주소 : http://localhost:5000/api/member/profile
- 요청방식 : Get
- 응답결과 : 프론트엔드에서 제공하는 jwt토큰값을 전달받아 해당 사용자 메일주소로 DB에서 사용자 정보를 조회하여 반환
*/
router.get("/profile", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    //Step1: 웹브라우저(헤더)에서 전달해주는 jwt토큰값을 추출
    //토큰값 예시 : "Bearer dkaslasdkfasdk"
    var toekn = req.headers.authorization.split("Bearer ")[1];

    //Step2: jwt토큰 문자열 내에서 인증 사용자 jsone 데이터 추출
    //jwt.verify('토큰문자열', '인증키값') 실행 후 토큰 내 저장된 json data 반환
    var loginMemberData = await jwt.verify(toekn, process.env.JWT_AUTH_KEY);

    //Step3: 토큰 페이로드 영역에서 추출한 현재 로그인 사용자 고유 번호를 기준으로 DB에서 단일 사용자 조회
    var dbMember = await db.Member.findOne({
      where: { member_id: loginMemberData.member_id },
    });

    dbMember.member_password = ""; //보안상 암호는 제거

    //Step4: 단일 사용자 정보를 프론트 엔드로 전달
    apiResult.code = 200;
    apiResult.data = dbMember;
    apiResult.msg = "Success";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);
});

module.exports = router;
