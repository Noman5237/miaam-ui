import * as PIXI from 'pixi.js';
import { EventSystem } from '@pixi/events';

class Slider {
	xpos = 50;

	ypos = 300;

	width = 200;

	height = 20;

	slider;

	handle;

	radius = this.height/2;

	value;

	app;

	constructor(app) {
		this.app = app;

		if (!('events' in app.renderer)) {
			app.renderer.addSystem(EventSystem, 'events');
		}

		// Make the slider
		this.slider = app.stage.addChild(
			new PIXI.Graphics().beginFill(0x38404e, 0.87).drawRect(this.xpos, this.ypos, this.width, this.height).endFill()
		);
		// Add invisible scrolling area that's wider than visible slider.
		this.slider.beginFill(0xffffff, 0.001).drawRect(this.xpos, this.ypos, this.width, this.height).endFill();
		this.slider.interactive = true;
		this.slider.addEventListener('wheel', this.onWheel);
		// Draw the handle
		this.handle = this.slider.addChild(
			new PIXI.Graphics()
				.beginFill(0x650a5a)
				.drawCircle(this.xpos, this.ypos + this.radius, this.radius)
				.endFill()
		);
		this.handle.interactive = true;

		this.handle.addEventListener('pointerdown', this.onDragStart);
		this.handle.addEventListener('pointerup', this.onDragEnd);
		this.handle.addEventListener('pointerupoutside', this.onDragEnd);
	}

	onHandleMoved = () => {
		// Normalize handle position between 0 and 1.
		const t =  (this.handle.position.x / this.width );
		this.value = t;
	};

	onWheel = (e) => {
		const deltaY = e.deltaY;
		this.handle.position.x = Math.max(
			0,
			Math.min(this.handle.position.x + deltaY, this.width)

		);
		this.onHandleMoved();

		e.preventDefault();
	};

	onDrag = (e) => {
		this.handle.position.x = Math.max(
			0,
			Math.min(this.slider.toLocal(e.global).x, this.width)
		);
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
}

export default Slider;
