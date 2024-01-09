import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./App.css";

const map = require('./map.png');
const familyDinner = require('./family-dinner.png');

const App = () => {
    return (
        <main style={{ height: '100vh' }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: { sm: 'center' },
                    height: '1get rid of 00%', 
                    backgroundColor: '#5E0916' 
                }}
            >
                <Box sx={{ 
                    display: { xs: 'none', sm: 'inline' },
                    position: 'absolute', 
                    left: { sm: '0' },  
                    height: { sm: '100%' },
                    width: { sm: '50%' },
                }} >
                    <img
                        src={map}
                        alt={'Street map'}
                        loading="lazy"
                        style={{ height: '100%', width: '100%' }}
                    />
                </Box>
                <Box sx={{ 
                    display: { xs: 'flex', sm: 'none' },
                    flexDirection: 'column',
                    height: '30%', 
                    width: '100%',
                }} >
                    <img
                        src={familyDinner}
                        alt={'Street map'}
                        loading="lazy"
                        style={{ height: '100%', width: '100%' }}
                    />
                    <img
                        src={map}
                        alt={'Street map'}
                        loading="lazy"
                        style={{ height: '100%', width: '100%' }}
                    />
                </Box>
            <div                 
                style={{ 
                    position: 'absolute', 
                    height: '100%', 
                    width: '100%', 
                    left: '0%', 
                    zIndex: '2', 
                    backgroundColor: 'rgba(94, 9, 22, 0.85)' 
                }}>
            </div>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    flexWrap: 'wrap', 
                    position: 'absolute', 
                    width: { xs: '100%', sm: '700px' }, 
                    padding: { xs: '10px', sm: 'none' }, 
                    zIndex: '3' 
                }}
            >
                <Typography 
                    sx={{ 
                        flex: '0 0 100%', 
                        marginTop: { xs: '10rem', sm: 'none'},
                        marginBottom: '0rem',
                        padding: '0rem', 
                        fontFamily: 'comfortaa',
                        fontSize: { xs: '5.5rem', sm: '7rem'}, 
                        fontWeight: '100', 
                        textTransform: 'uppercase', 
                        color: '#fff'
                    }}
                >
                    Coming
                </Typography>
                <Typography 
                    sx={{ 
                        flex: '1', 
                        padding: '0rem', 
                        marginTop: '0rem',
                        fontFamily: 'comfortaa', 
                        fontWeight: 'bold', 
                        fontSize: { xs: '6rem', sm: '7rem'}, 
                        textTransform: 'uppercase', 
                        color: '#fff'
                    }}
                >
                    Soon
                </Typography>
                <Box sx={{ flex: '1' }}>
                    <Typography 
                        sx={{ 
                            height: '5rem',
                            marginTop: { xs: '7rem', sm: '0rem' },
                            marginLeft: { sm: '2rem' }, 
                            fontSize: '1rem', 
                            color: '#fff' 
                        }}
                    >
                        In February, we will launch the Community Nostalgia Initiative website where you can share your experiences of food nostalgia with the world and participate in local events geared towards understanding and exploring the science and art of nostalgia.
                    </Typography>
                </Box>
            </Box>
        </Box>   
        </main>        
    )
};
 
export default App;