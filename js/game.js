/**
 * Created by GodaiYuusaku on 11/14/16.
 */
var
    liara,
    canvas,
    renderingContext,
    width,
    height,
    currentX,
    currentState;

var frames = 0,
    currentSprite = 0,
    currentY = 50,
    states = {Splash: 0, Game: 1, Score: 2};

var FRAMES_PER_IMAGE = 5,
    GRAVITY = 2,
    UPSPEED = 20,
    XSPEED = 2;

function Character()
{
    this.frame = 0;
    this.animation = [0, 1, 2, 1];
    this.x = 200;
    this.y = -50;
    this.rotation = Math.PI / 2; // + (20 * Math.PI / 180);

    this.update = function()
    {
        var n = currentState === states.Splash ? 10 : 5;

        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;            // makes sure that we stay within the animation array
        if (this.y < (height - charSprite[0].height) - 50) {
            this.y += GRAVITY;
            // this.x += XSPEED;
        }
        else
        {
            this.y = height - charSprite[0].height - 50;
            this.frame = 0;
            // this.x += XSPEED;
        }
    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x + charSprite[0].height, this.y + charSprite[0].width);
        renderingContext.rotate(this.rotation);

        var n = this.animation[this.frame];
        charSprite[n].draw(renderingContext, 50, 50);

        renderingContext.restore();
    }
}

function main()
{
    windowSetup();
    canvasSetup();
    loadGraphics();

    $("body").append(canvas);
    liara = new Character();
    // currentState = states.Splash;
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
        width = width * 0.8;
        height = height * 0.8;
        inputEvent = "mousedown";
    }

    currentX = width;
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
        // charSprite[0].draw(renderingContext, 50, 50);
        // for (var i = 0; i < testSprite.length; i++)
        // {
        //     testSprite[i].draw(renderingContext, width + i * 70, 50);
        // }
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
    liara.update();
    // if (frames % FRAMES_PER_IMAGE === 0) {
    //     if (currentSprite < charSprite.length - 1 || currentSprite === 0) {
    //         currentSprite++;
    //     }
    //     else {
    //         currentSprite--;
    //     }
    //
    //     if (currentY + charSprite[currentSprite].height < height)
    //     {
    //         currentY += GRAVITY;
    //     }
    //     else
    //     {
    //         currentY = height - charSprite[currentSprite].height;
    //     }
    //     if (currentY < 0)
    //     {
    //         UPSPEED = 0;
    //         GRAVITY = 50;
    //     }
    //
    //     currentX -= XSPEED;
    // }
}

function render()
{
    renderingContext.clearRect(0, 0, width, height);
    liara.draw();
    // renderingContext.clearRect(0, 0, width, height);
    //
    // for (var i = 0; i < testSprite.length; i++)
    // {
    //     if((currentX + i * 70) <= -1 * (testSprite[i].width))
    //     {
    //         currentX = width;
    //     }
    //     testSprite[i].draw(renderingContext, currentX + i * 70, 50);
    // }
    //
    // if (currentX <= -1 * (testSprite.width))
    // {
    //     currentX = width;
    // }
    // if ((UPSPEED === 0 && (currentY + charSprite[currentSprite].height >= height)) || (currentY + charSprite[currentSprite].height >= height))
    // {
    //     charSprite[0].draw(renderingContext, 50, height - charSprite[0].height);
    //     UPSPEED = 0;
    // }
    // else
    // {
    //     charSprite[currentSprite].draw(renderingContext, 50, currentY);
    // }

}

function onpress()
{
    liara.y -= UPSPEED;
}