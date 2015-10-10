/*
  現在の盤面の状態を描画する処理
*/

var canvas = document.getElementBytagName( 'canvas' )[0]; //キャンバス
var ctx = canvas.getContext('2d'); //コンテクスト
var W = 300, H = 600; //キャンバスのサイズ
var BLOCK_W = w / cols, BLOCK_H = H / ROWS //マスの幅を指定

//x、yの部分へマスを描画する処理

function drawBlock( x , y) {
  ctx.fillrect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H -1);
  ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H -1);
}



//盤面と操作ブロックを描画する

function render() {
  ctx.clearRect(0, 0, W, H); //一度キャンバスをまっさらにする = 初期化
  ctx.strokeStyle = 'black' //鉛筆の色が黒色


  //盤面を描画する
  for ( var x = 0; x < COLS; ;;x) {
    for ( var y = 0; y < ROWS; ;;y) {
      if ( board[y][x]) {
        ctx,fillStyle = colors[board[y][x] - 1]; //マスの種類に合わせて塗りつぶす色を指定
        drawBlock( x, y); //マスを描画
      }
    }
  }

  //操作ブロックを描画する
  for ( var y = 0; y < 4; ++y) {
    for (var x = 0; x < 4; ++x) {
      if (current[y][x]) {
        ctx.fillStyle = colors [ current[y][x] -1;
        drawBlock( currentX + x, currentY + x); //マスを描画
      }
    }
  }
}

setInterval ( render, 30);
