import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please describe your task below and add your due date.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Details"
            type="text"
            fullWidth
          />
            <TextField
            id="date"
            label="Due Date"
            type="date"
            InputLabelProps={{
            shrink: true,
            }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            ADD TASK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}