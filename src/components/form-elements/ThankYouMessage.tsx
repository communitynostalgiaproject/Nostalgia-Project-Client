import { Box, Typography } from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import React from "react";

interface ThankYouMessageProps {
  message: string;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ message }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "80px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
      }}
      data-testid="ThankYouMessage-Container"
    >
      <CheckCircleIcon
        color="success"
        sx={{
          fontSize: "100px"
        }}
      />
      <Typography>
        {
          message
        }
      </Typography>
    </Box>
  );
};

export default ThankYouMessage;