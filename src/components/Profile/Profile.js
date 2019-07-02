import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import './Profile.css';
import './EditRequirements'

class Profile extends Component {
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

    requirementCounter = 1

    addRequirementInput(event) {
        console.log('add requirement', this.requirementCounter);
        this.setState({
            ...this.state, 
            requireList: { ...this.state.requireList, 
                [this.requirementCounter]: {
                    requirement: ''
                }
            } 
        })
        this.requirementCounter += 1
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
          ...this.state,
          editMode: !this.state.editMode
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

    handleNewReqChange = (index) => (event) => {
        console.log('edit NewReq info', this.state.requireList);
        this.setState({
            requireList: {
                ...this.state.requireList,
                [index] : {
                    requirement: event.target.value
                }
            
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'UPDATE_USERS', payload: this.state.profileInfo })
        this.props.dispatch({ type: 'UPDATE_REQUIREMENTS', payload: this.state.requireList })
        this.props.dispatch({ type: 'ADD_REQUIREMENTS', payload: this.state.oldRequirement })
    }

    render() {
        console.log('LOOK', this.state.requireList);
        let profileView;
        console.log(this.state);
        
        if (this.state.editMode === false) {
            profileView =
                <div className="profileInfo">
                    <Button variant="contained" color="primary" onClick={this.handleEdit}>Edit</Button>
                    <p>First Name: {this.props.profile.first_name}</p>
                    <p>Last Name: {this.props.profile.last_name}</p>
                    <p>E-mail: {this.props.profile.email}</p>
                    <p>Employment Requirement(s):</p>
                    {this.props.require.map((user, i) => {
                        return (
                            <p>{user.requirement}</p>
                        )
                    })}
                </div>
        } else {
            profileView =
                <form className="profileForm" >
                    <div>
                        <div className="profileInfo">
                        <Button variant="contained" color="primary" onClick={this.handleEdit}>Save</Button>
                        </div>
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
                        
                        <p> Employment Requirement(s): </p>
                        {this.props.require.map((userReq, index) => {
                            return (
                            <p>
                                <TextField
                                    key={userReq.id}
                                    id="standard-dense"
                                    label={userReq.requirement} 
                                    className="profileInput"
                                    margin="dense" 
                                    onChange={this.handleEditChange('requirement')} 

                                />
                            </p>
                            )
                        })}
                        {Object.entries(this.state.requireList).map((requirement, index) => {
                            return (
                                <p>
                                    <TextField
                                        id="standard-dense"
                                        label="New Requirement"
                                        className="profileInput"
                                        margin="dense"
                                        onChange={this.handleNewReqChange(index)}
                                    />
                                </p>
                            )
                        })}
                    <p ><AddIcon className="profileAddIcon" onClick={(event) => this.addRequirementInput(event)} /> Requirement</p>

                </div>
            </form>
        }

        return (
            <div>
                <h1>Profile</h1>
                <div className="profileBox">
                    <FaceIcon className="profileIcon" />
                </div>
                {profileView}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.user,
    require: state.requirements
});
export default connect(mapStateToProps)(Profile);