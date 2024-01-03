import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function AddEventsDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
    <AddIcon 
        onClick={handleClickOpen} 
        sx={{ 
            marginLeft: '0.5rem', 
            color: '#5E0916', 
            cursor: 'pointer' 
        }} 
    />
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
          <DialogTitle sx={{ color: '#5E0916' }}>Add a New Event</DialogTitle>
          <DialogContent>
              <FormControl sx={{ width: '100%', alignItems: 'center' }}>
                  <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="Event Title" />
                  <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="Event Date" />
                  <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="Event Time" />
                  <TextField sx={{ marginTop: '0.5rem', width: '80%' }} label="Event Address" />
                  <TextField 
                      sx={{ marginTop: '0.5rem', width: '80%',
                  
                      '&$cssFocused $notchedOutline': {
                          borderColor: `red !important`,
                        }
                      }} 
                      label="Event Description" 
                      multiline rows={4} 
                  />            
              </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#5E0916'}}>Cancel</Button>
            <Button onClick={handleClose} sx={{ color: '#5E0916'}}>Add</Button>
          </DialogActions>
        </Dialog>
    </React.Fragment>
  );
};