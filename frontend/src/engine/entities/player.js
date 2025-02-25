import Matter from "matter-js";
import PhysicsEntity from "./physicsEntity";

export default class Player extends PhysicsEntity {
    constructor(x, y, width, height, mass, color) {
        // Create a Matter.js rectangle body for the player
        super(x, y, width, height, mass, { restitution: 0, friction: 0.01, inertia: Infinity});

        this.color = color;
        this.speed = 5; // Adjusted for Matter.js scale
        this.forceMagnitude = 0.008 * this.body.mass;


    }

    handleInput(input) {
        if (input.isKeyPressed("ArrowRight")) {
            Matter.Body.applyForce(this.body, this.body.position, { x: this.forceMagnitude, y: 0 });
        }
        if (input.isKeyPressed("ArrowLeft")) {
            Matter.Body.applyForce(this.body, this.body.position, { x: -this.forceMagnitude, y: 0 });
        }
        if (input.isKeyPressed(" ")) {
            this.jump();
        }
    
        // Apply new velocity
        //Matter.Body.setVelocity(this.body, velocity);
    }

    jump() {
        const jumpForce = { x: 0, y: -0.01  }; // Adjust as needed
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