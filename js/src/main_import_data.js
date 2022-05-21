// main_import_data.js

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

  // main 페이지 내용 불러오기
  var slideBox = $('#slideBox');
  var productBox = $('#productBox');
  var eventBox = $('#eventBox');
  var reviewBox = $('#reviewBox');
  var snsBox = $('#snsBox');
  var footTopBox = $('#footTopBox');
  var mainUrl = "../page/main/";
  var importMain = ['slideBox.html','productBox.html','eventBox.html','reviewBox.html','snsBox.html','footTopBox.html','footBox.html'];
  var mainSelect = [slideBox, productBox, eventBox, reviewBox, snsBox, footTopBox];

  // 기능수행
  $.each(mainSelect, function(index,selector){
    selector.load(mainUrl + importMain[index], function(){
      if(index === 0){
        body.append('<script src="../js/src/main_page/slideBox.js"></script>')
      }else if(index === 1){
        body.append('<script src="../js/src/main_page/productBox.js"></script>')
      }else if(index === 2){
        body.append('<script src="../js/src/main_page/eventBox.js"></script>')
      }else if(index === 3){
        body.append('<script src="../js/src/main_page/reviewBox.js"></script>')
      }else if(index === 5){
        body.append('<script src="../js/src/main_page/footTopBox.js"></script>')
      }
    })
  })
}, 100)
})(jQuery);