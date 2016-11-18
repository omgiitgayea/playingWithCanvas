/**
 * Created by GodaiYuusaku on 11/14/16.
 */
var
    liara,
    blocksArray = [],
    canvas,
    renderingContext,
    width,
    height,
    currentX,
    currentState,
    offsetBlocks;

var frames = 0,
    states = {Splash: 0, Game: 1, Score: 2},
    gravity = 0,
    numSmashyThings;

var UPSPEED = 20,
    XSPEED = 5;



function main()
{
    windowSetup();
    canvasSetup();
    loadGraphics();
    numSmashyThings = 1000;
    offsetBlocks = width / numSmashyThings;
    $("body").append(canvas);
    liara = new Character();
    for (var i = 0; i < numSmashyThings; i++)
    {
        blocksArray.push(new SmashyThings(i * offsetBlocks));
        var spaceBlocks = blocksArray[2 * i].y + 200;
        blocksArray.push(new SmashyThingsBottom(i * offsetBlocks, spaceBlocks));
    }

    currentState = states.Game;
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
    if (currentState === states.Game) {
        gravity = 2;
        for (var i = 0; i < blocksArray.length; i++) {
            blocksArray[i].update();
        }
    }
}

function render()
{
    if (currentState != states.Score) {
        renderingContext.clearRect(0, 0, width, height);
        backgroundSprite.draw(renderingContext, 0, height - backgroundSprite.height);
        liara.draw();
        if (currentState === states.Game) {
            for (var i = 0; i < blocksArray.length; i++) {
                blocksArray[i].draw();
            }
        }
    }
}

function onpress()
{
    if (currentState === states.Game) {
        liara.y -= UPSPEED;
    }
}