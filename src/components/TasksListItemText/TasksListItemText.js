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

class TasksListItemText extends Component {

    state = {
        taskIsEditable: false,
        editableTaskId: null,
    }

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

    render () {
        return (
            <div>
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
                        {this.props.task.task_name}
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
        )
    }

}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksListItemText);