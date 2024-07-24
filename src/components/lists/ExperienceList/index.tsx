import React from 'react';
import { Experience } from '../../../types/experience';
import { Box, Typography, List, ListItem } from '@mui/material';
import { useLandingPageContext } from '../../../contexts/LandingPageContext';

interface ExperienceListProps {
  experiences: Experience[];
  headerText: string;
}

const ExperienceList: React.FC<ExperienceListProps> = ({
  headerText,
  experiences
}) => {
  const {
    setSelectedExperience,
    setMyExperiencesModalOpen
  } = useLandingPageContext();

  const handleExperienceSelect = (experience: Experience) => {
    setSelectedExperience(experience);
    setMyExperiencesModalOpen(false);
  }

  return (
    <Box>
      <Typography
        variant="h4"
      >
        {headerText}
      </Typography>
      <List>
        {
          experiences.map((experience, index) => {
            return (
              <ListItem
                key={index}
                onClick={() => handleExperienceSelect(experience)}
                sx={{
                  cursor: "pointer"
                }}
              >
                {experience.title}
              </ListItem>
            )
          })
        }
      </List>
    </Box>
  );
}

export default ExperienceList;