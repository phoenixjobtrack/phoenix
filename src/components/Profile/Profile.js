import React, { Component } from 'react';

import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import './Profile.css';

class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Profile</h1>
                <div className="profileBox">
                    <FaceIcon className="profileIcon" />
                </div>
                <form className="profileForm">
                    <div>

                        <p>First Name:   <input type="text" placeholder="First Name" /></p>
                        <p>Last Name: <input type="text" placeholder="Last Name" /></p>
                        <p>E-mail: <input type="text" placeholder="E-mail" /></p>
                        <p><AddIcon className="profileAddIcon" /> Requirement</p>

                    </div>
                </form>
            </div>
        )
    }
}

export default Profile;