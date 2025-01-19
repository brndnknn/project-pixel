import PhysicsObject from "./physicsObject";

export default class Player extends PhysicsObject {
    constructor(x, y, width, height, mass, color){
        super(x, y, width, height, mass);
        this.color = color;
        this.speed = 200; // Pixels per second
        this.vX = 0;
        this.vY = 0;
        this.isGrounded = false;
        
    };

    update(deltaTime, input) {

        this.handleInput(input);
        super.update(deltaTime);
    }

    draw(context) {
        // draw player as a rectangle
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    handleInput(input) {
        this.vX = 0;
            if(input.isKeyPressed("ArrowRight")){
                this.moveRight();
            }
            if(input.isKeyPressed("ArrowLeft")){
                this.moveLeft();
            }
            if(input.isKeyPressed(" ") && this.isGrounded){
                console.log("space bar")
                this.jump();
            }
        }

        moveRight(){
            this.vX = this.speed;
        }

        moveLeft(){
            this.vX = 0 - this.speed;
        }

        jump(){
            this.vY = 0 - this.speed;
            this.isGrounded = false;
            console.log(this.vY);

        }
}