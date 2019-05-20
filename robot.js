import {MAJU, BELOK_KANAN, BELOK_KIRI, NYALAKAN_LAMPU, LOMPAT} from './instruction.js'
import gameLoop from './index.js'

const OUT_STAGE = -1;
const LAND_STAGE = 1;
const LAMP_STAGE = 2;

export default class Robot {
	constructor(position, dx, dy, stageMatrix, instructions, game) {
		this.width = 50;
		this.height = 50;
		this.dx = [0, -1, 0, 1];
		this.dy = [1, 0, -1, 0];
		this.position = position;
		this.curd = 0;
		this.img = document.getElementById('img_robot_kebawah');
		this.stageMatrix = stageMatrix;
		this.instructions = instructions;
		this.game = game;
		this.cury = 0;
		this.curx = 0;
		this.remainingLamp = 1;
		// console.log(this.game);
	}

	getImgByDir() {
		console.log('wkwk');
		if (this.curd == 0) {
			this.img = document.getElementById('img_robot_kebawah');
		}
		if (this.curd == 3) {
			this.img = document.getElementById('img_robot_kekanan');
		}
		if (this.curd == 1) {
			this.img = document.getElementById('img_robot_kekiri');
		}
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
	}


	update() {
		// this.image.addEventListener('click', clickHandler);
	}	

	valid(y, x) {
		return (y >= 0 && x >= 0 && y < 6 && x < 3);
	}

	// animate(addx, addy) {
	// 	function sleepFor(sleepDuration) {
	//     var now = new Date().getTime();
	//     while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
	// 	}
	// 	console.log(addx, addy);
	// 	for (let i = 0; i < addx; i += 5) {
	// 		this.position.x += 5;
	// 	}
	// 	for (let i = 0; i < addy; i += 5) {
	// 		this.position.y += 5;
	// 	}
	// }

	move(x) {
		if (x == MAJU) {
			let nxy = this.cury + this.dy[this.curd];
			let nxx = this.curx + this.dx[this.curd];
			if (this.valid(nxy, nxx) && this.stageMatrix[nxy][nxx] != -1) {
				// this.animate(this.dx[this.curd] * 90, this.dy[this.curd] * 57);
				this.position.x += this.dx[this.curd] * 90;
				this.position.y += this.dy[this.curd] * 57;
				this.cury += this.dy[this.curd];
				this.curx += this.dx[this.curd];
			}
		}
		if (x == BELOK_KANAN) {
			this.curd++;
			if (this.curd >= 4) {
				this.curd -= 4;
			}
			this.getImgByDir();
		}
		if (x == BELOK_KIRI) {
			this.curd--;
			if (this.curd < 0) {
				this.curd = 3;
			}
			this.getImgByDir();
		}
		if (x == NYALAKAN_LAMPU) {
			if (this.stageMatrix[this.cury][this.curx] == LAMP_STAGE) {
				this.remainingLamp--;
			}
			if (this.remainingLamp == 0) {
				this.game.GAME_STATE = 2;
			}
			// console.log(this.remainingLamp);
			// console.log(this.stageMatrix);
			// console.log(this.cury, this.curx);
		}
		if (x == LOMPAT) {
			this.move(1);
			this.move(1);
		}
		this.remainingMove = Math.max(this.remainingMove, 0);
	}
}