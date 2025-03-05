import { CAMERA_VIEWPORT } from "../utils/constants";
import { calculateCameraOffset } from "../utils/helpers";
/**
 * Camera class manages the viewport for the game.
 * It follows a target entity (e.g., the player) and calculates an offset
 * to apply to all rendered elements, enabling dynamic world scrolling.
 */
export default class Camera {
    /**
     * Creates a new Camera instance.
     * @param {Object} target - The entity to follow (e.g., the player).
     * @param {number} canvasWidth - The width of the canvas.
     * @param {number} canvasHeight - The height of the canvas.
     * @param {number} smoothing - A factor for smoothing camera movement.
     */
    constructor(target, canvasWidth, canvasHeight, smoothing, context) {
        this.target = target;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.smoothing = smoothing;
        this.context = context;
        this.viewport = CAMERA_VIEWPORT;

        
    }

    /**
     * Updates the camera's position based on the target's current position.
     * This method may use interpolation for smoother transitions.
     * @param {number} deltaTime - The elapsed time since the last update.
     */
    update(deltaTime) {
        // console.log(this.deadZone, this.target.getBoundingBox(), this.boundryCheck());
        const playerBox = this.target.getBoundingBox();
        if(!this.boundryCheck(playerBox)){
            const {offsetX, offsetY } = calculateCameraOffset(playerBox, this.viewport);
            this.applyTransform(offsetX, offsetY);
        }
    }

    /**
     * Checks if any part of the target is inside the deadzone 
     * @param {object} box - The boundning box for the target entity
     */
    boundryCheck(box) {
        
        return(
            box.left > this.viewport.left &&
            box.top > this.viewport.top &&
            box.right < this.viewport.right &&
            box.bottom < this.viewport.bottom
        );
    }

    /**
     * Applies the camera's transformation to the canvas context.
     * This shifts all subsequent rendering by the camera's offset.
     * @param {CanvasRenderingContext2D} context - The canvas drawing context.
     */
    applyTransform(offsetX, offsetY) {
        this.context.translate(offsetX, offsetY);
    }

    /**
     * Resets the canvas context's transformation to its default state.
     * This should be called after rendering the game world.
     * Makes sure that UI elements or overlays are drawn correctly 
     * @param {CanvasRenderingContext2D} context - The canvas drawing context.
     */
    resetTransform(context) {}
}
