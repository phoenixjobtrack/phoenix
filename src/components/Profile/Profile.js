import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import './Profile.css';

class Profile extends Component {
render () {
    return (
        <div>
            <h1>Profile</h1>
            <div className="profileBox">
                <FaceIcon className="profileIcon" />
                <div className="profileForm">
                    <p>First Name:</p>
                    <p>Last Name:</p>
                    <p>E-mail:</p>
                </div>
            </div>
          
        </div>
    )
}
}

export default Profile;