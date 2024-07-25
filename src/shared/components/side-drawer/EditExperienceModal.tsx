import React from 'react';
import CardModal from '../../../components/modal/CardModal';
import ExperienceForm from '../../../components/forms/ExperienceForm';
import { useLandingPageContext } from '../../../contexts/LandingPageContext';

const EditExperienceModal: React.FC = () => {
  const {
    editModalOpen,
    selectedExperience,
    user,
    setSelectedExperience,
    setExperiences,
    setEditModalOpen
  } = useLandingPageContext();

  return (
    <CardModal
      open={editModalOpen}
      onClose={() => setEditModalOpen(false)}
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
        existingExperience={selectedExperience!}
        user={user}
        setSelectedExperience={setSelectedExperience}
        setExperiences={setExperiences}
      />
    </CardModal>
  )
};

export default EditExperienceModal;