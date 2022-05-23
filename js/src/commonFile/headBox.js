// headBox.js
(function($){
  // 변수
  var headBox = $('#headBox');
  var navBox = headBox.find('#navBox');
  var searchBtn = navBox.find('.search_btn');
  var headerSearch = headBox.find('.header_search');

  searchBtn.find('a').on('click', function(e){
    e.preventDefault();
    headerSearch.slideToggle();
  })
})(jQuery);