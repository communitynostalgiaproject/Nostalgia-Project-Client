import { useState, useCallback } from 'react';

export interface ValidationRule {
  errorCondition: boolean;           // Describes an error state (e.g. !title, count < 0, etc.).
  message: string;                   // Message to be displayed if error occurs.
  fieldName: string;                 // Name of the field to be checked. Used to update errorFields.
}

export const useValidation = (
  fieldNames: string[], 
  validationRules: ValidationRule[], 
  setError: (errorMessage: string) => void,
  onValidationSuccess: () => void
) => {
  const initialErrors = fieldNames.reduce((newObj: any, key) => {
    newObj[key] = false;
    return newObj;
  }, {});
  const [errorFields, setErrorFields] = useState(initialErrors);

  const validateFields = useCallback(() => {
    setError("");
    let valid = true;
    const newErrors = { ...initialErrors };

    for (let i = 0; i < validationRules.length; i++) {
      const { errorCondition, message, fieldName } = validationRules[i];

      if (errorCondition) {
        setError(message);
        newErrors[fieldName] = true;
        valid = false;
        break;
      }
    }

    setErrorFields(newErrors);

    if (valid) {
      onValidationSuccess();
    };
  }, [validationRules, initialErrors, onValidationSuccess, setError]);

  return { errorFields, validateFields }
};