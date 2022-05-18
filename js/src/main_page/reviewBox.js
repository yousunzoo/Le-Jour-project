// reviewBox.js
/** 기능 설명
 * json 문서 불러오기
 * review_data 길이만큼 li 생성 -- append
 * 각각의 카드에 맞는 내용 삽입 -- css, text, attr
 * review slide 버튼 눌렀을 때 구동 및 자동 슬라이드 구현
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
    var reviewImg = liN.find('.review_img');
    var reviewImgUrl = 'url("../img/main_page/reviewBox/'+ list.image +'")';
    var reviewCon = liN.find('.review_con');
    var itemEn = liN.find('.item_name_en');
    var itemKo = liN.find('.item_name_ko');

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

  var cloneLi, j=0;
  for (; j < originLiLen; j++){
    cloneLi = slideLi.eq(j).clone();
    slideList.append(cloneLi); 
  }
  var newSlideLi = slideList.children('li');
  var newLiLen = newSlideLi.length;
  var play;

  // 함수

  var slideGoFn = function(e){
    play = setInterval(function(e){
      horizontal.trigger('click');
    },1500);
  } // slideGoFn()

  var nextBtnFn = function(){
    if(permission){
      permission = false;
      i++;
      slideList.stop().animate({'marginLeft': (-1)*liW*i +'px'}, 500, 'easeInOutQuad', function(){
        if(i >= originLiLen){
          slideList.css({'marginLeft':0})
          i = 0;
        };
      });
      permission = true;
    };
    } // nextBtnFn()

  var prevBtnFn = function(){
    if(permission){
      permission = false;
      i -= 1;
      slideList.stop().animate({'marginLeft': (-1)*liW*i +'px'},500, 'easeInOutQuad', function(){
        if (i < 0){
          i = originLiLen - 1;
          slideList.css({marginLeft : (-1)*liW*i +'px'})
        };
        permission = true;
      });
    }
  }


  slideList.css({'width' : liW*newLiLen + 'px', 'marginLeft' : (-1)*liW+'px'})


  nextBtn.on('click',function(e){
    e.preventDefault();
    nextBtnFn();
  })

  prevBtn.on('click', function(e){
    e.preventDefault();
    prevBtnFn();
  })
}) // $.ajax
})(jQuery);
