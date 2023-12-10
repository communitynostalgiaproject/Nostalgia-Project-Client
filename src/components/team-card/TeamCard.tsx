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
        flexDirection: 'row', 
        maxWidth: '100%', 
        boxShadow: 'none',
    }}>
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '0.5rem'
            }}
        >
            <Box sx={{ display: 'flex', marginBottom: '0.5rem' }} >
                <Typography variant="h4" >
                    {name}
                </Typography>
                &nbsp;<Divider variant='middle' orientation="vertical" flexItem sx={{ backgroundColor: 'black' }} />&nbsp;
                <Typography variant="h4" color="text.secondary">
                    {title}
                </Typography>
            </Box>
            <CardMedia
                image={photo}
                title="Family enjoying dinner together"
                sx={{ 
                    width: '225px',
                    height: '245px',
                }}
            />
        </Box>
        <CardContent sx={{ maxWidth: '70%', paddingTop: '2%' }}>
            <Typography>
                {content}
            </Typography>
        </CardContent>
    </Card>
  );
};