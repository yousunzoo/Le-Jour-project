// slideBox.js

(function($){
/** 기능구현
 * 2초마다 슬라이드 한장씩 가로로 자동으로 넘어가도록 하기
 * 움직이고 난 후 슬라이드 내부 div의 첫번째를 맨 마지막으로 강제 이동,
 * 동시에 슬라이드를 원위치로 이동 (margin-left:0)
 */


// 변수
var slideSet = $('.main_slide_wrap');
var mainSlider = slideSet.find('.main_slider');
var mainSliderDiv = mainSlider.children('div');

var permission = true;

var moveToNextFn = function(){
  if(permission){
  permission = false;
  mainSlider.stop().animate({marginLeft:-100+'%'},2000, function(){
    var divFirst = mainSliderDiv.eq(0);
    mainSlider.append(divFirst); // 02-03-04-05-01
    mainSlider.css({marginLeft:0});

    mainSliderDiv = mainSlider.children('div') // 01-02-03-04-05 -- 순서 재배치
    permission = true;
  })
  }
}
// 이벤트
setInterval(moveToNextFn, 5000)

})(jQuery);