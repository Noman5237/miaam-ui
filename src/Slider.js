import * as PIXI from 'pixi.js';

class Slider {
	#x = 50;

	#y = 300;

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

	constructor(app, { x, y }, { width, height }) {
		this.#app = app;

		this.#x = x;

		this.#y = y;

		this.#width = width;

		this.#height = height;

		this.#slider_ = new PIXI.Container();

		this.#radius = this.#height / 2;
		// Make the slider
		this.#rect = this.#slider_.addChild(this.createSlider());

		// Add invisible scrolling area that's wider than visible slider.
		this.#rect.beginFill(0xffffff, 0.001).drawRect(this.#x, this.#y, this.#width, this.#height).endFill();
		this.#rect.interactive = true;
		this.#rect.addEventListener('wheel', this.onWheel);
		// Draw the handle
		this.#handle = this.#rect.addChild(this.createHandle());
		this.#handle.interactive = true;
		this.#handle.buttonMode = true;

		this.#handle.addEventListener('pointerdown', this.onDragStart);
		this.#handle.addEventListener('pointerup', this.onDragEnd);
		this.#handle.addEventListener('pointerupoutside', this.onDragEnd);
		this.#handle.on('pointerover', this.onHandlerOver).on('pointerout', this.onHandlerNotOver);
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
		this.#handle.position.x = Math.max(0, Math.min(this.#rect.toLocal(e.global).x - this.#x, this.#width));
		// console.log(this.#rect.toLocal(e.global).x);
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

	onHandlerOver = () => {
		this.addTintToHandle();
	};

	onHandlerNotOver = () => {
		this.removeTintFromHandle();
	};

	addTintToHandle = () => {
		this.#handle.tint = 0xa7f9ff;
	};

	removeTintFromHandle = () => {
		this.#handle.tint = 0xffffff;
	};

	setSliderColor = (colorcode) => {};

	setRectColor = (colorcode) => {};

	setHandlerTexture = (texture) => {};

	setSliderTexture = (texture) => {};

	createSlider = () => {
		this.rect_ = new PIXI.Graphics()
			.beginFill(0x982d16, this.#rectAlpha)
			.drawRect(this.#x, this.#y, this.#width, this.#height)
			.endFill();
		return this.rect_;
	};

	reCreateSlider = () => {
		this.rect_.clear();
		this.rect_.beginFill(this.#rectColor, 1).drawRect(this.#x, this.#y, this.#width, this.#height).endFill();
	};

	createHandle = () => {
		this.handle_ = new PIXI.Graphics()
			.beginFill(this.#handleColor, this.#handleAlpha)
			.drawCircle(this.#x, this.#y + this.#height / 2, this.#radius)
			.endFill();
		return this.handle_;
	};

	reCreateHandler = () => {
		this.handle_.clear();
		this.handle_
			.beginFill(this.#handleColor, this.#handleAlpha)
			.drawCircle(this.#x, this.#y + this.#height / 2, this.#radius)
			.endFill(); // this.#radius%this.#height
	};

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
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

	get value() {
		return this.#value;
	}

	set handle({ radius, color, alpha }) {
		if (color) {
			this.#handleColor = color;
		}
		if (alpha) {
			this.#handleAlpha = alpha;
		}
		if (radius) {
			this.#radius = radius;
		}
		this.reCreateHandler();
	}

	set slider({ x, y, width, height, color, alpha }) {
		if (x) {
			this.#x = x;
		}
		if (y) {
			this.#y = y;
		}
		if (width) {
			this.#width = width;
		}
		if (height) {
			this.#height = height;
		}
		if (color) {
			this.#rectColor = color;
		}
		if (alpha) {
			this.#rectAlpha = alpha;
		}
		this.reCreateSlider();
	}
}

export default Slider;
