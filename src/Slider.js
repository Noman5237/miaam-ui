import * as PIXI from 'pixi.js';
import { EventSystem } from '@pixi/events';

class Slider {
	xpos = 10;

	ypos = 10;

	width = 200;

	height = 20;

	slider;

	handle;

	app;

	onHandleMoved = () => {
		// Normalize handle position between -1 and 1.
		const t = 2 * (this.handle.position.y / this.app.renderer.screen.height - 0.5);
		// bunny.scale.set(3 * (1.1 + t));
	};

	onWheel = (e) => {
		const deltaY = e.deltaY;
		this.handle.position.x = Math.max(4, Math.min(this.handle.position.x + deltaY, 200 - 4));
		this.onHandleMoved();

		e.preventDefault();
	};

	onDrag = (e) => {
		// Set handle y-position to match pointer, clamped to (4, screen.height - 4).
		this.handle.position.x = Math.max(4, Math.min(this.slider.toLocal(e.global).x, 200 - 4));
		this.onHandleMoved();
	};

	onDragStart = (e) => {
		this.app.stage.interactive = true;
		this.app.stage.addEventListener('pointermove', this.onDrag);
	};

	onDragEnd = (e) => {
		this.app.stage.interactive = false;
		this.app.stage.removeEventListener('pointermove', this.onDrag);
	};

	constructor(app) {
		this.app = app;

		if (!('events' in app.renderer)) {
			app.renderer.addSystem(EventSystem, 'events');
		}

		// Make the slider
		this.slider = app.stage.addChild(new PIXI.Graphics().beginFill(0x38404e, 0.87).drawRect(10, 10, 200, 20).endFill());
		// Add invisible scrolling area that's wider than visible slider.
		this.slider.beginFill(0xffffff, 0.001).drawRect(10, 10, 200, 20).endFill();
		this.slider.interactive = true;
		this.slider.addEventListener('wheel', this.onWheel);
		// Draw the handle
		this.handle = this.slider.addChild(new PIXI.Graphics().beginFill(0x650a5a).drawCircle(10, 10, 8).endFill());
		this.handle.interactive = true;
		this.handle.position.set(10, 10);
		this.handle.addEventListener('pointerdown', this.onDragStart);
		this.handle.addEventListener('pointerup', this.onDragEnd);
		this.handle.addEventListener('pointerupoutside', this.onDragEnd);
	}
}

export default Slider;
