import Tile from "./tile";
import { TILE_KEYS } from "../utils/constants";
import { TILE_SIZE } from "../utils/constants";

export default class Level {
    constructor(levelData){
        this.grid = []; 
        this.tileMap = levelData["Grid"]
        this.keys = TILE_KEYS;
        this.tileSize = TILE_SIZE;
        this.initGrid(this.tileMap);
        
    }

    initGrid(tileMap){
        for (let row = 0; row < tileMap.length; row++) {
            this.grid[row] = [];
            for (let col= 0; col < tileMap[row].length; col++){
                const tileId = tileMap[row][col];
                const key = this.keys[tileId];

                const tile = new Tile(tileId, col * this.tileSize, row * this.tileSize, this.tileSize, key.solid, key.color)
                
                    this.grid[row][col] = tile;
            }
        }
    }

    render(contex) {
        for (let row of this.grid) {
            for (let tile of row) {
                tile.render(contex);
            }
        }
    }

    // returns the tile at a given set of coordinates, if no tile exists returns null
    getTileAt(x, y) {
        const col = Math.floor(x/ this.tileSize);
        const row = Math.floor(y/ this.tileSize);

        if (row >= 0 && row < this.grid.length && 
            col >= 0 && col < this.grid.length) {
                return this.grid[row][col];
            }
            return null;
    }

    // returns an array of tiles that intersect with a given bounding box
    getTilesInArea(boundingBox) {
        const startRow = Math.floor(boundingBox.top / this.tileSize);
        const endRow = Math.ceil(boundingBox.bottom / this.tileSize);
        const startCol = Math.floor(boundingBox.left / this.tileSize);
        const endCol = Math.ceil(boundingBox.right / this.tileSize);

        const tiles = [];
        for (let row = startRow; row < endRow; row++) {
            for (let col = startCol; col < endCol; col++){
                const tile = this.grid[row][col];
                if(tile) tiles.push(tile);
            }
        }
        return tiles;
    }

    // returns tiles below a given bounding box
    getTilesBelow(boundingBox) {
        const row = Math.floor((boundingBox.bottom + 1) / this.tileSize);
        const startCol = Math.floor(boundingBox.left / this.tileSize);
        const endCol = Math.ceil(boundingBox.right / this.tileSize);

        const tiles = [];
        for ( let col = startCol; col < endCol; col++){
            const tile = this.grid[row][col];
            if(tile) tiles.push(tile);
        }
        return tiles;

    }

    getTilesRight(boundingBox) {
        const col = Math.floor((boundingBox.right) / this.tileSize);
        const startRow = Math.floor(boundingBox.top / this.tileSize);
        const endRow = Math.ceil(boundingBox.bottom / this.tileSize);

        const tiles = [];
        for ( let row = startRow; row < endRow; row++) {
            const tile = this.grid[row][col];
            if(tile) tiles.push(tile);
        }
        return tiles;
    }

    getTilesLeft(boundingBox) {
        const col = Math.floor((boundingBox.left - 1) / this.tileSize);
        const startRow = Math.floor(boundingBox.top / this.tileSize);
        const endRow = Math.ceil(boundingBox.bottom / this.tileSize);

        const tiles = [];
        for ( let row = startRow; row < endRow; row++) {
            const tile = this.grid[row][col];
            if(tile) tiles.push(tile);
        }
        return tiles;
    }

}