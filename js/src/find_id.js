// find_id.js
// 기능설명
// 찾기 버튼을 눌렀을 때 이름/이메일 input 값이 없을 경우 메세지 띄움
// 아이디 찾기, 로그인하기 버튼 눌렀을 때 해당 페이지로 이동

(function($){
// 변수
var findIdSec = $('.find_id_sec');
var inputName = findIdSec.find('#userName');
var inputEmail = findIdSec.find('#userMail');
var findBtn = findIdSec.find('#findIDBtn');
var alertBox = findIdSec.find('.alert_box');
var alertN = alertBox.find('.alert_id_none');
var alertE = alertBox.find('.alert_email_none');
var BtnMemberSec = $('.btn_member_sec');
var findPwBtn = BtnMemberSec.find('.find_pw').find('button');
var logInBtn = BtnMemberSec.find('.login').find('button');

var inputNameV, inputEmailV;

var nameAlertFn = function(){
  if(inputNameV == ""){
    alertN.show();
  }
}
var emailAlertFn = function(){
  if(inputEmailV == undefined){
    alertE.show();
  }
}

findBtn.on('click', function(e){
  e.preventDefault();
  alertN.hide();
  alertE.hide();
  inputNameV = inputName.val();
  inputEmailV = inputEmail.val();
  nameAlertFn();
  emailAlertFn();
})

findPwBtn.on('click', function(e){
  e.preventDefault();
  document.location = './find_pw.html'
})

logInBtn.on('click', function(e){
  e.preventDefault();
  document.location = './login.html'
})
})(jQuery);