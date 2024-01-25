import { TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { FormPageProps } from '../formPageProps';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Place } from '../../../../types/experience';
import LocationSearch from '../../../form-elements/locationSearch';
import { useValidation, ValidationRule } from '../../../../hooks/useValidation';
import React, { useEffect, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const Page1: React.FC<FormPageProps> = ({
  experience,
  setExperience,
  setError,
  onValidationSuccess,
  validationTrigger,
  setValidationTrigger
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setExperience({ ...experience, [name]: value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      try {
        const dateString = date.toISOString();
        setExperience({
          ...experience,
          experienceDate: dateString
        });
      } catch(err) {
        console.log("Unable to update date");
      }
    }
  };

  const handleLocationChange = (location: Place) => {
    setExperience({
      ...experience,
      place: location
    });
  };

  const validationRules = [
    {
      errorCondition: !experience.title,
      message: "Please enter a title for your experience",
      fieldName: "title"
    },
    {
      errorCondition: !experience.description,
      message: "Please enter an experience description",
      fieldName: "description"
    },
    {
      errorCondition: !experience.experienceDate,
      message: "Please enter a date for the experience",
      fieldName: "experienceDate"
    },
    {
      errorCondition: !experience.place,
      message: "Please select a location for the experience",
      fieldName: "location"
    }
  ] as ValidationRule[];
  
  const { errorFields, validateFields } = useValidation(
    ["title", "description", "experienceDate", "location"], 
    validationRules, 
    setError, 
    onValidationSuccess
  );

  useEffect(() => {
    if (validationTrigger) {
      validateFields();
      setValidationTrigger(false);
    }
  }, [validationTrigger, setValidationTrigger, validateFields]);

  return (
    <>
      <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Experience Title"
          name="title"
          value={experience.title}
          autoFocus
          onChange={handleChange}
          error={errorFields.title}
      />
      <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Describe your experience"
          name="description"
          rows={10}
          multiline
          value={experience.description}
          autoFocus
          onChange={handleChange}
          error={errorFields.description}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={handleDateChange}
          value={experience.experienceDate ? dayjs(experience.experienceDate) : undefined}
          name="experienceDate"
          label="Date of experience"
        />
      </LocalizationProvider>
      <LocationSearch
        setLocation={handleLocationChange}
        currentLocation={experience.place?.address.label}
        error={errorFields.location}
      />
    </>
  );
};

export default Page1;