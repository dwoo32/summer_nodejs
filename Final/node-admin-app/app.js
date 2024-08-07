var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//dotenv를 이용한 환경변수 설정값 로딩처리
require("dotenv").config();

var expressLayouts = require("express-ejs-layouts");

//ORM DB연결객체 sequelize 참조하기
var sequelize = require("./models/index.js").sequelize;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var adminRouter = require("./routes/admin");
// var memberRouter = require('./routes/member');
// var channelRouter = require('./routes/channel');
var articleRouter = require("./routes/article");
// var messageRouter = require('./routes/message');

var app = express();

//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//레이아웃 설정
app.set("layout", "layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/admin", adminRouter);
// app.use('/member', memberRouter);
// app.use('/channel', channelRouter);
app.use("/article", articleRouter);
// app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//노드앱의 기본 WAS 서비스 포트
app.set("port", process.env.PORT || 5001);

//노드앱이 작동되는 서버 객체 생성
var server = app.listen(app.get("port"), function () {});
