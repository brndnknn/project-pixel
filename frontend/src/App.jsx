//import React from 'react';
import Canvas from './components/Canvas';
import './App.css'
import { CANVAS } from './engine/utils/constants';

function App() {
    return (
        <div>
            <h1>2D Game Engine</h1>
            <Canvas width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
        </div>
    );

};

export default App;
