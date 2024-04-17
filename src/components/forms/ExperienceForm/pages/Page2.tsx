import {
  TextField,
  Autocomplete,
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
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setExperience({ ...experience, [name]: value });
  };

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
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        multiline
        rows={10}
        label="Recipe"
        name="recipe"
        placeholder="How is this food prepared? (Optional)"
        value={experience.recipe}
        autoFocus
        onChange={handleTextChange}
        InputLabelProps={{
          shrink: true
        }}
        data-testid="ExperienceForm-RecipeField"
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