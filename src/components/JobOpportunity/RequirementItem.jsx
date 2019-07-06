// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// ----- COMPONENTS ----- //
import Stages from './Stages'
import Tasks from './Tasks'

// ----- MATERIAL UI CORE ----- //
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
            <div className="oppGrid4">
                <Box >
                    <Grid container>
                        <Grid item sm={4}>
                            <span> Requirement: {this.props.requirement.requirement} </span>
                        </Grid>
                        <Grid item sm={5}>
                            <Input
                                // style={{ width: 350 }}
                                placeholder="Offer Details"
                                onChange={this.handleRequireChange('requirement_offer')}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                                value={requirementOfferValue}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Meets Requirement?</FormLabel>
                                <InputLabel ></InputLabel>
                                <Select
                                    value={requirementMetValue}
                                    onChange={this.handleRequireChange('requirement_met')}
                                    variant="outlined"
                                >
                                    <MenuItem value={"" || null}>Select</MenuItem>
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
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