// Page that holds the choose avatar, join game, create a game menu

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import {
    Button,
    ReloadOutlined,
} from '../antdComponents'

const Homepage: React.FC = () => {

    const [randomName, setRandomName] = useState('')

    // --------------------[HANDLERS]--------------------

    const handleRandomizeName = () => {
        axios.get('/name-randomizer')
            .then((res) => {
                setRandomName(res.data);
            })
    }

    useEffect(() => {
        handleRandomizeName();
    }, [])

    return(
        <div>
            <p>This is the homepage!</p>
            <Button onClick={handleRandomizeName}>
                <ReloadOutlined />
            </Button>
            {randomName}
        </div>
    )
}

export default Homepage;
