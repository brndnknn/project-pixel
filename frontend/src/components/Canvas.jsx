import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { startGame } from "../engine/core/game";

const Canvas = ({width, height, startGame}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        // Initialize game engine
        const game = startGame(canvas);

        return() => {
            // Clean up game engine
            if(game && game.cleanup) {
                game.cleanup();
            }
        };
    }, [startGame]);

    return (
        <canvas
        ref ={canvasRef}
        width={width}
        height={height}
        style={{ border: '1px solid black'}}
        />
    );
};

Canvas.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    startGame: PropTypes.func.isRequired,

};

export default Canvas;