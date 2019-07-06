import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import Stages from './Stages'
import Tasks from './Tasks'
import Requirements from './Requirements'

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/icons/Link'
import { InputLabel, Typography, TextField, Box, withStyles } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import './JobOpportunity.css';

const styles = theme => ({
    jobDetails: {
        margin: '20px'
    }
    

});

class JobOpportunity extends Component {
    
    handleJobChange = propertyName => (event) => {
        console.log('jobInfo', event.target.value);
        this.props.dispatch({ type: 'UPDATE_CURRENT_JOB', payload: { key: propertyName, value: event.target.value } })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handleSubmit')
        this.props.dispatch({
            type: 'ADD_JOB',
            payload: {
                job: this.props.currentJob,
                stages: this.props.stages,
                tasks: this.props.tasks,
                requirements: this.props.requirements
            }           
        })
        this.props.history.push('/jobpipeline')
    }

    handleCloseJob = () => {
        this.props.dispatch({ type: 'CLOSE_JOB', payload: this.props.job.id})
    }

    componentDidMount = () =>{
        //fetch current job data, store in redux
        this.props.dispatch({ type: 'FETCH_CURRENT_JOB', payload: this.props.match.params.id })

        //fetch job stages for selected job and store in redux
        this.props.dispatch({ type: 'FETCH_JOB_STAGES', payload: this.props.match.params.id })

        //fetch job tasks for selected job and store in redux
        this.props.dispatch({ type: 'FETCH_JOB_TASKS', payload: this.props.match.params.id })

        //fetch requirements assessment for selected job and store in redux
        this.props.dispatch({ type: 'FETCH_JOB_REQUIREMENTS', payload: this.props.match.params.id })  
    }

    render() {
        console.log('current job', this.props.currentJob)
        return (
            <div>
                <h1>Job Opportunity</h1>
                <div className="jobOppsBut">
                    <Button variant="contained" color="primary">Offer Accepted</Button>
                    <Button variant="contained" color="primary" onClick = {this.handleCloseJob}>Close Opportunity</Button>
                </div>
                
                {/* Employment Information */}
                <div className="jobOppForm">
                    
                        <Typography variant='h5' paragraph="true" align="left">Job Info</Typography>
                        <div className="oppGrid1">
                            <Grid container>
                                <Grid container item xs={6}>
                                    <Grid container item xs={12}>
                                        <TextField
                                            style={{ 
                                                minWidth: 178,
                                                marginBottom: 10
                                             }}
                                            label="Company"
                                            value={this.props.currentJob.company_name}
                                            onChange={this.handleJobChange('company_name')}
                                        />
                                        <TextField
                                            style={{
                                                minWidth: 178,
                                                marginBottom: 10
                                            }}
                                            label="Position"
                                            value={this.props.currentJob.position}
                                            onChange={this.handleJobChange('position')}
                                        />
                                        <TextField
                                            style={{
                                                minWidth: 178,
                                                marginBottom: 10
                                            }}
                                            label="Posting Link"
                                            value={this.props.currentJob.posting_url}
                                            onChange={this.handleJobChange('posting_url')}

                                        />
                                        <TextField
                                            style={{
                                                minWidth: 178,
                                                marginBottom: 10
                                            }}
                                            label="Deadline"
                                            type="date"
                                            
                                            value={this.props.currentJob.deadline}
                                            onChange={this.handleJobChange('deadline')}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid >
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={12}>
                                        <TextField
                                            style={{                                           
                                                marginBottom: 10
                                            }}
                                            label="Salary"
                                            value={this.props.currentJob.compensation}
                                            onChange={this.handleJobChange('compensation')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                    $
                                            </InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            style={{
                                                minWidth: 178,
                                                marginBottom: 10
                                            }}
                                            label="Benefits"
                                            value={this.props.currentJob.benefits}
                                            onChange={this.handleJobChange('benefits')}
                                            multiline
                                        />
                                        <TextField
                                            style={{
                                                minWidth: 178,
                                                marginBottom: 10
                                            }}
                                            label="Travel"
                                            value={this.props.currentJob.travel}
                                            onChange={this.handleJobChange('travel')}
                                        />
                                        <TextField
                                            style={{
                                                minWidth: 178,
                                                marginBottom: 10
                                            }}
                                            label="Notes"
                                            value={this.props.currentJob.job_notes}
                                            onChange={this.handleJobChange('job_notes')}
                                            multiline
                                        />

                                    </Grid>

                                </Grid>
                            </Grid>
                        
                    </div>
                    
                </div>
                <Stages />
                <Tasks />
                <Requirements />
                <Button variant="contained" color="primary" onClick={this.handleSubmit} style={{ width: 350, marginTop: 30 }}>Save</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    require: state.requirements,
    jobEditMode: state.jobEditMode,
    job: state.jobs,
    currentJob: state.currentJob,
    stages: state.currentStage,
    tasks: state.currentTasks,
    requirements: state.currentRequirements
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(JobOpportunity)));