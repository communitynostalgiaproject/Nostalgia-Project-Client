import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
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
        pointerEvents: "auto"
      }}
      data-testid='ExperiencePreviewList-Container'
    >
      <ImageList
        cols={3}
        sx={{
          width: '100%',
          overflow: 'auto',
          overflowX: 'hidden'
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