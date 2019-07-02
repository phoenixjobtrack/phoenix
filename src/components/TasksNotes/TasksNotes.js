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
import Tooltip from '@material-ui/core/Tooltip';


// ----- MATERIAL UI ICONS ----- //
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import NotesIcon from '@material-ui/icons/Notes';

// ----- STYLES ----- //
import './TasksNotes.css'

class TasksNotes extends Component {

    state = {
        noteIsEditable: false,
        editableNoteId: null,
    }

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

    render() {
        if (this.props.note !== null) {
            return (
                <div className="tasksNotes">
                    {this.state.noteIsEditable ?
                        <Paper key={this.props.id}>
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
                        </Paper>
                        :
                        <Paper key={this.props.id}>
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
                                <Divider />
                            </ListItem>
                        </Paper>

                    }
                </div>
            ) // End return if
        }
        else {
            return (
                <div></div>
            ) // End return else
        }
    } // End render
} // End class

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksNotes);
