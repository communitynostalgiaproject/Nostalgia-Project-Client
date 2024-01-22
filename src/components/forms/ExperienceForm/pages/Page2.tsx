import { TextField } from '@mui/material';
import { FormPageProps } from '../formPageProps';
import React, { ChangeEvent, useEffect } from 'react';

const Page2: React.FC<FormPageProps> = ({
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
          multiline
          rows={10}
          label="Recipe"
          name="recipe"
          placeholder="How is this food prepared? (Optional)"
          value={experience.recipe}
          autoFocus
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
      />
    </>
  );
};

export default Page2;