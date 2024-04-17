import React, { useEffect, useState } from "react";
import { Experience } from "../../../../types/experience";
import { useQuery } from "react-query";
import {
  Container,
  Typography,
  CardMedia,
  IconButton,
  Box,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import axios from "axios";

interface ExperienceViewProps {
  experience: Experience;
  onClose: () => void;
  setEditModalOpen: React.Dispatch<boolean>;
  setDeleteModalOpen: React.Dispatch<boolean>;
}

const formatISOToAmericanDate = (isoDate: string) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(isoDate);
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month}, ${year}`;
};

const ExperienceView: React.FC<ExperienceViewProps> = ({
  experience,
  onClose,
  setEditModalOpen,
  setDeleteModalOpen
}) => {
  const [ formattedRecipeText, setFormattedRecipeText ] = useState<React.ReactNode | null>(null);
  const { data: currentUser } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });
  const isUserCreator = currentUser && `${currentUser._id}` === `${experience.creatorId}`;
  const { data: creatorUser } = useQuery(["users", experience.creatorId.toString()], async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${experience.creatorId}`, { withCredentials: true });

    return res.data;
  });

  const formatMarkdownText = async (text: string) => {
    const formattedText = documentToReactComponents(await richTextFromMarkdown(text));
    setFormattedRecipeText(formattedText);
  };

  const formatMultiSelectData = (text: string) => {
    return text
      .split(",")
      .map((value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
      .join(", ");
  };

  useEffect(() => {
    if (experience.recipe && !formattedRecipeText) {
      formatMarkdownText(`${experience.recipe}`);
    }
  }, [formattedRecipeText, setFormattedRecipeText, experience.recipe]);

  const toggleEditModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setEditModalOpen(true);
  };

  const toggleDeleteModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <Container
      data-testid="ExperienceView-Container"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "35px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "35px"
          }}
        >
          <Box>
            <CardMedia
              component="img"
              sx={{
                maxWidth: "250px"
              }}
              image={experience.foodPhotoUrl}
              alt="Food Photo"
              data-testid="ExperienceView-FoodPhotoImage"
            />
            <Box
              sx={{
                marginTop: "20px"
              }}
            >
              <Typography
                variant="h5"
                component="div"
                data-testid="ExperienceView-ExperienceTitle"
              >
                {experience.title}
              </Typography>
              <Typography
                color="textSecondary"
                data-testid="ExperienceView-ExperienceLocationLabel"
              >
                {experience.place.address.label}
              </Typography>
              <Typography
                color="textSecondary"
                data-testid="ExperienceView-ExperienceDateText"
              >
                {formatISOToAmericanDate(experience.experienceDate)}
              </Typography>
              <Typography
                color="textSecondary"
                data-testid="ExperienceView-CreatedBy"
              >
                Created by: {creatorUser ? creatorUser.displayName : "Anonymous"}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              data-testid="ExperienceView-EditButtonsContainer"
            >
              {isUserCreator && (
                <>
                  <IconButton
                    onClick={toggleEditModal}
                    data-testid="ExperienceView-EditButton"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={toggleDeleteModal}
                    data-testid="ExperienceView-DeleteButton"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
              <IconButton
                onClick={handleClose}
                data-testid="ExperienceView-CloseButton"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px"
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "12px"
              }}
            >
              Description:
            </Typography>
            <Typography
              variant="body2"
              component="p"
              data-testid="ExperienceView-Description"
            >
              {decodeURIComponent(experience.description)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px"
            }}
            data-testid="ExperienceView-PersonItRemindsThemOfContainer"
          >
            {experience.personItRemindsThemOf && (
              <>
                <Typography>
                  Who it reminds me of:
                </Typography>
                {experience.personPhotoUrl && (
                  <CardMedia
                    component="img"
                    image={experience.personPhotoUrl}
                    alt="Person Photo"
                    sx={{
                      maxWidth: "200px"
                    }}
                    data-testid="ExperienceView-PersonPhoto"
                  />
                )}
                <Typography
                  data-testid="ExperienceView-PersonText"
                >
                  {formatMultiSelectData(experience.personItRemindsThemOf)}
                </Typography>
              </>
            )}
            {experience.foodtype && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-FoodType"  
              >
                Meal Type: {formatMultiSelectData(experience.foodtype)}
              </Typography>
            )}
            {experience.cuisine && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-FlavourProfile"
              >
                Cuisine: {formatMultiSelectData(experience.cuisine)}
              </Typography>
            )}
            {experience.flavourProfile && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-FlavourProfile"  
              >
                Flavor Profile: {formatMultiSelectData(experience.flavourProfile)}
              </Typography>
            )}
            {experience.mood && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-Mood"  
              >
                Mood: {formatMultiSelectData(experience.mood)}
              </Typography>
            )}
            {experience.periodOfLifeAssociation && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-PeriodOfLife"
              >
                Period of Life Association: {formatMultiSelectData(experience.periodOfLifeAssociation)}
              </Typography>
            )}         
          </Box>
        </Box>
        {experience.recipe && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            data-testid="ExperienceView-RecipeContainer"
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                marginBottom: "10px"
              }}
            >
              Recipe:
            </Typography>
            {formattedRecipeText}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ExperienceView;
