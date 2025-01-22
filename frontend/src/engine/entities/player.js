import PhysicsEntity from "./physicsEntity";

export default class Player extends PhysicsEntity {
    constructor(x, y, width, height, mass, color){
        super(x, y, width, height, mass);
        this.color = color;
        this.speed = 300; // Pixels per second
        this.vX = 0;
        this.vY = 0;
        this.isGrounded = false;
        this.blocked = {
            right: false,
            left: false
        };
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
            if(input.isKeyPressed("ArrowRight") && !this.blocked.right){
                this.moveRight();
            }
            if(input.isKeyPressed("ArrowLeft") && !this.blocked.left){
                this.moveLeft();
            }
            if(input.isKeyPressed(" ") && this.isGrounded){
                this.jump();
            }
        }

        moveRight(){
            this.vX = this.speed;
        }

        moveLeft(){
            this.vX = -200;
        }

        jump(){
            this.vY = 0 - this.speed;
            this.isGrounded = false;
        }
}