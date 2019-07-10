import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment'

//Material UI
import { List, ListItem, ListItemIcon, Tooltip } from '@material-ui/core'
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
        this.props.dispatch({
            type: 'REMOVE_TASK_FROM_REDUX',
            payload: this.props.i
        })
        this.props.handleForceUpdate()
    }

    handleTaskChange = propertyName => (event) => {
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
            <ListItem>
                <ListItemIcon>
                    <Tooltip title="Remove Task">
                        <IconButton className="oppsSubBut" onClick={this.handleRemove} color="secondary">
                            <RemoveIcon
                                color="secondary" />
                        </IconButton>
                    </Tooltip>
                </ListItemIcon> 
                <List>
                    <ListItem>
                        <InputLabel>Task</InputLabel>
                    </ListItem>
                    <ListItem>
                        <TextField
                            style={{ minWidth: 230 }}
                            value={this.props.reduxState.currentTasks[this.props.i].task_name}
                            onChange={this.handleTaskChange('task_name')}
                            inputProps={{
                                'aria-label': 'Task Name',
                            }}
                        />
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <InputLabel>Due Date</InputLabel>
                    </ListItem>
                    <ListItem style={{ width: 175 }}>
                        <TextField
                            style={{ width: '100%' }}
                            id="date"
                            type="date"
                            value={moment(this.props.reduxState.currentTasks[this.props.i].due_date).format('YYYY-MM-DD')}
                            onChange={this.handleTaskChange('due_date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </ListItem>
                </List>
                <List style={{ width: 300 }}>
                    <ListItem>
                        <InputLabel>Notes</InputLabel>
                    </ListItem>
                    <ListItem>
                        <TextField
                            style={{ width: '100%' }}
                            value={this.props.reduxState.currentTasks[this.props.i].note}
                            onChange={this.handleTaskChange('note')}
                            inputProps={{
                                'aria-label': 'Task Note',
                            }}
                        />
                    </ListItem>
                </List>
            </ListItem>
        
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(TaskItem)
