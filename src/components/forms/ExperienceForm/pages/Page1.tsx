import { TextField, Autocomplete } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { FormPageProps } from '../formPageProps';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Place } from '../../../../types/experience';
import LocationSearch from '../../../form-elements/locationSearch';
import { useValidation, ValidationRule } from '../../../../hooks/useValidation';
import React, { useEffect, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { PeliasGeoJSONFeature } from '@stadiamaps/api';
import selectOptions from "../selectOptions.json";

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

  const handleLocationChange = (location: PeliasGeoJSONFeature) => {
    setExperience({
      ...experience,
      place: {
        address: location.properties,
        location: location.geometry
      } as Place
    });
  };

  const handleComboBoxChange = (newValue: any, fieldName: string) => {
    const value = Array.isArray(newValue) ? newValue.join(",") : newValue;

    setExperience({ ...experience, [fieldName]: value });
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
          onChange={handleChange}
          autoFocus
          error={errorFields.title}
          data-testid="ExperienceForm-TitleField"
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
          onChange={handleChange}
          error={errorFields.description}
          data-testid="ExperienceForm-DescriptionField"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          data-testid="ExperienceForm-ExperienceDateField"
        >
          <DatePicker
            onChange={handleDateChange}
            views={["month", "year"]}
            value={experience.experienceDate ? dayjs(experience.experienceDate) : undefined}
            name="experienceDate"
            label="Date of experience"
          />
        </div>
      </LocalizationProvider>
      <div
        style={{
          marginTop: "10px",
          width: "100%"
        }}
        data-testid="ExperienceForm-LocationField"
      >
        <LocationSearch
          setLocation={handleLocationChange}
          currentLocation={experience.place?.address.label}
          error={errorFields.location}
          listProps={{
            sx: {
              maxWidth: "350px"
            }
          }}
        />
      </div>
      <Autocomplete
        onChange={(event, newValue) => handleComboBoxChange(newValue, "personItRemindsThemOf")}
        data-testid="ExperienceForm-PersonItRemindsThemOfField"
        value={experience.personItRemindsThemOf?.split(",")}
        options={selectOptions.relationships}
        freeSolo
        multiple
        fullWidth
        renderInput={(params) => <TextField
          {...params}
          label="Person/people it reminds you of (relationship)"
        />}
      />
      <Autocomplete
        onChange={(event, newValue) => handleComboBoxChange(newValue, "periodOfLifeAssociation")}
        data-testid="ExperienceForm-PeriodOfLifeField"
        value={experience.periodOfLifeAssociation?.split(",")}
        options={selectOptions.periodsOfLife}
        freeSolo
        multiple
        fullWidth
        renderInput={(params) => <TextField
          {...params}
          label="Period of Life Association"
        />}
      />
      <Autocomplete
        onChange={(event, newValue) => handleComboBoxChange(newValue, "mood")}
        data-testid="ExperienceForm-EmotionsField"
        value={experience.mood?.split(",")}
        options={selectOptions.emotions}
        freeSolo
        multiple
        fullWidth
        renderInput={(params) => <TextField
          {...params}
          label="Emotions Felt"
        />}
      /> 
    </>
  );
};

export default Page1;