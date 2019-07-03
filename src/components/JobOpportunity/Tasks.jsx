import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './JobOpportunity.css';

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

class Tasks extends Component {
    taskCounter = Object.entries(this.props.reduxState.currentTasks).length - 1
    taskCounter = 0
    state = {
        tasks: [{}],
    }

    addTasksInput() {
        this.taskCounter = this.taskCounter+1
        console.log('taskCounter', this.taskCounter)
        this.setState({ tasks: [...this.state.tasks, ''] })
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

    componentDidMount(){
        
    }

    render(){
        return(
            <div className="jobOppForm">
                <p className="jobOppsTitle">Tasks</p>
                {this.state.tasks.map((stage, index) => {
                    return (
                        <div>
                            <Grid container>
                                <Grid item sm={2}>
                                    <button className="oppsSubBut">
                                        <RemoveIcon className="OppsRemoveIcon" noValidate style={{ paddingTop: 15, fontSize: 30 }} />
                                    </button>
                                    <span style={{ fontSize: 20 }}>
                                        Tasks:
                                    </span>
                                    
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
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState,
    

});

export default connect(mapStateToProps)(Tasks)

