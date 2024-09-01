var page = 1;
var exitImg;
var pageLabel;
var TMP;


function exitImgCb() {
  exit_game();
}
function nextPage(){
  if (page==29){
    page=1
  }else{
    page++;
  }
    set_img_src(TMP,"PAGE"+page.toString())
    set_label_text(pageLabel,page.toString())
}
function regCommonEvent() {}
function resourceInit() {
  var events = [7];
  exitImg = create_img(0, "return.bin", 45, 6);
  addEvent(exitImg, events, exitImgCb);
  var nextImg = create_img(0, "right.bin", 78, 390);
  addEvent(nextImg, events, nextPage);
  pageLabel = create_label(0, 0, 69, 192, 30);
  set_label_color(pageLabel, "#FFFFFF");
  set_label_content_center(pageLabel);
  set_label_text(pageLabel, "0");
  TMP=create_img(0,"PAGE1",0,96)
  set_label_text(pageLabel,page.toString())
}
function dataInit() {}
function main() {
  regCommonEvent();
  resourceInit();
  dataInit();
}
main();
