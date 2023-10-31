import React from 'react';
import { Container, Stack, Typography, Divider, Box } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import EastSharpIcon from '@mui/icons-material/EastSharp';

const EventsPage = () => {

    return (
        <Container sx={{ marginTop: '10rem' }}>
            <Stack direction='row' useFlexGap sx={{ justifyContent: 'space-between' }}>
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

            <Divider sx={{ height: '2px', marginBottom: '5rem', backgroundColor: '#5E0916' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '5rem' }}>
                <Stack>
                    <Typography variant='nostalgiaSubHeader2'>NOV</Typography>
                        <Divider sx={{ height: '2px', backgroundColor: '#5E0916' }} />
                        <Typography variant='nostalgiaSubHeader2'>4</Typography>
                    </Stack>
                <Stack sx={{ width: '50%' }}>
                    <Typography variant='nostalgiaSubHeader2'>Lorem Consectetur.</Typography>
                        <Typography variant='eventTitle'>Cecilla Chapman 711-288 Nulla St.Mankato Mississippi</Typography>
                        <Typography variant='eventTitle'>7:00pm - 8:00pm</Typography>
                        <Typography variant='eventDetails'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Sed egestas egestas fringilla phasellus faucibus. Tristique nulla aliquet enim tortor. Dolor magna eget est lorem ipsum dolor sit amet. Feugiat scelerisque varius morbi enim nunc faucibus.
                        </Typography>
                    <Divider sx={{ height: '2px', backgroundColor: '#5E0916', margin: '1rem 0' }} />
                    <Typography sx={{ color: '#5E0916' }} >View Event Details ➔</Typography>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '5rem' }}>
                <Stack>
                    <Typography variant='nostalgiaSubHeader2'>NOV</Typography>
                        <Divider sx={{ height: '2px', backgroundColor: '#5E0916' }} />
                        <Typography variant='nostalgiaSubHeader2'>7</Typography>
                    </Stack>
                <Stack sx={{ width: '50%' }}>
                    <Typography variant='nostalgiaSubHeader2'>Lorem Consectetur.</Typography>
                        <Typography variant='eventTitle'>Cecilla Chapman 711-288 Nulla St.Mankato Mississippi</Typography>
                        <Typography variant='eventTitle'>7:00pm - 8:00pm</Typography>
                        <Typography variant='eventDetails'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                    <Divider sx={{ height: '2px', backgroundColor: '#5E0916', margin: '1rem 0' }} />
                    <Typography sx={{ color: '#5E0916' }} >View Event Details ➔</Typography>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '5rem' }}>
                <Stack>
                    <Typography variant='nostalgiaSubHeader2'>NOV</Typography>
                        <Divider sx={{ height: '2px', backgroundColor: '#5E0916' }} />
                        <Typography variant='nostalgiaSubHeader2'>4</Typography>
                    </Stack>
                <Stack sx={{ width: '50%' }}>
                    <Typography variant='nostalgiaSubHeader2'>Lorem Consectetur.</Typography>
                        <Typography variant='eventTitle'>Cecilla Chapman 711-288 Nulla St.Mankato Mississippi</Typography>
                        <Typography variant='eventTitle'>7:00pm - 8:00pm</Typography>
                        <Typography variant='eventDetails'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                    <Divider sx={{ height: '2px', backgroundColor: '#5E0916', margin: '1rem 0' }} />
                    <Typography sx={{ color: '#5E0916' }} >View Event Details ➔</Typography>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '5rem 0' }}>
                <Stack>
                    <Typography variant='nostalgiaSubHeader2'>NOV</Typography>
                        <Divider sx={{ height: '2px', backgroundColor: '#5E0916' }} />
                        <Typography variant='nostalgiaSubHeader2'>7</Typography>
                    </Stack>
                <Stack sx={{ width: '50%' }}>
                    <Typography variant='nostalgiaSubHeader2'>Lorem Consectetur.</Typography>
                        <Typography variant='eventTitle'>Cecilla Chapman 711-288 Nulla St.Mankato Mississippi</Typography>
                        <Typography variant='eventTitle'>7:00pm - 8:00pm</Typography>
                        <Typography variant='eventDetails'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    <Divider sx={{ height: '2px', backgroundColor: '#5E0916', margin: '1rem 0' }} />
                    <Typography sx={{ color: '#5E0916' }} >View Event Details ➔</Typography>
                </Stack>
            </Box>
        </Container>
    );
};

export default EventsPage;