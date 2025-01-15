export default class Player {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.vx = 0; // Horizontal velocity
        this.vy = 0; // Vertical velocity
        this.speed = 200; // Pixels per second
        
    };

    update(deltaTime, input) {

        this.handleInput(input);
        // Update position based on velocity
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        

        // Prevent moving outside the canvas boundaries
        // update so Canvas size isn't hard coded
        this.x = Math.max(0, Math.min(this.x, 800 - this.width)); 
        this.y = Math.max(0, Math.min( this.y, 600 - this.height));
    }

    draw(context) {
        // draw player as a rectangle
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    handleInput(input) {
        this.vx = 0;
            if(input.isKeyPressed("ArrowRight")){
                this.moveRight();
            }
            if(input.isKeyPressed("ArrowLeft")){
                this.moveLeft();
            }
        }

        moveRight(){
            this.vx = this.speed;
        }

        moveLeft(){
            this.vx = 0 - this.speed;
        }

        jump(){

        }
}