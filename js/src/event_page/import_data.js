// import_data.js
(function($){
setTimeout(function(){
  var deviceCk = $.CheckType;
  console.log(deviceCk);
  
  // 공통영역 불러오기 ----------------------------------
  // 변수
  var body = $('body');
  var headBox = $('#headBox');
  var footBox = $('#footBox');
  var baseUrl = "../page/common/";
  var importPage = ['headBox.html', 'footBox.html'];

  // 기능 수행
  headBox.load(baseUrl + importPage[0], function(){
    var headMenu = '<script src="../js/src/commonFile/headBox_handhelds.js"></script>';
    (deviceCk === 'smartphone' || deviceCk === 'tablet') ? body.append(headMenu) : body.remove($('.head_script'))
  });

  footBox.load(baseUrl + importPage[1]);
}, 100)


})(jQuery);
