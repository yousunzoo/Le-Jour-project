// reviewBox.js
/** 기능 설명
 * json 문서 불러오기
 * review_data 길이만큼 li 생성 -- append
 * 각각의 카드에 맞는 내용 삽입 -- css, text, attr
 * review slide 버튼 눌렀을 때 구동 및 자동 슬라이드 구현 (요소 강제 이동)
 * 해당 li 클릭 시 해당 하는 modal 창 띄우도록
 */
(function($){
// json 문서 불러오기
$.ajax({
  url:"../data/review_data.json",
  context : document.body
}).done(function(data){
  var reviewData = data;
  
  // 1. review_data 생성 및 내용 삽입
  // 변수
  var reviewBox = $('#reviewBox');
  var liEl = '<li><a href="#"><div class="review_img"></div><div class="review_content"><p class="review_con"></p><div class="review_product"><p class="item_name_en"></p><p class="item_name_ko"></p><img src="../img/main_page/reviewBox/star-fill.png" alt="별점 만점"></div></div></a></li>'

  var cardArea = $('.review_slide_wrap');
  var cardUl = cardArea.find('.review_list');


  var i=0;
  var len = reviewData.length;

  for(; i<len; i +=1){
    cardUl.append(liEl);
  }

  var cardLi = cardUl.children('li');

  // 함수
  var cardInsertFn = function(n){
    var list = reviewData[n];
    var liN = cardLi.eq(n);
    var listID = list.id;
    var reviewImg = liN.find('.review_img');
    var reviewImgUrl = 'url("../img/main_page/reviewBox/'+ list.image +'")';
    var reviewCon = liN.find('.review_con');
    var itemEn = liN.find('.item_name_en');
    var itemKo = liN.find('.item_name_ko');

    liN.attr('id',listID);
    reviewImg.css({'backgroundImage' : reviewImgUrl});
    reviewCon.text(list.content);
    itemEn.text(list.productEn);
    itemKo.text(list.productKo);
  } // cardInsertFn()

  for (i=0; i<len; i+=1){
    cardInsertFn(i)
  }; //카드리스트에 각각 내용 삽입

  // 카드 갯수에 맞게 ul 길이 설정
  var liW = cardLi.outerWidth(true);
  cardUl.css({width:liW*len + 'px'})

  // 2. next,prvbtn 활성화
  // 변수
  var slideSet = $('.review_slide_area');
  var btnsArea = reviewBox.find('.review_btns');
  var nextBtn = btnsArea.find('.next');
  var prevBtn = btnsArea.find('.prev');

  var slideList = slideSet.find('.review_list');
  var slideLi = slideList.children('li');
  var originLiLen = slideLi.length;

  var i = 0;
  var permission = true;



  // 함수
  var nextBtnFn = function(){
    if(permission){

      permission = false;

      slideList.stop().animate({'marginLeft':(-1)*liW+'px'}, function(){
        var firstLi = slideLi.eq(0);
        slideList.append(firstLi); // 요소 강제이동
        slideList.css({'marginLeft':0});
        slideLi = slideList.children('li'); // 순서 재배치

        permission = true;
      });
    }
  }

  var prevBtnFn = function(){
    if(permission){

      permission = false;

      var liLast = slideLi.eq(-1);
      slideList.prepend(liLast);
      slideList.css({'marginLeft':(-1)*liW+'px'});

      slideList.stop().animate({marginLeft:0}, 500, function(){
        slideLi = slideList.children('li');
        permission = true;
      })
    }
  }


  nextBtn.on('click', function(e){
    e.preventDefault();
    nextBtnFn();
  })

  prevBtn.on('click', function(e){
    e.preventDefault();
    prevBtnFn();
  })

  // 3. 해당 li 클릭 시 해당하는 모달 창 띄우기
  // - 누르면 해당 id에 속하는 내용 띄우고
  // - x 버튼 누르면 다시 내용 사라지도록

  // 변수
  var modalWindow = reviewBox.find('.review_modal_window');
  var modalData = modalWindow.find('.modal_data');
  var modalCon = modalData.find('.modal_content');
  var modalImg = modalCon.find('.modal_img');
  var goodsImg = modalCon.find('.goods_img');
  var goodsTit = modalCon.find('.goods_tit');
  var reviewT = modalCon.find('.review_text');
  var closeBtn = modalData.find('.close_btn');


  // 이벤트
  slideLi.find('a').on('click', function(e){
    e.preventDefault();
    var par = $(this).parent().index(); // a 부모요소인 li의 인덱스 값
    var liID = slideLi.eq(par).attr('id');
    var j = liID - 1;
    var list = reviewData[j];
    var imgUrl = 'url("../img/main_page/reviewBox/'+ list.image +'")';
    var goodsImgUrl = 'url("../img/main_page/reviewBox/' +list.product_img +'")';

    modalImg.css({'backgroundImage':imgUrl});
    goodsImg.css({'backgroundImage':goodsImgUrl});
    goodsTit.text(list.productKo);
    reviewT.text(list.content);

    modalWindow.fadeIn();
    closeBtn.focus();
  })
  closeBtn.find('button').on('click', function(e){
    e.preventDefault();
    modalWindow.fadeOut();
  })

}) // $.ajax
})(jQuery);
