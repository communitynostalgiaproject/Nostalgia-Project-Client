import React, { useMemo } from "react";
import { useLandingPageContext } from "../../contexts/LandingPageContext";
import { CircularProgress, Typography, Box } from "@mui/material";
import ExperienceList from "../lists/ExperienceList";
import CardModal from "./CardModal";
import useFetchExperiencesByReaction from "../../api/queries/fetchExperiencesByReaction";

interface ModalContentProps {
  user?: any;
};

const ModalContent: React.FC<ModalContentProps> = ({
  user
}) => {
  const {
    data: experiences,
    isLoading,
    isError
  } = useFetchExperiencesByReaction({
    userId: user?._id || "",
    reaction: "willTry"
  });
  const { setwillTrysModalOpen } = useLandingPageContext();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Sorry, unable to load experiences.</Typography>
  }

  if (experiences) {
    return <ExperienceList
      headerText="Will Try"
      experiences={experiences}
      updateModalOpenState={setwillTrysModalOpen}
      showCreatedDate={false}
    />;
  }

  return <Typography>Sorry, there's been an error.</Typography>
};

const WillTrysModal: React.FC = () => {
  const {
    willTrysModalOpen,
    setwillTrysModalOpen,
    user
  } = useLandingPageContext();

  const content = useMemo(
    () => <ModalContent user={user} />,
    [user]
  );

  return (
    <CardModal
      open={willTrysModalOpen}
      onClose={() => setwillTrysModalOpen(false)}
      cardProps={{
        sx: {
          width: "90%",
          maxWidth: "600px",
          paddingBottom: "30px",
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {content}
      </Box>
    </CardModal>

  )
};

export default WillTrysModal;