// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import TasksLineItemsContent from '../TasksLineItemsContent/TasksLineItemsContent';

// ----- MATERIAL UI CORE ----- //
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

// ----- MATERIAL UI ICONS ----- //
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';


// ----- STYLES ----- //
import swal from 'sweetalert';

class TasksOverdue extends Component {
    
    
    render () {

        let overdueTasks;

        // Dates
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let taskDay = mm + '/' + dd + '/' + yyyy;

        overdueTasks = this.props.reduxState.tasks.map((task, i) => {
            if (taskDay > task.due_date) {
                console.log('Task Overdue. Today:', taskDay, 'Task Due Date:', task.due_date, 'Task Name:', task.task_name);
                return (
                    <div className="tasksOverdue">
                        <TasksLineItemsContent 
                            id={this.props.id}
                            task_name={this.props.task_name}
                            due_date={this.props.due_date}
                            complete={this.props.complete}
                            contact_id={this.props.contact_id}
                            job_id={this.props.job_id}
                            disabled={this.props.disabled}
                            note={this.props.note}
                        />
                    </div>
                )
                
            }
        })

        return (
            <div>{overdueTasks}</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksOverdue);