// ----- TASKS LINE ITEMS CONTENT ----- //
// Content contained within each line item in the Tasks view
// Child of TasksLineItems


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
import './TasksLineItemsContent.css';

// ----- DEPENDENCIES ----- //
import moment from 'moment';
import swal from 'sweetalert';

class TasksLineItemsContent extends Component {
    state = {
        taskIsEditable: false,
        editableTaskId: null,
    }

    // Triggers an Alert to Confirm Deletion of a Task
    removeAlert(id) {
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
    editTask = (id, task_name, due_date) => {
        // let task_name = task_name;
        this.setState({
            taskIsEditable: true,
            editableTaskId: id,
            task_name: task_name,
            due_date: due_date,
        });
    }; // end editTask

    handleChangeDate = (event) => {
        let newDate = event.target.value;
        this.setState({
            due_date: newDate,
        })
    }; // end handleChange

    handleChangeText = (event) => {
        this.setState({
            task_name: event.target.value,

        })
    }; // end handleChange

    postTask = (id) => {
        let task = this.state.task_name;
        let date = this.state.due_date;
        this.props.dispatch({ type: 'UPDATE_TASK', payload: { task_name: task, id: this.state.editableTaskId, date: date } })
    }

    saveTask = () => {
        this.setState({
            taskIsEditable: false,
        })
        this.postTask();
    }; // end saveTask

    // Click Listeners For Icons on Line Items
    handleClickCheckBox(id) {
        this.props.dispatch({ type: 'CHECK_TASK_BOX', payload: id })
    }; // end handleClickCheckBox

    handleClickRemove(id) {
        this.props.dispatch({ type: 'REMOVE_TASK', payload: id })
    }; // end handleClickRemove

    render() {
        return (
            <Paper key={this.props.id}>
                <Toolbar>
                    <ListItem>
                        <TasksMoreDropdown
                            id={this.props.id}
                            task_name={this.props.task_name}
                            
                        />
                        <Tooltip title="Mark Complete">
                            <IconButton
                                onClick={() => this.handleClickCheckBox(this.props.id)}
                                size="small"
                                color="primary"
                            >
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
                                        onChange={this.handleChangeText}
                                        variant="outlined"
                                    />
                                    <TextField
                                        type="date"
                                        placeholder={this.props.due_date}
                                        defaultValue={this.state.due_date}
                                        onChange={this.handleChangeDate}
                                        format={'YYYY-MM-DD'}
                                        formatDate={(date) => moment(new Date()).format('YYYY-MM-DD')}
                                        variant="outlined"
                                    />
                                    <IconButton
                                        onClick={() => this.saveTask(this.props.id)}
                                        color="primary"
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                </ListItemText></> :
                                <><ListItemText>
                                    {this.props.complete ?
                                        <span className="taskNameTextComplete">
                                            {this.props.task_name}
                                        </span> :
                                        <span className="taskNameTextIncomplete">
                                            {this.props.task_name}
                                        </span>
                                    }
                                    <Tooltip title="Edit Task">
                                        <IconButton
                                            onClick={() => this.editTask(this.props.id, this.props.task_name, this.props.due_date)}
                                            color="secondary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemText></>
                            }
                        </div>
                        <ListItemText className="dueDate">
                            {this.props.complete ?
                                <span className="taskNameTextComplete">
                                    {this.props.due_date}
                                </span> :
                                <span className="taskNameTextIncomplete">
                                    {this.props.due_date}
                                </span>
                            }
                        </ListItemText>
                        {/* See component: TaskNoteContact */}
                        <TaskNoteContact contact_id={this.props.contact_id} />
                        {/* See component: TaskNoteJob */}
                        <TaskNoteJob job_id={this.props.job_id} />
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => this.removeAlert(this.props.id)}
                                size="small"

                            >
                                <ClearIcon color="error"/>
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