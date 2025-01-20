export default class Tile {
    constructor(id, x, y, size, isSolid = false, color = 'white') {
        this.id = id,
        this.x = x,
        this.y = y,
        this.size = size,
        this.isSolid = isSolid,
        this.color = color;
    }

    render(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }

    getBoundingBox(){
        return {
            left: this.x, 
            top: this.y, 
            right: this.x + this.size,
            bottom: this.y + this.size
        };
    }
}