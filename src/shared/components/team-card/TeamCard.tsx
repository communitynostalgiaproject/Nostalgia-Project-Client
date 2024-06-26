import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type Props = {
    name: string,
    title: string,
    content: string,
    photo: any
};

export default function TeamCard({ name, title, content, photo }: Props) {
  return ( 
    <Card 
        sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%', 
            boxShadow: 'none',
        }}
    >
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: { 
                    xs: 'column', 
                    sm: 'column', 
                    md: 'row' 
                },
                alignItems: 'flex-start',
                width: '100%',
                marginBottom: '0.5rem', 
            }} 
        >
            <Typography variant="h4" sx={{ marginRight: '1rem' }}>
                {name}
            </Typography>
            <Typography variant="h4" color="text.secondary">
                {title}
            </Typography>
        </Box>
        <Box 
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { 
                    xs: "center", 
                    sm: "center", 
                    md: 'flex-start' 
                },
                paddingTop: '0.5rem',
                width: '100%'
            }}
        >
            <CardMedia
                image={photo}
                title="Family enjoying dinner together"
                sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: { xs: '100%', md: '225px' }, 
                    height: { xs: '500px', md: '245px' },
                }}
            />
            <CardContent 
                sx={{
                    width: { xs: '100%', sm: '100%', md: '60%' }, 
                    marginTop: { sm: '2rem', md: '0' },
                    paddingTop: '0', 
                }}
            >
            <Typography>
                {content}
            </Typography>
        </CardContent>
        </Box>
    </Card>
  );
};