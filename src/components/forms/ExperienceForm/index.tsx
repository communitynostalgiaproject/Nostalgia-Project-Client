import React, { useState } from 'react';
import {
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { Experience } from '../../../types/experience';
import { Page1, Page2, Page3 } from './pages';
import ThankYouMessage from '../../form-elements/ThankYouMessage';
import axios from "axios";

interface BaseProps {
  mode: "create" | "edit";
  user: any;
}

interface CreateExperienceProps extends BaseProps {
  mode: "create";
}

interface EditExperienceProps extends BaseProps {
  mode: "edit";
  existingExperience: Experience;
  setSelectedExperience: React.Dispatch<Experience>;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

type ExperienceFormProps = CreateExperienceProps | EditExperienceProps;

const ExperienceForm: React.FC<ExperienceFormProps> = (props) => {
  const editing = props.mode === "edit" ? true : false;
  const [experience, setExperience] = useState(props.mode === "edit" ? props.existingExperience : {_id: undefined});
  const [foodPhoto, setFoodPhoto] = useState<File | null>(null);
  const [personPhoto, setPersonPhoto] = useState<File | null>(null);
  const [error, setError] = useState<String>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [validationTrigger, setValidationTrigger] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitPending, setSubmitPending] = useState<boolean>(false);

  const handlePageBack = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
      setError("");
    }
  };

  const incrementPage = () => {
    if (pageIndex < pages.length) setPageIndex((prev) => prev + 1);
  };

  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/experiences/images`,
      formData,
      {
        withCredentials: true
      }
    );
    return result.data?.imageUrl;
  };

  const handleSubmit = async () => {
    try {
      setSubmitPending(true);
      let experienceObj = editing
        ? experience
        : {
          ...experience,
          creatorId: props.user ? props.user._id : undefined
        } as Experience;
      if (foodPhoto) {
        const foodPhotoUrl = await uploadImage(foodPhoto);
        experienceObj = {
          ...experienceObj,
          foodPhotoUrl
        }
      }
      if (personPhoto) {
        const personPhotoUrl = await uploadImage(personPhoto);
        experienceObj = {
          ...experienceObj,
          personPhotoUrl
        }
      }
      if (props.mode === "edit") {
        await axios.patch(`${process.env.REACT_APP_API_URL}/experiences/${experience._id}`, experienceObj, {
          withCredentials: true
        });
        props.setExperiences((current: Experience[]) => {
          return current.map((_experience: Experience) => {
            return _experience._id === experience._id ? experience as Experience : _experience;
          });
        });
        props.setSelectedExperience(experience as Experience);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/experiences`, experienceObj, {
          withCredentials: true
        });
      }

      setSubmitSuccess(true);
    } catch(err) {
      console.error(`Could not complete submit request: ${err}`);
      setError(`There was an error with your request: ${err}`);
    } finally {
      setSubmitPending(false);
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px"
        }}
      >
        { submitPending ? <CircularProgress color="info" size={24} /> :  null}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => setValidationTrigger(true)}
          data-testid="ExperienceForm-SubmitButton"
          disabled={submitPending}
        >
          Submit
        </Button>
      </Box>
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

  return (
    <Container component="main" maxWidth="xs">
      {error ? <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open
          color="red"
          sx={{
            "@media (max-width: 599px)": {
              marginTop: "15px",
            }
          }}
      >
        <Alert
          severity="error"
          variant="filled"
          data-testid="ExperienceForm-ErrorMessage"
        >
          {error}
        </Alert>
      </Snackbar> : null}
      {!submitSuccess && <Typography
        variant="h5"
        sx={{
          marginBottom: "15px"
        }}
      >
        { editing ? "Edit Experience" : "Create Experience" }
      </Typography>}
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
          ? <ThankYouMessage
            message={editing ? "Your experience has been updated" : "Thank you for submitting your experience"}
          /> 
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
