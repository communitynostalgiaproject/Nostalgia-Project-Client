import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

const OurMissionPage = () => {

    return (
        <Container 
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: { xs: "column", sm: 'column', md: "row" },
                minWidth: '100%',
                height: '100vh',
                marginTop: '10rem'
            }}
        >
            <Box
                sx={{
                    marginTop: '20%',
                    maxWidth: { xs: '100%', md: '40%' },
                    paddingRight: '2rem',

                }}
            >
                <Typography 
                    variant="h2" 
                    sx={{ 
                        marginBottom: '1.5rem',
                        fontFamily: 'comfortaa',
                        color: '#5E0916'
                    }}
                >
                    ABOUT US
                </Typography>
                <Typography sx={{ fontSize: '1.6rem', fontStyle: 'italic', color: '#5E0916' }}>
                    What We Do
                </Typography>
                <Typography sx={{ fontSize: '1.3rem' }}>
                    The Community Nostalgia Initiative seeks to foster a strong community by creating a shared experience of nostalgia for food, home, places, loved ones, and lost time. We organize in-person events and virtual spaces. Our in-person events range in interactiveness, scale, length, educational impact, and communities involved. The goal is to organize diverse events and experiences that vary in the communities they impact and the commitment required from individuals to engage in the event. 
                </Typography>
            </Box>
            <List
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: { xs: '95%', sm: '95%', md: '50%' },
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        width: {xs: '95%' ,sm: '95%', md: '75%' }, 
                        marginTop: { xs: '5rem', sm: '5rem', md: '10rem' } 
                    }} 
                >
                    <Typography sx={{ fontSize: '1.3rem' }}>
                        The Community Nostalgia Initiative was founded by members of Cornell University’s Affect and Cognition Lab one year ago.
                        Our mission is to create inclusionary spaces in our local communities that celebrate the rich life histories surrounding us. 
                        We are committed to enhancing the public's understanding and appreciation of scientific endeavors by blending science communication and artistic expression.  
                    </Typography>
                    <Typography sx={{ marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '600' }}>
                        Our mission is grounded in specific objectives: 
                    </Typography>
                </Box>
                <ListItem 
                    sx={{ 
                        width: {xs: '90%', sm: '90%', md: '75%' }, 
                        margin: '1.5rem 0 1.5rem 0', 
                        fontSize: '1.3rem' 
                    }} 
                >
                    Improvinshare research through written, visual, and verbal communication that engages with our audience, peaks their scientific curiosity, and boosts their learning and knowledge of technical topics 
                </ListItem>
                <Divider sx={{ width: '75%', borderBottomWidth: '.15rem', backgroundColor: '#5E0916' }} ></Divider>
                <ListItem 
                    sx={{ 
                        width: {xs: '90%', sm: '90%', md: '75%' }, 
                        margin: '1.5rem 0 1.5rem 0', 
                        fontSize: '1.3rem' 
                    }} 
                >
                    Creating positive spaces shared by permanent and transient Ithaca residents 
                </ListItem>
                <Divider sx={{ width: '75%', borderBottomWidth: '.15rem', backgroundColor: '#5E0916' }} ></Divider>
                <ListItem 
                    sx={{ 
                        width: {xs: '90%', sm: '90%', md: '75%' }, 
                        margin: '1.5rem 0 1.5rem 0', 
                        fontSize: '1.3rem' 
                    }} 
                >
                    Fostering long-lasting global and local community ties: hosting physical and virtual events 
                </ListItem>
                <Divider sx={{ width: '75%', borderBottomWidth: '.15rem', backgroundColor: '#5E0916' }} ></Divider>
                <ListItem 
                    sx={{ 
                        width: {xs: '90%', sm: '90%', md: '75%' }, 
                        margin: '1.5rem 0 1.5rem 0', 
                        fontSize: '1.3rem' 
                    }} 
                >
                    Celebrating and creating memories: representing their nostalgia but also creating a space for new memories, experiences, and emotions to be felt
                </ListItem>
                <Divider sx={{ width: '75%', borderBottomWidth: '.15rem', backgroundColor: '#5E0916' }} ></Divider>
                <ListItem 
                    sx={{ 
                        width: {xs: '90%', sm: '90%', md: '75%' }, 
                        margin: '1.5rem 0 1.5rem 0', 
                        fontSize: '1.3rem' 
                    }} 
                >
                    Integrating science and art: erase the artificial boundary between the two to explore how they influence each other 
                </ListItem>
                <Divider sx={{ width: '75%', borderBottomWidth: '.15rem', backgroundColor: '#5E0916' }} ></Divider>
                <ListItem 
                    sx={{ 
                        width: {xs: '90%', sm: '90%', md: '75%' }, 
                        margin: '1.5rem 0 1.5rem 0', 
                        fontSize: '1.3rem' 
                    }} 
                >
                    Promoting gratitude, empathy, and understanding: to overcome the geographical isolation of Cornell from the town and inspire community engagement in students 
                </ListItem>
                <Divider sx={{ width: '75%', borderBottomWidth: '.15rem', backgroundColor: '#5E0916' }} ></Divider>
                <ListItem 
                    sx={{ 
                        width: {xs: '90%', sm: '90%', md: '75%' }, 
                        margin: '1.5rem 0 1.5rem 0', 
                        fontSize: '1.3rem' 
                    }} 
                >
                    Foster a sense of belonging in displaced populations
                </ListItem>
            </List>
        </Container>
    );
};

export default OurMissionPage;
