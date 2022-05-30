// productBox_mobile.js

// 기능 설명
// 모바일 기기에서 tab 스와이프 했을 때 옆으로 넘어가서 가려진 부분 보이도록

(function($){
var productBox = $('#productBox');
var tabArea = productBox.find('.product_tab');
var tabTUl = tabArea.children('.product_tab_list');
var tabTLi = tabTUl.find('li');
var startX, start1;



tabArea.on('touchstart', function(e){
  startX = parseInt(e.originalEvent.changedTouches[0].clientX);
})
tabArea.on('touchmove', function(e){
  e.preventDefault();
  start1 = parseInt(e.originalEvent.changedTouches[0].clientX);
  var moveW = startX - start1;
  console.log(moveW );
  if(moveW <= 0){
    tabArea.css({'marginLeft':0})
  } else {
    tabArea.css({'marginLeft': -1* moveW +'px'});
  }
  
})


})(jQuery);