import React from 'react';
import LoginButton from './LoginButton';
import MenuButton from './MenuButton';
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
        ? <MenuButton user={user} />
        : <LoginButton />
      }
    </Box>
  );
};

export default UserMenu;