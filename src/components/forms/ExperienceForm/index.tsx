import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useQuery } from 'react-query';
import { Snackbar, Alert } from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { Experience } from '../../../types/experience';
import { Page1, Page2, Page3, Page4 } from './pages';
import axios from "axios";

interface ExperienceFormProps {
  existingExperience?: Experience
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ existingExperience }) => {
  const [experience, setExperience] = useState(existingExperience || {
    _id: null,
    creatorId: null
  });
  const [foodPhoto, setFoodPhoto] = useState<File | null>(null);
  const [personPhoto, setPersonPhoto] = useState<File | null>(null);
  const [error, setError] = useState<String>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [validationTrigger, setValidationTrigger] = useState<boolean>(false);

  const { data: user } = useQuery("users", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });

  const handlePageBack = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
      setError("");
    }
  };

  const incrementPage = () => {
    if (pageIndex < pages.length) setPageIndex((prev) => prev + 1);
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    const stringifiedExperience = JSON.stringify({
      ...experience,
      creatorId: experience.creatorId || user._id
    } as Experience);
    formData.append("experience", stringifiedExperience);
    if (foodPhoto) {
      formData.append("foodPhoto", foodPhoto);
    }
    if (personPhoto) {
      formData.append("personPhoto", personPhoto);
    }

    try {
      experience._id  // If the experience already exists (i.e. has an _id), call update endpoint. Otherwise, create new
        ? await axios.patch(`${process.env.REACT_APP_API_URL}/experiences/${experience._id}`, formData, {
            withCredentials: true
          })
        : await axios.post(`${process.env.REACT_APP_API_URL}/experiences`, formData, {
          withCredentials: true
        });
    } catch(err) {
      console.log(`Could not complete post: ${err}`);
    }
  };

  const pages = [
    <Page1
      experience={experience}
      setExperience={setExperience}
      setError={setError}
      onValidationSuccess={incrementPage}
      validationTrigger={validationTrigger}
      setValidationTrigger={setValidationTrigger}
    />,
    <Page2
      experience={experience}
      setExperience={setExperience}
      setError={setError}
      onValidationSuccess={incrementPage}
      validationTrigger={validationTrigger}
      setValidationTrigger={setValidationTrigger}
    />,
    <Page3
      experience={experience}
      setExperience={setExperience}
      setError={setError}
      onValidationSuccess={incrementPage}
      validationTrigger={validationTrigger}
      setValidationTrigger={setValidationTrigger}
    />,
    <Page4
      experience={experience}
      setExperience={setExperience}
      foodPhoto={foodPhoto}
      personPhoto={personPhoto}
      setFoodPhoto={setFoodPhoto}
      setPersonPhoto={setPersonPhoto}
      setError={setError}
      onValidationSuccess={handleSubmit}
      validationTrigger={validationTrigger}
      setValidationTrigger={setValidationTrigger}
    />
  ];

  const BackButton = () => {
    return (
      <Button
        onClick={handlePageBack}
      >
        <ArrowBackIcon />
      </Button>
    )
  };

  const ForwardButton = () => {
    return (
      <Button
        onClick={() => setValidationTrigger(true)}
      >
        <ArrowForwardIcon />
      </Button>
    )
  };

  const SubmitButton = () => {
    return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => setValidationTrigger(true)}
      >
        Submit
      </Button>
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      {error ? <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open
          data-testid="ExperienceForm-ErrorMessage"
          color="red"
      >
        <Alert
          severity="error"
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar> : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px"
        }}
      >
        {pages[pageIndex]}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20px"
          }}
        >
          <Box>
            {pageIndex > 0 ? <BackButton /> : null}
          </Box>
          <Box>
            {pageIndex < pages.length - 1 ? <ForwardButton /> : null}
            {pageIndex === pages.length - 1 ? <SubmitButton /> : null}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ExperienceForm;
