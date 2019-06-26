import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Input, Typography, Button, TextField, List, ListItem } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'


class AddTask extends Component {

    state = {
        today: '',
        newTask: {
            task_name: '',
            due_date: '',
            due_time: '',
            contact_id: ''
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
        // console.log('today', today)
        this.setState({
            today: today
        })
    }

    // save task inputs to local state 
    handleChangeFor = key => event =>{
        console.log('key', key, 'contactId', this.props.currentContact.id)
        this.setState({
            ...this.state,
            newTask:{
                ...this.state.newTask,
                contact_id: this.props.currentContact.id,
                [key]: event.target.value

            }
        })
    }

    //send new task to saga
    handleSubmit = () =>{
        console.log('in handleSubmit')
        this.props.dispatch({ type:'ADD_TASK',payload:this.state.newTask})
    }


    componentDidMount(){
        this.getDate()
    }
    render(){
        console.log('AddTask state', this.state)
        return(
            
            <form onSubmit={this.handleSubmit}>
                <Typography>Add Task</Typography>
                <TextField
                    id="task"
                    label="task"
                    onChange={this.handleChangeFor('task_name')}
                />
                <TextField
                    id="date"
                    label="Date (required)"
                    onChange={ this.handleChangeFor('due_date') }
                    type="date"
                    defaultValue={this.state.today}
                    InputLabelProps={{
                        shrink: true,
                    }}

                />
                <TextField
                    id="time"
                    label="Time (optional)"
                    type="time"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={ this.handleChangeFor('due_time') }
                />
                <IconButton
                    type="submit"
                    color="secondary"
                    variant="filled"
                >
                    <AddIcon />
                </IconButton>
            </form>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(AddTask)