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

        this.offsetX = 0;
        this.offsetY = 0;
    }

/**
 * Updates the camera's position based on the target's current position.
 * Calculates the desired offset using the target's bounding box and the viewport,
 * then gradually updates the persistent offset using the smoothing factor.
 */
update(deltaTime) {
    // Get the target's bounding box in world coordinates.
    const targetBox = this.target.getBoundingBox();

    // Check if the target is outside the viewport.
    if (!this.isWithinViewport(targetBox)) {
        // Calculate the desired offset needed to bring the target within the viewport.
        const { offsetX: desiredOffsetX, offsetY: desiredOffsetY } = calculateCameraOffset(targetBox, this.viewport);

        // Gradually adjust the stored offsets toward the desired offsets.
        // Use deltaTime if you want time-based smoothing.
        this.offsetX += (desiredOffsetX - this.offsetX) * this.smoothing * deltaTime;
        this.offsetY += (desiredOffsetY - this.offsetY) * this.smoothing * deltaTime;
        
        this.applyTransform();
    }
}


    /**
     * Checks if any part of the target is inside the deadzone 
     * @param {object} box - The boundning box for the target entity
     */
    isWithinViewport(box) {
        
        return(
            box.left > this.viewport.left &&
            box.top > this.viewport.top &&
            box.right < this.viewport.right &&
            box.bottom < this.viewport.bottom
        );
    }

/**
 * Applies the camera's transformation to the canvas context.
 * This shifts all subsequent rendering by the negative of the camera's stored offset,
 * so that the world appears to move relative to the camera.
 */
applyTransform() {
    // Translate the context by the negative of the stored offsets.
    // This brings the camera's desired world offset into effect.
    this.context.translate(this.offsetX, this.offsetY);
}


    /**
     * Resets the canvas context's transformation to its default state.
     * This should be called after rendering the game world.
     * Makes sure that UI elements or overlays are drawn correctly 
     * @param {CanvasRenderingContext2D} context - The canvas drawing context.
     */
    resetTransform(context) {}
}
