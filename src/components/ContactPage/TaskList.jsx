import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

//Material UI
import { Typography, List, ListItem } from '@material-ui/core'

class TaskList extends Component {
    
    
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_TASKS' })
    }
    
    render(){

        //load tasks associated with contact
        let tasks = []
        this.props.reduxState.tasks.map(task=>{
            if(task.contact_id==this.props.match.params.id){
                //put a line in here to compare current date to due date
                tasks.push(<ListItem>{task.task_name}</ListItem>)
                // console.log('task matcher match!', task.contact_id, this.props.match.params)
            }
            else {
                // console.log('task matcher nope', task.contact_id, this.props.match.params)
            }
        })
        
        return(
            <>
                <Typography>Upcoming Tasks:</Typography>
                <List>
                    {tasks}
                </List>


                <Typography>History:</Typography>
                <List>
                    <ListItem>task1</ListItem>
                    <ListItem>task1</ListItem>
                    <ListItem>task1</ListItem>
                    <ListItem>task1</ListItem>
                </List>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(TaskList))