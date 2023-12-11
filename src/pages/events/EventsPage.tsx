import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';

type Event = {
    id: number,
    title: string,
    address: string,
    time: string,
    details: string
};

const DUMMY_DATA: Event[] = [
    {
        id: 1,
        title: 'Lorem Consectetur.',
        address: 'Cecilla Chapman 711-288 Nulla St.Mankato Mississippi',
        time: '7:00pm - 8:00pm',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: 2,
        title: 'Lorem Consectetur.',
        address: 'Cecilla Chapman 711-288 Nulla St.Mankato Mississippi',
        time: '7:00pm - 8:00pm',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: 3,
        title: 'Lorem Consectetur.',
        address: 'Cecilla Chapman 711-288 Nulla St.Mankato Mississippi',
        time: '7:00pm - 8:00pm',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: 4,
        title: 'Lorem Consectetur.',
        address: 'Cecilla Chapman 711-288 Nulla St.Mankato Mississippi',
        time: '7:00pm - 8:00pm',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
]

const EventsPage = () => {

    const displayEvents = DUMMY_DATA.map(event => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '5rem' }}>
                    <Stack>
                        <Typography variant='nostalgiaSubHeader2'>NOV</Typography>
                            <Divider sx={{ height: '2px', backgroundColor: '#5E0916' }} />
                            <Typography variant='nostalgiaSubHeader2'>7</Typography>
                        </Stack>
                    <Stack sx={{ width: '50%' }}>
                        <Typography variant='nostalgiaSubHeader2'>{event.title}</Typography>
                            <Typography sx={{ fontSize: '22' }}>
                                Cecilla Chapman 711-288 Nulla St.Mankato Mississippi
                            </Typography>
                            <Typography sx={{ fontSize: '22' }}>{event.time}</Typography>
                            <Typography variant='eventDetails'>{event.details}</Typography>
                        <Divider 
                            sx={{ 
                                height: '2px', 
                                backgroundColor: '#5E0916', 
                                margin: '1rem 0' 
                            }} 
                        />
                        <Typography sx={{ color: '#5E0916' }} >View Event Details ➔</Typography>
                    </Stack>
                </Box>
        );
    });

    return (
        <Container sx={{ marginTop: '10rem' }}>
            <Stack 
                direction='row' 
                useFlexGap 
                sx={{ justifyContent: 'space-between' }}
            >
            <Typography
                variant="h6"
                noWrap
                component="a"
                href=""
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    letterSpacing: '.15rem',
                    color: '#5E0916',
                    textDecoration: 'none',
                }  }
            >
                Upcoming Events
            </Typography>
            <div>
                <GridViewIcon sx={{ color: '#5E0916' }} />
                <TableRowsIcon sx={{ marginLeft: '0.5rem', color: '#5E0916' }} />
            </div>
            </Stack>
            <Divider 
                sx={{
                    height: '2px',
                    marginBottom: '5rem',
                    backgroundColor: '#5E0916'
                }} 
            />
            {displayEvents}
        </Container>
    );
};

export default EventsPage;