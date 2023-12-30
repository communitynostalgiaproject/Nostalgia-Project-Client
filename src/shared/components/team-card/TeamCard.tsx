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
        flexDirection: "column",
        maxWidth: '100%', 
        marginBottom: '3rem',
        boxShadow: 'none',
    }}>
        <Typography variant="h4" >
            {name}
        </Typography>
        <Typography variant="h4" color="text.secondary">
            {title}
        </Typography>
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: { 
                    xs: "center", 
                    sm: "center", 
                    md: 'flex-start' 
                },
                paddingTop: '0.5rem',
                width: '100%',
            }}
        >
            {/* <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    marginBottom: '0.5rem', 
                }} 
            >
                <Typography variant="h4" >
                    {name}
                </Typography>
                    &nbsp;
                    <Divider 
                        variant='middle' 
                        orientation="vertical" 
                        flexItem 
                        sx={{ backgroundColor: 'black' }} 
                    />
                    &nbsp;
                <Typography variant="h4" color="text.secondary">
                    {title}
                </Typography> 
            </Box> */}
            <CardMedia
                image={photo}
                title="Family enjoying dinner together"
                sx={{ width: '225px', height: '245px', marginTop: '1rem' }}
            />
            <CardContent sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                <Typography >
                    {content}
                </Typography>
            </CardContent>
        </Box>
    </Card>
  );
};