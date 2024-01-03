import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function MapFab() {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color='nostalgia' sx={{ color: '#fff', "&:hover": { backgroundColor: "#950F23" } }} aria-label="add">
        <AddIcon onClick={handleClickOpen} />
      </Fab>
      <Dialog 
            open={open} 
            onClose={handleClose}  
            sx={{ 
                height: '750px', 
                padding: '10rem',
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "100%",
                      maxWidth: "500px",  // Set your width here
                    },
                },
            }}
                
        >
        <DialogTitle sx={{ color: '#5E0916' }}>Add a New Experience</DialogTitle>
        <DialogContent>
            <FormControl sx={{ width: '100%', alignItems: 'center' }}>
                <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="Where did you have your experience?" />
                <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="Tell people a bit about your experience" />
                <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="What time did it happen?" />
                <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="What kind of food is it?" />
                <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="Image" />   
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#5E0916'}}>Cancel</Button>
          <Button onClick={handleClose} sx={{ color: '#5E0916'}}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};