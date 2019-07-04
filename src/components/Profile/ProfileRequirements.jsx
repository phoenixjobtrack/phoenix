// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI CORE ----- //
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


// ----- MATERIAL UI ICONS ----- //
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';

// ----- STYLES ----- //
import './Profile.css';

class ProfileRequirements extends Component {

    state = {
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

    render() {

        let requirementsView;

        if (this.state.editMode === false) {
            requirementsView =
                <div className="profileRequirementDisplay">
                    <Card>
                        <h2>Employment Requirements <IconButton variant="contained" color="primary" onClick={this.handleEdit}><EditIcon /></IconButton></h2>
                        {
                            this.props.require.map((user, i) => {
                                return (
                                    <p>{user.requirement}</p>
                                )
                            })
                        }
                    </Card>
                </div>
        } else {
            requirementsView =
                <div >
                    <Card>
                        <div className="profileRequirementDisplay">
                        <h2> Edit Employment Requirements <IconButton variant="contained" color="primary" onClick={this.handleEdit}><CheckIcon /></IconButton></h2>
                            {this.props.require.map((userReq, index) => {
                                return (
                                    <p>
                                        <TextField
                                            key={userReq.id}
                                            id="standard-dense"
                                            label="Requirement"
                                            className="profileInput"
                                            margin="dense"
                                            onChange={this.handleEditChange('requirement')}
                                            variant="outlined"
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
                    </Card>
                </div>
        }

        return (
            <div>
                {requirementsView}
            </div>
        ) // end return
    } // end render
} // end class

const mapStateToProps = (reduxState) => ({
    profile: reduxState.user,
    require: reduxState.requirements
});
export default connect(mapStateToProps)(ProfileRequirements);