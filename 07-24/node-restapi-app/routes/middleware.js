//exports.함수명은 해당 모듈파일에서 여러 개의 재사용 가능한 함수의 기능을 바로 외부에서 사용할 수 있게 노출

//사용자 요청 url을 분석해서
//파라메타 방식으로 값이 전달된 경우 특정 파라메타 값을 추출해서
//비즈니스 로직 처리를 적용
//https://localhost:3000/article/100
//https://localhost:3000/api/article/200
exports.checkParams = (req,res,next) => {
    
    if(req.params.id == undefined){
        console.log("id 파라메타가 존재하지 않습니다");
        // res.redirect('/');
    }
    else{
        console.log("id 파라메타 값 : ",req.params.id);
    }
    next();
}



//사용자 요청 url을 분석해서
//쿼리 스트링 방식으로 값이 전달된 경우 특정 파라메타 값을 추출해서
//비즈니스 로직 처리를 적용
exports.checkQuery = (req,res,next) => {
    
    if(req.query.category == undefined){
        console.log("category 키 값이 전달되지 않습니다");
    }
    next();
}
