import React, { useEffect, useState } from "react";
import { Experience } from "../../types/experience";
import { useQuery } from "react-query";
import {
  Container,
  Typography,
  CardMedia,
  IconButton,
  Button,
  Box,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from "@mui/icons-material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import CardModal from "../modal/CardModal";
import ExperienceForm from "../forms/ExperienceForm";
import axios from "axios";

interface ExperienceViewProps {
  experience: Experience;
  onDelete: () => Promise<boolean>;
}

const formatISOToAmericanDate = (isoDate: string) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(isoDate);
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Pad the month and day with leading zeros if necessary
  const formattedDay = day.toString();

  return `${month} ${formattedDay}, ${year}`;
};

const ExperienceView: React.FC<ExperienceViewProps> = ({ experience, onDelete }) => {
  const [ formattedRecipeText, setFormattedRecipeText ] = useState<React.ReactNode | null>(null);
  const [ editModalOpen, setEditModalOpen ] = useState<boolean>(false);
  const [ deleteModalOpen, setDeleteModalOpen ] = useState<boolean>(false);
  const { data: currentUser } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });
  const { data: creatorUser } = useQuery("creatorUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${experience.creatorId}`, { withCredentials: true });

    return res.data;
  });
  const isUserCreator = currentUser && `${currentUser._id}` === `${experience.creatorId}`;

  const formatMarkdownText = async (text: string) => {
    const formattedText = documentToReactComponents(await richTextFromMarkdown(text));
    setFormattedRecipeText(formattedText);
  };

  useEffect(() => {
    if (experience.recipe && !formattedRecipeText) {
      formatMarkdownText(`${experience.recipe}`);
    }
  }, [formattedRecipeText, setFormattedRecipeText]);

  const toggleEditModal = () => setEditModalOpen((current) => !current);
  const toggleDeleteModal = () => setDeleteModalOpen((current) => !current);
 
  const EditModal = () => {
    return (
      <CardModal
        open={editModalOpen}
        onClose={toggleEditModal}
        cardProps={{
          sx: {
            width: "90%",
            maxWidth: "600px",
            paddingBottom: "30px"
          }
        }}
        data-testid="ExperienceView-EditModal"
      >
        <ExperienceForm
          existingExperience={experience}
          user={currentUser}
        />
      </CardModal>
    )
  };

  const DeleteModal = () => {
    const [ showDeleteError, setShowDeleteError ] = useState<boolean>(false);
    const [ deleteButtonDisabled, setDeleteButtonDisabled ] = useState<boolean>(false);

    const handleDelete = async () => {
      setDeleteButtonDisabled(true);

      const deleteSuccess = await onDelete();

      if (!deleteSuccess) {
        setShowDeleteError(true);
        setDeleteButtonDisabled(false);
        return;
      }

      setDeleteModalOpen(false);
    };

    return (
      <CardModal
        open={deleteModalOpen}
        onClose={toggleDeleteModal}
        cardProps={{
          sx: {
            width: "90%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
            paddingBottom: "40px"
          }
        }}
        data-testid="ExperienceView-DeleteModal"
      >
        <>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={showDeleteError}
          color="red"
      >
        <Alert
          severity="error"
          variant="filled"
          data-testid="ExperienceView-DeleteModalErrorMessage"
        >
          There was an error deleting the experience
        </Alert>
      </Snackbar> 
          <Typography
            variant="h5"
            component="p"
            sx={{
              textAlign: "center"
            }}
            data-testid="ExperienceView-DeleteModalText"
          >
            Are you sure you want to delete this experience?
          </Typography>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <Button
              variant="text"
              onClick={toggleDeleteModal}
              data-testid="ExperienceView-DeleteModalCancelButton"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleteButtonDisabled}
              data-testid="ExperienceView-DeleteModalDeleteButton"
            >
              Delete
            </Button>
          </Box>
        </>
      </CardModal>
    )
  };

  return (
    <Container>
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
            { isUserCreator && (
                <Box
                  data-testid="ExperienceView-EditButtonsContainer"
                >
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
                </Box>
              )
            }
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
          <Box
            sx={{
              maxWidth: "50%",
              minWidth: "400px"
            }}
          >
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
              maxWidth: "50%",
              minWidth: "400px",
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
                  {experience.personItRemindsThemOf}
                </Typography>
              </>
            )}
            {experience.foodtype && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-FoodType"  
              >
                Food Type: {experience.foodtype}
              </Typography>
            )}
            {experience.flavourProfile && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-FlavourProfile"  
              >
                Flavor Profile: {experience.flavourProfile}
              </Typography>
            )}
            {experience.mood && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-Mood"  
              >
                Mood: {experience.mood}
              </Typography>
            )}
            {experience.periodOfLifeAssociation && (
              <Typography
                variant="body2"
                component="p"
                data-testid="ExperienceView-PeriodOfLife"
              >
                Period of Life Association: {experience.periodOfLifeAssociation}
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
      <EditModal />
      <DeleteModal />
    </Container>
  );
};

export default ExperienceView;