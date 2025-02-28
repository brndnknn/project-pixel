

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