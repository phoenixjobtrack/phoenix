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
    editTask = (id, taskName, dueDate) => {
        // let taskName = taskName;
        this.setState({
            taskIsEditable: true,
            editableTaskId: id,
            taskName: taskName,
            dueDate: dueDate,
        });
    }; // end editTask

    handleChangeDate = (event) => {
        let newDate = event.target.value;
        this.setState({
            dueDate: newDate,
        })
    }; // end handleChange

    handleChangeText = (event) => {
        this.setState({
            taskName: event.target.value,

        })
    }; // end handleChange

    postTask = (id) => {
        let task = this.state.taskName;
        let date = this.state.dueDate;
        this.props.dispatch({ type: 'UPDATE_TASK', payload: { taskName: task, id: this.state.editableTaskId, date: date } })
    }

    saveTask = () => {
        this.setState({
            taskIsEditable: false,
        })
        this.postTask();
    }; // end saveTask

    // Click Listeners For Icons on Line Items
    handleClickCheckBox(id, isComplete) {
        this.props.dispatch({ type: 'CHECK_TASK_BOX', payload: { id, isComplete } })
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
                            taskName={this.props.taskName}

                        />
                        <Tooltip title="Mark Complete">
                            <IconButton
                                onClick={() => this.handleClickCheckBox(this.props.id, !this.props.complete)}
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
                                        placeholder={this.props.taskName}
                                        value={this.state.taskName}
                                        onChange={this.handleChangeText}
                                        variant="outlined"
                                    />
                                    <TextField
                                        type="date"
                                        placeholder={this.props.dueDate}
                                        defaultValue={this.state.dueDate}
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
                                            {this.props.taskName}
                                        </span> :
                                        <span className="taskNameTextIncomplete">
                                            {this.props.taskName}
                                        </span>
                                    }
                                    <Tooltip title="Edit Task">
                                        <IconButton
                                            onClick={() => this.editTask(this.props.id, this.props.taskName, this.props.dueDate)}
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
                                    {this.props.dueDate}
                                </span> :
                                <span className="taskNameTextIncomplete">
                                    {this.props.dueDate}
                                </span>
                            }
                        </ListItemText>
                        {/* See component: TaskNoteContact */}
                        <TaskNoteContact contactId={this.props.contactId} />
                        {/* See component: TaskNoteJob */}
                        <TaskNoteJob jobId={this.props.jobId} />
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => this.removeAlert(this.props.id)}
                                size="small"

                            >
                                <ClearIcon color="error"/>
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                </Toolbar>
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