// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import TaskNoteContact from '../TaskNoteContact/TaskNoteContact';
import TaskNoteJob from '../TaskNoteJob/TaskNoteJob';
import TasksCheckBox from '../TasksCheckBox/TasksCheckBox';
import TasksMoreDropdown from '../TasksMoreDropdown/TasksMoreDropdown';


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

class TasksLineItemsContent extends Component {

    state = {
        taskIsEditable: false,
        editableTaskId: null,
    }

    // Triggers an Alert to Confirm Deletion of a Task
    removeAlert(id) {
        console.log('Remove Alert', id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    { this.handleClickRemove(id) };
                    swal("Your task has been deleted", {
                        icon: "success",

                    });
                } else {
                    swal("Your task is safe!");
                }
            });
    }; // End removeAlert

    // Edit and Update a Task Name & Date
    editTask = (id, task_name) => {
        // let task_name = task_name;
        this.setState({
            taskIsEditable: true,
            editableTaskId: id,
            task_name: task_name,
        });
    }; // end editTask

    handleChange = (event) => {
        this.setState({
            task_name: event.target.value
        })
    }; // end handleChange

    postTask = (id) => {
        console.log('postTask:', this.state.task)
        let task = this.state.task_name;
        this.props.dispatch({ type: 'UPDATE_TASK', payload: { task_name: task, id: this.state.editableTaskId } })
    }

    saveTask = () => {
        this.setState({
            taskIsEditable: false,
        })
        this.postTask();
    }; // end saveTask

    // Click Listeners For Icons on Line Items
    handleClickCheckBox(id) {
        console.log('Checkbox Clicked', id);
        this.props.dispatch({ type: 'CHECK_TASK_BOX', payload: id })
    }; // end handleClickCheckBox

    handleClickRemove(id) {
        console.log('Remove Clicked', id);
        this.props.dispatch({ type: 'REMOVE_TASK', payload: id })
    }; // end handleClickRemove

    render() {
        return (
            <Paper key={this.props.id}>
                <Toolbar>
                    <ListItem>
                        {/* See component: TasksMoreDropdown */}
                        <TasksMoreDropdown 
                            id={this.props.id}
                            task_name={this.props.task_name}
                        />
                        <Tooltip title="Mark Complete">
                            <IconButton
                                onClick={() => this.handleClickCheckBox(this.props.id)}
                                size="small"
                            >
                                {/* See component: TasksCheckBox */}
                                <TasksCheckBox
                                    complete={this.props.complete}
                                />
                            </IconButton>
                        </Tooltip>
                        <div className="listItemText">
                            {this.state.taskIsEditable ?
                                    <><ListItemText
                                    ><TextField
                                            placeholder={this.props.task_name}
                                            value={this.state.task_name}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                        />
                                        <IconButton
                                            onClick={() => this.saveTask(this.props.id)}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    </ListItemText></> :
                                    <><ListItemText>
                                        {this.props.task_name}
                                        <Tooltip title="Edit Task">
                                            <IconButton
                                                onClick={() => this.editTask(this.props.id, this.props.task_name)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemText></>
                            }

                        </div>
                        <ListItemText className="dueDate">
                            {this.props.due_date}
                        </ListItemText>
                        {/* See component: TaskNoteContact */}
                        <TaskNoteContact contact_id={this.props.contact_id}/>
                        {/* See component: TaskNoteJob */}
                        <TaskNoteJob job_id={this.props.job_id}/>
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => this.removeAlert(this.props.id)}
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                </ Toolbar>
            </Paper>
        ) // End Return
    } // End Render
} // End Class

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksLineItemsContent);