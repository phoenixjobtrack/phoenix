import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import Stages from './Stages'
import Tasks from './Tasks'
import Requirements from './Requirements'

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';



class JobOpportunity extends Component {

    handleJobChange = propertyName => (event) => {
        console.log('jobInfo', event.target.value);
        this.props.dispatch({ type: 'UPDATE_CURRENT_JOB', payload: { key: propertyName, value: event.target.value } })
    }

    handleSave = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'SAVE_JOB_UPDATES', 
            payload: {
                job: this.props.currentJob,
                stages: this.props.stages,
                tasks: this.props.tasks,
                requirements: this.props.requirements
            }})
    }

    componentDidMount = () =>{
        // this.props.dispatch({ type: 'FETCH_JOBS' })

        //fetch current job data, store in redux
        this.props.dispatch({ type: 'FETCH_CURRENT_JOB', payload: this.props.match.params.id })
        
        //fetch job stages for selected job and store in redux
        this.props.dispatch({type: 'FETCH_JOB_STAGES', payload: this.props.match.params.id}) 

        //fetch job tasks for selected job and store in redux
        this.props.dispatch({type: 'FETCH_JOB_TASKS', payload: this.props.match.params.id})

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
                    <Button variant="contained" color="primary">Close Opportunity</Button>
                </div>

                 {/* Employment Information */}
                <div className="jobOppForm">
                    <p className="jobOppsTitle">Employment Information</p>
                    <div className="oppGrid1">
                        <Grid container>
                            <Grid item sm={3}>
                                <p>Company: </p>
                                <p>Position: </p>
                                <p>Posting URL: </p>
                                <p>Deadline: </p>
                            </Grid>
                            <Grid item sm={3} >
                            <Input
                                placeholder="Company"
                                value={this.props.currentJob.company_name}
                                onChange={this.handleJobChange('company_name')}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                            <Input
                                placeholder="Position"
                                value={this.props.currentJob.position}
                                onChange={this.handleJobChange('position')}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                            <Input
                                placeholder="Posting URL"
                                value={this.props.currentJob.posting_url}
                                onChange={this.handleJobChange('posting_url')}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                            <br />
                            <TextField
                                id="date"
                                style={{ width: 150 }}
                                type="date"
                                value={this.props.currentJob.deadline}
                                onChange={this.handleJobChange('deadline')}
                                // defaultValue="2017-05-24"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </Grid>
                            <Grid item sm={3}>
                                <p> Salary:</p>
                                <p> Benefits:</p>
                                <br />
                                <p> Travel:</p>
                            </Grid>
                            <Grid item sm={3}>
                            <Input
                                placeholder="Salary"
                                value={this.props.currentJob.compensation}
                                onChange={this.handleJobChange('compensation')}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Benefits"
                                value={this.props.currentJob.benefits}
                                onChange={this.handleJobChange('benefits')}
                                multiline
                                rowsMax="15"
                                margin="normal"
                                variant="outlined"
                            />
                            <Input
                                placeholder="Travel"
                                value={this.props.currentJob.travel}
                                onChange={this.handleJobChange('travel')}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                            </Grid>
                        </Grid>
                        <p>Notes:</p>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Notes"
                            value={this.props.currentJob.job_notes}
                            onChange={this.handleJobChange('job_notes')}
                            multiline
                            rowsMax="15"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </div> 
                <Stages/>
                <Tasks/>                          
                <Requirements/>
                <Button variant="contained" color="primary" onClick = {this.handleSave} style={{ width: 350, marginTop: 30 }}>Save</Button>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    currentJob: state.currentJob,
    stages: state.currentStage,
    tasks: state.currentTasks,
    requirements: state.currentRequirements

});
export default withRouter(connect(mapStateToProps)(JobOpportunity));