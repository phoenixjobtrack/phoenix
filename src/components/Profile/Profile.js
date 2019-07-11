// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import ProfileRequirements from './ProfileRequirements';
import UserInfo from './UserInfo';

// ----- MATERIAL UI ICONS ----- //
import Box from '@material-ui/core/Box';

// ----- STYLES ----- //
import './Profile.css';


class Profile extends Component {

    componentDidMount () {
        this.props.dispatch({ type: 'FETCH_REQUIREMENTS' })
        
    }

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
        this.setState({
            ...this.state,
            requireList: {
                ...this.state.requireList,
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
        this.setState({
            profileInfo: {
                ...this.state.profileInfo,
                [propertyName]: event.target.value
            }
        });
    }

    handleEditChange = propertyName => (event) => {
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
        this.setState({
            requireList: {
                ...this.state.requireList,
                [index]: {
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
        
        return (
            <div>
                <h2><Box>Profile</Box></h2>
                <div className="profileBox">
                    <img className="logo" src="/images/logo3.png" alt="phoenix logo" /> 
                </div>
                <ProfileRequirements />
                <UserInfo />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.user,
    require: state.requirements
});
export default connect(mapStateToProps)(Profile);