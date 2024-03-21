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

const EventsPage = () => {
   const [events, setEvents] = useState<any[]>([]);
   const { getEvents } = useContentful();
  
   useEffect(() => {
       getEvents().then((res: any) => setEvents(res));
   }, []);

    const displayEvents = events.map(event => {        
        return (
            <EventCard key={event.id} event={event} />
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
                   marginBottom: '2rem',
                   backgroundColor: '#5E0916'
               }}
           />
           <Box
               sx={{
                   display: 'flex',
                   alignItems: 'center',
                   flexDirection: 'column',
               }}
           >
               {displayEvents}
           </Box>
       </Container>
   );
};

export default EventsPage;
