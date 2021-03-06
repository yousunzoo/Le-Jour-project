// productBox.js
/**
 * 기능 구현
 * - productBox 영역 탭메뉴 구현
 * - handhelds_ mobile에서 tab 부분 스와이프 가능하도록
 * - 각 탭에 해당하는 상품 카드 생성 및 항목 세팅
 * - 카드에 mouse 올리면 장바구니 창 나타나도록
 * - next, prev 버튼 구현
 */
(function($){
// 1. json data 불러오기
$.ajax({
  url : "../data/goods_list_data.json",
  context : document.body
}).done(function(data){
  var deviceCk = $.CheckType;
  var productData = data;

  var i = 0;
  var len = productData.length;
  var tabTitle = [];
  for ( ; i < len; i++){
    tabTitle.push(productData[i].type);
  }

  // 2. product_tab_list title 설정
  // 중복되는 배열의 값 정리
  var tabTitleCk = tabTitle.filter(function(data, index){
    return tabTitle.indexOf(data) === index;
  })

  // console.log(tabTitleCk);

  // tab menu 내용 구성에 맞는 목록 체크

  var tabMenuSet;
  var tabMenuFn = function(n){
    tabMenuSet = productData.filter(function(data){
      return data.type === tabTitleCk[n];
    });
  }

  // console.log(tabMenuSet);

  // ------------------------------------------------
  // 2.불러온 json data 기반으로 구성 배치
  // 변수
  var productBox = $('#productBox');
  var tabArea = productBox.find('.product_tab');
  var cardArea = productBox.find('.card_area');

  // tabTitle 내부에 탭메뉴 제목부 구성 : tabTitleCk 이용
  tabArea.html('<ul class="product_tab_list tab_title"></ul>');
  var tabTUl = tabArea.children('ul');
  var titleEl = '<li><button type="button"><span></span></button></li>';
  var tabTLen = tabTitleCk.length;

  for (i=0; i<tabTLen; i++){
    tabTUl.append(titleEl);
    tabTUl.find('li').eq(i).find('span').text(tabTitleCk[i]);
  }; // 각 배열에 해당하는 제목 붙여넣기

  var tabTLi = tabTUl.find('li');
  var tabBtn = tabTLi.find('button');
  tabTLi.eq(0).addClass('on');

  // -----------------------------------------------
  // 3. 내용을 구성하기 위한 세팅 및 함수 처리
  cardArea.html('<ul class="product_list clearfix last_margin"></ul>');
  var cardUl = cardArea.find('.product_list');

  var productMenuSetFn = function(k){
    tabMenuFn(k);
    cardUl.empty();
    var productListSet = '<li><a href="#"><div class="img_box"><div class="card_img"></div><div class="card_img_bg"></div></div><div class="card_con"><dl class="card_content"><dt><p class="item_name_en">Le Jour family set</p><p class="item_name_ko"></p></dt><dd><span class="origin_price"></span><span class="arrow"> &#8594; </span><span class="now_price"></span></dd></dl></div></a><div class="card_link blind_area clearfix"><div class="card_link_bg"></div><a href="#"><i class="fa-regular fa-credit-card"></i>바로구매</a><button type="button" class="wish"><i class="fa-regular fa-heart"></i><span>위시리스트</span></button><button type="button" class="cart"><i class="fa-solid fa-cart-shopping"></i><span>장바구니</span></button></div></li>'

    var j=0;
    var tabSetLen = tabMenuSet.length;
    var liIndex, tSet, hrefText, imgUrl;

    for ( ; j<tabSetLen; j++){
      cardUl.append(productListSet);
      liIndex = cardUl.children('li').eq(j);
      tSet = tabMenuSet[j];
      imgUrl = 'url("../../img/main_page/productBox/'+ tSet.image +'")';
      hrefText = './' + tSet.link;

      liIndex.find('.card_img').css({'backgroundImage':imgUrl});
      liIndex.find('.item_name_en').text(tSet.nameEn);
      liIndex.find('.item_name_ko').text(tSet.nameKo);
      liIndex.find('.origin_price').text(tSet.origin_price);
      liIndex.find('.now_price').text(tSet.now_price);
      liIndex.children('a').attr({href:hrefText});

      if(tSet.origin_price == ""){
        liIndex.find('.arrow').empty()
      }
    }
    var li = cardUl.find('li');
    var liLen = li.length;
    var liW = li.outerWidth(true);

    cardUl.css({'width':liW*liLen+'px'}) 
    if(deviceCk === 'laptop'){
      cardArea.css({'width':liW*3+'px'})
    }else{
    cardArea.css({'width':liW*4+'px'})
    }
  }


  productMenuSetFn(0);

  // 4. 탭메뉴 처리 설정
  
  
  tabBtn.on('click', function(e){
    e.preventDefault();
    var n = $(this).parent().index();
    tabBtn.parent().eq(n).addClass('on');
    tabBtn.parent().eq(n).siblings().removeClass('on');

    productMenuSetFn(n);
    cardUl = cardArea.find('.product_list');
    cardUl.css({'marginLeft':0});
    cardLi = cardUl.children('li');
    liLen = cardLi.length;
    
    i=0;
    if(deviceCk === 'smartphone' || deviceCk === 'tablet' && liLen > 2){
      nextBtn.show();
    }else if(liLen <= 4){
      slideBtn.hide();
    } else {
      prevBtn.hide();
      nextBtn.show();
    }
  })

  var cardLi = cardUl.find('li');

  if(deviceCk !== 'smartphone' && deviceCk !== 'tablet'){
  cardLi.on('mouseenter', function(e){
    $(this).find('.card_link').slideDown(300);
  })

  cardLi.on('mouseleave', function(e){
    $(this).find('.card_link').slideUp(300);
  })
  }

  // 변수
  var btnArea = productBox.find('.product_btns');
  var slideBtn = btnArea.children('button')
  var nextBtn = btnArea.children('.next')
  var prevBtn = btnArea.children('.prev')
  var liW = cardLi.outerWidth(true);

  
  var liLen = cardLi.length;
  var timed = 500;

  // 함수
  var btnClickFn = function(){

    if ( i <= 0){
      i=0;
      prevBtn.hide();
    }else if (i >= liLen - 1 ){
      i = liLen - 1;
      nextBtn.hide();
    }else{
      slideBtn.show();
    }
    
    cardUl.stop().animate({'marginLeft':(-1)*liW*i+'px'}, timed);
  };

  i=0;
  btnClickFn(0);

  // 이벤트
  slideBtn.on('click', function(e){
    e.preventDefault();
    cardLi = cardUl.find('li');
    liLen = cardLi.length;
    
    var btnNext = $(this).hasClass('next');
    (btnNext) ? i+=1 : i -= 1;

    btnClickFn();

    console.log(i);
  })
}) // $.ajax
})(jQuery);

