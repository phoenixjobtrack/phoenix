// ----- PROFILE REQUIREMENTS ----- //
// The Important Job Attributes section of the Profile View (formerly called Important Job Requirements)
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
import Grid from '@material-ui/core/Grid';

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

    // Triggers Popup to add new Employment Requirement when + is clicked
    addRequirement() {
        swal({
            text: 'Add New Important Job Attribute',
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
                swal("New Attribute Added", {
                    icon: "success",
                });
            })
    } // End addRequirement

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            editMode: !this.state.editMode
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

    submitNewRequirements = () => {
        this.setState({
            ...this.state,
            editMode: false,
        });
    }

    render() {

        let requirementsView;

        if (this.state.editMode === false) {
            requirementsView =
                <div className="profileRequirementDisplay">
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <h2>
                                    Important Job Attributes
                            <Tooltip title="Edit Attributes">
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleEdit}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </h2>
                                <div className="profileRequireBox">
                                {
                                    this.props.require.map((user, i) => {
                                        return (
                                            <p>{user.requirement}</p>
                                        )
                                    })
                                }
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                    </Grid>
                </div>
        } else {
            requirementsView =
                <div >
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={8}>
                        <Card>
                            <div className="profileRequirementDisplay">

                                <h2>
                                    Edit Important Job Attributes
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
                                <p ><Tooltip
                                    title="Add New Attribute"
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
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    </Grid>
                </div >
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