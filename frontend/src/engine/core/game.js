import Player from "../entities/player.js";
import InputHandler from "./inputHandler.js";
import Level from "../level/level.js";
import PhysicsEngine from "./physicsEngine.js";
import CollisionHandler from "../collisions/collisionHandler.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.player = new Player(50, 50, 50, 50, 1, 'blue');
        this.lastTime = 0;
        this.input = new InputHandler();

        const levelGrid = [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Ground tiles
        ];
        const tileSize = 32;
        const keys = [
            {id: 0, color: 'White', solid: 0},
            {id: 1, color: 'Black', solid: 1},
        ]

        this.level = new Level(levelGrid, tileSize, keys);
        this.objects = [this.player];
        this.physicsEngine;
        this.collisionHandler


        
    }

    start() {

        this.collisionHandler = new CollisionHandler(this. level);
        this.physicsEngine = new PhysicsEngine(5, this.collisionHandler);
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
        //this.player.update(deltaTime, input)

        // console.log(this.objects)

        this.physicsEngine.update(this.objects, deltaTime, input, this.level);
    }

    render() {
        // clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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