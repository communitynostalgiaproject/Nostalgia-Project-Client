import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import cameraIcon from '../../assets/camera-icon.png';
import tacoIcon from '../../assets/taco-icon.png';
import appIcon from '../../assets/app-icon.png';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  height: '80%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const modals = [
  { 
    id: 0,
    text: 'Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus.',
    icon: cameraIcon
  },
  { 
    id: 1,
    text: 'Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus.',
    icon: tacoIcon
  },
  { 
    id: 2,
    text: 'Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus.',
    icon: appIcon
  },
];

export default function TransitionsModal() {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(0);
  const handleClose = () => setOpen(false);

  const displayModal = modals.map((modal) => {
    return (
      <Fade in={open}>
        <Box sx={style}>
          <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexDirection: 'column', 
              gap: '1rem', 
              padding: '1rem'
            }}
          >
          <img src={modal.icon} />
          <Typography id="transition-modal-title" variant="h2" sx={{ fontFamily: 'San Sarif', color: '#5E0916' }}>
            {modal.id + 1}
          </Typography>
          <Typography id="transition-modal-description">
            {modal.text}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ height: '15%', justifyContent: 'center', marginTop: '1rem' }}>
            <Button 
              size='small' 
              href='' 
              sx={{ 
                color: openModal === 0 ? '#5E0916' : '#8E525B'
              }} 
              onClick={() => setOpenModal(0)
              } 
            >
              <CircleIcon />
            </Button>
            <Button 
              size='small' 
              href='' 
              sx={{ 
                color: openModal === 1 ? '#5E0916' : '#8E525B'
              }} 
              onClick={() => setOpenModal(1)
              } 
            >
              <CircleIcon />
            </Button>
            <Button 
              size='small' 
              href='' 
              sx={{ 
                color: openModal === 2 ? '#5E0916' : '#8E525B'
              }} 
              onClick={() => setOpenModal(2)
              
              } ><CircleIcon /></Button>
          </Stack>
          </Box>
        </Box>
      </Fade>
    )
  });

  return (
    <div>
      <Modal
        aria-labelledby="tutorial-modal"
        aria-describedby="demonstrates-how-to-use-the-app"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <>
          {displayModal[openModal]}
        </>
      </Modal>
    </div>
  );
};