/**
 * Created by GodaiYuusaku on 11/14/16.
 */
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

function SmashyThings(offset)
{
    this.x = width + offset;
    this.y = Math.floor(Math.random() * (height / 2));

    this.update = function()
    {
        this.x -= XSPEED;
        if (this.x <= (0 - testSprite.width))
        {
            this.x = width;
        }

    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        testSprite.draw(renderingContext, 0, 0);

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
        if (this.x <= (0 - testSprite.width))
        {
            this.x = width;
        }

    };

    this.draw = function () {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        testSprite.draw(renderingContext, 0, 0);

        renderingContext.restore();
    }
}