import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'

import AddTask from './AddTask'
import TaskList from './TaskList'

import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { Card, CardContent, CardHeader, Button, TextField, Grid, withStyles } from '@material-ui/core'

const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
    card: {
        height: '85vh'
    },
    avatar: {
        backgroundColor: red[500],
        height: '100px',
        width: '100px'
    },

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
    //retrieve contactId from URL params
    contactId = this.props.match.params.id
    currentContact = {}



    handleChangeFor = key => event => {
        console.log('in handleChangeFor', key, event)
        this.props.dispatch({type:'UPDATE_REDUX_CONTACT', payload: {key:key, value: event.target.value}})

    }

    handleSubmit = () => {
        console.log('in handleSubmit')
        this.props.dispatch({type: 'UPDATE_CONTACT', payload: this.props.reduxState.currentContact})

    }


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_CONTACT', payload: this.contactId })
    }


    render() {
         
        console.log('currentContact', this.props.reduxState.currentContact)
        let currentContact = this.props.reduxState.currentContact
        let avatar 

        //define avatar depending on what text fields are filled
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
                        <Grid item xs={6}>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    label="First Name"
                                    value={currentContact.first_name}
                                    onChange={this.handleChangeFor('first_name')}
                                />
                                <TextField
                                    label="Last Name"
                                    value={currentContact.last_name}
                                    onChange={this.handleChangeFor('last_name')}
                                />
                                <TextField
                                    label="Company"
                                    value={currentContact.company}
                                    onChange={this.handleChangeFor('company')}
                                />
                                <TextField
                                    label="Position"
                                    value={currentContact.position}
                                    onChange={this.handleChangeFor('position')}
                                />
                                <TextField
                                    label="Email"
                                    value={currentContact.email}
                                    onChange={this.handleChangeFor('email')}
                                />
                                <TextField
                                    label="LinkedIn"
                                    value={currentContact.linkedin_url}
                                    onChange={this.handleChangeFor('linkedin_url')}
                                />
                                <TextField
                                    label="Phone"
                                    InputProps={{
                                        inputComponent: TextMaskCustom,
                                        value: currentContact.phone,
                                        onChange: this.handleChangeFor('phone'),
                                    }}
                                />
                                <TextField
                                    label="Cell"
                                    InputProps={{
                                        inputComponent: TextMaskCustom,
                                        value: currentContact.cell,
                                        onChange: this.handleChangeFor('cell'),
                                    }}
                                />
                                <TextField
                                    id="notes"
                                    label="Notes"
                                    multiline
                                    rows="4"
                                    margin="normal"
                                    value={currentContact.notes}
                                    onChange={this.handleChangeFor('notes')}
                                />
                                <Button variant="contained" color="primary" type="submit">Save</Button>
                            </form>
                        </Grid>
                        <Grid item xs={6}>
                            <AddTask />
                            <TaskList contactId={this.currentContact.id}/>
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