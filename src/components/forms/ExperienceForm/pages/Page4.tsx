import { Box, Button, styled } from '@mui/material';
import { FormPageProps } from '../formPageProps';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import React, { useEffect, ChangeEvent } from 'react';
import { useValidation, ValidationRule } from '../../../../hooks/useValidation';

interface ImageUploadPageProps extends FormPageProps {
  foodPhoto: File | null;
  personPhoto: File | null;
  setFoodPhoto: (photo: File) => void;
  setPersonPhoto: (photo: File) => void;
};

const Input = styled('input')({
  display: 'none',
});

const ImagePreview = styled('img')({
  width: '100%', // This can be adjusted to fit your design
  height: 'auto',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '5px',
});

const Page4: React.FC<ImageUploadPageProps> = ({
  experience,
  setExperience,
  foodPhoto,
  personPhoto,
  setFoodPhoto,
  setPersonPhoto,
  setError,
  onValidationSuccess,
  validationTrigger,
  setValidationTrigger
}) => {
  const MAX_IMAGE_SIZE = 1024 * 1024 * 2;

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, photoType: 'food' | 'person') => {
    setError("");
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) {
      console.log("No file!");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image file too large");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (photoType === 'food') {
        setFoodPhoto(file);
        setExperience({
          ...experience,
          foodPhotoUrl: reader.result as string
        });
      } else {
        setPersonPhoto(file);
        setExperience({
          ...experience,
          personPhotoUrl: reader.result as string
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const validationRules = [
    {
      errorCondition: !foodPhoto && !experience._id,
      message: "Please select a food photo",
      fieldName: "foodPhoto"
    }
  ] as ValidationRule[];

  const { validateFields } = useValidation(
    ["foodPhoto", "personPhoto"],
    validationRules,
    setError,
    onValidationSuccess
  );

  useEffect(() => {
    if (validationTrigger) {
      validateFields();
      setValidationTrigger(false);
    }
  }, [validationTrigger, setValidationTrigger, validateFields])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          gap: "20px",
        }}
      >
        {/* Upload and preview for food photo */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {experience.foodPhotoUrl && <ImagePreview src={experience.foodPhotoUrl} alt="Food preview" data-testid="ExperienceForm-FoodPhotoPreview" />}
          <label htmlFor="food-photo-upload">
            <Input
              accept="image/*"
              id="food-photo-upload"
              type="file"
              onChange={(event) => handleFileUpload(event, 'food')}
              data-testid="ExperienceForm-UploadFoodPhotoInput"
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
              data-testid="ExperienceForm-UploadFoodPhotoButton"
            >
              Food Photo
            </Button>
          </label>
        </Box>

        {/* Upload and preview for person photo */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {experience.personPhotoUrl && <ImagePreview src={experience.personPhotoUrl} alt="Person preview" data-testid="ExperienceForm-PersonPhotoPreview" />}
          <label htmlFor="person-photo-upload">
            <Input
              accept="image/*"
              id="person-photo-upload"
              type="file"
              onChange={(event) => handleFileUpload(event, 'person')}
              data-testid="ExperienceForm-UploadPersonPhotoInput"
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
              data-testid="ExperienceForm-UploadPersonPhotoButton"
            >
              Person Photo
            </Button>
          </label>
        </Box>
      </Box>
    </>
  );
};

export default Page4;