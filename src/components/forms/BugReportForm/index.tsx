import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import ThankYouMessage from "../../form-elements/ThankYouMessage";
import { getApiBase } from "../../../api/helpers";

const BugReportForm: React.FC = () => {
  const [issueText, setIssueText] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [submitPending, setSubmitPending] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setIssueText(value);
  };

  const submitIssue = async () => {
    try {
      setSubmitPending(true);
      setIssueText("");
      await axios.post(`${getApiBase()}/github/bug-report`, {
        message: issueText
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.log(`Error submitting bug report: ${err}`);
      setErrorText(`${err}`);
    } finally {
      setSubmitPending(false);
    }
  };

  const SubmitButton = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px"
        }}
      >
        {submitPending ? <CircularProgress color="info" size={24} data-testid="BugReportForm-SubmitButtonSpinner" /> : null}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={submitIssue}
          disabled={!issueText || submitPending}
          data-testid="BugReportForm-SubmitButton"
        >
          Submit
        </Button>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0 20px"
      }}
      data-testid="BugReportForm-Container"
    >
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
          data-testid="BugReportForm-ErrorMessage"
        >
          {errorText}
        </Alert>
      </Snackbar> : null}
      {!submitSuccess ? <>
          <Box>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "15px"
              }}
              data-testid="BugReportForm-TitleText"
            >
              Report a bug
            </Typography>
          </Box>
          <Box>
            <TextField
              label="Describe the issue"
              multiline
              fullWidth
              rows={10}
              value={issueText}
              onChange={handleTextChange}
              data-testid="BugReportForm-TextField"
            />
          </Box>
          <Box
            sx={{
              padding: "15px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <SubmitButton />
          </Box>
        </>
        : <ThankYouMessage
          message="Thank you for your feedback"
        />
    }
    </Box>
  )
};

export default BugReportForm;