/**
 * Created by GodaiYuusaku on 11/14/16.
 */
var
    liara,
    canvas,
    renderingContext,
    width,
    height,
    dx;

var frames = 0,
    currentSprite = 0,
    dy = 0,
    currentY = 50;

var FRAMES_PER_IMAGE = 5,
    GRAVITY = 5,
    UPSPEED = 15;

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
    document.addEventListener(inputEvent, onpress);
}

function loadGraphics()
{
    // initiate the sprite sheet
    var img = new Image();
    img.src = "images/massEffectSpriteSheet.png";
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
    if (frames % FRAMES_PER_IMAGE === 0) {
        if (currentSprite < charSprite.length - 1 || currentSprite === 0) {
            currentSprite++;
        }
        else {
            currentSprite--;
        }

        if (currentY + charSprite[currentSprite].height < height)
        {
            currentY += GRAVITY;
        }
        else
        {
            currentY = height - charSprite[currentSprite].height;
        }
        if (currentY < 0)
        {
            UPSPEED = 0;
            GRAVITY = 50;
        }
    }
}

function render()
{

    renderingContext.clearRect(0, 0, width, height);
    if ((UPSPEED === 0 && (currentY + charSprite[currentSprite].height >= height)) || (currentY + charSprite[currentSprite].height >= height))
    {
        charSprite[0].draw(renderingContext, 50, height - charSprite[0].height);
        UPSPEED = 0;
    }
    else
    {
        charSprite[currentSprite].draw(renderingContext, 50, currentY);
    }

}

function onpress()
{
    currentY -= UPSPEED;
    // render();
}