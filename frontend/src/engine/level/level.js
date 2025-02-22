import Matter from "matter-js";
import Tile from "./tile";
import PhysicsEngine from "../core/physicsEngine";

export default class Level {
    constructor(tileMap, tileSize, keys) {
        this.grid = [];
        this.tileSize = tileSize;
        this.keys = keys;
        this.tiles = [];

        this.initGrid(tileMap);
    }

    initGrid(tileMap) {
        for (let row = 0; row < tileMap.length; row++) {
            this.grid[row] = [];
            for (let col = 0; col < tileMap[row].length; col++) {
                const tileId = tileMap[row][col];
                const key = this.keys.find((k) => k.id === tileId);
                const isSolid = key ? key.solid : false;
                const color = key ? key.color : "white";

                // Create a tile object
                const tile = new Tile(tileId, col * this.tileSize, row * this.tileSize, this.tileSize, isSolid, color);
                this.grid[row][col] = tile;
                this.tiles.push(tile);
            }
        }
    }

    render(context) {
        for (let tile of this.tiles) {
            tile.render(context);
        }
    }
}
