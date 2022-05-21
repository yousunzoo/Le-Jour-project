// login.js
// 아이디찾기, 비밀번호 찾기 버튼 클릭하면 해당 페이지로 이동

(function($){
// 변수
var loginBox = $('#loginBox');
var loginBtns = loginBox.find('.formLogin_bottom');
var findId = loginBtns.find('.find_id'); 
var findPw = loginBtns.find('.find_pw'); 

findId.find('button').on('click', function(e){
  e.preventDefault();
  window.location.href = './find_id.html';
})
findPw.find('button').on('click', function(e){
  e.preventDefault();
  window.location.href = './find_pw.html';
})
})(jQuery);