import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./App.css";

const map = require('./map.png');

const App = () => {
    return (
        <main style={{ height: '100vh' }}>
            <Box sx={{ 
                backgroundColor: '#5E0916', 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}
        >
            <img
                src={map}
                alt={'Street map'}
                loading="lazy"
                style={{ position: 'absolute', left: '0', height: '100%', width: '50%' }}
            />
            <div                 
                style={{ 
                    position: 'absolute', 
                    height: '100%', 
                    width: '50%', 
                    zIndex: '2', 
                    left: '0%', 
                    backgroundColor: 'rgba(94, 9, 22, 0.85)' 
                }}>
            </div>
            <Box 
                sx={{ 
                    width: '700px', 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    position: 'absolute', 
                    zIndex: '3' 
                }}
            >
                <Typography 
                    sx={{ 
                        fontFamily: 'comfortaa',
                        padding: '0', 
                        textTransform: 'uppercase', 
                        flex: '0 0 100%', 
                        fontSize: '7rem', 
                        fontWeight: '100', 
                        color: '#fff'
                    }}
                >
                    Coming
                </Typography>
                <Typography 
                    sx={{ 
                        fontFamily: 'comfortaa', 
                        padding: '0', 
                        textTransform: 'uppercase', 
                        flex: '1', 
                        fontWeight: 'bold', 
                        fontSize: '7rem', 
                        color: '#fff'
                    }}
                >
                    Soon
                </Typography>
                <Box sx={{ flex: '1' }}>
                    <Typography sx={{ marginLeft: '2rem', fontSize: '1rem', color: '#fff' }}>
                        In February, we will launch the Community Nostalgia Initiative website where you can share your experiences of food nostalgia with the world and participate in local events geared towards understanding and exploring the science and art of nostalgia.
                    </Typography>
                </Box>
            </Box>
        </Box>   
        </main>        
    );
};
 
export default App;