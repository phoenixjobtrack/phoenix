// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import TasksCheckBox from '../TasksCheckBox/TasksCheckBox';

// ----- MATERIAL UI CORE ----- //
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

// ----- MATERIAL UI ICONS ----- //
import ClearIcon from '@material-ui/icons/Clear';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PublishIcon from '@material-ui/icons/Publish'

// ----- STYLES ----- //
import swal from 'sweetalert';

class TasksLineItems extends Component {

    state = {
        taskIsEditable: false,
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
    editTask = (id) => {
        this.setState({
            taskIsEditable: true,
            editableTaskId: id,
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
        this.props.dispatch({ type: 'UPDATE_TASK', payload: { task_name: task, id: id } })
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

        let userTasks;

        userTasks = this.props.reduxState.tasks.map(({ id, task_name, due_date, complete, contact_id, job_id, disabled }) => {
            return (
                <Paper key={id}>
                    <Toolbar>
                        <ListItem>

                            <div className="moreMenu">
                                <PopupState variant="popover" popupId="popup-menu">
                                    {popupState => (
                                        <React.Fragment>
                                            <Tooltip title="More">
                                                <IconButton variant="contained" {...bindTrigger(popupState)} >
                                                    <MoreVertIcon />
                                                </ IconButton>
                                            </Tooltip>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={popupState.close}>Add Note</MenuItem>
                                                <MenuItem onClick={popupState.close}>Add To Contact</MenuItem>
                                                <MenuItem onClick={popupState.close}>Add To Job</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </div>
                            <Tooltip title="Mark Complete">
                                <IconButton
                                    onClick={() => this.handleClickCheckBox(id)}
                                    size="small"
                                >
                                    <TasksCheckBox
                                        complete={complete}
                                    />
                                </IconButton>
                            </Tooltip>
                            <div className="listItemText">

                                {this.state.taskIsEditable ?
                                    <><ListItemText
                                        onClick={this.saveTask}
                                    ><input
                                            placeholder={task_name}
                                            text={task_name}
                                            onChange={this.handleChange}
                                        />
                                        <IconButton onClick={this.saveTask}><PublishIcon/></IconButton></ListItemText></> :
                                    <><ListItemText
                                        onClick={this.editTask}
                                    >{task_name}
                                    </ListItemText></>
                                }


                            </div>
                            <ListItemText className="dueDate">
                                {due_date}
                            </ListItemText>
                            <Tooltip title="Delete">
                                <IconButton
                                    onClick={() => this.removeAlert(id)}
                                    size="small"
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                    </ Toolbar>
                </Paper>
            ) // End Return
        }) // End userTasks

        return (
            <List>
                {userTasks}
            </List>
        ) // End Return
    } // End Render
} // End Class

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksLineItems);