

/**
 * Computes horizontal and vertical overlaps of two bounding boxes
 * Useful to determine direction of collision.
 * 
 * @param {Object} boxA - An object containing the left, top, right, and bottom boundaries.
 * @param {Object} boxB - An object containing the left, top, right, and bottom boundaries.
 * @returns 
 */
export function getOverlaps(boxA, boxB) {
    const overlapX = Math.min(boxA.right - boxB.left, boxB.right - boxA.left);
    const overlapY = Math.min(boxA.bottom - boxB.top, boxB.bottom - boxA.top);

    return [overlapX, overlapY];
};

/**
 * Calculates the camera offset adjustment based on the target's bounding box and the viewport boundaries.
 *
 * If the target is outside any side of the viewport, this function calculates how far it is outside,
 * so that the camera can be moved to bring the target back within the viewport.
 *
 * @param {Object} targetBox - An object with properties: top, right, bottom, and left representing the target's bounding box.
 * @param {Object} viewportBox - An object with properties: top, right, bottom, and left representing the viewport boundaries.
 * @returns {Object} An object containing:
 *    - offsetX: The horizontal offset adjustment.
 *    - offsetY: The vertical offset adjustment.
 */
export function calculateCameraOffset(targetBox, viewportBox) {
    let offsetX = 0;
    let offsetY = 0;

    // Check horizontal boundaries:
    // If the target's left edge is to the left of the viewport, we need a positive offset.
    if (targetBox.left < viewportBox.left) {
        offsetX = viewportBox.left - targetBox.left;
    }
    // Otherwise, if the target's right edge is to the right of the viewport, we need a negative offset.
    else if (targetBox.right > viewportBox.right) {
        offsetX = viewportBox.right - targetBox.right;
    }

    // Check vertical boundaries:
    // If the target's top edge is above the viewport, we need a positive offset.
    if (targetBox.top < viewportBox.top) {
        offsetY = viewportBox.top - targetBox.top;
    }
    // Otherwise, if the target's bottom edge is below the viewport, we need a negative offset.
    else if (targetBox.bottom > viewportBox.bottom) {
        offsetY = viewportBox.bottom - targetBox.bottom;
    }

    return { offsetX, offsetY };
}

/**
 * Clamps a number between a minimum and maximum value.
 * 
 * @param {number} value - The number you want to clamp.
 * @param {number} min - The lower boundary.
 * @param {number} max - The upper boundary.
 * @returns {number} The clamped result.
 */
export function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }
