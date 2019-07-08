// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// ----- COMPONENTS ----- //
import Stages from './Stages'
import Tasks from './Tasks'

// ----- MATERIAL UI CORE ----- //
import {List, ListItemIcon, ListItem, TextField, Typography} from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


// ----- MATERIAL UI ICONS ----- //







class RequirementItem extends Component {


    handleRequireChange = propertyName => (event) => {
        console.log('requireInfo', event.target.value, this.props.requirement);
        this.props.dispatch({
            type: 'UPDATE_REDUX_REQUIREMENT',
            payload: {
                key: this.props.i,
                requirement_id: this.props.requirement.id,
                prop: propertyName,
                value: event.target.value
            }
        })
    }


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_REQUIREMENTS' })

    }


    render() {
        let reqValueOut
        let requirementOfferValue
        let requirementMetValue

        //jobs_requirements item only exists after edit so only preload data for existing entries
        if (this.props.currentRequirements[this.props.i]) {
            requirementOfferValue = this.props.currentRequirements[this.props.i].requirement_offer
            requirementMetValue = this.props.currentRequirements[this.props.i].requirement_met

            console.log('Current Requirements Dot Whack Gradlew', requirementMetValue)
            // reqMetValString = toString(this.props.currentRequirements[this.props.i].requirement_met)
        }


        console.log('in RequirementItem requirement:', this.props.requirement, this.props.i)
        return (
            <div >
                <ListItem>
                    <ListItem style={{ maxWidth: 200 }}>
                        <Typography variant="h6">
                            {this.props.requirement.requirement}
                        </Typography>
                        
                    </ListItem>
                    <List>
                        <ListItem>
                            <InputLabel>Offer Details</InputLabel>
                        </ListItem>
                        <ListItem>
                            <TextField
                                style={{ width: 400 }}
                                multiline
                                onChange={this.handleRequireChange('requirement_offer')}
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
                                onChange={this.handleRequireChange('requirement_met')}
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