import React, { useMemo } from "react";
import { useLandingPageContext } from "../../contexts/LandingPageContext";
import { CircularProgress, Typography } from "@mui/material";
import useFetchExperiencesByUser from "../../api/queries/fetchExperiencesByUser";
import ExperienceList from "../lists/ExperienceList";
import CardModal from "./CardModal";

interface ModalContentProps {
  user?: any;
};

const ModalContent: React.FC<ModalContentProps> = ({
  user
}) => {
  const {
    data: userExperiences,
    isLoading,
    isError
  } = useFetchExperiencesByUser(user?._id);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Sorry, unable to load experiences.</Typography>
  }

  if (userExperiences) {
    return <ExperienceList headerText="My Experiences" experiences={userExperiences} />
  }

  return <Typography>Sorry, there's been an error.</Typography>
};

const MyExperiencesModal: React.FC = () => {
  const {
    myExperiencesModalOpen,
    setMyExperiencesModalOpen,
    user
  } = useLandingPageContext();

  const content = useMemo(
    () => <ModalContent user={user} />,
    [user]
  );

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
      {content}
    </CardModal>

  )
};

export default MyExperiencesModal;