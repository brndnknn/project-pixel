import Matter from "matter-js";
import PhysicsEngine from "../core/physicsEngine";

export default class Tile {
    constructor(id, x, y, size, isSolid = false, color = "white") {
        this.id = id;
        this.size = size;
        this.isSolid = isSolid;
        this.color = color;

        // Create a static Matter.js body if the tile is solid
        this.body = Matter.Bodies.rectangle(
            x + size / 2, // Matter.js bodies are centered
            y + size / 2,
            size,
            size,
            { isStatic: isSolid, render: { fillStyle: color } }
        );

        // Add the tile body to the Matter.js world
        Matter.World.add(PhysicsEngine.world, this.body);
    }

    render(context) {
        context.fillStyle = this.color;
        context.fillRect(
            this.body.position.x - this.size / 2,
            this.body.position.y - this.size / 2,
            this.size,
            this.size
        );
    }
}
