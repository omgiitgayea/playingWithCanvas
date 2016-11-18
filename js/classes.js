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

            if (this.y < (height - charSprite[0].height - backgroundSprite.height) - 45) {
                this.y += gravity;
            }
            else {
                currentState = states.Score;
            }
        }
    };

    this.updateIdleChar = function() {
        this.y = 20* Math.cos(frames/5);
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

function SmashyThings(offset)
{
    this.x = width + offset;
    this.y = Math.floor(Math.random() * (height / 2));

    this.update = function()
    {
        this.x -= XSPEED;
        if (this.x <= (0 - smashSprite.width))
        {
            this.x = width;
        }

    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        smashSprite.draw(renderingContext, 0, 0);

        renderingContext.restore();
    }
}

function SmashyThingsBottom(offsetx, offsety)
{
    this.x = width + offsetx;
    this.y = offsety;

    this.update = function()
    {
        this.x -= XSPEED;
        if (this.x <= (0 - smashSprite.width))
        {
            this.x = width;
        }

    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        smashSprite.draw(renderingContext, 0, 0);

        renderingContext.restore();
    }
}