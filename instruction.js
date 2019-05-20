export const MAJU = 1;
export const BELOK_KANAN = 2;
export const BELOK_KIRI = 3;
export const NYALAKAN_LAMPU = 4;
export const LOMPAT = 5;

export default class Instruction {
	constructor(id, position) {
		this.id = id;
		this.width = 40;
		this.height = 40;
		this.position = position;
		if (this.id == MAJU) {
			this.image = document.getElementById('img_maju');
		}
		if (this.id == BELOK_KANAN) {
			this.image = document.getElementById('img_belok_kanan');
		}
		if (this.id == BELOK_KIRI) {
			this.image = document.getElementById('img_belok_kiri');
		}
		if (this.id == NYALAKAN_LAMPU) {
			this.image = document.getElementById('img_lampu');
		}
		if (this.id == LOMPAT) {
			this.image = document.getElementById('img_lompat');
		}
		this.deleted = false;
		// function clickHandler() {
		// 	console.log('clicked');
		// }
		// this.image.addEventListener('click', clickHandler);
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
	}


	update() {
		// function clickHandler() {
		// 	console.log('clicked');
		// }
		// this.image.addEventListener('click', clickHandler);
	}
}

// export function initInstructions(instructionMatrix) {
// 	instructionMatrix = [
// 		[1, 2, 1, 4, -1],
// 		[-1, -1, -1, -1, -1]
// 	];
// 	let ret = [];
// 	for (let i = 0; i < 2; i++) {
// 		for (let j = 0; j < 5; j++) {
// 			if (instructionMatrix[i][j] != -1) {
// 				let pos = {
// 					x: 20 + j * 40,
// 					y: 600 + i * 40
// 				}
// 				ret.push(new Instruction(instructionMatrix[i][j], pos));
// 			}
// 		}
// 	}
// 	return ret;
// }