import Instruction from './instruction.js'
import InputHandler from './input.js'
import Robot from './robot.js'

const CHOOSING_INSTRUCTIONS = 0;
const PLAYED = 1;
const WIN = 2;

export default class Game {
	constructor(gameWidth, gameHeight, context) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.context = context;
		this.GAME_STATE = 0;
		this.stageMatrix = [
			[1, -1, -1],
			[1, 1, 1],
			[-1, -1, 1],
			[-1, 1, 1],
			[-1, 2, -1]
		]
		this.robot = new Robot({x: 115, y: 65}, 0, 1, this.stageMatrix, [], this);

		this.instructionMatrix = [
			[1, 3, 5, 2, 5],
			[2, 1, 3, 1, 4]
		];

		// intialize (create and draw) instructions at box
		this.instructionsAtBox = [];
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 5; j++) {
				if (this.instructionMatrix[i][j] != -1) {
					let pos = {
						x: 120 + j * 40,
						y: 460 + i * 40 - 40
					}
					if (i > 0) {
						pos.y += 20;
					}
					this.instructionsAtBox.push(new Instruction(this.instructionMatrix[i][j], pos));
				}
			}
		}

		this.instructionsAtMain = [];
		this.instructionsAtMainFrom = [];
		this.ptr = 0;

		new InputHandler(this);

	}

	reset() {
		let n = this.instructionsAtMain.length;
		for (let i = 0; i < n; i++) {
			let idx = this.instructionsAtMain.length - 1;
			this.instructionsAtMain[idx].deleted = true;
			this.instructionsAtBox[this.instructionsAtMainFrom[idx]].deleted = false;
			this.instructionsAtMain.pop();
			this.instructionsAtMainFrom.pop();
		}
		this.robot.cury = 0;
		this.robot.curx = 0;
		this.robot.position = {x: 115, y:65};
		this.robot.remainingLamp = 1;
		this.robot.curd = 0;
		this.GAME_STATE = 0;
		this.ptr = 0;
	}

	update() {
		// this.instructionsAtBox = this.instructionsAtBox.filter(object => !object.deleted);
		for (let i = 0; i < this.instructionsAtBox.length; i++) {
			this.instructionsAtBox[i].update();
		}
	}

	draw(ctx) {
		if (this.GAME_STATE == 1 && this.ptr == this.instructionsAtMain.length) {
			if (this.robot.remainingLamp == 0) {
				ctx.font = "30px Arial";
				ctx.fillStyle = "green";
				ctx.fillText('congrats! you win!', 250, 300 - 20);
				ctx.fillText('Press ENTER to restart', 250, 350 - 20);
			} else {
				ctx.font = "30px Arial";
				ctx.fillStyle = "red";
				ctx.fillText('you lose! so bad! :(', 250, 300 - 20);
				ctx.fillText('Press ENTER to restart', 250, 350 - 20);
			}
			return;
		}
		ctx.font = "15px Arial";
		ctx.fillStyle = "black";
		ctx.drawImage(document.getElementById('img_stage'), 50, 0, 430, 430);
		ctx.drawImage(document.getElementById('img_main_area'), 480, 50, 300, 300);
		this.robot.draw(ctx);
		if (this.instructionsAtBox.length >= 1 && !this.instructionsAtBox[0].deleted) {
			ctx.fillText('0', 52 + 80, 450 - 40);
		}
		if (this.instructionsAtBox.length >= 2 && !this.instructionsAtBox[1].deleted) {
			ctx.fillText('1', 92 + 80, 450 - 40);
		}
		if (this.instructionsAtBox.length >= 3 && !this.instructionsAtBox[2].deleted) {
			ctx.fillText('2', 132 + 80, 450 - 40);
		}
		if (this.instructionsAtBox.length >= 4 && !this.instructionsAtBox[3].deleted) {
			ctx.fillText('3', 172 + 80, 450 - 40);	
		}
		if (this.instructionsAtBox.length >= 5 && !this.instructionsAtBox[4].deleted) {
			ctx.fillText('4', 212 + 80, 450 - 40);
		}
		if (this.instructionsAtBox.length >= 6 && !this.instructionsAtBox[5].deleted) {
			ctx.fillText('5', 52 + 80, 515 - 40);
		}
		if (this.instructionsAtBox.length >= 7 && !this.instructionsAtBox[6].deleted) {
			ctx.fillText('6', 92 + 80, 515 - 40);
		}
		if (this.instructionsAtBox.length >= 8 && !this.instructionsAtBox[7].deleted) {
			ctx.fillText('7', 132 + 80, 515 - 40);
		}
		if (this.instructionsAtBox.length >= 9 && !this.instructionsAtBox[8].deleted) {
			ctx.fillText('8', 172 + 80, 515 - 40);
		}
		if (this.instructionsAtBox.length >= 10 && !this.instructionsAtBox[9].deleted) {
			ctx.fillText('9', 212 + 80, 515 - 40);
		}
		for (let i = 0; i < this.instructionsAtBox.length; i++) {
			if (!this.instructionsAtBox[i].deleted) {
				this.instructionsAtBox[i].draw(ctx);
			}
		}
		for (let i = 0; i < this.instructionsAtMain.length; i++) {
			if (!this.instructionsAtMain[i].deleted) {
				this.instructionsAtMain[i].draw(ctx);
			}
		}
	}
}