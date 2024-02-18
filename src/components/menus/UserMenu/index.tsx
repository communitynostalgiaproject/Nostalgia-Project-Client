import React from 'react';
import LoginButton from './LoginButton';
import MenuButton from './MenuButton';
import { redirectToLogin } from '../../../api/helpers';
import {
  Box
} from '@mui/material';

interface UserMenuProps {
  user?: any;
  handleLogin?: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  handleLogin
}) => {

  const handleLoginButtonClick = () => {
    if (handleLogin) {
      handleLogin();
      return;
    }

    redirectToLogin();
  }

  return (
    <Box
      data-testid="UserMenu-ButtonContainer"
    >
      { user  
        ? <MenuButton user={user} />
        : <LoginButton handleLogin={handleLoginButtonClick}/>
      }
    </Box>
  );
};

export default UserMenu;