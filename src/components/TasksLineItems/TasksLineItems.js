// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import TasksLineItemsContent from '../TasksLineItemsContent/TasksLineItemsContent';
import TasksNotes from '../TasksNotes/TasksNotes';

// ----- MATERIAL UI CORE ----- //
import List from '@material-ui/core/List';

// ----- MATERIAL UI ICONS ----- //

// ----- STYLES ----- //


class TasksLineItems extends Component {

    render() {
        console.log('this.state', this.state)

        let userTasks;

        // Dates
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let taskDay = mm + '/' + dd + '/' + yyyy;


        userTasks = this.props.reduxState.tasks.map(({ id, task_name, due_date, complete, contact_id, job_id, disabled, note }) => {
            // console.log('taskDay', taskDay, this.props.reduxState.tasks[id].due_date);
            if (this.props.reduxState.tasks.due_date !== taskDay) {
                return (
                    <div>
                    <TasksLineItemsContent 
                        id={id}
                        task_name={task_name}
                        due_date={due_date}
                        complete={complete}
                        contact_id={contact_id}
                        job_id={job_id}
                        disabled={disabled}
                    />
                    <TasksNotes 
                        id={id}
                        task_name={task_name}
                        due_date={due_date}
                        complete={complete}
                        contact_id={contact_id}
                        job_id={job_id}
                        disabled={disabled}
                        note={note}
                    />
                    </div>
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