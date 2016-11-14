/**
 * Created by GodaiYuusaku on 11/14/16.
 */
var
    liara,
    canvas,
    renderingContext,
    width,
    height;

var frames = 0;

function main()
{
    windowSetup();
    canvasSetup();
    loadGraphics();

    $("body").append(canvas);
    liara = new Character();
}

function canvasSetup()
{
    canvas = document.createElement("canvas");

    canvas.style.border = "15px solid #382b1d";

    canvas.width = width;
    canvas.height = height;

    renderingContext = canvas.getContext("2d");
}

function windowSetup()
{
    width = window.innerWidth;
    height = window.innerHeight;

    var inputEvent = "touchstart";
    if (width >= 500)
    {
        width = 380;
        height = 430;
        inputEvent = "mousedown";
    }

    // Create a listener on the input event
    // document.addEventListener(inputEvent, onpress);
}

function loadGraphics()
{
    // initiate the sprite sheet
    var img = new Image();
    img.src = "images/massEffectSpriteSheet.png";       // guess what, the ME sheet doesn't have transparency
    img.onload = function ()
    {
        initSprites(this);
        charSprite[0].draw(renderingContext, 50, 50);
        gameLoop();
    };



}

function gameLoop()
{
    update();
    render();

    window.requestAnimationFrame(gameLoop);
}

function update()
{

    frames++;
}

function render()
{

}