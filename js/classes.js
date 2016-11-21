/**
 * Created by GodaiYuusaku on 11/14/16.
 */
function Character()
{
    this.frame = 0;
    this.animation = [0, 1, 2, 1];
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.scale = 0.5;

    this.update = function()
    {
        var n = currentState === states.Splash ? 10 : 5;

        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;            // makes sure that we stay within the animation array
        if (currentState === states.Splash)
        {
            this.updateIdleChar();
        }
        else if (currentState === states.Game) {

            if ((this.y < (height - charSprite[0].height / 2 - height * BOTTOM_PCT) - 22.5) && this.y >= -100) {
                this.y += GRAVITY;
            }
            else {
                currentState = states.Score;
            }
        }
    };

    this.updateIdleChar = function() {
        this.y = 10 * Math.cos(frames/5);
        this.rotation = 0;
    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);
        renderingContext.scale(this.scale, this.scale);

        var n = this.animation[this.frame];
        charSprite[n].draw(renderingContext, 50, 50);

        renderingContext.restore();
    }
}

function SmashyThings(offsetX, offsetY, top)
{
    this.x = width + offsetX;
    this.top = top;
    if (offsetY === 0)
        this.y = Math.floor(Math.random() * (height / 2)) - 1024;
    else
        this.y = offsetY;

    this.update = function()
    {
        this.x -= XSPEED;
        };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        if (this.top)
            smashSprite.draw(renderingContext, 0, 0);
        else
            smashSpriteBottom.draw(renderingContext, 0, 0);

        renderingContext.restore();
    }
}

function FloorThings(offsetX)
{
    this.x = offsetX;
    this.y = height - Math.floor(Math.random() * (height * BOTTOM_PCT));
    this.rockType = Math.floor(Math.random() * 5);

    this.update = function()
    {
        this.x -= XSPEED;
    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        rockSprite[this.rockType].draw(renderingContext, 0, 0);

        renderingContext.restore();
    }
}