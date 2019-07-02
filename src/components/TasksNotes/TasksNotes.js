// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
// import TaskNoteContact from '../TaskNoteContact/taskNoteContact';
import TaskNoteContact from '../TaskNoteContact/TaskNoteContact';

// ----- MATERIAL UI CORE ----- //
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
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
import FaceIcon from '@material-ui/icons/Face';
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
        console.log('Remove Alert', id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    { this.handleClickRemove(id) };
                    swal("Your task has been deleted", {
                        icon: "success",

                    });
                } else {
                    swal("Your task is safe!");
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
        console.log('postNote:', this.state.note)
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
        console.log('Remove Clicked', id);
        this.props.dispatch({ type: 'REMOVE_TASK_NOTE', payload: { note: null, id: id } })
    }; // end handleClickRemove

    render() {
        if (this.props.note !== null && this.props.note !== 'null') {
            return (
                <div className="tasksNotes">
                    {this.state.noteIsEditable ?
                        <Paper key={this.props.id}>
                            <Toolbar>
                                <NotesIcon className="notesIcon" />
                                <TextField
                                    className="editTasksNotesText"
                                    placeholder={this.props.note}
                                    value={this.state.note}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                />
                                <IconButton
                                    onClick={() => this.saveNote(this.props.id)}
                                >
                                    <CheckIcon />
                                </IconButton>
                            </Toolbar>
                        </Paper>
                        :
                        <Paper key={this.props.id}>
                            <Toolbar>
                                <ListItem>
                                    <NotesIcon className="notesIcon" />
                                    <ListItemText>
                                        {this.props.note}
                                    </ListItemText>
                                    <Tooltip title="Edit Note">
                                        <IconButton
                                            onClick={() => this.editNote(this.props.id, this.props.note)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>                               
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => this.removeAlert(this.props.id)}
                                            size="small"
                                        >
                                            <ClearIcon />
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
