import React, { Component } from 'react';
import './JobOpportunity.css';

import TaskItem from './TaskItem'

import { connect } from 'react-redux';
import {IconButton} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

class Tasks extends Component {
    taskCounter = Object.entries(this.props.reduxState.currentTasks).length - 1
    taskCounter = 0
    state = {
        tasks: [{}],
    }

    addTaskInput() {
        this.taskCounter = this.taskCounter+1
        console.log('taskCounter', this.taskCounter)
        // this.setState({ tasks: [...this.state.tasks, ''] })
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
                <p className="jobOppsTitle">Tasks</p>
                {Object.entries(this.props.reduxState.currentTasks).map((task, index) => {
                    return (
                        <ul>
                            <TaskItem task={task} i={task[0]} handleForceUpdate={this.handleForceUpdate}/>
                        </ul>
                    )
                })}
                <IconButton onClick={()=>{this.addTaskInput()}}>
                    <AddIcon />
                </IconButton>
                <p>Add Task</p>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState,
    

});

export default connect(mapStateToProps)(Tasks)

