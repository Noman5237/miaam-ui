import * as PIXI from 'pixi.js';
import { EventSystem } from '@pixi/events';
import Slider from '/src/Slider';

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

const newSlider = new Slider(app);
// Install EventSystem, if not already (PixiJS 6 doesn't add it by default)
