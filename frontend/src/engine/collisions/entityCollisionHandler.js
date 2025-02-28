import { getOverlaps } from "../utils/helpers";
import CollisionHandler from "./collisionHandler";

/**
 * EntityCollisionHandler extends CollisionHandler to support collision detection and resolution
 * between physics entities (e.g., player, enemies, projectiles) rather than just tile collisions.
 */
export default class EntityCollisionHandler extends CollisionHandler {
    /**
     * Creates an EntityCollisionHandler instance.
     * @param {Level} level - The game level containing tile information.
     */
    constructor(level) {
        super(level);
    }

    /**
     * Handles collision detection between multiple physics entities.
     * Loops through pairs of entities, performs broad-phase collision detection,
     * and resolves any detected collisions.
     * @param {Array<PhysicsEntity>} entities - An array of physics entities to check.
     */
    handleEntityCollisions(entities) {
        // Handle edge case of less than 2 entities
        if(entities.length > 2) return; 

        const player = entities[0];
        const playerBox = player.getBoundingBox();

        for( let i = 1; i < entities.length; i++){
            let enemy = entities[i];
            let enemyBox = enemy.getBoundingBox();
            if(super.isOverlapping(playerBox, enemyBox)){
                this.resolveEntityCollision(player, playerBox,enemy, enemyBox)
            }
        }
    }

    /**
     * Resolves a collision between two physics entities.
     * Adjusts positions and velocities to ensure that the entities do not interpenetrate.
     * @param {PhysicsEntity} Player - The player entity involved in the collision.
     * @param {PhysicsEntity} enemy - The enemy entity involved in the collision.
     */
    resolveEntityCollision(player, playerBox, enemy, enemyBox) {
        const [overlapX, overlapY] = getOverlaps(playerBox, enemyBox);

        // check if collision is on vertical axis
        if (overlapX > overlapY){
            if (playerBox.top < enemyBox.top){
                enemy.die();
            }
        }
        else {
            player.die();
        }
    }

    /**
     * Performs broad-phase collision detection to filter out non-colliding entity pairs.
     * This method may use spatial partitioning or simple bounding box checks.
     * @param {Array<PhysicsEntity>} entities - An array of physics entities.
     * @returns {Array<Array<PhysicsEntity>>} An array of potential colliding entity pairs.
     */
    broadPhaseDetection(entities) {}
}
