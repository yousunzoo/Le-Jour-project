// join.js
// 1. 생년월일 해당 input에 알맞는 값 부여
// 년도는 2022~1900 까지
// 1월 : 31일까지, 2월 : 28일까지..
// 2. 이전으로 버튼 누르면 이전 페이지로 돌아가기

(function($){
  // 변수
  var joinBox = $('#joinBox');
  var joinForm = joinBox.find('.join_form').find('form');
  var usrBirth = joinForm.find('.usr_birth');
  var usrY = usrBirth.find('#usrBirthY');
  var usrM = usrBirth.find('#usrBirthM');
  var usrD = usrBirth.find('#usrBirthD');
  var formBtns = joinForm.find('.form_button');
  var prevBtn = formBtns.find('.prev_btn');


  // 함수
  var setBirthFn = function(){
    for(var i = 2022; i >= 1900; i--){
      usrY.append('<option value =' + i + '>' + i + '</option>');
    }

    for(var i = 1; i <= 12; i++){
      usrM.append('<option value=' + i + '>'+ i +'</option>');
      }
    
  }
  
  // 월에 따라 해당 월의 마지막 날 수 셋팅
  var setBirthDFn = function(){
    var month = usrM.val();
    if(month == 2){
      for(var i=1; i<= 28; i++){
        usrD.append('<option value=' + i + '>'+ i +'</option>');
      }} else if(month%2 == 0){
        for(var i=1; i<=30; i++){
          usrD.append('<option value=' + i + '>'+ i +'</option>');
        }
      } else {
        for(var i=1; i<=31; i++){
          usrD.append('<option value=' + i + '>'+ i +'</option>');
        }
      }
  }
  setBirthFn();
  setBirthDFn(1);

  usrM.on('click', function(e){
    e.preventDefault();
    usrD.empty();
    setBirthDFn();
  })
  // 이벤트
  // step 2.
  prevBtn.on('click', function(e){
    e.preventDefault();
    history.back();
  })

})(jQuery);