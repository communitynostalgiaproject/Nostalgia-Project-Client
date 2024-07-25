import { Container, Button, Box, Typography, Modal } from '@mui/material';
import React, { useState } from 'react';
import CardModal from '../modal/CardModal';
import ExperienceForm from '../forms/ExperienceForm';
import LocationSearch from '../form-elements/locationSearch';
import BugReportForm from '../forms/BugReportForm';
import { PeliasGeoJSONFeature } from '@stadiamaps/api';
import { useLandingPageContext } from '../../contexts/LandingPageContext';

interface MapUIOverlayProps {
  redirectToLogin: () => void;
};

const MapUIOverlay: React.FC<MapUIOverlayProps> = ({
  redirectToLogin
}) => {
  const [newExperienceModalOpen, setNewExperienceModalOpen] = useState<boolean>(false);
  const [bugReportModalOpen, setBugReportModalOpen] = useState<boolean>(false);
  const [searchBarLocation, setSearchBarLocation] = useState<PeliasGeoJSONFeature | null>(null);
  const context = useLandingPageContext();

  const toggleNewExperienceModal = () => {
    setNewExperienceModalOpen((prev) => !prev);
  };

  const handleCreateExperienceButtonClick = () => {
    if (context.user) {
      toggleNewExperienceModal();
      return;
    }

    redirectToLogin();
  }

  const handleLocationSelection = (location: PeliasGeoJSONFeature) => {
    context.setBbox(location.bbox?.join(",") || null);
    setSearchBarLocation(location);
  };

  return (
    <Box
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
          user={context.user}
        />
      </CardModal>
      <CardModal
        open={bugReportModalOpen}
        onClose={() => setBugReportModalOpen(false)}
        cardProps={{
          sx: {
            width: "90%",
            maxWidth: "600px",
            paddingBottom: "30px",
          }
        }}
        data-testid="MapUIOverlay-BugReportModal"
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
            padding: "20px 15px",
            "@media (min-width: 599px)": {
              paddingLeft: "80px",
              paddingBottom: "80px"
            }
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
              context.user
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
            background: "rgba(255, 255, 255, 0.4)",
            button: {
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
              cursor: "pointer",
              outline: "inherit",
              lineHeight: "normal",
              pointerEvents: "auto"   
            },
            "a, button": {
              color: "black",
              textDecoration: "none",
              pointerEvents: "auto"
            },
            "a:hover, button:hover": {
              color: "grey"
            },
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
            <button
              onClick={() => setBugReportModalOpen(true)}
              data-testid="MapUIOverlay-ReportBugButton"
            >
              Report a bug
            </button>
        </Box>
      </Box>
    </Box>
  );
};

export default MapUIOverlay;