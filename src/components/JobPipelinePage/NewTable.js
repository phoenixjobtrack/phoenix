import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import {withRouter} from 'react-router-dom'

import { IconButton, Tooltip} from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import { withStyles } from '@material-ui/core'

import './NewTable.css';

const styles = theme => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }
});

class NewTable extends Component {
    openJob = (id) => {
        console.log('in openJob', id)
        this.props.history.push(`/jobOpportunity/${id}`)
    }

    handleDelete = (id) => {
        console.log('in handleDelete', id);
        this.props.dispatch({type: 'DEACTIVATE_JOB', payload: id})
    }
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <table>
                    <thead className={this.props.classes.header}>
                        <tr>
                            <th>COMPANY</th>
                            <th>POSITION</th>
                            <th>STAGE</th>
                            <th>DATE</th>
                            <th>NOTES</th>
                            <th>NEXT STAGE</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                         {this.props.reduxState.jobs.map(job => {
                            return (
                                <tr key={job.user_id}>
                                    <td >{job.company_name}</td>
                                    <td>{job.position}</td>
                                    <td>{job.currentStage}</td>
                                    <td>{job.currentStageDate && moment(job.currentStageDate).format('MM-DD-YYYY')}</td>
                                    <td>{job.currentStageNote}</td>
                                    <td>{job.nextstage}</td>
                                    <td>
                                        <Tooltip title="View more and edit">
                                            <IconButton color="primary" onClick={() => { this.openJob(job.job_id) }}>
                                                <OpenInNewIcon aria-label="view more and edit" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                    <td>
                                        <Tooltip title="Remove job">
                                            <IconButton onClick={() => { this.handleDelete(job.job_id) }}>
                                                <DeleteIcon color="error"/>
                                            </IconButton>
                                        </Tooltip>
                                    </td> 
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}







const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
};

// this allows us to use <App /> in index.js
export default withRouter(withStyles(styles)(connect(mapStateToProps)(NewTable)));
