import React from 'react';
import { Container, Box, Stack, Typography } from "@mui/material";
import BrainIcon from '@mui/icons-material/PsychologyOutlined';
import RamenIcon from '@mui/icons-material/RamenDiningOutlined';
import PhoneIcon from '@mui/icons-material/AppShortcutOutlined';

const bannerImage = require('../../assets/science-banner.png');

const SciencePage = () => {

    return (
        <Container style={{ position: 'relative', maxWidth: '100%', padding: '0' }}>
            <Box
                sx={{
                    positoin: 'relative',
                    backgroundImage: `url(${bannerImage})`,
                    backgroundPosition: 'center', 
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '600px'
                }}>
                <Typography variant="h1" sx={{ 
                        position: 'absolute', 
                        top: '34%',
                        bottom: '0',
                        color: '#fff', 
                        fontSize: 96,
                    }}>
                        THE SCIENCE OF
                    </Typography>
            </Box>
            <Typography variant="nostalgiaHeader">NOSTALGIA</Typography>
            <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    marginTop: '8rem',
                }}>
                <Stack direction='row' sx={{ width: '50%', marginBottom: '6rem' }}>
                    <BrainIcon sx={{ fontSize: '7rem', marginRight: '2rem', color: '#000' }} />
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
                    </Typography>
                </Stack>
                <Stack direction='row' sx={{ width: '50%', marginBottom: '6rem' }}>
                    <PhoneIcon sx={{ fontSize: '7rem', marginRight: '2rem', color: '#000' }} />
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
                    </Typography>
                </Stack>
                <Stack direction='row' sx={{ width: '50%', marginBottom: '6rem' }}>
                    <RamenIcon sx={{ fontSize: '7rem', marginRight: '2rem', color: '#000' }} />
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
                    </Typography>
                </Stack>
            </Box>
        </Container>
    );
};

export default SciencePage;