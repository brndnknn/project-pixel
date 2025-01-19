export default class PhysicsEngine {
    constructor( gravity = 2, collisionHandler) {
        this.gravity = gravity;
        this.collisionHandler = collisionHandler;
    }

    update(objects, deltaTime, input, level) {
        objects.forEach(object => {

            if(!object.isGrounded){
                object.applyForce(0, this.gravity * object.mass);
            }
            object.update(deltaTime, input);

            this.collisionHandler.handleCollisions(object, level);

        });
    }
}