// footTopBox.js
/**
 * 기능 구현
 * json data 불러와서 해당 갯수만큼 div 형성 및 내용 삽입
 * 세로로 배치된 슬라이드가 일정시간에 따라 자동으로 세로로 넘어가도록
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
  var slide = slideArea.find('.notice_slide');

  var divLi = '<div class="notice_div"><a href="#" class="notice_title clearfix"><span></span><i class="fa-solid fa-arrow-right-long"></i></a></div>'

  var i=0;
  var slideDiv = slide.children('div');

  // 기능 구현
  // 1. div 생성 및 내용 삽입
  // list 갯수만큼 div 형성
  for(; i<len; i+=1){
    slide.append(divLi);
  }

  // 각 div에 맞는 내용 삽입
  for(i=0; i<len;i++){
    var list = noticeData[i];
    var divN = slide.find('div').eq(i);
    var divA = divN.find('a');
    var divSpan = divA.find('span');

    divSpan.text(list.title);
    divA.attr('href', list.link);
  }

  // 2. 슬라이드 구현
  





}) // $.ajax 
})(jQuery);
