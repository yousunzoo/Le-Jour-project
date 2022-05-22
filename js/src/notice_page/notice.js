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

tr.on('click', function(){
  var j = $(this).index();
  dataN = noticeData[j];
  dataLink = "../page/notice/"+dataN.link;

  window.location.href = dataLink;
})

})
})(jQuery);