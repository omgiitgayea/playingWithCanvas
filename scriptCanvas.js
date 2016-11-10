/**
 * Created by Godai Yuusaku on 11/9/2016.
 */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150 , 75);

var ltx = canvas.getContext("2d");
ltx.moveTo(0, 0);
ltx.lineTo(400, 200);
ltx.stroke();

var etx = canvas.getContext("2d");
etx.beginPath();
etx.arc(95, 50, 40, 0, 2*Math.PI);
etx.stroke()