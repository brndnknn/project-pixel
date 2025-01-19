export default class PhysicsEngine {
    constructor( gravity = 2) {
        this.gravity = gravity;
    }

    update(objects, deltaTime, input, level) {
        objects.forEach(object => {

            if(!object.isGrounded){
                object.applyForce(0, this.gravity * object.mass);
            }
            object.update(deltaTime, input);

            this.handleCollisions(object, level);

        });
    }

    handleCollisions(physicsObject, level) {
        const objectBox = physicsObject.getBoundingBox();

        // get and check nearby tiles
        const nearbyTiles = level.getTilesInArea(objectBox);
        for (const tile of nearbyTiles) {

            // ignore non-solid tiles 
            if (!tile.isSolid) continue;

            const tileBox = tile.getBoundingBox();

            // check for overlap
            if (this.isOverlapping(objectBox, tileBox)){
                //console.log("overlap");
                //console.log(physicsObject);
                this.resolveCollision(physicsObject, objectBox, tileBox)
            }
        }
    }

    isOverlapping(boxA, boxB) {
        return(
            boxA.right > boxB.left &&
            boxA.left < boxB.right &&
            boxA.bottom > boxB.top &&
            boxA.top < boxB.bottom
        );
    }

    resolveCollision(physicsObject, objectBox, tileBox){
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