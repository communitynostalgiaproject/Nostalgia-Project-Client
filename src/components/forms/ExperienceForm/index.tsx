import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Typography,
  Container,
  Box,
  Icon,
  Snackbar,
  Alert
} from '@mui/material';
import { useQuery } from 'react-query';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { Experience } from '../../../types/experience';
import { Page1, Page2, Page3, Page4 } from './pages';
import axios from "axios";

interface ExperienceFormProps {
  existingExperience?: Experience
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ existingExperience }) => {
  const editing = existingExperience ? true : false;
  const [experience, setExperience] = useState(existingExperience || {_id: undefined});
  const [foodPhoto, setFoodPhoto] = useState<File | null>(null);
  const [personPhoto, setPersonPhoto] = useState<File | null>(null);
  const [error, setError] = useState<String>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [validationTrigger, setValidationTrigger] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

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
    const stringifiedExperience = editing 
      ? JSON.stringify({
          ...experience,
          creatorId: user._id
        } as Experience)
      : JSON.stringify(experience);
    formData.append("experience", stringifiedExperience);
    if (foodPhoto) {
      formData.append("foodPhoto", foodPhoto);
    }
    if (personPhoto) {
      formData.append("personPhoto", personPhoto);
    }

    try {
      editing
        ? await axios.patch(`${process.env.REACT_APP_API_URL}/experiences/${experience._id}`, formData, {
            withCredentials: true
          })
        : await axios.post(`${process.env.REACT_APP_API_URL}/experiences`, formData, {
          withCredentials: true
        });

      setSubmitSuccess(true);
    } catch(err) {
      console.error(`Could not complete submit request: ${err}`);
      setError("There was an error with your request.");
    }
  };

  const pages = [
    <Page1
      key="page1"
      experience={experience}
      setExperience={setExperience}
      setError={setError}
      onValidationSuccess={incrementPage}
      validationTrigger={validationTrigger}
      setValidationTrigger={setValidationTrigger}
    />,
    <Page2
      key="page2"
      experience={experience}
      setExperience={setExperience}
      setError={setError}
      onValidationSuccess={incrementPage}
      validationTrigger={validationTrigger}
      setValidationTrigger={setValidationTrigger}
    />,
    <Page3
      key="page3"
      experience={experience}
      setExperience={setExperience}
      setError={setError}
      onValidationSuccess={incrementPage}
      validationTrigger={validationTrigger}
      setValidationTrigger={setValidationTrigger}
    />,
    <Page4
      key="page4"
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
        data-testid="ExperienceForm-BackButton"
      >
        <ArrowBackIcon />
      </Button>
    );
  };

  const ForwardButton = () => {
    return (
      <Button
        onClick={() => setValidationTrigger(true)}
        data-testid="ExperienceForm-ForwardButton"
      >
        <ArrowForwardIcon />
      </Button>
    );
  };

  const SubmitButton = () => {
    return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => setValidationTrigger(true)}
        data-testid="ExperienceForm-SubmitButton"
      >
        Submit
      </Button>
    );
  };

  const PageNavigation = () => (
    <>
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
    </>
  );

  const ThankYouMessage = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px"
        }}
        data-testid="ExperienceForm-ThankYouMessage"
      >
        <CheckCircleIcon
          color="success"
          sx={{
            fontSize: "100px"
          }}
        />
        <Typography>
          {
            editing
              ? "Your experience has been updated"
              : "Thank you for submitting your experience"
          }
        </Typography>
      </Box>
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
          color="red"
      >
        <Alert
          severity="error"
          variant="filled"
          data-testid="ExperienceForm-ErrorMessage"
        >
          {error}
        </Alert>
      </Snackbar> : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        { submitSuccess 
          ? <ThankYouMessage /> 
          : <>
              {pages[pageIndex]}
              <PageNavigation />
            </>
        }
      </Box>
    </Container>
  );
};

export default ExperienceForm;
