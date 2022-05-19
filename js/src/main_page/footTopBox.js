// footTopBox.js
/**
 * 기능 구현
 * json data 불러와서 해당 갯수만큼 div 형성 및 내용 삽입
 * 세로로 배치된 슬라이드가 일정시간에 따라 자동으로 세로로 넘어가도록
 * 슬라이드에 마우스 올려져있을 때에는 멈춤, 벗어나면 다시 동작
 */

(function($){
  // 데이터 불러오기
$.ajax({
  url:"../data/notice_data.json",
  context : document.body
}).done(function(data){
  
  // 변수
  var noticeData = data;
  var len = noticeData.length;
  
  var footTopBox = $('#footTopBox');
  var slideArea = footTopBox.find('.notice_wrap');
  var noticeSlide = slideArea.find('.notice_slide');

  var divLi = '<div class="notice_div"><a href="#" class="notice_title clearfix"><span></span><i class="fa-solid fa-arrow-right-long"></i></a></div>'

  var i=0;

  // 기능 구현
  // 1. div 생성 및 내용 삽입
  // list 갯수만큼 div 형성
  for(; i<len; i+=1){
    noticeSlide.append(divLi);
  }


  // 각 div에 맞는 내용 삽입
  for(i=0; i<len;i++){
    var list = noticeData[i];
    var divN = noticeSlide.find('div').eq(i);
    var divA = divN.find('a');
    var divSpan = divA.find('span');

    divSpan.text(list.title);
    divA.attr('href', list.link);
  }

  // 2. 슬라이드 구현
  // 변수
  var slideDiv = noticeSlide.children('div');
  var divW = slideDiv.outerHeight(true);
  noticeSlide.css({height:divW * len +'px'})
  permission = true;


  var slideMoveFn = function(){
    if(permission){
      permission = false;
      i++
      noticeSlide.stop().animate({'marginTop':(-1)*divW + 'px'},2000, function(){
        var divFirst = slideDiv.eq(0);
        noticeSlide.append(divFirst);
        noticeSlide.css({'marginTop':0});

        slideDiv = noticeSlide.children('div');
        permission = true;
      })
    }
  }
  var play = setInterval(slideMoveFn, 2000)

  // 마우스 올렸을 때, 벗어났을 때 동작
  noticeSlide.on('mouseenter', function(){
    clearInterval(play);
  })
  
  noticeSlide.on('mouseleave', function(){
    setInterval(slideMoveFn,2000)
  })
}) // $.ajax 
})(jQuery);
