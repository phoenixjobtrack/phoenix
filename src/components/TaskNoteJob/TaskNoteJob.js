// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //


// ----- MATERIAL UI CORE ----- //
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';


// ----- MATERIAL UI ICONS ----- //
import FaceIcon from '@material-ui/icons/Face';


// ----- STYLES ----- //
import swal from 'sweetalert';

class TaskNoteContact extends Component {

    render() {
        console.log('TaskNoteContact', this.props.reduxState.contacts);

        let jobChip;

        if (this.props.job_id !== null) {
            this.props.reduxState.jobs.map((job, i) => {
                if (job.id == this.props.contact_id) {
                    console.log('It is a match', this.props.contact_id, job.id);
                    jobChip =
                        <div className="taskNoteJob">
                            <Tooltip title="Job">
                                <Chip
                                    avatar={
                                        <Avatar>
                                            <FaceIcon />
                                        </Avatar>
                                    }
                                label={job.first_name}
                                    variant="outlined"
                                />
                            </Tooltip>
                        </div>
                }
            })

        }
        return (
            <div>{jobChip}</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TaskNoteContact);