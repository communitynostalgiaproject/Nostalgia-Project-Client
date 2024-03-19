import React from 'react';
import { format } from "date-fns";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function EventCard({ event }: any ) {

    console.log('HERE ==>', event);

    const dateTime = format(event.fields.dateAndTime, "MMMM do, yyyy H:mma");

    return (
        <Card 
            sx={{ 
                width: '60%',
                // height: '30rem',
                margin: '2.5rem',
                padding: '0px',
                backgroundColor: '#F5F5F5'
            }}
        >
            <img
                alt="event"
                src={event.fields.thumbnail.fields.file.url}
                style={{ width: '100%', padding: '0px', margin: '0px' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" >
                    {event.fields.title}
                </Typography>
                <Typography variant="h5" >
                    {event.fields.eventInfo.content[0].content[0].value}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
                    {dateTime}
                </Typography>
                <Typography variant='eventDetails' color='#fff'>
                    {event.details}
                </Typography>
            </CardContent>
        </Card>
    );
};