export const startGame = (canvas) => {
    const ctx = canvas.getContext('2d');
    let running = true;

    const gameLoop = () => {
        if (!running) return;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // render game state (placeholder)
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 50, 50);

        // next frame
        requestAnimationFrame(gameLoop);
    };

    // start loop
    gameLoop();

    return {
        cleanup: () => {
            running = false;
        },
    };

};