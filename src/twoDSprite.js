import * as PIXI from 'pixi.js';
import { Sprite } from 'pixi.js';

class twoDSprite{
    texturepath;
    texture;
    sprite;
    visibility;

    constructor(path , {x, y}, {width, height}){
        this.visibility = true;
        this.texturepath = path;
        this.texture = PIXI.Texture.from(this.texturepath);
        this.sprite = new PIXI.Sprite(this.texture);


        this.sprite.x = x;
        this.sprite.y = y;

        this.sprite.scale.x = this.getScaleValu(width);
        this.sprite.scale.y = this.getScaleValu(height);

        this.sprite.visible = this.visibility;

    }

    getScaleValu = (value) => {
        return (value/100);
    }

    get sprite(){
        return this.sprite;
    }

    setvisibility = (visibility) => {
        this.visibility = visibility;
        this.sprite.visible = visibility;
    }
    
    
}

export default twoDSprite;