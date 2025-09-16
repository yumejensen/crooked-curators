import * as React from 'react';
import { Routes, Route } from 'react-router';
import { createTheme, MantineProvider } from '@mantine/core';
import axios from 'axios';

import Homepage from './Views/Homepage';
import LoginButton from './Views/LoginButton'

const theme = createTheme({
    // theme here
    colors: {
        // add all colors

        pink: [
            "#3B262C", // OG
            "#800933", // OG
            "#C25576",
            "#603E48",
            "#9E6072", // OG
            "#B58694",
            "#CCACB6",
            "#E3D2D7",
            "#FAF8F9",
            "#FFFFFF"
        ],

        yellow: [
            "#736A47",
            "#998D5E",
            "#B2A882",
            "#EDDB98", // OG
            "#F7EABA",
            "#DED6BA",
            "#F0E7CA", // OG
            "#F6EDCC",
            "#F2EFE3",
            "#FFFFFF",
        ],

        teal: [
            "#003020",
            "#0B523A",
            "#128860",
            "#19BE86",
            "#30E4A7",
            "#00FCA7",
            "#7BE3C0", // OG
            "#ADEED8",
            "#E0F9F0",
            "#FFFFFF",
        ]
    },
    shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },
    headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
            h1: { fontSize: '36px' },
        },
    }
});

const verifyAccount = () => {
    axios.get('/auth/google')
        .then((res)=>{
            console.log('auth attemped', res)
        })
        .catch((err) => {
            console.log('cannot verify account', err)
        })
}

export default function App () {
    return (
        <MantineProvider theme={theme}>
            <div>
                <LoginButton />
                <Routes>
                    <Route path='/' element={<Homepage />} />
                </Routes>
            </div>
        </MantineProvider>
    )
}

/* <Route path='/login' element={<Login />}/> */