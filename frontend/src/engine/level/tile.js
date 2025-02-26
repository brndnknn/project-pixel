/**
 * Represents a single tile in the game level.
 * Each tile has an identifier, position, size, solidity, and color.
 */
export default class Tile {
    /**
     * Creates a new Tile instance.
     * @param {number|string} id - The identifier for the tile.
     * @param {number} x - The x coordinate of the tile's top-left corner.
     * @param {number} y - The y coordinate of the tile's top-left corner.
     * @param {number} size - The size of the tile (assuming a square tile).
     * @param {boolean} [isSolid=false] - Determines if the tile is solid (i.e., collidable).
     * @param {string} [color='white'] - The color used to render the tile.
     */
    constructor(id, x, y, size, isSolid = false, color = 'white') {
        // Initialize the tile's properties.
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.isSolid = isSolid;
        this.color = color;
    }

    /**
     * Renders the tile on the given canvas context.
     * @param {CanvasRenderingContext2D} context - The canvas 2D rendering context.
     */
    render(context) {
        // Set the fill style to the tile's color.
        context.fillStyle = this.color;
        // Draw a square representing the tile.
        context.fillRect(this.x, this.y, this.size, this.size);
    }

    /**
     * Retrieves the bounding box of the tile.
     * This is useful for collision detection.
     * @returns {Object} An object containing the left, top, right, and bottom boundaries.
     */
    getBoundingBox(){
        return {
            left: this.x,
            top: this.y,
            right: this.x + this.size,
            bottom: this.y + this.size
        };
    }
}
