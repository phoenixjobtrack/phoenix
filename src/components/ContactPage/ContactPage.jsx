import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Input, Typography, Button} from '@material-ui/core'

class ContactPage extends Component {
    //retrieve contactId from URL params
    contactId = this.props.match.params.id

    currentContact = {}
    


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
        this.retrieveContactData()
        return(
            // <p>contact here {this.userId}</p>
            <Card>
                <CardContent>
                    <Button variant="contained" color="primary"></Button>
                    <Typography>
                        First Name
                    </Typography>
                    <Input
                      defaultValue={this.currentContact.first_name}  
                    />
                    <Typography>
                        Last Name
                    </Typography>
                    <Input
                        defaultValue={this.currentContact.last_name}
                    />
                    <Typography>
                        Company
                    </Typography>
                    <Input
                        defaultValue={this.currentContact.company}
                    />
                    <Typography>
                        Position
                    </Typography>
                    <Input
                        defaultValue={this.currentContact.position}
                    />
                    <Typography>
                        email
                    </Typography>
                    <Input
                        defaultValue={this.currentContact.email}
                    />
                    <Typography>
                        LinkedIn
                    </Typography>
                    <Input
                        defaultValue={this.currentContact.linkedin_url}
                    />
                    <Typography>
                        Phone
                    </Typography>
                    <Input
                        defaultValue={this.currentContact.phone}
                    />
                    <Typography>
                        Cell
                    </Typography>
                    <Input
                        defaultValue={this.currentContact.cell}
                    />
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(ContactPage))