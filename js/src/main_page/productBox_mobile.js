// productBox_mobile.js

// 기능 설명
// 모바일 기기에서 tab 스와이프 했을 때 옆으로 넘어가서 가려진 부분 보이도록

(function($){
var productBox = $('#productBox');
var tabList = productBox.find('.product_tab_list');
var tabListLi = tabList.children('li');
var tabLiLen = tabListLi.length;

var i=0;
var j;
var permission = true;
var startX, endX;



// 함수
var nextSwipeFn = function(){
  
    i+=1;
    j=i;
    var liWidth = tabListLi.eq(1).width();
    console.log(liWidth);
    tabList.stop().animate({marginLeft:-20*j+'%'});
}

var prevSwipeFn = function(){
  if(permission){
    permission = false;
    tabList.stop().animate({marginLeft:0});
    permission = true;
  }
}

// 이벤트
tabList.on('touchstart', function(e){
  startX = parseInt(e.originalEvent.changedTouches[0].clientX);
});

tabList.on('touchend', function(e){
  endX = parseInt(e.originalEvent.changedTouches[0].clientX);
  var resultX = startX - endX;
  if(resultX > 100){
    nextSwipeFn();
  }else if(resultX < -100){
    prevSwipeFn();
  }
});


})(jQuery);