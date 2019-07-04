// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI CORE ----- //
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';


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
            id: '',
            first_name: '',
            last_name: '',
            email: '',
        },
        requireList: {},
        oldRequirement: {},
        editMode: false
    }

    handleEdit = (event) => {
        console.log('handleEdit UserInfo:', this.props.profile.first_name, this.props.profile.last_name, this.props.profile.email)
        event.preventDefault();
        let id = this.props.profile.id;
        let first_name =  this.props.profile.first_name;
        let last_name = this.props.profile.last_name;
        let email = this.props.profile.email;
        this.setState({
            ...this.state,
            profileInfo: {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email,
            },
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

    handleUpdateProfile = () => {
        console.log('handleUpdateProfile', this.state.profileInfo);
        this.setState({
            ...this.state,
            editMode: false,
        }) 
        this.props.dispatch({ type: 'UPDATE_USER', payload: this.state.profileInfo })
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
                                    <h2>Edit Personal Info <Tooltip title="Submit Change"><IconButton variant="contained" color="primary" onClick={this.handleUpdateProfile}><CheckIcon /></IconButton></Tooltip></h2>
                                        <TextField
                                            id="standard-dense"
                                            label="First Name"
                                            value={this.state.profileInfo.first_name}
                                            className="profileInput"
                                            margin="dense"
                                            onChange={this.handleProfileChange('first_name')}
                                            variant="outlined"
                                        />
                                        <br />
                                        <TextField
                                            id="standard-dense"
                                            label="Last Name"
                                            value={this.state.profileInfo.last_name}
                                            className="profileInput"
                                            margin="dense"
                                            onChange={this.handleProfileChange('last_name')}
                                            variant="outlined"
                                        />
                                        <br />
                                        <TextField
                                            id="filled-email-input"
                                            label="email address"
                                            value={this.state.profileInfo.email}
                                            className="profileInput"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            margin="dense"
                                            onChange={this.handleProfileChange('email')}
                                            variant="outlined"
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