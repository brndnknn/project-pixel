import PhysicsEntity from "./physicsEntity";
import { ENEMY } from "../utils/constants";

/**
 * Enemy represents a bouncing enemy entity that is rendered as a circle.
 * This enemy automatically initiates jumps, mimicking autonomous behavior.
 * Extends PhysicsEntity to inherit basic physics properties.
 */
export default class Enemy extends PhysicsEntity {
    /**
     * Creates a new Enemy instance.
     * @param {number} x - The initial x coordinate.
     * @param {number} y - The initial y coordinate.
     */
    constructor(x, y) {
        super(x, y, ENEMY.WIDTH, ENEMY.HEIGHT, ENEMY.MASS);
        this.color = ENEMY.COLOR;
        this.vX = 0;
        this.vY = 0;
        this.isGrounded = false;
    }

    /**
     * Updates the enemy's state.
     * Handles autonomous jump behavior and any other enemy-specific updates.
     * @param {number} deltaTime - The elapsed time since the last update.
     */
    update(deltaTime) {
        this.bounce();
        super.update(deltaTime);
    }

    /**
     * Draws the enemy as a circle on the canvas.
     * @param {CanvasRenderingContext2D} context - The canvas drawing context.
     */
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Initiates a bounce for the enemy.
     *
     * Checks if the enemy is currently grounded. If so, sets the vertical velocity to the defined jump force
     * (from ENEMY.JUMP_FORCE) and marks the enemy as not grounded.
     */
    bounce(){
        if(this.isGrounded){
            this.vY = ENEMY.JUMP_FORCE;
            this.isGrounded = false;
        }
    }
}
