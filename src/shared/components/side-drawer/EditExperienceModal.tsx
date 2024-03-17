import React from 'react';
import CardModal from '../../../components/modal/CardModal';
import ExperienceForm from '../../../components/forms/ExperienceForm';
import { Experience } from '../../../types/experience';

interface EditExperienceModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
  experience: Experience;
  setSelectedExperience: React.Dispatch<Experience>;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const EditExperienceModal: React.FC<EditExperienceModalProps> = ({
  open, 
  onClose,
  user,
  experience,
  setSelectedExperience,
  setExperiences
}) => {
  return (
    <CardModal
      open={open}
      onClose={onClose}
      cardProps={{
        sx: {
          width: "90%",
          maxWidth: "600px",
          paddingBottom: "30px"
        }
      }}
      data-testid="ExperienceView-EditModal"
    >
      <ExperienceForm
        mode="edit"
        existingExperience={experience}
        user={user}
        setSelectedExperience={setSelectedExperience}
        setExperiences={setExperiences}
      />
    </CardModal>
  )
};

export default EditExperienceModal;