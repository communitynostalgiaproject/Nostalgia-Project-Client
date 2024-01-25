import { TextField } from '@mui/material';
import { FormPageProps } from '../formPageProps';
import React, { ChangeEvent, useEffect } from 'react';

const Page3: React.FC<FormPageProps> = ({
  experience,
  setExperience,
  onValidationSuccess,
  validationTrigger,
  setValidationTrigger
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setExperience({ ...experience, [name]: value });
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
        label="Person it reminds you of"
        name="personItRemindsThemOf"
        value={experience.personItRemindsThemOf}
        autoFocus
        onChange={handleChange}
      />  
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Period of life"
        name="periodOfLifeAssociation"
        value={experience.periodOfLifeAssociation}
        autoFocus
        onChange={handleChange}
      />  
      <TextField
        label="Mood"
        name="mood"
        value={experience.mood}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Food Type"
        name="foodtype"
        value={experience.foodtype}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Flavour Profile"
        name="flavourProfile"
        value={experience.flavourProfile}
        onChange={handleChange}
        fullWidth
      />
    </>
  );
};

export default Page3;