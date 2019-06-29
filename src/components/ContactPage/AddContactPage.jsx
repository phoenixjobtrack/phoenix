import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddTask from './AddTask'
import TaskList from './TaskList'


import {Card, CardContent, Typography, Button, TextField, List, ListItem, Grid, withStyles} from '@material-ui/core'



const styles = theme => ({
    inputs: {
        marginRight: '30px'
    }
});

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
                        <Typography>Add New Contact</Typography>
                        <Grid item xs={6}>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    label="First Name"
                                    onChange={this.handleChangeFor('first_name')}
                                    className={this.props.classes.inputs}
                                />
                                <TextField
                                    label="Last Name"
                                    onChange={this.handleChangeFor('last_name')}
                                    className={this.props.classes.inputs}
                                />
                                <TextField
                                    label="Company"
                                    onChange={this.handleChangeFor('company')}
                                    className={this.props.classes.inputs}
                                />
                                <TextField
                                    label="Position"
                                    onChange={this.handleChangeFor('position')}
                                    className={this.props.classes.inputs}
                                />
                                <TextField
                                    label="Email"
                                    onChange={this.handleChangeFor('email')}
                                    className={this.props.classes.inputs}
                                />
                                <TextField
                                    label="LinkedIn"
                                    onChange={this.handleChangeFor('linkedin_url')}
                                    className={this.props.classes.inputs}
                                />
                                <TextField
                                    label="Phone"
                                    onChange={this.handleChangeFor('phone')}
                                    className={this.props.classes.inputs}
                                />
                                <TextField
                                    label="Cell"
                                    onChange={this.handleChangeFor('cell')}
                                    className={this.props.classes.inputs}
                                />
                                <TextField
                                    id="notes"
                                    label="Notes"
                                    multiline
                                    rows="4"
                                    margin="normal"
                                    onChange={this.handleChangeFor('notes')}
                                    className={this.props.classes.inputs}
                                />
                                <Button variant="contained" color="primary" type="submit">Save</Button>
                            </form>
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

export default withRouter(withStyles(styles)(connect(mapStateToProps)(ContactPage)))