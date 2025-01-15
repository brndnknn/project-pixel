export default class InputHandler {
    constructor() {
        // Store active keys
        this.keys = new Set();

        // Create event listeners
        window.addEventListener('keydown', (event) => this.keyDown(event));
        window.addEventListener('keyup', (event) => this.keyUp(event));
    }

    // add key to the set
    keyDown(event) {
        this.keys.add(event.key);
    }

    // remove key from the set
    keyUp(event) {
        this.keys.delete(event.key);
    }

    isKeyPressed(key) {
        // Check if the key is currently pressed
        return this.keys.has(key);
    }

    destroy(){

    }

}