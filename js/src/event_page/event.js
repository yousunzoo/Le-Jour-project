// event.js
/** 기능설명
 * 각 탭을 클릭할 때마다 진행중인 이벤트 / 종료된 이벤트 / 이벤트 당첨자 나오도록
 */
(function($){
  // data 불러오기
  $.ajax({
    url : "../data/event_data.json",
    context : document.body
  }).done(function(data){
    var eventData = data.reverse();
    
    var i=0;
    var len = eventData.length;

    var nowData = eventData.filter(function(data,index){
      return data.type === 'now';
    })
    var endData = eventData.filter(function(data,index){
      return data.type === 'end';
    })

    // 불러온 json data 기반으로 구성 배치
    // 변수
    var eventBox = $('#eventBox');
    var eventTab = eventBox.find('.event_tab');
    var eventNow = eventTab.find('.now');
    var eventEnd = eventTab.find('.end');
    var eventWinner = eventTab.find('.winner');

    var eventTabUl = eventTab.children('ul');
    var titleEl = '<li><button type="button"></button></li>'

    var eventListWrap = eventBox.find('.event_list_wrap');
    var eventNowUl = eventListWrap.children('.event_now').children('ul');
    var eventEndUl = eventListWrap.children('.event_end').children('ul');
    var eventWinnerUl = eventListWrap.children('.event_winner').children('ul');



    var eventNowSetFn = function(){
      eventNowUl.empty();
      var eventNowLiSet = '<li><div class="event_card clearfix"><a href="#"><div class="card_left"><img src="" alt=""></div><div class="card_right"><div class="event_content"><p class="ev_txt ev_term"></p><p class="ev_name"></p><p class="ev_txt ev_con"></p></div></div></a></div></li>'

      var j=0;
      var tabSetLen = nowData.length;

      for (; j < tabSetLen; j++){
        eventNowUl.append(eventNowLiSet);

        var tabSetN = nowData[j];
        var imgUrl = "../img/event/now/";
        var eventNowLi = eventNowUl.find('li').eq(j);
        var eventImg = eventNowLi.find('img');
        var eventTerm = eventNowLi.find('.ev_term');
        var eventName = eventNowLi.find('.ev_name');
        var eventCon = eventNowLi.find('.ev_con');

        eventImg.attr('src', imgUrl + tabSetN.content);
        eventImg.attr('alt', tabSetN.title);
        eventTerm.text(tabSetN.term);
        eventName.text(tabSetN.title);
        eventCon.text(tabSetN.summary);
      }
    }; // eventNowSetFn();

    var eventEndSetFn = function(){
      eventEndUl.empty();
      var eventEndLiSet = '<li><div class="event_card clearfix"><a href="#"><div class="card_left"><h3>종료된 이벤트입니다.</h3><img src="" alt=""></div><div class="card_right"><div class="event_content"><p class="ev_txt ev_term"></p><p class="ev_name"></p><p class="ev_txt ev_con"></p></div></div></a></div></li>';

      var j=0;
      var tabSetLen = endData.length;

      for (; j < tabSetLen; j++){
        eventEndUl.append(eventEndLiSet);

        var tabSetN = endData[j];
        var imgUrl = "../img/event/end/";
        var eventEndLi = eventEndUl.find('li').eq(j);
        var eventImg = eventEndLi.find('img');
        var eventTerm = eventEndLi.find('.ev_term');
        var eventName = eventEndLi.find('.ev_name');
        var eventCon = eventEndLi.find('.ev_con');

        eventImg.attr('src', imgUrl + tabSetN.content);
        eventImg.attr('alt', tabSetN.title);
        eventTerm.text(tabSetN.term);
        eventName.text(tabSetN.title);
        eventCon.text(tabSetN.summary);
      }
    }; //// eventEndSetFn();

    // 페이지 불러왔을 때 기본 셋팅
    eventNow.addClass('on');
    eventNow.siblings().removeClass('on');
    eventNowSetFn();

    // 이벤트 구현

    eventNow.on('click', function(e){
      e.preventDefault();
      var n = $(this).index();

      $(this).addClass('on');
      $(this).siblings().removeClass('on');

      eventListWrap.children('div').eq(n).removeClass('none')
      eventListWrap.children('div').eq(n).siblings().addClass('none');

      eventNowSetFn();
    });

    eventEnd.on('click', function(e){
      e.preventDefault();
      var n = $(this).index();

      $(this).addClass('on');
      $(this).siblings().removeClass('on');

      eventListWrap.children('div').eq(n).removeClass('none')
      eventListWrap.children('div').eq(n).siblings().addClass('none');

      eventEndSetFn();
    })

    eventWinner.on('click', function(e){
      e.preventDefault();
      var n = $(this).index();

      $(this).addClass('on');
      $(this).siblings().removeClass('on');

      eventListWrap.children('div').eq(n).removeClass('none')
      eventListWrap.children('div').eq(n).siblings().addClass('none');
    })

  }) // $.ajax
})(jQuery);