import * as PIXI from 'pixi.js';

class RadioButton {
	#x = 30;

	#y = 300;

	#outterRadius = 50;

	#innerRadius = 50 - 10;

	#isActive = false;

	#outterCircleColor = 0xffbf01;

	#outterCircleAlpha = 1;

	#innerCircleColor = 0xffbf01;

	#innerCircleAlpha = 1;

	#isActiveColor = 0x000000;

	#outterCircle;

	#oc;

	#innerCircle;

	#ic;

	#radioButton;

	constructor({ x, y, radius }) {
		this.#x = x;
		this.#y = y;
		this.#outterRadius = radius;
		this.#innerRadius = this.#outterRadius - 10;
		this.#radioButton = new PIXI.Container();
		this.#outterCircle = this.#radioButton.addChild(this.CreateOutterCircle());

		this.#innerCircle = this.#outterCircle.addChild(this.CreateInnerCircle());

		this.#outterCircle.interactive = true;
		this.#outterCircle.buttonMode = true;
		this.#outterCircle.on('pointerdown', this.onClick);
	}

	CreateOutterCircle = () => {
		this.ic = new PIXI.Graphics()
			.beginFill(this.#outterCircleColor, this.#outterCircleAlpha)
			.drawCircle(this.#x, this.#y, this.#outterRadius)
			.endFill();
		return this.ic;
	};

	CreateInnerCircle = () => {
		this.ic = new PIXI.Graphics()
			.beginFill(this.#innerCircleColor, this.#innerCircleAlpha)
			.drawCircle(this.#x, this.#y, this.#innerRadius)
			.endFill();
		return this.ic;
	};

	ReCreateOutterCircle = () => {
		this.#outterCircle.clear();
		this.#outterCircle
			.beginFill(this.#outterCircleColor, this.#outterCircleAlpha)
			.drawCircle(this.#x, this.#y, this.#outterRadius)
			.endFill();
	};

	ReCreateInnerCircle = () => {
		this.#innerCircle.clear();
		this.#innerCircle
			.beginFill(this.#innerCircleColor, this.#innerCircleAlpha)
			.drawCircle(this.#x, this.#y, this.#innerRadius)
			.endFill();
		return this.ic;
	};

	onClick = () => {
		if (this.#isActive === false) {
			this.#isActive = true;
			this.#innerCircleColor = this.#isActiveColor;
			this.ReCreateInnerCircle();
		} else {
			this.#isActive = false;
			this.#innerCircleColor = this.#outterCircleColor;
			this.ReCreateInnerCircle();
		}

		console.log(this.#isActive);
	};

	get radioButton() {
		return this.#radioButton;
	}

	set radioButton({ x, y, icRad, ocRad, color, isActiveColor, isActive }) {
		if (x) {
			this.#x = x;
		}
		if (y) {
			this.#y = y;
		}
		if (icRad) {
			this.#innerRadius = icRad;
		}
		if (ocRad) {
			this.#outterRadius = ocRad;
		}
		if (color) {
			this.#innerCircle = color;
		}
		if (isActiveColor) {
			this.#isActiveColor = isActiveColor;
		}
		if (isActive) {
			this.#isActive = isActive;
		}
		this.ReCreateOutterCircle();
		this.ReCreateInnerCircle();
	}
}

export default RadioButton;
