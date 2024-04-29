import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import nothingHereIcon from '../../../assets/nothing-here-icon.png';
import { Box, Button, Typography } from '@mui/material';
import { Experience } from '../../../types/experience';

interface ExperiencePreviewListProps {
  experiences: Experience[],
  setSelectedExperience: React.Dispatch<Experience | null>;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
};

const ExperiencePreviewList: React.FC<ExperiencePreviewListProps> = ({
  experiences,
  setSelectedExperience,
  hasNextPage,
  fetchNextPage
}) => {
  return (
    <Box
      sx={{
        pointerEvents: "auto",
        width: '100%'
      }}
      data-testid='ExperiencePreviewList-Container'
    >
      {!experiences.length && <Box
        sx={{
          paddingTop: '5px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5
        }}
      >
        <Typography
          textAlign='center'
          variant='h4'
        >
          No posts in this area. Keep looking!
        </Typography>
        <img
          src={nothingHereIcon}
          style={{
            width: '100%',
          }}
        />
      </Box>}
      <ImageList
        cols={3}
        sx={{
          width: '100%',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        data-testid='ExperiencePreviewList-List'
      >
        {experiences.map((experience, index) => (
          <ImageListItem
            key={experience._id}
            onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              event.stopPropagation();
              setSelectedExperience(experience);
            }}
            sx={{
              cursor: 'pointer'
            }}
          data-testid={`ExperiencePreviewList-ListItem-${index}`}
          >
            <img
              src={`${experience.foodPhotoUrl}?w=248&fit=crop&auto=format`}
              alt={experience.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      {hasNextPage && (
        <Box
          sx={{

          }}
        >
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation();
              fetchNextPage();
            }}
            sx={{
              pointerEvents: "auto"
            }}
            data-testid='ExperiencePreviewList-LoadMoreButton'
          >
            See more
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ExperiencePreviewList;