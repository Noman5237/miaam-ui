import * as PIXI from 'pixi.js';

class Button{

    button;
    callBack = () => {console.log('kkkk')};

    constructor({x, y}, {width, height}){
        this.button = PIXI.Sprite.from('../assets/images/button.png');

        this.button.anchor.set(0.5);
        this.button.x = x;
        this.button.y = y;

        this.button.scale.x = this.getScaleValu(width);
        this.button.scale.y = this.getScaleValu(height);


        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.on('pointerdown', this.callBack);
        
    }
    getScaleValu = (value) => {
        return (value/100);
    }

    onClick = (callBack) => {
        this.callBack = callBack;
        this.callBack(); 
    }

    get button() {
        return this.button;
    }

}
export default Button;