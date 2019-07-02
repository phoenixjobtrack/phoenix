import React, { Component } from 'react';

import Stages from './Stages'

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import './JobOpportunity.css';
//import JobInfo from './JobInfo';


class JobOpportunity extends Component {
    state = {
        job: {
            // company : '',
            // position : '',
            // posting_url : '',
            // deadline : '',
            // salary : '',
            // benefits : '',
            // travel : '',
            // notes : '',
        },
        stages: [{}],
        tasks: [{}],
        job_requirements: {},
    }

    addStageInput() {
        this.setState({ stages: [...this.state.stages, ''] })
    }

    addTasksInput() {
        this.setState({ tasks: [...this.state.tasks, ''] })
    }

    handleJobChange = propertyName => (event) => {
        console.log('jobInfo', event.target.value);
        this.setState({
            ...this.state,
             job: {
               ...this.state.job,
                [propertyName]: event.target.value
            }
        });
    }

    handleStageChange = propertyName => (event) => {
        console.log('stageInfo', event.target.value);
        this.setState({
            stages: {
                ...this.state,
                [propertyName]: event.target.value
            }
        });
    }

    handleTaskChange = propertyName => (event) => {
        console.log('taskInfo', event.target.value);
        this.setState({
            tasks: {
                ...this.state,
                [propertyName]: event.target.value
            }
        });
    }

