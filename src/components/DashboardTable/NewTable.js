import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import {withRouter} from 'react-router-dom'

import {Button, IconButton, Tooltip} from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import DeleteIcon from '@material-ui/icons/DeleteOutline'


import './DashboardTable';

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
                    <thead>
                        <tr>
                            <th>COMPANY</th>
                            <th>POSITION</th>
                            <th>STAGE</th>
                            <th>NEXT ACTIVITY DATE</th>
                            <th>NOTES</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                         {this.props.reduxState.jobs.map(job => {
                                return (
                                    //  <p>{event.id}</p>
                                    <tr key={job.id}>
                                        <td >{job.company_name}</td>
                                        <td>{job.position}</td>
                                        <td>{job.currentStage}</td>
                                        <td>{job.nextStageDate && moment(job.nextStageDate).format('MM-DD-YYYY')}</td>
                                        <td>{job.notes}</td>
                                         
                                            
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
