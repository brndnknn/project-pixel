/**
 * EntityManager is responsible for managing all active game entities.
 * It centralizes creation, updating, and removal of entities.
 */
export default class EntityManager {
    constructor() {
        /**
         * Array holding all active entities.
         * @type {Array<Object>}
         */
        this.entities = [];
    }

    /**
     * Adds a new entity to the manager.
     * @param {Object} entity - The game entity to be added.
     */
    addEntity(entity) {
        this.entities.push(entity);
    }

    /**
     * Removes an entity from the manager.
     * @param {Object} entity - The game entity to be removed.
     */
    removeEntity(entity) {
        this.entities = this.entities.filter(e => e !== entity);
    }

    /**
     * Updates all managed entities.
     * Checks each entity's isDead flag, removes any that return true
     */
    updateEntities() {
        this.entities.forEach(entity => {
            if (entity.isDead === true) {
                this.removeEntity(entity);
            }
        });
    }

    /**
     * Renders all managed entities.
     * @param {CanvasRenderingContext2D} context - The canvas drawing context.
     */
    renderEntities(context) {
        this.entities.forEach(entity => {
            if (typeof entity.draw === 'function') {
                entity.draw(context);
            }
        })
    }

    /**
     * Retrieves the collection of active entities.
     * @returns {Array<Object>} The current active entities.
     */
    getEntities() {
        return this.entities;
    }
}