    handleRequireChange = propertyName => (event) => {
        console.log('requireInfo', event.target.value);
        this.setState({
            job_requirements: {
                ...this.state,
                [propertyName]: event.target.value
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('jobOpps', this.state);
        this.props.dispatch({ type: 'SAVE_STAGES', payload: this.props.reduxState.currentStage });
        this.props.dispatch({ type: 'ADD_JOB', payload: this.state.job });
        this.props.dispatch({ type: 'ADD_TASK', payload: this.state.tasks });
        this.props.dispatch({ type: 'ADD_JOB_REQUIREMENTS', payload: this.state.job_requirements });
        this.props.history.push('/jobpipeline')
     
    }

    componentDidMount = () =>{
        this.props.dispatch({ type: 'FETCH_JOBS' })

    }
    render() {
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
                                        //value={this.state.jobs.company}
                                        onChange={this.handleJobChange('company_name')}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                            <Input
                                        placeholder="Position"
                                        //value={this.state.jobs.position}
                                        onChange={this.handleJobChange('position')}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                            <Input
                                        placeholder="Posting URL"
                                        //value={this.state.jobs.posting_url}
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
                                        //value={this.state.jobs.deadline}
                                        onChange={this.handleJobChange('deadline')}
                                        // defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                            </Grid>
                            <Grid item sm={3}>
                                <p> Salary:
                       
                                </p>
                                <p> Benefits:
                      
                                </p>
                                <br />
                                <p> Travel:
                    
                                </p>
                            </Grid>
                            <Grid item sm={3}>
                            <Input
                                        placeholder="Salary"
                                        //value={this.state.jobs.salary}
                                        onChange={this.handleJobChange('salary')}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                            <TextField
                                        id="outlined-multiline-flexible"
                                        label="Benefits"
                                        // value={this.state.jobs.benefits}
                                        onChange={this.handleJobChange('benefits')}
                                        multiline
                                        rowsMax="15"
                                        margin="normal"
                                        variant="outlined"
                                    />
                            <Input
                                        placeholder="Travel"
                                        // value={this.state.jobs.travel}
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
                            // value={this.state.jobs.notes}
                            onChange={this.handleJobChange('notes')}
                            multiline
                            rowsMax="15"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </div> 

                {/* Stages of the Hiring Process */}
                <Stages/>                           
                {/* <div className="jobOppForm">
                    <p className="jobOppsTitle">Stages of the Hiring Process</p>
                   
                    {this.state.stages.map((stage, index) => {
                                return (
                                    <div>
                                         <Grid container>
                                    <Grid item sm={2}>
                                    <button className="oppsSubBut">
                                        <RemoveIcon className="OppsRemoveIcon" noValidate style={{ paddingTop: 15, fontSize: 30 }} />
                                        <span style={{ fontSize: 20 }}>
            
                                            Stages:
            
                                        </span>
                                        </button>
                                    </Grid>
                                    <Grid item sm={3}>
                                        <FormControl >
                                            <InputLabel htmlFor="age-simple">Choose Your Stage</InputLabel>
                                            <Select
                                                style={{ width: 235 }}
                                                onChange={this.handleStageChange('stage')}
                                                inputProps={{
                                                    name: 'age',
                                                    id: 'age-simple',
                                                }}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <form noValidate style={{ paddingTop: 16 }}>
                                            <TextField
                                                id="date"
                                                style={{ width: 150 }}
                                                onChange={this.handleStageChange('date')}
                                                type="date"
                                                // defaultValue="2017-05-24"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </form>
                                    </Grid>
                                    <Grid item sm={5}>
                                        <Input
                                            style={{ width: 300, paddingTop: 16 }}
                                            onChange={this.handleStageChange('notes')}
                                            placeholder="Notes"
                                            inputProps={{
                                                'aria-label': 'Description',
                                            }}
                                        />
                                        </Grid>
                                        </Grid>

                                        </div>

                                )
                            })}
                    <p><AddIcon onClick={(event) => this.addStageInput(event)} />Add Stage</p>
                    <div className="oppStageView">
                        <p>Current Stage:</p>
                        <p>Next Stage:</p>
                    </div>
                </div> */}

                {/* Tasks */}

                <div className="jobOppForm">
                    <p className="jobOppsTitle">Tasks</p>
                    {this.state.tasks.map((stage, index) => {
                                return (
                                    <div>
                    <Grid container>
                    <Grid item sm={2}>
                                    <button className="oppsSubBut">
                                        <RemoveIcon className="OppsRemoveIcon" noValidate style={{ paddingTop: 15, fontSize: 30 }} />
                                        <span style={{ fontSize: 20 }}>
            
                                            Tasks:
            
                                        </span>
                                        </button>
                                    </Grid>
                                    <Grid item sm={5}>
                    <Input
                    style={{ width: 415, paddingTop: 16 }}
                        placeholder="Task Details"
                        onChange={this.handleTaskChange('task_name')}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                    </Grid>
                    <Grid item sm={5} >
                    <TextField
                        id="date"
                        type="date"
                        style={{ paddingTop: 16 }}
                        onChange={this.handleTaskChange('due_date')}
                        // defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    </Grid>
                    </Grid>
                    </div>
                              )
                            })}
                    <p><AddIcon onClick={(event) => this.addTasksInput(event)} />Add Tasks</p>
                </div>

                {/* Employment Requirements */}

                <div className="jobOppForm">
                    <p className="jobOppsTitle">Employment Requirements</p>
                    <Grid container>
                    <Grid item sm={8}>
                    </Grid>
                    <Grid item sm={4}>
                    <button>Update Personal Requirements</button>
                    </Grid>
                    </Grid>
                    {this.props.require.map((user, i) => {
                            return (
                         
                                <div className="oppGrid4">
                                <Grid container>
                                <Grid item sm={4}>
                                <span> Requirement: {user.requirement} </span>
                                </Grid>
                                <Grid item sm={5}>
                                <Input
                                    style={{ width: 350 }}
                                    placeholder="Offer Details"
                                    onChange={this.handleRequireChange('job_requirement')}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                />
                                </Grid>
                                <Grid item sm={3}>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">Meets Requirement?</FormLabel>
                                    <FormGroup >
                                        <FormControlLabel
                                        
                                            control={
                                                <Checkbox onChange={this.handleRequireChange('requirement_met')} value="true" />}
                                            label="True"
                                        />
             
                                        <FormControlLabel
                                            control={
                                                <Checkbox onChange={this.handleRequireChange('requirement_met')} value="false" />
                                            }
                                            label="False"
                                        />
                                    </FormGroup>
                                </FormControl>
                                </Grid>
                                </Grid>
                                </div>                      

                        
                            )
                        })}
                    
                </div>
                <Button variant="contained" color="primary" onClick = {this.handleSubmit} style={{ width: 350, marginTop: 30 }}>Add Job Opportunity</Button>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    require: state.requirements
});
export default connect(mapStateToProps)(JobOpportunity);