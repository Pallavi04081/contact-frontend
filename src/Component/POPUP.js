import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormCom from './FormCom/Form';
import EditFormCom from './Edit';

export default function AlertDialog({open,userId,setOpen}) {
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("hello")
  };

  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update Data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx
      >
        <DialogContent>
         <EditFormCom userId={userId} open={handleClose}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{fontWeight:"bold",fontSize:"16px"}}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}