import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddTask from './AddTask'


import {Card, CardContent, Typography, Button, TextField, List, ListItem, Grid} from '@material-ui/core'


class ContactPage extends Component {
    //retrieve contactId from URL params
    contactId = this.props.match.params.id
    currentContact = {}

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

    //match contactId from URL to contact from reducer
    retrieveContactData = () => {        
        
        let allContacts = this.props.reduxState.contacts
        console.log('in retrieveContactData', allContacts, this.contactId)
        allContacts.map(contact=>{
            if (this.contactId == contact.id) {
                
                this.currentContact=contact
                console.log('its a match', this.currentContact)
            }
            else {
                console.log('not a match')
            }
        })
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
        this.props.dispatch({type:'SUBMIT_CONTACT', payload:this.state.contact})
    }


    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_CONTACTS' })
    }


    render(){
        console.log('this.state', this.state)
        this.retrieveContactData()
        return(
            // <p>contact here {this.userId}</p>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    label="First Name"
                                    defaultValue={this.currentContact.first_name}
                                    onChange={this.handleChangeFor('first_name')}
                                />
                                <TextField
                                    label="Last Name"
                                    defaultValue={this.currentContact.last_name}
                                    onChange={this.handleChangeFor('last_name')}
                                />
                                <TextField
                                    label="Company"
                                    defaultValue={this.currentContact.company}
                                    onChange={this.handleChangeFor('company')}
                                />
                                <TextField
                                    label="Position"
                                    defaultValue={this.currentContact.position}
                                    onChange={this.handleChangeFor('position')}
                                />
                                <TextField
                                    label="Email"
                                    defaultValue={this.currentContact.email}
                                    onChange={this.handleChangeFor('email')}
                                />
                                <TextField
                                    label="LinkedIn"
                                    defaultValue={this.currentContact.linkedin_url}
                                    onChange={this.handleChangeFor('linkedin_url')}
                                />
                                <TextField
                                    label="Phone"
                                    defaultValue={this.currentContact.phone}
                                    onChange={this.handleChangeFor('phone')}
                                />
                                <TextField
                                    label="Cell"
                                    defaultValue={this.currentContact.cell}
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
                        <Grid item xs={6}>
                            <AddTask currentContact={this.currentContact} />
                            <Typography>Upcoming Tasks:</Typography>
                            <List>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                            </List>


                            <Typography>History:</Typography>
                            <List>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                            </List>
                        </Grid>
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