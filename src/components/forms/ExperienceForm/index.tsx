import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useQuery } from 'react-query';
import { Snackbar, Alert } from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { Experience, Place } from '../../../types/experience';
import { Page1, Page2, Page3, Page4 } from './pages';
import axios from "axios";

const ExperienceForm: React.FC = () => {
  const [experience, setExperience] = useState({});
  const [foodPhoto, setFoodPhoto] = useState<File | null>(null);
  const [personPhoto, setPersonPhoto] = useState<File | null>(null);
  const [error, setError] = useState<String>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageValid, setPageValid] = useState<boolean>(false);
  const [validationTrigger, setValidationTrigger] = useState<boolean>(false);

  const { data: user } = useQuery("users", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });

  useEffect(() => {
    console.log(`experience: ${JSON.stringify(experience)}`);
  }, [experience]);

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
      creatorId: user._id
    } as Experience)
    formData.append("experience", stringifiedExperience);
    if (foodPhoto) {
      formData.append("foodPhoto", foodPhoto);
    }
    if (personPhoto) {
      formData.append("personPhoto", personPhoto);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/experiences`, formData, {
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
        fullWidth
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
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
      <Box>
        {pages[pageIndex]}
        <Box>
          {pageIndex > 0 ? <BackButton /> : null}
          {pageIndex < pages.length - 1 ? <ForwardButton /> : null}
          {pageIndex === pages.length - 1 ? <SubmitButton /> : null}
        </Box>
      </Box>
    </Container>
  );
};

export default ExperienceForm;
