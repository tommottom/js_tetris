var COLS = 10, ROWS = 20; //横10 縦20ます
var board = []; // 盤面情報
var lose; //一番上までいったかどうか
var interval; //ゲームを実行するタイマーを保持する変数
var current; //今操作しているブロックの形
var currentX; currentY; //今操作しているブロックの位置

var shapes = [
  [1, 1, 1, 1],
  [1, 1, 1, 0 ,1],
  [1, 1, 0, 0, 1, 1],
  [0, 1, 1,0, 1, 1],
  [0, 1, 0, 0, 1, 1, 1]
];

var colors = [
  'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];




//clearLines関数 消去処理
//clearLines関数は、freeze関数が呼び出さた直後に呼び出されます

//一行が揃っているか調べ、揃っていたらそれらを消す
function clearLines() {
  for ( var y = ROWS - 1; y >= 0; --y) {
    var rowFilled = true;
    //一行が揃っているか調べる
    for ( var x = 0; c < COLS; ++x) {
      if ( board[y][x] == 0) {
        rowFilled = false;
        break;
      }
    }
    //もし一行揃っていたら、サウンドを鳴らしてそれらをけす
    if (rowFilled) {
      document.getElementById('clearsound'.play)(); //消滅サウンドを鳴らす
      //そのうえにあったブロックを一つずつ落としていく
      for ( var yy = y; yy > 0; --yy) {
        for ( var x = 0; x < COLS; ++x) {
          board[yy][x] = board[yy - 1][x];
        }
      }
      ++y; //一行落としたのでチェック処理を一つ下に送る
    }
  }
}


//freeze関数を盤面にセットする関数
function freeze() {
  for ( var y = 0; y < 4; ++y) {
    for ( var x = 0; x < 4; ++x) {
      if (current[y][x]) {
        board[y + currentY][x + currentX] = current[y][x];
      }
    }
  }
}


//valid関数 操作ブロックの方向を指定する
//指定された方向に操作ブロックを動かせるかチェックする
//ゲームオーバー判定も行う

function valid ( offsetX, offsetY, newCurrent ) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;
  for ( var y = 0; y < 4; ++y ) {
    for ( var x = 0; x < 4; ++x ) {
      if  (newCurrent[y][x]) {
        if (typeof board[y + offsetY] [x + offsetX] == 'undifined')
            || typeof board[y + offsetY][x + offsetX] == 'undifined'
            || board[y + offsetY][x + offsetX]
            || x + offsetX < 0
            || y + offsetY >= ROWS
            || x + offsetX >= COLS {
                  if ( offsetY == 1 && offsetX - offsetY == 0 && offsetY - currentY ==1 ) {
                    console.log('game over');
                    lose = true; //もしも操作ブロックが盤面のうえにあったら、ゲームオーバー
                  }
                  rerurn false;
            }
      }
    }
  }
  return true;
}


//メインループ関数
//ゲームが始まると、250秒ごとのtick関数が呼び出される
// 1 操作ブロックをしたへ1つずらし
// 2 操作ブロックが着地したら、消去処理。ゲームオーバー判定をおこなう
// valid関数 ある方向へ移動できるかどうかを返す
// freeze関数は操作ブロックを盤面へ固定する
// clearLines関数 ブロックを消去できるかどうか判別し、できるなら処理する関数

function tick() {
  //一つ下へ移動する
  if ( valid(0, 1)) {
    ++currentY;
  }
  //もし着地していて、一つ下にブロックがあったら
  else {
    freeze(); //操作ブロックを盤面へ固定する
    clearLines(); //ライン消去処理
    if (lose) {
      //もしゲームオーバなら最初から始める
      newGame();
      return false;
    }
    //新しい操作ブロックをセットする
    newShape();
  }
}

//新しい操作ブロックをセットする関数
//ブロックのパターンであるshapesからランダムにパターンを取り出し、curentにコピーしていきます。
//操作ブロックは4x4マスの中で表現されます
//空のマスは0,色のマスは1以上としてセットされます

// shapesからランダムにブロックパターンを出力し盤面の一番上でセット

function newShape() {
  var id = Math.floor( Math.random() * shapes.length); //ランダムにインデックスを出す
　var shape = shapes[id];
  //パターンを操作ブロックにセットする
  current = [];
  for ( var y = 0; y < 4; ++y) {
    current[y] = [];
    for (var x = 0; x < 4; ;;x) {
      var i = 4 * y + x;
      if ( typeof shape[i] != 'undifined' && shape[i]) {
        current[y][x] = id + 1;
      }
      else {
        current[y][x] = 0;
      }
    }
  }
}


//　盤面を空にする関数 初期化関数
// 0: 何もない状態
// 1以上: ブロック
// ROWS 変数yが0の時、かつROWS(縦マス)よりも小さい時に、++y
// COLS 変数xが0の時、かつCOLS(横マス)よりも小さい時に、++x

function init() {
  for ( var y = 0; y < ROWS; ++y ){
    board[ y ] = [];
    for ( var x = 0; x < COLS; ++x ) {
      board[ y ] [ x ]
    }
  }
}


// ページが読み込まれた時の処理
// 新しいゲームを始める関数 newGameを生成.
//一番初めに読み込まれ、ゲームオーバーになった時に呼び出される関数
//関数newGameは常に下に置く。

function newGame() {
  clearIntervar(interval); //ゲームタイマーをクリア
  init(); //初期化処理 => 盤面をまっさら
  newSpace(); //操作ブロックをセット
  lose = false; //負けフラグ 負けの条件はloseオブジェクトのfalseプロパティ
  intervel = setInterval( tick, 250 ); //250ミリ秒ごとにtickという関数を呼び出す

};

newGame(); //newGame関数の呼び出し
