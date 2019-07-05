// ----- PROFILE REQUIREMENTS ----- //
// The Employment Requirements section of the Profile View
// Child of Profile

// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import SavedRequirements from './SavedRequirements';

// ----- DEPENDENCIES ----- //
import swal from 'sweetalert';

// ----- MATERIAL UI CORE ----- //
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';


// ----- MATERIAL UI ICONS ----- //
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';


// ----- STYLES ----- //
import './Profile.css';

class ProfileRequirements extends Component {


    state = {
        requireList: {},
        oldRequirement: {},
        editMode: false
    }

    requirementCounter = 0

    // updateStateRequirelist () {
    //     console.log('Update state.requireList 1', this.props.reduxState)

    //         // let outputRequire = 
    //         this.props.require.map(requirementOut => {
    //             return (
    //                 console.log('requirementOut', requirementOut.requirement)

    //                 // console.log('requirementOut', requirementOut.requirement)
    //             )
    //         })
    //         this.setState({
    //             ...this.state,
    //             requireList: {
    //                 requirement: outputRequire
    //             }
    //         })
    //         console.log('requireList updated. this.state:', this.state)


    // }

    addRequirementInput(event) {
        console.log('this.requirementCounter', this.requirementCounter);
        console.log('this.state.requireList', this.state.requireList);
        console.log('this.state.oldRequirement', this.state.oldRequirement);
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

    // Triggers Popup to add new Employment Requirement when + is clicked
    addRequirement() {
        console.log('in addRequirement');
        swal({
            text: 'Add New Employment Requirement',
            content: "input",
            button: {
                text: "add",
                closeModal: false,
            },
        })
            .then(requirement => {
                if (!requirement) throw null;
                this.props.dispatch({ type: 'ADD_NEW_REQUIREMENT', payload: { requirement: `${requirement}` } })
            })
            .then(results => {
                swal("New Requirement Added", {
                    icon: "success",
                });
            })
    } // End addRequirement

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            // oldRequirement: 'doodaaa',
            editMode: !this.state.editMode
        });
        // this.updateStateRequirelist()
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
                [index]: {
                    requirement: event.target.value
                }

            }
        });
    }

    submitNewRequirements = () => {
        this.setState({
            ...this.state,
            editMode: false,
        });
        console.log('this.state', this.state);
    }

    render() {

        let requirementsView;

        if (this.state.editMode === false) {
            requirementsView =
                <div className="profileRequirementDisplay">
                    <Card>
                        <h2>
                            Employment Requirements
                            <Tooltip title="Edit Employment Requirements">
                                <IconButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleEdit}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </h2>
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

                            <h2>
                                Edit Employment Requirements
                                <Tooltip
                                    title="Submit Change"
                                >
                                    <IconButton
                                        variant="contained"
                                        color="primary"
                                        onClick={this.submitNewRequirements}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                </Tooltip>
                            </h2>
                            {this.props.require.map((userReq, i) => {
                                return (
                                    <div>
                                        <SavedRequirements
                                            key={userReq.id}
                                            id={i}
                                            userReq={userReq}
                                        />
                                    </div>
                                )
                            })}

                            {/* {Object.entries(this.state.requireList).map((requirement, index) => {
                                return (
                                    <p>
                                        <TextField
                                            id="standard-dense"
                                            label="New Requirement"
                                            className="profileInput"
                                            margin="dense"
                                            onChange={this.handleNewReqChange(index)}
                                            variant="outlined"
                                        />
                                    </p>
                                )
                            })} */}
                            <p ><Tooltip
                                title="Add New Employment Requirement"
                            >
                                <IconButton>
                                    <AddIcon
                                        className="profileAddIcon"
                                        onClick={(event) => this.addRequirement(event)}
                                    />
                                </IconButton>
                            </Tooltip></p>
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
    reduxState,
    profile: reduxState.user,
    require: reduxState.requirements
});
export default connect(mapStateToProps)(ProfileRequirements);