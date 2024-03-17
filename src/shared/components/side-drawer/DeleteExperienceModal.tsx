import React from 'react';
import CardModal from '../../../components/modal/CardModal';
import {
  Snackbar,
  Alert,
  Typography,
  Box,
  Button
} from '@mui/material';

interface DeleteExperienceModalProps {
  open: boolean,
  onClose: () => void;
  onDelete: () => void;
  deleteError: string;
  processingDeletion: boolean;
};

const DeleteExperienceModal: React.FC<DeleteExperienceModalProps> = ({
  open,
  onClose,
  onDelete,
  deleteError,
  processingDeletion
}) => {
  return (
    <CardModal
      open={open}
      onClose={onClose}
      cardProps={{
        sx: {
          width: "90%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
          paddingBottom: "40px"
        }
      }}
      data-testid="ExperienceView-DeleteModal"
    >
      <>
        {deleteError && <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={deleteError !== "null"}
          color="red"
        >
          <Alert
            severity="error"
            variant="filled"
            data-testid="ExperienceView-DeleteModalErrorMessage"
          >
            {deleteError}
          </Alert>
        </Snackbar>}
        <Typography
          variant="h5"
          component="p"
          sx={{
            textAlign: "center"
          }}
          data-testid="ExperienceView-DeleteModalText"
        >
          Are you sure you want to delete this experience?
        </Typography>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <Button
            variant="text"
            onClick={onClose}
            data-testid="ExperienceView-DeleteModalCancelButton"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            disabled={processingDeletion}
            data-testid="ExperienceView-DeleteModalDeleteButton"
          >
            Delete
          </Button>
        </Box>
      </>
    </CardModal>
  )
};

export default DeleteExperienceModal;