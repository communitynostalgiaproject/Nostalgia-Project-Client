import { useEffect, useState } from 'react';
import useContentful from '../../api/useContentful';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import EventCard from '../../shared/components/event-card/EventCard';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type Event = {
   id: number,
   title: string,
   address: string,
   time: string,
   details: string,
   color: string
};

const EventsPage = () => {
    const [events, setEvents] = useState<any[]>([]);
    const { getEvents } = useContentful();
    const [cardDirection, setCardDirection] = useState('column');

    useEffect(() => {
        getEvents().then((res: any) => setEvents(res.items));
    }, []);

    const handleCardDirecion = (direction: string) => {
        console.log(direction)
        setCardDirection(direction);
    };

    const displayEvents = events.map(event => {
        return (
            <ListItem sx={{display: 'flex', justifyContent: 'center', width: '100%' }}>
                <EventCard key={event.id} event={event} />
            </ListItem>
        );
    });

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
                marginTop: '10rem'
            }}
        >
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
                        display: 'flex',
                        fontWeight: 700,
                        letterSpacing: '.15rem',
                        color: '#5E0916',
                        textDecoration: 'none',
                    }}
                >
                    Upcoming Events
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                    <Button variant="text" onClick={() => handleCardDirecion('row')} >
                        <GridViewIcon sx={{ color: '#5E0916' }} />
                    </Button>
                    <Button variant="text" onClick={() => handleCardDirecion('column')} >
                        <TableRowsIcon sx={{ marginLeft: '0.5rem', color: '#5E0916' }} />
                    </Button>
                </Box>
            </Stack>
            <Divider
                sx={{
                    height: '2px',
                    marginBottom: '2rem',
                    backgroundColor: '#5E0916'
                }}
            />
            <List sx={{ display: 'flex', flexDirection: cardDirection }} >
                {displayEvents}
            </List>
        </Container>
    );
};

export default EventsPage;
