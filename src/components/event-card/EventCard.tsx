import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

type Props = {
    event: {
        id: number,
        title: string,
        address: string,
        time: string,
        details: string
    }
};

export default function EventCard({ event }: Props ) {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'column', md: 'row' }, 
                justifyContent: { md: 'space-around' }, 
                marginTop: '5rem', 
                width: '100%' 
            }}
        >
            <Stack 
                sx={{ 
                    display: 'flex',
                    flexDirection: { 
                        xs: 'row', 
                        sm: 'row', 
                        md: 'column' 
                    },  
                }}
            >
                <Typography 
                    variant='nostalgiaHeader' 
                    sx={{ fontSize: '2.5rem' }}
                >
                    NOV
                </Typography>
                    <Divider 
                        sx={{ 
                            display: { xs: 'none', sm: 'none', md: 'block' }, 
                            height: '2px', 
                            width: { xs: '5rem', sm: '5rem' },
                            backgroundColor: '#5E0916' 
                        }} 
                    />
                    <Typography variant='nostalgiaHeader' sx={{ fontSize: '2.5rem' }}>&#160;7</Typography>
            </Stack>
            <Stack sx={{ width: { sm: '100%', md: '50%' } }}>
                <Typography variant='nostalgiaHeader'>{event.title}</Typography>
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
};