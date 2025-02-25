import PhysicsEntity from "./physicsEntity";
import { PLAYER } from "../utils/constants";

export default class Player extends PhysicsEntity {
    constructor(x, y){
        super(x, y, PLAYER.WIDTH, PLAYER.HEIGHT, PLAYER.MASS);
        this.color = PLAYER.COLOR;
        this.speed = PLAYER.SPEED; // Pixels per second
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
            this.vX = -this.speed;
        }

        jump(){
            this.vY = PLAYER.JUMP_FORCE;
            this.isGrounded = false;
        }
}