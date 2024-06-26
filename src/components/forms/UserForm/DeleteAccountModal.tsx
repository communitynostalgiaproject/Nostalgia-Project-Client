import React, { useState, useEffect } from 'react';
import CardModal from '../../modal/CardModal';
import {
  Container,
  Typography,
  Box,
  Button
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    _id: string;
  }
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  open,
  onClose,
  user
}) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading } = useMutation(
    (deletePosts: boolean) => axios.delete(
      `${process.env.REACT_APP_API_URL}/users/${user._id}`,
      {
        withCredentials: true,
        params: {
          deletePosts
        }
      }
    ),
    {
      onSuccess: () => {
        onClose();
        queryClient.setQueryData('currentUser', undefined);
      },
    }
  );

  const handleCancel = () => {
    setPageIndex(0);
    onClose();
  }

  const pages = [
    <Container>
      <Typography
        variant='body1'
        data-testid='DeleteAccountModal-ConfirmText'
      >
        Are you sure you want to delete your account?
      </Typography>
      <Box
        sx={{
          padding: '15px 0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '5px'
        }}
      >
        <Button
          onClick={handleCancel}
          data-testid='DeleteAccountModal-CancelButton'
        >
          Cancel
        </Button>
        <Button
          onClick={() => {if (pageIndex < pages.length - 1) setPageIndex((prev) => prev + 1)}}
          data-testid='DeleteAccountModal-ConfirmButton'
        >
          Delete
        </Button>
      </Box>
    </Container>,
    <Container>
      <Typography
        variant='body1'
        data-testid='DeleteAccountModal-ChooseDeletePostsText'
      >
        We're sorry to see you go. Would you like to delete all of your experience posts?
        If you choose not to delete your posts, they will still be visible on the map but will 
        become "anonymized" and will no longer show your display name.
      </Typography>
      <Box
        sx={{
          padding: '15px 0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '5px'
        }}
      >
        <Button
          onClick={handleCancel}
          data-testid='DeleteAccountModal-CancelButton'
        >
          Cancel
        </Button>
        <Button
          onClick={() => deleteUser(true)}
          disabled={isLoading}
          data-testid='DeleteAccountModal-DeleteUserAndPostsButton'
        >
          Delete account and posts
        </Button>
        <Button
          onClick={() => deleteUser(false)}
          disabled={isLoading}
          data-testid='DeleteAccountModal-DeleteJustUserButton'
        >
          Just delete my account
        </Button>
      </Box>
    </Container>
  ];

  return (
    <CardModal
      open={open}
      onClose={handleCancel}
      cardProps={{
        sx: {
          width: '95%',
          maxWidth: '600px'
        }
      }}
      data-testid='DeleteAccountModal-Modal'
    >
      <Container>
        {pages[pageIndex]}
      </Container>
    </CardModal>
  );
};

export default DeleteAccountModal;