import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import Stages from './Stages'
import Tasks from './Tasks'
import Requirements from './Requirements'

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link'
import WorkIcon from '@material-ui/icons/Work'
import CalendarIcon from '@material-ui/icons/DateRange'
import FlightIcon from '@material-ui/icons/Flight'
import NotesIcon from '@material-ui/icons/Notes'
import PersonIcon from '@material-ui/icons/Person'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import StarIcon from '@material-ui/icons/StarBorder'
import { InputLabel, Typography, TextField, Box, withStyles, Icon, List, ListItem, ListItemIcon } from '@material-ui/core'
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
        this.props.dispatch({ type: 'CLOSE_JOB', payload: this.props.job.id })
    }

    componentDidMount = () => {
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
                <div>
                    <Grid container spacing={3}>
                        <Grid item sm={5}>
                        </Grid>
                        <Grid item sm={3}>
                            <Button variant="contained" color="primary" style={{width: '100%'}}>Offer Accepted</Button>
                        </Grid>
                        <Grid item sm={3}>
                            <Button variant="contained" color="primary" style={{width: '100%'}} onClick={this.handleCloseJob}>Close Opportunity</Button>
                        </Grid>
                        <Grid item sm={1}>
                        </Grid>
                    </Grid>

                </div>

                {/* Employment Information */}
                <div className="jobOppForm">
                    <Typography variant='h5' paragraph="true" align="left">Job Info</Typography>
                    <div className="oppGrid1">
                        <Grid container>
                            <Grid container item xs={6}>
                                <Grid container item xs={12}>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>

                                                <WorkIcon color="primary" />

                                            </ListItemIcon>
                                            <TextField
                                                style={{
                                                    minWidth: 178,
                                                    marginBottom: 10
                                                }}
                                                label="Company"
                                                value={this.props.currentJob.company_name}
                                                onChange={this.handleJobChange('company_name')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PersonIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                style={{
                                                    minWidth: 178,
                                                    marginBottom: 10
                                                }}
                                                label="Position"
                                                value={this.props.currentJob.position}
                                                onChange={this.handleJobChange('position')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <LinkIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                style={{
                                                    minWidth: 178,
                                                    marginBottom: 10
                                                }}
                                                label="Posting Link"
                                                value={this.props.currentJob.posting_url}
                                                onChange={this.handleJobChange('posting_url')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>

                                                <CalendarIcon color="primary" />

                                            </ListItemIcon>
                                            <TextField
                                                style={{
                                                    minWidth: 178,
                                                    marginBottom: 10
                                                }}
                                                label="Deadline"
                                                type="date"
                                                value={moment(this.props.currentJob.deadline).format("YYYY-MM-DD")}
                                                onChange={this.handleJobChange('deadline')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid >
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <MoneyIcon color="primary" />
                                            </ListItemIcon>
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
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <StarIcon color="primary" />
                                            </ListItemIcon>
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
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <FlightIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                style={{
                                                    minWidth: 178,
                                                    marginBottom: 10
                                                }}
                                                label="Travel"
                                                value={this.props.currentJob.travel}
                                                onChange={this.handleJobChange('travel')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <NotesIcon color="primary" />
                                            </ListItemIcon>
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
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Stages />
                <Tasks />
                <Requirements />

                <Grid container spacing={3}>
                        <Grid item sm={4}>
                        </Grid>
                        <Grid item sm={4}>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit} style={{ width: 350, marginTop: 30 }}>Save This Job Opportunity</Button>
                        </Grid>
                        <Grid item sm={4}>
                        </Grid>
                    </Grid>
                

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    require: state.requirements,
    job: state.jobs,
    currentJob: state.currentJob,
    stages: state.currentStage,
    tasks: state.currentTasks,
    requirements: state.currentRequirements

});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(JobOpportunity)));