import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface UserFormProps {
  user: {
    _id: string;
    displayName: string;
  };
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDisplayName, setEditedDisplayName] = useState(user.displayName);
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation(
    (newDisplayName: string) => axios.patch(
      `${process.env.REACT_APP_API_URL}/users/${user._id}`,
      { 
        _id: user._id,
        displayName: newDisplayName 
      },
      { withCredentials: true }
    ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('currentUser');
      },
    }
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDisplayName(user.displayName);
  };

  const handleSave = () => {
    updateUser(editedDisplayName, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleDelete = () => {

  };

  return (
    <Container
      sx={{
        width: "100%",
        minWidth: "300px",
        border: "1px solid black"
      }}
      data-testid="UserForm-FormContainer"
    >
      <Box
        sx={{
          padding: "25px 0px"
        }}
      >
        <Typography
          variant="h5"
        >
          User Settings
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px"
        }}
      >
        <Box
          sx={{

          }}
        >
          <Typography variant="h6">
            Display Name:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            {!isEditing ? (
              <>
                <Typography
                  data-testid="UserForm-DisplayNameText"
                >
                  {user.displayName}
                </Typography>
                <Button
                  onClick={handleEdit}
                  data-testid="UserForm-EditDisplayNameButton"
                >
                  Edit
                </Button>
              </>
            ) : (
              <TextField
                variant="outlined"
                value={editedDisplayName}
                onChange={(e) => setEditedDisplayName(e.target.value)}
                fullWidth
                data-testid="UserForm-UpdateDisplayNameField"
              />
            )}
          </Box>
        </Box>
        <Button
          onClick={handleDelete}
          color="secondary"
          data-testid="UserForm-DeleteAccountButton"
        >
          Delete Account
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        {isEditing && (
          <>
            <Button
              onClick={handleCancel}
              style={{ marginRight: "8px" }}
              data-testid="UserForm-CancelEditButton"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              color="primary"
              data-testid="UserForm-SaveEditsButton"
              disabled={isLoading}
            >
              Save
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default UserForm;
