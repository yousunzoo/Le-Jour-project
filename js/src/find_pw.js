// find_pw.js
(function($){
  var findPwSec = $('.find_pw_sec');
  var inputID = findPwSec.find('#userID');
  var findBtn = findPwSec.find('#findPwBtn');
  var alertBox = findPwSec.find('.alert_box');
  var alertID = alertBox.find('.alert_id_none');
  var BtnMemberSec = $('.btn_member_sec');
  var findIDBtn = BtnMemberSec.find('.find_id').find('button');
  var logInBtn = BtnMemberSec.find('.login').find('button');

  var inputIDV;

  findBtn.on('click', function(e){
    e.preventDefault();
    alertID.hide();
  inputIDV = inputID.val();
  if(inputIDV == ""){
    alertID.show();
  }
  })

  findIDBtn.on('click', function(e){
    e.preventDefault();
    document.location = './find_id.html'
  })

  logInBtn.on('click', function(e){
    e.preventDefault();
    document.location = './login.html'
  })
})(jQuery);