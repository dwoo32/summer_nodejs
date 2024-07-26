//요청이 들어올 때 마다 app.js는 매번 실행됨

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//게시글 정보처리 전용 RESTful API 라우터 참조하기 
var articleAPIRouter = require('./routes/api/articleAPI');

//노드 벡엔드 어플리케이션 객체 app정의
//app.use(노드앱에 추가하고 싶은 기능)
var app = express();



//전역 노드 어플리케이션 미들웨어 구현 실습
app.use(function(req, res, next){
  //여기에 모든 사용자의 요청이 있을 때마다 실행되어야 하는 기능 구현
  console.log("전역 어플리케이션 미들웨어 함수가 호출되었습니다",Date.now());
  //원래 사용자가 요청했던 or 응답해야 하는 다음 프로세스로 흘러가게 한다
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//미들웨어 함수를 사용하여 요청과 응답 오브젝트에 대한 로깅을 구현
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//미들웨어 추가 구현 실습
//특정 호출주소에 대한 미들웨어 기능구현
//만약 사용자가 http://localhost:3000/users/kdw 라는 주소를 요청하면 해당 주소를 분석해 관련 응답을 매번 실행
app.use('/users/:id',function(req,res,next){
  
  const userId = req.params.id;
  if(userId === 'kdw'){
  console.log("현재 사용자에 대한 정보가 요청되었습니다");
  res.send("당신은 시스템에 접근할 수 없는 사용자 입니다.");

  }
  
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

//articleAPIRouter의 기본 호출주소 체계정의하기 
//http://localhost:3000/api/articles
app.use('/api/articles', articleAPIRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
