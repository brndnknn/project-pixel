import { GRAVITY } from "../utils/constants";

/**
 * Class responsible for updating physics for game entities.
 * Applies gravity, handles collision detection, and updates entity positions.
 */
export default class PhysicsEngine {
    /**
     * Creates a new PhysicsEngine instance.
     *
     * @param {number} [gravity=GRAVITY] - The gravitational force applied to entities.
     * @param {CollisionHandler} collisionHandler - The collision handler for processing collisions.
     */
    constructor(gravity = GRAVITY, collisionHandler) {
        this.gravity = gravity;
        this.collisionHandler = collisionHandler;
    }

    /**
     * Updates physics for all entities in the game.
     *
     * Applies gravity to entities that are not grounded, resets horizontal block states,
     * performs collision detection/resolution, and updates each entity's position.
     *
     * @param {Array<PhysicsEntity>} entities - The list of physics entities.
     * @param {number} deltaTime - The elapsed time since the last update.
     * @param {InputHandler} input - The current input state.
     */
    update(entities, deltaTime, input) {
        entities.forEach(entity => {
            if (!entity.isGrounded) {
                entity.applyForce(0, this.gravity * entity.mass);
            }
            entity.resetHorizontalBlocks();
            this.collisionHandler.checkHorizontalBlock(entity);
            entity.update(deltaTime, input);
            this.collisionHandler.handleCollisions(entity);
            if (entity.isGrounded) {
                entity.isGrounded = this.collisionHandler.revalidateGroundedState(entity);
            }
        });
    }
}
