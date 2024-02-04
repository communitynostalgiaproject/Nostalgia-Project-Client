import React from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';
import { IconButton, Box, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CardModalProps {
  cardProps?: any
};

const CardModal: React.FC<ModalProps & CardModalProps> = (props) => {
  const { children, onClose, cardProps, ...otherProps } = props;

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      onClose(event, 'escapeKeyDown');
    }
  };

  return (
    <Modal {...otherProps} >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Card {...cardProps}>
          <Box
            sx={{
              height: "60px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                marginRight: "20px"
              }}
              data-testid="CardModal-CloseButton"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Card>
      </Box>
  </Modal>
  );
};

export default CardModal;
