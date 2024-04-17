import {
  TextField,
  Autocomplete,
  SelectChangeEvent,
} from '@mui/material';
import { FormPageProps } from '../formPageProps';
import React, { ChangeEvent, useEffect } from 'react';
import selectOptions from "../selectOptions.json";

const Page3: React.FC<FormPageProps> = ({
  experience,
  setExperience,
  onValidationSuccess,
  validationTrigger,
  setValidationTrigger
}) => {
  const handleComboBoxChange = (newValue: any, fieldName: string) => {
    const value = Array.isArray(newValue) ? newValue.join(",") : newValue;

    setExperience({ ...experience, [fieldName]: value});
  };

  useEffect(() => {
    if (validationTrigger) {
      setValidationTrigger(false);
      onValidationSuccess();
    }
  }, [validationTrigger, setValidationTrigger, onValidationSuccess]);

  return (
    <>
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
      <Autocomplete
        onChange={(event, newValue) => handleComboBoxChange(newValue, "foodtype")}
        data-testid="ExperienceForm-MealTypeField"
        value={experience.foodtype?.split(",")}
        options={selectOptions.mealTypes}
        freeSolo
        multiple
        fullWidth
        renderInput={(params) => <TextField
          {...params}
          label="Meal Type"
        />}
      /> 
      <Autocomplete
        onChange={(event, newValue) => handleComboBoxChange(newValue, "flavourProfile")}
        data-testid="ExperienceForm-FlavourProfileField"
        value={experience.flavourProfile?.split(",")}
        options={selectOptions.flavorProfiles}
        freeSolo
        multiple
        fullWidth
        renderInput={(params) => <TextField
          {...params}
          label="Flavour Profile"
        />}
      />
      <Autocomplete
        onChange={(event, newValue) => handleComboBoxChange(newValue, "cuisine")}
        data-testid="ExperienceForm-CuisineField"
        value={experience.cuisine?.split(",")}
        options={selectOptions.cuisines}
        freeSolo
        multiple
        fullWidth
        renderInput={(params) => <TextField
          {...params}
          label="Cuisine"
        />}
      /> 
    </>
  );
};

export default Page3;