export default class PhysicsEngine {
    constructor( gravity = 1.5, collisionHandler) {
        this.gravity = gravity;
        this.collisionHandler = collisionHandler;
    }

    update(entities, deltaTime, input) {
        entities.forEach(entity => {

            if(!entity.isGrounded){
                entity.applyForce(0, this.gravity * entity.mass);
            }
            entity.update(deltaTime, input);

            this.collisionHandler.handleCollisions(entity);

        });
    }
}