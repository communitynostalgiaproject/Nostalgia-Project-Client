import { Button } from '@mui/material';
import { FormPageProps } from '../formPageProps';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import React, { useEffect, ChangeEvent } from 'react';

interface ImageUploadPageProps extends FormPageProps {
  foodPhoto: File | null;
  personPhoto: File | null;
  setFoodPhoto: (photo: File) => void;
  setPersonPhoto: (photo: File) => void;
}

const Page4: React.FC<ImageUploadPageProps> = ({
  foodPhoto,
  personPhoto,
  setFoodPhoto,
  setPersonPhoto,
  setError,
  onValidationSuccess,
  validationTrigger,
  setValidationTrigger
}) => {
  const MAX_IMAGE_SIZE = 10;

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const file = files ? files[0] : null;

    if (!file) {
      console.log("No file!");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image file too large");
      return;
    }

    if (name === "foodPhoto") setFoodPhoto(file);
    if (name === "personPhoto") setPersonPhoto(file);
  };

  const validationRules = [
    {
      errorCondition: !foodPhoto,
      message: "Please submit a photo of the food"
    }
  ];

  const validateFields = () => {
    let valid = true;

    for (let i = 0; i < validationRules.length; i++) {
      const { errorCondition, message } = validationRules[i];

      if (errorCondition) {
        setError(message);
        valid = false;
        break;
      }
    }

    if (valid) {
      setError("");
      onValidationSuccess();
    }
  };

  useEffect(() => {
    if (validationTrigger) {
      validateFields();
      setValidationTrigger(false);
    }
  }, [validationTrigger, setValidationTrigger, validateFields])

  return (
    <>
      {/* File upload for food photo */}
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="food-photo-upload"
        type="file"
        name="foodPhoto"
        onChange={handleFileUpload}
      />
      <label htmlFor="food-photo-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload Food Photo
        </Button>
      </label>

      {/* File upload for person photo */}
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="person-photo-upload"
        type="file"
        name="personPhoto"
        onChange={handleFileUpload}
      />
      <label htmlFor="person-photo-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          style={{ marginTop: 10 }}
          startIcon={<CloudUploadIcon />}
        >
          Upload Person Photo
        </Button>
      </label>
  </>
  );
};

export default Page4;