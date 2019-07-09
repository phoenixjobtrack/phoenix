import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import {withRouter} from 'react-router-dom'

import {Button, IconButton, Tooltip} from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import DeleteIcon from '@material-ui/icons/DeleteOutline'


import './NewTable.css';

class NewTable extends Component {
    openJob = (id) => {
        console.log('in openJob', id)
        this.props.history.push(`/jobOpportunity/${id}`)
    }

    handleDelete = (id) => {
        console.log('in handleDelete', id);
        
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr className="header">
                            <th>COMPANY</th>
                            <th>POSITION</th>
                            <th>STAGE</th>
                            <th>NEXT ACTIVITY DATE</th>
                            <th>NOTES</th>
                            <th>NEXT STAGE</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                         {this.props.reduxState.jobs.map(job => {
                                return (
                                    //  <p>{event.id}</p>
                                    <tr key={job.id}>
                                        <td >{job.company_name}</td>
                                        <td>{job.position}</td>
                                        <td>{job.currentStage}</td>
                                        <td>{job.nextStageDate && moment(job.nextStageDate).format('MM-DD-YYYY')}</td>
                                        <td>{job.nextStageNote}</td>
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
                                            {/* <Button variant="contained" color="secondary">Delete</Button></td> */}
                                        {/* <td><button className="update-button" value={event.id} onClick={() => this.updateEvent(event.id)}>Update</button></td>
                                        <td><button className="delete-button" value={event.id} onClick={() => this.deleteEvent(event.id)}>Delete</button></td> */}
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
export default withRouter(connect(mapStateToProps)(NewTable));
