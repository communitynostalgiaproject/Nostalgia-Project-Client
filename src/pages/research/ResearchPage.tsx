import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const mriImg = require('../../assets/science-banner.png');
const presentationImg = require('../../assets/research-page-image-presentation.png');

const ResearchPage = () => {

    return (
        <Container 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                maxWidth: '100%', 
                padding: { xs: '1rem', md: '5rem' }, 
                marginTop: { xs: '30%', sm: '20%', md: '5%' },
            }}
        >
            <Box  sx={{ display: 'flex', justifyContent: 'start' }} >
                <Typography variant="nostalgiaHeader" sx={{ marginBottom: '2rem', fontSize: '3rem' }} >
                    THE SCIENCE OF NOSTALGIA
                </Typography>
            </Box>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                }}
            >
                <Box sx={{ width: { sx: '100%', sm: '100%', md: '50%' }, marginRight: '1rem' }} >
                    <img
                        src={mriImg}
                        alt={'Project team members overseeing an MRI scan.'}
                        loading="lazy"
                        style={{ height: '100%', width: '100%' }}
                    />
                </Box>
                <Box sx={{ width: { sx: '100%', sm: '100%', md: '45%' }, marginTop: { sx: '1.5rem', sm: '1.5rem', md: '0' }, marginLeft: '1rem' }} >
                    <Typography sx={{ fontSize: '1.3rem' }} >
                        Welcome to our exploration of the fascinating world of nostalgic foods and their impact on our 
                        emotions and well-being! Through the Ratatouille Study, we're passionate about uncovering the 
                        fascinating connections between the foods we love, our memories, and our emotional 
                        experiences.
                    </Typography>
                    <Typography sx={{ marginTop: '1rem', fontSize: '1.3rem' }} >
                        Our preliminary study was designed with one main goal in mind: to understand how certain 
                        foods can evoke powerful emotions and memories. We carefully curated a collection of food 
                        images, representing popular dishes from both American and Indian cuisines, to gauge 
                        participants' responses in terms of familiarity, comfort, and nostalgia. By focusing on these 
                        emotional metrics, we aimed to pinpoint which foods have the greatest emotional resonance and 
                        significance to individuals from these cultural backgrounds.   
                    </Typography>
                    <Typography sx={{ marginTop: '1rem', fontSize: '1.3rem' }} >
                        To ensure the authenticity of our findings, we specifically recruited participants from American 
                        and Indian cultural backgrounds, excluding individuals with eating disorders to maintain the 
                        integrity of our results. The insights gleaned from this initial study provided a solid foundation 
                        for further exploration into the emotional connections we have with food.
                    </Typography>
                </Box>
            </Box>


            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    marginTop: '1.5rem',
                }}
            >
            <Typography sx={{ marginTop: '2.5rem', fontSize: '1.3rem' }} >
                But we didn't stop there. Building upon our initial findings, we conducted a pilot retest study to 
                confirm the reproducibility and consistency of our results. This verification step was crucial in 
                establishing the reliability of using visual stimuli to measure nostalgia and other associated 
                emotions triggered by food items.
            </Typography>
            <Typography sx={{ margin: '1rem 0 2rem 0', fontSize: '1.3rem' }} >
                Our journey then led us to delve even deeper into the emotions evoked by visual food stimuli 
                through an AMT study. Here, we not only examined the levels of familiarity, comfort, and 
                nostalgia associated with each food item but also explored the memories they invoked. 
                Participants were encouraged to share personal stories tied to specific foods, providing 
                invaluable insights into the rich tapestry of experiences that shape our emotional connections to 
                food.
            </Typography>
            <Typography 
                sx={{ 
                    alignSelf: 'center',
                    marginBottom: '2rem', 
                    fontSize: '1.3rem', 
                    fontWeight: '600',
                    color: '#5E0916' 
                }} 
            >
                ( Come back here to read some of our published papers once we wrap up these studies! )  
            </Typography>
            </Box> 
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                    marginTop: '1.5rem',
                }}
            >
                <Box 
                    sx={{ 
                        width: { sx: '100%', sm: '100%', md: '45%' }, 
                        marginTop: { sx: '1.5rem', sm: '1.5rem', md: '0' }, 
                        order: { xs: '1', sm: '1', md: '0' }
                    }} 
                >
                    <Typography sx={{ fontSize: '1.3rem' }} >
                        But our research isn't confined to the laboratory. We're passionate about sharing our findings 
                        with the world, which is why we've organized two exhibitions to engage both the artistic and 
                        scientific communities.
                    </Typography>
                    <Typography sx={{ marginTop: '1rem', fontSize: '1.3rem' }} >
                        Our science informs and influences many of our events. For example, at the science exhibition, 
                        we'll be showcasing the results of our studies in a way that's accessible to all. Visitors can 
                        explore our data, interpretations, and even engage their senses with research-based smell boxes 
                        and recipe boards that capture the essence of nostalgia in a tangible way.                                                     
                    </Typography>
                    <Typography sx={{ marginTop: '1rem', fontSize: '1.3rem' }} >
                        At the art exhibition held at the iconic Big Red Barn at Cornell University, we're inviting artists 
                        of all backgrounds to submit pieces that capture the essence of nostalgia. From undergraduates to
                        faculty members and local community artists, everyone is welcome to contribute their 
                        interpretations of what nostalgia means to them.
                    </Typography>
                </Box>
                <Box sx={{ width: { sx: '100%', sm: '100%', md: '50%' } }} >
                    <img
                        src={presentationImg}
                        alt={'Project team members overseeing an MRI scan.'}
                        loading="lazy"
                        style={{ height: '100%', width: '100%' }}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default ResearchPage;