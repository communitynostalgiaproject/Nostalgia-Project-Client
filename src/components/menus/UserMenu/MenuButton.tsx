import React, { useState, useRef } from 'react';
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import UserForm from '../../forms/UserForm';
import CardModal from '../../modal/CardModal';

interface MenuButtonProps {
  user: any;
};

const MenuButton: React.FC<MenuButtonProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [accountSettingsModalOpen, setAccountSettingsModalOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenuOpen = () => setMenuOpen((prev) => !prev);

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
        data-testid="MenuButton-MenuPopover"
      >
        <List>
          <ListItem
            disablePadding
          >
            <ListItemButton
              onClick={() => setAccountSettingsModalOpen(true)}
              data-testid="MenuButton-AccountSettingsButton"
            >
              <ListItemText
                primary="Account Settings"
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
        data-testid='MenuButton-AccountSettingsModal'
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
        data-testid="MenuButton-MenuToggleButton"
      >
        <AccountCircleIcon />
      </IconButton>
      <MenuPopover />
      <AccountSettingsModal />
    </>
  );
};

export default MenuButton;