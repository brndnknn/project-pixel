//import React from 'react';
import Canvas from './components/Canvas';
import { startGame } from './engine/core/game';
import './App.css'

function App() {
    return (
        <div>
            <h1>2D Game Engine</h1>
            <Canvas width={800} height={600} startGame={startGame} />
        </div>
    );

};

export default App;
