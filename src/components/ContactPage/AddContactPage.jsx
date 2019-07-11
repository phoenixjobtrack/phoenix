import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'

import WorkIcon from '@material-ui/icons/Work'
import EmailIcon from '@material-ui/icons/Email'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PhoneIcon from '@material-ui/icons/Phone'
import CellIcon from '@material-ui/icons/PhoneAndroid'
import NotesIcon from '@material-ui/icons/Notes'
import PersonIcon from '@material-ui/icons/Person'
import { List, ListItem, ListItemIcon, Card, CardContent, Typography, Button, TextField, Grid, withStyles, Box } from '@material-ui/core'


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
        marginTop: '50px',
        height: '80vh'
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

    state = {
        contact: {
            first_name: '',
            last_name: '',
            company: '',
            position: '',
            email: '',
            linkedin_url: '',
            phone: '',
            cell: '',
            notes: ''
        },
        textmask: '',
        demoMode: false,
    }


    handleChangeFor = key => event => {
        this.setState({
            contact: {
                ...this.state.contact,
                [key]: event.target.value
            }
        })
    }

    handleSubmit = () =>{
        this.props.dispatch({ type: 'SUBMIT_CONTACT', payload: this.state.contact })
        this.props.history.push('/contact')
    }


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CONTACTS' })

    }


    render() {
        return (
            <Card className={this.props.classes.card}>

                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h5'>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PersonAddIcon color="primary" />
                                        </ListItemIcon>
                                        Add New Contact
                                    </ListItem>
                                </List>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}
                            style={{
                                minWidth: '70vw'
                            }}>
                            <form onSubmit={this.handleSubmit}>
                                <Button className={this.props.classes.saveBtn} variant="contained" color="primary" type="submit">Save</Button>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PersonIcon color="primary" />
                                        </ListItemIcon>
                                        <TextField
                                            style={{
                                                width: '50%'
                                            }}
                                            label="First Name"
                                            onChange={this.handleChangeFor('first_name')}
                                            className={this.props.classes.inputs}
                                        />
                                        <ListItemIcon></ListItemIcon>
                                        <TextField
                                            style={{
                                                width: '50%'
                                            }}
                                            label="Last Name"
                                            onChange={this.handleChangeFor('last_name')}
                                            className={this.props.classes.inputs}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <WorkIcon color="primary" />
                                        </ListItemIcon>
                                        <TextField
                                            style={{
                                                width: '50%'
                                            }}
                                            label="Company"
                                            onChange={this.handleChangeFor('company')}
                                            className={this.props.classes.inputs}
                                        />
                                        <ListItemIcon></ListItemIcon>
                                        <TextField
                                            style={{
                                                width: '50%'
                                            }}
                                            label="Position"
                                            onChange={this.handleChangeFor('position')}
                                            className={this.props.classes.inputs}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <EmailIcon color="primary" />
                                        </ListItemIcon>
                                        <TextField
                                            style={{
                                                width: '50%'
                                            }}
                                            label="Email"
                                            onChange={this.handleChangeFor('email')}
                                            className={this.props.classes.inputs}
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
                                            style={{
                                                width: '50%'
                                            }}
                                            label="LinkedIn"
                                            onChange={this.handleChangeFor('linkedin_url')}
                                            className={this.props.classes.inputs}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PhoneIcon color="primary" />
                                        </ListItemIcon>
                                        <TextField
                                            style={{
                                                width: '50%'
                                            }}
                                            label="Phone"
                                            onChange={this.handleChangeFor('phone')}
                                            className={this.props.classes.inputs}
                                            InputProps={{
                                                inputComponent: TextMaskCustom,
                                                value: this.state.contact.phone,
                                                onChange: this.handleChangeFor('phone'),
                                            }}
                                        />
                                        <ListItemIcon>
                                            <CellIcon color="primary" />
                                        </ListItemIcon>
                                        <TextField
                                            style={{
                                                width: '50%'
                                            }}
                                            label="Cell"
                                            className={this.props.classes.inputs}
                                            InputProps={{
                                                inputComponent: TextMaskCustom,
                                                value: this.state.contact.cell,
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
                                            // rows="4"
                                            margin="normal"
                                            onChange={this.handleChangeFor('notes')}
                                            className={this.props.classes.inputs}
                                        />
                                    </ListItem>
                                </List>
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