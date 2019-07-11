import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

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
import { Typography, TextField, Box, withStyles, List, ListItem, ListItemIcon } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import './JobOpportunity.css';

const styles = theme => ({
    jobDetails: {
        margin: '20px'
    }
});

class JobOpportunity extends Component {
    handleJobChange = propertyName => (event) => {
        this.props.dispatch({ type: 'UPDATE_CURRENT_JOB', payload: { key: propertyName, value: event.target.value } })
    }

    handleSubmit = (event) => {
        event.preventDefault();
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
        this.props.dispatch({ type: 'CLOSE_JOB', payload: this.props.job.job_id })
    }
    componentWillUnmount() {
        this.props.dispatch({ type: 'CLEAR_CURRENT_JOB' })
    }
    componentDidMount = () => {
        console.log('in JobOpp componentDidMount')
        //make sure redux is cleared (fixes bug when navigating from edit to create job)
        this.props.dispatch({ type: 'CLEAR_CURRENT_JOB' })
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
        return (
            <div>

                <h2>
                    Job Opportunity
                </h2>

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
                                            <Box onClick={() => this.demoSalary()}>
                                                <ListItemIcon>
                                                    <MoneyIcon
                                                        color="primary"
                                                    />
                                                </ListItemIcon>
                                            </Box>
                                            <TextField
                                                style={{
                                                    marginBottom: 10
                                                }}
                                                label="Salary"
                                                onChange={this.handleJobChange('compensation')}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">
                                                        $
                                            </InputAdornment>,
                                                }}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Box onClick={() => this.demoBenefits()}>
                                                <ListItemIcon>
                                                    <StarIcon
                                                        color="primary"
                                                    />
                                                </ListItemIcon>
                                            </Box>
                                            <TextField
                                                style={{
                                                    minWidth: 178,
                                                    marginBottom: 10
                                                }}
                                                label="Benefits"
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
    currentJob: state.currentJob,
    stages: state.currentStage,
    tasks: state.currentTasks,
    requirements: state.currentRequirements,
    job: state.jobs
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(JobOpportunity)));