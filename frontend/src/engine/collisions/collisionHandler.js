export default class CollisionHandler {
    constructor(level){
        this.level = level;
    }

    isOverlapping(boxA, boxB) {
        return(
            boxA.right > boxB.left &&
            boxA.left < boxB.right &&
            boxA.bottom > boxB.top &&
            boxA.top < boxB.bottom
        );
    }

    handleCollisions(physicsEntity) {
        let entityBox = physicsEntity.getBoundingBox();
        const nearbyTiles = this.level.getTilesInArea(entityBox);

        for (const tile of nearbyTiles) {
            if (!tile.isSolid) continue;
             const tileBox = tile.getBoundingBox();
             
             if(this.isOverlapping(entityBox, tileBox)) {

                this.resolveCollision(physicsEntity, entityBox, tileBox, tile);
             }

             // refresh bounding box to prevent double correction
             entityBox = physicsEntity.getBoundingBox();
        }
    }

    resolveCollision(physicsEntity, entityBox, tileBox, tile) {
        const overlapX = Math.min(entityBox.right - tileBox.left, tileBox.right - entityBox.left);
        const overlapY = Math.min(entityBox.bottom - tileBox.top, tileBox.bottom - entityBox.top);

        if (overlapX < overlapY) {
            // Horizontal collision
            if (entityBox.left < tileBox.left) {
                physicsEntity.x -= overlapX; // move left
            } else {
                physicsEntity.x += overlapX; // move right;
            }
            physicsEntity.vX = 0;
            console.log('horizontal collision', tile)
            console.log()
        } else {
            // vertical collision
            if( entityBox.top < tileBox.top) {
                physicsEntity.y -= overlapY;
                physicsEntity.isGrounded = true;
            } else {
                physicsEntity.y += overlapY;
            }
            physicsEntity.vY = 0;
            console.log('vertical collison', tile)
        }
    }

    revalidateGroundedState(physicsEntity) {
        const entityBox = physicsEntity.getBoundingBox();
        const tilesBelow = this.level.getTilesBelow(entityBox);

        // if any tile below is solid entity is still grounded
        for(const tile of tilesBelow) {
            if(tile.isSolid) return true;
        }

        // if no tile below is solid entity is not grounded
        return false;
    }

}