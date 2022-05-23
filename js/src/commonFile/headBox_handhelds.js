// headBox_handhelds.js

(function($){
// 기능설명
/**
 * handhelds 기기(smartphone, tablet)의 headBox의 navBtn 클릭시 #navBox 나타나도록
 * navBox의 closeBtn 누르면 #navBox 사라지도록
 */

  // 변수
  var headBox = $('#headBox');
  var navBox = headBox.find('#navBox');
  var navBtn = headBox.find('.nav_btn');
  var nBtn = navBtn.find('button');
  var closeBtn = navBox.find('.close_btn');
  var cBtn = closeBtn.find('button');

  // 함수
  var showNavBox = function(e){
    e.preventDefault();
      navBox.fadeIn();
  };

  var closeNavBox = function(e){
    e.preventDefault();
    navBox.fadeOut()
  }

  
  // 이벤트
  nBtn.on('click', showNavBox);
  cBtn.on('click', closeNavBox);

})(jQuery);