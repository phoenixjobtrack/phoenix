import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddTask from './AddTask'

import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Input, Typography, Button, TextField, List, ListItem} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'

class ContactPage extends Component {
    //retrieve contactId from URL params
    contactId = this.props.match.params.id

    currentContact = {}

    state={
        contact:{
            firstName: '',
            lastName: '',
            company: '',
            position:'',
            email:'',
            linkedInUrl: '',
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


    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_CONTACTS' })
        
        

    }


    render(){
        console.log('today', this.state.today)
        this.retrieveContactData()
        return(
            // <p>contact here {this.userId}</p>
            <Card>
                <CardContent>
                    <Button variant="contained" color="primary">Save</Button>
                        <AddTask currentContact={this.currentContact}/>
                        <Typography>Upcoming Tasks:</Typography>        
                            <List>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                                <ListItem>task1</ListItem>
                            </List>
                    <TextField
                        label="First Name" 
                        defaultValue={this.currentContact.first_name}  
                    />
                    <TextField
                        label="Last Name"
                        defaultValue={this.currentContact.last_name}
                    />
                    <TextField
                        label="Company"
                        defaultValue={this.currentContact.company}
                    />
                    <TextField
                        label="Position"
                        defaultValue={this.currentContact.position}
                    />
                    <TextField
                        label="Email"
                        defaultValue={this.currentContact.email}
                    />
                    <TextField
                        label="LinkedIn"
                        defaultValue={this.currentContact.linkedin_url}
                    />
                    <TextField
                        label="Phone"
                        defaultValue={this.currentContact.phone}
                    />
                    <TextField
                        label="Cell"
                        defaultValue={this.currentContact.cell}
                    />
                    <TextField
                        id="notes"
                        label="Notes"
                        multiline
                        rows="4"
                        margin="normal"
                    />
                    <Typography>History:</Typography>
                    <List>
                        <ListItem>task1</ListItem>
                        <ListItem>task1</ListItem>
                        <ListItem>task1</ListItem>
                        <ListItem>task1</ListItem>
                    </List>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(ContactPage))