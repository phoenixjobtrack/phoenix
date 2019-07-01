// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import TasksCheckBox from '../TasksCheckBox/TasksCheckBox';
import TasksLineItemsContent from '../TasksLineItemsContent/TasksLineItemsContent';
import TasksMoreDropdown from '../TasksMoreDropdown/TasksMoreDropdown';


// ----- MATERIAL UI CORE ----- //
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

// ----- MATERIAL UI ICONS ----- //
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';


// ----- STYLES ----- //
import swal from 'sweetalert';

class TasksLineItems extends Component {

    // state = {
    //     taskIsEditable: false,
    //     editableTaskId: null,
    // }

    // // Triggers an Alert to Confirm Deletion of a Task
    // removeAlert(id) {
    //     console.log('Remove Alert', id);
    //     swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this task",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     })
    //         .then((willDelete) => {
    //             if (willDelete) {
    //                 { this.handleClickRemove(id) };
    //                 swal("Your task has been deleted", {
    //                     icon: "success",

    //                 });
    //             } else {
    //                 swal("Your task is safe!");
    //             }
    //         });
    // }; // End removeAlert

    // // Edit and Update a Task Name & Date
    // editTask = (id, task_name) => {
    //     // let task_name = task_name;
    //     this.setState({
    //         taskIsEditable: true,
    //         editableTaskId: id,
    //         task_name: task_name,
    //     });
    // }; // end editTask

    // handleChange = (event) => {
    //     this.setState({
    //         task_name: event.target.value
    //     })

    // }; // end handleChange

    // postTask = (id) => {
    //     console.log('postTask:', this.state.task)
    //     let task = this.state.task_name;
    //     this.props.dispatch({ type: 'UPDATE_TASK', payload: { task_name: task, id: this.state.editableTaskId } })
    // }

    // saveTask = () => {
    //     this.setState({
    //         taskIsEditable: false,
    //     })
    //     this.postTask();
    // }; // end saveTask

    // // Click Listeners For Icons on Line Items
    // handleClickCheckBox(id) {
    //     console.log('Checkbox Clicked', id);
    //     this.props.dispatch({ type: 'CHECK_TASK_BOX', payload: id })
    // }; // end handleClickCheckBox

    // handleClickRemove(id) {
    //     console.log('Remove Clicked', id);
    //     this.props.dispatch({ type: 'REMOVE_TASK', payload: id })
    // }; // end handleClickRemove

    render() {
        console.log('this.state', this.state)

        let userTasks;

        // Dates
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let taskDay = mm + '/' + dd + '/' + yyyy;


        userTasks = this.props.reduxState.tasks.map(({ id, task_name, due_date, complete, contact_id, job_id, disabled }) => {
            // console.log('taskDay', taskDay, this.props.reduxState.tasks[id].due_date);
            if (this.props.reduxState.tasks.due_date !== taskDay) {
                return (
                    <TasksLineItemsContent 
                        id={id}
                        task_name={task_name}
                        due_date={due_date}
                        complete={complete}
                        contact_id={contact_id}
                        job_id={job_id}
                        disabled={disabled}
                    />
                ) // End Return
            }// End If Statement
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