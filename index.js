import Game from './game.js'

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

// ctx.font = "30px Arial";
// ctx.fillStyle = "black";
// ctx.fillText('KONYOL!!!!!', 400, 400);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);

let lastTime = 0;

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

export default function gameLoop(timestamp) {
	let deltaTime = timestamp - lastTime;
	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	game.update();
	game.draw(ctx);
	// sleepFor(500);
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);