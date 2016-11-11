/**
 * Created by Godai Yuusaku on 11/10/2016.
 */
var WIDTH;
var HEIGHT;
var ctx;

var dx = 10;
var dy = 0;
var accely = 5;
var radius = 15;
var x = radius;
var y = radius;
var friction = .5;

function init()
{
    var canvas = "<canvas id='canvasArea' width='960' height='600' style='border: 1px solid #d3d3d3; background-color: #f1f1f1;'></canvas>";
    $("body").append(canvas);
    ctx = $("#canvasArea")[0].getContext("2d");
    WIDTH = $("#canvasArea").width();
    HEIGHT = $("#canvasArea").height();
    return setInterval(draw, 100);
}

init();

function ball(x, y, radius)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.stroke();
}

function clear()
{
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
    clear();
    ball(x, y, radius);

    x += dx;
    dy += accely;
    y += dy;

    if (x + dx > WIDTH)
    {
        x = WIDTH - radius;
        dx = -dx;
    }
    if (x + dx < 0)
    {
        x = radius;
        dx = -dx;
    }

    if ((y + dy) > HEIGHT)
    {
        dy = -dy;
        if (dx < 0)
        {
            dx += friction;
        }
        else
        {
            dx -= friction;
        }
        if (Math.abs(dy + accely) <= (3 * accely))
        {
            dy = 0;
            accely = 0;
            dx = 0;
            friction = 0;
        }
        y = HEIGHT - radius;
    }
}