/**
 * Handles collision detection and resolution between physics entities and level tiles.
 *
 * This class encapsulates logic to detect overlapping bounding boxes and resolve collisions by adjusting entity positions.
 *
 * @class CollisionHandler
 * @param {Level} level - The game level containing tile information.
 */
import PhysicsEntity from "../entities/physicsEntity";

export default class CollisionHandler {
    /**
     * Creates a CollisionHandler instance.
     *
     * @param {Level} level - The game level containing tile information.
     */
    constructor(level) {
        this.level = level;
    }

    /**
     * Determines if two bounding boxes are overlapping.
     *
     * @param {Object} boxA - The first bounding box with properties: left, top, right, bottom.
     * @param {Object} boxB - The second bounding box with properties: left, top, right, bottom.
     * @returns {boolean} True if the boxes overlap, otherwise false.
     */
    isOverlapping(boxA, boxB) {
        return (
            boxA.right > boxB.left &&
            boxA.left < boxB.right &&
            boxA.bottom > boxB.top &&
            boxA.top < boxB.bottom
        );
    }

    /**
     * Detects and resolves collisions for a given physics entity with nearby solid tiles.
     *
     * Retrieves the entity's bounding box and nearby tiles, checks for overlaps with solid tiles,
     * and resolves any collisions found.
     *
     * @param {PhysicsEntity} physicsEntity - The physics entity to check for collisions.
     */
    handleCollisions(physicsEntity) {
        let entityBox = physicsEntity.getBoundingBox();
        const nearbyTiles = this.level.getTilesInArea(entityBox);

        for (const tile of nearbyTiles) {
            if (!tile.isSolid) continue;
            const tileBox = tile.getBoundingBox();

            if (this.isOverlapping(entityBox, tileBox)) {
                this.resolveCollision(physicsEntity, entityBox, tileBox);
            }

            // Refresh bounding box to prevent double correction.
            entityBox = physicsEntity.getBoundingBox();
        }
    }

    /**
     * Resolves a collision between a physics entity and a tile.
     *
     * Calculates the minimum overlap along the X and Y axes and adjusts the entity's position accordingly.
     * For horizontal collisions, the entity is moved left or right. For vertical collisions, it is moved
     * up or down, and the grounded state is updated.
     *
     * @param {PhysicsEntity} physicsEntity - The entity involved in the collision.
     * @param {Object} entityBox - The current bounding box of the entity.
     * @param {Object} tileBox - The bounding box of the tile being collided with.
     */
    resolveCollision(physicsEntity, entityBox, tileBox) {
        const overlapX = Math.min(entityBox.right - tileBox.left, tileBox.right - entityBox.left);
        const overlapY = Math.min(entityBox.bottom - tileBox.top, tileBox.bottom - entityBox.top);

        if (overlapX < overlapY) {
            // Horizontal collision: adjust x position.
            if (entityBox.left < tileBox.left) {
                physicsEntity.x -= overlapX;
            } else {
                physicsEntity.x += overlapX;
            }
            physicsEntity.vX = 0;
        } else {
            // Vertical collision: adjust y position and update grounded state.
            if (entityBox.top < tileBox.top) {
                physicsEntity.y -= overlapY;
                physicsEntity.isGrounded = true;
            } else {
                physicsEntity.y += overlapY;
            }
            physicsEntity.vY = 0;
        }
    }

    /**
     * Revalidates whether the physics entity is grounded.
     *
     * Checks the tiles directly below the entity. If any tile is solid, the entity is considered grounded.
     *
     * @param {PhysicsEntity} physicsEntity - The physics entity to revalidate.
     * @returns {boolean} True if the entity is grounded, false otherwise.
     */
    revalidateGroundedState(physicsEntity) {
        const entityBox = physicsEntity.getBoundingBox();
        const tilesBelow = this.level.getTilesBelow(entityBox);

        for (const tile of tilesBelow) {
            if (tile.isSolid) return true;
        }
        return false;
    }

    /**
     * Checks for horizontal blocks against solid tiles.
     *
     * Determines whether there are solid tiles immediately to the right or left of the physics entity
     * and sets the corresponding blocked flags on the entity.
     *
     * @param {PhysicsEntity} physicsEntity - The physics entity to check.
     */
    checkHorizontalBlock(physicsEntity) {
        const entityBox = physicsEntity.getBoundingBox();
        const tilesRight = this.level.getTilesRight(entityBox);
        const tilesLeft = this.level.getTilesLeft(entityBox);

        for (const tile of tilesRight) {
            if (tile.isSolid) {
                physicsEntity.blocked.right = true;
            }
        }

        for (const tile of tilesLeft) {
            if (tile.isSolid) {
                physicsEntity.blocked.left = true;
            }
        }
    }
}
