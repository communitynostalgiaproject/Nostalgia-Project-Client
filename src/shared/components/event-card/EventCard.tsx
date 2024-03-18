            import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type Props = {
    event: {
        id: number,
        title: string,
        address: string,
        time: string,
        details: string,
        color: string
    }
};
    
const eventPhoto = require('../../../assets/event-photo.png');

export default function EventCard({ event }: any ) {

    return (
        <Card 
            sx={{ 
                width: '60%',
                // height: '30rem',
                margin: '2.5rem',
                padding: '0px',
                backgroundColor: event.color
            }}
        >
            <img
                alt="event image"
                src={eventPhoto}
                style={{ width: '100%', padding: '0px', margin: '0px' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" color='#fff' >
                    {event.title}
                </Typography>
                <Typography color='#fff' variant="h5">
                    Cecilla Chapman 711-288 Nulla St.Mankato Mississippi
                </Typography>
                <Typography color='#fff' variant="h6" sx={{ marginBottom: '1rem' }}>{event.time}</Typography>
                <Typography variant='eventDetails' color='#fff'>{event.details}</Typography>
            </CardContent>
        </Card>
    );
};