import React, { useState, useRef } from 'react';
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import UserForm from '../../../forms/UserForm';
import CardModal from '../../../modal/CardModal';
import axios from 'axios';

interface MenuProps {
  user: any;
};

const Menu: React.FC<MenuProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [accountSettingsModalOpen, setAccountSettingsModalOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const toggleMenuOpen = () => setMenuOpen((prev) => !prev);

  const { mutate: logout } = useMutation(
    () => axios.get(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      {
        withCredentials: true
      }
    ),
    {
      onSuccess: () => {
        queryClient.setQueryData('currentUser', undefined);
      }
    }
  );

  const MenuPopover = () => {
    return (
      <Popover
        id='user-menu-popover'
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        data-testid="UserMenu-MenuPopover"
      >
        <List>
          <ListItem
            disablePadding
          >
            <ListItemButton
              onClick={() => setAccountSettingsModalOpen(true)}
              data-testid="UserMenu-AccountSettingsButton"
            >
              <ListItemText
                primary="Account Settings"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
          >
            <ListItemButton
              onClick={() => logout()}
              data-testid="UserMenu-LogoutButton"
            >
              <ListItemText
                primary="Logout"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    );
  };

  const AccountSettingsModal = () => {
    return (
      <CardModal
        open={accountSettingsModalOpen}
        onClose={() => setAccountSettingsModalOpen(false)}
        cardProps={{
          sx: {
            width: '95%',
            maxWidth: '600px',
            paddingBottom: '15px'
          }
        }}
        data-testid='UserMenu-AccountSettingsModal'
      >
        <UserForm
          user={user}
        />
      </CardModal>
    );
  };

  return (
    <>
      <IconButton
        ref={buttonRef}
        onClick={toggleMenuOpen}
        data-testid="UserMenu-MenuToggleButton"
      >
        <AccountCircleIcon />
      </IconButton>
      <MenuPopover />
      <AccountSettingsModal />
    </>
  );
};

export default Menu;