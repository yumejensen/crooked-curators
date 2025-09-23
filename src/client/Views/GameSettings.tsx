// Game Settings Page that pops up after hitting 'Create Game'

import React from 'react';

import JoinedPlayers from '../Components/JoinedPlayers';

//Temporarily including Curator Search here
import CuratorSearch from '../Components/CuratorSearch'

// COMPONENTS


const GameSettings: React.FC = () => {
    return(
        <div>
            <CuratorSearch />
            <p>Replace with game settings</p>
            
            <JoinedPlayers />
        </div>
    )
}

export default GameSettings;
