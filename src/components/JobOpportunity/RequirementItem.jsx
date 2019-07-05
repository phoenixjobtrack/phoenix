// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// ----- COMPONENTS ----- //
import Stages from './Stages'
import Tasks from './Tasks'

// ----- MATERIAL UI CORE ----- //
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

// ----- MATERIAL UI ICONS ----- //
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';






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
        let value
        //jobs_requirements item only exists after edit so only preload data for existing entries
        if (this.props.currentRequirements[this.props.i]){
            requirementOfferValue = this.props.currentRequirements[this.props.i].requirement_offer
            // requirementMetValue = 
            if (this.props.currentRequirements[this.props.i].requirement_met === true){
                requirementMetValue = "true"
            }
            else if (this.props.currentRequirements[this.props.i].requirement_met === true) {
                requirementMetValue = "false"
            }
            else {

            }
        }
        // if (requirementMetValue === true){
        //     value="true"
        // }
        // else if (requirementMetValue === false){
        //     value="false"
        // }
        // else{

        // }
        console.log('in RequirementItem requirement:', this.props.requirement, this.props.i, requirementMetValue)
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
                        {/* <FormControl component="fieldset" > */}
                            <FormLabel component="legend">Meets Requirement?{value}</FormLabel>
                        
                            <RadioGroup 
                                value={requirementMetValue}   
                            >                        
                                <FormControlLabel
                                    control={
                                        <Radio 
                                            onChange={this.handleRequireChange('requirement_met')} 
                                        label="True"
                                        value="true"
                                        />
                                    }
                                    
                                />
                                <FormControlLabel
                                    control={
                                        <Radio 
                                            onChange={this.handleRequireChange('requirement_met')} 
                                        label="False"
                                        value="false"
                                        />
                                    }
                                    
                                />
                            </RadioGroup>
                        {/* </FormControl> */}
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