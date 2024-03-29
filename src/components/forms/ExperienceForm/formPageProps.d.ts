export interface FormPageProps {
  experience: any;
  setExperience: (experience: any) => void;
  setError: (errorMessage: string) => void;
  onValidationSuccess: () => void;
  validationTrigger: boolean;
  setValidationTrigger: (triggered: boolean) => void;
}