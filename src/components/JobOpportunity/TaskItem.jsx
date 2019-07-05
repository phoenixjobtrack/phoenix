import React, { Component } from 'react'
import { connect } from 'react-redux';


import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';


class TaskItem extends Component {
    state = {
        task: {
            jobId: this.props.reduxState.jobStages.length,
            task_name: this.props.task.task_name,
            note: this.props.task.note,
            due_date: this.props.task.due_date
        },
    }
    handleRemove = () => {
        console.log('handleRemove task', this.props.i)
        this.props.dispatch({
            type: 'REMOVE_TASK_FROM_REDUX',
            payload: this.props.i
        })
        this.props.handleForceUpdate()
    }

    handleTaskChange = propertyName => (event) => {
        console.log('taskInfo', event.target.value);
        this.props.dispatch({
            type: 'UPDATE_REDUX_TASKS',
            payload: {
                key: this.props.i,
                prop: propertyName,
                value: event.target.value
            }
        })
    }
    render() {
        return(
            <Grid container>
                <Grid item xs={1}>
                    <IconButton className="oppsSubBut" onClick={this.handleRemove}>
                        <RemoveIcon />
                    </IconButton>
                    {/* <span style={{ fontSize: 20 }}>
                        Tasks:
                    </span> */}

                </Grid>
                <Grid item xs={4}>
                    <InputLabel>Task</InputLabel>
                    <Input
                        // style={{ width: 415, paddingTop: 16 }}
                        placeholder="Task Details"
                        value={this.props.reduxState.currentTasks[this.props.i].task_name}
                        onChange={this.handleTaskChange('task_name')}
                        inputProps={{
                            'aria-label': 'Task Name',
                        }}
                    />
                </Grid>
                <Grid item xs={3} >
                    <InputLabel>Due Date</InputLabel>
                    <TextField
                        id="date"
                        type="date"
                        // style={{ paddingTop: 16 }}
                        value={this.props.reduxState.currentTasks[this.props.i].due_date}
                        onChange={this.handleTaskChange('due_date')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputLabel>Notes</InputLabel>
                    <Input
                        placeholder="Task Note"
                        value={this.props.reduxState.currentTasks[this.props.i].note}
                        onChange={this.handleTaskChange('note')}
                        inputProps={{
                            'aria-label': 'Task Note',
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(TaskItem)
