import React from 'react';
import { Container, Stack, Typography, Grid , Box} from '@mui/material';

const sean = require('../../assets/Sean.png');
const patrick = require('../../assets/Patrick.png');
const emily = require('../../assets/Emily.png');
const parvati = require('../../assets/Parvati.png');
const zain = require('../../assets/Zain.png');

const AboutPage = () => {

    return (
        <Container style={{ maxWidth: '90%', marginTop: '8rem' }}>
            <Stack sx={{ ml: 15, width:0.5 }}>
                <Typography variant='nostalgiaSubHeader2'>THE PROJECT.</Typography>
                <Typography style={{ width: '80%' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    <br/><br/>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Stack>

            <Box style={{ display: 'flex', marginTop: '8rem' }}>
            
                <Grid container style={{ width: '65%' }}>
                    <Grid item xs={2.4}>  
                    <img src={sean} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Sean</strong> | Team Lead
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={patrick} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Patrick</strong> | Research
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={emily} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Emily</strong> | Engineer
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={parvati} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Parvati</strong> | Writer
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={zain} style={{ width: '79%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 5px'
                        }}>

                            <strong>Zain</strong> | Writer
                        </Typography>
                    </Grid>

                    <Grid item xs={2.4}>  
                    <img src={sean} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Sean</strong> | Team Lead
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={patrick} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Patrick</strong> | Research
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={emily} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Emily</strong> | Engineer
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={parvati} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Parvati</strong> | Writer
                        </Typography>
                    </Grid>

                    <Grid item xs={2.4}></Grid>

                    <Grid item xs={2.4}>  
                    <img src={sean} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Sean</strong> | Team Lead
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={patrick} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Patrick</strong> | Research
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={emily} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Emily</strong> | Engineer
                        </Typography>
                    </Grid>

                    <Grid xs={4.8}></Grid>

                    <Grid item xs={2.4}>  
                    <img src={sean} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Sean</strong> | Team Lead
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={patrick} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Patrick</strong> | Research
                        </Typography>
                    </Grid>

                    <Grid item xs={7.2}></Grid>

                    <Grid item xs={2.4}>  
                    <img src={sean} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Sean</strong> | Team Lead
                        </Typography>
                    </Grid>
                    <Grid item xs={2.4}>  
                    <img src={patrick} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Patrick</strong> | Research
                        </Typography>
                    </Grid>

                    <Grid item xs={7.2}></Grid>

                    <Grid item xs={2.4}>  
                    <img src={sean} style={{ width: '80%', }} alt='team member profile picture' />
                        <Typography style={{ 
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            transform: 'rotate(270deg)',
                            transformOrigin: '-17px 2px'
                        }}>

                            <strong>Sean</strong> | Team Lead
                        </Typography>
                    </Grid>
                </Grid>

                <Stack style={{ width: '25%', marginLeft: '5%' }}>
                    <Box>
                        <Typography variant='nostalgiaSubHeader2'>THE TEAM.</Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br/><br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br/><br/>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </Box>
                </Stack>

            </Box>
        </Container>
    );
};

export default AboutPage;