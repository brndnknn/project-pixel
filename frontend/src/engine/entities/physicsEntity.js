import Matter from "matter-js";
import PhysicsEngine from "../core/physicsEngine";

class PhysicsEntity {
  constructor(x, y, width, height, mass = 1, options = {}) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, { mass, ...options });
    this.width = width;
    this.height = height;
    
    Matter.World.add(PhysicsEngine.world, this.body);
  }

  applyForce(forceX, forceY) {
    Matter.Body.applyForce(this.body, this.body.position, { x: forceX, y: forceY });
  }

  get position() {
    return this.body.position;
  }
}

export default PhysicsEntity;
