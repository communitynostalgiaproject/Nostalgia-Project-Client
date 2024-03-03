import React, { useState } from 'react';
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
  onDelete: () => Promise<boolean>;
};

const DeleteExperienceModal: React.FC<DeleteExperienceModalProps> = ({
  open,
  onClose,
  onDelete
}) => {
  const [showDeleteError, setShowDeleteError] = useState<boolean>(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleteButtonDisabled(true);

    const deleteSuccess = await onDelete();

    if (!deleteSuccess) {
      setShowDeleteError(true);
      setDeleteButtonDisabled(false);
      return;
    }

    onClose();
  };

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
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={showDeleteError}
          color="red"
        >
          <Alert
            severity="error"
            variant="filled"
            data-testid="ExperienceView-DeleteModalErrorMessage"
          >
            There was an error deleting the experience
          </Alert>
        </Snackbar>
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
            onClick={handleDelete}
            disabled={deleteButtonDisabled}
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