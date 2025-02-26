import Tile from "./tile";
import { TILE_KEYS, TILE_SIZE } from "../utils/constants";

/**
 * Class representing a game level composed of a grid of tiles.
 */
export default class Level {
    /**
     * Constructs a Level instance.
     * @param {Object} levelData - Data object containing level configuration.
     * @param {Array} levelData.Grid - A 2D array representing the tile map.
     */
    constructor(levelData) {
        // Initialize an empty grid array.
        this.grid = [];
        // Retrieve the tile map from level data.
        this.tileMap = levelData["Grid"];
        // Set tile keys from constants for determining tile properties.
        this.keys = TILE_KEYS;
        // Set the size for each tile.
        this.tileSize = TILE_SIZE;
        // Populate the grid with Tile instances based on the tile map.
        this.initGrid(this.tileMap);
    }

    /**
     * Initializes the grid based on the provided tile map.
     * Iterates over each cell in the tile map and creates a corresponding Tile instance.
     * @param {Array} tileMap - A 2D array representing the tile identifiers.
     */
    initGrid(tileMap) {
        for (let row = 0; row < tileMap.length; row++) {
            // Initialize the current row in the grid.
            this.grid[row] = [];
            for (let col = 0; col < tileMap[row].length; col++) {
                // Retrieve the tile identifier from the tile map.
                const tileId = tileMap[row][col];
                // Use the tileId to get additional properties like solidity and color.
                const key = this.keys[tileId];
                // Create a new Tile instance with its position and properties.
                const tile = new Tile(
                    tileId,
                    col * this.tileSize,  // X position based on column index.
                    row * this.tileSize,  // Y position based on row index.
                    this.tileSize,
                    key.solid,
                    key.color
                );
                // Add the tile to the grid at the current row and column.
                this.grid[row][col] = tile;
            }
        }
    }

    /**
     * Renders the level by drawing all tiles on the provided canvas context.
     * @param {CanvasRenderingContext2D} contex - The canvas 2D context to draw on.
     */
    render(contex) {
        // Iterate over each row of the grid.
        for (let row of this.grid) {
            // For each tile in the row, call its render method.
            for (let tile of row) {
                tile.render(contex);
            }
        }
    }

    /**
     * Retrieves the tile at the specified coordinates.
     * If no tile exists at the coordinates, returns null.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @returns {Tile|null} The tile at the coordinates, or null if out of bounds.
     */
    getTileAt(x, y) {
        // Calculate grid column and row based on the tile size.
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);

        // Check boundaries. (Assumes a square grid; adjust if grid dimensions differ.)
        if (row >= 0 && row < this.grid.length &&
            col >= 0 && col < this.grid.length) {
            return this.grid[row][col];
        }
        return null;
    }

    /**
     * Retrieves all tiles that intersect with the given bounding box.
     * Useful for collision detection.
     * @param {Object} boundingBox - The bounding box with top, bottom, left, and right properties.
     * @returns {Tile[]} An array of tiles within the bounding box.
     */
    getTilesInArea(boundingBox) {
        // Calculate the starting and ending rows and columns that intersect the bounding box.
        const startRow = Math.floor(boundingBox.top / this.tileSize);
        const endRow = Math.ceil(boundingBox.bottom / this.tileSize);
        const startCol = Math.floor(boundingBox.left / this.tileSize);
        const endCol = Math.ceil(boundingBox.right / this.tileSize);

        const tiles = [];
        // Loop over the computed rows and columns to collect tiles.
        for (let row = startRow; row < endRow; row++) {
            for (let col = startCol; col < endCol; col++) {
                const tile = this.grid[row][col];
                if (tile) tiles.push(tile);
            }
        }
        return tiles;
    }

    /**
     * Retrieves the tiles immediately below the given bounding box.
     * @param {Object} boundingBox - The bounding box with top, bottom, left, and right properties.
     * @returns {Tile[]} An array of tiles directly below the bounding box.
     */
    getTilesBelow(boundingBox) {
        // Calculate the row index just below the bounding box.
        const row = Math.floor((boundingBox.bottom + 1) / this.tileSize);
        // Calculate the range of columns that span the bounding box.
        const startCol = Math.floor(boundingBox.left / this.tileSize);
        const endCol = Math.ceil(boundingBox.right / this.tileSize);

        const tiles = [];
        // Loop through the columns to collect the tile below.
        for (let col = startCol; col < endCol; col++) {
            const tile = this.grid[row][col];
            if (tile) tiles.push(tile);
        }
        return tiles;
    }

    /**
     * Retrieves the tiles immediately to the right of the given bounding box.
     * @param {Object} boundingBox - The bounding box with top, bottom, left, and right properties.
     * @returns {Tile[]} An array of tiles directly to the right of the bounding box.
     */
    getTilesRight(boundingBox) {
        // Calculate the column index at the right edge of the bounding box.
        const col = Math.floor(boundingBox.right / this.tileSize);
        // Determine the range of rows that span the bounding box.
        const startRow = Math.floor(boundingBox.top / this.tileSize);
        const endRow = Math.ceil(boundingBox.bottom / this.tileSize);

        const tiles = [];
        // Loop through the rows to collect the tile on the right.
        for (let row = startRow; row < endRow; row++) {
            const tile = this.grid[row][col];
            if (tile) tiles.push(tile);
        }
        return tiles;
    }

    /**
     * Retrieves the tiles immediately to the left of the given bounding box.
     * @param {Object} boundingBox - The bounding box with top, bottom, left, and right properties.
     * @returns {Tile[]} An array of tiles directly to the left of the bounding box.
     */
    getTilesLeft(boundingBox) {
        // Calculate the column index to the left of the bounding box.
        const col = Math.floor((boundingBox.left - 1) / this.tileSize);
        // Determine the range of rows that span the bounding box.
        const startRow = Math.floor(boundingBox.top / this.tileSize);
        const endRow = Math.ceil(boundingBox.bottom / this.tileSize);

        const tiles = [];
        // Loop through the rows to collect the tile on the left.
        for (let row = startRow; row < endRow; row++) {
            const tile = this.grid[row][col];
            if (tile) tiles.push(tile);
        }
        return tiles;
    }
}
