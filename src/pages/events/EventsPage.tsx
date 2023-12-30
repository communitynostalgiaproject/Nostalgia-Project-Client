import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import EventCard from '../../shared/components/event-card/EventCard';
import AddEventsDialog from './AddEventsDialog';

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
            <EventCard event={event} />
        );
    });

    return (
        <Container sx={{ width: '100%', marginTop: '10rem' }}>
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
                <AddEventsDialog />
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