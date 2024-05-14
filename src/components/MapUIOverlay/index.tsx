import { Container, Button, Box, Typography, Modal } from '@mui/material';
import React, { useState } from 'react';
import CardModal from '../modal/CardModal';
import ExperienceForm from '../forms/ExperienceForm';
import LocationSearch from '../form-elements/locationSearch';
import BugReportForm from '../forms/BugReportForm';
import { PeliasGeoJSONFeature } from '@stadiamaps/api';

interface MapUIOverlayProps {
  redirectToLogin: () => void;
  user: any;
  setBbox: React.Dispatch<String | null>;
};

const MapUIOverlay: React.FC<MapUIOverlayProps> = ({
  redirectToLogin,
  user,
  setBbox
}) => {
  const [newExperienceModalOpen, setNewExperienceModalOpen] = useState<boolean>(false);
  const [bugReportModalOpen, setBugReportModalOpen] = useState<boolean>(false);
  const [searchBarLocation, setSearchBarLocation] = useState<PeliasGeoJSONFeature | null>(null);

  const toggleNewExperienceModal = () => {
    setNewExperienceModalOpen((prev) => !prev);
  };

  const handleCreateExperienceButtonClick = () => {
    if (user) {
      toggleNewExperienceModal();
      return;
    }

    redirectToLogin();
  }

  const handleLocationSelection = (location: PeliasGeoJSONFeature) => {
    setBbox(location.bbox?.join(",") || null);
    setSearchBarLocation(location);
  };

  return (
    <Container
      sx={{
        width: "100vw",
        height: "100%",
        position: "fixed",
        zIndex: 800,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
      data-testid="MapUIOverlay-Container"
    >
      <CardModal
        open={newExperienceModalOpen}
        onClose={toggleNewExperienceModal}
        cardProps={{
          sx: {
            width: "90%",
            maxWidth: "600px",
            paddingBottom: "30px",
          }
        }}
        data-testid="MapUIOverlay-CreateExperienceModal"
      >
        <ExperienceForm
          mode="create"
          user={user}
        />
      </CardModal>
      <CardModal
        open={bugReportModalOpen}
        onClose={() => setBugReportModalOpen(false)}
      >
        <BugReportForm />
      </CardModal>
      <Box
        sx={{
          marginTop: 15,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LocationSearch
          currentLocation={searchBarLocation?.properties?.label}
          setLocation={handleLocationSelection}
          boxProps={{
            sx: {
              pointerEvents: "auto",
              backgroundColor: "rgba(188, 190, 194, 0.5)",
              width: "90%",
              maxWidth: "500px",
            },
          }}
          fieldProps={{
            inputProps: {
              autocomplete: "off"
            }
          }}
          listProps={{
            sx: {
              pointerEvents: "auto",
              width: "90%",
              maxWidth: "500px"
            }
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            padding: "20px 15px"
          }}
        >
          <Button
            className="CreateExperienceButton"
            variant="contained"
            color="error"
            size="large"
            sx={{
              pointerEvents: "auto"
            }}
            onClick={handleCreateExperienceButtonClick}
            data-testid={
              user
                ? "MapUIOverlay-CreateExperienceButton-LoggedIn"
                : "MapUIOverlay-CreateExperienceButton-LoggedOut"
            }
          >
            Drop a pin!
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: "5px 0px",
            a: {
              color: "black",
              textDecoration: "none",
              pointerEvents: "auto"
            },
            "a:hover": {
              color: "grey"
            }
          }}
        >
            <a
              href="https://www.thecommunitynostalgiaproject.com/terms-of-service"
            >
              Terms of Service
            </a>
            <a
              href="https://www.thecommunitynostalgiaproject.com/privacy-policy"
            >
              Privacy Policy
            </a>
        </Box>
        <Box>
          <Button
            onClick={() => setBugReportModalOpen(true)}
          >
            Report a bug
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MapUIOverlay;