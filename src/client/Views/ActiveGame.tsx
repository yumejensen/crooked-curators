// The Active Game View that holds that canvas and reference image

import React from 'react';

// COMPONENTS
import Canvas from '../Components/Canvas';

const ActiveGame: React.FC = () => {
    return(
        <div>
            <p>This is the active game!</p>
            <p>Replace with half of avatars</p>
            <p>Replace with Reference</p>
            <p>Replace with half of avatars</p>
            <Canvas />
        </div>
    )
}

export default ActiveGame;