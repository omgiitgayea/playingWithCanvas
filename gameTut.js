/**
 * Created by GodaiYuusaku on 11/10/16.
 */
var ctx;
var myGamePiece;

function startGame() {
    var canvas = "<canvas id='gameArea' width='480' height='270' style='border: 1px solid #d3d3d3; background-color: #f1f1f1;'></canvas>";
    $("body").append(canvas);
    ctx = $("#gameArea")[0].getContext("2d");
    myGamePiece = new component(30, 30, "red", 10, 120);
}

startGame();

function component(width, height, color, x, y)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}