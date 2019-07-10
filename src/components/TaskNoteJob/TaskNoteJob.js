// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI CORE ----- //
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';


// ----- MATERIAL UI ICONS ----- //
import WorkIcon from '@material-ui/icons/Work';


// ----- STYLES ----- //
import swal from 'sweetalert';

class TaskNoteContact extends Component {

    render() {
        let jobChip;

        if (this.props.job_id !== null) {
            this.props.reduxState.jobs.map((job, i) => {
                if (job.id == this.props.job_id) {
                    jobChip =
                        <div className="taskNoteJob">
                            <Tooltip title="Job">
                                <Chip
                                    color="secondary"
                                    avatar={
                                        <Avatar>
                                            <WorkIcon />
                                        </Avatar>
                                    }
                                label={job.company_name}
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