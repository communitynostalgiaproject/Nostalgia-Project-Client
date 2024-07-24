import React from "react";
import { useLandingPageContext } from "../../contexts/LandingPageContext";
import ExperienceList from "../lists/ExperienceList";
import CardModal from "./CardModal";

const MyExperiencesModal: React.FC = () => {
  const {
    myExperiencesModalOpen,
    setMyExperiencesModalOpen
  } = useLandingPageContext();

  return (
    <CardModal
      open={myExperiencesModalOpen}
      onClose={() => setMyExperiencesModalOpen(false)}
      cardProps={{
        sx: {
          width: "90%",
          maxWidth: "600px",
          paddingBottom: "30px",
        }
      }}
    >
      <ExperienceList
        headerText="My Experiences"
        experiences={[]}
      />
    </CardModal>

  )
};

export default MyExperiencesModal;