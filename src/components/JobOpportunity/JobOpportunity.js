import React, { Component } from 'react';
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

class JobOpportunity extends Component {
    state = {
        jobs: {},
        stages: {},
        tasks: {},
        job_requirements: {},
    }

    handleJobChange = propertyName => (event) => {
        console.log('jobInfo', event.target.value);
        this.setState({
            jobs: {
                ...this.state,
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
        this.props.dispatch({ type: '', payload: this.state.jobs });
        this.props.dispatch({ type: '', payload: this.state.stages });
        this.props.dispatch({ type: '', payload: this.state.tasks });
        this.props.dispatch({ type: '', payload: this.state.requirements });
        this.props.history.push('/jobpipeline')
     
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
                            <Grid item sm>
                                <p>Company:
                                    <Input
                                        placeholder="Company"
                                        onChange={this.handleJobChange('company')}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </p>
                                <p>Position:
                                    <Input
                                        placeholder="Position"
                                        onChange={this.handleJobChange('position')}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </p>
                                <p>Posting URL:
                                    <Input
                                        placeholder="Posting URL"
                                        onChange={this.handleJobChange('posting_url')}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </p>
                                <p>Deadline:
                                <TextField
                                        id="date"
                                        style={{ width: 150 }}
                                        type="date"
                                        onChange={this.handleJobChange('deadline')}
                                        // defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </p>
                            </Grid>
                            <Grid item sm >
                                <p> Salary:
                                    <Input
                                        placeholder="Salary"
                                        onChange={this.handleJobChange('salary')}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </p>
                                <p> Benefits:
                                <TextField
                                        id="outlined-multiline-flexible"
                                        label="Benefits"
                                        onChange={this.handleJobChange('benefits')}
                                        multiline
                                        rowsMax="15"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </p>
                                <p> Travel:
                                    <Input
                                        placeholder="Travel"
                                        onChange={this.handleJobChange('travel')}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </p>
                            </Grid>
                        </Grid>
                        <p>Notes:</p>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Notes"
                            onChange={this.handleJobChange('notes')}
                            multiline
                            rowsMax="15"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </div>

                {/* Stages of the Hiring Process */}

                <div className="jobOppForm">
                    <p className="jobOppsTitle">Stages of the Hiring Process</p>
                    <ul></ul>
                    <Grid container>
                        <Grid item sm={2}>
                            <RemoveIcon className="OppsRemoveIcon" noValidate style={{ paddingTop: 25, fontSize: 45 }} />
                            <span style={{ fontSize: 20 }}>

                                Stages:

                            </span>
                        </Grid>
                        <Grid item sm={3}>
                            <FormControl >
                                <InputLabel htmlFor="age-simple">Choose Your Stage</InputLabel>
                                <Select
                                    style={{ width: 200 }}
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
                                style={{ width: 350, paddingTop: 16 }}
                                onChange={this.handleStageChange('notes')}
                                placeholder="Notes"
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <p><AddIcon />Add Stage</p>
                </div>

                {/* Tasks */}

                <div className="jobOppForm">
                    <p className="jobOppsTitle">Tasks</p>
                    <span>Tasks:</span>
                    <Input
                        placeholder="Task Details"
                        onChange={this.handleTaskChange('task_name')}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                    <TextField
                        id="date"
                        type="date"
                        onChange={this.handleTaskChange('due_date')}
                        // defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <p><AddIcon />Add Tasks</p>
                </div>

                {/* Employment Requirements */}

                <div className="jobOppForm">
                    <p className="jobOppsTitle">Employment Requirements</p>
                    <button>Update Personal Requirements</button>
                    <br />
                    <span>Requirement: 180K salary: </span>
                    <Input
                        placeholder="Offer Details"
                        onChange={this.handleRequireChange('job_requirement')}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Requirements Match</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={this.handleRequireChange('requirement_met')} value="true" />}
                                label="True"
                            />
 
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={this.handleRequireChange('requirement_met')} value="false" />
                                }
                                label="false"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
                <Button variant="contained" color="primary" style={{ width: 350, marginTop: 30 }}>Add Job Opportunity</Button>
            </div>
        )
    }
}

export default JobOpportunity;