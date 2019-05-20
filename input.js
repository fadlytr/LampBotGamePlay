import Game from './game.js'
import Instructions from './instruction.js'
import gameLoop from './index.js'

export default class InputHandler {
	constructor(game) {
		document.addEventListener("keydown", event => {
			const NUM_1 = 48 + 10 - game.instructionsAtBox.length;
			let key = event.keyCode;
			let instructionPicked = key - NUM_1;
			// let isShift = event.shiftKey;
			console.log(key);
			if (key == 46 && game.GAME_STATE == 0) { // delete
				let idx = game.instructionsAtMain.length - 1;
				game.instructionsAtMain[idx].deleted = true;
				game.instructionsAtBox[game.instructionsAtMainFrom[idx]].deleted = false;
				game.instructionsAtMain.pop();
				game.instructionsAtMainFrom.pop();
				// if (instructionPicked < game.instructionsAtMain.length) {
				// 	game.instructionsAtMain[instructionPicked].deleted = true;
				// 	game.instructionsAtBox[game.instructionsAtMainFrom[instructionPicked]].deleted = false;
				// }
			} else if (key == 13) { // enter
				// for (let i = 0; i < game.instructionsAtMain.length; i++) {
					if (game.GAME_STATE == 1 && game.ptr == game.instructionsAtMain.length) {
						game.reset();
						return;
					}
					if (game.ptr < game.instructionsAtMain.length) {
						game.robot.move(game.instructionsAtMain[game.ptr].id);
						game.ptr++;
						game.GAME_STATE = 1;
					}
					// game.curMove = game.instructionsAtMain[i].id;
					// game.draw(game.context);
					// requestAnimationFrame(gameLoop);
					// this.sleepFor(500);
				// }
				// game.robot.instructions = game.instructionsAtMain;
				// game.robot.animate();
			} else if (key == 32) {
				// if (game.GAME_STATE == 1 && game.ptr == game.instructionsAtMain.length) {
				// 	game.reset();
				// }
			} else {
				if (instructionPicked < game.instructionsAtBox.length && !game.instructionsAtBox[instructionPicked].deleted && game.GAME_STATE == 0) {
					game.instructionsAtBox[instructionPicked].deleted = true;
					let id = game.instructionsAtBox[instructionPicked].id;
					let next = game.instructionsAtMain.length;
					let position = {
						x: 500 + (next % 5) * 40,
						y: 100 + Math.floor(next / 5) * 40
					}
					for (let i = 0; i < game.instructionsAtMain.length; i++) {
						if (game.instructionsAtMain[i].deleted) {
							position.x = 400 + (i % 5) * 40;
							position.y = 100 + Math.floor(i / 5) * 40;
							break;
						}
					}
					game.instructionsAtMain.push(new Instructions(id, position));
					game.instructionsAtMainFrom.push(instructionPicked);
				}
			}
		});
	}

	// sleepFor(sleepDuration) {
 //    var now = new Date().getTime();
 //    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
	// }
}