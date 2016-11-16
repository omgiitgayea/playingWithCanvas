/**
 * Created by GodaiYuusaku on 11/14/16.
 */
var charSprite;
var testSprite = [];

function Sprite(img, x, y, width, height)
{
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function(renderingContext, x, y)
{
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initSprites(img)
{
    charSprite = [
        new Sprite(img, 14, 478, 37, 69),
        new Sprite(img, 51, 478, 37, 69),
        new Sprite(img, 88, 478, 37, 69)
    ];

    for (var i = 0; i < 3; i++)
    {
        testSprite.push(new Sprite(img, 270, 160, 72, 70));
    }

}