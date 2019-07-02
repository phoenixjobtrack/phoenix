// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //


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
import BubbleChartIcon from '@material-ui/icons/BubbleChart';


// ----- STYLES ----- //
import swal from 'sweetalert';

class TaskNoteJob extends Component {

    render() {
        console.log('TaskNoteJob');
        if (this.props.job_id !== null) {
            return (
                <div className="taskNoteContact">
                    <Tooltip title="Job Opportunity">
                    <Chip
                        avatar={
                            <Avatar>
                                <BubbleChartIcon />
                            </Avatar>
                        }
                        label={this.props.job_id}
                        variant="outlined"
                    />
                    </Tooltip>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }

    }
}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TaskNoteJob);