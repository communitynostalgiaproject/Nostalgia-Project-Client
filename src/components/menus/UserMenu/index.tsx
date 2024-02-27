import React from 'react';
import LoginButton from './LoginButton';
import Menu from './Menu';
import {
  Box
} from '@mui/material';

interface UserMenuProps {
  user?: any;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return (
    <Box
      data-testid="UserMenu-ButtonContainer"
    >
      { user  
        ? <Menu user={user} />
        : <LoginButton />
      }
    </Box>
  );
};

export default UserMenu;