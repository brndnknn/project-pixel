/**
 * Handles keyboard input by tracking active keys and resolving conflicts
 * between simultaneously pressed keys.
 */
export default class InputHandler {
    /**
     * Creates an InputHandler instance.
     * Sets up event listeners for keydown and keyup events and initializes the active keys set.
     */
    constructor() {
        this.keys = new Set();
        this.conflictingKeys = [
            ['ArrowLeft', 'ArrowRight'],
        ];

        window.addEventListener('keydown', (event) => this.keyDown(event));
        window.addEventListener('keyup', (event) => this.keyUp(event));
    }

    /**
     * Processes keydown events by adding the pressed key to the active set
     * and resolving conflicts between keys that should not be pressed simultaneously.
     *
     * @param {KeyboardEvent} event - The keyboard event triggered on keydown.
     */
    keyDown(event) {
        this.keys.add(event.key);
        // Resolve conflicting key presses (e.g., prevent both ArrowLeft and ArrowRight from being active simultaneously)
        this.conflictingKeys.forEach(([key1, key2]) => {
            if (this.keys.has(key1) && this.keys.has(key2)) {
                this.keys.delete(key1);
                this.keys.delete(key2);
            }
        });
    }

    /**
     * Processes keyup events by removing the key from the active set.
     *
     * @param {KeyboardEvent} event - The keyboard event triggered on keyup.
     */
    keyUp(event) {
        this.keys.delete(event.key);
    }

    /**
     * Checks if a specific key is currently pressed.
     *
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key is pressed, false otherwise.
     */
    isKeyPressed(key) {
        return this.keys.has(key);
    }

    /**
     * Cleans up any resources or event listeners.
     * Currently a placeholder for potential future cleanup.
     */
    destroy() {
        // Future implementation for removing event listeners could go here.
    }
}
