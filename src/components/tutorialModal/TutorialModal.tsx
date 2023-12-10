import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';

import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'; 
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  height: '60%',
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
    text: 'Modal One',
    icon: <FastfoodOutlinedIcon sx={{ fontSize: '10rem' }} />
  },
  { 
    id: 1,
    text: 'Modal Two',
    icon: <CameraAltOutlinedIcon sx={{ fontSize: '10rem' }} />
  },
  { 
    id: 2,
    text: 'Modal Three',
    icon: <DvrOutlinedIcon sx={{ fontSize: '10rem' }} />
  },
];

export default function TransitionsModal() {
  const [open, setOpen] = useState(true);
  const [modal, setModal] = useState(0);
  const handleClose = () => setOpen(false);

  const displayModal = modals.map((modal) => {
    return (
      <Fade in={open}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
          {modal.icon}
          <Typography id="transition-modal-title" variant="h2" sx={{ fontFamily: 'San Sarif', color: '#5E0916' }}>
            {modal.id + 1}
          </Typography>
          <Typography id="transition-modal-description">
            {modal.text}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ height: '15%', justifyContent: 'center', marginTop: '1rem' }}>
            <Button size='small' href='' sx={{ color: '#5E0916' }} onClick={() => setModal(0)}><CircleIcon /></Button>
            <Button size='small' href='' sx={{ color: '#5E0916' }} onClick={() => setModal(1)}><CircleIcon /></Button>
            <Button size='small' href='' sx={{ color: '#5E0916' }} onClick={() => setModal(2)}><CircleIcon /></Button>
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
          {displayModal[modal]}
        </>
      </Modal>
    </div>
  );
};