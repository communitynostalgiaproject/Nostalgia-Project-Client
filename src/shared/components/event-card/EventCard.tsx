import React, { useState } from 'react';
import styled from '@mui/material/styles/styled';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EventCard({event }: any) {

    // console.log(event);
    // console.log('DATE: ', event.fields.dateAndTime);
    // console.log('NEW DATE: ', new Date(event.fields.dateAndTime));
    
    const [expanded, setExpanded] = useState(false);
    const [eventDate, setEventDate] = useState<any>();

    let date = new Date(event.fields.dateAndTime).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    date += ` - ${new Date(event.fields.dateAndTime).toLocaleTimeString()}`;

    let subDetails;

    if (event.fields.eventInfo.content[0].content[0].value && event.fields.eventInfo.content[0].content[0].value.length > 150) subDetails = `${event.fields.eventInfo.content[0].content[0].value.substring(0, 150)}...`;
    if (event.fields.eventInfo.content[0].content[0].value && event.fields.eventInfo.content[0].content[0].value.length < 150) subDetails = event.fields.eventInfo.content[0].content[0].value;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: '60%', marginBottom: '5rem' }}>
            <CardMedia
                component="img"
                alt="event image"
                src={event.fields.thumbnail.fields.file.url}
                sx={{ 
                    height: '60%',
                    width: '100%', 
                    padding: '0px', 
                    margin: '0px' 
                }}
            />
            <CardContent>
            <Typography 
                gutterBottom 
                variant="h4" 
                component="div" 
            >
                {event.fields.title}
            </Typography>
            <Link href='https://www.thecommunitynostalgiaproject.com/Events' underline="hover" sx={{ fontFamily: 'lato', fontWeight: '700', color: '#5E0916'}}>
                THE COMMUNITY NOSTALGIA PROJECT
            </Link>
            <Typography variant="h5" sx={{ margin: '.5rem 0 1rem 0' }}>
                {date}
            </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="h6" sx={{ padding: '0 .5rem .5rem .5rem' }}>
                    {expanded ? event.fields.eventInfo.content[0].content[0].value : subDetails}
                </Typography>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
            </CardActions>
        </Card>
    );
};

//  <Card 
//             sx={{ 
//                 width: '60%',
//                 height: '40rem',
//                 margin: '2.5rem',
//                 padding: '0px',
//                 backgroundColor: event.color
//             }}
//         >
//             <img
//                 alt="event image"
//                 src={event.fields.thumbnail.fields.file.url}
//                 style={{ 
//                     height: '60%',
//                     width: '100%', 
//                     padding: '0px', 
//                     margin: '0px' 
//                 }}
//             />
//             <CardContent>
//                 <Typography 
//                     gutterBottom 
//                     variant="h4" 
//                     component="div" 
//                 >
//                     {event.fields.title}
//                 </Typography>
//                 <Typography variant="h5" sx={{ margin: '.5rem 0 1rem 0' }}>
//                     {event.fields.dateAndTime}
//                 </Typography>
//                 <Link href='https://www.thecommunitynostalgiaproject.com/Events' underline="hover">
//                     The Community Nostalgia Project
//                 </Link>
//                 <Typography variant="h6">
//                     {event.fields.eventInfo.content[0].content[0].value}
//                 </Typography>
//             </CardContent>
//         </Card>