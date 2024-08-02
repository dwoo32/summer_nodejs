//관리자 로그인 상태 체크 미들웨어 함수

exports.isLoggined = (req, res, next) => {
  if (req.session.isLogined != undefined) {
    //현재 사용자가 로그인 세션이면 요청했던 프로세스로 이동
    next();
  } else {
    res.redirect("/login");
  }
};
