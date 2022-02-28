import * as PIXI from 'pixi.js';

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

	constructor(app, { xpos, ypos }, { width, height }) {
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
		console.log(t);
	};

	onWheel = (e) => {
		const deltaY = e.deltaY;
		this.#handle.position.x = Math.max(0, Math.min(this.#handle.position.x + deltaY, this.#width));
		this.onHandleMoved();

		e.preventDefault();
	};

	onDrag = (e) => {
		this.#handle.position.x = Math.max(0, Math.min(this.#rect.toLocal(e.global).x - this.#xpos, this.#width));
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

	setSliderColor = (colorcode) => {};

	setRectColor = (colorcode) => {};

	setHandlerTexture = (texture) => {};

	setSliderTexture = (texture) => {};

	createSlider = () => {
		this.rect_ = new PIXI.Graphics()
			.beginFill(0x982d16, this.#rectAlpha)
			.drawRect(this.#xpos, this.#ypos, this.#width, this.#height)
			.endFill();
		return this.rect_;
	};

	createHandle = () => {
		this.handle_ = new PIXI.Graphics()
			.beginFill(this.#handleColor, this.#handleAlpha)
			.drawCircle(this.#xpos, this.#ypos + this.#height / 2, this.#radius)
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

	set SliderColor({ color, alpha }) {
		this.#rectColor = color;
		this.#rectAlpha = alpha;
		this.rect_.clear();
		this.rect_.beginFill(this.#rectColor, 1).drawRect(this.#xpos, this.#ypos, this.#width, this.#height).endFill();
	}

	set HandleColor(color) {
		this.#handleColor = color;
		this.handle_.clear();
		this.handle_
			.beginFill(this.#handleColor, this.#handleAlpha)
			.drawCircle(this.#xpos, this.#ypos + this.#height / 2, this.#radius)
			.endFill(); // this.#radius%this.#height
	}

	set HandleAlpha(alpha) {
		this.#handleAlpha = alpha;
		this.handle_.clear();
		this.handle_
			.beginFill(this.#handleColor, this.#handleAlpha)
			.drawCircle(this.#xpos, this.#ypos + this.#height / 2, this.#radius)
			.endFill(); // this.#radius%this.#height
	}

	set radius(radius) {
		this.#radius = radius;
		//		console.log('d' + diff + '/h' + this.#height + '/r' + this.#radius + '/rbyh' + (this.#radius % this.#height));
		this.handle_.clear();
		this.handle_
			.beginFill(this.#handleColor, this.#handleAlpha)
			.drawCircle(this.#xpos, this.#ypos + this.#height / 2, this.#radius)
			.endFill(); // this.#radius%this.#height
	}

	set handle({ color, alpha, radius }) {
		if (color) {
			this.HandleColor = color;
		}
		if (alpha) {
			this.HandleAlpha = alpha;
		}
		if (radius) {
			this.radius = radius;
		}
	}
}

export default Slider;
