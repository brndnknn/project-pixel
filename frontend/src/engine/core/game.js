import Player from "./player.js";
import InputHandler from "./inputHandler.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.player = new Player(50, 50, 30, 30, 'blue');
        this.lastTime = 0;
        this.input = new InputHandler;
    }

    start() {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(deltaTime, this.input);
        this.render();

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    update(deltaTime, input) {
        // Update the player 
        this.player.update(deltaTime, input);
    }

    render() {
        // clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.context);
    }
}