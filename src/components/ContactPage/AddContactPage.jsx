import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';


import AddTask from './AddTask'
import TaskList from './TaskList'

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'


import WorkIcon from '@material-ui/icons/Work'
import EmailIcon from '@material-ui/icons/Email'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PhoneIcon from '@material-ui/icons/Phone'
import CellIcon from '@material-ui/icons/PhoneAndroid'
import NotesIcon from '@material-ui/icons/Notes'
import PersonIcon from '@material-ui/icons/Person'
import {List, ListItem, ListItemIcon, Card, CardContent, Typography, Button, TextField, Grid, withStyles} from '@material-ui/core'


const styles = theme => ({
    inputs: {
        marginRight: '30px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
    card: {
        height: '85vh'
    }
});

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

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
        },
        textmask: '',
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
            <Card className={this.props.classes.card}>

                <CardContent>
                    <Grid container>
                        <Typography variant='h5'>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonAddIcon color="primary"/>
                                    </ListItemIcon>
                                    Add New Contact
                                </ListItem>
                            </List>
                            
                            
                        </Typography>                        
                        <form onSubmit={this.handleSubmit}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonIcon color="primary"/>
                                    </ListItemIcon>
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
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonIcon color="primary" />
                                    </ListItemIcon>
                                    
                                </ListItem>
                                
                            </List>
                            <Grid container item xs={8} direction="row" justify="flex-start">
                                
                                
                                <Grid item xs={6}>
                                    
                                </Grid>
                                <Grid item xs={1} justify="center" alignContent="center">
                                    <WorkIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Company"
                                        onChange={this.handleChangeFor('company')}
                                        className={this.props.classes.inputs}
                                    />
                                </Grid>  
                                <Grid item xs={6}>                             
                                    <TextField
                                        label="Position"
                                        onChange={this.handleChangeFor('position')}
                                        className={this.props.classes.inputs}
                                    />
                                </Grid>
                                <Grid item xs={1} justify="center" alignContent="center">
                                    <EmailIcon />
                                </Grid>
                                <Grid item xs={4}>                                    
                                    <TextField
                                        label="Email"
                                        onChange={this.handleChangeFor('email')}
                                        className={this.props.classes.inputs}
                                    />
                                </Grid>
                                <Grid item xs={1} justify="center" alignContent="center">
                                    <img src="https://img.icons8.com/material/24/000000/linkedin.png"></img>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="LinkedIn"
                                        onChange={this.handleChangeFor('linkedin_url')}
                                        className={this.props.classes.inputs}
                                    />
                                </Grid>
                                <Grid item xs={1} justify="center" alignContent="center">
                                    <PhoneIcon />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Phone"
                                        onChange={this.handleChangeFor('phone')}
                                        className={this.props.classes.inputs}
                                        InputProps={{
                                            inputComponent: TextMaskCustom,
                                            value: this.state.contact.phone,
                                            onChange: this.handleChangeFor('phone'),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1} justify="center" alignContent="center">
                                    <CellIcon />
                                </Grid>
                                <Grid item xs={6}> 
                                    <TextField
                                        label="Cell"
                                        className={this.props.classes.inputs}
                                        InputProps={{
                                            inputComponent: TextMaskCustom,
                                            value: this.state.contact.cell,
                                            onChange: this.handleChangeFor('cell'),
                                        }}
                                    />
                                </Grid>                         
                                <Grid item xs={6}>
                                    <NotesIcon/>
                                    <TextField
                                        id="notes"
                                        label="Notes"
                                        multiline
                                        rows="4"
                                        margin="normal"
                                        onChange={this.handleChangeFor('notes')}
                                        className={this.props.classes.inputs}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" type="submit">Save</Button>
                                </Grid>   
                            </Grid>
                        </form>
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