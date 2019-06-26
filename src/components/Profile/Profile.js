import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        requireList: [
            {requirement: ''}
        ]
    }

    addRequirement(){
        this.setState({requireList: [...this.state.requireList, '']})
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

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Profile</h1>
                <div className="profileBox">
                    <FaceIcon className="profileIcon" />
                </div>
                <form className="profileForm" onSubmit={this.handleSubmit}>
                    <div>       
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
                            onChange={this.handleChange('email')}/>
                        
                        {
                            this.state.requireList.map((requirement, index) =>{
                                return(
                                        <TextField
                                        id="standard-dense"
                                        label="Requirement"
                                        className="profileInput"
                                        margin="dense" 
                                        // onChange={this.handleChange('requirement')} 
                                    />
                                )
                            })
                        }
                        <p ><AddIcon className="profileAddIcon" onClick={(event) => this.addRequirement(event)} /> Requirement</p>

                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pro: state.userReducer,
  });
  export default connect(mapStateToProps)(Profile);