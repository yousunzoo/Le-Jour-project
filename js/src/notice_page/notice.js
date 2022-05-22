// notice.js
// 기능설명
/**
 * 공지 데이터 불러와서 최신순으로 배치
 * 공지 클릭 시 해당 모달창 띄우도록
 */

(function($){
var jsonData = '../data/notice_data.json';
$.getJSON(jsonData, function(data){
var noticeData = data.reverse();

// step 1. data 불러와서 내용 삽입
// 변수
var noticeBox = $('#noticeBox');
var noticeTable = noticeBox.find('.notice_table');
var tableBody = noticeTable.find('tbody');
var dataLen = noticeData.length;
var bodyCode = '<tr><td class="num"></td><td class="no_name"></td><td class="no_writer"></td><td class="no_date"></td></tr>'

var i=0;
var dataN, dataLink, tr, tdNum, tdName, tdLink, tdWriter, tdDate;
tableBody.empty();

for (; i < dataLen; i++){
  tableBody.append(bodyCode);
  dataN = noticeData[i];
  tr = tableBody.children('tr').eq(i);
  tdNum = tr.find('.num');
  tdName = tr.find('.no_name');
  tdWriter = tr.find('.no_writer');
  tdDate = tr.find('.no_date');

  tdNum.text(dataN.number);
  tdName.text(dataN.title);
  tdWriter.text(dataN.writer);
  tdDate.text(dataN.date);
  
}

tr = tableBody.children('tr');

// step 2. tr 클릭했을 때 해당 모달 창 띄우기
// 변수
var modalWindow = noticeBox.find('.notice_modal_window');
var modalData = modalWindow.find('.modal_data');
var closeBtn = modalData.find('.close_btn');
var modalContent = modalData.find('.modal_content');
var modalContentCode = '<div class="modal_title"><h3 class="n_title"></h3><p class="n_writer"></p></div><div class="modal_con"><img src="../../img/notice/notice_01.jpg" alt="notice 01"></div>'
var modalTitle, modalWriter, modalImg, modalAlt;

modalWindow.hide();

tr.on('click', function(){
  modalContent.empty();
  modalContent.append(modalContentCode);
  var j = $(this).index();

  var modalN = modalContent;
  modalTitle = modalN.find('.n_title');
  modalWriter = modalN.find('.n_writer');
  modalImg = modalN.find('img');
  modalUrl = "../../img/notice/";
  modalAlt = modalN.find('img').attr('alt');

  dataN = noticeData[j];

  modalTitle.text(dataN.title);
  modalWriter.text(dataN.writer);
  modalImg.attr('src', modalUrl+dataN.content);
  modalImg.attr('alt', dataN.id);

  modalWindow.fadeIn();
  
});

closeBtn.on('click', function(e){
  e.preventDefault();
  modalWindow.fadeOut();
})

})
})(jQuery);