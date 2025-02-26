import Player from "../entities/player.js";
import InputHandler from "./inputHandler.js";
import Level from "../level/level.js";
import PhysicsEngine from "./physicsEngine.js";
import CollisionHandler from "../collisions/collisionHandler.js";
import { loadLevel } from "../utils/levelLoader.js";
import { FIXED_TIMESTAMP } from "../utils/constants.js";

/**
 * Main game class that orchestrates initialization, updates, and rendering.
 */
export default class Game {
    /**
     * Creates a new Game intstance.
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game. 
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.player = new Player(50, 50, 50, 50, 1);
        this.lastTime = 0;
        this.accumulator = 0;
        this.input = new InputHandler();
        this.objects = [this.player];

        // Level and engine components to be initialized later. 
        this.level;
        this.levelData;
        this.physicsEngine;
        this.collisionHandler;
    }

        /**
     * Initializes and starts the game.
     * Loads level data asynchronously, sets up collision and physics handlers,
     * and begins the game loop.
     */
    async start() {
        const levelData = await loadLevel('levelData');
        this.level = new Level(levelData);

        this.collisionHandler = new CollisionHandler(this.level);
        this.physicsEngine = new PhysicsEngine(3, this.collisionHandler);
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }


    /**
     * Main game loop for updating physics and rendering.
     *
     * Calculates delta time, accumulates time to run fixed-timestep physics updates,
     * and then renders the frame using interpolation (alpha) for smooth transitions.
     *
     * @param {DOMHighResTimeStamp} timestamp - The current time provided by requestAnimationFrame.
     */
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

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    /**
     * Renders the game state onto the canvas.
     *
     * Clears the canvas and draws the level and the player.
     * Optionally, interpolation can be applied for smoother animations.
     *
     * @param {number} alpha - The interpolation factor (between 0 and 1).
     */
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

    /**
     * Renders the level grid manually.
     *
     * Iterates over the level grid and draws tiles with a value of 1.
     * This method serves as an alternative rendering option for the level.
     */
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