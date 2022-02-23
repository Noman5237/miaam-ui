import * as PIXI from 'pixi.js';
import { EventSystem } from '@pixi/events';

class Slider {
	#xpos = 50;

	#ypos = 300;

	#width = 200;

	#height = 20;

	#rect;

	rect_;

	#rectColor = 0x38404e;

	#rectAlpha = 0.87;

	#handle;

	handle_;

	#handleColor = 0x650a5a;

	#handleAlpha = 1;

	#radius;

	#value;

	#app;

	#slider_;

	constructor(app, { xpos: xpos, ypos: ypos }, { width: width, height: height }) {
		this.#app = app;

		this.#xpos = xpos;

		this.#ypos = ypos;

		this.#width = width;

		this.#height = height;

		this.#slider_ = new PIXI.Container();

		this.#radius = this.#height / 2;
		// Make the slider
		this.#rect = this.#slider_.addChild(this.createSlider());

		// Add invisible scrolling area that's wider than visible slider.
		this.#rect.beginFill(0xffffff, 0.001).drawRect(this.#xpos, this.#ypos, this.#width, this.#height).endFill();
		this.#rect.interactive = true;
		this.#rect.addEventListener('wheel', this.onWheel);
		// Draw the handle
		this.#handle = this.#rect.addChild(this.createHandle());
		this.#handle.interactive = true;

		this.#handle.addEventListener('pointerdown', this.onDragStart);
		this.#handle.addEventListener('pointerup', this.onDragEnd);
		this.#handle.addEventListener('pointerupoutside', this.onDragEnd);
	}

	onHandleMoved = () => {
		// Normalize handle position between 0 and 1.
		const t = this.#handle.position.x / this.#width;
		this.#value = t;
	};

	onWheel = (e) => {
		const deltaY = e.deltaY;
		this.#handle.position.x = Math.max(0, Math.min(this.#handle.position.x + deltaY, this.#width));
		this.onHandleMoved();

		e.preventDefault();
	};

	onDrag = (e) => {
		this.#handle.position.x = Math.max(0, Math.min(this.#rect.toLocal(e.global).x - this.#xpos, this.#width));
		console.log(this.#rect.toLocal(e.global).x);
		this.onHandleMoved();
	};

	onDragStart = (e) => {
		this.#app.stage.interactive = true;
		this.#app.stage.addEventListener('pointermove', this.onDrag);
	};

	onDragEnd = (e) => {
		this.#app.stage.interactive = false;
		this.#app.stage.removeEventListener('pointermove', this.onDrag);
	};

	setSliderColor = (colorcode) => {};

	setRectColor = (colorcode) => {};

	setHandlerTexture = (texture) => {};

	setSliderTexture = (texture) => {};

	createSlider = () => {
		this.rect_ = new PIXI.Graphics()
			.beginFill(this.#rectColor, this.#rectAlpha)
			.drawRect(this.#xpos, this.#ypos, this.#width, this.#height)
			.endFill();
		return this.rect_;
	};

	createHandle = () => {
		this.handle_ = new PIXI.Graphics()
			.beginFill(this.#handleColor, this.#handleAlpha)
			.drawCircle(this.#xpos, this.#ypos + this.#radius, this.#radius)
			.endFill();
		return this.handle_;
	};

	get xpos() {
		return this.#xpos;
	}

	get ypos() {
		return this.#ypos;
	}

	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	get rect_() {
		return this.rect_;
	}

	get handler_() {
		return this.handler_;
	}

	get slider() {
		return this.#slider_;
	}

	set radius({ radius: radius }) {
		this.#radius = radius;
		let diff;
		if(this.#radius > this.#height)
		{
			diff = this.#radius - this.#height;
			if(this.#radius%this.#height === 0){
				diff = diff * (this.#radius%this.#height);
			}else{
				diff = diff - this.#height/2;
			}

		} else
		{
			diff = this.#height - this.#radius;
			diff = diff * (this.#height%this.#radius);
		}

		console.log('d'+diff+'/h'+this.#height+'/r'+this.#radius+'/rbyh'+this.#radius%this.#height);
		this.handle_.clear(); 
		this.handle_
			.beginFill(this.#handleColor, this.#handleAlpha)
			.drawCircle(this.#xpos, this.#ypos + diff + (this.#height/2), this.#radius)
			.endFill(); // this.#radius%this.#height
	}
}

export default Slider;
