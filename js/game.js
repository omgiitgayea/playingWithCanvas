/**
 * Created by GodaiYuusaku on 11/14/16.
 */
var
    liara,
    blocksArray = [],
    rocksArray = [],
    canvas,
    renderingContext,
    width,
    height,
    currentX,
    currentState,
    offsetBlocks,
    offsetRocks,
    myGradient,
    myGroundGradient;

var frames = 0,
    states = {Splash: 0, Game: 1, Score: 2},
    numSmashyThings;

var UPSPEED = 20,
    GRAVITY = 1,
    XSPEED = 2,
    BOTTOM_PCT = 0.15,
    NUM_ROCKS = 100;



function main()
{
    windowSetup();
    canvasSetup();
    loadGraphics();
    numSmashyThings = 5;
    offsetBlocks = width / numSmashyThings;
    offsetRocks = width / NUM_ROCKS;
    $("body").append(canvas);
    liara = new Character();
    for (var i = 0; i < numSmashyThings; i++)
    {
        blocksArray.push(new SmashyThings(i * offsetBlocks, 0, true));
        var spaceBlocks = blocksArray[2 * i].y + 1024 + 200;
        blocksArray.push(new SmashyThings(i * offsetBlocks, spaceBlocks, false));
    }
    for (var i = 0; i < NUM_ROCKS; i++) {
        rocksArray.push(new FloorThings(i * offsetRocks));
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

    myGradient = renderingContext.createLinearGradient(0, 0, 0, height - height * BOTTOM_PCT);
    myGradient.addColorStop(0, "turquoise");
    myGradient.addColorStop(0.25, "darkcyan");
    myGradient.addColorStop(0.85, "mediumblue");
    myGradient.addColorStop(1, "darkblue");

    myGroundGradient = renderingContext.createLinearGradient(0, height - height * BOTTOM_PCT, 0, height);
    myGroundGradient.addColorStop(0, "peru");
    myGroundGradient.addColorStop(1, "saddlebrown");
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
    img.src = "images/myNewSprites1024.png";
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
    for (var i = 0; i < rocksArray.length; i++)
    {
        rocksArray[i].update();
        if (rocksArray[i].x <= 0 - rockSprite[rocksArray[i].rockType].width)
        {
            rocksArray.splice(0, 1);
            rocksArray.push(new FloorThings(width));
        }
    }
    if (currentState === states.Game) {
        for (var i = 0; i < blocksArray.length; i++) {
            blocksArray[i].update();
            if (blocksArray[i].x <= 0 - smashSprite.width)
            {
                blocksArray.splice(0, 2);
                blocksArray.push(new SmashyThings(0, 0, true));
                var spaceBlocks = blocksArray[blocksArray.length - 1].y + 1024 + 200;
                blocksArray.push(new SmashyThings(0, spaceBlocks, false));
            }
        }
    }
}

function render()
{
    if (currentState != states.Score) {
        renderingContext.fillStyle = myGradient;
        renderingContext.fillRect(0, 0, width, height - height * BOTTOM_PCT);
        liara.draw();
        if (currentState === states.Game) {
            for (var i = 0; i < blocksArray.length; i++) {
                blocksArray[i].draw();
            }
        }
        // backgroundSprite.draw(renderingContext, 0, height - backgroundSprite.height);
        renderingContext.fillStyle = myGroundGradient;
        renderingContext.fillRect(0, height - height * BOTTOM_PCT, width, height * BOTTOM_PCT);
        for (var i = 0; i < rocksArray.length; i++)
        {
            rocksArray[i].draw();
        }
    }
    else if (currentState == states.Score)
    {
        // renderingContext.save();
        // renderingContext.fillStyle = "rgba(0, 0, 0, 0.2)";
        // renderingContext.fillRect(0, 0, width, height);
        // renderingContext.restore();
    }
}

function onpress()
{
    if (currentState === states.Game) {
        liara.y -= UPSPEED;
    }
}