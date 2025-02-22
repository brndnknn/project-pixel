import Matter from "matter-js";

class PhysicsEngine {
  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;

    // Optional: Configure gravity
    this.engine.gravity.y = 1.5;
  }

  update(deltaTime) {
    Matter.Engine.update(this.engine, deltaTime * 1000);
  }
}

export default new PhysicsEngine();
