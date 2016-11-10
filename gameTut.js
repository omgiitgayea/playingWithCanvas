/**
 * Created by GodaiYuusaku on 11/10/16.
 */
var ctx;
var myGamePiece;
var bounceCount = 0;

function startGame() {
    var canvas = "<canvas id='gameArea' width='480' height='270' style='border: 1px solid #d3d3d3; background-color: #f1f1f1;'></canvas>";
    $("body").append(canvas);
    ctx = $("#gameArea")[0].getContext("2d");
    myGamePiece = new component(30, 30, "red", 10, 120);
    setInterval(updateGameArea, 20);
}

startGame();

function component(width, height, color, x, y)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx.fillStyle = color;
    this.update = update;
}

function update()
{
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

function clear()
{
    ctx.clearRect(0, 0, $("#gameArea")[0].width, $("#gameArea")[0].height);
}

function updateGameArea()
{
    clear();
    if (myGamePiece.x <= ($("#gameArea")[0].width - myGamePiece.width)) {
        myGamePiece.x += 2;
    }
    else
    {
        myGamePiece.x -= 100 - (5 * bounceCount);
        bounceCount++;
    }
    if (bounceCount === 20)
    {
        myGamePiece.x = $("#gameArea")[0].width - myGamePiece.width;
    }
    myGamePiece.update();
}