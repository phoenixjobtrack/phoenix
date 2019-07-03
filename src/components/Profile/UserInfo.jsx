// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI CORE ----- //
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


// ----- MATERIAL UI ICONS ----- //
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';

// ----- STYLES ----- //
import './Profile.css';

class UserInfo extends Component {

    state = {
        profileInfo: {
            first_name: '',
            last_name: '',
            email: '',
        },
        requireList: {},
        oldRequirement: {},
        editMode: false
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            editMode: !this.state.editMode
        });
    }

    handleEditChange = propertyName => (event) => {
        console.log('edit old Requirement info', event.target.value);
        this.setState({
            ...this.state,
            oldRequirement: {
                [event.target.value]: {
                    ...this.state.newRequirement,
                    [propertyName]: event.target.value,
                }
            }
        });
    }

    handleProfileChange = propertyName => (event) => {
        console.log('new Profile Info', event.target.value);
        this.setState({
            profileInfo: {
                ...this.state.profileInfo,
                [propertyName]: event.target.value
            }
        });
    }

    render() {

        let profileView;

        if (this.state.editMode === false) {
            profileView =
                <div className="profileInfo">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card>
                                <h2>Personal Info <IconButton variant="contained" color="primary" onClick={this.handleEdit}><EditIcon /></IconButton></h2>
                                <p>First Name: {this.props.profile.first_name}</p>
                                <p>Last Name: {this.props.profile.last_name}</p>
                                <p>E-mail: {this.props.profile.email}</p>
                            </Card>
                        </Grid>
                    </Grid>

                </div>
        } else {
            profileView =
                <form className="profileForm" >
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card>
                                    {/* <Grid item xs={12}> */}
                                    <div className="profileInfo">
                                        <h2>Edit Personal Info <IconButton variant="contained" color="primary" onClick={this.handleEdit}><CheckIcon /></IconButton></h2>
                                        <TextField
                                            id="standard-dense"
                                            label={this.props.profile.first_name}
                                            className="profileInput"
                                            margin="dense"
                                            onChange={this.handleProfileChange('first_name')}
                                        />
                                        <br />
                                        <TextField
                                            id="standard-dense"
                                            label={this.props.profile.last_name}
                                            className="profileInput"
                                            margin="dense"
                                            onChange={this.handleProfileChange('last_name')}
                                        />
                                        <br />
                                        <TextField
                                            id="filled-email-input"
                                            label={this.props.profile.email}
                                            className="profileInput"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            margin="dense"
                                            onChange={this.handleProfileChange('email')}
                                        />
                                    </div>
                                    {/* </Grid> */}
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </form>
        }
        return (
            <div>
                {profileView}
            </div>

        )
    }
}

const mapStateToProps = (reduxState) => ({
    profile: reduxState.user,
    require: reduxState.requirements
});
export default connect(mapStateToProps)(UserInfo);