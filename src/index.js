import * as PIXI from 'pixi.js';
import { EventSystem } from '@pixi/events';
import Slider from './Slider.js';

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

const newSlider = new Slider(app);
// Install EventSystem, if not already (PixiJS 6 doesn't add it by default)
const graphics = new PIXI.Graphics();

// Rectangle
graphics.beginFill(0xde3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();

app.stage.addChild(graphics);

console.log(graphics instanceof PIXI.Graphics);

app.ticker.add(() => {
	newSlider.rect.x += 1;
});