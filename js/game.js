/**
 * Created by GodaiYuusaku on 11/14/16.
 */
var
    liara,
    endAnim,
    blocksArray = [],
    rocksArray = [],
    highScores = [],
    canvas,
    renderingContext,
    width,
    height,
    currentX,
    currentState,
    offsetBlocks,
    offsetRocks,
    myGradient,
    myGroundGradient,
    madeCut,
    spacing;

var frames = 0,
    states = {Splash: 0, Game: 1, Score: 2},
    numSmashyThings,
    myScore = 0,
    gameOver = false,
    cheatMode = false,
    tapEnabled = true,
    controlMode = "Tap";

var UPSPEED = 5,
    GRAVITY = 0.25,
    XSPEED = 2,
    BOTTOM_PCT = 0.15,
    NUM_ROCKS = 100,
    SCALE_FACTOR = 0.5,
    POINTS_PER_DODGE = 15,
    MAX_SCORES = 5,
    NEW_GAME_BUTTON_OFFSET = 15,
    NUM_MODES = 5;


function main() {
    windowSetup();
    canvasSetup();
    loadGraphics();
    if (height > width)
    {
        numSmashyThings = 2;
    }
    else {
        numSmashyThings = 5;
    }
    offsetBlocks = width / numSmashyThings;
    offsetRocks = width / NUM_ROCKS;
    $("body").append(canvas);
    liara = new Character();
    endAnim = new Explosion();

    for (var i = 0; i < NUM_ROCKS; i++) {
        rocksArray.push(new FloorThings(i * offsetRocks));
    }

    currentState = states.Splash;
}

