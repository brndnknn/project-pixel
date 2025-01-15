export default class InputHandler {
    constructor() {
        // Store active keys
        this.keys = new Set();
        this.conflictingKeys = [
            ['ArrowLeft', 'ArrowRight'],
        ];

        // Create event listeners
        window.addEventListener('keydown', (event) => this.keyDown(event));
        window.addEventListener('keyup', (event) => this.keyUp(event));
    }

    // add key to the set
    keyDown(event) {
        this.keys.add(event.key);

        // reslove conflicts
        this.conflictingKeys.forEach(([key1, key2]) => {
            if(this.keys.has(key1) && this.keys.has(key2)){
                this.keys.delete(key1);
                this.keys.delete(key2);
            }
        })
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