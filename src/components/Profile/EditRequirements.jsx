import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import './Profile.css';

class Profile extends Component {
    state = {}


}

const mapStateToProps = (state) => ({
profile: state.user,
require: state.requirements
});
export default connect(mapStateToProps)(Profile);