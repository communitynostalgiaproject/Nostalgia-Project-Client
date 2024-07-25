import React from 'react';
import { Experience } from '../../../types/experience';
import { Box, Typography, List, ListItem } from '@mui/material';
import { useLandingPageContext } from '../../../contexts/LandingPageContext';

interface ExperienceListProps {
  experiences: Experience[];
  headerText: string;
  updateModalOpenState: React.Dispatch<boolean>;
  showCreatedDate?: boolean;
}

const ExperienceList: React.FC<ExperienceListProps> = ({
  headerText,
  experiences,
  updateModalOpenState,
  showCreatedDate = true
}) => {
  const {
    setSelectedExperience,
    setSidebarOpen
  } = useLandingPageContext();

  const handleExperienceSelect = (experience: Experience) => {
    setSelectedExperience(experience);
    setSidebarOpen(true);
    updateModalOpenState(false);
  }

  const formatDateString = (dateStr: string) => {
    const dateObj = new Date(dateStr);

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "0px 20px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography
        variant="h4"
      >
        {headerText}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          paddingTop: "14px"
        }}
      >
        {!!experiences.length && 
          <List
            sx={{
              width: "100%"
            }}
            data-testid="ExperienceList-List"
          >
            {experiences.map((experience, index) => {
                return (
                  <ListItem
                    key={index}
                    data-testid={`ExperienceList-ListItem${index + 1}`}
                    onClick={() => handleExperienceSelect(experience)}
                    sx={{
                      cursor: "pointer",
                      height: "35px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      ":hover": {
                        color: "grey"
                      }
                    }}
                  >
                    <Typography>
                      {experience.title}
                    </Typography>
                    {showCreatedDate && experience.createdDate &&
                      <Typography>
                        Created: {formatDateString(experience.createdDate)}
                      </Typography>
                    }
                  </ListItem>
                )
              })
            }
          </List>
          
        }
      </Box>
      {!experiences.length && 
        <Typography
          data-testid="ExperienceList-NoExperiencesMessage"
        >
          No experiences to display
        </Typography>
      }
    </Box>
  );
}

export default ExperienceList;