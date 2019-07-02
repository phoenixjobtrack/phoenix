import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import './Profile.css';

class Profile extends Component {
    state = {
        profileInfo: {
            first_name: '',
            last_name: '',
            email: '',
        },
        requireList: {},
        editMode: false
    }

    requirementCounter = 0

    addRequirementInput(event) {
        console.log('add requirement', this.requirementCounter);
        // this.setState({ requireList: [...this.state.requireList, ''] })
        this.setState({...this.state, requireList: { ...this.state.requireList, [this.requirementCounter]: ''} })
        this.requirementCounter += 1
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
          ...this.state,
          editMode: !this.state.editMode
        });
      }

    handleChange = propertyName => (event) => {
        console.log('new', event.target.value);
        this.setState({
            profileInfo: {
                ...this.state.profileInfo,
                [propertyName]: event.target.value
            }
        });
    }

    handleEditChange = propertyName => (event) => {
        console.log('edit change', event.target.value);
        this.setState({
            requireList: [{
            ...this.state,
            [propertyName]: event.target.value,
          }]
        });
      }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'UPDATE_REQUIREMENTS', payload: this.state.requireList })
    }

    render() {
        console.log('LOOK', this.state.requireList);
        let profileView;
        if (this.state.editMode === false) {
            profileView =
                <div className="profileInfo">
                    <Button variant="contained" color="primary" onClick={this.handleEdit}>Edit</Button>
                    <p contenteditable>First Name: {this.props.profile.first_name}</p>
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
                <form className="profileForm" onSubmit={this.handleSubmit}>
                    <div>
                        <div className="profileInfo">
                        <Button variant="contained" color="primary" onClick={this.handleEdit}>Save</Button>
                        </div>
                        <TextField
                            id="standard-dense"
                            label="First Name"

                            className="profileInput"
                            margin="dense"
                            onChange={this.handleChange('first_name')}
                        />
                        <br />
                        <TextField
                            id="standard-dense"
                            label="Last Name"

                            className="profileInput"
                            margin="dense"
                            onChange={this.handleChange('last_name')}
                        />
                        <br />
                        <TextField
                            id="filled-email-input"
                            label="E-mail"
                            className="profileInput"

                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="dense"
                            onChange={this.handleChange('email')} 
                        />
                        
                        <p> Employment Requirement(s): </p>
                        {this.props.require.map((user, i) => {
                            return (
                            <p>
                                <TextField
                                    id="standard-dense"
                                    label={user.requirement}
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
                                            label="Requirement"
                                            className="profileInput"
                                            margin="dense"
                                            onChange={this.handleChange('requirement')} 
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