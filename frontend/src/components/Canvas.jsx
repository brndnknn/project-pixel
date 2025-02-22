import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Game from "../engine/core/game";


const Canvas = ({width, height}) => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;

        // Initialize game engine
        const game = new Game(canvas);
        //game.start();
    }, []);

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

};

export default Canvas;