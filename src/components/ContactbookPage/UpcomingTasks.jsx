import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import moment from 'moment'

//Material UI
import { Typography, List, ListItem, Divider } from '@material-ui/core'

class UpcomingTasks extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TASKS_BY_DATE' })
    }

    render() {

        //load tasks associated with contact
        let upcomingTasks = []
        let dueDate = ''

        this.props.reduxState.tasksByDate.map((task, i) => {
            if (task.contactId == this.props.contactId) {
                //put a line in here to compare current date to due date
                dueDate = new Date(task.dueDate)
                if (!task.complete) {
                    upcomingTasks.push(
                        <div key={i}>
                            <ListItem >
                                <Typography variant="body1" >{task.taskName}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="caption">  Date:  {moment(task.dueDate).format('MM-DD-YYYY')}</Typography>
                            </ListItem>
                            <Divider />
                        </div>
                    )
                }
            }
        })

        return (
            <List>
                {upcomingTasks}
            </List>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(UpcomingTasks))