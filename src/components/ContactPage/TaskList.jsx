import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import moment from 'moment'

//Material UI
import { Typography, List, ListItem } from '@material-ui/core'

class TaskList extends Component {
    
    
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_TASKS' })
    }
    
    render(){

        //load tasks associated with contact
        let upcomingTasks = []
        let completedTasks = []
        let today = new Date()
        let dueDate = ''
        
        this.props.reduxState.tasks.map((task, i)=>{
            if(task.contact_id==this.props.match.params.id){
                //put a line in here to compare current date to due date
                dueDate = new Date(task.due_date)
                console.log('dates', today, dueDate)
                if (dueDate>=today){
                    upcomingTasks.push(<ListItem key={i}>{task.task_name} Due:  {moment(task.due_date).format('MM-DD-YYYY')}</ListItem>)
                }
                else {
                    completedTasks.push(<ListItem key={i}>{task.task_name} Due:  {moment(task.due_date).format('MM-DD-YYYY')}</ListItem>)
                }
            }
        })
        
        return(
            <>
                <Typography>Upcoming Tasks:</Typography>
                <List>
                    {upcomingTasks}
                </List>
                <Typography>History:</Typography>
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

export default withRouter(connect(mapStateToProps)(TaskList))