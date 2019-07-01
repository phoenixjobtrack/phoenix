// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //


// ----- MATERIAL UI CORE ----- //
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';


// ----- MATERIAL UI ICONS ----- //
import NotesIcon from '@material-ui/icons/Notes';

// ----- STYLES ----- //
import './TasksNotes.css'

class TasksNotes extends Component {
    render() {
        if (this.props.note !== null) {
            return (
                <div className="tasksNotes">
                    <Paper key={this.props.id}>
                        <ListItem>
                            <NotesIcon className="notesIcon" />
                            <ListItemText>
                                {this.props.note}
                            </ListItemText>
                            <Divider />
                        </ListItem>
                    </Paper>
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
