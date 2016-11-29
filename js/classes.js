/**
 * Created by GodaiYuusaku on 11/14/16.
 */
function Character() {
    this.frame = 0;
    this.animation = [0, 1, 2, 1];
    this.x = width / 2;
    this.y = height / 2;
    this.rotation = 0;
    this.scale = SCALE_FACTOR;
    this.velocity = 0;

    this.jump = function () {
        this.velocity -= UPSPEED;
    };

    this.update = function () {
        var n = currentState === states.Splash ? 10 : 5;

        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;            // makes sure that we stay within the animation array
        if (currentState === states.Splash || currentState === states.Rules) {
            this.x = width / 2;
            this.y = height / 2;
            this.updateIdleChar();
        }
        else if (currentState === states.Game) {

            if ((this.y < ((height - charSprite[0].height / 2 - height * BOTTOM_PCT) / SCALE_FACTOR)) && this.y >= -25) {
                if (!cheatMode) {
                    this.velocity += GRAVITY;
                }
                this.y += this.velocity;
            }
            else {
                currentState = states.Score;
            }
        }
    };

    this.updateIdleChar = function () {
        this.y += 5 * Math.cos(frames / 10);
        this.rotation = 0;
        this.velocity = 0;
    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.rotate(this.rotation);
        renderingContext.scale(this.scale, this.scale);

        var n = this.animation[this.frame];
        charSprite[n].draw(renderingContext, this.x, this.y);

        renderingContext.restore();
    }
}

function SmashyThings(offsetX, offsetY, top) {
    this.x = width + offsetX;
    this.top = top;
    this.passed = false;
    if (offsetY === 0)
        this.y = Math.floor(Math.random() * (height / 2)) - 1024;
    else
        this.y = offsetY;

    this.update = function () {
        if (currentState == states.Game)
            this.x -= XSPEED;
    };

    this.draw = function () {
        renderingContext.save();

        if (this.top)
            smashSprite.draw(renderingContext, this.x, this.y);
        else
            smashSpriteBottom.draw(renderingContext, this.x, this.y);

        renderingContext.restore();
    }
}

function FloorThings(offsetX) {
    this.x = offsetX;
    this.y = height - Math.floor(Math.random() * (height * BOTTOM_PCT));
    this.rockType = Math.floor(Math.random() * 5);

    this.update = function () {
        if (currentState == states.Game)
            this.x -= XSPEED;
    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        rockSprite[this.rockType].draw(renderingContext, 0, 0);

        renderingContext.restore();
    }
}

function Explosion() {
    this.frame = 0;
    this.animation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    this.x = width / 2;
    this.y = height / 2;

    this.update = function (x, y) {
        var n = 10;

        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;            // makes sure that we stay within the animation array

        this.x = (x + charSprite[0].width / 2 * SCALE_FACTOR) / 2;
        this.y = (y - charSprite[0].height) / 2;
    };

    this.draw = function () {
        renderingContext.save();

        var n = this.animation[this.frame];
        explosionSprite[n].draw(renderingContext, this.x, this.y);

        renderingContext.restore();
    }
}