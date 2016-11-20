/**
 * Created by GodaiYuusaku on 11/14/16.
 */
function Character()
{
    this.frame = 0;
    this.animation = [0, 1, 2, 1];
    this.x = 200;
    this.y = 100;
    this.rotation = Math.PI / 2; // + (20 * Math.PI / 180);

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

            if ((this.y < (height - charSprite[0].height - height * BOTTOM_PCT) - 45) && this.y >= -100) {
                this.y += GRAVITY;
            }
            else {
                currentState = states.Score;
            }
        }
    };

    this.updateIdleChar = function() {
        this.y = 10 * Math.cos(frames/5);
        this.rotation = Math.PI / 2;
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

function SmashyThings(offsetX, offsetY, top)
{
    this.x = width + offsetX;
    this.top = top;
    if (offsetY === 0)
        this.y = Math.floor(Math.random() * (height / 2)) + offsetY;
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

    this.update = function()
    {
        this.x -= XSPEED;
    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        rockSprite.draw(renderingContext, 0, 0);

        renderingContext.restore();
    }
}