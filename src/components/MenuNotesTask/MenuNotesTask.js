// ----- MENU NOTES TASK ----- //
// "Add Task" Selection from Drop Menu //

// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //


// ----- MATERIAL UI CORE ----- //
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

export default function MenuNotesTask() {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function addNoteToTask(popupState) {
        console.log('in addNoteToTask');
        popupState();

    }; // End addNoteToTask

    function addContactToTask(popupState) {
        console.log('in addContactToTask');
        popupState();
    }; // End addContactToTask

    function addJobToTask(popupState) {
        console.log('in addJobToTask');
        popupState();
    }; // End addJobToTask

    return (
        <div>
            <MenuItem
                onClick={() => this.addNoteToTask(popupState.close)}

            >Add Note</MenuItem>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}