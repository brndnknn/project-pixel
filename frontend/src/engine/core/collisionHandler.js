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

    handleCollisions(physicsObject) {
        const objectBox = physicsObject.getBoundingBox();
        const nearbyTiles = this.level.getTilesInArea(objectBox);

        for (const tile of nearbyTiles) {
            if (!tile.isSolid) continue;
             const tileBox = tile.getBoundingBox();

             if(this.isOverlapping(objectBox, tileBox)) {
                this.resolveCollision(physicsObject, objectBox, tileBox);
             }
        }
    }

    resolveCollision(physicsObject, objectBox, tileBox) {
        const overlapX = Math.min(objectBox.right - tileBox.left, tileBox.right - objectBox.left);
        const overlapY = Math.min(objectBox.bottom - tileBox.top, tileBox.bottom - objectBox.top);
        console.log("overlapX", overlapX);
        console.log("overlapY", overlapY);

        if (overlapX < overlapY) {
            // Horizontal collision
            if (objectBox.left < tileBox.left) {
                physicsObject.x -= overlapX; // move left
            } else {
                physicsObject.x += overlapX; // move right;
            }
            physicsObject.vX = 0;
        } else {
            // vertical collision
            if( objectBox.top < tileBox.top) {
                physicsObject.y -= overlapY;
                physicsObject.isGrounded = true;
            } else {
                physicsObject.y += overlapY;
            }
            physicsObject.vY = 0;
        }
    }


}