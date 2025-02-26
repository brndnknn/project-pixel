// Player settings
export const PLAYER = {
    COLOR: 'BLUE',
    SPEED: 300,
    JUMP_FORCE: -300,
    WIDTH: 50,
    HEIGHT: 50,
    MASS: 1
}

// Enemy setttings
export const ENEMY = {
    COLOR: 'RED',
    JUMP_FORCE: -300,
    WIDTH: 50,
    HEIGHT: 50,
    MASS: 1
}

// // Level settings
export const TILE_SIZE = 32;             // Default tile size
export const TILE_KEYS = {              // Default tile keys
    0: { color: 'WHITE', solid: false},
    1: { color: 'BLACK', solid: true}
}

// // Physics settings
export const GRAVITY = 1.5;              // Gravity force applied to entities
export const FIXED_TIMESTAMP = 1 / 60; // roughly 16.67ms per physics update

