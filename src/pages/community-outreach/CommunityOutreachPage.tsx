import { Box, Typography, Divider } from '@mui/material';
import React from 'react';

const logo = require('../../assets/CNI-logo.png');

const CommunityOutreachPage = () => {

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginTop: '5rem',
                padding: { xs: '1.3rem', sm: '1.3rem', md: '0 30% 0 30%' },
                // backgroundColor: 'red'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <img 
                    style={{
                        height: '450px',
                        width: '300px',
                        marginTop: '3rem'
                    }}
                    alt='Project logo' 
                    src={logo} 
                /> 
            </Box>
            <Typography variant="nostalgiaHeader" sx={{ marginBottom: '1rem', fontSize: '3rem' }} >OUR MISSION</Typography>
            <Typography>
                The Arts team of the Community Nostalgia Initiative is focused on engaging in 
                community outreach through art. Our aim is to create a space where individuals feel empowered
                to share their own experiences around the intersection of nostalgia, comfort, and culture, in 
                hopes of bringing together a sense of belonging within the Ithaca community and beyond. Art is 
                a medium through which we can experience others’ hopes, desires, and emotions, and we hope
                to harness the power of art to allow individuals to step inside the shoes of another and 
                experience an event that is so deeply personal to them – the creation of a food-related nostalgic
                memory. To accomplish this goal, we are currently working on quite a few community art 
                projects within the city of Ithaca.
            </Typography>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} >
                <Divider sx={{ marginTop: '1.5rem', width: '80%', borderBottomWidth: '.15rem', backgroundColor: '#5E0916' }} ></Divider>
            </Box> */}
            <Typography
                sx={{
                    marginTop: '1.5rem'
                }}
            >
                In one project, we are gathering artists to paint a large-scale outdoor mural in downtown 
                Ithaca that depicts the artists’ connection to food nostalgia and how those memories of 
                childhood foods are experienced today. Specifically, the mural will include images that convey 
                the powerful emotional and social functions of food nostalgia, including images of foods that 
                evoke emotionally charged memories for those painting the mural and others in the community. 
                While much of the mural will be painted by local artists, we are inviting students from various 
                high schools in the Ithaca area as well as students from Cornell University to paint small pieces 
                of the mural that depict their own, personal experiences of food nostalgia.
                The Community Nostalgia Initiative is also organizing an Art and Science exhibition. This
                exhibition is focused on the mental experience of food nostalgia that is evoked by the senses, 
                and will include work from local artists and students at Cornell in addition to interactive pieces, 
                like smell boxes. The exhibit is meant to bring together members of the Ithaca community by 
                giving them a space to share their cultural background and the foods that make them feel 
                connected to their homes.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '2rem 0 1.5rem 0' }} >
                <Divider sx={{ width: '80%', borderBottomWidth: '.15rem', backgroundColor: '#5E0916' }} ></Divider>
            </Box>
            <Typography
                sx={{
                    margin: '1rem 0 3.5rem 0'
                }}
            >
                Overall, we hope to use art to strengthen the Ithaca and Cornell communities and to 
                spread awareness of the great cultural diversity that they both possess. These two projects are 
                evidence of the Community Nostalgia Initiative’s commitment to using art to communicate 
                scientific findings and to increase students’ and community members’ senses of belonging to 
                the Ithaca community.
            </Typography>
        </Box>
        
    );
};

export default CommunityOutreachPage;