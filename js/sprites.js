/**
 * Created by GodaiYuusaku on 11/14/16.
 */
var charSprite;
var smashSprite;
var smashSpriteBottom;
var rockSprite;

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
        new Sprite(img, 0, 0, 231.5, 64.5),
        new Sprite(img, 0, 64.5, 231.5, 64.5),
        new Sprite(img, 0, 129, 231.5, 64.5)
    ];

    smashSprite = new Sprite(img, 231.5, 0, 95, 1024);

    smashSpriteBottom = new Sprite(img, 326.5, 0, 95, 1024);

    rockSprite = [
        new Sprite(img, 0, 193.5, 23.5, 17.5),
        new Sprite(img, 23.5, 193.5, 21, 18.5),
        new Sprite(img, 44.5, 193.5, 23, 20),
        new Sprite(img, 67.5, 193.5, 22.5, 16.5),
        new Sprite(img, 90, 193.5, 19.5, 22)
    ];
}