import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import TeamCard from '../../shared/components/team-card/TeamCard';

type TeamMember = {
    id: number,
    name: string,
    title: string,
    content: string,
    photo: any
};

const Andrew = require('../../assets/Andrew_Lee.jpg');
const Charles = require('../../assets/Charles.jpg');
const David = require('../../assets/David_White.png');
const Emi = require('../../assets/Emi Labbe.png');
const Hetvi = require('../../assets/Hetvi_Doshi.png');
const Ivy = require('../../assets/Ivy.png');
const Joan = require('../../assets/Joan_Joseph.jpg');
const Jordan = require('../../assets/jordan.png');
const Mary = require('../../assets/MacMillan_Mary.jpg');
const Mukunthg = require('../../assets/mukunthg.png');
const Rebekka = require('../../assets/Rebekka.jpg');
const Summer = require('../../assets/Summer LaPointe.jpg');
const Walker = require('../../assets/Walker.png');

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Hetvi Doshi',
        title: 'Founder',
        content: "In my research, I found out that nostalgia is about the people you love. It’s about the community, the culture, and the everyday life of your childhood. Through CNI, I bring my research to the people, i.e., you, the reader. I lead the various teams to create events that highlight the myriad facets of the nostalgic experience. By creating a global and local community around the shared experience of nostalgia, our goal is to provide a space for individuals to relive their memories of the past. I am excited to tackle some of our larger projects, such as painting a 4-story mural in Ithaca and building a website where people can share food stories. Stay tuned for what’s to come!",
        photo: Hetvi
    },
    {
        id: 2,
        name: 'Mary Macmillan',
        title: 'Community Connection Organizer',
        content: "I have always loved the intersection between science and art, and I joined this project in hopes of introducing community members to the beauty of science through art. My main roles include starting and mediating conversations between the Nostalgia Initiative group and community members who are interested in contributing to this project, including the Travis-Hyde property management group and local art teachers from multiple Ithaca schools. I am excited to see how this project enriches the Ithaca community and brings individuals together through shared experiences of food nostalgia.",
        photo: Mary
    },
    {
        id: 3,
        name: 'Summer LaPointe',
        title: 'Website & Grants',
        content: "My primary interest lies in understanding humanity and consciousness, of which the combination of art and science is a perfect vehicle. I joined this project to establish a communal space for sharing nostalgic memories – a powerful yet understudied emotion – that nurtures connection between individuals from a multitude of regions. My main roles include hiring and managing the web development team, and assisting in grant writing to obtain funding for the various projects we wish to implement to bring the shared experiences to life in one initiative.",
        photo: Summer
    },
    {
        id: 4,
        name: 'Mukunth Gopalakrishnan',
        title: 'Marketing Research Assistant',
        content: "I enjoy working to improve and innovate products and ideas at hand. I joined the CNI marketing team in hopes to spread nostalgia throughout Ithaca and hopefully expand it past Ithaca as well. My main jobs are to find the most suitable and effective ways to market our events and implement those ideas to market our upcoming events. By working with the web developers for better marketing our website and working with the social media team, we work together to spread the word about CNI and make it known across Ithaca.",
        photo: Mukunthg
    },
    {
        id: 5,
        name: 'David White',
        title: 'Full-Stack Developer',
        content: "I  was compelled to join the Community Nostalgia Initiative because I was intrigued by the overlap between hard, objective neuroscience and the more elusive, subjective aspects of human experience. The goal of CNI, to delve into the mysteries of how our brains encode and recall nostalgic experiences fascinates me to no end. In my role as part of the web development team, I find it exciting to be building a digital platform that connects researchers with the public, allowing for the collection and analysis of personal nostalgic experiences. By collecting and analyzing data on how different people experience and recall nostalgic events, we can begin to unravel the complex interplay between brain function and subjective experience and by sharing our nostalgic moments, we not only contribute to scientific research but also to a collective narrative that celebrates our shared humanity.",
        photo: David
    },
    {
        id: 6,
        name: 'Jordan Taylor',
        title: 'Full-Stack Developer',
        content: "I'm thrilled to be part of this project for the promise it holds for our collective future: digital experiences that bring us truly together via the better parts of our nature. I'm passionate about using technology to enhance our connection rather than isolating us- and CNI's research into the interplay of memory and our senses is the nexus of behavioral understanding and pure science. It has been a joy to work on the delivery mechanism for this project's findings, and to be part of a mission guided by an appreciation of food, memory, and comfort.",
        photo: Jordan
    },
    {
        id: 7,
        name: 'Charles Nesmith',
        title: 'Full-Stack Developer',
        content: "The human mind, and what shapes our underlying thought patterns, has been an area of interest that I have always found captivating. What drew me toward joining the Community Nostalgia Initiative was the idea of bridging memory and shared experience to understand how the intricacies of culture and livelihood from across the world can create communal nostalgia. As a collaborator within the web development team, I have taken great pleasure in helping build an application that will act as a conduit in bringing this idea to fruition via the collection of data through user-friendly interfaces, allowing researchers to form a thorough analysis of individual experiences and their connection to personal recollections of the past. The research conducted, I believe, will be of high-impact in regard to the human experience. I am grateful to have been a part of this team and the project at hand.",
        photo: Charles
    },
    {
        id: 8,
        name: 'Joan Joseph',
        title: 'Exhibition Curator & Research Assistant',
        content: "I joined the lab in the Fall of 2023 because I was curious to see how nostalgia was being studied and quantified. I have enjoyed working with participants and gaining more insight into the different research methods we employ. As part of the CNI's Science Exhibition Team, I help figure out ways to transform our research findings into formats digestible by the general public. This entails working with artists in the community, combing through existing peer-reviewed research, and brainstorming interactive ways to engage the community.",
        photo: Joan
    },
    {
        id: 9,
        name: 'Emiline',
        title: 'Exhibition Curator & Research Assistant',
        content: "I am interested in how our emotions interact with our physical bodies. I joined the lab to understand what nostalgia is on a neural level. I also joined because I believe research should be shared, and the Community Nostalgia Initiative aims to make our findings accessible and digestible to the Ithaca community. I hope to do this by presenting information in engaging formats and by collaborating with local artists to explain nostalgia through more than data points.",
        photo: Emi
    },
    {
        id: 10,
        name: 'Andrew Lee',
        title: 'Exhibition Curator & Research Assistant',
        content: "Over the past two years, I have been actively involved in the research studies that form the backbone of CNI. This research, focusing on the interplay between emotions, food, and memory, has not only been intellectually stimulating but also a great learning experience. As a part of CNI's Science Exhibition team, I aim to transform our complex scientific findings to engaging and accessible formats for the general public. This involves a creative synthesis of science and art, where I work closely with community artists to conceptualize and develop an interactive exhibition. By presenting the research findings in ways that resonate on a personal level, I hope to not just disseminate information, but connect with individuals, evoking emotions, and fostering a deeper appreciation for the human experience.",
        photo: Andrew
    },
    {
        id: 11,
        name: 'Ivy Jiang',
        title: 'Exhibition Curator & Research Assistant',
        content: `Since Fall 2023, I have been working alongside Hetvi to deepen my interests and understanding of how the olfactory and gustatory networks evoke comforting memories and emotions. Throughout this journey, I aim to not only delve into the academic research of nostalgia but to also develop a sensory exhibition that offers an immersive journey of nostalgia for the Ithaca community. As a curator in the Community Neuroscience Initiative’s sensory exhibition team, I hope to integrate all five human senses (smell, sight, sound, taste, and touch) into our museum so that our diverse community members can fully relive their childhood and cultures and evoke their buried memories and emotions. In doing so, we hope that our visitors can embrace a stronger sense of self, connectedness, and personal growth.`,
        photo: Ivy
    },
    {
        id: 12,
        name: 'Walker Strauss',
        title: 'Community Liaison & Research Assistant',
        content: "I have been working alongside Hetvi since Fall 2023 using fMRI scans as a method of deepening our understanding of the social, developmental, emotional, and mnemonic functions of food nostalgia. In collaboration with the other research assistants in the lab, I am responsible for making sure that our fMRI scans run smoothly. Additionally, I am part of the arts team for the Community Nostalgia Initiative, where we are organizing an arts exhibit that explores the power of art in evoking feelings of food nostalgia. I am passionate about creating an exhibit that clearly communicates the emotional and mnemonic abilities of food nostalgia.",
        photo: Walker
    },
    {
        id: 14,
        name: 'Rebekka Kivimae',
        title: 'Muralist Liaison & Research Assistant',
        content: "Over the last year, I have investigated nostalgia in relation to comfort foods and memory through survey-based studies and fMRI. I am fascinated by the intersection of neuroscience, emotion, and memory, exploring how these manifest in diverse ways across the lifespan. On the Arts Team for the Community Nostalgia Initiative, I initiate outreach with local Ithaca muralists. Our goal is to paint a mural in the Ithaca Commons representing nostalgia in relation to the changing identity of Ithaca; alongside meeting with muralists, I assist with developing community partnerships, incorporating local groups in the painting of the mural.",
        photo: Rebekka
    }
];  

const TeamPage = () => {

    const displayTeamMembers = teamMembers.map((teamMember: TeamMember) => {
        return (
            <ListItem key={teamMember.id}>
                <TeamCard 
                    key={teamMember.id} 
                    name={teamMember.name} 
                    title={teamMember.title} 
                    content={teamMember.content} 
                    photo={teamMember.photo}
                />
            </ListItem>
        )
    });

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: '100%',
                padding: '0',
                marginTop: {xs: '35%', md: '10%'},   
            }}
        >
            <Typography variant='h2' sx={{ color: '#5E0916', fontFamily: 'comfortaa' }} >
                MEET THE TEAM
            </Typography>
            <Box sx={{ width: { sm: '100%', md: '80%', lg: '80%' } }} >
                <List
                    sx={{                    
                        maxHeight: '75vh',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': { display: 'none' }
                    }}
                >
                    {displayTeamMembers}
                </List>
            </Box>
        </Container>
    );
};

export default TeamPage;