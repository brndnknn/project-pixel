import { GRAVITY } from "../utils/constants";

export default class PhysicsEngine {
    constructor( gravity = GRAVITY, collisionHandler) {
        this.gravity = gravity;
        this.collisionHandler = collisionHandler;
    }

    update(entities, deltaTime, input) {
        entities.forEach(entity => {

            if(!entity.isGrounded){
                entity.applyForce(0, this.gravity * entity.mass);
            }

            entity.resetHorizontalBlocks();
            this.collisionHandler.checkHorizontalBlock(entity);
            entity.update(deltaTime, input);

            this.collisionHandler.handleCollisions(entity);

            if(entity.isGrounded){
                entity.isGrounded = this.collisionHandler.revalidateGroundedState(entity);
            }

        });
    }
}