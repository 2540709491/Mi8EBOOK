var board = new Array();
var added = new Array();
var cell = new Array();
var lastOver = 0;
var score = 0;
var hscore = 0;
var firstFlag = 0;
var jsonObj = {
  firstFlag: 0,
  highestScore: 0,
  lastOver: 0,
  lastScore: 0,
  allCellValue: [],
};
var bgImg, exitImg, tipImg, resetImg, opImg, overImg, winImg;
var scoreLabel, hsLabel;
function getPosTop(i, j) {
  return 126 + i * 46;
}
function getPosLeft(i, j) {
  return 6 + j * 46;
}
function saveData() {
  jsonObj["lastOver"] = 1;
  jsonObj["firstFlag"] = firstFlag;
  jsonObj["allCellValue"] = board;
  jsonObj["highestScore"] = hscore;
  jsonObj["lastScore"] = score;
  saveDataToFile(jsonObj);
}
function opImgCb() {
  hiddenObj(0);
  if (firstFlag == 0) {
    generateOneNumber();
    generateOneNumber();
  }
  firstFlag = 1;
}
function overImgCb() {
  hiddenObj(1);
}
function winImgCb() {
  hiddenObj(2);
}
function exitImgCb() {
  exit_game();
}
function tipImgCb() {
  displayObj(0);
}
function resetImgCb() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        board[i][j] = 0;
        updateOneCell(i, j, board[i][j]);
      }
    }
  }
  score = 0;
  var tmp = "" + score + "";
  set_label_text(scoreLabel, tmp);
  generateOneNumber();
  generateOneNumber();
  hiddenObj(1);
  hiddenObj(2);
}
function displayObj(index) {
  if (index == 0) {
    set_obj_display(opImg);
  }
  if (index == 1) {
    set_obj_display(overImg);
  }
  if (index == 2) {
    set_obj_display(winImg);
  }
}
function hiddenObj(index) {
  if (index == 0) {
    set_obj_hidden(opImg);
  }
  if (index == 1) {
    set_obj_hidden(overImg);
  }
  if (index == 2) {
    set_obj_hidden(winImg);
  }
}
function createTipPage() {
  opImg = create_obj_with_style(0, 0, 118, 192, 196, 102, 0);
  create_img(opImg, "up.bin", 74, 10);
  create_img(opImg, "down.bin", 74, 142);
  create_img(opImg, "left.bin", 8, 76);
  create_img(opImg, "right.bin", 140, 76);
}
function createGameOverPage() {
  overImg = create_obj_with_style(0, 0, 118, 192, 196, 102, 0);
  create_img(overImg, "over.bin", 13, 80);
}
function createGameWinPage() {
  winImg = create_obj_with_style(0, 0, 118, 192, 196, 102, 0);
  create_img(winImg, "win.bin", 34, 80);
}
function createHiddenPage() {
  createTipPage();
  var events = [7];
  addEvent(opImg, events, opImgCb);
  hiddenObj(0);
  createGameOverPage();
  addEvent(overImg, events, overImgCb);
  hiddenObj(1);
  createGameWinPage();
  addEvent(winImg, events, winImgCb);
  hiddenObj(2);
}
function resourceInit() {
  var events = [7];
  bgImg = create_img(0, "bg.bin", 0, 0);
  exitImg = create_img(0, "return.bin", 45, 6);
  addEvent(exitImg, events, exitImgCb);
  tipImg = create_img(0, "Info.bin", 75, 370);
  addEvent(tipImg, events, tipImgCb);
  resetImg = create_img(0, "reset.bin", 45, 424);
  addEvent(resetImg, events, resetImgCb);
  scoreLabel = create_label(0, 6, 342, 80, 30);
  set_label_font(scoreLabel, 4163);
  set_label_color(scoreLabel, 0x5e4b42);
  set_label_content_align(scoreLabel, 1);
  set_label_text(scoreLabel, "0");
  hsLabel = create_label(0, 106, 342, 80, 30);
  set_label_font(hsLabel, 4163);
  set_label_color(hsLabel, 0x5e4b42);
  set_label_content_align(hsLabel, 3);
  set_label_text(hsLabel, "0");
}
function dataInit() {
  for (var i = 0; i < 4; i++) {
    board[i] = new Array();
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0;
      cell[i * 4 + j] = create_img(
        0,
        "R_67.bin",
        getPosLeft(i, j),
        getPosTop(i, j)
      );
    }
  }
  for (var i = 0; i < 4; i++) {
    added[i] = new Array();
    for (var j = 0; j < 4; j++) {
      added[i][j] = 0;
    }
  }
  createHiddenPage();
  readDataFromFile(jsonObj);
  updateLocalData();
  if (firstFlag == 0) {
    displayObj(0);
    return;
  }
  if (lastOver == 1) {
    return;
  }
  generateOneNumber();
  generateOneNumber();
}
function generateOneNumber() {
  if (nospace(board)) return false;
  var tryCount = 3;
  var randx = rand_num() % 4;
  var randy = rand_num() % 4;
  var randNumber = rand_num() % 100 > 50 ? 4 : 2;
  while (tryCount > 0) {
    if (board[randx][randy] == 0) {
      board[randx][randy] = randNumber;
      updateOneCell(randx, randy, board[randx][randy]);
      return true;
    }
    randx = rand_num() % 4;
    randy = rand_num() % 4;
    tryCount--;
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        board[i][j] = 2;
        updateOneCell(i, j, board[i][j]);
        return true;
      }
    }
  }
  return true;
}
function isGameOver() {
  if (nospace(board) && nomove(board)) gameover();
}
function updateLocalData() {
  firstFlag = Number(jsonObj["firstFlag"]);
  hscore = Number(jsonObj["highestScore"]);
  var tmp2 = "" + hscore + "";
  set_label_text(hsLabel, tmp2);
  lastOver = Number(jsonObj["lastOver"]);
  score = 0;
  if (lastOver == 1) {
    var arrCell = jsonObj["allCellValue"].split(",");
    var arrCellLen = arrCell.length;
    var k = 0;
    score = Number(jsonObj["lastScore"]);
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (arrCellLen < k) {
          return;
        }
        board[i][j] = Number(arrCell[k]);
        if (board[i][j] != 0) {
          updateOneCell(i, j, board[i][j]);
        }
        k++;
      }
    }
  }
  var tmp = "" + score + "";
  set_label_text(scoreLabel, tmp);
}
function gameover() {
  jsonObj["highestScore"] = hscore;
  jsonObj["lastOver"] = 0;
  jsonObj["lastScore"] = score;
  jsonObj["allCellValue"] = board;
  jsonObj["firstFlag"] = firstFlag;
  saveDataToFile(jsonObj);
  displayObj(1);
}
function gameWin() {
  jsonObj["highestScore"] = hscore;
  jsonObj["lastOver"] = 0;
  jsonObj["lastScore"] = score;
  jsonObj["allCellValue"] = board;
  jsonObj["firstFlag"] = firstFlag;
  saveDataToFile(jsonObj);
  displayObj(2);
}
function clearAddedArray() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      added[i][j] = 0;
    }
  }
}
function moveLeft() {
  if (!canMoveLeft(board)) return false;
  clearAddedArray();
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < j; k++) {
          if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
            board[i][k] = board[i][j];
            updateOneCell(i, k, board[i][k]);
            board[i][j] = 0;
            updateOneCell(i, j, board[i][j]);
            continue;
          } else if (
            board[i][k] == board[i][j] &&
            noBlockHorizontal(i, k, j, board)
          ) {
            if (added[i][k] != 0) {
              board[i][k + 1] = board[i][j];
              updateOneCell(i, k + 1, board[i][k + 1]);
              board[i][j] = 0;
              updateOneCell(i, j, board[i][j]);
            } else {
              board[i][k] += board[i][j];
              updateOneCell(i, k, board[i][k]);
              board[i][j] = 0;
              updateOneCell(i, j, board[i][j]);
              added[i][k] = 1;
              updateScore(board[i][k]);
            }
            continue;
          }
        }
      }
    }
  }
  generateOneNumber();
  isGameOver();
  return true;
}
function moveRight() {
  if (!canMoveRight(board)) {
    return false;
  }
  clearAddedArray();
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
            board[i][k] = board[i][j];
            updateOneCell(i, k, board[i][k]);
            board[i][j] = 0;
            updateOneCell(i, j, board[i][j]);
            continue;
          } else if (
            board[i][k] == board[i][j] &&
            noBlockHorizontal(i, j, k, board)
          ) {
            if (added[i][k] != 0) {
              board[i][k - 1] = board[i][j];
              updateOneCell(i, k - 1, board[i][k - 1]);
              board[i][j] = 0;
              updateOneCell(i, j, board[i][j]);
            } else {
              board[i][k] += board[i][j];
              updateOneCell(i, k, board[i][k]);
              board[i][j] = 0;
              updateOneCell(i, j, board[i][j]);
              added[i][k] = 1;
              updateScore(board[i][k]);
            }
            continue;
          }
        }
      }
    }
  }
  generateOneNumber();
  isGameOver();
  return true;
}
function moveUp() {
  if (!canMoveUp(board)) return false;
  clearAddedArray();
  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < i; k++) {
          if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
            board[k][j] = board[i][j];
            updateOneCell(k, j, board[k][j]);
            board[i][j] = 0;
            updateOneCell(i, j, board[i][j]);
            continue;
          } else if (
            board[k][j] == board[i][j] &&
            noBlockVertical(j, k, i, board)
          ) {
            if (added[k][j] != 0) {
              board[k + 1][j] = board[i][j];
              updateOneCell(k + 1, j, board[k + 1][j]);
              board[i][j] = 0;
              updateOneCell(i, j, board[i][j]);
            } else {
              board[k][j] += board[i][j];
              updateOneCell(k, j, board[k][j]);
              board[i][j] = 0;
              updateOneCell(i, j, board[i][j]);
              added[k][j] = 1;
              updateScore(board[k][j]);
            }
            continue;
          }
        }
      }
    }
  }
  generateOneNumber();
  isGameOver();
  return true;
}
function moveDown() {
  if (!canMoveDown(board)) return false;
  clearAddedArray();
  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
            board[k][j] = board[i][j];
            updateOneCell(k, j, board[k][j]);
            board[i][j] = 0;
            updateOneCell(i, j, board[i][j]);
            continue;
          } else if (
            board[k][j] == board[i][j] &&
            noBlockVertical(j, i, k, board)
          ) {
            if (added[k][j] != 0) {
              board[k - 1][j] = board[i][j];
              updateOneCell(k - 1, j, board[k - 1][j]);
              board[i][j] = 0;
              updateOneCell(i, j, board[i][j]);
            } else {
              board[k][j] += board[i][j];
              updateOneCell(k, j, board[k][j]);
              board[i][j] = 0;
              updateOneCell(i, j, board[i][j]);
              added[k][j] = 1;
              updateScore(board[k][j]);
            }
            continue;
          }
        }
      }
    }
  }
  generateOneNumber();
  isGameOver();
  return true;
}
function nospace(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) if (board[i][j] == 0) return false;
  return true;
}
function canMoveLeft(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (board[i][j] != 0 && j != 0)
        if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) return true;
  return false;
}
function canMoveRight(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (board[i][j] != 0 && j != 3)
        if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) return true;
  return false;
}
function canMoveUp(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (board[i][j] != 0 && i != 0)
        if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) return true;
  return false;
}
function canMoveDown(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (board[i][j] != 0 && i != 3)
        if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) return true;
  return false;
}
function noBlockHorizontal(row, col1, col2, board) {
  for (var i = col1 + 1; i < col2; i++) if (board[row][i] != 0) return false;
  return true;
}
function noBlockVertical(col, row1, row2, board) {
  for (var i = row1 + 1; i < row2; i++) if (board[i][col] != 0) return false;
  return true;
}
function nomove(board) {
  if (
    canMoveLeft(board) ||
    canMoveRight(board) ||
    canMoveUp(board) ||
    canMoveDown(board)
  )
    return false;
  return true;
}
function updateScore(num) {
  score = score > num ? score : num;
  var tmp1 = "" + score + "";
  set_label_text(scoreLabel, tmp1);
}
function updateOneCell(i, j, num) {
  var imgstr;
  if (num != 0) {
    imgstr = "n_" + num + ".bin";
  } else {
    imgstr = "R_67.bin";
  }
  set_img_src(cell[i * 4 + j], imgstr);
  if (hscore < score) {
    hscore = score;
    var tmp2 = "" + hscore + "";
    set_label_text(hsLabel, tmp2);
  }
  if (board[i][j] == 2048) {
    gameWin();
    return;
  }
}
function stage2Load() {}
function regCommonEvent() {
  var em1 = new EventMap(0, [0], moveLeft, true);
  var em3 = new EventMap(0, [1], moveRight, true);
  var em2 = new EventMap(0, [2], moveUp, true);
  var em4 = new EventMap(0, [3], moveDown, true);
  var em5 = new EventMap(0, [4], saveData, true);
  registerEvent(em1);
  registerEvent(em2);
  registerEvent(em3);
  registerEvent(em4);
  registerEvent(em5);
  var em6 = new EventMap(0, [0xffff], stage2Load, true);
  registerEvent(em6);
}
function main() {
  regCommonEvent();
  resourceInit();
  dataInit();
}
main();
