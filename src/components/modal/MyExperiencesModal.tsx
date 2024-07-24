import React from "react";
import { useLandingPageContext } from "../../contexts/LandingPageContext";
import ExperienceList from "../lists/ExperienceList";
import CardModal from "./CardModal";

const MyExperiencesModal: React.FC = () => {
  const {
    myExperiencesModalOpen
  } = useLandingPageContext();

  return (
    <CardModal
      open={myExperiencesModalOpen}
    >
      <ExperienceList
        headerText="My Experiences"
        experiences={[]}
      />
    </CardModal>

  )
};

export default MyExperiencesModal;