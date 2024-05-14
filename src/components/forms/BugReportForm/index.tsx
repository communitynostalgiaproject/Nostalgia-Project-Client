import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import ThankYouMessage from "../../form-elements/ThankYouMessage";
import { getApiBase } from "../../../api/helpers";

const BugReportForm: React.FC = () => {
  const [issueText, setIssueText] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const submitIssue = async () => {
    try {
      setIssueText("");
      await axios.post(`${getApiBase()}/github/bug-report`, {
        message: issueText
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.log(`Error submitting bug report: ${err}`);
      setErrorText(`${err}`);
    }
  };

  return (
    <Box>
      {errorText ? <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open
        color="red"
        sx={{
          "@media (max-width: 599px)": {
            marginTop: "15px",
          }
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          data-testid="ExperienceForm-ErrorMessage"
        >
          {errorText}
        </Alert>
      </Snackbar> : null}
      {!submitSuccess ? <>
          <Typography>
            Report a bug
          </Typography>
          <TextField
            label="Describe the issue"
            multiline
            value={issueText}
          />
          <Button
            onClick={submitIssue}
          >
            Submit
          </Button>
        </>
        : <ThankYouMessage
          message="Thank you for your feedback"
        />
    }
    </Box>
  )
};

export default BugReportForm;