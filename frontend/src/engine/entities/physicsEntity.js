export default class PhysicsEntity {
    constructor(x, y, width, height, mass = 1) {
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height;
        this.mass = mass; 
        this.vX = 0;
        this.vY = 0;
        this.isGrounded = false;
    }

    applyForce(forceX, forceY) {
        this.vX += forceX / this.mass;
        this.vY += forceY / this.mass;
    }

    update(deltaTime) {
        this.x += this.vX * deltaTime;
        this.y += this.vY * deltaTime;
    }

    getBoundingBox(){
        return {
            left: this.x, 
            top: this.y, 
            right: this.x + this.width,
            bottom: this.y + this.height
        };
    }
}