import React from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';
import { IconButton, Box, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CardModalProps {
  cardProps?: any
};

const CardModal: React.FC<ModalProps & CardModalProps> = (props) => {
  const { children, onClose, cardProps, ...otherProps } = props;

  return (
    <Modal
      {...otherProps}
      onClose={onClose}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
        overflow: "auto"
      }}
      slotProps={{
        backdrop: {
          sx: {
            pointerEvents: "none"
          }
        }
      }}
    >
      <Card 
        {...cardProps}
        sx={{
          ...cardProps.sx,
          maxHeight: "90%",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          "@media (max-width: 599px)": {
            maxHeight: "98%"
          }
        }}  
      >
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
            onClick={(event) => onClose ? onClose(event, "escapeKeyDown") : null}
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
  </Modal>
  );
};

export default CardModal;
