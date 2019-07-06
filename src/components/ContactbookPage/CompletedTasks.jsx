import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

//Material UI
import { Typography, List, ListItem } from '@material-ui/core'

class CompletedTasks extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TASKS' })
    }

    render() {

        //load tasks associated with contact
        let upcomingTasks = []
        let completedTasks = []
        let today = new Date()
        let dueDate = ''

        this.props.reduxState.tasks.map((task, i) => {
            if (task.contact_id == this.props.contactId) {
                //put a line in here to compare current date to due date
                dueDate = new Date(task.due_date)
                console.log('dates', today, dueDate)
                if (dueDate >= today) {
                    upcomingTasks.push(<ListItem key={i}>{task.task_name} Due:{task.due_date}</ListItem>)
                }
                else {
                    completedTasks.push(<ListItem key={i}>{task.task_name} Due:{task.due_date}</ListItem>)
                }
            }
        })

        return (
            <>
                <List>
                    {completedTasks}
                </List>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(CompletedTasks))