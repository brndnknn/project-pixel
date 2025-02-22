import Matter from "matter-js";

class PhysicsEngine {
  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;

    // Optional: Configure gravity
    this.engine.gravity.y = 2;
  }


}

export default new PhysicsEngine();
