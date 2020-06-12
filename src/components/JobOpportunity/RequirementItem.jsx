// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI CORE ----- //
import {List, ListItem, TextField, Typography} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

class RequirementItem extends Component {


    handleRequireChange = propertyName => (event) => {
        this.props.dispatch({
            type: 'UPDATE_REDUX_REQUIREMENT',
            payload: {
                key: this.props.i,
                requirementId: this.props.requirement.id,
                prop: propertyName,
                value: event.target.value
            }
        })
    }

    render() {
        let reqValueOut
        let requirementOfferValue
        let requirementMetValue = '';
        //jobsRequirements item only exists after edit so only preload data for existing entries
        if (this.props.currentRequirements[this.props.i]) {
            requirementOfferValue = this.props.currentRequirements[this.props.i].requirementOffer
            requirementMetValue = this.props.currentRequirements[this.props.i].requirementMet || ''
        }

        return (
            <div>
                <ListItem>
                    <List style={{ maxWidth: 200 }}>
                        <ListItem>
                            <Typography variant="h6">
                                {this.props.requirement.requirement}
                            </Typography>
                        </ListItem>

                    </List>
                    <List>
                        <ListItem>
                            <InputLabel>Offer Details</InputLabel>
                        </ListItem>
                        <ListItem>
                            <TextField
                                style={{ width: 400 }}
                                multiline
                                onChange={this.handleRequireChange('requirementOffer')}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                                value={requirementOfferValue}
                            />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>
                            <InputLabel>Meets Requirements?</InputLabel>
                        </ListItem>
                        <ListItem>
                            <Select
                                style={{ minWidth: '100%' }}
                                value={requirementMetValue}
                                onChange={this.handleRequireChange('requirementMet')}
                                variant="outlined"
                            >
                                <MenuItem value={"" || null}>Select</MenuItem>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </ListItem>
                    </List>
                </ListItem>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    currentJob: reduxState.currentJob,
    currentRequirements: reduxState.currentRequirements,
    reduxState
});

export default connect(mapStateToProps)(RequirementItem)