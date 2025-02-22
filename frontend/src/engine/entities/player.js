import Matter from "matter-js";
import PhysicsEntity from "./physicsEntity";

export default class Player extends PhysicsEntity {
    constructor(x, y, width, height, mass, color) {
        // Create a Matter.js rectangle body for the player
        super(x, y, width, height, mass, { restitution: 0, friction: 0.5,});

        this.color = color;
        this.speed = 5; // Adjusted for Matter.js scale

    }

    handleInput(input) {
        let velocity = { x: 0, y: this.body.velocity.y };
    
        if (input.isKeyPressed("ArrowRight")) {
            velocity.x = this.speed;
        }
        if (input.isKeyPressed("ArrowLeft")) {
            velocity.x = -this.speed;
        }
        if (input.isKeyPressed(" ")) {
            this.jump();
        }
    
        // Apply new velocity
        Matter.Body.setVelocity(this.body, velocity);
    }

    jump() {
        const jumpForce = { x: 0, y: -0.02 }; // Adjust as needed
        Matter.Body.applyForce(this.body, this.body.position, jumpForce);
    }
    
    update(input) {
        this.handleInput(input);
    }

    render(context) {
        const { x, y } = this.body.position;

        context.fillStyle = this.color;
        context.fillRect(
            x - this.width / 2, 
            y - this.height / 2,
            this.width,
            this.height);
    }
}