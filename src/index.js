import * as PIXI from 'pixi.js';
import { EventSystem } from '@pixi/events';
import Slider from './Slider.js';
import RadioButton from './RadioButton.js';
import Button from './Button.js';
import twoDSprite from './twoDSprite.js';

delete PIXI.Renderer.__plugins.interaction;

// Create app
const app = new PIXI.Application({
	antialias: true,
	autoDensity: true,
	backgroundColor: 0x1099bb,
	resolution: devicePixelRatio,
});
document.body.appendChild(app.view);

// Make sure stage covers the whole scene
app.stage.hitArea = app.renderer.screen;

if (!('events' in app.renderer)) {
	app.renderer.addSystem(EventSystem, 'events');
}

const newSlider = new Slider(app, { x: 200, y: 300 }, { width: 500, height: 10 });

newSlider.handle = { color: 0xcf000c, alpha: 1, radius: 50 };
newSlider.slider = { color: 0x5ef400, alpha: 0.5 };
// newSlider.HandleColor = { color: 0xcf000c, alpha: 1 };
// Install EventSystem, if not already (PixiJS 6 doesn't add it by default)
const graphics = new PIXI.Graphics();

app.stage.addChild(newSlider.slider);

// radioButton
const newRadio = new RadioButton({ x: 500, y: 60, radius: 40 });

// Rectangle
graphics.beginFill(0xde3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();

// app.stage.addChild(graphics);
app.stage.addChild(newRadio.radioButton);

console.log(newSlider.x);

// const bunny = PIXI.Sprite.from('../assets/images/button.png');

// // center the sprite's anchor point
// bunny.anchor.set(0.5);

// // move the sprite to the center of the screen
// bunny.x = app.screen.width / 2;
// bunny.y = app.screen.height / 2;

// app.stage.addChild(bunny);


const button = new Button({x:100, y:100}, {width: 200, height: 100});


button.onClick(()=>{console.log('jjjjjjjjjjjjjjjjjjjjjjj')});

app.stage.addChild(button.button);

const heart = new twoDSprite('../assets/images/heart.png', {x: 200, y: 10},{width: 500, height: 500});

app.stage.addChild(heart.sprite);

heart.setvisibility(true);



/**
 * shake a sprite or anything with position infinitely
 let flag = 0;
let switc = 0;
if(switc === 0){
	heart.sprite.position.x += 1;
	flag++;
	if(flag === 5) switc = 1;
}else if(switc === 1 ){
	heart.sprite.position.x -= 1;
	flag--;
	if(flag === 0) switc = 0;
}
*/


/**
 *
 * 
 *  shake a object or anything with position for lag/60 seconds;
let lag = 0;
let flag = 0;
let switc = 0; 
if(lag <20){
	if(switc === 0){
		heart.sprite.position.x += 1;
		flag++;
		if(flag === 5) switc = 1;
	}else if(switc === 1 ){
		heart.sprite.position.x -= 1;
		flag--;
		if(flag === 0) switc = 0;
	}
	lag++;
}
 */

let lag = 0;
let flag = 0;
let switc = 0;

app.ticker.add(() => {

	if(switc === 0){
		heart.sprite.position.x += 10;
		flag++;
		if(flag === 100) switc = 1;
	}else if(switc === 1 ){
		heart.sprite.position.x -= 10;
		flag--;
		if(flag === 0) switc = 0;
	}
	// newSlider.rect.x += 1;

});

