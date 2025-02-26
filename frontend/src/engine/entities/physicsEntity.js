/**
 * Class representing a physics entity in the game.
 * Encapsulates properties for position, size, mass, velocity,
 * and collision/blocking states.
 */
export default class PhysicsEntity {
    /**
     * Creates a new PhysicsEntity.
     * @param {number} x - The initial x coordinate.
     * @param {number} y - The initial y coordinate.
     * @param {number} width - The width of the entity.
     * @param {number} height - The height of the entity.
     * @param {number} [mass=1] - The mass of the entity.
     */
    constructor(x, y, width, height, mass = 1) {
        // Position coordinates
        this.x = x;
        this.y = y;
        // Dimensions of the entity
        this.width = width;
        this.height = height;
        // Physical property: mass influences how force affects velocity
        this.mass = mass; 
        // Initial velocities (pixels per second or similar unit)
        this.vX = 0;
        this.vY = 0;
        // Flag to indicate if the entity is currently on the ground
        this.isGrounded = false;
        // Object tracking collision blocks on horizontal sides
        this.blocked = {
            right: false,
            left: false
        };
    }

    /**
     * Applies a force to the entity, altering its velocity.
     * The force is divided by the mass to simulate acceleration.
     * @param {number} forceX - The force applied in the horizontal direction.
     * @param {number} forceY - The force applied in the vertical direction.
     */
    applyForce(forceX, forceY) {
        // Update velocity based on force and mass (Newton's second law: F = ma)
        this.vX += forceX / this.mass;
        this.vY += forceY / this.mass;
    }

    /**
     * Updates the entity's position based on its velocity.
     * Uses simple Euler integration for motion.
     * @param {number} deltaTime - The time elapsed since the last update (in seconds).
     */
    update(deltaTime) {
        // Update positions by scaling velocity with the elapsed time
        this.x += this.vX * deltaTime;
        this.y += this.vY * deltaTime;
    }

    /**
     * Computes the bounding box of the entity.
     * Useful for collision detection.
     * @returns {Object} An object containing the left, top, right, and bottom boundaries.
     */
    getBoundingBox() {
        return {
            left: this.x, 
            top: this.y, 
            right: this.x + this.width,
            bottom: this.y + this.height
        };
    }

    /**
     * Resets the horizontal blocked flags.
     * This is typically called after collision handling to clear the state.
     */
    resetHorizontalBlocks() {
        this.blocked.right = false;
        this.blocked.left = false;
    }
}
