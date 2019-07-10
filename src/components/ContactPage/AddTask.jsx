import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Tooltip, Box } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'


class AddTask extends Component {

    state = {
        today: '',
        newTask: {
            task_name: '',
            due_date: '',
            note: '',
            contact_id: '',
            complete: false
        }
    }

    //get today's date for default selection.
    getDate = () => {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1 //January=0
        let yyyy = today.getFullYear()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = `${yyyy}-${mm}-${dd}`;
        this.setState({
            today: today
        })
    }

    // save task inputs to local state 
    handleChangeFor = key => event =>{
        //if user adds task with past date, auto set as complete - 
            //this is how they can record history of interactions with a contact
        if (key ==='due_date'&& event.target.value<this.state.today){
            this.setState({
                ...this.state,
                newTask: {
                    ...this.state.newTask,
                    contact_id: this.props.reduxState.currentContact.id,
                    complete: true,
                    [key]: event.target.value,
                }
            })
        }
        else {
            this.setState({
                ...this.state,
                newTask: {
                    ...this.state.newTask,
                    contact_id: this.props.reduxState.currentContact.id,
                    [key]: event.target.value,
                }
            })
        }
    }

    //send new task to saga
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.dispatch({ type:'ADD_TASK',payload:this.state.newTask})
        this.setState({
            ...this.state,
            newTask: {
                task_name: '',
                due_date: '',
                note: '',
                contact_id: ''
            }
        })
    }

    componentDidMount(){
        this.getDate()
        this.props.dispatch({ type: 'FETCH_CURRENT_CONTACT', payload: this.props.match.params.id})
    }
    render(){
        return(
            <>
            <form onSubmit={this.handleSubmit}>
                <Typography variant="h6">Add Task</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            style={{
                                marginRight: '20px%',
                                width: '100%'
                            }}
                            value={this.state.newTask.task_name}
                            id="task"
                            label="Task"
                            onChange={this.handleChangeFor('task_name')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="date"
                            label="Date (required)"
                            onChange={this.handleChangeFor('due_date')}
                            type="date"
                            value={this.state.newTask.due_date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={this.state.newTask.note}
                            id="notes"
                            label="Note"
                            onChange={this.handleChangeFor('note')}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Tooltip title="Add task for this contact">
                            <IconButton
                                type="submit"
                                color="primary"
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        
                    </Grid>  
                </Grid>   
            </form>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(AddTask))