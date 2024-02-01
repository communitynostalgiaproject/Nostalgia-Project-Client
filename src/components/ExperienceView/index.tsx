import React, { ReactElement, useEffect, useState } from "react";
import { Experience } from "../../types/experience";
import { useQuery } from "react-query";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box
} from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { Document } from "@contentful/rich-text-types";
import axios from "axios";

interface ExperienceViewProps {
  experience: Experience;
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

const ExperienceView: React.FC<ExperienceViewProps> = ({ experience }) => {
  const [ formattedRecipeText, setFormattedRecipeText ] = useState<React.ReactNode | null>(null);
  const { data: currentUser } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });
  const isUserCreator = currentUser?._id === experience.creatorId;

  const formatMarkdownText = async (text: string) => {
    const formattedText = documentToReactComponents(await richTextFromMarkdown(text));
    setFormattedRecipeText(formattedText);
  };

  useEffect(() => {
    if (experience.recipe && !formattedRecipeText) {
      formatMarkdownText(`${experience.recipe}`);
    }
  }, [formattedRecipeText, setFormattedRecipeText]);

  return (
    <Card className="experience-view" variant="outlined">
      <CardContent
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
            gap: "35px"
          }}
        >
          <CardMedia
            component="img"
            sx={{
              maxWidth: "250px"
            }}
            image={experience.foodPhotoUrl}
            alt="Food Photo"
          />
          <Box
            sx={{
              marginTop: "20px"
            }}
          >
            <Typography variant="h5" component="div">
              {experience.title}
            </Typography>
            <Typography color="textSecondary">
              {experience.place.address.label}
            </Typography>
            <Typography color="textSecondary">
              {formatISOToAmericanDate(experience.experienceDate)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
                  />
                )}
                <Typography>
                  {experience.personItRemindsThemOf}
                </Typography>
              </>
            )}
            {experience.foodtype && (
              <Typography variant="body2" component="p">
                Food Type: {experience.foodtype}
              </Typography>
            )}
            {experience.flavourProfile && (
              <Typography variant="body2" component="p">
                Flavor Profile: {experience.flavourProfile}
              </Typography>
            )}
            {experience.mood && (
              <Typography variant="body2" component="p">
                Mood: {experience.mood}
              </Typography>
            )}
            {experience.mood && (
              <Typography variant="body2" component="p">
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
              gap: "10px"
            }}
          >
            <Typography variant="h5" component="h2">
              Recipe:
            </Typography>
            {formattedRecipeText}
          </Box>
        )}

        {isUserCreator && (
          <div>
            <Button variant="contained" color="primary">
              Edit
            </Button>
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceView;
