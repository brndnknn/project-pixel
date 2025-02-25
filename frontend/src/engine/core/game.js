import Player from "../entities/player.js";
import InputHandler from "./inputHandler.js";
import Level from "../level/level.js";
import PhysicsEngine from "./physicsEngine.js";
import CollisionHandler from "../collisions/collisionHandler.js";
import { loadLevel } from "../utils/levelLoader.js";
import { FIXED_TIMESTAMP } from "../utils/constants.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.player = new Player(50, 50, 50, 50, 1);
        this.lastTime = 0;
        this.accumulator = 0;
        this.input = new InputHandler();
        this.objects = [this.player];

        this.level;
        this.levelData;
        this.physicsEngine;
        this.collisionHandler;
    }

    async start() {

        const levelData = await loadLevel('levelData');
        this.level = new Level(levelData);

        this.collisionHandler = new CollisionHandler(this.level);
        this.physicsEngine = new PhysicsEngine(3, this.collisionHandler);
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        // Calculate the elapsed time in seconds
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Add the elapsed itme to the accumulator
        this.accumulator += deltaTime;

        // Update the physics engine with fixed timestep steps
        while (this.accumulator >= FIXED_TIMESTAMP) {
            // update physics using the fixed timestep
            this.physicsEngine.update(this.objects, FIXED_TIMESTAMP, this.input);
            this.accumulator -= FIXED_TIMESTAMP;
        }

        // Calculate interpolation factor (0 to 1)
        const alpha = this.accumulator / FIXED_TIMESTAMP;

        // Render the current state, optionally using alpha for interpolation
        this.render(alpha);

        //this.update(deltaTime, this.input);
        //this.render();

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }


    render(alpha) {
        // clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Optionally, use 'alpha' to interpolate between previous and current state
        // For instance, if your entity stores previousX, previousY and current x, y:
        // let interpolatedX = this.player.previousX * (1 - alpha) + this.player.x * alpha;
        // let interpolatedY = this.player.previousY * (1 - alpha) + this.player.y * alpha;
        // Then draw your entity at (interpolatedX, interpolatedY).

        this.level.render(this.context);
        this.player.draw(this.context);
    }

    renderLevel() {
        for (let row = 0; row < this.level.grid.length; row++) {
            for (let col = 0; col < this.level.grid[row].length; col++) {
                if(this.level.grid[row][col] === 1) {
                    this.context.fillStyle = 'Black';
                    this.context.fillRect(
                        col * this.level.tileSize,
                        row * this.level.tileSize,
                        this.level.tileSize,
                        this.level.tileSize
                    );
                }
            }
        }
    }
}