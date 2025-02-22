import Matter from "matter-js";
import PhysicsEngine from "../core/physicsEngine";

class PhysicsEntity {
  constructor(x, y, width, height, mass = 1, options = {}) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, { mass, ...options });
    this.width = width;
    this.height = height;

    Matter.World.add(PhysicsEngine.world, this.body);
  }
}

export default PhysicsEntity;
