var express = require("express");
var router = express.Router();

/* 메인페이지 요청과 응답처리 라우팅 메소드 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/*
-채팅서버와 연결된 모든 사용자들간 채팅하는 웸페이지 요청과 응답처리 라우팅 메소드
-요청주소: http://localhost:5001/chat
-요청방식: Get
-응답결과: 채팅서버와 연결된 모든 사용자들간 채팅하는 웹페이지(뷰+Data) 반환
*/
router.get("/chat", async (req, res) => {
  res.render("chat");
});

/*
-특정 채팅방에 입장한 그룹 사용자들 간 채팅하는 웹페이지 요청과 응답처리 라윝팅 메소드
-요청주소: http://localhost:5001/groupchat
-요청방식: Get
-응답결과: 특정 채팅방에 입장한 그룹 사용자들 간 채팅하는 웹페이지(뷰+Data) 반환
*/
router.get("/groupchat", async (req, res) => {
  res.render("groupchat");
});

module.exports = router;