function isTouchDevice()
{
    try {
        document.createEvent("TouchEvent");
        return true;
    }
    catch (event) {
        return false;
    }
}
function canvasSetup() {
    canvas = document.createElement("canvas");

    canvas.id = "canvasArea";

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

function windowSetup() {
    width = window.innerWidth;
    height = window.innerHeight;

    var inputEvent = "touchstart";
    if (!isTouchDevice()) {
        // width = width * 0.8;
        // height = height * 0.8;
        tapEnabled = false;
        inputEvent = "mousedown";
        controlMode = "Click";
    }

    currentX = width;
    // Create a listener on the input event
    document.addEventListener(inputEvent, onpress);
}

function loadGraphics() {
    // initiate the sprite sheet
    var img = new Image();
    var explosionImg = new Image();
    img.src = "images/myNewSprites1024.png";

    img.onload = function () {
        initSprites(this);
        explosionImg.src = "images/explosionSprite512.png";
        explosionImg.onload = function () {
            initExplosion(this);
            gameLoop();
        };
    };
}

function gameLoop() {
    update();
    render();

    window.requestAnimationFrame(gameLoop);
}

function update() {
    frames++;
    liara.update();
    for (var i = 0; i < rocksArray.length; i++) {
        rocksArray[i].update();
        if (rocksArray[i].x <= 0 - rockSprite[rocksArray[i].rockType].width) {
            rocksArray.splice(0, 1);
            rocksArray.push(new FloorThings(width));
        }
    }
    if (currentState === states.Game) {
        for (var i = 0; i < blocksArray.length; i++) {

            blocksArray[i].update();
            if (blocksArray[i].x <= 0 - smashSprite.width) {
                blocksArray.splice(0, 2);
                blocksArray.push(new SmashyThings(0, 0, true));
                var spaceBlocks = blocksArray[blocksArray.length - 1].y + 1024 + spacing;
                blocksArray.push(new SmashyThings(0, spaceBlocks, false));
            }
            var midCharX = SCALE_FACTOR * (liara.x + charSprite[0].width / 2);
            var midRockX = blocksArray[i].x + smashSprite.width / 2;
            var midCharY = SCALE_FACTOR * (liara.y + charSprite[0].height / 2);
            var midRockY = blocksArray[i].y + smashSprite.height / 2;

            if ((blocksArray[i].x + smashSprite.width) >= (SCALE_FACTOR * liara.x)) {
                if (!cheatMode) {
                    if ((midRockX - midCharX) < ((SCALE_FACTOR * charSprite[0].width  + smashSprite.width / 2) / 2)) {
                        if (i % 2 === 0) {
                            if ((midCharY - midRockY) < ((SCALE_FACTOR * charSprite[0].height + smashSprite.height) / 2)) {
                                currentState = states.Score;
                            }
                        }
                        else {
                            if ((midRockY - midCharY) < ((SCALE_FACTOR * charSprite[0].height + smashSprite.height) / 2)) {
                                currentState = states.Score;
                            }
                        }
                    }
                }
            }
            else {
                if (!blocksArray[i].passed) {
                    if (i % 2 === 0) {
                        myScore += POINTS_PER_DODGE;
                        blocksArray[i].passed = true;
                    }
                }
            }
        }
    }
    else if (currentState === states.Score) {
        endAnim.update(liara.x, liara.y);
    }
}

function render() {
    renderingContext.fillStyle = myGradient;

    renderingContext.save();
    renderingContext.shadowBlur = 3;
    renderingContext.shadowColor = "black";
    renderingContext.fillRect(0, 0, width, height - height * BOTTOM_PCT);
    for (var i = 0; i < blocksArray.length; i++) {
        blocksArray[i].draw();
    }
    renderingContext.restore();

    renderingContext.fillStyle = myGroundGradient;
    renderingContext.fillRect(0, height - height * BOTTOM_PCT, width, height * BOTTOM_PCT);
    for (var i = 0; i < rocksArray.length; i++) {
        rocksArray[i].draw();
    }
    if (currentState != states.Score) {
        liara.draw();

    }

    if (currentState === states.Splash) {
        renderingContext.font = "bold 75px Verdana";
        renderingContext.fillStyle = "black";
        renderingContext.textAlign = "center";
        renderingContext.textBaseline = "top";
        renderingContext.fillText("Keep Liara Alive!", width / 2, 0);

        renderingContext.font = "bold 40px Verdana";
        renderingContext.fillStyle = "black";
        renderingContext.textAlign = "center";
        renderingContext.fillText(controlMode + " on your desired mode to start", width / 2, 0.15 * height);
        difficultyModes.draw(renderingContext, (width - difficultyModes.width) / 2, 0.6 * height - difficultyModes.height);
    }
    else if (currentState === states.Score) {
        if (!gameOver) {
            madeCut = false;
            gameOver = true;

            if (!cheatMode) {
                if (!storage.local.get("highScores")) {
                    storage.local.set("highScores", myScore);
                }
                else {
                    highScores = storage.local.get("highScores").split(",");

                    // convert elements of local storage to numbers
                    for (var i = 0; i < highScores.length; i++) {
                        highScores[i] = Number(highScores[i]);
                    }
                    // check if the high score board is filled
                    if (highScores.length === MAX_SCORES) {
                        // check if the new score qualifies for the high score board
                        for (var i = 0; i < highScores.length; i++) {
                            if (myScore >= highScores[i]) {
                                highScores.pop();
                                highScores.push(myScore);
                                madeCut = true;
                                break;
                            }
                        }
                    }
                    // if not filled, add the new score
                    else {
                        highScores.push(myScore);
                    }

                    highScores.sort(function (a, b) {
                        return b - a
                    });
                    storage.local.set("highScores", highScores);
                }
            }
            highScores = storage.local.get("highScores").split(",");
        }

        endAnim.draw();
        renderingContext.fillStyle = "rgba(0, 0, 0, 0.2)";
        renderingContext.fillRect(0, 0, width, height);

        renderingContext.save();
        renderingContext.shadowBlur = 5;
        renderingContext.shadowColor = "black";
        renderingContext.font = "bold 60px Verdana";
        renderingContext.fillStyle = "darkred";
        renderingContext.textAlign = "center";
        renderingContext.textBaseline = "top";
        renderingContext.fillText("GAME OVER", width / 2, 0);
        renderingContext.font = "bold 40px Verdana";
        renderingContext.fillText("You got a score of " + myScore, width / 2, 0.1 * height);
        if (!cheatMode) {
            if (madeCut)
                renderingContext.fillText("Yay, you made the list!", width / 2, 0.2 * height);
        }
        else
        {
            renderingContext.fillText("Did you think your score would count?", width / 2, 0.2 * height);
        }
        renderingContext.fillText("High Scores", width / 2, 0.3 * height);
        renderingContext.font = "bold 20px Verdana";
        for (var i = 0; i < highScores.length; i++) {
            renderingContext.fillText(highScores[i], width / 2, (0.4 + i * 0.05) * height);
        }

        newGameBtn.draw(renderingContext, (width - newGameBtn.width) / 2, height - 0.15 * height - newGameBtn.height - NEW_GAME_BUTTON_OFFSET);
        renderingContext.restore();

    }
    else {
        renderingContext.save();
        renderingContext.shadowBlur = 5;
        renderingContext.shadowColor = "black";
        renderingContext.font = "bold 30px Verdana";
        renderingContext.fillStyle = "orange";
        renderingContext.textAlign = "right";
        renderingContext.fillText("Score: " + myScore, width - 0.1 * width, 0.1 * height);
        if (myScore > 500)
        {
            renderingContext.textAlign = "center";
            renderingContext.fillText(controlMode + " to End Game", width / 2, 0.85 * height);
        }
        renderingContext.restore();
    }
}

function onpress(event) {               // need event for a reset button
    if (currentState === states.Game) {
        liara.jump();
    }
    else if (currentState === states.Splash) {
        if (!tapEnabled) {
            if (event.pageX >= (width - difficultyModes.width) / 2 && event.pageX <= (width + difficultyModes.width) / 2) {
                if (event.pageY >= (0.6 * height - difficultyModes.height)) {
                    if (event.pageY <= (0.6 * height - difficultyModes.height / NUM_MODES * 4)) {
                        spacing = SCALE_FACTOR * charSprite[0].height * 10;
                    }
                    else if (event.pageY <= (0.6 * height - difficultyModes.height / NUM_MODES * 3)) {
                        spacing = SCALE_FACTOR * charSprite[0].height * 5;
                    }
                    else if (event.pageY <= (0.6 * height - difficultyModes.height / NUM_MODES * 2)) {
                        spacing = SCALE_FACTOR * charSprite[0].height * 3;
                    }
                    else if (event.pageY <= (0.6 * height - difficultyModes.height / NUM_MODES)) {
                        spacing = 0;
                    }
                    else if (event.pageY <= (0.6 * height)) {
                        spacing = SCALE_FACTOR * charSprite[0].height * 10;
                        cheatMode = true;
                    }
                    if (event.pageY <= (0.6 * height)) {
                        currentState = states.Game;
                        for (var i = 0; i < numSmashyThings; i++) {
                            blocksArray.push(new SmashyThings(i * offsetBlocks, 0, true));
                            var spaceBlocks = blocksArray[2 * i].y + 1024 + spacing;
                            blocksArray.push(new SmashyThings(i * offsetBlocks, spaceBlocks, false));
                        }
                    }
                }
            }
        }
        else
        {
            if (event.targetTouches[0].pageX >= (width - difficultyModes.width) / 2 && event.targetTouches[0].pageX <= (width + difficultyModes.width) / 2) {
                if (event.targetTouches[0].pageY >= (0.6 * height - difficultyModes.height)) {
                    if (event.targetTouches[0].pageY <= (0.6 * height - difficultyModes.height / NUM_MODES * 4)) {
                        spacing = SCALE_FACTOR * charSprite[0].height * 10;
                    }
                    else if (event.targetTouches[0].pageY <= (0.6 * height - difficultyModes.height / NUM_MODES * 3)) {
                        spacing = SCALE_FACTOR * charSprite[0].height * 5;
                    }
                    else if (event.targetTouches[0].pageY <= (0.6 * height - difficultyModes.height / NUM_MODES * 2)) {
                        spacing = SCALE_FACTOR * charSprite[0].height * 3;
                    }
                    else if (event.targetTouches[0].pageY <= (0.6 * height - difficultyModes.height / NUM_MODES)) {
                        spacing = 0;
                    }
                    else if (event.targetTouches[0].pageY <= (0.6 * height)) {
                        spacing = SCALE_FACTOR * charSprite[0].height * 10;
                        cheatMode = true;
                    }
                    if (event.targetTouches[0].pageY <= (0.6 * height)) {
                        currentState = states.Game;
                        for (var i = 0; i < numSmashyThings; i++) {
                            blocksArray.push(new SmashyThings(i * offsetBlocks, 0, true));
                            var spaceBlocks = blocksArray[2 * i].y + 1024 + spacing;
                            blocksArray.push(new SmashyThings(i * offsetBlocks, spaceBlocks, false));
                        }
                    }
                }
            }
        }
    }
    else {
        if (!tapEnabled) {
            if ((event.pageX >= (width - newGameBtn.width) / 2 && event.pageX <= (width + newGameBtn.width) / 2) &&
                (event.pageY >= (height - 0.15 * height - newGameBtn.height - 15) && event.pageY <= (height - 0.15 * height - NEW_GAME_BUTTON_OFFSET))) {
                currentState = states.Splash;
                blocksArray = [];
                myScore = 0;
                gameOver = false;
                cheatMode = false;
            }
        }
        else
        {
            if ((event.targetTouches[0].pageX >= (width - newGameBtn.width) / 2 && event.targetTouches[0].pageX <= (width + newGameBtn.width) / 2) &&
                (event.targetTouches[0].pageY >= (height - 0.15 * height - newGameBtn.height - 15) && event.targetTouches[0].pageY <= (height - 0.15 * height - NEW_GAME_BUTTON_OFFSET))) {
                currentState = states.Splash;
                blocksArray = [];
                myScore = 0;
                gameOver = false;
                cheatMode = false;
            }
        }
        // else if()
        // {
        //     storage.clear();
        // }
    }
}