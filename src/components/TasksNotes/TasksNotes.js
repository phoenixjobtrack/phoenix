// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //

// ----- MATERIAL UI CORE ----- //
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';


// ----- MATERIAL UI ICONS ----- //
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import NotesIcon from '@material-ui/icons/Notes';

// ----- STYLES ----- //
import swal from 'sweetalert';
import './TasksNotes.css';

class TasksNotes extends Component {

    state = {
        noteIsEditable: false,
        editableNoteId: null,
    }

    // Triggers an Alert to Confirm Deletion of a Task
    removeAlert(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this note",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    { this.handleClickRemove(id) };
                    swal("Your note has been deleted", {
                        icon: "success",

                    });
                } else {
                    swal("Your note is safe!");
                }
            });
    }; // End removeAlert

    editNote = (id, note) => {
        this.setState({
            noteIsEditable: true,
            editableNoteId: id,
            note: note,
        });
    }; // end editTask

    handleChange = (event) => {
        this.setState({
            note: event.target.value
        })
    }; // end handleChange

    postNote = (id) => {
        let note = this.state.note;
        this.props.dispatch({ type: 'ADD_TASK_NOTE', payload: { note: note, id: this.state.editableNoteId } })
    }

    saveNote = () => {
        this.setState({
            noteIsEditable: false,
        })
        this.postNote();
    }; // end saveTask

    handleClickRemove(id) {
        this.props.dispatch({ type: 'REMOVE_TASK_NOTE', payload: { note: null, id: id } })
    }; // end handleClickRemove

    render() {
        if (this.props.note !== null && this.props.note !== 'null') {
            return (
                <div className="tasksNotes">
                    {this.state.noteIsEditable ?
                        <Paper key={this.props.id}>
                            <Toolbar>
                                <NotesIcon className="notesIcon" color="secondary"/>
                                <TextField
                                    className="editTasksNotesText"
                                    placeholder={this.props.note}
                                    value={this.state.note}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                />
                                <IconButton
                                    onClick={() => this.saveNote(this.props.id)}
                                    color="secondary"
                                >
                                    <CheckIcon />
                                </IconButton>
                            </Toolbar>
                        </Paper>
                        :
                        <Paper key={this.props.id}>
                            <Toolbar>
                                <ListItem>
                                    <NotesIcon className="notesIcon" color="secondary"/>
                                    <ListItemText>
                                        {this.props.complete ?
                                            <span className="taskNoteTextComplete">
                                                {this.props.note}
                                            </span> :
                                            <span className="taskNoteTextIncomplete">
                                                {this.props.note}
                                            </span>
                                        }
                                    </ListItemText>
                                    <Tooltip title="Edit Note">
                                        <IconButton
                                            onClick={() => this.editNote(this.props.id, this.props.note)}
                                            color="secondary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => this.removeAlert(this.props.id)}
                                            size="small"
                                        
                                        >
                                            <ClearIcon color="error"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Divider />

                                </ListItem>
                            </Toolbar>
                        </Paper>
                    }
                </div>
            ) // End return if
        }  // End if statement
        else {
            return (
                <div></div>
            ) // End return else
        } // End else statement
    } // End render
} // End class

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksNotes);
