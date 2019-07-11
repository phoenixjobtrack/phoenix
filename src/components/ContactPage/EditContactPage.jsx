import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'

import AddTask from './AddTask'
import TaskList from './TaskList'

import WorkIcon from '@material-ui/icons/Work'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import CellIcon from '@material-ui/icons/PhoneAndroid'
import NotesIcon from '@material-ui/icons/Notes'
import PersonIcon from '@material-ui/icons/Person'

import Avatar from '@material-ui/core/Avatar';
import { Divider, List, ListItem, ListItemIcon, Card, CardContent, CardHeader, Button, TextField, Grid, withStyles } from '@material-ui/core'

const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
    card: {
        marginTop: '50px',
        minHeight: '85vh'
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        height: '70px',
        width: '70px'
    },
    contactInput : {
        width: '50%',
        marginRight: '30px'
    },
    division: {
        marginBottom: '40px',
        marginTop: '30px'
    },
    saveBtn: {
        position: 'absolute',
        top: 150,
        right: 50
    }
    
    

});

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
        //phone# inputs auto format to look like phone numbers
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
    //retrieve contactId from URL params
    contactId = this.props.match.params.id
    currentContact = {}

    //function updates redux on change of input fields
    handleChangeFor = key => event => {
        this.props.dispatch({type:'UPDATE_REDUX_CONTACT', payload: {key:key, value: event.target.value}})
    }

    //sends contact to saga
    handleSubmit = () => {
        this.props.dispatch({type: 'UPDATE_CONTACT', payload: this.props.reduxState.currentContact})
        this.props.history.push('/contact')
    }

    //fetch data for currently selected contact
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_CONTACT', payload: this.props.match.params.id })
    }


    render() {
        let currentContact = this.props.reduxState.currentContact
        let avatar 

        //define avatar depending on which text fields are filled
        if (currentContact.first_name && currentContact.last_name){
            avatar = 
                <Avatar aria-label="Contact" className={this.props.classes.avatar}>
                    {currentContact.first_name[0]}{currentContact.last_name[0]}
                </Avatar>
        }
        else if (currentContact.first_name && !currentContact.last_name) {
            avatar = 
                <Avatar aria-label="Contact" className={this.props.classes.avatar}>
                    {currentContact.first_name[0]}
                </Avatar>
        }
        else if (!currentContact.first_name && currentContact.last_name) {
            avatar = 
                <Avatar aria-label="Contact" className={this.props.classes.avatar}>
                    {currentContact.last_name[0]}
                </Avatar>
        }
        else 
            avatar = 
                <Avatar aria-label="Contact" className={this.props.classes.avatar}>
                    
                </Avatar>
        
        return (
                <Card className={this.props.classes.card}>
                    <CardHeader
                        avatar={avatar}
                        title={`${currentContact.first_name} ${currentContact.last_name}`}
                        subheader={currentContact.company}
                    />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}
                                style={{
                                    minWidth: '70vw'
                                }}>
                            <form onSubmit={this.handleSubmit}>
                                <Button className={this.props.classes.saveBtn} variant="contained" color="primary" type="submit">Save</Button>
                                    <List>
                                        <ListItem >
                                        <ListItemIcon className={this.props.classes.inputIcon}>
                                                <PersonIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                className={this.props.classes.contactInput}
                                                label="First Name"
                                                value={currentContact.first_name}
                                                onChange={this.handleChangeFor('first_name')}
                                            />
                                            <ListItemIcon></ListItemIcon>
                                            <TextField
                                                className={this.props.classes.contactInput}
                                                label="Last Name"
                                                value={currentContact.last_name}
                                                onChange={this.handleChangeFor('last_name')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <WorkIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                className={this.props.classes.contactInput}
                                                label="Company"
                                                value={currentContact.company}
                                                onChange={this.handleChangeFor('company')}
                                            />
                                            <ListItemIcon></ListItemIcon>
                                            <TextField
                                                className={this.props.classes.contactInput}
                                                label="Position"
                                                value={currentContact.position}
                                                onChange={this.handleChangeFor('position')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <EmailIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                className={this.props.classes.contactInput}
                                                label="Email"
                                                value={currentContact.email}
                                                onChange={this.handleChangeFor('email')}
                                            />
                                            <ListItemIcon>
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    width="24" 
                                                    height="24" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        fill="#2196f3" 
                                                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" 
                                                    />
                                                </svg>
                                            </ListItemIcon>
                                            <TextField
                                                className={this.props.classes.contactInput}
                                                label="LinkedIn"
                                                value={currentContact.linkedin_url}
                                                onChange={this.handleChangeFor('linkedin_url')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PhoneIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                className={this.props.classes.contactInput}
                                                label="Phone"
                                                InputProps={{
                                                    inputComponent: TextMaskCustom,
                                                    value: currentContact.phone,
                                                    onChange: this.handleChangeFor('phone'),

                                                }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                            <ListItemIcon>
                                                <CellIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                className={this.props.classes.contactInput}
                                                label="Cell"
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                InputProps={{
                                                    inputComponent: TextMaskCustom,
                                                    value: currentContact.cell,
                                                    onChange: this.handleChangeFor('cell'),
                                                }}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <NotesIcon color="primary" />
                                            </ListItemIcon>
                                            <TextField
                                                style={{
                                                    width: '100%'
                                                }}
                                                id="notes"
                                                label="Notes"
                                                multiline
                                                margin="normal"
                                                value={currentContact.notes}
                                                onChange={this.handleChangeFor('notes')}
                                            />
                                        </ListItem> 
                                    </List>
                                </form >
                                <Divider className={this.props.classes.division}/>
                            </Grid>
                            <Grid container item xs={12}>
                            
                                <Grid item xs={7}>
                                    <AddTask />
                                </Grid>
                                <Grid item xs={5}>
                                    <TaskList contactId={this.currentContact.id} />
                                </Grid>
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