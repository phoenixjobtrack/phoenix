import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import moment from 'moment'

//Material UI
import { Divider, Grid, Typography, List, ListItem } from '@material-ui/core'

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
                if (!task.complete){
                    upcomingTasks.push(
                        <div key={i}>
                            <ListItem >
                                <Typography variant="body1" >{task.task_name}</Typography>
                            </ListItem>
                            <ListItem>   
                                <Typography variant="caption">  Due:  {moment(task.due_date).format('MM-DD-YYYY')}</Typography>                          
                            </ListItem>
                        <Divider/>
                    </div>)
                }
                else if (task.complete) {
                    completedTasks.push(
                        <div key={i}>
                            <ListItem >
                                <Typography variant="body1" >{task.task_name}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="caption">  Due:  {moment(task.due_date).format('MM-DD-YYYY')}</Typography>
                            </ListItem>
                            <Divider />
                        </div>)
                }
                else {
                    completedTasks.push(
                        <div key={i}>
                            <ListItem >
                                <Typography variant="body1" >{task.task_name}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="caption">  Due:  {moment(task.due_date).format('MM-DD-YYYY')}</Typography>
                            </ListItem>
                            <Divider />
                        </div>)
                }
            }
        })
        
        return(
         
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h6">Upcoming Tasks</Typography>
                    <List>
                        {upcomingTasks}
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">History</Typography>
                    <List>
                        {completedTasks}
                    </List>
                </Grid>
            </Grid>
            
                
                
            
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(TaskList))