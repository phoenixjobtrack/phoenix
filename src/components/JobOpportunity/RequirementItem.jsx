import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Stages from './Stages'
import Tasks from './Tasks'

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';

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
    
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_REQUIREMENTS' })
    }
    render(){
        let requirementOfferValue
        let requirementMetValue
        //jobs_requirements item only exists after edit so only preload data for existing entries
        if (this.props.currentRequirements[this.props.i]){
            requirementOfferValue = this.props.currentRequirements[this.props.i].requirement_offer
            requirementMetValue = this.props.currentRequirements[this.props.i].requirement_met
        }
        console.log('in RequirementItem requirement:', this.props.requirement, this.props.i)
        return(
            <div className="oppGrid4">
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
                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Meets Requirement?</FormLabel>
                            <FormGroup >
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={this.handleRequireChange('requirement_met')} value="true" />
                                    }
                                    label="True"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={this.handleRequireChange('requirement_met')} value="false" />
                                    }
                                    label="False"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    currentJob: reduxState.currentJob,
    currentRequirements: reduxState.currentRequirements

});

export default connect(mapStateToProps)(RequirementItem)