import * as PIXI from 'pixi.js';
import { EventSystem } from '@pixi/events';
import Slider from './Slider.js';
import RadioButton from './RadioButton.js';

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

const newSlider = new Slider(app, { xpos: 200, ypos: 300 }, { width: 500, height: 10 });

newSlider.handle = { color: 0xcf000c, alpha: 1, radius: 50 };
newSlider.slider = { color: 0x5ef400, alpha: 0.5 };
// newSlider.HandleColor = { color: 0xcf000c, alpha: 1 };
// Install EventSystem, if not already (PixiJS 6 doesn't add it by default)
const graphics = new PIXI.Graphics();

app.stage.addChild(newSlider.slider);

// radioButton
const newRadio = new RadioButton({ xpos: 500, ypos: 60, radius: 40 });

// Rectangle
graphics.beginFill(0xde3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();

// app.stage.addChild(graphics);
app.stage.addChild(newRadio.radioButton);

console.log(newSlider.xpos);

app.ticker.add(() => {
	// newSlider.rect.x += 1;
});
