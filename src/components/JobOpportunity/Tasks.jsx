import React, { Component } from 'react';
// import './JobOpportunity.css';

import TaskItem from './TaskItem'
import { connect } from 'react-redux';
import { IconButton, List, Typography, Tooltip, ListItemIcon, ListItem} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

class Tasks extends Component {
    taskCounter = Object.entries(this.props.reduxState.currentTasks).length - 1
    taskCounter = 0

    addTaskInput() {
        this.taskCounter = this.taskCounter+1
        this.props.dispatch({
            type: 'ADD_TO_REDUX_TASKS',
            payload: {
                key: this.taskCounter,
                task: {
                    task_name: '',
                    due_date: '',
                    note: ''
                }
            }
        })
    }

    handleForceUpdate = () => {
        this.forceUpdate()
    }

    render(){
        return(
            <div className="jobOppForm">
                <Typography variant='h5' paragraph="true" align="left">Tasks</Typography>
                <List>
                {Object.entries(this.props.reduxState.currentTasks).map((task, index) => {
                    return (   
                        <TaskItem task={task} i={task[0]} handleForceUpdate={this.handleForceUpdate}/>
                    )
                })}
                <ListItem>
                        <ListItemIcon>
                            <Tooltip className="addTip" title="Add Task">
                                <IconButton color="primary" aria-label="Add Task" onClick={() => { this.addTaskInput() }}>
                                    <AddIcon  />
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>
                </ListItem>
                
                </List>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState,
    

});

export default connect(mapStateToProps)(Tasks)

