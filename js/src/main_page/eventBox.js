// eventBox.js

/** 기능구현
 * next, prev 버튼 이용하여 슬라이드 이동
 * 슬라이드 이동시 해당 슬라이드 순서에 맞게 숫자 구현
 */

(function($){
// 변수
var eventBox = $('#eventBox');
var eventSlideArea = eventBox.find('.slide_area')
var btnArea = eventBox.find('.event_btns');
var nextBtn = btnArea.find('.next');
var prevBtn = btnArea.find('.prev');

var btnP = btnArea.find('p');
var nowI = btnP.find('.now');
var nowT = btnP.find('.total_view');

var slideSet = $('.event_slide_wrap');
var eventSlider = slideSet.find('.event_slider');
var eventDiv = eventSlider.children('div');
var originDivLen = eventDiv.length;

// ------------------------------
var i=0
var permission = true;
var timed = 1000;
var play;

var startX, endX;

// 함수

// nextBtn 눌렀을 때 슬라이드 이동
var nextBtnFn = function(){
  if(permission){
    permission = false;
    i += 1;

    if (i>= originDivLen){
      eventSlider.css({marginLeft:100+'%'});
      i=0;
    } // 특정 상황에서만 수행할 내용 (내용 5 -> 내용 1)
    eventSlider.stop().animate({marginLeft:-100*i+'%'}, function(){permission=true}); // 기본적으로 수행될 내용
  }
} // nextBtnFn()

var prevBtnFn = function(){
  if(permission){
    permission = false;
    i -= 1;
    console.log(i);
    eventSlider.stop().animate({marginLeft:-100*i+'%'}, function(){
      if(i < 0){
        i = originDivLen-1;
        eventSlider.css({marginLeft: -100*i +'%'});
      }; // 맨 마지막 div(실제 div)로 보냄
      permission = true;
    });
  } // if(permission)
} // prevBtnFn()

var nowIFn = function(){
  nowT.text(originDivLen);
  if(i<0){
    nowI.text(originDivLen)
  }else{nowI.text(i+1);}
} // nowIFn()

var slideGoFn = function(){
  play = setInterval(function(){
    nextBtn.trigger('click');
  }, timed*3);
} // slideGoFn() 

var slideStopFn = function(){
  clearInterval(play);
} // slideStopFn()

// 기능 수행
// 1. 슬라이드 복제 및 width 재설정
var cloneDiv = eventDiv.eq(-1).clone();
eventSlider.prepend(cloneDiv);

var newEventDiv = eventSlider.children('div');
var newDivLen = newEventDiv.length;

eventSlider.css({width:(100 * newDivLen)+'%', left:-100+'%'})
newEventDiv.css({width:(100 / newDivLen)+'%'})

nowIFn();
slideGoFn();

// 이벤트
nextBtn.on('click', function(e){
  e.preventDefault;
  nextBtnFn();
  nowIFn();
})

prevBtn.on('click', function(e){
  e.preventDefault;
  prevBtnFn();
  nowIFn();
})

eventSlideArea.on('mouseenter', function(){
  slideStopFn();
});
eventSlideArea.on('mouseleave', function(){
  slideGoFn();
})


// 터치 이벤트
eventSlideArea.on('touchstart', function(e){
  startX = parseInt(e.originalEvent.touches[0].clientX);
});
eventSlideArea.on('touchend', function(e){
  endX = parseInt(e.originalEvent.changedTouches[0].clientX);

  var resultX = startX-endX;
  if(resultX > 50){
    nextBtnFn();
  }else if(resultX < -50){
    prevBtnFn();
  } // if
});


})(jQuery);