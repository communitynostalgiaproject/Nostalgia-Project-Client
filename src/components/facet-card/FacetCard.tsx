import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const familyPhoto = require('../../assets/Food-with-Family.png');

type Props = {
  id: number,
  title: string,
  content: string
};

export default function FacetCard({ id, title, content }: Props) {
  const flow = id % 2 === 0 ? 'row' : 'row-reverse';

  return ( 
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: flow, 
        alignItems: 'center',
        maxWidth: '100%', 
        height: { xs: '15rem', md: "12.5rem" },
        // height: '12.5rem',
        padding: '1rem',
        borderRadius: '15px',
    }}>
      <CardContent sx={{ maxWidth: '70%' }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ 
          height: '85%', 
          width: '30%', 
          borderRadius: '15px',
        }}
        image={familyPhoto}
        title="Family enjoying dinner together"
      />
    </Card>
  );
};