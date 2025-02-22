import Matter from "matter-js";
import PhysicsEngine from "./physicsEngine";
import Level from "../level/level";
import Player from "../entities/player";
import InputHandler from "./inputHandler";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.input = new InputHandler();
        this.lastTime = 0;

        // Initialize game objects
        this.level = this.createLevel();
        this.player = this.createPlayer();

        // Start the Matter.js physics engine
        Matter.Runner.run(PhysicsEngine.engine);

        // Set up collision handling
        this.setupCollisionHandling();

        // Start game loop
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    // Create level using Matter.js tiles
    createLevel() {
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
            { id: 0, color: "White", solid: false},
            { id: 1, color: "Black", solid: true },
        ];

        return new Level(levelGrid, tileSize, keys);
    }

    // Create player with physics
    createPlayer() {
        return new Player(100, 100, 50, 50, 1, "blue");
    }

    // Setup collision handling with Matter.js events
    setupCollisionHandling() {
        Matter.Events.on(PhysicsEngine.engine, "collisionStart", (event) => {
            event.pairs.forEach(({ bodyA, bodyB }) => {
                if ((bodyA.label === "player" && bodyB.isStatic) || (bodyB.label === "player" && bodyA.isStatic)) {
                    this.player.onGround = true; // Enable jumping when colliding with ground
                }
            });
        });

        Matter.Events.on(PhysicsEngine.engine, "collisionEnd", (event) => {
            event.pairs.forEach(({ bodyA, bodyB }) => {
                if ((bodyA.label === "player" && bodyB.isStatic) || (bodyB.label === "player" && bodyA.isStatic)) {
                    this.player.onGround = false; // Disable jumping when leaving ground
                }
            });
        });
    }

    // Handle input and update entities
    update(input) {
        
        Matter.Engine.update(PhysicsEngine.engine);
        this.player.update(input);
    }

    // Main game loop (runs every frame)
    gameLoop(timestamp) {
        this.lastTime = timestamp;
        console.log("Player position:", this.player.body.position);

        

        // Update player and input
        this.update(this.input);

        // Render the game
        this.render();

        // Request next frame
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    // Render level and player
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.level.render(this.context);
        this.player.render(this.context);


    }
}
