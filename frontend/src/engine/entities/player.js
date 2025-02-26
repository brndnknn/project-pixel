import PhysicsEntity from "./physicsEntity";
import { PLAYER } from "../utils/constants";
/**
 * Class representing the player character in the game.
 * Inherits from PhysicsEntity and adds player-specific behavior.
 */
export default class Player extends PhysicsEntity {
    /**
     * Creates a new Player instance.
     * @param {number} x - The initial x coordinate.
     * @param {number} y - The initial y coordinate.
     */
    constructor(x, y) {
        // Initialize the player using PhysicsEntity with player-specific dimensions and mass.
        super(x, y, PLAYER.WIDTH, PLAYER.HEIGHT, PLAYER.MASS);
        // Set the player's color from the constants.
        this.color = PLAYER.COLOR;
        // Define the player's movement speed (pixels per second).
        this.speed = PLAYER.SPEED;
        // Initialize velocity components.
        this.vX = 0;
        this.vY = 0;
        // Track whether the player is on the ground for jump logic.
        this.isGrounded = false;
        // Flags to track collisions that block horizontal movement.
        this.blocked = {
            right: false,
            left: false
        };
    }

    /**
     * Updates the player's state.
     * Processes input to change velocity and updates position based on physics.
     * @param {number} deltaTime - The elapsed time since the last update (in seconds).
     * @param {Object} input - An object representing the current input state.
     */
    update(deltaTime, input) {
        // Process user input to modify velocity before moving.
        this.handleInput(input);
        // Update position using the parent's update method.
        super.update(deltaTime);
    }

    /**
     * Draws the player on the provided canvas context.
     * @param {CanvasRenderingContext2D} context - The rendering context where the player will be drawn.
     */
    draw(context) {
        // Set the fill style to the player's color.
        context.fillStyle = this.color;
        // Draw the player as a rectangle based on its current position and dimensions.
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Processes input for controlling the player's movement.
     * Resets horizontal velocity and adjusts it based on key presses.
     * @param {Object} input - An object with methods to check key states.
     */
    handleInput(input) {
        // Reset horizontal velocity at the start of input handling.
        this.vX = 0;
        // Check for right arrow key press and ensure there's no collision on the right.
        if (input.isKeyPressed("ArrowRight") && !this.blocked.right) {
            this.moveRight();
        }
        // Check for left arrow key press and ensure there's no collision on the left.
        if (input.isKeyPressed("ArrowLeft") && !this.blocked.left) {
            this.moveLeft();
        }
        // Check for spacebar press to initiate a jump if the player is grounded.
        if (input.isKeyPressed(" ") && this.isGrounded) {
            this.jump();
        }
    }

    /**
     * Moves the player to the right by setting horizontal velocity.
     */
    moveRight() {
        this.vX = this.speed;
    }

    /**
     * Moves the player to the left by setting horizontal velocity.
     */
    moveLeft() {
        this.vX = -this.speed;
    }

    /**
     * Causes the player to jump by setting vertical velocity.
     * Marks the player as airborne.
     */
    jump() {
        this.vY = PLAYER.JUMP_FORCE;
        this.isGrounded = false;
    }
}
