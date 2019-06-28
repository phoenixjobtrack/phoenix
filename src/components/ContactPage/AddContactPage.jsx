import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddTask from './AddTask'
import TaskList from './TaskList'


import {Card, CardContent, Typography, Button, TextField, List, ListItem, Grid} from '@material-ui/core'


class ContactPage extends Component {

    state={
        contact:{
            first_name: '',
            last_name: '',
            company: '',
            position:'',
            email:'',
            linkedin_url: '',
            phone: '',
            cell: '',
            notes: ''
        }
    }


    handleChangeFor = key => event =>{
        console.log('in handleChangeFor', key, event)
        this.setState({
            contact: {
                ...this.state.contact,
                [key]:event.target.value
            }
        })
    }

    handleSubmit = () =>{
        console.log('in handleSubmit')
            this.props.dispatch({ type: 'SUBMIT_CONTACT', payload: this.state.contact })
 
    }


    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_CONTACTS' })
        
    }


    render(){
        console.log('this.state', this.state)
        
        return(
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    label="First Name"
                                    onChange={this.handleChangeFor('first_name')}
                                />
                                <TextField
                                    label="Last Name"
                                    onChange={this.handleChangeFor('last_name')}
                                />
                                <TextField
                                    label="Company"
                                    onChange={this.handleChangeFor('company')}
                                />
                                <TextField
                                    label="Position"
                                    onChange={this.handleChangeFor('position')}
                                />
                                <TextField
                                    label="Email"
                                    onChange={this.handleChangeFor('email')}
                                />
                                <TextField
                                    label="LinkedIn"
                                    onChange={this.handleChangeFor('linkedin_url')}
                                />
                                <TextField
                                    label="Phone"
                                    onChange={this.handleChangeFor('phone')}
                                />
                                <TextField
                                    label="Cell"
                                    onChange={this.handleChangeFor('cell')}
                                />
                                <TextField
                                    id="notes"
                                    label="Notes"
                                    multiline
                                    rows="4"
                                    margin="normal"
                                    onChange={this.handleChangeFor('notes')}
                                />
                                <Button variant="contained" color="primary" type="submit">Save</Button>
                            </form>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <AddTask currentContact={this.currentContact} />
                            <TaskList/>
                            
                        </Grid> */}
                    </Grid>
                        
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(ContactPage))